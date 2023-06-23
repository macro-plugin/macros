'use strict';

var runtime = require('./runtime');
var core = require('@macro-plugin/core');

const transformTsExpr = (expr) => {
    switch (expr.type) {
        case "TsTypeAssertion":
        case "TsNonNullExpression":
        case "TsConstAssertion":
        case "TsAsExpression":
        case "TsSatisfiesExpression":
        case "TsInstantiation":
            return expr.expression;
    }
    return expr;
};
const isNullExpr = (expr) => expr == null || (expr.type === "Identifier" && expr.value === "undefined") || expr.type === "NullLiteral";
const createAstProp = (key, value, span) => ({
    type: "KeyValueProperty",
    key: { type: "StringLiteral", span, value: key },
    value
});
const createAst = (type, props, span) => {
    let v;
    const properties = [
        createAstProp("type", {
            type: "StringLiteral",
            span,
            value: type,
        }, span)
    ];
    if (isNullExpr(props.span))
        props.span = undefined;
    for (const k in props) {
        v = props[k];
        if (v)
            properties.push(createAstProp(k, transformTsExpr(v), span));
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (props.span == null)
        properties.push(createAstProp("span", createSpanAst(span), span));
    return {
        type: "ObjectExpression",
        span,
        properties
    };
};
const createSpanAst = (span) => ({
    type: "ObjectExpression",
    properties: [
        createAstProp("start", { type: "NumericLiteral", value: span.start, span }, span),
        createAstProp("end", { type: "NumericLiteral", value: span.end, span }, span),
        createAstProp("ctxt", { type: "NumericLiteral", value: span.ctxt, span }, span)
    ],
    span
});
const optional = (expr, defaultValue, span = core.dummySpan) => {
    if (isNullExpr(expr)) {
        switch (typeof defaultValue) {
            case "boolean":
                return {
                    type: "BooleanLiteral",
                    span,
                    value: defaultValue
                };
            case "number":
                return {
                    type: "NumericLiteral",
                    span,
                    value: defaultValue
                };
            case "string":
                return {
                    type: "StringLiteral",
                    span,
                    value: defaultValue
                };
            case "undefined":
                return {
                    type: "Identifier",
                    span,
                    value: "undefined"
                };
            case "object":
                return Array.isArray(defaultValue)
                    ? {
                        type: "ArrayExpression",
                        span,
                        elements: []
                    }
                    : defaultValue == null
                        ? {
                            type: "NullLiteral",
                            span
                        }
                        : {
                            type: "ObjectExpression",
                            span,
                            properties: []
                        };
        }
    }
    return expr;
};
function _JSONStringify(expression, span) {
    return {
        type: "CallExpression",
        span,
        callee: {
            type: "MemberExpression",
            span,
            object: {
                type: "Identifier",
                span,
                value: "JSON",
                optional: false
            },
            property: {
                type: "Identifier",
                span,
                value: "stringify",
                optional: false
            }
        },
        arguments: [
            {
                expression
            }
        ],
    };
}
const $Span = core.createExprMacro("$Span", function ([start, end, ctxt]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        properties: [
            createAstProp("start", optional(start, 0), span),
            createAstProp("end", optional(end, 0), span),
            createAstProp("ctxt", optional(ctxt, 0), span)
        ],
        span
    };
}, "(start?: number, end?: number, ctxt?: number) => import(\"@swc/core\").Span").proxy(runtime.createSpan);
const $Identifier = core.createExprMacro("$Identifier", function ([value, isOptional, span]) {
    return createAst("Identifier", { value, optional: optional(isOptional, false), span }, this.span());
}, "(value: string, optional?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Identifier").proxy(runtime.createIdentifier);
const $StringLiteral = core.createExprMacro("$StringLiteral", function ([value, raw, span]) {
    return createAst("StringLiteral", { value, raw, span }, this.span());
}, "(value: string, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").StringLiteral").proxy(runtime.createStringLiteral);
const $NumericLiteral = core.createExprMacro("$NumericLiteral", function ([value, raw, span]) {
    return createAst("NumericLiteral", { value, raw, span }, this.span());
}, "(value: number, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NumericLiteral").proxy(runtime.createNumericLiteral);
const $BigIntLiteral = core.createExprMacro("$BigIntLiteral", function ([value, raw, span]) {
    return createAst("BigIntLiteral", { value, raw, span }, this.span());
}, "(value: bigint, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BigIntLiteral").proxy(runtime.createBigIntLiteral);
const $BooleanLiteral = core.createExprMacro("$BooleanLiteral", function ([value, span]) {
    return createAst("BooleanLiteral", { value, span }, this.span());
}, "(value: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BooleanLiteral").proxy(runtime.createBooleanLiteral);
const $NullLiteral = core.createExprMacro("$NullLiteral", function ([span]) {
    return createAst("NullLiteral", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NullLiteral").proxy(runtime.createNullLiteral);
const $RegExpLiteral = core.createExprMacro("$RegExpLiteral", function ([pattern, flags, span]) {
    return createAst("RegExpLiteral", { pattern, flags, span }, this.span());
}, "(pattern: string, flags: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").RegExpLiteral").proxy(runtime.createRegExpLiteral);
const $Argument = core.createExprMacro("$Argument", function ([expression, spread]) {
    const span = this.span();
    const properties = [];
    if (!isNullExpr(spread))
        properties.push(createAstProp("spread", spread, span));
    properties.push(createAstProp("expression", expression, span));
    return {
        type: "ObjectExpression",
        span,
        properties
    };
}, "(expression: import(\"@swc/core\").Expression, spread?: import(\"@swc/core\").Span) => import(\"@swc/core\").Argument").proxy(runtime.createArgument);
const $CallExpression = core.createExprMacro("$CallExpression", function ([callee, callArgs, typeArguments, span]) {
    return createAst("CallExpression", { callee, arguments: optional(callArgs, []), typeArguments, span }, this.span());
}, "(callee: import(\"@swc/core\").Expression | import(\"@swc/core\").Super | import(\"@swc/core\").Import, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").CallExpression").proxy(runtime.createCallExpression);
const $ClassProperty = core.createExprMacro("$ClassProperty", function ([key, value, accessibility, typeAnnotation, decorators, declare, definite, isAbstract, isOptional, isOverride, isStatic, isReadonly, span]) {
    return createAst("ClassProperty", { key, value, accessibility, typeAnnotation, decorators, declare: optional(declare, false), definite: optional(definite, false), isAbstract: optional(isAbstract, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), readonly: optional(isReadonly, false), isStatic: optional(isStatic, false), span }, this.span());
}, "(key: import(\"@swc/core\").PropertyName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassProperty").proxy(runtime.createClassProperty);
const $PrivateProperty = core.createExprMacro("$PrivateProperty", function ([key, value, accessibility, typeAnnotation, decorators, definite, isOptional, isOverride, isStatic, isReadonly, span]) {
    return createAst("PrivateProperty", { key, value, accessibility, typeAnnotation, decorators, definite: optional(definite, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), isStatic: optional(isStatic, false), readonly: optional(isReadonly, false), span }, this.span());
}, "(key: import(\"@swc/core\").PrivateName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").PrivateProperty").proxy(runtime.createPrivateProperty);
const $Param = core.createExprMacro("$Param", function ([pat, decorators, span]) {
    return createAst("Parameter", { pat, decorators, span }, this.span());
}, "(pat: import(\"@swc/core\").Pattern, decorators?: import(\"@swc/core\").Decorator[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Param").proxy(runtime.createParam);
const $Constructor = core.createExprMacro("$Constructor", function ([key, params, body, accessibility, isOptional, span]) {
    return createAst("Constructor", { key, params, body, accessibility, isOptional: optional(isOptional, false), span }, this.span());
}, "(key: import(\"@swc/core\").PropertyName, params: (import(\"@swc/core\").TsParameterProperty | import(\"@swc/core\").Param)[], body?: import(\"@swc/core\").BlockStatement, accessibility?: import(\"@swc/core\").Accessibility, isOptional?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Constructor").proxy(runtime.createConstructor);
const $ClassMethod = core.createExprMacro("$ClassMethod", function ([kind, key, fn, accessibility, isAbstract, isOptional, isOverride, isStatic, span]) {
    return createAst("ClassMethod", { kind, key, function: fn, accessibility, isAbstract: optional(isAbstract, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), isStatic: optional(isStatic, false), span }, this.span());
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PropertyName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassMethod").proxy(runtime.createClassMethod);
const $PrivateMethod = core.createExprMacro("$PrivateMethod", function ([kind, key, fn, accessibility, isAbstract, isOptional, isOverride, isStatic, span]) {
    return createAst("PrivateMethod", { kind, key, function: fn, accessibility, isAbstract: optional(isAbstract, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), isStatic: optional(isStatic, false), span }, this.span());
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PrivateName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").PrivateMethod").proxy(runtime.createPrivateMethod);
const $StaticBlock = core.createExprMacro("$StaticBlock", function ([body, span]) {
    return createAst("StaticBlock", { body, span }, this.span());
}, "(body: import(\"@swc/core\").BlockStatement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").StaticBlock").proxy(runtime.createStaticBlock);
const $Decorator = core.createExprMacro("$Decorator", function ([expression, span]) {
    return createAst("Decorator", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Decorator").proxy(runtime.createDecorator);
const $FunctionDeclaration = core.createExprMacro("$FunctionDeclaration", function ([identifier, params, body, typeParameters, returnType, decorators, declare, async, generator, span]) {
    return createAst("FunctionDeclaration", { identifier, params, body, typeParameters, returnType, decorators, declare: optional(declare, false), async: optional(async, false), generator: optional(generator, false), span }, this.span());
}, "(identifier: import(\"@swc/core\").Identifier, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, async?: boolean, generator?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").FunctionDeclaration").proxy(runtime.createFunctionDeclaration);
const $ClassDeclaration = core.createExprMacro("$ClassDeclaration", function ([identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare, isAbstract, span]) {
    return createAst("ClassDeclaration", { identifier, body, implements: impls, superClass, typeParams, superTypeParams, decorators, declare: optional(declare, false), isAbstract: optional(isAbstract, false), span }, this.span());
}, "(identifier: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").ClassMember[], impls: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, isAbstract?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassDeclaration").proxy(runtime.createClassDeclaration);
const $VariableDeclaration = core.createExprMacro("$VariableDeclaration", function ([kind, declarations, declare, span]) {
    return createAst("VariableDeclaration", { kind, declare: optional(declare, false), declarations: optional(declarations, []), span }, this.span());
}, "(kind: import(\"@swc/core\").VariableDeclarationKind, declarations?: import(\"@swc/core\").VariableDeclarator[], declare?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").VariableDeclaration").proxy(runtime.createVariableDeclaration);
const $VariableDeclarator = core.createExprMacro("$VariableDeclarator", function ([id, init, definite, span]) {
    return createAst("VariableDeclarator", { id, definite: optional(definite, false), init, span }, this.span());
}, "(id: import(\"@swc/core\").Pattern, init?: import(\"@swc/core\").Expression, definite?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").VariableDeclarator").proxy(runtime.createVariableDeclarator);
const $OptionalChainingExpression = core.createExprMacro("$OptionalChainingExpression", function ([base, questionDotToken, span]) {
    const blockSpan = this.span();
    return createAst("OptionalChainingExpression", { base, questionDotToken: isNullExpr(questionDotToken) ? createSpanAst(blockSpan) : questionDotToken, span }, blockSpan);
}, "(base: import(\"@swc/core\").MemberExpression | import(\"@swc/core\").OptionalChainingCall, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").OptionalChainingExpression").proxy(runtime.createOptionalChainingExpression);
const $OptionalChainingCall = core.createExprMacro("$OptionalChainingCall", function ([callee, args, typeArguments, span]) {
    return createAst("OptionalChainingCall", { callee, arguments: optional(args, []), typeArguments, span }, this.span());
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").ExprOrSpread[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").OptionalChainingCall").proxy(runtime.createOptionalChainingCall);
const $ThisExpression = core.createExprMacro("$ThisExpression", function ([span]) {
    return createAst("ThisExpression", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ThisExpression").proxy(runtime.createThisExpression);
const $ArrayExpression = core.createExprMacro("$ArrayExpression", function ([elements, span]) {
    return createAst("ArrayExpression", { elements: optional(elements, []), span }, this.span());
}, "(elements?: (import(\"@swc/core\").ExprOrSpread | undefined)[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ArrayExpression").proxy(runtime.createArrayExpression);
const $ExprOrSpread = core.createExprMacro("$ExprOrSpread", function ([expression, spread]) {
    const span = this.span();
    const properties = [];
    if (!isNullExpr(spread))
        properties.push(createAstProp("spread", spread, span));
    properties.push(createAstProp("expression", expression, span));
    return {
        type: "ObjectExpression",
        span,
        properties
    };
}, "(expression: import(\"@swc/core\").Expression, spread?: import(\"@swc/core\").Span, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExprOrSpread").proxy(runtime.createExprOrSpread);
const $ObjectExpression = core.createExprMacro("$ObjectExpression", function ([properties, span]) {
    return createAst("ObjectExpression", { properties: optional(properties, []), span }, this.span());
}, "(properties?: (import(\"@swc/core\").SpreadElement | import(\"@swc/core\").Property)[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ObjectExpression").proxy(runtime.createObjectExpression);
const $SpreadElement = core.createExprMacro("$SpreadElement", function ([args, spread]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "SpreadElement", span }, span), createAstProp("arguments", args, span), createAstProp("spread", isNullExpr(spread) ? createSpanAst(span) : spread, span)]
    };
}, "(args: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SpreadElement").proxy(runtime.createSpreadElement);
const $UnaryExpression = core.createExprMacro("$UnaryExpression", function ([operator, argument, span]) {
    return createAst("UnaryExpression", { operator, argument, span }, this.span());
}, "(operator: import(\"@swc/core\").UnaryOperator, argument: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").UnaryExpression").proxy(runtime.createUnaryExpression);
const $UpdateExpression = core.createExprMacro("$UpdateExpression", function ([operator, argument, prefix, span]) {
    return createAst("UpdateExpression", { operator, argument, prefix: optional(prefix, false), span }, this.span());
}, "(operator: import(\"@swc/core\").UpdateOperator, argument: import(\"@swc/core\").Expression, prefix?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").UpdateExpression").proxy(runtime.createUpdateExpression);
const $BinaryExpression = core.createExprMacro("$BinaryExpression", function ([left, operator, right, span]) {
    return createAst("BinaryExpression", { left, operator, right, span }, this.span());
}, "(left: import(\"@swc/core\").Expression, operator: import(\"@swc/core\").BinaryOperator, right: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BinaryExpression").proxy(runtime.createBinaryExpression);
const $FunctionExpression = core.createExprMacro("$FunctionExpression", function ([params, body, identifier, typeParameters, returnType, decorators, async, generator, span]) {
    return createAst("FunctionExpression", { params, body, identifier, typeParameters, returnType, decorators, async: optional(async, false), generator: optional(generator, false), span }, this.span());
}, "(params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, identifier?: import(\"@swc/core\").Identifier, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], async?: boolean, generator?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").FunctionExpression").proxy(runtime.createFunctionExpression);
const $ClassExpression = core.createExprMacro("$ClassExpression", function ([body, impls, superClass, identifier, typeParams, superTypeParams, decorators, isAbstract, span]) {
    return createAst("ClassExpression", { body, implements: optional(impls, []), superClass, identifier, typeParams, superTypeParams, decorators, isAbstract: optional(isAbstract, false), span }, this.span());
}, "(body: import(\"@swc/core\").ClassMember[], impls?: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, identifier?: import(\"@swc/core\").Identifier, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], isAbstract?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassExpression").proxy(runtime.createClassExpression);
const $AssignmentExpression = core.createExprMacro("$AssignmentExpression", function ([left, operator, right, span]) {
    return createAst("AssignmentExpression", { left, operator, right, span }, this.span());
}, "(left: import(\"@swc/core\").Expression | Pattern, operator: import(\"@swc/core\").AssignmentOperator, right: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AssignmentExpression").proxy(runtime.createAssignmentExpression);
const $MemberExpression = core.createExprMacro("$MemberExpression", function ([object, property, span]) {
    return createAst("MemberExpression", { object, property, span }, this.span());
}, "(object: import(\"@swc/core\").Expression, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").PrivateName | import(\"@swc/core\").ComputedPropName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").MemberExpression").proxy(runtime.createMemberExpression);
const $SuperPropExpression = core.createExprMacro("$SuperPropExpression", function ([obj, property, span]) {
    return createAst("SuperPropExpression", { obj, property, span }, this.span());
}, "(obj: import(\"@swc/core\").Super, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").ComputedPropName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SuperPropExpression").proxy(runtime.createSuperPropExpression);
const $ConditionalExpression = core.createExprMacro("$ConditionalExpression", function ([test, consequent, alternate, span]) {
    return createAst("ConditionalExpression", { test, consequent, alternate, span }, this.span());
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Expression, alternate: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ConditionalExpression").proxy(runtime.createConditionalExpression);
const $Super = core.createExprMacro("$Super", function ([span]) {
    return createAst("Super", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Super").proxy(runtime.createSuper);
const $Import = core.createExprMacro("$Import", function ([span]) {
    return createAst("Import", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Import").proxy(runtime.createImport);
const $NewExpression = core.createExprMacro("$NewExpression", function ([callee, args, typeArguments, span]) {
    return createAst("NewExpression", { callee, arguments: args, typeArguments, span }, this.span());
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NewExpression").proxy(runtime.createNewExpression);
const $SequenceExpression = core.createExprMacro("$SequenceExpression", function ([expressions, span]) {
    return createAst("SequenceExpression", { expressions, span }, this.span());
}, "(expressions: import(\"@swc/core\").Expression[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SequenceExpression").proxy(runtime.createSequenceExpression);
const $ArrowFunctionExpression = core.createExprMacro("$ArrowFunctionExpression", function ([params, body, async, generator, typeParameters, returnType, span]) {
    return createAst("ArrowFunctionExpression", { params, body, typeParameters, returnType, async: optional(async, false), generator: optional(generator, false), span }, this.span());
}, "(params: import(\"@swc/core\").Pattern[], body: import(\"@swc/core\").BlockStatement | import(\"@swc/core\").Expression, async?: boolean, generator?: boolean, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ArrowFunctionExpression").proxy(runtime.createArrowFunctionExpression);
const $YieldExpression = core.createExprMacro("$YieldExpression", function ([argument, delegate, span]) {
    return createAst("YieldExpression", { argument, delegate: optional(delegate, false), span }, this.span());
}, "(argument?: import(\"@swc/core\").Expression, delegate?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").YieldExpression").proxy(runtime.createYieldExpression);
const $MetaProperty = core.createExprMacro("$MetaProperty", function ([kind, span]) {
    return createAst("MetaProperty", { kind, span }, this.span());
}, "(kind: \"new.target\" | \"import.meta\", span?: import(\"@swc/core\").Span) => import(\"@swc/core\").MetaProperty").proxy(runtime.createMetaProperty);
const $AwaitExpression = core.createExprMacro("$AwaitExpression", function ([argument, span]) {
    return createAst("AwaitExpression", { argument, span }, this.span());
}, "(argument: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AwaitExpression").proxy(runtime.createAwaitExpression);
const $TemplateLiteral = core.createExprMacro("$TemplateLiteral", function ([expressions, quasis, span]) {
    return createAst("TemplateLiteral", { expressions: optional(expressions, []), quasis: optional(quasis, []), span }, this.span());
}, "(expressions?: import(\"@swc/core\").Expression[], quasis?: import(\"@swc/core\").TemplateElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TemplateLiteral").proxy(runtime.createTemplateLiteral);
const $TaggedTemplateExpression = core.createExprMacro("$TaggedTemplateExpression", function ([tag, template, typeParameters, span]) {
    return createAst("TaggedTemplateExpression", { tag, template, typeParameters, span }, this.span());
}, "(tag: import(\"@swc/core\").Expression, template: import(\"@swc/core\").TemplateLiteral, typeParameters?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TaggedTemplateExpression").proxy(runtime.createTaggedTemplateExpression);
const $TemplateElement = core.createExprMacro("$TemplateElement", function ([raw, cooked, tail, span]) {
    return createAst("TemplateElement", { raw, cooked, tail: optional(tail, false), span }, this.span());
}, "(raw: string, cooked?: string, tail?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TemplateElement").proxy(runtime.createTemplateElement);
const $ParenthesisExpression = core.createExprMacro("$ParenthesisExpression", function ([expression, span]) {
    return createAst("ParenthesisExpression", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ParenthesisExpression").proxy(runtime.createParenthesisExpression);
const $PrivateName = core.createExprMacro("$PrivateName", function ([id, span]) {
    return createAst("PrivateName", { id, span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").PrivateName").proxy(runtime.createPrivateName);
const $JSXMemberExpression = core.createExprMacro("$JSXMemberExpression", function ([object, property]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "JSXMemberExpression", span }, span), createAstProp("object", object, span), createAstProp("property", property, span)]
    };
}, "(object: import(\"@swc/core\").JSXObject, property: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXMemberExpression").proxy(runtime.createJSXMemberExpression);
const $JSXNamespacedName = core.createExprMacro("$JSXNamespacedName", function ([namespace, name]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "JSXNamespacedName", span }, span), createAstProp("namespace", namespace, span), createAstProp("name", name, span)]
    };
}, "(namespace: import(\"@swc/core\").Identifier, name: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXNamespacedName").proxy(runtime.createJSXNamespacedName);
const $JSXEmptyExpression = core.createExprMacro("$JSXEmptyExpression", function ([span]) {
    return createAst("JSXEmptyExpression", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXEmptyExpression").proxy(runtime.createJSXEmptyExpression);
const $JSXExpressionContainer = core.createExprMacro("$JSXExpressionContainer", function ([expression, span]) {
    return createAst("JSXExpressionContainer", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").JSXExpression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXExpressionContainer").proxy(runtime.createJSXExpressionContainer);
const $JSXSpreadChild = core.createExprMacro("$JSXSpreadChild", function ([expression, span]) {
    return createAst("JSXSpreadChild", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXSpreadChild").proxy(runtime.createJSXSpreadChild);
const $JSXOpeningElement = core.createExprMacro("$JSXOpeningElement", function ([name, attributes, selfClosing, typeArguments, span]) {
    return createAst("JSXOpeningElement", { name, attributes: optional(attributes, []), selfClosing: optional(selfClosing, false), typeArguments, span }, this.span());
}, "(name: import(\"@swc/core\").JSXElementName, attributes?: import(\"@swc/core\").JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXOpeningElement").proxy(runtime.createJSXOpeningElement);
const $JSXClosingElement = core.createExprMacro("$JSXClosingElement", function ([name, span]) {
    return createAst("JSXClosingElement", { name, span }, this.span());
}, "(name: import(\"@swc/core\").JSXElementName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXClosingElement").proxy(runtime.createJSXClosingElement);
const $JSXAttribute = core.createExprMacro("$JSXAttribute", function ([name, value, span]) {
    return createAst("JSXAttribute", { name, value, span }, this.span());
}, "(name: import(\"@swc/core\").JSXAttributeName, value?: import(\"@swc/core\").JSXAttrValue, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXAttribute").proxy(runtime.createJSXAttribute);
const $JSXText = core.createExprMacro("$JSXText", function ([value, raw, span]) {
    const blockSpan = this.span();
    return createAst("JSXText", { value, raw: raw || _JSONStringify(value, blockSpan), span }, blockSpan);
}, "(value: string, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXText").proxy(runtime.createJSXText);
const $JSXElement = core.createExprMacro("$JSXElement", function ([opening, children, closing, span]) {
    return createAst("JSXElement", { opening, children: optional(children, []), closing, span }, this.span());
}, "(opening: import(\"@swc/core\").JSXOpeningElement, children?: import(\"@swc/core\").JSXElementChild[], closing?: import(\"@swc/core\").JSXClosingElement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXElement").proxy(runtime.createJSXElement);
const $JSXFragment = core.createExprMacro("$JSXFragment", function ([opening, children, closing, span]) {
    return createAst("JSXFragment", { opening, children: optional(children, []), closing, span }, this.span());
}, "(opening: import(\"@swc/core\").JSXOpeningFragment, children?: import(\"@swc/core\").JSXElementChild[], closing: import(\"@swc/core\").JSXClosingFragment, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXFragment").proxy(runtime.createJSXFragment);
const $JSXOpeningFragment = core.createExprMacro("$JSXOpeningFragment", function ([span]) {
    return createAst("JSXOpeningFragment", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXOpeningFragment").proxy(runtime.createJSXOpeningFragment);
const $JSXClosingFragment = core.createExprMacro("$JSXClosingFragment", function ([span]) {
    return createAst("JSXClosingFragment", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXClosingFragment").proxy(runtime.createJSXClosingFragment);
const $ExportDefaultExpression = core.createExprMacro("$ExportDefaultExpression", function ([expression, span]) {
    return createAst("ExportDefaultExpression", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDefaultExpression").proxy(runtime.createExportDefaultExpression);
const $ExportDeclaration = core.createExprMacro("$ExportDeclaration", function ([declaration, span]) {
    return createAst("ExportDeclaration", { declaration, span }, this.span());
}, "(declaration: import(\"@swc/core\").Declaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDeclaration").proxy(runtime.createExportDeclaration);
const $ImportDeclaration = core.createExprMacro("$ImportDeclaration", function ([specifiers, source, asserts, typeOnly, span]) {
    return createAst("ImportDeclaration", { specifiers, source, typeOnly: optional(typeOnly, false), asserts, span }, this.span());
}, "(specifiers: import(\"@swc/core\").ImportSpecifier[], source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ImportDeclaration").proxy(runtime.createImportDeclaration);
const $ExportAllDeclaration = core.createExprMacro("$ExportAllDeclaration", function ([source, asserts, span]) {
    return createAst("ExportAllDeclaration", { source, asserts, span }, this.span());
}, "(source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportAllDeclaration").proxy(runtime.createExportAllDeclaration);
const $ExportNamedDeclaration = core.createExprMacro("$ExportNamedDeclaration", function ([specifiers, source, asserts, typeOnly, span]) {
    return createAst("ExportNamedDeclaration", { specifiers, source, typeOnly: optional(typeOnly, false), asserts, span }, this.span());
}, "(specifiers: import(\"@swc/core\").ExportSpecifier[], source?: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportNamedDeclaration").proxy(runtime.createExportNamedDeclaration);
const $ExportDefaultDeclaration = core.createExprMacro("$ExportDefaultDeclaration", function ([decl, span]) {
    return createAst("ExportDefaultDeclaration", { decl, span }, this.span());
}, "(decl: import(\"@swc/core\").DefaultDecl, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDefaultDeclaration").proxy(runtime.createExportDefaultDeclaration);
const $ImportDefaultSpecifier = core.createExprMacro("$ImportDefaultSpecifier", function ([local, span]) {
    return createAst("ImportDefaultSpecifier", { local, span }, this.span());
}, "(local: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ImportDefaultSpecifier").proxy(runtime.createImportDefaultSpecifier);
const $ImportNamespaceSpecifier = core.createExprMacro("$ImportNamespaceSpecifier", function ([local, span]) {
    return createAst("ImportNamespaceSpecifier", { local, span }, this.span());
}, "(local: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ImportNamespaceSpecifier").proxy(runtime.createImportNamespaceSpecifier);
const $ImportSpecifier = core.createExprMacro("$ImportSpecifier", function ([local, imported, isTypeOnly, span]) {
    return createAst("ImportSpecifier", { local, imported, isTypeOnly: optional(isTypeOnly, false), span }, this.span());
}, "(local: import(\"@swc/core\").Identifier, imported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedImportSpecifier").proxy(runtime.createImportSpecifier);
const $NamedImportSpecifier = core.createExprMacro("$NamedImportSpecifier", function ([local, imported, isTypeOnly, span]) {
    return createAst("ImportSpecifier", { local, imported, isTypeOnly: optional(isTypeOnly, false), span }, this.span());
}, "(local: import(\"@swc/core\").Identifier, imported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedImportSpecifier").proxy(runtime.createNamedImportSpecifier);
const $ExportNamespaceSpecifier = core.createExprMacro("$ExportNamespaceSpecifier", function ([name, span]) {
    return createAst("ExportNamespaceSpecifier", { name, span }, this.span());
}, "(name: import(\"@swc/core\").ModuleExportName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportNamespaceSpecifier").proxy(runtime.createExportNamespaceSpecifier);
const $ExportDefaultSpecifier = core.createExprMacro("$ExportDefaultSpecifier", function ([exported, span]) {
    return createAst("ExportDefaultSpecifier", { exported, span }, this.span());
}, "(exported: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDefaultSpecifier").proxy(runtime.createExportDefaultSpecifier);
const $ExportSpecifier = core.createExprMacro("$NamedExportSpecifier", function ([orig, exported, isTypeOnly, span]) {
    return createAst("ExportSpecifier", { orig, exported, isTypeOnly: optional(isTypeOnly, false), span }, this.span());
}, "(orig: import(\"@swc/core\").ModuleExportName, exported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedExportSpecifier").proxy(runtime.createExportSpecifier);
const $NamedExportSpecifier = core.createExprMacro("$NamedExportSpecifier", function ([orig, exported, isTypeOnly, span]) {
    return createAst("ExportSpecifier", { orig, exported, isTypeOnly: optional(isTypeOnly, false), span }, this.span());
}, "(orig: import(\"@swc/core\").ModuleExportName, exported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedExportSpecifier").proxy(runtime.createNamedExportSpecifier);
const $Module = core.createExprMacro("$Module", function ([body, interpreter, span]) {
    return createAst("Module", { body: optional(body, []), interpreter, span }, this.span());
}, "(body: import(\"@swc/core\").ModuleItem[], interpreter?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Module").proxy(runtime.createModule);
const $Script = core.createExprMacro("$Script", function ([body, interpreter, span]) {
    return createAst("Script", { body: optional(body, []), interpreter, span }, this.span());
}, "(body: import(\"@swc/core\").Statement[], interpreter?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Script").proxy(runtime.createScript);
const $ArrayPattern = core.createExprMacro("$ArrayPattern", function ([elements, isOptional, typeAnnotation, span]) {
    return createAst("ArrayPattern", { elements, optional: optional(isOptional, false), typeAnnotation, span }, this.span());
}, "(elements: (import(\"@swc/core\").Pattern | undefined)[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ArrayPattern").proxy(runtime.createArrayPattern);
const $ObjectPattern = core.createExprMacro("$ObjectPattern", function ([properties, isOptional, typeAnnotation, span]) {
    return createAst("ObjectPattern", { properties, optional: optional(isOptional, false), typeAnnotation, span }, this.span());
}, "(properties: import(\"@swc/core\").ObjectPatternProperty[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ObjectPattern").proxy(runtime.createObjectPattern);
const $AssignmentPattern = core.createExprMacro("$AssignmentPattern", function ([left, right, typeAnnotation, span]) {
    return createAst("AssignmentPattern", { left, right, typeAnnotation, span }, this.span());
}, "(left: import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AssignmentPattern").proxy(runtime.createAssignmentPattern);
const $RestElement = core.createExprMacro("$RestElement", function ([argument, typeAnnotation, rest, span]) {
    const blockSpan = this.span();
    return createAst("RestElement", { argument, rest: isNullExpr(rest) ? createSpanAst(blockSpan) : rest, typeAnnotation, span }, blockSpan);
}, "(argument: import(\"@swc/core\").Pattern, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, rest?: import(\"@swc/core\").Span, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").RestElement").proxy(runtime.createRestElement);
const $KeyValuePatternProperty = core.createExprMacro("$KeyValuePatternProperty", function ([key, value]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "KeyValuePatternProperty", span }, span), createAstProp("key", key, span), createAstProp("value", value, span)]
    };
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Pattern) => import(\"@swc/core\").KeyValuePatternProperty").proxy(runtime.createKeyValuePatternProperty);
const $AssignmentPatternProperty = core.createExprMacro("$AssignmentPatternProperty", function ([key, value, span]) {
    return createAst("AssignmentPatternProperty", { key, value, span }, this.span());
}, "(key: import(\"@swc/core\").Identifier, value?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AssignmentPatternProperty").proxy(runtime.createAssignmentPatternProperty);
const $KeyValueProperty = core.createExprMacro("$KeyValueProperty", function ([key, value]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "KeyValueProperty", span }, span), createAstProp("key", key, span), createAstProp("value", value, span)]
    };
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").KeyValueProperty").proxy(runtime.createKeyValueProperty);
const $AssignmentProperty = core.createExprMacro("$AssignmentProperty", function ([key, value]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "AssignmentProperty", span }, span), createAstProp("key", key, span), createAstProp("value", value, span)]
    };
}, "(key: import(\"@swc/core\").Identifier, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentProperty").proxy(runtime.createAssignmentProperty);
const $GetterProperty = core.createExprMacro("$GetterProperty", function ([key, body, typeAnnotation, span]) {
    return createAst("GetterProperty", { key, body, typeAnnotation, span }, this.span());
}, "(key: import(\"@swc/core\").PropertyName, body?: import(\"@swc/core\").BlockStatement, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").GetterProperty").proxy(runtime.createGetterProperty);
const $SetterProperty = core.createExprMacro("$SetterProperty", function ([key, param, body, span]) {
    return createAst("SetterProperty", { key, param, body, span }, this.span());
}, "(key: import(\"@swc/core\").PropertyName, param: import(\"@swc/core\").Pattern, body?: import(\"@swc/core\").BlockStatement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SetterProperty").proxy(runtime.createSetterProperty);
const $MethodProperty = core.createExprMacro("$MethodProperty", function ([key, params, body, async, generator, decorators, typeParameters, returnType, span]) {
    return createAst("MethodProperty", { key, params, body, async: optional(async, false), generator: optional(generator, false), decorators, typeParameters, returnType, span }, this.span());
}, "(key: import(\"@swc/core\").PropertyName, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, async?: boolean, generator?: boolean, decorators?: import(\"@swc/core\").Decorator[], typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").MethodProperty").proxy(runtime.createMethodProperty);
const $Computed = core.createExprMacro("$Computed", function ([expression, span]) {
    return createAst("Computed", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ComputedPropName").proxy(runtime.createComputed);
const $ComputedPropName = core.createExprMacro("$ComputedPropName", function ([expression, span]) {
    return createAst("Computed", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ComputedPropName").proxy(runtime.createComputedPropName);
const $BlockStatement = core.createExprMacro("$BlockStatement", function ([stmts, span]) {
    return createAst("BlockStatement", { stmts: optional(stmts, []), span }, this.span());
}, "(stmts: import(\"@swc/core\").Statement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BlockStatement").proxy(runtime.createBlockStatement);
const $ExpressionStatement = core.createExprMacro("$ExpressionStatement", function ([expression, span]) {
    return createAst("ExpressionStatement", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExpressionStatement").proxy(runtime.createExpressionStatement);
const $EmptyStatement = core.createExprMacro("$EmptyStatement", function ([span]) {
    return createAst("EmptyStatement", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").EmptyStatement").proxy(runtime.createEmptyStatement);
const $DebuggerStatement = core.createExprMacro("$DebuggerStatement", function ([span]) {
    return createAst("DebuggerStatement", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").DebuggerStatement").proxy(runtime.createDebuggerStatement);
const $WithStatement = core.createExprMacro("$WithStatement", function ([object, body, span]) {
    return createAst("WithStatement", { object, body, span }, this.span());
}, "(object: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").WithStatement").proxy(runtime.createWithStatement);
const $ReturnStatement = core.createExprMacro("$ReturnStatement", function ([argument, span]) {
    return createAst("ReturnStatement", { argument, span }, this.span());
}, "(argument?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ReturnStatement").proxy(runtime.createReturnStatement);
const $LabeledStatement = core.createExprMacro("$LabeledStatement", function ([label, body, span]) {
    return createAst("LabeledStatement", { label, body, span }, this.span());
}, "(label: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").LabeledStatement").proxy(runtime.createLabeledStatement);
const $BreakStatement = core.createExprMacro("$BreakStatement", function ([label, span]) {
    return createAst("BreakStatement", { label, span }, this.span());
}, "(label?: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BreakStatement").proxy(runtime.createBreakStatement);
const $ContinueStatement = core.createExprMacro("$ContinueStatement", function ([label, span]) {
    return createAst("ContinueStatement", { label, span }, this.span());
}, "(label?: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ContinueStatement").proxy(runtime.createContinueStatement);
const $IfStatement = core.createExprMacro("$IfStatement", function ([test, consequent, alternate, span]) {
    return createAst("IfStatement", { test, consequent, alternate, span }, this.span());
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Statement, alternate?: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").IfStatement").proxy(runtime.createIfStatement);
const $SwitchStatement = core.createExprMacro("$SwitchStatement", function ([discriminant, cases, span]) {
    return createAst("SwitchStatement", { discriminant, cases: optional(cases, []), span }, this.span());
}, "(discriminant: import(\"@swc/core\").Expression, cases?: import(\"@swc/core\").SwitchCase[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SwitchStatement").proxy(runtime.createSwitchStatement);
const $ThrowStatement = core.createExprMacro("$ThrowStatement", function ([argument, span]) {
    return createAst("ThrowStatement", { argument, span }, this.span());
}, "(argument: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ThrowStatement").proxy(runtime.createThrowStatement);
const $TryStatement = core.createExprMacro("$TryStatement", function ([block, handler, finalizer, span]) {
    return createAst("TryStatement", { block, handler, finalizer, span }, this.span());
}, "(block: import(\"@swc/core\").BlockStatement, handler?: import(\"@swc/core\").CatchClause, finalizer?: import(\"@swc/core\").BlockStatement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TryStatement").proxy(runtime.createTryStatement);
const $WhileStatement = core.createExprMacro("$WhileStatement", function ([test, body, span]) {
    return createAst("WhileStatement", { test, body, span }, this.span());
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").WhileStatement").proxy(runtime.createWhileStatement);
const $DoWhileStatement = core.createExprMacro("$DoWhileStatement", function ([test, body, span]) {
    return createAst("DoWhileStatement", { test, body, span }, this.span());
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").DoWhileStatement").proxy(runtime.createDoWhileStatement);
const $ForStatement = core.createExprMacro("$ForStatement", function ([body, init, test, update, span]) {
    return createAst("ForStatement", { body, init, test, update, span }, this.span());
}, "(body: import(\"@swc/core\").Statement, init?: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Expression, test?: import(\"@swc/core\").Expression, update?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForStatement").proxy(runtime.createForStatement);
const $ForInStatement = core.createExprMacro("$ForInStatement", function ([left, right, body, span]) {
    return createAst("ForInStatement", { left, right, body, span }, this.span());
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForInStatement").proxy(runtime.createForInStatement);
const $ForOfStatement = core.createExprMacro("$ForOfStatement", function ([left, right, body, _await, span]) {
    return createAst("ForOfStatement", { left, right, body, await: _await, span }, this.span());
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, _await?: import(\"@swc/core\").Span, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForOfStatement").proxy(runtime.createForOfStatement);
const $SwitchCase = core.createExprMacro("$SwitchCase", function ([test, consequent, span]) {
    return createAst("SwitchCase", { test, consequent: optional(consequent, []), span }, this.span());
}, "(test?: import(\"@swc/core\").Expression, consequent?: import(\"@swc/core\").Statement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SwitchCase").proxy(runtime.createSwitchCase);
const $CatchClause = core.createExprMacro("$CatchClause", function ([body, param, span]) {
    return createAst("CatchClause", { body, param, span }, this.span());
}, "(body: import(\"@swc/core\").BlockStatement, param?: import(\"@swc/core\").Pattern, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").CatchClause").proxy(runtime.createCatchClause);
const $TsTypeAnnotation = core.createExprMacro("$TsTypeAnnotation", function ([typeAnnotation, span]) {
    return createAst("TsTypeAnnotation", { typeAnnotation, span }, this.span());
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeAnnotation").proxy(runtime.createTsTypeAnnotation);
const $TsTypeParameterDeclaration = core.createExprMacro("$TsTypeParameterDeclaration", function ([parameters, span]) {
    return createAst("TsTypeParameterDeclaration", { parameters: optional(parameters, []), span }, this.span());
}, "(parameters?: import(\"@swc/core\").TsTypeParameter[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeParameterDeclaration").proxy(runtime.createTsTypeParameterDeclaration);
const $TsTypeParameter = core.createExprMacro("$TsTypeParameter", function ([name, _in, _out, constraint, _default, span]) {
    return createAst("TsTypeParameter", { name, in: _in, out: _out, constraint, default: _default, span }, this.span());
}, "(name: import(\"@swc/core\").Identifier, _in: boolean, _out: boolean, constraint?: import(\"@swc/core\").TsType, _default?: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeParameter").proxy(runtime.createTsTypeParameter);
const $TsTypeParameterInstantiation = core.createExprMacro("$TsTypeParameterInstantiation", function ([params, span]) {
    return createAst("TsTypeParameterInstantiation", { params: optional(params, []), span }, this.span());
}, "(params?: import(\"@swc/core\").TsType[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeParameterInstantiation").proxy(runtime.createTsTypeParameterInstantiation);
const $TsParameterProperty = core.createExprMacro("$TsParameterProperty", function ([param, accessibility, decorators, override, readonly, span]) {
    return createAst("TsParameterProperty", { param, accessibility, decorators, override: optional(override, false), readonly: optional(readonly, false), span }, this.span());
}, "(param: import(\"@swc/core\").TsParameterPropertyParameter, accessibility?: import(\"@swc/core\").Accessibility, decorators?: import(\"@swc/core\").Decorator[], override?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsParameterProperty").proxy(runtime.createTsParameterProperty);
const $TsQualifiedName = core.createExprMacro("$TsQualifiedName", function ([left, right]) {
    const span = this.span();
    return {
        type: "ObjectExpression",
        span,
        properties: [createAstProp("type", { type: "StringLiteral", value: "TsQualifiedName", span }, span), createAstProp("left", left, span), createAstProp("right", right, span)]
    };
}, "(left: import(\"@swc/core\").TsEntityName, right: import(\"@swc/core\").Identifier) => import(\"@swc/core\").TsQualifiedName").proxy(runtime.createTsQualifiedName);
const $TsCallSignatureDeclaration = core.createExprMacro("$TsCallSignatureDeclaration", function ([params, typeAnnotation, typeParams, span]) {
    return createAst("TsCallSignatureDeclaration", { params: optional(params, []), typeAnnotation, typeParams, span }, this.span());
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsCallSignatureDeclaration").proxy(runtime.createTsCallSignatureDeclaration);
const $TsConstructSignatureDeclaration = core.createExprMacro("$TsConstructSignatureDeclaration", function ([params, typeAnnotation, typeParams, span]) {
    return createAst("TsConstructSignatureDeclaration", { params: optional(params, []), typeAnnotation, typeParams, span }, this.span());
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConstructSignatureDeclaration").proxy(runtime.createTsConstructSignatureDeclaration);
const $TsPropertySignature = core.createExprMacro("$TsPropertySignature", function ([key, params, init, typeAnnotation, typeParams, computed, isOptional, readonly, span]) {
    return createAst("TsPropertySignature", { key, params, init, typeAnnotation, typeParams, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span());
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], init?: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsPropertySignature").proxy(runtime.createTsPropertySignature);
const $TsGetterSignature = core.createExprMacro("$TsGetterSignature", function ([key, typeAnnotation, computed, isOptional, readonly, span]) {
    return createAst("TsGetterSignature", { key, typeAnnotation, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span());
}, "(key: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsGetterSignature").proxy(runtime.createTsGetterSignature);
const $TsSetterSignature = core.createExprMacro("$TsSetterSignature", function ([key, param, computed, isOptional, readonly, span]) {
    return createAst("TsSetterSignature", { key, param, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span());
}, "(key: import(\"@swc/core\").Expression, param: import(\"@swc/core\").TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsSetterSignature").proxy(runtime.createTsSetterSignature);
const $TsMethodSignature = core.createExprMacro("$TsMethodSignature", function ([key, params, typeAnn, typeParams, computed, isOptional, readonly, span]) {
    return createAst("TsMethodSignature", { key, params, typeAnn, typeParams, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span());
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], typeAnn?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsMethodSignature").proxy(runtime.createTsMethodSignature);
const $TsIndexSignature = core.createExprMacro("$TsIndexSignature", function ([params, typeAnnotation, readonly, isStatic, span]) {
    return createAst("TsIndexSignature", { params, typeAnnotation, readonly: optional(readonly, false), static: optional(isStatic, false), span }, this.span());
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, readonly?: boolean, isStatic?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsIndexSignature").proxy(runtime.createTsIndexSignature);
const $TsKeywordType = core.createExprMacro("$TsKeywordType", function ([kind, span]) {
    return createAst("TsKeywordType", { kind, span }, this.span());
}, "(kind: import(\"@swc/core\").TsKeywordTypeKind, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsKeywordType").proxy(runtime.createTsKeywordType);
const $TsThisType = core.createExprMacro("$TsThisType", function ([span]) {
    return createAst("TsThisType", { span }, this.span());
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsThisType").proxy(runtime.createTsThisType);
const $TsFunctionType = core.createExprMacro("$TsFunctionType", function ([params, typeAnnotation, typeParams, span]) {
    return createAst("TsFunctionType", { params, typeAnnotation, typeParams, span }, this.span());
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsFunctionType").proxy(runtime.createTsFunctionType);
const $TsConstructorType = core.createExprMacro("$TsConstructorType", function ([params, typeAnnotation, typeParams, isAbstract, span]) {
    return createAst("TsConstructorType", { params, typeAnnotation, typeParams, isAbstract: optional(isAbstract, false), span }, this.span());
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, isAbstract?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConstructorType").proxy(runtime.createTsConstructorType);
const $TsTypeReference = core.createExprMacro("$TsTypeReference", function ([typeName, typeParams, span]) {
    return createAst("TsTypeReference", { typeName, typeParams, span }, this.span());
}, "(typeName: import(\"@swc/core\").TsEntityName, typeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeReference").proxy(runtime.createTsTypeReference);
const $TsTypePredicate = core.createExprMacro("$TsTypePredicate", function ([paramName, typeAnnotation, asserts, span]) {
    return createAst("TsTypePredicate", { paramName, typeAnnotation, asserts: optional(asserts, false), span }, this.span());
}, "(paramName: import(\"@swc/core\").TsThisTypeOrIdent, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, asserts?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypePredicate").proxy(runtime.createTsTypePredicate);
const $TsImportType = core.createExprMacro("$TsImportType", function ([argument, qualifier, typeArguments, span]) {
    return createAst("TsImportType", { argument, qualifier, typeArguments, span }, this.span());
}, "(argument: stringLiteral, qualifier?: import(\"@swc/core\").TsEntityName, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsImportType").proxy(runtime.createTsImportType);
const $TsTypeQuery = core.createExprMacro("$TsTypeQuery", function ([exprName, typeArguments, span]) {
    return createAst("TsTypeQuery", { exprName, typeArguments, span }, this.span());
}, "(exprName: import(\"@swc/core\").TsTypeQueryExpr, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeQuery").proxy(runtime.createTsTypeQuery);
const $TsTypeLiteral = core.createExprMacro("$TsTypeLiteral", function ([members, span]) {
    return createAst("TsTypeLiteral", { members: optional(members, []), span }, this.span());
}, "(members?: import(\"@swc/core\").TsTypeElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeLiteral").proxy(runtime.createTsTypeLiteral);
const $TsArrayType = core.createExprMacro("$TsArrayType", function ([elemType, span]) {
    return createAst("TsArrayType", { elemType, span }, this.span());
}, "(elemType: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsArrayType").proxy(runtime.createTsArrayType);
const $TsTupleType = core.createExprMacro("$TsTupleType", function ([elemTypes, span]) {
    return createAst("TsTupleType", { elemTypes: optional(elemTypes, []), span }, this.span());
}, "(elemTypes?: import(\"@swc/core\").TsTupleElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTupleType").proxy(runtime.createTsTupleType);
const $TsTupleElement = core.createExprMacro("$TsTupleElement", function ([ty, label, span]) {
    return createAst("TsTupleElement", { ty, label, span }, this.span());
}, "(ty: import(\"@swc/core\").TsType, label?: import(\"@swc/core\").Pattern, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTupleElement").proxy(runtime.createTsTupleElement);
const $TsOptionalType = core.createExprMacro("$TsOptionalType", function ([typeAnnotation, span]) {
    return createAst("TsOptionalType", { typeAnnotation, span }, this.span());
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsOptionalType").proxy(runtime.createTsOptionalType);
const $TsRestType = core.createExprMacro("$TsRestType", function ([typeAnnotation, span]) {
    return createAst("TsRestType", { typeAnnotation, span }, this.span());
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsRestType").proxy(runtime.createTsRestType);
const $TsUnionType = core.createExprMacro("$TsUnionType", function ([types, span]) {
    return createAst("TsUnionType", { types, span }, this.span());
}, "(types: import(\"@swc/core\").TsType[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsUnionType").proxy(runtime.createTsUnionType);
const $TsIntersectionType = core.createExprMacro("$TsIntersectionType", function ([types, span]) {
    return createAst("TsIntersectionType", { types, span }, this.span());
}, "(types: import(\"@swc/core\").TsType[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsIntersectionType").proxy(runtime.createTsIntersectionType);
const $TsConditionalType = core.createExprMacro("$TsConditionalType", function ([checkType, extendsType, trueType, falseType, span]) {
    return createAst("TsConditionalType", { checkType, extendsType, trueType, falseType, span }, this.span());
}, "(checkType: import(\"@swc/core\").TsType, extendsType: import(\"@swc/core\").TsType, trueType: import(\"@swc/core\").TsType, falseType: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConditionalType").proxy(runtime.createTsConditionalType);
const $TsInferType = core.createExprMacro("$TsInferType", function ([typeParam, span]) {
    return createAst("TsInferType", { typeParam, span }, this.span());
}, "(typeParam: import(\"@swc/core\").TsTypeParameter, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInferType").proxy(runtime.createTsInferType);
const $TsParenthesizedType = core.createExprMacro("$TsParenthesizedType", function ([typeAnnotation, span]) {
    return createAst("TsParenthesizedType", { typeAnnotation, span }, this.span());
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsParenthesizedType").proxy(runtime.createTsParenthesizedType);
const $TsTypeOperator = core.createExprMacro("$TsTypeOperator", function ([op, typeAnnotation, span]) {
    return createAst("TsTypeOperator", { op, typeAnnotation, span }, this.span());
}, "(op: import(\"@swc/core\").TsTypeOperatorOp, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeOperator").proxy(runtime.createTsTypeOperator);
const $TsIndexedAccessType = core.createExprMacro("$TsIndexedAccessType", function ([objectType, indexType, readonly, span]) {
    return createAst("TsIndexedAccessType", { objectType, indexType, readonly: optional(readonly, false), span }, this.span());
}, "(objectType: import(\"@swc/core\").TsType, indexType: import(\"@swc/core\").TsType, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsIndexedAccessType").proxy(runtime.createTsIndexedAccessType);
const $TsMappedType = core.createExprMacro("$TsMappedType", function ([typeParam, typeAnnotation, nameType, optional, readonly, span]) {
    return createAst("TsMappedType", { typeParam, typeAnnotation, nameType, optional, readonly, span }, this.span());
}, "(typeParam: import(\"@swc/core\").TsTypeParameter, typeAnnotation?: import(\"@swc/core\").TsType, nameType?: import(\"@swc/core\").TsType, optional?: import(\"@swc/core\").TruePlusMinus, readonly?: import(\"@swc/core\").TruePlusMinus, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsMappedType").proxy(runtime.createTsMappedType);
const $TsLiteralType = core.createExprMacro("$TsLiteralType", function ([literal, span]) {
    return createAst("TsLiteralType", { literal, span }, this.span());
}, "(literal: import(\"@swc/core\").TsLiteral, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsLiteralType").proxy(runtime.createTsLiteralType);
const $TsTemplateLiteralType = core.createExprMacro("$TsTemplateLiteralType", function ([types, quasis, span]) {
    return createAst("TsTemplateLiteralType", { types: optional(types, []), quasis: optional(quasis, []), span }, this.span());
}, "(types?: import(\"@swc/core\").TsType[], quasis?: import(\"@swc/core\").TemplateElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTemplateLiteralType").proxy(runtime.createTsTemplateLiteralType);
const $TsInterfaceDeclaration = core.createExprMacro("$TsInterfaceDeclaration", function ([id, body, _extends, typeParams, declare, span]) {
    return createAst("TsInterfaceDeclaration", { id, body, extends: _extends, typeParams, declare: optional(declare, false), span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsInterfaceBody, _extends?: import(\"@swc/core\").TsExpressionWithTypeArguments[], typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInterfaceDeclaration").proxy(runtime.createTsInterfaceDeclaration);
const $TsInterfaceBody = core.createExprMacro("$TsInterfaceBody", function ([body, span]) {
    return createAst("TsInterfaceBody", { body: optional(body, []), span }, this.span());
}, "(body?: import(\"@swc/core\").TsTypeElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInterfaceBody").proxy(runtime.createTsInterfaceBody);
const $TsExpressionWithTypeArguments = core.createExprMacro("$TsExpressionWithTypeArguments", function ([expression, typeArguments, span]) {
    return createAst("TsExpressionWithTypeArguments", { expression, typeArguments, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsExpressionWithTypeArguments").proxy(runtime.createTsExpressionWithTypeArguments);
const $TsTypeAliasDeclaration = core.createExprMacro("$TsTypeAliasDeclaration", function ([id, typeAnnotation, typeParams, declare, span]) {
    return createAst("TsTypeAliasDeclaration", { id, typeAnnotation, typeParams, declare: optional(declare, false), span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, typeAnnotation: import(\"@swc/core\").TsType, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeAliasDeclaration").proxy(runtime.createTsTypeAliasDeclaration);
const $TsEnumDeclaration = core.createExprMacro("$TsEnumDeclaration", function ([id, members, declare, isConst, span]) {
    return createAst("TsEnumDeclaration", { id, declare: optional(declare, false), isConst: optional(isConst, false), members: optional(members, []), span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, members?: import(\"@swc/core\").TsEnumMember[], declare?: boolean, isConst?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsEnumDeclaration").proxy(runtime.createTsEnumDeclaration);
const $TsEnumMember = core.createExprMacro("$TsEnumMember", function ([id, init, span]) {
    return createAst("TsEnumMember", { id, init, span }, this.span());
}, "(id: import(\"@swc/core\").TsEnumMemberId, init?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsEnumMember").proxy(runtime.createTsEnumMember);
const $TsModuleDeclaration = core.createExprMacro("$TsModuleDeclaration", function ([id, body, declare, global, span]) {
    return createAst("TsModuleDeclaration", { id, body, declare: optional(declare, false), global: optional(global, false), span }, this.span());
}, "(id: import(\"@swc/core\").TsModuleName, body?: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsModuleDeclaration").proxy(runtime.createTsModuleDeclaration);
const $TsModuleBlock = core.createExprMacro("$TsModuleBlock", function ([body, span]) {
    return createAst("TsModuleBlock", { body, span }, this.span());
}, "(body: import(\"@swc/core\").ModuleItem[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsModuleBlock").proxy(runtime.createTsModuleBlock);
const $TsNamespaceDeclaration = core.createExprMacro("$TsNamespaceDeclaration", function ([id, body, declare, global, span]) {
    return createAst("TsNamespaceDeclaration", { id, body, declare: optional(declare, false), global: optional(global, false), span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsNamespaceDeclaration").proxy(runtime.createTsNamespaceDeclaration);
const $TsImportEqualsDeclaration = core.createExprMacro("$TsImportEqualsDeclaration", function ([id, moduleRef, declare, isExport, isTypeOnly, span]) {
    return createAst("TsImportEqualsDeclaration", { id, moduleRef, declare: optional(declare, false), isExport: optional(isExport, false), isTypeOnly: optional(isTypeOnly, false), span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, moduleRef: import(\"@swc/core\").TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsImportEqualsDeclaration").proxy(runtime.createTsImportEqualsDeclaration);
const $TsExternalModuleReference = core.createExprMacro("$TsExternalModuleReference", function ([expression, span]) {
    return createAst("TsExternalModuleReference", { expression, span }, this.span());
}, "(expression: stringLiteral, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsExternalModuleReference").proxy(runtime.createTsExternalModuleReference);
const $TsExportAssignment = core.createExprMacro("$TsExportAssignment", function ([expression, span]) {
    return createAst("TsExportAssignment", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsExportAssignment").proxy(runtime.createTsExportAssignment);
const $TsNamespaceExportDeclaration = core.createExprMacro("$TsNamespaceExportDeclaration", function ([id, span]) {
    return createAst("TsNamespaceExportDeclaration", { id, span }, this.span());
}, "(id: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsNamespaceExportDeclaration").proxy(runtime.createTsNamespaceExportDeclaration);
const $TsAsExpression = core.createExprMacro("$TsAsExpression", function ([expression, typeAnnotation, span]) {
    return createAst("TsAsExpression", { expression, typeAnnotation, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsAsExpression").proxy(runtime.createTsAsExpression);
const $TsSatisfiesExpression = core.createExprMacro("$TsSatisfiesExpression", function ([expression, typeAnnotation, span]) {
    return createAst("TsSatisfiesExpression", { expression, typeAnnotation, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsSatisfiesExpression").proxy(runtime.createTsSatisfiesExpression);
const $TsInstantiation = core.createExprMacro("$TsInstantiation", function ([expression, typeArguments, span]) {
    return createAst("TsInstantiation", { expression, typeArguments, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, typeArguments: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInstantiation").proxy(runtime.createTsInstantiation);
const $TsTypeAssertion = core.createExprMacro("$TsTypeAssertion", function ([expression, typeAnnotation, span]) {
    return createAst("TsTypeAssertion", { expression, typeAnnotation, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeAssertion").proxy(runtime.createTsTypeAssertion);
const $TsConstAssertion = core.createExprMacro("$TsConstAssertion", function ([expression, span]) {
    return createAst("TsConstAssertion", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConstAssertion").proxy(runtime.createTsConstAssertion);
const $TsNonNullExpression = core.createExprMacro("$TsNonNullExpression", function ([expression, span]) {
    return createAst("TsNonNullExpression", { expression, span }, this.span());
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsNonNullExpression").proxy(runtime.createTsNonNullExpression);
const $Invalid = core.createExprMacro("$Invalid", function ([span]) { return createAst("Invalid", { span }, this.span()); }, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Invalid").proxy(runtime.createInvalid);

exports.$Argument = $Argument;
exports.$ArrayExpression = $ArrayExpression;
exports.$ArrayPattern = $ArrayPattern;
exports.$ArrowFunctionExpression = $ArrowFunctionExpression;
exports.$AssignmentExpression = $AssignmentExpression;
exports.$AssignmentPattern = $AssignmentPattern;
exports.$AssignmentPatternProperty = $AssignmentPatternProperty;
exports.$AssignmentProperty = $AssignmentProperty;
exports.$AwaitExpression = $AwaitExpression;
exports.$BigIntLiteral = $BigIntLiteral;
exports.$BinaryExpression = $BinaryExpression;
exports.$BlockStatement = $BlockStatement;
exports.$BooleanLiteral = $BooleanLiteral;
exports.$BreakStatement = $BreakStatement;
exports.$CallExpression = $CallExpression;
exports.$CatchClause = $CatchClause;
exports.$ClassDeclaration = $ClassDeclaration;
exports.$ClassExpression = $ClassExpression;
exports.$ClassMethod = $ClassMethod;
exports.$ClassProperty = $ClassProperty;
exports.$Computed = $Computed;
exports.$ComputedPropName = $ComputedPropName;
exports.$ConditionalExpression = $ConditionalExpression;
exports.$Constructor = $Constructor;
exports.$ContinueStatement = $ContinueStatement;
exports.$DebuggerStatement = $DebuggerStatement;
exports.$Decorator = $Decorator;
exports.$DoWhileStatement = $DoWhileStatement;
exports.$EmptyStatement = $EmptyStatement;
exports.$ExportAllDeclaration = $ExportAllDeclaration;
exports.$ExportDeclaration = $ExportDeclaration;
exports.$ExportDefaultDeclaration = $ExportDefaultDeclaration;
exports.$ExportDefaultExpression = $ExportDefaultExpression;
exports.$ExportDefaultSpecifier = $ExportDefaultSpecifier;
exports.$ExportNamedDeclaration = $ExportNamedDeclaration;
exports.$ExportNamespaceSpecifier = $ExportNamespaceSpecifier;
exports.$ExportSpecifier = $ExportSpecifier;
exports.$ExprOrSpread = $ExprOrSpread;
exports.$ExpressionStatement = $ExpressionStatement;
exports.$ForInStatement = $ForInStatement;
exports.$ForOfStatement = $ForOfStatement;
exports.$ForStatement = $ForStatement;
exports.$FunctionDeclaration = $FunctionDeclaration;
exports.$FunctionExpression = $FunctionExpression;
exports.$GetterProperty = $GetterProperty;
exports.$Identifier = $Identifier;
exports.$IfStatement = $IfStatement;
exports.$Import = $Import;
exports.$ImportDeclaration = $ImportDeclaration;
exports.$ImportDefaultSpecifier = $ImportDefaultSpecifier;
exports.$ImportNamespaceSpecifier = $ImportNamespaceSpecifier;
exports.$ImportSpecifier = $ImportSpecifier;
exports.$Invalid = $Invalid;
exports.$JSXAttribute = $JSXAttribute;
exports.$JSXClosingElement = $JSXClosingElement;
exports.$JSXClosingFragment = $JSXClosingFragment;
exports.$JSXElement = $JSXElement;
exports.$JSXEmptyExpression = $JSXEmptyExpression;
exports.$JSXExpressionContainer = $JSXExpressionContainer;
exports.$JSXFragment = $JSXFragment;
exports.$JSXMemberExpression = $JSXMemberExpression;
exports.$JSXNamespacedName = $JSXNamespacedName;
exports.$JSXOpeningElement = $JSXOpeningElement;
exports.$JSXOpeningFragment = $JSXOpeningFragment;
exports.$JSXSpreadChild = $JSXSpreadChild;
exports.$JSXText = $JSXText;
exports.$KeyValuePatternProperty = $KeyValuePatternProperty;
exports.$KeyValueProperty = $KeyValueProperty;
exports.$LabeledStatement = $LabeledStatement;
exports.$MemberExpression = $MemberExpression;
exports.$MetaProperty = $MetaProperty;
exports.$MethodProperty = $MethodProperty;
exports.$Module = $Module;
exports.$NamedExportSpecifier = $NamedExportSpecifier;
exports.$NamedImportSpecifier = $NamedImportSpecifier;
exports.$NewExpression = $NewExpression;
exports.$NullLiteral = $NullLiteral;
exports.$NumericLiteral = $NumericLiteral;
exports.$ObjectExpression = $ObjectExpression;
exports.$ObjectPattern = $ObjectPattern;
exports.$OptionalChainingCall = $OptionalChainingCall;
exports.$OptionalChainingExpression = $OptionalChainingExpression;
exports.$Param = $Param;
exports.$ParenthesisExpression = $ParenthesisExpression;
exports.$PrivateMethod = $PrivateMethod;
exports.$PrivateName = $PrivateName;
exports.$PrivateProperty = $PrivateProperty;
exports.$RegExpLiteral = $RegExpLiteral;
exports.$RestElement = $RestElement;
exports.$ReturnStatement = $ReturnStatement;
exports.$Script = $Script;
exports.$SequenceExpression = $SequenceExpression;
exports.$SetterProperty = $SetterProperty;
exports.$Span = $Span;
exports.$SpreadElement = $SpreadElement;
exports.$StaticBlock = $StaticBlock;
exports.$StringLiteral = $StringLiteral;
exports.$Super = $Super;
exports.$SuperPropExpression = $SuperPropExpression;
exports.$SwitchCase = $SwitchCase;
exports.$SwitchStatement = $SwitchStatement;
exports.$TaggedTemplateExpression = $TaggedTemplateExpression;
exports.$TemplateElement = $TemplateElement;
exports.$TemplateLiteral = $TemplateLiteral;
exports.$ThisExpression = $ThisExpression;
exports.$ThrowStatement = $ThrowStatement;
exports.$TryStatement = $TryStatement;
exports.$TsArrayType = $TsArrayType;
exports.$TsAsExpression = $TsAsExpression;
exports.$TsCallSignatureDeclaration = $TsCallSignatureDeclaration;
exports.$TsConditionalType = $TsConditionalType;
exports.$TsConstAssertion = $TsConstAssertion;
exports.$TsConstructSignatureDeclaration = $TsConstructSignatureDeclaration;
exports.$TsConstructorType = $TsConstructorType;
exports.$TsEnumDeclaration = $TsEnumDeclaration;
exports.$TsEnumMember = $TsEnumMember;
exports.$TsExportAssignment = $TsExportAssignment;
exports.$TsExpressionWithTypeArguments = $TsExpressionWithTypeArguments;
exports.$TsExternalModuleReference = $TsExternalModuleReference;
exports.$TsFunctionType = $TsFunctionType;
exports.$TsGetterSignature = $TsGetterSignature;
exports.$TsImportEqualsDeclaration = $TsImportEqualsDeclaration;
exports.$TsImportType = $TsImportType;
exports.$TsIndexSignature = $TsIndexSignature;
exports.$TsIndexedAccessType = $TsIndexedAccessType;
exports.$TsInferType = $TsInferType;
exports.$TsInstantiation = $TsInstantiation;
exports.$TsInterfaceBody = $TsInterfaceBody;
exports.$TsInterfaceDeclaration = $TsInterfaceDeclaration;
exports.$TsIntersectionType = $TsIntersectionType;
exports.$TsKeywordType = $TsKeywordType;
exports.$TsLiteralType = $TsLiteralType;
exports.$TsMappedType = $TsMappedType;
exports.$TsMethodSignature = $TsMethodSignature;
exports.$TsModuleBlock = $TsModuleBlock;
exports.$TsModuleDeclaration = $TsModuleDeclaration;
exports.$TsNamespaceDeclaration = $TsNamespaceDeclaration;
exports.$TsNamespaceExportDeclaration = $TsNamespaceExportDeclaration;
exports.$TsNonNullExpression = $TsNonNullExpression;
exports.$TsOptionalType = $TsOptionalType;
exports.$TsParameterProperty = $TsParameterProperty;
exports.$TsParenthesizedType = $TsParenthesizedType;
exports.$TsPropertySignature = $TsPropertySignature;
exports.$TsQualifiedName = $TsQualifiedName;
exports.$TsRestType = $TsRestType;
exports.$TsSatisfiesExpression = $TsSatisfiesExpression;
exports.$TsSetterSignature = $TsSetterSignature;
exports.$TsTemplateLiteralType = $TsTemplateLiteralType;
exports.$TsThisType = $TsThisType;
exports.$TsTupleElement = $TsTupleElement;
exports.$TsTupleType = $TsTupleType;
exports.$TsTypeAliasDeclaration = $TsTypeAliasDeclaration;
exports.$TsTypeAnnotation = $TsTypeAnnotation;
exports.$TsTypeAssertion = $TsTypeAssertion;
exports.$TsTypeLiteral = $TsTypeLiteral;
exports.$TsTypeOperator = $TsTypeOperator;
exports.$TsTypeParameter = $TsTypeParameter;
exports.$TsTypeParameterDeclaration = $TsTypeParameterDeclaration;
exports.$TsTypeParameterInstantiation = $TsTypeParameterInstantiation;
exports.$TsTypePredicate = $TsTypePredicate;
exports.$TsTypeQuery = $TsTypeQuery;
exports.$TsTypeReference = $TsTypeReference;
exports.$TsUnionType = $TsUnionType;
exports.$UnaryExpression = $UnaryExpression;
exports.$UpdateExpression = $UpdateExpression;
exports.$VariableDeclaration = $VariableDeclaration;
exports.$VariableDeclarator = $VariableDeclarator;
exports.$WhileStatement = $WhileStatement;
exports.$WithStatement = $WithStatement;
exports.$YieldExpression = $YieldExpression;
exports.createAst = createAst;
exports.isNullExpr = isNullExpr;
