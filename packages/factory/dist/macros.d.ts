import type { ArrayExpression, BooleanLiteral, CallExpression, Expression, Identifier, NullLiteral, NumericLiteral, ObjectExpression, Span, StringLiteral } from "@swc/core";
export declare const isNullExpr: (expr: Expression | undefined) => boolean;
export declare const createAst: (type: string, props: Record<string, Expression | undefined>, span: Span) => ObjectExpression;
export declare const $Span: import("@macro-plugin/core").MacroPlugin & ((start?: number, end?: number, ctxt?: number) => {
    start: number;
    end: number;
    ctxt: number;
});
export declare const $Identifier: import("@macro-plugin/core").MacroPlugin & ((value: string, optional?: boolean, span?: Span) => {
    type: "Identifier";
    value: string;
    optional: boolean;
    span: Span;
});
export declare const $StringLiteral: import("@macro-plugin/core").MacroPlugin & ((value: string, raw?: string | undefined, span?: Span) => {
    type: "StringLiteral";
    value: string;
    raw: string | undefined;
    span: Span;
});
export declare const $NumericLiteral: import("@macro-plugin/core").MacroPlugin & ((value: number, raw?: string | undefined, span?: Span) => {
    type: "NumericLiteral";
    value: number;
    raw: string | undefined;
    span: Span;
});
export declare const $BigIntLiteral: import("@macro-plugin/core").MacroPlugin & ((value: bigint, raw?: string | undefined, span?: Span) => {
    type: "BigIntLiteral";
    value: bigint;
    raw: string | undefined;
    span: Span;
});
export declare const $BooleanLiteral: import("@macro-plugin/core").MacroPlugin & ((value: boolean, span?: Span) => {
    type: "BooleanLiteral";
    value: boolean;
    span: Span;
});
export declare const $NullLiteral: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "NullLiteral";
    span: Span;
});
export declare const $RegExpLiteral: import("@macro-plugin/core").MacroPlugin & ((pattern: string, flags: string, span?: Span) => {
    type: "RegExpLiteral";
    pattern: string;
    flags: string;
    span: Span;
});
export declare const $Argument: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, spread?: Span | undefined) => {
    spread: Span | undefined;
    expression: Expression;
});
export declare const $CallExpression: import("@macro-plugin/core").MacroPlugin & ((callee: Expression | import("@swc/core").Super | import("@swc/core").Import, args?: import("@swc/core").Argument[], typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "CallExpression";
    span: Span;
    callee: Expression | import("@swc/core").Super | import("@swc/core").Import;
    arguments: import("@swc/core").Argument[];
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
});
export declare const $ClassProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, value?: Expression | undefined, accessibility?: import("@swc/core").Accessibility | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: Span) => {
    type: "ClassProperty";
    span: Span;
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
export declare const $PrivateProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PrivateName, value?: Expression | undefined, accessibility?: import("@swc/core").Accessibility | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: Span) => {
    type: "PrivateProperty";
    key: import("@swc/core").PrivateName;
    value: Expression | undefined;
    span: Span;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    accessibility: import("@swc/core").Accessibility | undefined;
    definite: boolean;
    isOptional: boolean;
    isOverride: boolean;
    isStatic: boolean;
    readonly: boolean;
});
export declare const $Param: import("@macro-plugin/core").MacroPlugin & ((pat: import("@swc/core").Pattern, decorators?: import("@swc/core").Decorator[] | undefined, span?: Span) => {
    type: "Parameter";
    pat: import("@swc/core").Pattern;
    decorators: import("@swc/core").Decorator[] | undefined;
    span: Span;
});
export declare const $Constructor: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, params: (import("@swc/core").Param | import("@swc/core").TsParameterProperty)[], body?: import("@swc/core").BlockStatement | undefined, accessibility?: import("@swc/core").Accessibility | undefined, isOptional?: boolean, span?: Span) => {
    type: "Constructor";
    key: import("@swc/core").PropertyName;
    params: (import("@swc/core").Param | import("@swc/core").TsParameterProperty)[];
    body: import("@swc/core").BlockStatement | undefined;
    span: Span;
    accessibility: import("@swc/core").Accessibility | undefined;
    isOptional: boolean;
});
export declare const $ClassMethod: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").MethodKind, key: import("@swc/core").PropertyName, fn: import("@swc/core").Fn, accessibility?: import("@swc/core").Accessibility | undefined, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: Span) => {
    type: "ClassMethod";
    key: import("@swc/core").PropertyName;
    function: import("@swc/core").Fn;
    kind: import("@swc/core").MethodKind;
    isStatic: boolean;
    accessibility: import("@swc/core").Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: Span;
});
export declare const $PrivateMethod: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").MethodKind, key: import("@swc/core").PrivateName, fn: import("@swc/core").Fn, accessibility?: import("@swc/core").Accessibility | undefined, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: Span) => {
    type: "PrivateMethod";
    key: import("@swc/core").PrivateName;
    function: import("@swc/core").Fn;
    kind: import("@swc/core").MethodKind;
    isStatic: boolean;
    accessibility: import("@swc/core").Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: Span;
});
export declare const $StaticBlock: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").BlockStatement, span?: Span) => {
    type: "StaticBlock";
    body: import("@swc/core").BlockStatement;
    span: Span;
});
export declare const $Decorator: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "Decorator";
    expression: Expression;
    span: Span;
});
export declare const $FunctionDeclaration: import("@macro-plugin/core").MacroPlugin & ((identifier: Identifier, params: import("@swc/core").Param[], body?: import("@swc/core").BlockStatement | undefined, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, declare?: boolean, async?: boolean, generator?: boolean, span?: Span) => {
    type: "FunctionDeclaration";
    span: Span;
    params: import("@swc/core").Param[];
    body: import("@swc/core").BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
    identifier: Identifier;
    declare: boolean;
});
export declare const $ClassDeclaration: import("@macro-plugin/core").MacroPlugin & ((identifier: Identifier, body: import("@swc/core").ClassMember[], impls: import("@swc/core").TsExpressionWithTypeArguments[], superClass?: Expression | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, superTypeParams?: import("@swc/core").TsTypeParameterInstantiation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, declare?: boolean, isAbstract?: boolean, span?: Span) => {
    type: "ClassDeclaration";
    identifier: Identifier;
    declare: boolean;
    body: import("@swc/core").ClassMember[];
    span: Span;
    superClass: Expression | undefined;
    isAbstract: boolean;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    superTypeParams: import("@swc/core").TsTypeParameterInstantiation | undefined;
    implements: import("@swc/core").TsExpressionWithTypeArguments[];
});
export declare const $VariableDeclaration: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").VariableDeclarationKind, declarations?: import("@swc/core").VariableDeclarator[], declare?: boolean, span?: Span) => {
    type: "VariableDeclaration";
    kind: import("@swc/core").VariableDeclarationKind;
    declare: boolean;
    declarations: import("@swc/core").VariableDeclarator[];
    span: Span;
});
export declare const $VariableDeclarator: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").Pattern, init?: Expression | undefined, definite?: boolean, span?: Span) => {
    type: "VariableDeclarator";
    id: import("@swc/core").Pattern;
    definite: boolean;
    init: Expression | undefined;
    span: Span;
});
export declare const $OptionalChainingExpression: import("@macro-plugin/core").MacroPlugin & ((base: import("@swc/core").MemberExpression | import("@swc/core").OptionalChainingCall, questionDotToken?: Span, span?: Span) => {
    type: "OptionalChainingExpression";
    questionDotToken: Span;
    base: import("@swc/core").MemberExpression | import("@swc/core").OptionalChainingCall;
    span: Span;
});
export declare const $OptionalChainingCall: import("@macro-plugin/core").MacroPlugin & ((callee: Expression, args?: import("@swc/core").ExprOrSpread[], typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "CallExpression";
    callee: Expression;
    arguments: import("@swc/core").ExprOrSpread[];
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $ThisExpression: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "ThisExpression";
    span: Span;
});
export declare const $ArrayExpression: import("@macro-plugin/core").MacroPlugin & ((elements?: (import("@swc/core").ExprOrSpread | undefined)[], span?: Span) => {
    type: "ArrayExpression";
    elements: (import("@swc/core").ExprOrSpread | undefined)[];
    span: Span;
});
export declare const $ExprOrSpread: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, spread?: Span | undefined) => {
    spread: Span | undefined;
    expression: Expression;
});
export declare const $ObjectExpression: import("@macro-plugin/core").MacroPlugin & ((properties?: (import("@swc/core").SpreadElement | import("@swc/core").Property)[], span?: Span) => {
    type: "ObjectExpression";
    properties: (import("@swc/core").SpreadElement | import("@swc/core").Property)[];
    span: Span;
});
export declare const $SpreadElement: import("@macro-plugin/core").MacroPlugin & ((args: Expression, spread?: Span) => {
    type: "SpreadElement";
    spread: Span;
    arguments: Expression;
});
export declare const $UnaryExpression: import("@macro-plugin/core").MacroPlugin & ((operator: import("@swc/core").UnaryOperator, argument: Expression, span?: Span) => {
    type: "UnaryExpression";
    span: Span;
    operator: import("@swc/core").UnaryOperator;
    argument: Expression;
});
export declare const $UpdateExpression: import("@macro-plugin/core").MacroPlugin & ((operator: import("@swc/core").UpdateOperator, argument: Expression, prefix?: boolean, span?: Span) => {
    type: "UpdateExpression";
    operator: import("@swc/core").UpdateOperator;
    prefix: boolean;
    argument: Expression;
    span: Span;
});
export declare const $BinaryExpression: import("@macro-plugin/core").MacroPlugin & ((left: Expression, operator: import("@swc/core").BinaryOperator, right: Expression, span?: Span) => {
    type: "BinaryExpression";
    operator: import("@swc/core").BinaryOperator;
    left: Expression;
    right: Expression;
    span: Span;
});
export declare const $FunctionExpression: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").Param[], body?: import("@swc/core").BlockStatement | undefined, identifier?: Identifier | undefined, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, async?: boolean, generator?: boolean, span?: Span) => {
    type: "FunctionExpression";
    params: import("@swc/core").Param[];
    decorators: import("@swc/core").Decorator[] | undefined;
    body: import("@swc/core").BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
    identifier: Identifier | undefined;
    span: Span;
});
export declare const $ClassExpression: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").ClassMember[], impls?: import("@swc/core").TsExpressionWithTypeArguments[], superClass?: Expression | undefined, identifier?: Identifier | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, superTypeParams?: import("@swc/core").TsTypeParameterInstantiation | undefined, decorators?: import("@swc/core").Decorator[] | undefined, isAbstract?: boolean, span?: Span) => {
    type: "ClassExpression";
    identifier: Identifier | undefined;
    body: import("@swc/core").ClassMember[];
    superClass: Expression | undefined;
    isAbstract: boolean;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    superTypeParams: import("@swc/core").TsTypeParameterInstantiation | undefined;
    implements: import("@swc/core").TsExpressionWithTypeArguments[];
    decorators: import("@swc/core").Decorator[] | undefined;
    span: Span;
});
export declare const $AssignmentExpression: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").ThisExpression | ArrayExpression | ObjectExpression | import("@swc/core").FunctionExpression | import("@swc/core").UnaryExpression | import("@swc/core").UpdateExpression | import("@swc/core").BinaryExpression | import("@swc/core").AssignmentExpression | import("@swc/core").MemberExpression | import("@swc/core").SuperPropExpression | import("@swc/core").ConditionalExpression | CallExpression | import("@swc/core").NewExpression | import("@swc/core").SequenceExpression | Identifier | StringLiteral | BooleanLiteral | NullLiteral | NumericLiteral | import("@swc/core").BigIntLiteral | import("@swc/core").RegExpLiteral | import("@swc/core").JSXText | import("@swc/core").TemplateLiteral | import("@swc/core").TaggedTemplateExpression | import("@swc/core").ArrowFunctionExpression | import("@swc/core").ClassExpression | import("@swc/core").YieldExpression | import("@swc/core").MetaProperty | import("@swc/core").AwaitExpression | import("@swc/core").ParenthesisExpression | import("@swc/core").JSXMemberExpression | import("@swc/core").JSXNamespacedName | import("@swc/core").JSXEmptyExpression | import("@swc/core").JSXElement | import("@swc/core").JSXFragment | import("@swc/core").TsTypeAssertion | import("@swc/core").TsConstAssertion | import("@swc/core").TsNonNullExpression | import("@swc/core").TsAsExpression | import("@swc/core").TsSatisfiesExpression | import("@swc/core").TsInstantiation | import("@swc/core").PrivateName | import("@swc/core").OptionalChainingExpression | import("@swc/core").Invalid | import("@swc/core").BindingIdentifier | import("@swc/core").ArrayPattern | import("@swc/core").RestElement | import("@swc/core").ObjectPattern | import("@swc/core").AssignmentPattern, operator: import("@swc/core").AssignmentOperator, right: Expression, span?: Span) => {
    type: "AssignmentExpression";
    operator: import("@swc/core").AssignmentOperator;
    left: import("@swc/core").ThisExpression | ArrayExpression | ObjectExpression | import("@swc/core").FunctionExpression | import("@swc/core").UnaryExpression | import("@swc/core").UpdateExpression | import("@swc/core").BinaryExpression | import("@swc/core").AssignmentExpression | import("@swc/core").MemberExpression | import("@swc/core").SuperPropExpression | import("@swc/core").ConditionalExpression | CallExpression | import("@swc/core").NewExpression | import("@swc/core").SequenceExpression | Identifier | StringLiteral | BooleanLiteral | NullLiteral | NumericLiteral | import("@swc/core").BigIntLiteral | import("@swc/core").RegExpLiteral | import("@swc/core").JSXText | import("@swc/core").TemplateLiteral | import("@swc/core").TaggedTemplateExpression | import("@swc/core").ArrowFunctionExpression | import("@swc/core").ClassExpression | import("@swc/core").YieldExpression | import("@swc/core").MetaProperty | import("@swc/core").AwaitExpression | import("@swc/core").ParenthesisExpression | import("@swc/core").JSXMemberExpression | import("@swc/core").JSXNamespacedName | import("@swc/core").JSXEmptyExpression | import("@swc/core").JSXElement | import("@swc/core").JSXFragment | import("@swc/core").TsTypeAssertion | import("@swc/core").TsConstAssertion | import("@swc/core").TsNonNullExpression | import("@swc/core").TsAsExpression | import("@swc/core").TsSatisfiesExpression | import("@swc/core").TsInstantiation | import("@swc/core").PrivateName | import("@swc/core").OptionalChainingExpression | import("@swc/core").Invalid | import("@swc/core").BindingIdentifier | import("@swc/core").ArrayPattern | import("@swc/core").RestElement | import("@swc/core").ObjectPattern | import("@swc/core").AssignmentPattern;
    right: Expression;
    span: Span;
});
export declare const $MemberExpression: import("@macro-plugin/core").MacroPlugin & ((object: Expression, property: Identifier | import("@swc/core").PrivateName | import("@swc/core").ComputedPropName, span?: Span) => {
    type: "MemberExpression";
    object: Expression;
    property: Identifier | import("@swc/core").PrivateName | import("@swc/core").ComputedPropName;
    span: Span;
});
export declare const $SuperPropExpression: import("@macro-plugin/core").MacroPlugin & ((obj: import("@swc/core").Super, property: Identifier | import("@swc/core").ComputedPropName, span?: Span) => {
    type: "SuperPropExpression";
    obj: import("@swc/core").Super;
    property: Identifier | import("@swc/core").ComputedPropName;
    span: Span;
});
export declare const $ConditionalExpression: import("@macro-plugin/core").MacroPlugin & ((test: Expression, consequent: Expression, alternate: Expression, span?: Span) => {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    span: Span;
});
export declare const $Super: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "Super";
    span: Span;
});
export declare const $Import: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "Import";
    span: Span;
});
export declare const $NewExpression: import("@macro-plugin/core").MacroPlugin & ((callee: Expression, args?: import("@swc/core").Argument[] | undefined, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "NewExpression";
    callee: Expression;
    arguments: import("@swc/core").Argument[] | undefined;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $SequenceExpression: import("@macro-plugin/core").MacroPlugin & ((expressions: Expression[], span?: Span) => {
    type: "SequenceExpression";
    expressions: Expression[];
    span: Span;
});
export declare const $ArrowFunctionExpression: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").Pattern[], body: Expression | import("@swc/core").BlockStatement, async?: boolean, generator?: boolean, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined, span?: Span) => {
    type: "ArrowFunctionExpression";
    params: import("@swc/core").Pattern[];
    body: Expression | import("@swc/core").BlockStatement;
    async: boolean;
    generator: boolean;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: Span;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
});
export declare const $YieldExpression: import("@macro-plugin/core").MacroPlugin & ((argument?: Expression | undefined, delegate?: boolean, span?: Span) => {
    type: "YieldExpression";
    argument: Expression | undefined;
    delegate: boolean;
    span: Span;
});
export declare const $MetaProperty: import("@macro-plugin/core").MacroPlugin & ((kind: "new.target" | "import.meta", span?: Span) => {
    type: "MetaProperty";
    kind: "new.target" | "import.meta";
    span: Span;
});
export declare const $AwaitExpression: import("@macro-plugin/core").MacroPlugin & ((argument: Expression, span?: Span) => {
    type: "AwaitExpression";
    argument: Expression;
    span: Span;
});
export declare const $TemplateLiteral: import("@macro-plugin/core").MacroPlugin & ((expressions?: Expression[], quasis?: import("@swc/core").TemplateElement[], span?: Span) => {
    type: "TemplateLiteral";
    expressions: Expression[];
    quasis: import("@swc/core").TemplateElement[];
    span: Span;
});
export declare const $TaggedTemplateExpression: import("@macro-plugin/core").MacroPlugin & ((tag: Expression, template: import("@swc/core").TemplateLiteral, typeParameters?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "TaggedTemplateExpression";
    tag: Expression;
    typeParameters: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
    template: import("@swc/core").TemplateLiteral;
});
export declare const $TemplateElement: import("@macro-plugin/core").MacroPlugin & ((raw: string, cooked?: string | undefined, tail?: boolean, span?: Span) => {
    type: "TemplateElement";
    tail: boolean;
    cooked: string | undefined;
    raw: string;
    span: Span;
});
export declare const $ParenthesisExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "ParenthesisExpression";
    expression: Expression;
    span: Span;
});
export declare const $PrivateName: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, span?: Span) => {
    type: "PrivateName";
    id: Identifier;
    span: Span;
});
export declare const $JSXMemberExpression: import("@macro-plugin/core").MacroPlugin & ((object: import("@swc/core").JSXObject, property: Identifier) => {
    type: "JSXMemberExpression";
    object: import("@swc/core").JSXObject;
    property: Identifier;
});
export declare const $JSXNamespacedName: import("@macro-plugin/core").MacroPlugin & ((namespace: Identifier, name: Identifier) => {
    type: "JSXNamespacedName";
    namespace: Identifier;
    name: Identifier;
});
export declare const $JSXEmptyExpression: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "JSXEmptyExpression";
    span: Span;
});
export declare const $JSXExpressionContainer: import("@macro-plugin/core").MacroPlugin & ((expression: import("@swc/core").JSXExpression, span?: Span) => {
    type: "JSXExpressionContainer";
    expression: import("@swc/core").JSXExpression;
    span: Span;
});
export declare const $JSXSpreadChild: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "JSXSpreadChild";
    expression: Expression;
    span: Span;
});
export declare const $JSXOpeningElement: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").JSXElementName, attributes?: import("@swc/core").JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "JSXOpeningElement";
    name: import("@swc/core").JSXElementName;
    attributes: import("@swc/core").JSXAttributeOrSpread[];
    selfClosing: boolean;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $JSXClosingElement: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").JSXElementName, span?: Span) => {
    type: "JSXClosingElement";
    name: import("@swc/core").JSXElementName;
    span: Span;
});
export declare const $JSXAttribute: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").JSXAttributeName, value?: import("@swc/core").JSXAttrValue | undefined, span?: Span) => {
    type: "JSXAttribute";
    name: import("@swc/core").JSXAttributeName;
    value: import("@swc/core").JSXAttrValue | undefined;
    span: Span;
});
export declare const $JSXText: import("@macro-plugin/core").MacroPlugin & ((value: string, raw?: string, span?: Span) => {
    type: "JSXText";
    value: string;
    raw: string;
    span: Span;
});
export declare const $JSXElement: import("@macro-plugin/core").MacroPlugin & ((opening: import("@swc/core").JSXOpeningElement, children?: import("@swc/core").JSXElementChild[], closing?: import("@swc/core").JSXClosingElement | undefined, span?: Span) => {
    type: "JSXElement";
    opening: import("@swc/core").JSXOpeningElement;
    children: import("@swc/core").JSXElementChild[];
    closing: import("@swc/core").JSXClosingElement | undefined;
    span: Span;
});
export declare const $JSXFragment: import("@macro-plugin/core").MacroPlugin & ((opening: import("@swc/core").JSXOpeningFragment, children: import("@swc/core").JSXElementChild[] | undefined, closing: import("@swc/core").JSXClosingFragment, span?: Span) => {
    type: "JSXFragment";
    opening: import("@swc/core").JSXOpeningFragment;
    children: import("@swc/core").JSXElementChild[];
    closing: import("@swc/core").JSXClosingFragment;
    span: Span;
});
export declare const $JSXOpeningFragment: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "JSXOpeningFragment";
    span: Span;
});
export declare const $JSXClosingFragment: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "JSXClosingFragment";
    span: Span;
});
export declare const $ExportDefaultExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "ExportDefaultExpression";
    expression: Expression;
    span: Span;
});
export declare const $ExportDeclaration: import("@macro-plugin/core").MacroPlugin & ((declaration: import("@swc/core").Declaration, span?: Span) => {
    type: "ExportDeclaration";
    declaration: import("@swc/core").Declaration;
    span: Span;
});
export declare const $ImportDeclaration: import("@macro-plugin/core").MacroPlugin & ((specifiers: import("@swc/core").ImportSpecifier[], source: StringLiteral, asserts?: ObjectExpression | undefined, typeOnly?: boolean, span?: Span) => {
    type: "ImportDeclaration";
    specifiers: import("@swc/core").ImportSpecifier[];
    source: StringLiteral;
    typeOnly: boolean;
    asserts: ObjectExpression | undefined;
    span: Span;
});
export declare const $ExportAllDeclaration: import("@macro-plugin/core").MacroPlugin & ((source: StringLiteral, asserts?: ObjectExpression | undefined, span?: Span) => {
    type: "ExportAllDeclaration";
    source: StringLiteral;
    asserts: ObjectExpression | undefined;
    span: Span;
});
export declare const $ExportNamedDeclaration: import("@macro-plugin/core").MacroPlugin & ((specifiers: import("@swc/core").ExportSpecifier[], source?: StringLiteral | undefined, asserts?: ObjectExpression | undefined, typeOnly?: boolean, span?: Span) => {
    type: "ExportNamedDeclaration";
    specifiers: import("@swc/core").ExportSpecifier[];
    source: StringLiteral | undefined;
    typeOnly: boolean;
    asserts: ObjectExpression | undefined;
    span: Span;
});
export declare const $ExportDefaultDeclaration: import("@macro-plugin/core").MacroPlugin & ((decl: import("@swc/core").DefaultDecl, span?: Span) => {
    type: "ExportDefaultDeclaration";
    decl: import("@swc/core").DefaultDecl;
    span: Span;
});
export declare const $ImportDefaultSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: Identifier, span?: Span) => {
    type: "ImportDefaultSpecifier";
    local: Identifier;
    span: Span;
});
export declare const $ImportNamespaceSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: Identifier, span?: Span) => {
    type: "ImportNamespaceSpecifier";
    local: Identifier;
    span: Span;
});
export declare const $ImportSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: Identifier, imported?: import("@swc/core").ModuleExportName | undefined, isTypeOnly?: boolean, span?: Span) => {
    type: "ImportSpecifier";
    local: Identifier;
    imported: import("@swc/core").ModuleExportName | undefined;
    isTypeOnly: boolean;
    span: Span;
});
export declare const $NamedImportSpecifier: import("@macro-plugin/core").MacroPlugin & ((local: Identifier, imported?: import("@swc/core").ModuleExportName | undefined, isTypeOnly?: boolean, span?: Span) => {
    type: "ImportSpecifier";
    local: Identifier;
    imported: import("@swc/core").ModuleExportName | undefined;
    isTypeOnly: boolean;
    span: Span;
});
export declare const $ExportNamespaceSpecifier: import("@macro-plugin/core").MacroPlugin & ((name: import("@swc/core").ModuleExportName, span?: Span) => {
    type: "ExportNamespaceSpecifier";
    name: import("@swc/core").ModuleExportName;
    span: Span;
});
export declare const $ExportDefaultSpecifier: import("@macro-plugin/core").MacroPlugin & ((exported: Identifier, span?: Span) => {
    type: "ExportDefaultSpecifier";
    exported: Identifier;
    span: Span;
});
export declare const $ExportSpecifier: import("@macro-plugin/core").MacroPlugin & ((orig: import("@swc/core").ModuleExportName, exported?: import("@swc/core").ModuleExportName | undefined, isTypeOnly?: boolean, span?: Span) => {
    type: "ExportSpecifier";
    orig: import("@swc/core").ModuleExportName;
    span: Span;
    exported: import("@swc/core").ModuleExportName | undefined;
    isTypeOnly: boolean;
});
export declare const $NamedExportSpecifier: import("@macro-plugin/core").MacroPlugin & ((orig: import("@swc/core").ModuleExportName, exported?: import("@swc/core").ModuleExportName | undefined, isTypeOnly?: boolean, span?: Span) => {
    type: "ExportSpecifier";
    orig: import("@swc/core").ModuleExportName;
    span: Span;
    exported: import("@swc/core").ModuleExportName | undefined;
    isTypeOnly: boolean;
});
export declare const $Module: import("@macro-plugin/core").MacroPlugin & ((body?: import("@swc/core").ModuleItem[], interpreter?: string | undefined, span?: Span) => import("@swc/core").Module);
export declare const $Script: import("@macro-plugin/core").MacroPlugin & ((body?: import("@swc/core").Statement[], interpreter?: string | undefined, span?: Span) => import("@swc/core").Script);
export declare const $ArrayPattern: import("@macro-plugin/core").MacroPlugin & ((elements: (import("@swc/core").Pattern | undefined)[], optional?: boolean, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, span?: Span) => {
    type: "ArrayPattern";
    elements: (import("@swc/core").Pattern | undefined)[];
    optional: boolean;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: Span;
});
export declare const $ObjectPattern: import("@macro-plugin/core").MacroPlugin & ((properties: import("@swc/core").ObjectPatternProperty[], optional?: boolean, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, span?: Span) => {
    type: "ObjectPattern";
    properties: import("@swc/core").ObjectPatternProperty[];
    optional: boolean;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: Span;
});
export declare const $AssignmentPattern: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").Pattern, right: Expression, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, span?: Span) => {
    type: "AssignmentPattern";
    left: import("@swc/core").Pattern;
    right: Expression;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: Span;
});
export declare const $RestElement: import("@macro-plugin/core").MacroPlugin & ((argument: import("@swc/core").Pattern, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, rest?: Span, span?: Span) => {
    type: "RestElement";
    rest: Span;
    argument: import("@swc/core").Pattern;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: Span;
});
export declare const $KeyValuePatternProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, value: import("@swc/core").Pattern) => {
    type: "KeyValuePatternProperty";
    key: import("@swc/core").PropertyName;
    value: import("@swc/core").Pattern;
});
export declare const $AssignmentPatternProperty: import("@macro-plugin/core").MacroPlugin & ((key: Identifier, value?: Expression | undefined, span?: Span) => {
    type: "AssignmentPatternProperty";
    key: Identifier;
    value: Expression | undefined;
    span: Span;
});
export declare const $KeyValueProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, value: Expression) => {
    type: "KeyValueProperty";
    value: Expression;
    key: import("@swc/core").PropertyName;
});
export declare const $AssignmentProperty: import("@macro-plugin/core").MacroPlugin & ((key: Identifier, value: Expression) => {
    type: "AssignmentProperty";
    key: Identifier;
    value: Expression;
});
export declare const $GetterProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, body?: import("@swc/core").BlockStatement | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, span?: Span) => {
    type: "GetterProperty";
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    body: import("@swc/core").BlockStatement | undefined;
    key: import("@swc/core").PropertyName;
    span: Span;
});
export declare const $SetterProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, param: import("@swc/core").Pattern, body?: import("@swc/core").BlockStatement | undefined, span?: Span) => {
    type: "SetterProperty";
    param: import("@swc/core").Pattern;
    body: import("@swc/core").BlockStatement | undefined;
    key: import("@swc/core").PropertyName;
    span: Span;
});
export declare const $MethodProperty: import("@macro-plugin/core").MacroPlugin & ((key: import("@swc/core").PropertyName, params: import("@swc/core").Param[], body?: import("@swc/core").BlockStatement | undefined, async?: boolean, generator?: boolean, decorators?: import("@swc/core").Decorator[] | undefined, typeParameters?: import("@swc/core").TsTypeParameterDeclaration | undefined, returnType?: import("@swc/core").TsTypeAnnotation | undefined, span?: Span) => {
    type: "MethodProperty";
    key: import("@swc/core").PropertyName;
    span: Span;
    params: import("@swc/core").Param[];
    body: import("@swc/core").BlockStatement | undefined;
    async: boolean;
    generator: boolean;
    decorators: import("@swc/core").Decorator[] | undefined;
    typeParameters: import("@swc/core").TsTypeParameterDeclaration | undefined;
    returnType: import("@swc/core").TsTypeAnnotation | undefined;
});
export declare const $Computed: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "Computed";
    expression: Expression;
    span: Span;
});
export declare const $ComputedPropName: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "Computed";
    expression: Expression;
    span: Span;
});
export declare const $BlockStatement: import("@macro-plugin/core").MacroPlugin & ((stmts?: import("@swc/core").Statement[], span?: Span) => {
    type: "BlockStatement";
    stmts: import("@swc/core").Statement[];
    span: Span;
});
export declare const $ExpressionStatement: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "ExpressionStatement";
    expression: Expression;
    span: Span;
});
export declare const $EmptyStatement: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "EmptyStatement";
    span: Span;
});
export declare const $DebuggerStatement: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "DebuggerStatement";
    span: Span;
});
export declare const $WithStatement: import("@macro-plugin/core").MacroPlugin & ((object: Expression, body: import("@swc/core").Statement, span?: Span) => {
    type: "WithStatement";
    object: Expression;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $ReturnStatement: import("@macro-plugin/core").MacroPlugin & ((argument?: Expression | undefined, span?: Span) => {
    type: "ReturnStatement";
    argument: Expression | undefined;
    span: Span;
});
export declare const $LabeledStatement: import("@macro-plugin/core").MacroPlugin & ((label: Identifier, body: import("@swc/core").Statement, span?: Span) => {
    type: "LabeledStatement";
    label: Identifier;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $BreakStatement: import("@macro-plugin/core").MacroPlugin & ((label?: Identifier | undefined, span?: Span) => {
    type: "BreakStatement";
    label: Identifier | undefined;
    span: Span;
});
export declare const $ContinueStatement: import("@macro-plugin/core").MacroPlugin & ((label?: Identifier | undefined, span?: Span) => {
    type: "ContinueStatement";
    label: Identifier | undefined;
    span: Span;
});
export declare const $IfStatement: import("@macro-plugin/core").MacroPlugin & ((test: Expression, consequent: import("@swc/core").Statement, alternate?: import("@swc/core").Statement | undefined, span?: Span) => {
    type: "IfStatement";
    test: Expression;
    consequent: import("@swc/core").Statement;
    alternate: import("@swc/core").Statement | undefined;
    span: Span;
});
export declare const $SwitchStatement: import("@macro-plugin/core").MacroPlugin & ((discriminant: Expression, cases?: import("@swc/core").SwitchCase[], span?: Span) => {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: import("@swc/core").SwitchCase[];
    span: Span;
});
export declare const $ThrowStatement: import("@macro-plugin/core").MacroPlugin & ((argument: Expression, span?: Span) => {
    type: "ThrowStatement";
    argument: Expression;
    span: Span;
});
export declare const $TryStatement: import("@macro-plugin/core").MacroPlugin & ((block: import("@swc/core").BlockStatement, handler?: import("@swc/core").CatchClause | undefined, finalizer?: import("@swc/core").BlockStatement | undefined, span?: Span) => {
    type: "TryStatement";
    block: import("@swc/core").BlockStatement;
    handler: import("@swc/core").CatchClause | undefined;
    finalizer: import("@swc/core").BlockStatement | undefined;
    span: Span;
});
export declare const $WhileStatement: import("@macro-plugin/core").MacroPlugin & ((test: Expression, body: import("@swc/core").Statement, span?: Span) => {
    type: "WhileStatement";
    test: Expression;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $DoWhileStatement: import("@macro-plugin/core").MacroPlugin & ((test: Expression, body: import("@swc/core").Statement, span?: Span) => {
    type: "DoWhileStatement";
    test: Expression;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $ForStatement: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").Statement, init?: Expression | import("@swc/core").VariableDeclaration | undefined, test?: Expression | undefined, update?: Expression | undefined, span?: Span) => {
    type: "ForStatement";
    init: Expression | import("@swc/core").VariableDeclaration | undefined;
    test: Expression | undefined;
    update: Expression | undefined;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $ForInStatement: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern, right: Expression, body: import("@swc/core").Statement, span?: Span) => {
    type: "ForInStatement";
    left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern;
    right: Expression;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $ForOfStatement: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern, right: Expression, body: import("@swc/core").Statement, _await?: Span, span?: Span) => {
    type: "ForOfStatement";
    await: Span;
    left: import("@swc/core").VariableDeclaration | import("@swc/core").Pattern;
    right: Expression;
    body: import("@swc/core").Statement;
    span: Span;
});
export declare const $SwitchCase: import("@macro-plugin/core").MacroPlugin & ((test?: Expression | undefined, consequent?: import("@swc/core").Statement[], span?: Span) => {
    type: "SwitchCase";
    test: Expression | undefined;
    consequent: import("@swc/core").Statement[];
    span: Span;
});
export declare const $CatchClause: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").BlockStatement, param?: import("@swc/core").Pattern | undefined, span?: Span) => {
    type: "CatchClause";
    param: import("@swc/core").Pattern | undefined;
    body: import("@swc/core").BlockStatement;
    span: Span;
});
export declare const $TsTypeAnnotation: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsTypeAnnotation";
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsTypeParameterDeclaration: import("@macro-plugin/core").MacroPlugin & ((parameters?: import("@swc/core").TsTypeParameter[], span?: Span) => {
    type: "TsTypeParameterDeclaration";
    parameters: import("@swc/core").TsTypeParameter[];
    span: Span;
});
export declare const $TsTypeParameter: import("@macro-plugin/core").MacroPlugin & ((name: Identifier, _in: boolean, _out: boolean, constraint?: import("@swc/core").TsType | undefined, _default?: import("@swc/core").TsType | undefined, span?: Span) => {
    type: "TsTypeParameter";
    name: Identifier;
    in: boolean;
    out: boolean;
    constraint: import("@swc/core").TsType | undefined;
    default: import("@swc/core").TsType | undefined;
    span: Span;
});
export declare const $TsTypeParameterInstantiation: import("@macro-plugin/core").MacroPlugin & ((params?: import("@swc/core").TsType[], span?: Span) => {
    type: "TsTypeParameterInstantiation";
    params: import("@swc/core").TsType[];
    span: Span;
});
export declare const $TsParameterProperty: import("@macro-plugin/core").MacroPlugin & ((param: import("@swc/core").TsParameterPropertyParameter, accessibility?: import("@swc/core").Accessibility | undefined, decorators?: import("@swc/core").Decorator[] | undefined, override?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsParameterProperty";
    decorators: import("@swc/core").Decorator[] | undefined;
    accessibility: import("@swc/core").Accessibility | undefined;
    override: boolean;
    readonly: boolean;
    param: import("@swc/core").TsParameterPropertyParameter;
    span: Span;
});
export declare const $TsQualifiedName: import("@macro-plugin/core").MacroPlugin & ((left: import("@swc/core").TsEntityName, right: Identifier) => {
    type: "TsQualifiedName";
    left: import("@swc/core").TsEntityName;
    right: Identifier;
});
export declare const $TsCallSignatureDeclaration: import("@macro-plugin/core").MacroPlugin & ((params?: import("@swc/core").TsFnParameter[], typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, span?: Span) => {
    type: "TsCallSignatureDeclaration";
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: Span;
});
export declare const $TsConstructSignatureDeclaration: import("@macro-plugin/core").MacroPlugin & ((params?: import("@swc/core").TsFnParameter[], typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, span?: Span) => {
    type: "TsConstructSignatureDeclaration";
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: Span;
});
export declare const $TsPropertySignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, params: import("@swc/core").TsFnParameter[], init?: Expression | undefined, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsPropertySignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    init: Expression | undefined;
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: Span;
});
export declare const $TsGetterSignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsGetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: Span;
});
export declare const $TsSetterSignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, param: import("@swc/core").TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsSetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    param: import("@swc/core").TsFnParameter;
    span: Span;
});
export declare const $TsMethodSignature: import("@macro-plugin/core").MacroPlugin & ((key: Expression, params: import("@swc/core").TsFnParameter[], typeAnn?: import("@swc/core").TsTypeAnnotation | undefined, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsMethodSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    params: import("@swc/core").TsFnParameter[];
    typeAnn: import("@swc/core").TsTypeAnnotation | undefined;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    span: Span;
});
export declare const $TsIndexSignature: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").TsFnParameter[], typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, readonly?: boolean, isStatic?: boolean, span?: Span) => {
    type: "TsIndexSignature";
    params: import("@swc/core").TsFnParameter[];
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    readonly: boolean;
    static: boolean;
    span: Span;
});
export declare const $TsKeywordType: import("@macro-plugin/core").MacroPlugin & ((kind: import("@swc/core").TsKeywordTypeKind, span?: Span) => {
    type: "TsKeywordType";
    kind: import("@swc/core").TsKeywordTypeKind;
    span: Span;
});
export declare const $TsThisType: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "TsThisType";
    span: Span;
});
export declare const $TsFunctionType: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").TsFnParameter[], typeAnnotation: import("@swc/core").TsTypeAnnotation, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, span?: Span) => {
    type: "TsFunctionType";
    params: import("@swc/core").TsFnParameter[];
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation;
    span: Span;
});
export declare const $TsConstructorType: import("@macro-plugin/core").MacroPlugin & ((params: import("@swc/core").TsFnParameter[], typeAnnotation: import("@swc/core").TsTypeAnnotation, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, isAbstract?: boolean, span?: Span) => {
    type: "TsConstructorType";
    params: import("@swc/core").TsFnParameter[];
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    typeAnnotation: import("@swc/core").TsTypeAnnotation;
    isAbstract: boolean;
    span: Span;
});
export declare const $TsTypeReference: import("@macro-plugin/core").MacroPlugin & ((typeName: import("@swc/core").TsEntityName, typeParams?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "TsTypeReference";
    typeName: import("@swc/core").TsEntityName;
    typeParams: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $TsTypePredicate: import("@macro-plugin/core").MacroPlugin & ((paramName: import("@swc/core").TsThisTypeOrIdent, typeAnnotation?: import("@swc/core").TsTypeAnnotation | undefined, asserts?: boolean, span?: Span) => {
    type: "TsTypePredicate";
    asserts: boolean;
    paramName: import("@swc/core").TsThisTypeOrIdent;
    typeAnnotation: import("@swc/core").TsTypeAnnotation | undefined;
    span: Span;
});
export declare const $TsImportType: import("@macro-plugin/core").MacroPlugin & ((argument: StringLiteral, qualifier?: import("@swc/core").TsEntityName | undefined, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "TsImportType";
    argument: StringLiteral;
    qualifier: import("@swc/core").TsEntityName | undefined;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $TsTypeQuery: import("@macro-plugin/core").MacroPlugin & ((exprName: import("@swc/core").TsTypeQueryExpr, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "TsTypeQuery";
    exprName: import("@swc/core").TsTypeQueryExpr;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $TsTypeLiteral: import("@macro-plugin/core").MacroPlugin & ((members?: import("@swc/core").TsTypeElement[], span?: Span) => {
    type: "TsTypeLiteral";
    members: import("@swc/core").TsTypeElement[];
    span: Span;
});
export declare const $TsArrayType: import("@macro-plugin/core").MacroPlugin & ((elemType: import("@swc/core").TsType, span?: Span) => {
    type: "TsArrayType";
    elemType: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsTupleType: import("@macro-plugin/core").MacroPlugin & ((elemTypes?: import("@swc/core").TsTupleElement[], span?: Span) => {
    type: "TsTupleType";
    elemTypes: import("@swc/core").TsTupleElement[];
    span: Span;
});
export declare const $TsTupleElement: import("@macro-plugin/core").MacroPlugin & ((ty: import("@swc/core").TsType, label?: import("@swc/core").Pattern | undefined, span?: Span) => {
    type: "TsTupleElement";
    label: import("@swc/core").Pattern | undefined;
    ty: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsOptionalType: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsOptionalType";
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsRestType: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsRestType";
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsUnionType: import("@macro-plugin/core").MacroPlugin & ((types?: import("@swc/core").TsType[], span?: Span) => {
    type: "TsUnionType";
    types: import("@swc/core").TsType[];
    span: Span;
});
export declare const $TsIntersectionType: import("@macro-plugin/core").MacroPlugin & ((types?: import("@swc/core").TsType[], span?: Span) => {
    type: "TsIntersectionType";
    types: import("@swc/core").TsType[];
    span: Span;
});
export declare const $TsConditionalType: import("@macro-plugin/core").MacroPlugin & ((checkType: import("@swc/core").TsType, extendsType: import("@swc/core").TsType, trueType: import("@swc/core").TsType, falseType: import("@swc/core").TsType, span?: Span) => {
    type: "TsConditionalType";
    checkType: import("@swc/core").TsType;
    extendsType: import("@swc/core").TsType;
    trueType: import("@swc/core").TsType;
    falseType: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsInferType: import("@macro-plugin/core").MacroPlugin & ((typeParam: import("@swc/core").TsTypeParameter, span?: Span) => {
    type: "TsInferType";
    typeParam: import("@swc/core").TsTypeParameter;
    span: Span;
});
export declare const $TsParenthesizedType: import("@macro-plugin/core").MacroPlugin & ((typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsParenthesizedType";
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsTypeOperator: import("@macro-plugin/core").MacroPlugin & ((op: import("@swc/core").TsTypeOperatorOp, typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsTypeOperator";
    op: import("@swc/core").TsTypeOperatorOp;
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsIndexedAccessType: import("@macro-plugin/core").MacroPlugin & ((objectType: import("@swc/core").TsType, indexType: import("@swc/core").TsType, readonly?: boolean, span?: Span) => {
    type: "TsIndexedAccessType";
    readonly: boolean;
    objectType: import("@swc/core").TsType;
    indexType: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsMappedType: import("@macro-plugin/core").MacroPlugin & ((typeParam: import("@swc/core").TsTypeParameter, typeAnnotation?: import("@swc/core").TsType | undefined, nameType?: import("@swc/core").TsType | undefined, optional?: import("@swc/core").TruePlusMinus | undefined, readonly?: import("@swc/core").TruePlusMinus | undefined, span?: Span) => {
    type: "TsMappedType";
    readonly: import("@swc/core").TruePlusMinus | undefined;
    typeParam: import("@swc/core").TsTypeParameter;
    nameType: import("@swc/core").TsType | undefined;
    optional: import("@swc/core").TruePlusMinus | undefined;
    typeAnnotation: import("@swc/core").TsType | undefined;
    span: Span;
});
export declare const $TsLiteralType: import("@macro-plugin/core").MacroPlugin & ((literal: import("@swc/core").TsLiteral, span?: Span) => {
    type: "TsLiteralType";
    literal: import("@swc/core").TsLiteral;
    span: Span;
});
export declare const $TsTemplateLiteralType: import("@macro-plugin/core").MacroPlugin & ((types?: import("@swc/core").TsType[], quasis?: import("@swc/core").TemplateElement[], span?: Span) => {
    type: "TemplateLiteral";
    types: import("@swc/core").TsType[];
    quasis: import("@swc/core").TemplateElement[];
    span: Span;
});
export declare const $TsInterfaceDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, body: import("@swc/core").TsInterfaceBody, _extends?: import("@swc/core").TsExpressionWithTypeArguments[], typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, declare?: boolean, span?: Span) => {
    type: "TsInterfaceDeclaration";
    id: Identifier;
    declare: boolean;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    extends: import("@swc/core").TsExpressionWithTypeArguments[];
    body: import("@swc/core").TsInterfaceBody;
    span: Span;
});
export declare const $TsInterfaceBody: import("@macro-plugin/core").MacroPlugin & ((body?: import("@swc/core").TsTypeElement[], span?: Span) => {
    type: "TsInterfaceBody";
    body: import("@swc/core").TsTypeElement[];
    span: Span;
});
export declare const $TsExpressionWithTypeArguments: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeArguments?: import("@swc/core").TsTypeParameterInstantiation | undefined, span?: Span) => {
    type: "TsExpressionWithTypeArguments";
    expression: Expression;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation | undefined;
    span: Span;
});
export declare const $TsTypeAliasDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, typeAnnotation: import("@swc/core").TsType, typeParams?: import("@swc/core").TsTypeParameterDeclaration | undefined, declare?: boolean, span?: Span) => {
    type: "TsTypeAliasDeclaration";
    declare: boolean;
    id: Identifier;
    typeParams: import("@swc/core").TsTypeParameterDeclaration | undefined;
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsEnumDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, members?: import("@swc/core").TsEnumMember[], declare?: boolean, isConst?: boolean, span?: Span) => {
    type: "TsEnumDeclaration";
    declare: boolean;
    isConst: boolean;
    id: Identifier;
    members: import("@swc/core").TsEnumMember[];
    span: Span;
});
export declare const $TsEnumMember: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").TsEnumMemberId, init?: Expression | undefined, span?: Span) => {
    type: "TsEnumMember";
    id: import("@swc/core").TsEnumMemberId;
    init: Expression | undefined;
    span: Span;
});
export declare const $TsModuleDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: import("@swc/core").TsModuleName, body?: import("@swc/core").TsNamespaceBody | undefined, declare?: boolean, global?: boolean, span?: Span) => {
    type: "TsModuleDeclaration";
    declare: boolean;
    global: boolean;
    id: import("@swc/core").TsModuleName;
    body: import("@swc/core").TsNamespaceBody | undefined;
    span: Span;
});
export declare const $TsModuleBlock: import("@macro-plugin/core").MacroPlugin & ((body: import("@swc/core").ModuleItem[], span?: Span) => {
    type: "TsModuleBlock";
    body: import("@swc/core").ModuleItem[];
    span: Span;
});
export declare const $TsNamespaceDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, body: import("@swc/core").TsNamespaceBody, declare?: boolean, global?: boolean, span?: Span) => {
    type: "TsNamespaceDeclaration";
    declare: boolean;
    global: boolean;
    id: Identifier;
    body: import("@swc/core").TsNamespaceBody;
    span: Span;
});
export declare const $TsImportEqualsDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, moduleRef: import("@swc/core").TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean, span?: Span) => {
    type: "TsImportEqualsDeclaration";
    declare: boolean;
    isExport: boolean;
    isTypeOnly: boolean;
    id: Identifier;
    moduleRef: import("@swc/core").TsModuleReference;
    span: Span;
});
export declare const $TsExternalModuleReference: import("@macro-plugin/core").MacroPlugin & ((expression: StringLiteral, span?: Span) => {
    type: "TsExternalModuleReference";
    expression: StringLiteral;
    span: Span;
});
export declare const $TsExportAssignment: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "TsExportAssignment";
    expression: Expression;
    span: Span;
});
export declare const $TsNamespaceExportDeclaration: import("@macro-plugin/core").MacroPlugin & ((id: Identifier, span?: Span) => {
    type: "TsNamespaceExportDeclaration";
    id: Identifier;
    span: Span;
});
export declare const $TsAsExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsAsExpression";
    expression: Expression;
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsSatisfiesExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsSatisfiesExpression";
    expression: Expression;
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsInstantiation: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeArguments: import("@swc/core").TsTypeParameterInstantiation, span?: Span) => {
    type: "TsInstantiation";
    expression: Expression;
    typeArguments: import("@swc/core").TsTypeParameterInstantiation;
    span: Span;
});
export declare const $TsTypeAssertion: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, typeAnnotation: import("@swc/core").TsType, span?: Span) => {
    type: "TsTypeAssertion";
    expression: Expression;
    typeAnnotation: import("@swc/core").TsType;
    span: Span;
});
export declare const $TsConstAssertion: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "TsConstAssertion";
    expression: Expression;
    span: Span;
});
export declare const $TsNonNullExpression: import("@macro-plugin/core").MacroPlugin & ((expression: Expression, span?: Span) => {
    type: "TsNonNullExpression";
    expression: Expression;
    span: Span;
});
export declare const $Invalid: import("@macro-plugin/core").MacroPlugin & ((span?: Span) => {
    type: "Invalid";
    span: Span;
});
