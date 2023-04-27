'use strict';

var runtime = require('./runtime');
var core = require('@macro-plugin/core');

const spanStr = JSON.stringify(core.span);
const createAst = (type, props = {}) => {
    return core.parseExpr(`{
    "type": "${type}",
    ${Object.entries(props).map(([k, v]) => '"' + k + '": ' + (v ? (typeof v === "string" ? v : core.printExpr(v).code) : undefined)) + ","}
    "span": ${spanStr},
  }`);
};
const $True = {
    type: "BooleanLiteral",
    span: core.span,
    value: true
};
const $False = {
    type: "BooleanLiteral",
    span: core.span,
    value: false
};
const $Null = {
    type: "NullLiteral",
    span: core.span
};
const $Void = {
    type: "ArrayExpression",
    span: core.span,
    elements: []
};
function _JSONStringify(expression) {
    return {
        type: "CallExpression",
        span: core.span,
        callee: {
            type: "MemberExpression",
            span: core.span,
            object: {
                type: "Identifier",
                span: core.span,
                value: "JSON",
                optional: false
            },
            property: {
                type: "Identifier",
                span: core.span,
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
const $Identifier = core.createExprMacro("$Identifier", function ([value, optional = $False]) {
    return createAst("Identifier", { value, optional });
}, "(value: string, optional?: boolean) => import(\"@swc/core\").Identifier").proxy(runtime.createIdentifier);
const $StringLiteral = core.createExprMacro("$StringLiteral", function ([value, raw]) {
    return createAst("StringLiteral", { value, raw });
}, "(value: string, raw?: string) => stringLiteral").proxy(runtime.createStringLiteral);
const $NumericLiteral = core.createExprMacro("$NumericLiteral", function ([value, raw]) {
    return createAst("NumericLiteral", { value, raw });
}, "(value: number, raw?: string) => import(\"@swc/core\").NumericLiteral").proxy(runtime.createNumericLiteral);
const $BigIntLiteral = core.createExprMacro("$BigIntLiteral", function ([value, raw]) {
    return createAst("BigIntLiteral", { value, raw });
}, "(value: bigint, raw?: string) => import(\"@swc/core\").BigIntLiteral").proxy(runtime.createBigIntLiteral);
const $BooleanLiteral = core.createExprMacro("$BooleanLiteral", function ([value]) {
    return createAst("BooleanLiteral", { value });
}, "(value: boolean) => booleanLiteral").proxy(runtime.createBooleanLiteral);
const $NullLiteral = core.createExprMacro("$NullLiteral", function () {
    return createAst("NullLiteral");
}, "() => import(\"@swc/core\").NullLiteral").proxy(runtime.createNullLiteral);
const $RegExpLiteral = core.createExprMacro("$RegExpLiteral", function ([pattern, flags]) {
    return createAst("RegExpLiteral", { pattern, flags });
}, "(pattern: string, flags: string) => import(\"@swc/core\").RegExpLiteral").proxy(runtime.createRegExpLiteral);
const $Argument = core.createExprMacro("$Argument", function ([expression, spread]) {
    return this.parseExpr(`{
    ${spread ? ('"spread": ' + JSON.stringify(core.span) + ",") : ""}
    "expression": ${this.printExpr(expression)}
  }`);
}, "(expression: import(\"@swc/core\").Expression, spread?: boolean) => import(\"@swc/core\").Argument").proxy(runtime.createArgument);
const $CallExpression = core.createExprMacro("$CallExpression", function ([callee, callArgs = $Void, typeArguments]) {
    return createAst("CallExpression", {
        callee,
        arguments: callArgs,
        typeArguments
    });
}, "(callee: import(\"@swc/core\").Expression | import(\"@swc/core\").Super | import(\"@swc/core\").Import, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").CallExpression").proxy(runtime.createCallExpression);
const $ClassProperty = core.createExprMacro("$ClassProperty", function ([key, value, accessibility, typeAnnotation, decorators, declare = $False, definite = $False, isAbstract = $False, isOptional = $False, isOverride = $False, isStatic = $False, readonly = $False]) {
    return createAst("ClassProperty", { key, value, accessibility, typeAnnotation, decorators, declare, definite, isAbstract, isOptional, isOverride, readonly, isStatic });
}, "(key: import(\"@swc/core\").PropertyName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => import(\"@swc/core\").ClassProperty").proxy(runtime.createClassProperty);
const $PrivateProperty = core.createExprMacro("$PrivateProperty", function ([key, value, accessibility, typeAnnotation, decorators, definite = $False, isOptional = $False, isOverride = $False, isStatic = $False, readonly = $False]) {
    return createAst("PrivateProperty", { key, value, accessibility, typeAnnotation, decorators, definite, isOptional, isOverride, isStatic, readonly });
}, "(key: import(\"@swc/core\").PrivateName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => import(\"@swc/core\").PrivateProperty").proxy(runtime.createPrivateProperty);
const $Param = core.createExprMacro("$Param", function ([pat, decorators]) {
    return createAst("Parameter", { pat, decorators });
}, "(pat: import(\"@swc/core\").Pattern, decorators?: import(\"@swc/core\").Decorator[]) => import(\"@swc/core\").Param").proxy(runtime.createParam);
const $Constructor = core.createExprMacro("$Constructor", function ([key, params, body, accessibility, isOptional = $False]) {
    return createAst("Constructor", { key, params, body, accessibility, isOptional });
}, "(key: import(\"@swc/core\").PropertyName, params: (import(\"@swc/core\").TsParameterProperty | import(\"@swc/core\").Param)[], body?: import(\"@swc/core\").BlockStatement, accessibility?: import(\"@swc/core\").Accessibility, isOptional?: boolean) => import(\"@swc/core\").Constructor").proxy(runtime.createConstructor);
const $ClassMethod = core.createExprMacro("$ClassMethod", function ([kind, key, fn, accessibility, isAbstract = $False, isOptional = $False, isOverride = $False, isStatic = $False]) {
    return createAst("ClassMethod", { kind, key, function: fn, accessibility, isAbstract, isOptional, isOverride, isStatic });
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PropertyName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => import(\"@swc/core\").ClassMethod").proxy(runtime.createClassMethod);
const $PrivateMethod = core.createExprMacro("$PrivateMethod", function ([kind, key, fn, accessibility, isAbstract = $False, isOptional = $False, isOverride = $False, isStatic = $False]) {
    return createAst("PrivateMethod", { kind, key, function: fn, accessibility, isAbstract, isOptional, isOverride, isStatic });
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PrivateName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => import(\"@swc/core\").PrivateMethod").proxy(runtime.createPrivateMethod);
const $StaticBlock = core.createExprMacro("$StaticBlock", function ([body]) {
    return createAst("StaticBlock", { body });
}, "(body: import(\"@swc/core\").BlockStatement) => import(\"@swc/core\").StaticBlock").proxy(runtime.createStaticBlock);
const $Decorator = core.createExprMacro("$Decorator", function ([expression]) {
    return createAst("Decorator", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").Decorator").proxy(runtime.createDecorator);
const $FunctionDeclaration = core.createExprMacro("$FunctionDeclaration", function ([identifier, params, body, typeParameters, returnType, decorators, declare = $False, async = $False, generator = $False]) {
    return createAst("FunctionDeclaration", { identifier, params, body, typeParameters, returnType, decorators, declare, async, generator });
}, "(identifier: import(\"@swc/core\").Identifier, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, async?: boolean, generator?: boolean) => import(\"@swc/core\").FunctionDeclaration").proxy(runtime.createFunctionDeclaration);
const $ClassDeclaration = core.createExprMacro("$ClassDeclaration", function ([identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare = $False, isAbstract = $False]) {
    return createAst("ClassDeclaration", { identifier, body, implements: impls, superClass, typeParams, superTypeParams, decorators, declare, isAbstract });
}, "(identifier: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").ClassMember[], impls: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, isAbstract?: boolean) => import(\"@swc/core\").ClassDeclaration").proxy(runtime.createClassDeclaration);
const $VariableDeclaration = core.createExprMacro("$VariableDeclaration", function ([kind, declarations = $Void, declare = $False]) {
    return createAst("VariableDeclaration", { kind, declare, declarations });
}, "(kind: import(\"@swc/core\").VariableDeclarationKind, declarations?: import(\"@swc/core\").VariableDeclarator[], declare?: boolean) => import(\"@swc/core\").VariableDeclaration").proxy(runtime.createVariableDeclaration);
const $VariableDeclarator = core.createExprMacro("$VariableDeclarator", function ([id, init, definite = $False]) {
    return createAst("VariableDeclarator", { id, definite, init });
}, "(id: import(\"@swc/core\").Pattern, init?: import(\"@swc/core\").Expression, definite?: boolean) => import(\"@swc/core\").VariableDeclarator").proxy(runtime.createVariableDeclarator);
const $OptionalChainingExpression = core.createExprMacro("$OptionalChainingExpression", function ([base]) {
    return createAst("OptionalChainingExpression", { base, questionDotToken: spanStr });
}, "(base: import(\"@swc/core\").MemberExpression | import(\"@swc/core\").OptionalChainingCall) => import(\"@swc/core\").OptionalChainingExpression").proxy(runtime.createOptionalChainingExpression);
const $OptionalChainingCall = core.createExprMacro("$OptionalChainingCall", function ([callee, args = $Void, typeArguments]) {
    return createAst("OptionalChainingCall", { callee, arguments: args, typeArguments });
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").ExprOrSpread[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").OptionalChainingCall").proxy(runtime.createOptionalChainingCall);
const $ThisExpression = core.createExprMacro("$ThisExpression", function () {
    return createAst("ThisExpression");
}, "() => import(\"@swc/core\").ThisExpression").proxy(runtime.createThisExpression);
const $ArrayExpression = core.createExprMacro("$ArrayExpression", function ([elements = $Void]) {
    return createAst("ArrayExpression", { elements });
}, "(elements?: (import(\"@swc/core\").ExprOrSpread | undefined)[]) => import(\"@swc/core\").ArrayExpression").proxy(runtime.createArrayExpression);
const $ExprOrSpread = core.createExprMacro("$ExprOrSpread", function ([expression, spread = $False]) {
    return this.parseExpr(`{
    ${spread ? ('"spread": ' + JSON.stringify(core.span) + ",") : ""}
    "expression": ${this.printExpr(expression)}
  }`);
}, "(expression: import(\"@swc/core\").Expression, spread?: boolean) => import(\"@swc/core\").ExprOrSpread").proxy(runtime.createExprOrSpread);
const $ObjectExpression = core.createExprMacro("$ObjectExpression", function ([properties = $Void]) {
    return createAst("ObjectExpression", { properties });
}, "(properties?: (import(\"@swc/core\").SpreadElement | import(\"@swc/core\").Property)[]) => import(\"@swc/core\").ObjectExpression").proxy(runtime.createObjectExpression);
const $SpreadElement = core.createExprMacro("$SpreadElement", function ([args]) {
    return createAst("SpreadElement", { args, spread: spanStr });
}, "(args: import(\"@swc/core\").Expression) => import(\"@swc/core\").SpreadElement").proxy(runtime.createSpreadElement);
const $UnaryExpression = core.createExprMacro("$UnaryExpression", function ([operator, argument]) {
    return createAst("UnaryExpression", { operator, argument });
}, "(operator: import(\"@swc/core\").UnaryOperator, argument: import(\"@swc/core\").Expression) => import(\"@swc/core\").UnaryExpression").proxy(runtime.createUnaryExpression);
const $UpdateExpression = core.createExprMacro("$UpdateExpression", function ([operator, argument, prefix = $False]) {
    return createAst("UpdateExpression", { operator, argument, prefix });
}, "(operator: import(\"@swc/core\").UpdateOperator, argument: import(\"@swc/core\").Expression, prefix?: boolean) => import(\"@swc/core\").UpdateExpression").proxy(runtime.createUpdateExpression);
const $BinaryExpression = core.createExprMacro("$BinaryExpression", function ([left, operator, right]) {
    return createAst("BinaryExpression", { left, operator, right });
}, "(left: import(\"@swc/core\").Expression, operator: import(\"@swc/core\").BinaryOperator, right: import(\"@swc/core\").Expression) => import(\"@swc/core\").BinaryExpression").proxy(runtime.createBinaryExpression);
const $FunctionExpression = core.createExprMacro("$FunctionExpression", function ([params, body, identifier, typeParameters, returnType, decorators, async = $False, generator = $False]) {
    return createAst("FunctionExpression", { params, body, identifier, typeParameters, returnType, decorators, async, generator });
}, "(params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, identifier?: import(\"@swc/core\").Identifier, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], async?: boolean, generator?: boolean) => import(\"@swc/core\").FunctionExpression").proxy(runtime.createFunctionExpression);
const $ClassExpression = core.createExprMacro("$ClassExpression", function ([body, impls = $Void, superClass, identifier, typeParams, superTypeParams, decorators, isAbstract = $False]) {
    return createAst("ClassExpression", { body, implements: impls, superClass, identifier, typeParams, superTypeParams, decorators, isAbstract });
}, "(body: import(\"@swc/core\").ClassMember[], impls?: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, identifier?: import(\"@swc/core\").Identifier, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], isAbstract?: boolean) => import(\"@swc/core\").ClassExpression").proxy(runtime.createClassExpression);
const $AssignmentExpression = core.createExprMacro("$AssignmentExpression", function ([left, operator, right]) {
    return createAst("AssignmentExpression", { left, operator, right });
}, "(left: import(\"@swc/core\").Expression | Pattern, operator: import(\"@swc/core\").AssignmentOperator, right: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentExpression").proxy(runtime.createAssignmentExpression);
const $MemberExpression = core.createExprMacro("$MemberExpression", function ([object, property]) {
    return createAst("MemberExpression", { object, property });
}, "(object: import(\"@swc/core\").Expression, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").PrivateName | import(\"@swc/core\").ComputedPropName) => import(\"@swc/core\").MemberExpression").proxy(runtime.createMemberExpression);
const $SuperPropExpression = core.createExprMacro("$SuperPropExpression", function ([obj, property]) {
    return createAst("SuperPropExpression", { obj, property });
}, "(obj: import(\"@swc/core\").Super, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").ComputedPropName) => import(\"@swc/core\").SuperPropExpression").proxy(runtime.createSuperPropExpression);
const $ConditionalExpression = core.createExprMacro("$ConditionalExpression", function ([test, consequent, alternate]) {
    return createAst("ConditionalExpression", { test, consequent, alternate });
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Expression, alternate: import(\"@swc/core\").Expression) => import(\"@swc/core\").ConditionalExpression").proxy(runtime.createConditionalExpression);
const $Super = core.createExprMacro("$Super", function () {
    return createAst("Super");
}, "() => import(\"@swc/core\").Super").proxy(runtime.createSuper);
const $Import = core.createExprMacro("$Import", function () {
    return createAst("Import");
}, "() => import(\"@swc/core\").Import").proxy(runtime.createImport);
const $NewExpression = core.createExprMacro("$NewExpression", function ([callee, args, typeArguments]) {
    return createAst("NewExpression", { callee, args, typeArguments });
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").NewExpression").proxy(runtime.createNewExpression);
const $SequenceExpression = core.createExprMacro("$SequenceExpression", function ([expressions]) {
    return createAst("SequenceExpression", { expressions });
}, "(expressions: import(\"@swc/core\").Expression[]) => import(\"@swc/core\").SequenceExpression").proxy(runtime.createSequenceExpression);
const $ArrowFunctionExpression = core.createExprMacro("$ArrowFunctionExpression", function ([params, body, async = $False, generator = $False, typeParameters, returnType]) {
    return createAst("ArrowFunctionExpression", { params, body, typeParameters, returnType, async, generator });
}, "(params: import(\"@swc/core\").Pattern[], body: import(\"@swc/core\").BlockStatement | import(\"@swc/core\").Expression, async?: boolean, generator?: boolean, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").ArrowFunctionExpression").proxy(runtime.createArrowFunctionExpression);
const $YieldExpression = core.createExprMacro("$YieldExpression", function ([argument, delegate = $False]) {
    return createAst("YieldExpression", { argument, delegate });
}, "(argument?: import(\"@swc/core\").Expression, delegate?: boolean) => import(\"@swc/core\").YieldExpression").proxy(runtime.createYieldExpression);
const $MetaProperty = core.createExprMacro("$MetaProperty", function ([kind]) {
    return createAst("MetaProperty", { kind });
}, "(kind: \"new.target\" | \"import.meta\") => import(\"@swc/core\").MetaProperty").proxy(runtime.createMetaProperty);
const $AwaitExpression = core.createExprMacro("$AwaitExpression", function ([argument]) {
    return createAst("AwaitExpression", { argument });
}, "(argument: import(\"@swc/core\").Expression) => import(\"@swc/core\").AwaitExpression").proxy(runtime.createAwaitExpression);
const $TemplateLiteral = core.createExprMacro("$TemplateLiteral", function ([expressions = $Void, quasis = $Void]) {
    return createAst("TemplateLiteral", { expressions, quasis });
}, "(expressions?: import(\"@swc/core\").Expression[], quasis?: import(\"@swc/core\").TemplateElement[]) => import(\"@swc/core\").TemplateLiteral").proxy(runtime.createTemplateLiteral);
const $TaggedTemplateExpression = core.createExprMacro("$TaggedTemplateExpression", function ([tag, template, typeParameters]) {
    return createAst("TaggedTemplateExpression", { tag, template, typeParameters });
}, "(tag: import(\"@swc/core\").Expression, template: import(\"@swc/core\").TemplateLiteral, typeParameters?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TaggedTemplateExpression").proxy(runtime.createTaggedTemplateExpression);
const $TemplateElement = core.createExprMacro("$TemplateElement", function ([raw, cooked, tail = $False]) {
    return createAst("TemplateElement", { raw, cooked, tail });
}, "(raw: string, cooked?: string, tail?: boolean) => import(\"@swc/core\").TemplateElement").proxy(runtime.createTemplateElement);
const $ParenthesisExpression = core.createExprMacro("$ParenthesisExpression", function ([expression]) {
    return createAst("ParenthesisExpression", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ParenthesisExpression").proxy(runtime.createParenthesisExpression);
const $PrivateName = core.createExprMacro("$PrivateName", function ([id]) {
    return createAst("PrivateName", { id });
}, "(id: import(\"@swc/core\").Identifier) => import(\"@swc/core\").PrivateName").proxy(runtime.createPrivateName);
const $JSXMemberExpression = core.createExprMacro("$JSXMemberExpression", function ([object, property]) {
    return createAst("JSXMemberExpression", { object, property });
}, "(object: import(\"@swc/core\").JSXObject, property: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXMemberExpression").proxy(runtime.createJSXMemberExpression);
const $JSXNamespacedName = core.createExprMacro("$JSXNamespacedName", function ([namespace, name]) {
    return createAst("JSXNamespacedName", { namespace, name });
}, "(namespace: import(\"@swc/core\").Identifier, name: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXNamespacedName").proxy(runtime.createJSXNamespacedName);
const $JSXEmptyExpression = core.createExprMacro("$JSXEmptyExpression", function () {
    return createAst("JSXEmptyExpression");
}, "() => import(\"@swc/core\").JSXEmptyExpression").proxy(runtime.createJSXEmptyExpression);
const $JSXExpressionContainer = core.createExprMacro("$JSXExpressionContainer", function ([expression]) {
    return createAst("JSXExpressionContainer", { expression });
}, "(expression: import(\"@swc/core\").JSXExpression) => import(\"@swc/core\").JSXExpressionContainer").proxy(runtime.createJSXExpressionContainer);
const $JSXSpreadChild = core.createExprMacro("$JSXSpreadChild", function ([expression]) {
    return createAst("JSXSpreadChild", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").JSXSpreadChild").proxy(runtime.createJSXSpreadChild);
const $JSXOpeningElement = core.createExprMacro("$JSXOpeningElement", function ([name, attributes = $Void, selfClosing = $False, typeArguments]) {
    return createAst("JSXOpeningElement", { name, attributes, selfClosing, typeArguments });
}, "(name: import(\"@swc/core\").JSXElementName, attributes?: import(\"@swc/core\").JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").JSXOpeningElement").proxy(runtime.createJSXOpeningElement);
const $JSXClosingElement = core.createExprMacro("$JSXClosingElement", function ([name]) {
    return createAst("JSXClosingElement", { name });
}, "(name: import(\"@swc/core\").JSXElementName) => import(\"@swc/core\").JSXClosingElement").proxy(runtime.createJSXClosingElement);
const $JSXAttribute = core.createExprMacro("$JSXAttribute", function ([name, value]) {
    return createAst("JSXAttribute", { name, value });
}, "(name: import(\"@swc/core\").JSXAttributeName, value?: import(\"@swc/core\").JSXAttrValue) => import(\"@swc/core\").JSXAttribute").proxy(runtime.createJSXAttribute);
const $JSXText = core.createExprMacro("$JSXText", function ([value, raw = _JSONStringify(value)]) {
    return createAst("JSXText", { value, raw });
}, "(value: string, raw?: string) => import(\"@swc/core\").JSXText").proxy(runtime.createJSXText);
const $JSXElement = core.createExprMacro("$JSXElement", function ([opening, children = $Void, closing]) {
    return createAst("JSXElement", { opening, children, closing });
}, "(opening: import(\"@swc/core\").JSXOpeningElement, children?: import(\"@swc/core\").JSXElementChild[], closing?: import(\"@swc/core\").JSXClosingElement) => import(\"@swc/core\").JSXElement").proxy(runtime.createJSXElement);
const $JSXFragment = core.createExprMacro("$JSXFragment", function ([opening, children = $Void, closing]) {
    return createAst("JSXFragment", { opening, children, closing });
}, "(opening: import(\"@swc/core\").JSXOpeningFragment, children?: import(\"@swc/core\").JSXElementChild[], closing: import(\"@swc/core\").JSXClosingFragment) => import(\"@swc/core\").JSXFragment").proxy(runtime.createJSXFragment);
const $JSXOpeningFragment = core.createExprMacro("$JSXOpeningFragment", function () {
    return createAst("JSXOpeningFragment");
}, "() => import(\"@swc/core\").JSXOpeningFragment").proxy(runtime.createJSXOpeningFragment);
const $JSXClosingFragment = core.createExprMacro("$JSXClosingFragment", function () {
    return createAst("JSXClosingFragment");
}, "() => import(\"@swc/core\").JSXClosingFragment").proxy(runtime.createJSXClosingFragment);
const $ExportDefaultExpression = core.createExprMacro("$ExportDefaultExpression", function ([expression]) {
    return createAst("ExportDefaultExpression", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ExportDefaultExpression").proxy(runtime.createExportDefaultExpression);
const $ExportDeclaration = core.createExprMacro("$ExportDeclaration", function ([declaration]) {
    return createAst("ExportDeclaration", { declaration });
}, "(declaration: import(\"@swc/core\").Declaration) => import(\"@swc/core\").ExportDeclaration").proxy(runtime.createExportDeclaration);
const $ImportDeclaration = core.createExprMacro("$ImportDeclaration", function ([specifiers, source, asserts, typeOnly = $False]) {
    return createAst("ImportDeclaration", { specifiers, source, typeOnly, asserts });
}, "(specifiers: import(\"@swc/core\").ImportSpecifier[], source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean) => import(\"@swc/core\").ImportDeclaration").proxy(runtime.createImportDeclaration);
const $ExportAllDeclaration = core.createExprMacro("$ExportAllDeclaration", function ([source, asserts]) {
    return createAst("ExportAllDeclaration", { source, asserts });
}, "(source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression) => import(\"@swc/core\").ExportAllDeclaration").proxy(runtime.createExportAllDeclaration);
const $ExportNamedDeclaration = core.createExprMacro("$ExportNamedDeclaration", function ([specifiers, source, asserts, typeOnly = $False]) {
    return createAst("ExportNamedDeclaration", { specifiers, source, typeOnly, asserts });
}, "(specifiers: import(\"@swc/core\").ExportSpecifier[], source?: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean) => import(\"@swc/core\").ExportNamedDeclaration").proxy(runtime.createExportNamedDeclaration);
const $ExportDefaultDeclaration = core.createExprMacro("$ExportDefaultDeclaration", function ([decl]) {
    return createAst("ExportDefaultDeclaration", { decl });
}, "(decl: import(\"@swc/core\").DefaultDecl) => import(\"@swc/core\").ExportDefaultDeclaration").proxy(runtime.createExportDefaultDeclaration);
const $ImportDefaultSpecifier = core.createExprMacro("$ImportDefaultSpecifier", function ([local]) {
    return createAst("ImportDefaultSpecifier", { local });
}, "(local: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ImportDefaultSpecifier").proxy(runtime.createImportDefaultSpecifier);
const $ImportNamespaceSpecifier = core.createExprMacro("$ImportNamespaceSpecifier", function ([local]) {
    return createAst("ImportNamespaceSpecifier", { local });
}, "(local: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ImportNamespaceSpecifier").proxy(runtime.createImportNamespaceSpecifier);
const $NamedImportSpecifier = core.createExprMacro("$NamedImportSpecifier", function ([local, imported, isTypeOnly = $False]) {
    return createAst("NamedImportSpecifier", { local, imported, isTypeOnly });
}, "(local: import(\"@swc/core\").Identifier, imported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean) => import(\"@swc/core\").NamedImportSpecifier").proxy(runtime.createNamedImportSpecifier);
const $ExportNamespaceSpecifier = core.createExprMacro("$ExportNamespaceSpecifier", function ([name]) {
    return createAst("ExportNamespaceSpecifier", { name });
}, "(name: import(\"@swc/core\").ModuleExportName) => import(\"@swc/core\").ExportNamespaceSpecifier").proxy(runtime.createExportNamespaceSpecifier);
const $ExportDefaultSpecifier = core.createExprMacro("$ExportDefaultSpecifier", function ([exported]) {
    return createAst("ExportDefaultSpecifier", { exported });
}, "(exported: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ExportDefaultSpecifier").proxy(runtime.createExportDefaultSpecifier);
const $NamedExportSpecifier = core.createExprMacro("$NamedExportSpecifier", function ([orig, exported, isTypeOnly = $False]) {
    return createAst("NamedExportSpecifier", { orig, exported, isTypeOnly });
}, "(orig: import(\"@swc/core\").ModuleExportName, exported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean) => import(\"@swc/core\").NamedExportSpecifier").proxy(runtime.createNamedExportSpecifier);
const $Module = core.createExprMacro("$Module", function ([body = $Void, interpreter]) {
    return createAst("Module", { body, interpreter });
}, "(body: import(\"@swc/core\").ModuleItem[], interpreter?: string) => import(\"@swc/core\").Module").proxy(runtime.createModule);
const $Script = core.createExprMacro("$Script", function ([body = $Void, interpreter]) {
    return createAst("Script", { body, interpreter });
}, "(body: import(\"@swc/core\").Statement[], interpreter?: string) => import(\"@swc/core\").Script").proxy(runtime.createScript);
const $ArrayPattern = core.createExprMacro("$ArrayPattern", function ([elements, optional = $False, typeAnnotation]) {
    return createAst("ArrayPattern", { elements, optional, typeAnnotation });
}, "(elements: (import(\"@swc/core\").Pattern | undefined)[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").ArrayPattern").proxy(runtime.createArrayPattern);
const $ObjectPattern = core.createExprMacro("$ObjectPattern", function ([properties, optional = $False, typeAnnotation]) {
    return createAst("ObjectPattern", { properties, optional, typeAnnotation });
}, "(properties: import(\"@swc/core\").ObjectPatternProperty[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").ObjectPattern").proxy(runtime.createObjectPattern);
const $AssignmentPattern = core.createExprMacro("$AssignmentPattern", function ([left, right, typeAnnotation]) {
    return createAst("AssignmentPattern", { left, right, typeAnnotation });
}, "(left: import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").AssignmentPattern").proxy(runtime.createAssignmentPattern);
const $RestElement = core.createExprMacro("$RestElement", function ([argument, rest, typeAnnotation]) {
    return createAst("RestElement", { argument, rest, typeAnnotation });
}, "(argument: import(\"@swc/core\").Pattern, rest: import(\"@swc/core\").Span, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").RestElement").proxy(runtime.createRestElement);
const $KeyValuePatternProperty = core.createExprMacro("$KeyValuePatternProperty", function ([key, value]) {
    return createAst("KeyValuePatternProperty", { key, value });
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Pattern) => import(\"@swc/core\").KeyValuePatternProperty").proxy(runtime.createKeyValuePatternProperty);
const $AssignmentPatternProperty = core.createExprMacro("$AssignmentPatternProperty", function ([key, value]) {
    return createAst("AssignmentPatternProperty", { key, value });
}, "(key: import(\"@swc/core\").Identifier, value?: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentPatternProperty").proxy(runtime.createAssignmentPatternProperty);
const $KeyValueProperty = core.createExprMacro("$KeyValueProperty", function ([key, value]) {
    return createAst("KeyValueProperty", { key, value });
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").KeyValueProperty").proxy(runtime.createKeyValueProperty);
const $AssignmentProperty = core.createExprMacro("$AssignmentProperty", function ([key, value]) {
    return createAst("AssignmentProperty", { key, value });
}, "(key: import(\"@swc/core\").Identifier, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentProperty").proxy(runtime.createAssignmentProperty);
const $GetterProperty = core.createExprMacro("$GetterProperty", function ([key, body, typeAnnotation]) {
    return createAst("GetterProperty", { key, body, typeAnnotation });
}, "(key: import(\"@swc/core\").PropertyName, body?: import(\"@swc/core\").BlockStatement, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").GetterProperty").proxy(runtime.createGetterProperty);
const $SetterProperty = core.createExprMacro("$SetterProperty", function ([key, param, body]) {
    return createAst("SetterProperty", { key, param, body });
}, "(key: import(\"@swc/core\").PropertyName, param: import(\"@swc/core\").Pattern, body?: import(\"@swc/core\").BlockStatement) => import(\"@swc/core\").SetterProperty").proxy(runtime.createSetterProperty);
const $MethodProperty = core.createExprMacro("$MethodProperty", function ([key, params, body, async = $False, generator = $False, decorators, typeParameters, returnType]) {
    return createAst("MethodProperty", { key, params, body, async, generator, decorators, typeParameters, returnType });
}, "(key: import(\"@swc/core\").PropertyName, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, async?: boolean, generator?: boolean, decorators?: import(\"@swc/core\").Decorator[], typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").MethodProperty").proxy(runtime.createMethodProperty);
const $ComputedPropName = core.createExprMacro("$ComputedPropName", function ([expression]) {
    return createAst("ComputedPropName", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ComputedPropName").proxy(runtime.createComputedPropName);
const $BlockStatement = core.createExprMacro("$BlockStatement", function ([stmts = $Void]) {
    return createAst("BlockStatement", { stmts });
}, "(stmts: import(\"@swc/core\").Statement[]) => import(\"@swc/core\").BlockStatement").proxy(runtime.createBlockStatement);
const $ExpressionStatement = core.createExprMacro("$ExpressionStatement", function ([expression]) {
    return createAst("ExpressionStatement", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ExpressionStatement").proxy(runtime.createExpressionStatement);
const $EmptyStatement = core.createExprMacro("$EmptyStatement", function () {
    return createAst("EmptyStatement");
}, "() => import(\"@swc/core\").EmptyStatement").proxy(runtime.createEmptyStatement);
const $DebuggerStatement = core.createExprMacro("$DebuggerStatement", function () {
    return createAst("DebuggerStatement");
}, "() => import(\"@swc/core\").DebuggerStatement").proxy(runtime.createDebuggerStatement);
const $WithStatement = core.createExprMacro("$WithStatement", function ([object, body]) {
    return createAst("WithStatement", { object, body });
}, "(object: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").WithStatement").proxy(runtime.createWithStatement);
const $ReturnStatement = core.createExprMacro("$ReturnStatement", function ([argument]) {
    return createAst("ReturnStatement", { argument });
}, "(argument?: import(\"@swc/core\").Expression) => import(\"@swc/core\").ReturnStatement").proxy(runtime.createReturnStatement);
const $LabeledStatement = core.createExprMacro("$LabeledStatement", function ([label, body]) {
    return createAst("LabeledStatement", { label, body });
}, "(label: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").LabeledStatement").proxy(runtime.createLabeledStatement);
const $BreakStatement = core.createExprMacro("$BreakStatement", function ([label]) {
    return createAst("BreakStatement", { label });
}, "(label?: import(\"@swc/core\").Identifier) => import(\"@swc/core\").BreakStatement").proxy(runtime.createBreakStatement);
const $ContinueStatement = core.createExprMacro("$ContinueStatement", function ([label]) {
    return createAst("ContinueStatement", { label });
}, "(label?: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ContinueStatement").proxy(runtime.createContinueStatement);
const $IfStatement = core.createExprMacro("$IfStatement", function ([test, consequent, alternate]) {
    return createAst("IfStatement", { test, consequent, alternate });
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Statement, alternate?: import(\"@swc/core\").Statement) => import(\"@swc/core\").IfStatement").proxy(runtime.createIfStatement);
const $SwitchStatement = core.createExprMacro("$SwitchStatement", function ([discriminant, cases = $Void]) {
    return createAst("SwitchStatement", { discriminant, cases });
}, "(discriminant: import(\"@swc/core\").Expression, cases?: import(\"@swc/core\").SwitchCase[]) => import(\"@swc/core\").SwitchStatement").proxy(runtime.createSwitchStatement);
const $ThrowStatement = core.createExprMacro("$ThrowStatement", function ([argument]) {
    return createAst("ThrowStatement", { argument });
}, "(argument: import(\"@swc/core\").Expression) => import(\"@swc/core\").ThrowStatement").proxy(runtime.createThrowStatement);
const $TryStatement = core.createExprMacro("$TryStatement", function ([block, handler, finalizer]) {
    return createAst("TryStatement", { block, handler, finalizer });
}, "(block: import(\"@swc/core\").BlockStatement, handler?: import(\"@swc/core\").CatchClause, finalizer?: import(\"@swc/core\").BlockStatement) => import(\"@swc/core\").TryStatement").proxy(runtime.createTryStatement);
const $WhileStatement = core.createExprMacro("$WhileStatement", function ([test, body]) {
    return createAst("WhileStatement", { test, body });
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").WhileStatement").proxy(runtime.createWhileStatement);
const $DoWhileStatement = core.createExprMacro("$DoWhileStatement", function ([test, body]) {
    return createAst("DoWhileStatement", { test, body });
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").DoWhileStatement").proxy(runtime.createDoWhileStatement);
const $ForStatement = core.createExprMacro("$ForStatement", function ([body, init, test, update]) {
    return createAst("ForStatement", { body, init, test, update });
}, "(body: import(\"@swc/core\").Statement, init?: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Expression, test?: import(\"@swc/core\").Expression, update?: import(\"@swc/core\").Expression) => import(\"@swc/core\").ForStatement").proxy(runtime.createForStatement);
const $ForInStatement = core.createExprMacro("$ForInStatement", function ([left, right, body]) {
    return createAst("ForInStatement", { left, right, body });
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").ForInStatement").proxy(runtime.createForInStatement);
const $ForOfStatement = core.createExprMacro("$ForOfStatement", function ([left, right, body, _await]) {
    return createAst("ForOfStatement", { left, right, body, await: _await });
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, _await?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForOfStatement").proxy(runtime.createForOfStatement);
const $SwitchCase = core.createExprMacro("$SwitchCase", function ([test, consequent = $Void]) {
    return createAst("SwitchCase", { test, consequent });
}, "(test?: import(\"@swc/core\").Expression, consequent?: import(\"@swc/core\").Statement[]) => import(\"@swc/core\").SwitchCase").proxy(runtime.createSwitchCase);
const $CatchClause = core.createExprMacro("$CatchClause", function ([body, param]) {
    return createAst("CatchClause", { body, param });
}, "(body: import(\"@swc/core\").BlockStatement, param?: import(\"@swc/core\").Pattern) => import(\"@swc/core\").CatchClause").proxy(runtime.createCatchClause);
const $TsTypeAnnotation = core.createExprMacro("$TsTypeAnnotation", function ([typeAnnotation]) {
    return createAst("TsTypeAnnotation", { typeAnnotation });
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeAnnotation").proxy(runtime.createTsTypeAnnotation);
const $TsTypeParameterDeclaration = core.createExprMacro("$TsTypeParameterDeclaration", function ([parameters = $Void]) {
    return createAst("TsTypeParameterDeclaration", { parameters });
}, "(parameters?: import(\"@swc/core\").TsTypeParameter[]) => import(\"@swc/core\").TsTypeParameterDeclaration").proxy(runtime.createTsTypeParameterDeclaration);
const $TsTypeParameter = core.createExprMacro("$TsTypeParameter", function ([name, _in, _out, constraint, _default]) {
    return createAst("TsTypeParameter", { name, in: _in, out: _out, constraint, default: _default });
}, "(name: import(\"@swc/core\").Identifier, _in: boolean, _out: boolean, constraint?: import(\"@swc/core\").TsType, _default?: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeParameter").proxy(runtime.createTsTypeParameter);
const $TsTypeParameterInstantiation = core.createExprMacro("$TsTypeParameterInstantiation", function ([params = $Void]) {
    return createAst("TsTypeParameterInstantiation", { params });
}, "(params?: import(\"@swc/core\").TsType[]) => import(\"@swc/core\").TsTypeParameterInstantiation").proxy(runtime.createTsTypeParameterInstantiation);
const $TsParameterProperty = core.createExprMacro("$TsParameterProperty", function ([param, accessibility, decorators, override = $False, readonly = $False]) {
    return createAst("TsParameterProperty", { param, accessibility, decorators, override, readonly });
}, "(param: import(\"@swc/core\").TsParameterPropertyParameter, accessibility?: import(\"@swc/core\").Accessibility, decorators?: import(\"@swc/core\").Decorator[], override?: boolean, readonly?: boolean) => import(\"@swc/core\").TsParameterProperty").proxy(runtime.createTsParameterProperty);
const $TsQualifiedName = core.createExprMacro("$TsQualifiedName", function ([left, right]) {
    return createAst("TsQualifiedName", { left, right });
}, "(left: import(\"@swc/core\").TsEntityName, right: import(\"@swc/core\").Identifier) => import(\"@swc/core\").TsQualifiedName").proxy(runtime.createTsQualifiedName);
const $TsCallSignatureDeclaration = core.createExprMacro("$TsCallSignatureDeclaration", function ([params = $Void, typeAnnotation, typeParams]) {
    return createAst("TsCallSignatureDeclaration", { params, typeAnnotation, typeParams });
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration) => import(\"@swc/core\").TsCallSignatureDeclaration").proxy(runtime.createTsCallSignatureDeclaration);
const $TsConstructSignatureDeclaration = core.createExprMacro("$TsConstructSignatureDeclaration", function ([params = $Void, typeAnnotation, typeParams]) {
    return createAst("TsConstructSignatureDeclaration", { params, typeAnnotation, typeParams });
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration) => import(\"@swc/core\").TsConstructSignatureDeclaration").proxy(runtime.createTsConstructSignatureDeclaration);
const $TsPropertySignature = core.createExprMacro("$TsPropertySignature", function ([key, params, init, typeAnnotation, typeParams, computed = $False, optional = $False, readonly = $False]) {
    return createAst("TsPropertySignature", { key, params, init, typeAnnotation, typeParams, computed, optional, readonly });
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], init?: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsPropertySignature").proxy(runtime.createTsPropertySignature);
const $TsGetterSignature = core.createExprMacro("$TsGetterSignature", function ([key, typeAnnotation, computed = $False, optional = $False, readonly = $False]) {
    return createAst("TsGetterSignature", { key, typeAnnotation, computed, optional, readonly });
}, "(key: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsGetterSignature").proxy(runtime.createTsGetterSignature);
const $TsSetterSignature = core.createExprMacro("$TsSetterSignature", function ([key, param, computed = $False, optional = $False, readonly = $False]) {
    return createAst("TsSetterSignature", { key, param, computed, optional, readonly });
}, "(key: import(\"@swc/core\").Expression, param: import(\"@swc/core\").TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsSetterSignature").proxy(runtime.createTsSetterSignature);
const $TsMethodSignature = core.createExprMacro("$TsMethodSignature", function ([key, params, typeAnn, typeParams, computed = $False, optional = $False, readonly = $False]) {
    return createAst("TsMethodSignature", { key, params, typeAnn, typeParams, computed, optional, readonly });
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], typeAnn?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsMethodSignature").proxy(runtime.createTsMethodSignature);
const $TsIndexSignature = core.createExprMacro("$TsIndexSignature", function ([params, typeAnnotation, readonly = $False, isStatic = $False]) {
    return createAst("TsIndexSignature", { params, typeAnnotation, readonly, static: isStatic });
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, readonly?: boolean, isStatic?: boolean) => import(\"@swc/core\").TsIndexSignature").proxy(runtime.createTsIndexSignature);
const $TsKeywordType = core.createExprMacro("$TsKeywordType", function ([kind]) {
    return createAst("TsKeywordType", { kind });
}, "(kind: import(\"@swc/core\").TsKeywordTypeKind) => import(\"@swc/core\").TsKeywordType").proxy(runtime.createTsKeywordType);
const $TsThisType = core.createExprMacro("$TsThisType", function () {
    return createAst("TsThisType");
}, "() => import(\"@swc/core\").TsThisType").proxy(runtime.createTsThisType);
const $TsFunctionType = core.createExprMacro("$TsFunctionType", function ([params, typeAnnotation, typeParams]) {
    return createAst("TsFunctionType", { params, typeAnnotation, typeParams });
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration) => import(\"@swc/core\").TsFunctionType").proxy(runtime.createTsFunctionType);
const $TsConstructorType = core.createExprMacro("$TsConstructorType", function ([params, typeAnnotation, typeParams, isAbstract = $False]) {
    return createAst("TsConstructorType", { params, typeAnnotation, typeParams, isAbstract });
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, isAbstract?: boolean) => import(\"@swc/core\").TsConstructorType").proxy(runtime.createTsConstructorType);
const $TsTypeReference = core.createExprMacro("$TsTypeReference", function ([typeName, typeParams]) {
    return createAst("TsTypeReference", { typeName, typeParams });
}, "(typeName: import(\"@swc/core\").TsEntityName, typeParams?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsTypeReference").proxy(runtime.createTsTypeReference);
const $TsTypePredicate = core.createExprMacro("$TsTypePredicate", function ([paramName, typeAnnotation, asserts = $False]) {
    return createAst("TsTypePredicate", { paramName, typeAnnotation, asserts });
}, "(paramName: import(\"@swc/core\").TsThisTypeOrIdent, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, asserts?: boolean) => import(\"@swc/core\").TsTypePredicate").proxy(runtime.createTsTypePredicate);
const $TsImportType = core.createExprMacro("$TsImportType", function ([argument, qualifier, typeArguments]) {
    return createAst("TsImportType", { argument, qualifier, typeArguments });
}, "(argument: stringLiteral, qualifier?: import(\"@swc/core\").TsEntityName, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsImportType").proxy(runtime.createTsImportType);
const $TsTypeQuery = core.createExprMacro("$TsTypeQuery", function ([exprName, typeArguments]) {
    return createAst("TsTypeQuery", { exprName, typeArguments });
}, "(exprName: import(\"@swc/core\").TsTypeQueryExpr, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsTypeQuery").proxy(runtime.createTsTypeQuery);
const $TsTypeLiteral = core.createExprMacro("$TsTypeLiteral", function ([members = $Void]) {
    return createAst("TsTypeLiteral", { members });
}, "(members?: import(\"@swc/core\").TsTypeElement[]) => import(\"@swc/core\").TsTypeLiteral").proxy(runtime.createTsTypeLiteral);
const $TsArrayType = core.createExprMacro("$TsArrayType", function ([elemType]) {
    return createAst("TsArrayType", { elemType });
}, "(elemType: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsArrayType").proxy(runtime.createTsArrayType);
const $TsTupleType = core.createExprMacro("$TsTupleType", function ([elemTypes = $Void]) {
    return createAst("TsTupleType", { elemTypes });
}, "(elemTypes?: import(\"@swc/core\").TsTupleElement[]) => import(\"@swc/core\").TsTupleType").proxy(runtime.createTsTupleType);
const $TsTupleElement = core.createExprMacro("$TsTupleElement", function ([ty, label]) {
    return createAst("TsTupleElement", { ty, label });
}, "(ty: import(\"@swc/core\").TsType, label?: import(\"@swc/core\").Pattern) => import(\"@swc/core\").TsTupleElement").proxy(runtime.createTsTupleElement);
const $TsOptionalType = core.createExprMacro("$TsOptionalType", function ([typeAnnotation]) {
    return createAst("TsOptionalType", { typeAnnotation });
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsOptionalType").proxy(runtime.createTsOptionalType);
const $TsRestType = core.createExprMacro("$TsRestType", function ([typeAnnotation]) {
    return createAst("TsRestType", { typeAnnotation });
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsRestType").proxy(runtime.createTsRestType);
const $TsUnionType = core.createExprMacro("$TsUnionType", function ([types]) {
    return createAst("TsUnionType", { types });
}, "(types: import(\"@swc/core\").TsType[]) => import(\"@swc/core\").TsUnionType").proxy(runtime.createTsUnionType);
const $TsIntersectionType = core.createExprMacro("$TsIntersectionType", function ([types]) {
    return createAst("TsIntersectionType", { types });
}, "(types: import(\"@swc/core\").TsType[]) => import(\"@swc/core\").TsIntersectionType").proxy(runtime.createTsIntersectionType);
const $TsConditionalType = core.createExprMacro("$TsConditionalType", function ([checkType, extendsType, trueType, falseType]) {
    return createAst("TsConditionalType", { checkType, extendsType, trueType, falseType });
}, "(checkType: import(\"@swc/core\").TsType, extendsType: import(\"@swc/core\").TsType, trueType: import(\"@swc/core\").TsType, falseType: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsConditionalType").proxy(runtime.createTsConditionalType);
const $TsInferType = core.createExprMacro("$TsInferType", function ([typeParam]) {
    return createAst("TsInferType", { typeParam });
}, "(typeParam: import(\"@swc/core\").TsTypeParameter) => import(\"@swc/core\").TsInferType").proxy(runtime.createTsInferType);
const $TsParenthesizedType = core.createExprMacro("$TsParenthesizedType", function ([typeAnnotation]) {
    return createAst("TsParenthesizedType", { typeAnnotation });
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsParenthesizedType").proxy(runtime.createTsParenthesizedType);
const $TsTypeOperator = core.createExprMacro("$TsTypeOperator", function ([op, typeAnnotation]) {
    return createAst("TsTypeOperator", { op, typeAnnotation });
}, "(op: import(\"@swc/core\").TsTypeOperatorOp, typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeOperator").proxy(runtime.createTsTypeOperator);
const $TsIndexedAccessType = core.createExprMacro("$TsIndexedAccessType", function ([objectType, indexType, readonly = $False]) {
    return createAst("TsIndexedAccessType", { objectType, indexType, readonly });
}, "(objectType: import(\"@swc/core\").TsType, indexType: import(\"@swc/core\").TsType, readonly?: boolean) => import(\"@swc/core\").TsIndexedAccessType").proxy(runtime.createTsIndexedAccessType);
const $TsMappedType = core.createExprMacro("$TsMappedType", function ([typeParam, typeAnnotation, nameType, optional, readonly]) {
    return createAst("TsMappedType", { typeParam, typeAnnotation, nameType, optional, readonly });
}, "(typeParam: import(\"@swc/core\").TsTypeParameter, typeAnnotation?: import(\"@swc/core\").TsType, nameType?: import(\"@swc/core\").TsType, optional?: import(\"@swc/core\").TruePlusMinus, readonly?: import(\"@swc/core\").TruePlusMinus) => import(\"@swc/core\").TsMappedType").proxy(runtime.createTsMappedType);
const $TsLiteralType = core.createExprMacro("$TsLiteralType", function ([literal]) {
    return createAst("TsLiteralType", { literal });
}, "(literal: import(\"@swc/core\").TsLiteral) => import(\"@swc/core\").TsLiteralType").proxy(runtime.createTsLiteralType);
const $TsTemplateLiteralType = core.createExprMacro("$TsTemplateLiteralType", function ([types = $Void, quasis = $Void]) {
    return createAst("TsTemplateLiteralType", { types, quasis });
}, "(types?: import(\"@swc/core\").TsType[], quasis?: import(\"@swc/core\").TemplateElement[]) => import(\"@swc/core\").TsTemplateLiteralType").proxy(runtime.createTsTemplateLiteralType);
const $TsInterfaceDeclaration = core.createExprMacro("$TsInterfaceDeclaration", function ([id, body, _extends, typeParams, declare = $False]) {
    return createAst("TsInterfaceDeclaration", { id, body, extends: _extends, typeParams, declare });
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsInterfaceBody, _extends?: import(\"@swc/core\").TsExpressionWithTypeArguments[], typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean) => import(\"@swc/core\").TsInterfaceDeclaration").proxy(runtime.createTsInterfaceDeclaration);
const $TsInterfaceBody = core.createExprMacro("$TsInterfaceBody", function ([body = $Void]) {
    return createAst("TsInterfaceBody", { body });
}, "(body?: import(\"@swc/core\").TsTypeElement[]) => import(\"@swc/core\").TsInterfaceBody").proxy(runtime.createTsInterfaceBody);
const $TsExpressionWithTypeArguments = core.createExprMacro("$TsExpressionWithTypeArguments", function ([expression, typeArguments]) {
    return createAst("TsExpressionWithTypeArguments", { expression, typeArguments });
}, "(expression: import(\"@swc/core\").Expression, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsExpressionWithTypeArguments").proxy(runtime.createTsExpressionWithTypeArguments);
const $TsTypeAliasDeclaration = core.createExprMacro("$TsTypeAliasDeclaration", function ([id, typeAnnotation, typeParams, declare = $False]) {
    return createAst("TsTypeAliasDeclaration", { id, typeAnnotation, typeParams, declare });
}, "(id: import(\"@swc/core\").Identifier, typeAnnotation: import(\"@swc/core\").TsType, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean) => import(\"@swc/core\").TsTypeAliasDeclaration").proxy(runtime.createTsTypeAliasDeclaration);
const $TsEnumDeclaration = core.createExprMacro("$TsEnumDeclaration", function ([id, members = $Void, declare = $False, isConst = $False]) {
    return createAst("TsEnumDeclaration", { id, declare, isConst, members });
}, "(id: import(\"@swc/core\").Identifier, members?: import(\"@swc/core\").TsEnumMember[], declare?: boolean, isConst?: boolean) => import(\"@swc/core\").TsEnumDeclaration").proxy(runtime.createTsEnumDeclaration);
const $TsEnumMember = core.createExprMacro("$TsEnumMember", function ([id, init]) {
    return createAst("TsEnumMember", { id, init });
}, "(id: import(\"@swc/core\").TsEnumMemberId, init?: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsEnumMember").proxy(runtime.createTsEnumMember);
const $TsModuleDeclaration = core.createExprMacro("$TsModuleDeclaration", function ([id, body, declare = $False, global = $False]) {
    return createAst("TsModuleDeclaration", { id, body, declare, global });
}, "(id: import(\"@swc/core\").TsModuleName, body?: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean) => import(\"@swc/core\").TsModuleDeclaration").proxy(runtime.createTsModuleDeclaration);
const $TsModuleBlock = core.createExprMacro("$TsModuleBlock", function ([body]) {
    return createAst("TsModuleBlock", { body });
}, "(body: import(\"@swc/core\").ModuleItem[]) => import(\"@swc/core\").TsModuleBlock").proxy(runtime.createTsModuleBlock);
const $TsNamespaceDeclaration = core.createExprMacro("$TsNamespaceDeclaration", function ([id, body, declare = $False, global = $False]) {
    return createAst("TsNamespaceDeclaration", { id, body, declare, global });
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean) => import(\"@swc/core\").TsNamespaceDeclaration").proxy(runtime.createTsNamespaceDeclaration);
const $TsImportEqualsDeclaration = core.createExprMacro("$TsImportEqualsDeclaration", function ([id, moduleRef, declare = $False, isExport = $False, isTypeOnly = $False]) {
    return createAst("TsImportEqualsDeclaration", { id, moduleRef, declare, isExport, isTypeOnly });
}, "(id: import(\"@swc/core\").Identifier, moduleRef: import(\"@swc/core\").TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean) => import(\"@swc/core\").TsImportEqualsDeclaration").proxy(runtime.createTsImportEqualsDeclaration);
const $TsExternalModuleReference = core.createExprMacro("$TsExternalModuleReference", function ([expression]) {
    return createAst("TsExternalModuleReference", { expression });
}, "(expression: stringLiteral) => import(\"@swc/core\").TsExternalModuleReference").proxy(runtime.createTsExternalModuleReference);
const $TsExportAssignment = core.createExprMacro("$TsExportAssignment", function ([expression]) {
    return createAst("TsExportAssignment", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsExportAssignment").proxy(runtime.createTsExportAssignment);
const $TsNamespaceExportDeclaration = core.createExprMacro("$TsNamespaceExportDeclaration", function ([id]) {
    return createAst("TsNamespaceExportDeclaration", { id });
}, "(id: import(\"@swc/core\").Identifier) => import(\"@swc/core\").TsNamespaceExportDeclaration").proxy(runtime.createTsNamespaceExportDeclaration);
const $TsAsExpression = core.createExprMacro("$TsAsExpression", function ([expression, typeAnnotation]) {
    return createAst("TsAsExpression", { expression, typeAnnotation });
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsAsExpression").proxy(runtime.createTsAsExpression);
// TODO: change type to TsSatisfiesExpression when swc support this
const $TsSatisfiesExpression = core.createExprMacro("$TsSatisfiesExpression", function ([expression, typeAnnotation]) {
    return createAst("TsSatisfiesExpression", { expression, typeAnnotation });
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType) => Omit<import(\"@swc/core\").TsAsExpression, \"type\"> & { type: \"TsSatisfiesExpression\" }").proxy(runtime.createTsSatisfiesExpression);
const $TsInstantiation = core.createExprMacro("$TsInstantiation", function ([expression, typeArguments]) {
    return createAst("TsInstantiation", { expression, typeArguments });
}, "(expression: import(\"@swc/core\").Expression, typeArguments: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsInstantiation").proxy(runtime.createTsInstantiation);
const $TsTypeAssertion = core.createExprMacro("$TsTypeAssertion", function ([expression, typeAnnotation]) {
    return createAst("TsTypeAssertion", { expression, typeAnnotation });
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeAssertion").proxy(runtime.createTsTypeAssertion);
const $TsConstAssertion = core.createExprMacro("$TsConstAssertion", function ([expression]) {
    return createAst("TsConstAssertion", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsConstAssertion").proxy(runtime.createTsConstAssertion);
const $TsNonNullExpression = core.createExprMacro("$TsNonNullExpression", function ([expression]) {
    return createAst("TsNonNullExpression", { expression });
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsNonNullExpression").proxy(runtime.createTsNonNullExpression);
const $Invalid = core.createExprMacro("$Invalid", function () { return createAst("Invalid"); }, "() => import(\"@swc/core\").Invalid").proxy(runtime.createInvalid);

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
exports.$ExprOrSpread = $ExprOrSpread;
exports.$ExpressionStatement = $ExpressionStatement;
exports.$False = $False;
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
exports.$Null = $Null;
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
exports.$True = $True;
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
exports.$Void = $Void;
exports.$WhileStatement = $WhileStatement;
exports.$WithStatement = $WithStatement;
exports.$YieldExpression = $YieldExpression;
exports.createAst = createAst;
