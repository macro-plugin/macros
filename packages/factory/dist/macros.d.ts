import type { ArrayExpression, BooleanLiteral, CallExpression, Expression, NullLiteral } from "@swc/core";
export declare const createAst: (type: string, props?: Record<string, Expression | string>) => Expression;
export declare const $True: BooleanLiteral;
export declare const $False: BooleanLiteral;
export declare const $Null: NullLiteral;
export declare const $Void: ArrayExpression;
export declare const $Identifier: import("@macro-plugin/core").MacroPlugin & ((value: string, optional?: boolean) => {
    type: "Identifier";
    value: string;
    optional: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $StringLiteral: import("@macro-plugin/core").MacroPlugin & ((value: string, raw?: string | undefined) => {
    type: "StringLiteral";
    value: string;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $NumericLiteral: import("@macro-plugin/core").MacroPlugin & ((value: number, raw?: string | undefined) => {
    type: "NumericLiteral";
    value: number;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BigIntLiteral: import("@macro-plugin/core").MacroPlugin & ((value: bigint, raw?: string | undefined) => {
    type: "BigIntLiteral";
    value: bigint;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BooleanLiteral: import("@macro-plugin/core").MacroPlugin & ((value: boolean) => {
    type: "BooleanLiteral";
    value: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $NullLiteral: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "NullLiteral";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $RegExpLiteral: import("@macro-plugin/core").MacroPlugin & ((pattern: string, flags: string) => {
    type: "RegExpLiteral";
    pattern: string;
    flags: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Argument: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, spread?: boolean) => {
    spread: {
        start: number;
        end: number;
        ctxt: number;
    } | undefined;
    expression: Expression;
});
export declare const $CallExpression: import("@macro-plugin/core").MacroPlugin & ((callee: Expression | import("@swc/core").Super | import("@swc/core").Import, args?: import("@swc/core").Argument[], typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "CallExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    callee: Expression | import("@swc/core").Super | import("@swc/core").Import;
    arguments: import("@swc/core").Argument[];
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
});
export declare const $ClassProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, value?: Expression | undefined, accessibility?: import("@swc/core").Accessibility | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => {
    type: "ClassProperty";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    decorators: import("@swc/core").Decorator[] | undefined;
    key: import("@swc/core").PropertyName;
    isAbstract: boolean;
    declare: boolean;
    value: Expression | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    isStatic: boolean;
    accessibility: import("@swc/core").Accessibility | undefined;
    isOptional: boolean;
    isOverride: boolean;
    readonly: boolean;
    definite: boolean;
});
export declare const $PrivateProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PrivateName, value?: Expression | undefined, accessibility?: import("@swc/core").Accessibility | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => {
    type: "PrivateProperty";
    key: import("@swc/core").PrivateName;
    value: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    decorators: import("@swc/core").Decorator[] | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    accessibility: import("@swc/core").Accessibility | undefined;
    definite: boolean;
    isOptional: boolean;
    isOverride: boolean;
    isStatic: boolean;
    readonly: boolean;
});
export declare const $Param: import("@macro-plugin/core").MacroPlugin & ((pat: import("@swc/core").Pattern, decorators?: import("@swc/core").Decorator[] | undefined) => {
    type: "Parameter";
    pat: import("@swc/core").Pattern;
    decorators: import("@swc/core").Decorator[] | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Constructor: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, params: (import("@swc/core").Param | import("@swc/core").TsParameterProperty)[], body?: import("@swc/core").BlockStatement | undefined, accessibility?: import("@swc/core").Accessibility | undefined, isOptional?: boolean) => {
    type: "Constructor";
    key: import("@swc/core").PropertyName;
    params: (import("@swc/core").Param | import("@swc/core").TsParameterProperty)[];
    body: import("@swc/core").BlockStatement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    accessibility: import("@swc/core").Accessibility | undefined;
    isOptional: boolean;
});
export declare const $ClassMethod: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").MethodKind, key: import("@swc/core").PropertyName, fn: import("@swc/core").Fn, accessibility?: import("@swc/core").Accessibility | undefined, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => {
    type: "ClassMethod";
    key: import("@swc/core").PropertyName;
    function: import("@swc/core").Fn;
    kind: import("@swc/core").MethodKind;
    isStatic: boolean;
    accessibility: import("@swc/core").Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $PrivateMethod: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").MethodKind, key: import("@swc/core").PrivateName, fn: import("@swc/core").Fn, accessibility?: import("@swc/core").Accessibility | undefined, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => {
    type: "PrivateMethod";
    key: import("@swc/core").PrivateName;
    function: import("@swc/core").Fn;
    kind: import("@swc/core").MethodKind;
    isStatic: boolean;
    accessibility: import("@swc/core").Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $StaticBlock: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").BlockStatement) => {
    type: "StaticBlock";
    body: import("@swc/core").BlockStatement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Decorator: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "Decorator";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $FunctionDeclaration: import("@macro-plugin/core").MacroPlugin & ((identifier: import("@swc/core").Identifier, params: import("@swc/core").Param[], body?: import("@swc/core").BlockStatement | undefined, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, declare?: boolean, async?: boolean, generator?: boolean) => {
    type: "FunctionDeclaration";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    params: import("@swc/core").Param[];
    body: import("@swc/core").BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
    identifier: import("@swc/core").Identifier;
    declare: boolean;
});
export declare const $ClassDeclaration: import("@macro-plugin/core").MacroPlugin & ((identifier: import("@swc/core").Identifier, body: import("@swc/core").ClassMember[], impls: import("@swc/core").TsExpressionWithTypeArguments[], superClass?: Expression | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, superTypeParams?: import("@swc/core").TsTypeParameterInstantiation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, declare?: boolean, isAbstract?: boolean) => {
    type: "ClassDeclaration";
    identifier: import("@swc/core").Identifier;
    declare: boolean;
    body: import("@swc/core").ClassMember[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    superClass: Expression | undefined;
    isAbstract: boolean;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    superTypeParams: import("@swc/core").TsTypeParameterInstantiation | undefined;
    implements: import("@swc/core").TsExpressionWithTypeArguments[];
});
export declare const $VariableDeclaration: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").VariableDeclarationKind, declarations?: import("@swc/core").VariableDeclarator[], declare?: boolean) => {
    type: "VariableDeclaration";
    kind: import("@swc/core").VariableDeclarationKind;
    declare: boolean;
    declarations: import("@swc/core").VariableDeclarator[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $VariableDeclarator: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Pattern, init?: Expression | undefined, definite?: boolean) => {
    type: "VariableDeclarator";
    id: import("@swc/core").Pattern;
    definite: boolean;
    init: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $OptionalChainingExpression: import("@macro-plugin/core").MacroPlugin & ((base: import("@swc/core").MemberExpression | import("@swc/core").OptionalChainingCall) => {
    type: "OptionalChainingExpression";
    questionDotToken: {
        start: number;
        end: number;
        ctxt: number;
    };
    base: import("@swc/core").MemberExpression | import("@swc/core").OptionalChainingCall;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $OptionalChainingCall: import("@macro-plugin/core").MacroPlugin & ((callee: Expression, args?: import("@swc/core").ExprOrSpread[], typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "CallExpression";
    callee: Expression;
    arguments: import("@swc/core").ExprOrSpread[];
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ThisExpression: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "ThisExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ArrayExpression: import("@macro-plugin/core").MacroPlugin & ((elements?: (import("@swc/core").ExprOrSpread | undefined)[]) => {
    type: "ArrayExpression";
    elements: (import("@swc/core").ExprOrSpread | undefined)[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExprOrSpread: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, spread?: boolean) => {
    spread: {
        start: number;
        end: number;
        ctxt: number;
    } | undefined;
    expression: Expression;
});
export declare const $ObjectExpression: import("@macro-plugin/core").MacroPlugin & ((properties?: (import("@swc/core").SpreadElement | import("@swc/core").Property)[]) => {
    type: "ObjectExpression";
    properties: (import("@swc/core").SpreadElement | import("@swc/core").Property)[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $SpreadElement: import("@macro-plugin/core").MacroPlugin & ((args: Expression) => {
    type: "SpreadElement";
    spread: {
        start: number;
        end: number;
        ctxt: number;
    };
    arguments: Expression;
});
export declare const $UnaryExpression: import("@macro-plugin/core").MacroPlugin & ((operator: import("@swc/core").UnaryOperator, argument: Expression) => {
    type: "UnaryExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    operator: import("@swc/core").UnaryOperator;
    argument: Expression;
});
export declare const $UpdateExpression: import("@macro-plugin/core").MacroPlugin & ((operator: import("@swc/core").UpdateOperator, argument: Expression, prefix?: boolean) => {
    type: "UpdateExpression";
    operator: import("@swc/core").UpdateOperator;
    prefix: boolean;
    argument: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BinaryExpression: import("@macro-plugin/core").MacroPlugin & ((left: Expression, operator: import("@swc/core").BinaryOperator, right: Expression) => {
    type: "BinaryExpression";
    operator: import("@swc/core").BinaryOperator;
    left: Expression;
    right: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $FunctionExpression: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").Param[], body?: import("@swc/core").BlockStatement | undefined, identifier?: import("@swc/core").Identifier | undefined, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, async?: boolean, generator?: boolean) => {
    type: "FunctionExpression";
    params: import("@swc/core").Param[];
    decorators: import("@swc/core").Decorator[] | undefined;
    body: import("@swc/core").BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
    identifier: import("@swc/core").Identifier | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ClassExpression: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").ClassMember[], impls?: import("@swc/core").TsExpressionWithTypeArguments[], superClass?: Expression | undefined, identifier?: import("@swc/core").Identifier | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, superTypeParams?: import("@swc/core").TsTypeParameterInstantiation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, isAbstract?: boolean) => {
    type: "ClassExpression";
    identifier: import("@swc/core").Identifier | undefined;
    body: import("@swc/core").ClassMember[];
    superClass: Expression | undefined;
    isAbstract: boolean;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    superTypeParams: import("@swc/core").TsTypeParameterInstantiation | undefined;
    implements: import("@swc/core").TsExpressionWithTypeArguments[];
    decorators: import("@swc/core").Decorator[] | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $AssignmentExpression: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").ThisExpression | ArrayExpression | import("@swc/core").ObjectExpression | import("@swc/core").FunctionExpression | import("@swc/core").UnaryExpression | import("@swc/core").UpdateExpression | import("@swc/core").BinaryExpression | import("@swc/core").AssignmentExpression | import("@swc/core").MemberExpression | import("@swc/core").SuperPropExpression | import("@swc/core").ConditionalExpression | CallExpression | import("@swc/core").NewExpression | import("@swc/core").SequenceExpression | import("@swc/core").Identifier | import("@swc/core").StringLiteral | BooleanLiteral | NullLiteral | import("@swc/core").NumericLiteral | import("@swc/core").BigIntLiteral | import("@swc/core").RegExpLiteral | import("@swc/core").JSXText | import("@swc/core").TemplateLiteral | import("@swc/core").TaggedTemplateExpression | import("@swc/core").ArrowFunctionExpression | import("@swc/core").ClassExpression | import("@swc/core").YieldExpression | import("@swc/core").MetaProperty | import("@swc/core").AwaitExpression | import("@swc/core").ParenthesisExpression | import("@swc/core").JSXMemberExpression | import("@swc/core").JSXNamespacedName | import("@swc/core").JSXEmptyExpression | import("@swc/core").JSXElement | import("@swc/core").JSXFragment | import("@swc/core").TsTypeAssertion | import("@swc/core").TsConstAssertion | import("@swc/core").TsNonNullExpression | import("@swc/core").TsAsExpression | import("@swc/core").TsInstantiation | import("@swc/core").PrivateName | import("@swc/core").OptionalChainingExpression | import("@swc/core").Invalid | import("@swc/core").BindingIdentifier | import("@swc/core").ArrayPattern | import("@swc/core").RestElement | import("@swc/core").ObjectPattern | import("@swc/core").AssignmentPattern, operator: import("@swc/core").AssignmentOperator, right: Expression) => {
    type: "AssignmentExpression";
    operator: import("@swc/core").AssignmentOperator;
    left: import("@swc/core").ThisExpression | ArrayExpression | import("@swc/core").ObjectExpression | import("@swc/core").FunctionExpression | import("@swc/core").UnaryExpression | import("@swc/core").UpdateExpression | import("@swc/core").BinaryExpression | import("@swc/core").AssignmentExpression | import("@swc/core").MemberExpression | import("@swc/core").SuperPropExpression | import("@swc/core").ConditionalExpression | CallExpression | import("@swc/core").NewExpression | import("@swc/core").SequenceExpression | import("@swc/core").Identifier | import("@swc/core").StringLiteral | BooleanLiteral | NullLiteral | import("@swc/core").NumericLiteral | import("@swc/core").BigIntLiteral | import("@swc/core").RegExpLiteral | import("@swc/core").JSXText | import("@swc/core").TemplateLiteral | import("@swc/core").TaggedTemplateExpression | import("@swc/core").ArrowFunctionExpression | import("@swc/core").ClassExpression | import("@swc/core").YieldExpression | import("@swc/core").MetaProperty | import("@swc/core").AwaitExpression | import("@swc/core").ParenthesisExpression | import("@swc/core").JSXMemberExpression | import("@swc/core").JSXNamespacedName | import("@swc/core").JSXEmptyExpression | import("@swc/core").JSXElement | import("@swc/core").JSXFragment | import("@swc/core").TsTypeAssertion | import("@swc/core").TsConstAssertion | import("@swc/core").TsNonNullExpression | import("@swc/core").TsAsExpression | import("@swc/core").TsInstantiation | import("@swc/core").PrivateName | import("@swc/core").OptionalChainingExpression | import("@swc/core").Invalid | import("@swc/core").BindingIdentifier | import("@swc/core").ArrayPattern | import("@swc/core").RestElement | import("@swc/core").ObjectPattern | import("@swc/core").AssignmentPattern;
    right: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $MemberExpression: import("@macro-plugin/core").MacroPlugin & ((object: Expression, property: import("@swc/core").Identifier | import("@swc/core").PrivateName | import("@swc/core").ComputedPropName) => {
    type: "MemberExpression";
    object: Expression;
    property: import("@swc/core").Identifier | import("@swc/core").PrivateName | import("@swc/core").ComputedPropName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $SuperPropExpression: import("@macro-plugin/core").MacroPlugin & ((obj: import("@swc/core").Super, property: import("@swc/core").Identifier | import("@swc/core").ComputedPropName) => {
    type: "SuperPropExpression";
    obj: import("@swc/core").Super;
    property: import("@swc/core").Identifier | import("@swc/core").ComputedPropName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ConditionalExpression: import("@macro-plugin/core").MacroPlugin & ((test: Expression, consequent: Expression, alternate: Expression) => {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Super: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "Super";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Import: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "Import";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $NewExpression: import("@macro-plugin/core").MacroPlugin & ((callee: Expression, args?: import("@swc/core").Argument[] | undefined, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "NewExpression";
    callee: Expression;
    arguments: import("@swc/core").Argument[] | undefined;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $SequenceExpression: import("@macro-plugin/core").MacroPlugin & ((expressions: Expression[]) => {
    type: "SequenceExpression";
    expressions: Expression[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ArrowFunctionExpression: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").Pattern[], body: Expression | import("@swc/core").BlockStatement, async?: boolean, generator?: boolean, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "ArrowFunctionExpression";
    params: import("@swc/core").Pattern[];
    body: Expression | import("@swc/core").BlockStatement;
    async: boolean;
    generator: boolean;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
});
export declare const $YieldExpression: import("@macro-plugin/core").MacroPlugin & ((argument?: Expression | undefined, delegate?: boolean) => {
    type: "YieldExpression";
    argument: Expression | undefined;
    delegate: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $MetaProperty: import("@macro-plugin/core").MacroPlugin & ((kind: "new.target" | "import.meta") => {
    type: "MetaProperty";
    kind: "new.target" | "import.meta";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $AwaitExpression: import("@macro-plugin/core").MacroPlugin & ((argument: Expression) => {
    type: "AwaitExpression";
    argument: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TemplateLiteral: import("@macro-plugin/core").MacroPlugin & ((expressions?: Expression[], quasis?: import("@swc/core").TemplateElement[]) => {
    type: "TemplateLiteral";
    expressions: Expression[];
    quasis: import("@swc/core").TemplateElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TaggedTemplateExpression: import("@macro-plugin/core").MacroPlugin & ((tag: Expression, template: import("@swc/core").TemplateLiteral, typeParameters?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "TaggedTemplateExpression";
    tag: Expression;
    typeParameters: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    template: import("@swc/core").TemplateLiteral;
});
export declare const $TemplateElement: import("@macro-plugin/core").MacroPlugin & ((raw: string, cooked?: string | undefined, tail?: boolean) => {
    type: "TemplateElement";
    tail: boolean;
    cooked: string | undefined;
    raw: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ParenthesisExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "ParenthesisExpression";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $PrivateName: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier) => {
    type: "PrivateName";
    id: import("@swc/core").Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXMemberExpression: import("@macro-plugin/core").MacroPlugin & ((object: import("@swc/core").JSXObject, property: import("@swc/core").Identifier) => {
    type: "JSXMemberExpression";
    object: import("@swc/core").JSXObject;
    property: import("@swc/core").Identifier;
});
export declare const $JSXNamespacedName: import("@macro-plugin/core").MacroPlugin & ((namespace: import("@swc/core").Identifier, name: import("@swc/core").Identifier) => {
    type: "JSXNamespacedName";
    namespace: import("@swc/core").Identifier;
    name: import("@swc/core").Identifier;
});
export declare const $JSXEmptyExpression: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "JSXEmptyExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXExpressionContainer: import("@macro-plugin/core").MacroPlugin & ((expression: import("@swc/core").JSXExpression) => {
    type: "JSXExpressionContainer";
    expression: import("@swc/core").JSXExpression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXSpreadChild: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "JSXSpreadChild";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXOpeningElement: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").JSXElementName, attributes?: import("@swc/core").JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "JSXOpeningElement";
    name: import("@swc/core").JSXElementName;
    attributes: import("@swc/core").JSXAttributeOrSpread[];
    selfClosing: boolean;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXClosingElement: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").JSXElementName) => {
    type: "JSXClosingElement";
    name: import("@swc/core").JSXElementName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXAttribute: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").JSXAttributeName, value?: import("@swc/core").JSXAttrValue | undefined) => {
    type: "JSXAttribute";
    name: import("@swc/core").JSXAttributeName;
    value: import("@swc/core").JSXAttrValue | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXText: import("@macro-plugin/core").MacroPlugin & ((value: string, raw?: string) => {
    type: "JSXText";
    value: string;
    raw: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXElement: import("@macro-plugin/core").MacroPlugin & ((opening: import("@swc/core").JSXOpeningElement, children?: import("@swc/core").JSXElementChild[], closing?: import("@swc/core").JSXClosingElement | undefined) => {
    type: "JSXElement";
    opening: import("@swc/core").JSXOpeningElement;
    children: import("@swc/core").JSXElementChild[];
    closing: import("@swc/core").JSXClosingElement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXFragment: import("@macro-plugin/core").MacroPlugin & ((opening: import("@swc/core").JSXOpeningFragment, children: import("@swc/core").JSXElementChild[] | undefined, closing: import("@swc/core").JSXClosingFragment) => {
    type: "JSXFragment";
    opening: import("@swc/core").JSXOpeningFragment;
    children: import("@swc/core").JSXElementChild[];
    closing: import("@swc/core").JSXClosingFragment;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXOpeningFragment: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "JSXOpeningFragment";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $JSXClosingFragment: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "JSXClosingFragment";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportDefaultExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "ExportDefaultExpression";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportDeclaration: import("@macro-plugin/core").MacroPlugin & ((declaration: import("@swc/core").Declaration) => {
    type: "ExportDeclaration";
    declaration: import("@swc/core").Declaration;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ImportDeclaration: import("@macro-plugin/core").MacroPlugin & ((specifiers: import("@swc/core").ImportSpecifier[], source: import("@swc/core").StringLiteral, asserts?: import("@swc/core").ObjectExpression | undefined, typeOnly?: boolean) => {
    type: "ImportDeclaration";
    specifiers: import("@swc/core").ImportSpecifier[];
    source: import("@swc/core").StringLiteral;
    typeOnly: boolean;
    asserts: import("@swc/core").ObjectExpression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportAllDeclaration: import("@macro-plugin/core").MacroPlugin & ((source: import("@swc/core").StringLiteral, asserts?: import("@swc/core").ObjectExpression | undefined) => {
    type: "ExportAllDeclaration";
    source: import("@swc/core").StringLiteral;
    asserts: import("@swc/core").ObjectExpression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportNamedDeclaration: import("@macro-plugin/core").MacroPlugin & ((specifiers: import("@swc/core").ExportSpecifier[], source?: import("@swc/core").StringLiteral | undefined, asserts?: import("@swc/core").ObjectExpression | undefined, typeOnly?: boolean) => {
    type: "ExportNamedDeclaration";
    specifiers: import("@swc/core").ExportSpecifier[];
    source: import("@swc/core").StringLiteral | undefined;
    typeOnly: boolean;
    asserts: import("@swc/core").ObjectExpression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportDefaultDeclaration: import("@macro-plugin/core").MacroPlugin & ((decl: import("@swc/core").DefaultDecl) => {
    type: "ExportDefaultDeclaration";
    decl: import("@swc/core").DefaultDecl;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ImportDefaultSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: import("@swc/core").Identifier) => {
    type: "ImportDefaultSpecifier";
    local: import("@swc/core").Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ImportNamespaceSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: import("@swc/core").Identifier) => {
    type: "ImportNamespaceSpecifier";
    local: import("@swc/core").Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $NamedImportSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: import("@swc/core").Identifier, imported?: import("@swc/core").ModuleExportName | undefined, isTypeOnly?: boolean) => {
    type: "ImportSpecifier";
    local: import("@swc/core").Identifier;
    imported: import("@swc/core").ModuleExportName | undefined;
    isTypeOnly: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportNamespaceSpecifier: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").ModuleExportName) => {
    type: "ExportNamespaceSpecifier";
    name: import("@swc/core").ModuleExportName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExportDefaultSpecifier: import("@macro-plugin/core").MacroPlugin & ((exported: import("@swc/core").Identifier) => {
    type: "ExportDefaultSpecifier";
    exported: import("@swc/core").Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $NamedExportSpecifier: import("@macro-plugin/core").MacroPlugin & ((orig: import("@swc/core").ModuleExportName, exported?: import("@swc/core").ModuleExportName | undefined, isTypeOnly?: boolean) => {
    type: "ExportSpecifier";
    orig: import("@swc/core").ModuleExportName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    exported: import("@swc/core").ModuleExportName | undefined;
    isTypeOnly: boolean;
});
export declare const $Module: import("@macro-plugin/core").MacroPlugin & ((body?: import("@swc/core").ModuleItem[], interpreter?: string | undefined) => import("@swc/core").Module);
export declare const $Script: import("@macro-plugin/core").MacroPlugin & ((body?: import("@swc/core").Statement[], interpreter?: string | undefined) => import("@swc/core").Script);
export declare const $ArrayPattern: import("@macro-plugin/core").MacroPlugin & ((elements: (import("@swc/core").Pattern | undefined)[], optional?: boolean, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "ArrayPattern";
    elements: (import("@swc/core").Pattern | undefined)[];
    optional: boolean;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ObjectPattern: import("@macro-plugin/core").MacroPlugin & ((properties: import("@swc/core").ObjectPatternProperty[], optional?: boolean, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "ObjectPattern";
    properties: import("@swc/core").ObjectPatternProperty[];
    optional: boolean;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $AssignmentPattern: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").Pattern, right: Expression, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "AssignmentPattern";
    left: import("@swc/core").Pattern;
    right: Expression;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $RestElement: import("@macro-plugin/core").MacroPlugin & ((argument: import("@swc/core").Pattern, rest: import("@swc/core").Span, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "RestElement";
    rest: import("@swc/core").Span;
    argument: import("@swc/core").Pattern;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $KeyValuePatternProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, value: import("@swc/core").Pattern) => {
    type: "KeyValuePatternProperty";
    key: import("@swc/core").PropertyName;
    value: import("@swc/core").Pattern;
});
export declare const $AssignmentPatternProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").Identifier, value?: Expression | undefined) => {
    type: "AssignmentPatternProperty";
    key: import("@swc/core").Identifier;
    value: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $KeyValueProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, value: Expression) => {
    type: "KeyValueProperty";
    value: Expression;
    key: import("@swc/core").PropertyName;
});
export declare const $AssignmentProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").Identifier, value: Expression) => {
    type: "AssignmentProperty";
    key: import("@swc/core").Identifier;
    value: Expression;
});
export declare const $GetterProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, body?: import("@swc/core").BlockStatement | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "GetterProperty";
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    body: import("@swc/core").BlockStatement | undefined;
    key: import("@swc/core").PropertyName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $SetterProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, param: import("@swc/core").Pattern, body?: import("@swc/core").BlockStatement | undefined) => {
    type: "SetterProperty";
    param: import("@swc/core").Pattern;
    body: import("@swc/core").BlockStatement | undefined;
    key: import("@swc/core").PropertyName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $MethodProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, params: import("@swc/core").Param[], body?: import("@swc/core").BlockStatement | undefined, async?: boolean, generator?: boolean, decorators?: import("@swc/core").Decorator[] | undefined, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined) => {
    type: "MethodProperty";
    key: import("@swc/core").PropertyName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    params: import("@swc/core").Param[];
    body: import("@swc/core").BlockStatement | undefined;
    async: boolean;
    generator: boolean;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
});
export declare const $ComputedPropName: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "Computed";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BlockStatement: import("@macro-plugin/core").MacroPlugin & ((stmts?: import("@swc/core").Statement[]) => {
    type: "BlockStatement";
    stmts: import("@swc/core").Statement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ExpressionStatement: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "ExpressionStatement";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $EmptyStatement: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "EmptyStatement";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $DebuggerStatement: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "DebuggerStatement";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $WithStatement: import("@macro-plugin/core").MacroPlugin & ((object: Expression, body: import("@swc/core").Statement) => {
    type: "WithStatement";
    object: Expression;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ReturnStatement: import("@macro-plugin/core").MacroPlugin & ((argument?: Expression | undefined) => {
    type: "ReturnStatement";
    argument: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $LabeledStatement: import("@macro-plugin/core").MacroPlugin & ((label: import("@swc/core").Identifier, body: import("@swc/core").Statement) => {
    type: "LabeledStatement";
    label: import("@swc/core").Identifier;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $BreakStatement: import("@macro-plugin/core").MacroPlugin & ((label?: import("@swc/core").Identifier | undefined) => {
    type: "BreakStatement";
    label: import("@swc/core").Identifier | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ContinueStatement: import("@macro-plugin/core").MacroPlugin & ((label?: import("@swc/core").Identifier | undefined) => {
    type: "ContinueStatement";
    label: import("@swc/core").Identifier | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $IfStatement: import("@macro-plugin/core").MacroPlugin & ((test: Expression, consequent: import("@swc/core").Statement, alternate?: import("@swc/core").Statement | undefined) => {
    type: "IfStatement";
    test: Expression;
    consequent: import("@swc/core").Statement;
    alternate: import("@swc/core").Statement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $SwitchStatement: import("@macro-plugin/core").MacroPlugin & ((discriminant: Expression, cases?: import("@swc/core").SwitchCase[]) => {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: import("@swc/core").SwitchCase[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ThrowStatement: import("@macro-plugin/core").MacroPlugin & ((argument: Expression) => {
    type: "ThrowStatement";
    argument: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TryStatement: import("@macro-plugin/core").MacroPlugin & ((block: import("@swc/core").BlockStatement, handler?: import("@swc/core").CatchClause | undefined, finalizer?: import("@swc/core").BlockStatement | undefined) => {
    type: "TryStatement";
    block: import("@swc/core").BlockStatement;
    handler: import("@swc/core").CatchClause | undefined;
    finalizer: import("@swc/core").BlockStatement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $WhileStatement: import("@macro-plugin/core").MacroPlugin & ((test: Expression, body: import("@swc/core").Statement) => {
    type: "WhileStatement";
    test: Expression;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $DoWhileStatement: import("@macro-plugin/core").MacroPlugin & ((test: Expression, body: import("@swc/core").Statement) => {
    type: "DoWhileStatement";
    test: Expression;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ForStatement: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").Statement, init?: Expression | import("@swc/core").VariableDeclaration | undefined, test?: Expression | undefined, update?: Expression | undefined) => {
    type: "ForStatement";
    init: Expression | import("@swc/core").VariableDeclaration | undefined;
    test: Expression | undefined;
    update: Expression | undefined;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ForInStatement: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern, right: Expression, body: import("@swc/core").Statement) => {
    type: "ForInStatement";
    left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern;
    right: Expression;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $ForOfStatement: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern, right: Expression, body: import("@swc/core").Statement, _await?: import("@swc/core").Span | undefined) => {
    type: "ForOfStatement";
    await: import("@swc/core").Span | undefined;
    left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern;
    right: Expression;
    body: import("@swc/core").Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $SwitchCase: import("@macro-plugin/core").MacroPlugin & ((test?: Expression | undefined, consequent?: import("@swc/core").Statement[]) => {
    type: "SwitchCase";
    test: Expression | undefined;
    consequent: import("@swc/core").Statement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $CatchClause: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").BlockStatement, param?: import("@swc/core").Pattern | undefined) => {
    type: "CatchClause";
    param: import("@swc/core").Pattern | undefined;
    body: import("@swc/core").BlockStatement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeAnnotation: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType) => {
    type: "TsTypeAnnotation";
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeParameterDeclaration: import("@macro-plugin/core").MacroPlugin & ((parameters?: import("@swc/core").TsTypeParameter[]) => {
    type: "TsTypeParameterDeclaration";
    parameters: import("@swc/core").TsTypeParameter[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeParameter: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").Identifier, _in: boolean, _out: boolean, constraint?: import("@swc/core").TsType | undefined, _default?: import("@swc/core").TsType | undefined) => {
    type: "TsTypeParameter";
    name: import("@swc/core").Identifier;
    in: boolean;
    out: boolean;
    constraint: import("@swc/core").TsType | undefined;
    default: import("@swc/core").TsType | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeParameterInstantiation: import("@macro-plugin/core").MacroPlugin & ((params?: import("@swc/core").TsType[]) => {
    type: "TsTypeParameterInstantiation";
    params: import("@swc/core").TsType[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsParameterProperty: import("@macro-plugin/core").MacroPlugin & ((param: import("@swc/core").TsParameterPropertyParameter, accessibility?: import("@swc/core").Accessibility | undefined, decorators?: import("@swc/core").Decorator[] | undefined, override?: boolean, readonly?: boolean) => {
    type: "TsParameterProperty";
    decorators: import("@swc/core").Decorator[] | undefined;
    accessibility: import("@swc/core").Accessibility | undefined;
    override: boolean;
    readonly: boolean;
    param: import("@swc/core").TsParameterPropertyParameter;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsQualifiedName: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").TsEntityName, right: import("@swc/core").Identifier) => {
    type: "TsQualifiedName";
    left: import("@swc/core").TsEntityName;
    right: import("@swc/core").Identifier;
});
export declare const $TsCallSignatureDeclaration: import("@macro-plugin/core").MacroPlugin & ((params?: import("@swc/core").TsFnParameter[], typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined) => {
    type: "TsCallSignatureDeclaration";
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsConstructSignatureDeclaration: import("@macro-plugin/core").MacroPlugin & ((params?: import("@swc/core").TsFnParameter[], typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined) => {
    type: "TsConstructSignatureDeclaration";
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsPropertySignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, params: import("@swc/core").TsFnParameter[], init?: Expression | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsPropertySignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    init: Expression | undefined;
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsGetterSignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsGetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsSetterSignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, param: import("@swc/core").TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsSetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    param: import("@swc/core").TsFnParameter;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsMethodSignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, params: import("@swc/core").TsFnParameter[], typeAnn?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsMethodSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    params: import("@swc/core").TsFnParameter[];
    typeAnn: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsIndexSignature: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").TsFnParameter[], typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, readonly?: boolean, isStatic?: boolean) => {
    type: "TsIndexSignature";
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    readonly: boolean;
    static: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsKeywordType: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").TsKeywordTypeKind) => {
    type: "TsKeywordType";
    kind: import("@swc/core").TsKeywordTypeKind;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsThisType: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "TsThisType";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsFunctionType: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").TsFnParameter[], typeAnnotation: import("@swc/core").TsTypeAnnotation, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined) => {
    type: "TsFunctionType";
    params: import("@swc/core").TsFnParameter[];
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsConstructorType: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").TsFnParameter[], typeAnnotation: import("@swc/core").TsTypeAnnotation, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, isAbstract?: boolean) => {
    type: "TsConstructorType";
    params: import("@swc/core").TsFnParameter[];
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation;
    isAbstract: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeReference: import("@macro-plugin/core").MacroPlugin & ((typeName: import("@swc/core").TsEntityName, typeParams?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "TsTypeReference";
    typeName: import("@swc/core").TsEntityName;
    typeParams: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypePredicate: import("@macro-plugin/core").MacroPlugin & ((paramName: import("@swc/core").TsThisTypeOrIdent, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, asserts?: boolean) => {
    type: "TsTypePredicate";
    asserts: boolean;
    paramName: import("@swc/core").TsThisTypeOrIdent;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsImportType: import("@macro-plugin/core").MacroPlugin & ((argument: import("@swc/core").StringLiteral, qualifier?: import("@swc/core").TsEntityName | undefined, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "TsImportType";
    argument: import("@swc/core").StringLiteral;
    qualifier: import("@swc/core").TsEntityName | undefined;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeQuery: import("@macro-plugin/core").MacroPlugin & ((exprName: import("@swc/core").TsTypeQueryExpr, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "TsTypeQuery";
    exprName: import("@swc/core").TsTypeQueryExpr;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeLiteral: import("@macro-plugin/core").MacroPlugin & ((members?: import("@swc/core").TsTypeElement[]) => {
    type: "TsTypeLiteral";
    members: import("@swc/core").TsTypeElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsArrayType: import("@macro-plugin/core").MacroPlugin & ((elemType: import("@swc/core").TsType) => {
    type: "TsArrayType";
    elemType: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTupleType: import("@macro-plugin/core").MacroPlugin & ((elemTypes?: import("@swc/core").TsTupleElement[]) => {
    type: "TsTupleType";
    elemTypes: import("@swc/core").TsTupleElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTupleElement: import("@macro-plugin/core").MacroPlugin & ((ty: import("@swc/core").TsType, label?: import("@swc/core").Pattern | undefined) => {
    type: "TsTupleElement";
    label: import("@swc/core").Pattern | undefined;
    ty: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsOptionalType: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType) => {
    type: "TsOptionalType";
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsRestType: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType) => {
    type: "TsRestType";
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsUnionType: import("@macro-plugin/core").MacroPlugin & ((types?: import("@swc/core").TsType[]) => {
    type: "TsUnionType";
    types: import("@swc/core").TsType[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsIntersectionType: import("@macro-plugin/core").MacroPlugin & ((types?: import("@swc/core").TsType[]) => {
    type: "TsIntersectionType";
    types: import("@swc/core").TsType[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsConditionalType: import("@macro-plugin/core").MacroPlugin & ((checkType: import("@swc/core").TsType, extendsType: import("@swc/core").TsType, trueType: import("@swc/core").TsType, falseType: import("@swc/core").TsType) => {
    type: "TsConditionalType";
    checkType: import("@swc/core").TsType;
    extendsType: import("@swc/core").TsType;
    trueType: import("@swc/core").TsType;
    falseType: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsInferType: import("@macro-plugin/core").MacroPlugin & ((typeParam: import("@swc/core").TsTypeParameter) => {
    type: "TsInferType";
    typeParam: import("@swc/core").TsTypeParameter;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsParenthesizedType: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType) => {
    type: "TsParenthesizedType";
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeOperator: import("@macro-plugin/core").MacroPlugin & ((op: import("@swc/core").TsTypeOperatorOp, typeAnnotation: import("@swc/core").TsType) => {
    type: "TsTypeOperator";
    op: import("@swc/core").TsTypeOperatorOp;
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsIndexedAccessType: import("@macro-plugin/core").MacroPlugin & ((objectType: import("@swc/core").TsType, indexType: import("@swc/core").TsType, readonly?: boolean) => {
    type: "TsIndexedAccessType";
    readonly: boolean;
    objectType: import("@swc/core").TsType;
    indexType: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsMappedType: import("@macro-plugin/core").MacroPlugin & ((typeParam: import("@swc/core").TsTypeParameter, typeAnnotation?: import("@swc/core").TsType | undefined, nameType?: import("@swc/core").TsType | undefined, optional?: import("@swc/core").TruePlusMinus | undefined, readonly?: import("@swc/core").TruePlusMinus | undefined) => {
    type: "TsMappedType";
    readonly: import("@swc/core").TruePlusMinus | undefined;
    typeParam: import("@swc/core").TsTypeParameter;
    nameType: import("@swc/core").TsType | undefined;
    optional: import("@swc/core").TruePlusMinus | undefined;
    typeAnnotation: import("@swc/core").TsType | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsLiteralType: import("@macro-plugin/core").MacroPlugin & ((literal: import("@swc/core").TsLiteral) => {
    type: "TsLiteralType";
    literal: import("@swc/core").TsLiteral;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTemplateLiteralType: import("@macro-plugin/core").MacroPlugin & ((types?: import("@swc/core").TsType[], quasis?: import("@swc/core").TemplateElement[]) => {
    type: "TemplateLiteral";
    types: import("@swc/core").TsType[];
    quasis: import("@swc/core").TemplateElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsInterfaceDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier, body: import("@swc/core").TsInterfaceBody, _extends?: import("@swc/core").TsExpressionWithTypeArguments[], typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, declare?: boolean) => {
    type: "TsInterfaceDeclaration";
    id: import("@swc/core").Identifier;
    declare: boolean;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    extends: import("@swc/core").TsExpressionWithTypeArguments[];
    body: import("@swc/core").TsInterfaceBody;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsInterfaceBody: import("@macro-plugin/core").MacroPlugin & ((body?: import("@swc/core").TsTypeElement[]) => {
    type: "TsInterfaceBody";
    body: import("@swc/core").TsTypeElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsExpressionWithTypeArguments: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined) => {
    type: "TsExpressionWithTypeArguments";
    expression: Expression;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeAliasDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier, typeAnnotation: import("@swc/core").TsType, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, declare?: boolean) => {
    type: "TsTypeAliasDeclaration";
    declare: boolean;
    id: import("@swc/core").Identifier;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsEnumDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier, members?: import("@swc/core").TsEnumMember[], declare?: boolean, isConst?: boolean) => {
    type: "TsEnumDeclaration";
    declare: boolean;
    isConst: boolean;
    id: import("@swc/core").Identifier;
    members: import("@swc/core").TsEnumMember[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsEnumMember: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").TsEnumMemberId, init?: Expression | undefined) => {
    type: "TsEnumMember";
    id: import("@swc/core").TsEnumMemberId;
    init: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsModuleDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").TsModuleName, body?: import("@swc/core").TsNamespaceBody | undefined, declare?: boolean, global?: boolean) => {
    type: "TsModuleDeclaration";
    declare: boolean;
    global: boolean;
    id: import("@swc/core").TsModuleName;
    body: import("@swc/core").TsNamespaceBody | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsModuleBlock: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").ModuleItem[]) => {
    type: "TsModuleBlock";
    body: import("@swc/core").ModuleItem[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsNamespaceDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier, body: import("@swc/core").TsNamespaceBody, declare?: boolean, global?: boolean) => {
    type: "TsNamespaceDeclaration";
    declare: boolean;
    global: boolean;
    id: import("@swc/core").Identifier;
    body: import("@swc/core").TsNamespaceBody;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsImportEqualsDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier, moduleRef: import("@swc/core").TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean) => {
    type: "TsImportEqualsDeclaration";
    declare: boolean;
    isExport: boolean;
    isTypeOnly: boolean;
    id: import("@swc/core").Identifier;
    moduleRef: import("@swc/core").TsModuleReference;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsExternalModuleReference: import("@macro-plugin/core").MacroPlugin & ((expression: import("@swc/core").StringLiteral) => {
    type: "TsExternalModuleReference";
    expression: import("@swc/core").StringLiteral;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsExportAssignment: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "TsExportAssignment";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsNamespaceExportDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Identifier) => {
    type: "TsNamespaceExportDeclaration";
    id: import("@swc/core").Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsAsExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeAnnotation: import("@swc/core").TsType) => {
    type: "TsAsExpression";
    expression: Expression;
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsSatisfiesExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeAnnotation: import("@swc/core").TsType) => {
    type: "TsSatisfiesExpression";
    expression: Expression;
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsInstantiation: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeArguments: import("@swc/core").TsTypeParameterInstantiation) => {
    type: "TsInstantiation";
    expression: Expression;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsTypeAssertion: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeAnnotation: import("@swc/core").TsType) => {
    type: "TsTypeAssertion";
    expression: Expression;
    typeAnnotation: import("@swc/core").TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsConstAssertion: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "TsConstAssertion";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $TsNonNullExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression) => {
    type: "TsNonNullExpression";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
export declare const $Invalid: import("@macro-plugin/core").MacroPlugin & (() => {
    type: "Invalid";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
});
