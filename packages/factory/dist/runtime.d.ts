import type { Accessibility, Argument, ArrayExpression, ArrayPattern, ArrowFunctionExpression, AssignmentExpression, AssignmentOperator, AssignmentPattern, AwaitExpression, BigIntLiteral, BinaryExpression, BinaryOperator, BlockStatement, BooleanLiteral, CallExpression, CatchClause, ClassExpression, ClassMember, ComputedPropName, ConditionalExpression, Declaration, Decorator, DefaultDecl, ExportSpecifier, ExprOrSpread, Expression, Fn, FunctionExpression, Identifier, Import, ImportSpecifier, Invalid, JSXAttrValue, JSXAttributeName, JSXAttributeOrSpread, JSXClosingElement, JSXClosingFragment, JSXElement, JSXElementChild, JSXElementName, JSXEmptyExpression, JSXExpression, JSXFragment, JSXMemberExpression, JSXNamespacedName, JSXObject, JSXOpeningElement, JSXOpeningFragment, JSXText, MemberExpression, MetaProperty, MethodKind, Module, ModuleExportName, ModuleItem, NewExpression, NullLiteral, NumericLiteral, ObjectExpression, ObjectPattern, ObjectPatternProperty, OptionalChainingCall, OptionalChainingExpression, Param, ParenthesisExpression, Pattern, PrivateName, Property, PropertyName, RegExpLiteral, RestElement, Script, SequenceExpression, Span, SpreadElement, Statement, StringLiteral, Super, SuperPropExpression, SwitchCase, TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, TruePlusMinus, TsAsExpression, TsConstAssertion, TsEntityName, TsEnumMember, TsEnumMemberId, TsExpressionWithTypeArguments, TsFnParameter, TsInstantiation, TsInterfaceBody, TsKeywordTypeKind, TsLiteral, TsModuleName, TsModuleReference, TsNamespaceBody, TsNonNullExpression, TsParameterProperty, TsParameterPropertyParameter, TsSatisfiesExpression, TsThisTypeOrIdent, TsTupleElement, TsType, TsTypeAnnotation, TsTypeAssertion, TsTypeElement, TsTypeOperatorOp, TsTypeParameter, TsTypeParameterDeclaration, TsTypeParameterInstantiation, TsTypeQueryExpr, UnaryExpression, UnaryOperator, UpdateExpression, UpdateOperator, VariableDeclaration, VariableDeclarationKind, VariableDeclarator, YieldExpression } from "@swc/core";
export declare const createSpan: (start?: number, end?: number, ctxt?: number) => {
    start: number;
    end: number;
    ctxt: number;
};
export declare const createIdentifier: (value: string, optional?: boolean, span?: Span) => {
    type: "Identifier";
    value: string;
    optional: boolean;
    span: Span;
};
export declare const createStringLiteral: (value: string, raw?: string, span?: Span) => {
    type: "StringLiteral";
    value: string;
    raw: string | undefined;
    span: Span;
};
export declare const createNumericLiteral: (value: number, raw?: string, span?: Span) => {
    type: "NumericLiteral";
    value: number;
    raw: string | undefined;
    span: Span;
};
export declare const createBigIntLiteral: (value: bigint, raw?: string, span?: Span) => {
    type: "BigIntLiteral";
    value: bigint;
    raw: string | undefined;
    span: Span;
};
export declare const createBooleanLiteral: (value: boolean, span?: Span) => {
    type: "BooleanLiteral";
    value: boolean;
    span: Span;
};
export declare const createNullLiteral: (span?: Span) => {
    type: "NullLiteral";
    span: Span;
};
export declare const createRegExpLiteral: (pattern: string, flags: string, span?: Span) => {
    type: "RegExpLiteral";
    pattern: string;
    flags: string;
    span: Span;
};
export declare const createArgument: (expression: Expression, spread?: Span) => {
    spread: Span | undefined;
    expression: Expression;
};
export declare const createCallExpression: (callee: Expression | Super | Import, args?: Argument[], typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "CallExpression";
    span: Span;
    callee: Expression | Super | Import;
    arguments: Argument[];
    typeArguments: TsTypeParameterInstantiation | undefined;
};
export declare const createClassProperty: (key: PropertyName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: Span) => {
    type: "ClassProperty";
    span: Span;
    decorators: Decorator[] | undefined;
    key: PropertyName;
    isAbstract: boolean;
    declare: boolean;
    value: Expression | undefined;
    typeAnnotation: TsTypeAnnotation | undefined;
    isStatic: boolean;
    accessibility: Accessibility | undefined;
    isOptional: boolean;
    isOverride: boolean;
    readonly: boolean;
    definite: boolean;
};
export declare const createPrivateProperty: (key: PrivateName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: Span) => {
    type: "PrivateProperty";
    key: PrivateName;
    value: Expression | undefined;
    span: Span;
    decorators: Decorator[] | undefined;
    typeAnnotation: TsTypeAnnotation | undefined;
    accessibility: Accessibility | undefined;
    definite: boolean;
    isOptional: boolean;
    isOverride: boolean;
    isStatic: boolean;
    readonly: boolean;
};
export declare const createParam: (pat: Pattern, decorators?: Decorator[], span?: Span) => {
    type: "Parameter";
    pat: Pattern;
    decorators: Decorator[] | undefined;
    span: Span;
};
export declare const createConstructor: (key: PropertyName, params: (TsParameterProperty | Param)[], body?: BlockStatement, accessibility?: Accessibility, isOptional?: boolean, span?: Span) => {
    type: "Constructor";
    key: PropertyName;
    params: (TsParameterProperty | Param)[];
    body: BlockStatement | undefined;
    span: Span;
    accessibility: Accessibility | undefined;
    isOptional: boolean;
};
export declare const createClassMethod: (kind: MethodKind, key: PropertyName, fn: Fn, accessibility?: Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: Span) => {
    type: "ClassMethod";
    key: PropertyName;
    function: Fn;
    kind: MethodKind;
    isStatic: boolean;
    accessibility: Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: Span;
};
export declare const createPrivateMethod: (kind: MethodKind, key: PrivateName, fn: Fn, accessibility?: Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: Span) => {
    type: "PrivateMethod";
    key: PrivateName;
    function: Fn;
    kind: MethodKind;
    isStatic: boolean;
    accessibility: Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: Span;
};
export declare const createStaticBlock: (body: BlockStatement, span?: Span) => {
    type: "StaticBlock";
    body: BlockStatement;
    span: Span;
};
export declare const createDecorator: (expression: Expression, span?: Span) => {
    type: "Decorator";
    expression: Expression;
    span: Span;
};
export declare const createFunctionDeclaration: (identifier: Identifier, params: Param[], body?: BlockStatement, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], declare?: boolean, async?: boolean, generator?: boolean, span?: Span) => {
    type: "FunctionDeclaration";
    span: Span;
    params: Param[];
    body: BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    decorators: Decorator[] | undefined;
    typeParameters: TsTypeParameterDeclaration | undefined;
    returnType: TsTypeAnnotation | undefined;
    identifier: Identifier;
    declare: boolean;
};
export declare const createClassDeclaration: (identifier: Identifier, body: ClassMember[], impls: TsExpressionWithTypeArguments[], superClass?: Expression, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], declare?: boolean, isAbstract?: boolean, span?: Span) => {
    type: "ClassDeclaration";
    identifier: Identifier;
    declare: boolean;
    body: ClassMember[];
    span: Span;
    superClass: Expression | undefined;
    isAbstract: boolean;
    decorators: Decorator[] | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    superTypeParams: TsTypeParameterInstantiation | undefined;
    implements: TsExpressionWithTypeArguments[];
};
export declare const createVariableDeclaration: (kind: VariableDeclarationKind, declarations?: VariableDeclarator[], declare?: boolean, span?: Span) => {
    type: "VariableDeclaration";
    kind: VariableDeclarationKind;
    declare: boolean;
    declarations: VariableDeclarator[];
    span: Span;
};
export declare const createVariableDeclarator: (id: Pattern, init?: Expression, definite?: boolean, span?: Span) => {
    type: "VariableDeclarator";
    id: Pattern;
    definite: boolean;
    init: Expression | undefined;
    span: Span;
};
export declare const createOptionalChainingExpression: (base: MemberExpression | OptionalChainingCall, questionDotToken?: Span, span?: Span) => {
    type: "OptionalChainingExpression";
    questionDotToken: Span;
    base: MemberExpression | OptionalChainingCall;
    span: Span;
};
export declare const createOptionalChainingCall: (callee: Expression, args?: ExprOrSpread[], typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "CallExpression";
    callee: Expression;
    arguments: ExprOrSpread[];
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createThisExpression: (span?: Span) => {
    type: "ThisExpression";
    span: Span;
};
export declare const createArrayExpression: (elements?: (ExprOrSpread | undefined)[], span?: Span) => {
    type: "ArrayExpression";
    elements: (ExprOrSpread | undefined)[];
    span: Span;
};
export declare const createExprOrSpread: (expression: Expression, spread?: Span) => {
    spread: Span | undefined;
    expression: Expression;
};
export declare const createObjectExpression: (properties?: (SpreadElement | Property)[], span?: Span) => {
    type: "ObjectExpression";
    properties: (SpreadElement | Property)[];
    span: Span;
};
export declare const createSpreadElement: (args: Expression, spread?: Span) => {
    type: "SpreadElement";
    spread: Span;
    arguments: Expression;
};
export declare const createUnaryExpression: (operator: UnaryOperator, argument: Expression, span?: Span) => {
    type: "UnaryExpression";
    span: Span;
    operator: UnaryOperator;
    argument: Expression;
};
export declare const createUpdateExpression: (operator: UpdateOperator, argument: Expression, prefix?: boolean, span?: Span) => {
    type: "UpdateExpression";
    operator: UpdateOperator;
    prefix: boolean;
    argument: Expression;
    span: Span;
};
export declare const createBinaryExpression: (left: Expression, operator: BinaryOperator, right: Expression, span?: Span) => {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
    span: Span;
};
export declare const createFunctionExpression: (params: Param[], body?: BlockStatement, identifier?: Identifier, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], async?: boolean, generator?: boolean, span?: Span) => {
    type: "FunctionExpression";
    params: Param[];
    decorators: Decorator[] | undefined;
    body: BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    typeParameters: TsTypeParameterDeclaration | undefined;
    returnType: TsTypeAnnotation | undefined;
    identifier: Identifier | undefined;
    span: Span;
};
export declare const createClassExpression: (body: ClassMember[], impls?: TsExpressionWithTypeArguments[], superClass?: Expression, identifier?: Identifier, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], isAbstract?: boolean, span?: Span) => {
    type: "ClassExpression";
    identifier: Identifier | undefined;
    body: ClassMember[];
    superClass: Expression | undefined;
    isAbstract: boolean;
    typeParams: TsTypeParameterDeclaration | undefined;
    superTypeParams: TsTypeParameterInstantiation | undefined;
    implements: TsExpressionWithTypeArguments[];
    decorators: Decorator[] | undefined;
    span: Span;
};
export declare const createAssignmentExpression: (left: Expression | Pattern, operator: AssignmentOperator, right: Expression, span?: Span) => {
    type: "AssignmentExpression";
    operator: AssignmentOperator;
    left: ThisExpression | ArrayExpression | ObjectExpression | FunctionExpression | UnaryExpression | UpdateExpression | BinaryExpression | AssignmentExpression | MemberExpression | SuperPropExpression | ConditionalExpression | CallExpression | NewExpression | SequenceExpression | Identifier | StringLiteral | BooleanLiteral | NullLiteral | NumericLiteral | BigIntLiteral | RegExpLiteral | JSXText | TemplateLiteral | TaggedTemplateExpression | ArrowFunctionExpression | ClassExpression | YieldExpression | MetaProperty | AwaitExpression | ParenthesisExpression | JSXMemberExpression | JSXNamespacedName | JSXEmptyExpression | JSXElement | JSXFragment | TsTypeAssertion | TsConstAssertion | TsNonNullExpression | TsAsExpression | TsSatisfiesExpression | TsInstantiation | PrivateName | OptionalChainingExpression | Invalid | import("@swc/core").BindingIdentifier | ArrayPattern | RestElement | ObjectPattern | AssignmentPattern;
    right: Expression;
    span: Span;
};
export declare const createMemberExpression: (object: Expression, property: Identifier | PrivateName | ComputedPropName, span?: Span) => {
    type: "MemberExpression";
    object: Expression;
    property: Identifier | PrivateName | ComputedPropName;
    span: Span;
};
export declare const createSuperPropExpression: (obj: Super, property: Identifier | ComputedPropName, span?: Span) => {
    type: "SuperPropExpression";
    obj: Super;
    property: Identifier | ComputedPropName;
    span: Span;
};
export declare const createConditionalExpression: (test: Expression, consequent: Expression, alternate: Expression, span?: Span) => {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    span: Span;
};
export declare const createSuper: (span?: Span) => {
    type: "Super";
    span: Span;
};
export declare const createImport: (span?: Span) => {
    type: "Import";
    span: Span;
};
export declare const createNewExpression: (callee: Expression, args?: Argument[], typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "NewExpression";
    callee: Expression;
    arguments: Argument[] | undefined;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createSequenceExpression: (expressions: Expression[], span?: Span) => {
    type: "SequenceExpression";
    expressions: Expression[];
    span: Span;
};
export declare const createArrowFunctionExpression: (params: Pattern[], body: BlockStatement | Expression, async?: boolean, generator?: boolean, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, span?: Span) => {
    type: "ArrowFunctionExpression";
    params: Pattern[];
    body: Expression | BlockStatement;
    async: boolean;
    generator: boolean;
    typeParameters: TsTypeParameterDeclaration | undefined;
    span: Span;
    returnType: TsTypeAnnotation | undefined;
};
export declare const createYieldExpression: (argument?: Expression, delegate?: boolean, span?: Span) => {
    type: "YieldExpression";
    argument: Expression | undefined;
    delegate: boolean;
    span: Span;
};
export declare const createMetaProperty: (kind: "new.target" | "import.meta", span?: Span) => {
    type: "MetaProperty";
    kind: "new.target" | "import.meta";
    span: Span;
};
export declare const createAwaitExpression: (argument: Expression, span?: Span) => {
    type: "AwaitExpression";
    argument: Expression;
    span: Span;
};
export declare const createTemplateLiteral: (expressions?: Expression[], quasis?: TemplateElement[], span?: Span) => {
    type: "TemplateLiteral";
    expressions: Expression[];
    quasis: TemplateElement[];
    span: Span;
};
export declare const createTaggedTemplateExpression: (tag: Expression, template: TemplateLiteral, typeParameters?: TsTypeParameterInstantiation, span?: Span) => {
    type: "TaggedTemplateExpression";
    tag: Expression;
    typeParameters: TsTypeParameterInstantiation | undefined;
    span: Span;
    template: TemplateLiteral;
};
export declare const createTemplateElement: (raw: string, cooked?: string, tail?: boolean, span?: Span) => {
    type: "TemplateElement";
    tail: boolean;
    cooked: string | undefined;
    raw: string;
    span: Span;
};
export declare const createParenthesisExpression: (expression: Expression, span?: Span) => {
    type: "ParenthesisExpression";
    expression: Expression;
    span: Span;
};
export declare const createPrivateName: (id: Identifier, span?: Span) => {
    type: "PrivateName";
    id: Identifier;
    span: Span;
};
export declare const createJSXMemberExpression: (object: JSXObject, property: Identifier) => {
    type: "JSXMemberExpression";
    object: JSXObject;
    property: Identifier;
};
export declare const createJSXNamespacedName: (namespace: Identifier, name: Identifier) => {
    type: "JSXNamespacedName";
    namespace: Identifier;
    name: Identifier;
};
export declare const createJSXEmptyExpression: (span?: Span) => {
    type: "JSXEmptyExpression";
    span: Span;
};
export declare const createJSXExpressionContainer: (expression: JSXExpression, span?: Span) => {
    type: "JSXExpressionContainer";
    expression: JSXExpression;
    span: Span;
};
export declare const createJSXSpreadChild: (expression: Expression, span?: Span) => {
    type: "JSXSpreadChild";
    expression: Expression;
    span: Span;
};
export declare const createJSXOpeningElement: (name: JSXElementName, attributes?: JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "JSXOpeningElement";
    name: JSXElementName;
    attributes: JSXAttributeOrSpread[];
    selfClosing: boolean;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createJSXClosingElement: (name: JSXElementName, span?: Span) => {
    type: "JSXClosingElement";
    name: JSXElementName;
    span: Span;
};
export declare const createJSXAttribute: (name: JSXAttributeName, value?: JSXAttrValue, span?: Span) => {
    type: "JSXAttribute";
    name: JSXAttributeName;
    value: JSXAttrValue | undefined;
    span: Span;
};
export declare const createJSXText: (value: string, raw?: string, span?: Span) => {
    type: "JSXText";
    value: string;
    raw: string;
    span: Span;
};
export declare const createJSXElement: (opening: JSXOpeningElement, children?: JSXElementChild[], closing?: JSXClosingElement, span?: Span) => {
    type: "JSXElement";
    opening: JSXOpeningElement;
    children: JSXElementChild[];
    closing: JSXClosingElement | undefined;
    span: Span;
};
export declare const createJSXFragment: (opening: JSXOpeningFragment, children: JSXElementChild[] | undefined, closing: JSXClosingFragment, span?: Span) => {
    type: "JSXFragment";
    opening: JSXOpeningFragment;
    children: JSXElementChild[];
    closing: JSXClosingFragment;
    span: Span;
};
export declare const createJSXOpeningFragment: (span?: Span) => {
    type: "JSXOpeningFragment";
    span: Span;
};
export declare const createJSXClosingFragment: (span?: Span) => {
    type: "JSXClosingFragment";
    span: Span;
};
export declare const createExportDefaultExpression: (expression: Expression, span?: Span) => {
    type: "ExportDefaultExpression";
    expression: Expression;
    span: Span;
};
export declare const createExportDeclaration: (declaration: Declaration, span?: Span) => {
    type: "ExportDeclaration";
    declaration: Declaration;
    span: Span;
};
export declare const createImportDeclaration: (specifiers: ImportSpecifier[], source: StringLiteral, asserts?: ObjectExpression, typeOnly?: boolean, span?: Span) => {
    type: "ImportDeclaration";
    specifiers: ImportSpecifier[];
    source: StringLiteral;
    typeOnly: boolean;
    asserts: ObjectExpression | undefined;
    span: Span;
};
export declare const createExportAllDeclaration: (source: StringLiteral, asserts?: ObjectExpression, span?: Span) => {
    type: "ExportAllDeclaration";
    source: StringLiteral;
    asserts: ObjectExpression | undefined;
    span: Span;
};
export declare const createExportNamedDeclaration: (specifiers: ExportSpecifier[], source?: StringLiteral, asserts?: ObjectExpression, typeOnly?: boolean, span?: Span) => {
    type: "ExportNamedDeclaration";
    specifiers: ExportSpecifier[];
    source: StringLiteral | undefined;
    typeOnly: boolean;
    asserts: ObjectExpression | undefined;
    span: Span;
};
export declare const createExportDefaultDeclaration: (decl: DefaultDecl, span?: Span) => {
    type: "ExportDefaultDeclaration";
    decl: DefaultDecl;
    span: Span;
};
export declare const createImportDefaultSpecifier: (local: Identifier, span?: Span) => {
    type: "ImportDefaultSpecifier";
    local: Identifier;
    span: Span;
};
export declare const createImportNamespaceSpecifier: (local: Identifier, span?: Span) => {
    type: "ImportNamespaceSpecifier";
    local: Identifier;
    span: Span;
};
export declare const createImportSpecifier: (local: Identifier, imported?: ModuleExportName, isTypeOnly?: boolean, span?: Span) => {
    type: "ImportSpecifier";
    local: Identifier;
    imported: ModuleExportName | undefined;
    isTypeOnly: boolean;
    span: Span;
};
export declare const createNamedImportSpecifier: (local: Identifier, imported?: ModuleExportName, isTypeOnly?: boolean, span?: Span) => {
    type: "ImportSpecifier";
    local: Identifier;
    imported: ModuleExportName | undefined;
    isTypeOnly: boolean;
    span: Span;
};
export declare const createExportNamespaceSpecifier: (name: ModuleExportName, span?: Span) => {
    type: "ExportNamespaceSpecifier";
    name: ModuleExportName;
    span: Span;
};
export declare const createExportDefaultSpecifier: (exported: Identifier, span?: Span) => {
    type: "ExportDefaultSpecifier";
    exported: Identifier;
    span: Span;
};
export declare const createExportSpecifier: (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly?: boolean, span?: Span) => {
    type: "ExportSpecifier";
    orig: ModuleExportName;
    span: Span;
    exported: ModuleExportName | undefined;
    isTypeOnly: boolean;
};
export declare const createNamedExportSpecifier: (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly?: boolean, span?: Span) => {
    type: "ExportSpecifier";
    orig: ModuleExportName;
    span: Span;
    exported: ModuleExportName | undefined;
    isTypeOnly: boolean;
};
export declare const createModule: (body?: ModuleItem[], interpreter?: string, span?: Span) => Module;
export declare const createScript: (body?: Statement[], interpreter?: string, span?: Span) => Script;
export declare const createArrayPattern: (elements: (Pattern | undefined)[], optional?: boolean, typeAnnotation?: TsTypeAnnotation, span?: Span) => {
    type: "ArrayPattern";
    elements: (Pattern | undefined)[];
    optional: boolean;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: Span;
};
export declare const createObjectPattern: (properties: ObjectPatternProperty[], optional?: boolean, typeAnnotation?: TsTypeAnnotation, span?: Span) => {
    type: "ObjectPattern";
    properties: ObjectPatternProperty[];
    optional: boolean;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: Span;
};
export declare const createAssignmentPattern: (left: Pattern, right: Expression, typeAnnotation?: TsTypeAnnotation, span?: Span) => {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: Span;
};
export declare const createRestElement: (argument: Pattern, typeAnnotation?: TsTypeAnnotation, rest?: Span, span?: Span) => {
    type: "RestElement";
    rest: Span;
    argument: Pattern;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: Span;
};
export declare const createKeyValuePatternProperty: (key: PropertyName, value: Pattern) => {
    type: "KeyValuePatternProperty";
    key: PropertyName;
    value: Pattern;
};
export declare const createAssignmentPatternProperty: (key: Identifier, value?: Expression, span?: Span) => {
    type: "AssignmentPatternProperty";
    key: Identifier;
    value: Expression | undefined;
    span: Span;
};
export declare const createKeyValueProperty: (key: PropertyName, value: Expression) => {
    type: "KeyValueProperty";
    value: Expression;
    key: PropertyName;
};
export declare const createAssignmentProperty: (key: Identifier, value: Expression) => {
    type: "AssignmentProperty";
    key: Identifier;
    value: Expression;
};
export declare const createGetterProperty: (key: PropertyName, body?: BlockStatement, typeAnnotation?: TsTypeAnnotation, span?: Span) => {
    type: "GetterProperty";
    typeAnnotation: TsTypeAnnotation | undefined;
    body: BlockStatement | undefined;
    key: PropertyName;
    span: Span;
};
export declare const createSetterProperty: (key: PropertyName, param: Pattern, body?: BlockStatement, span?: Span) => {
    type: "SetterProperty";
    param: Pattern;
    body: BlockStatement | undefined;
    key: PropertyName;
    span: Span;
};
export declare const createMethodProperty: (key: PropertyName, params: Param[], body?: BlockStatement, async?: boolean, generator?: boolean, decorators?: Decorator[], typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, span?: Span) => {
    type: "MethodProperty";
    key: PropertyName;
    span: Span;
    params: Param[];
    body: BlockStatement | undefined;
    async: boolean;
    generator: boolean;
    decorators: Decorator[] | undefined;
    typeParameters: TsTypeParameterDeclaration | undefined;
    returnType: TsTypeAnnotation | undefined;
};
export declare const createComputedPropName: (expression: Expression, span?: Span) => {
    type: "Computed";
    expression: Expression;
    span: Span;
};
export declare const createComputed: (expression: Expression, span?: Span) => {
    type: "Computed";
    expression: Expression;
    span: Span;
};
export declare const createBlockStatement: (stmts?: Statement[], span?: Span) => {
    type: "BlockStatement";
    stmts: Statement[];
    span: Span;
};
export declare const createExpressionStatement: (expression: Expression, span?: Span) => {
    type: "ExpressionStatement";
    expression: Expression;
    span: Span;
};
export declare const createEmptyStatement: (span?: Span) => {
    type: "EmptyStatement";
    span: Span;
};
export declare const createDebuggerStatement: (span?: Span) => {
    type: "DebuggerStatement";
    span: Span;
};
export declare const createWithStatement: (object: Expression, body: Statement, span?: Span) => {
    type: "WithStatement";
    object: Expression;
    body: Statement;
    span: Span;
};
export declare const createReturnStatement: (argument?: Expression, span?: Span) => {
    type: "ReturnStatement";
    argument: Expression | undefined;
    span: Span;
};
export declare const createLabeledStatement: (label: Identifier, body: Statement, span?: Span) => {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
    span: Span;
};
export declare const createBreakStatement: (label?: Identifier, span?: Span) => {
    type: "BreakStatement";
    label: Identifier | undefined;
    span: Span;
};
export declare const createContinueStatement: (label?: Identifier, span?: Span) => {
    type: "ContinueStatement";
    label: Identifier | undefined;
    span: Span;
};
export declare const createIfStatement: (test: Expression, consequent: Statement, alternate?: Statement, span?: Span) => {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate: Statement | undefined;
    span: Span;
};
export declare const createSwitchStatement: (discriminant: Expression, cases?: SwitchCase[], span?: Span) => {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: SwitchCase[];
    span: Span;
};
export declare const createThrowStatement: (argument: Expression, span?: Span) => {
    type: "ThrowStatement";
    argument: Expression;
    span: Span;
};
export declare const createTryStatement: (block: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement, span?: Span) => {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | undefined;
    finalizer: BlockStatement | undefined;
    span: Span;
};
export declare const createWhileStatement: (test: Expression, body: Statement, span?: Span) => {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
    span: Span;
};
export declare const createDoWhileStatement: (test: Expression, body: Statement, span?: Span) => {
    type: "DoWhileStatement";
    test: Expression;
    body: Statement;
    span: Span;
};
export declare const createForStatement: (body: Statement, init?: VariableDeclaration | Expression, test?: Expression, update?: Expression, span?: Span) => {
    type: "ForStatement";
    init: Expression | VariableDeclaration | undefined;
    test: Expression | undefined;
    update: Expression | undefined;
    body: Statement;
    span: Span;
};
export declare const createForInStatement: (left: VariableDeclaration | Pattern, right: Expression, body: Statement, span?: Span) => {
    type: "ForInStatement";
    left: Pattern | VariableDeclaration;
    right: Expression;
    body: Statement;
    span: Span;
};
export declare const createForOfStatement: (left: VariableDeclaration | Pattern, right: Expression, body: Statement, _await?: Span, span?: Span) => {
    type: "ForOfStatement";
    await: Span;
    left: Pattern | VariableDeclaration;
    right: Expression;
    body: Statement;
    span: Span;
};
export declare const createSwitchCase: (test?: Expression, consequent?: Statement[], span?: Span) => {
    type: "SwitchCase";
    test: Expression | undefined;
    consequent: Statement[];
    span: Span;
};
export declare const createCatchClause: (body: BlockStatement, param?: Pattern, span?: Span) => {
    type: "CatchClause";
    param: Pattern | undefined;
    body: BlockStatement;
    span: Span;
};
export declare const createTsTypeAnnotation: (typeAnnotation: TsType, span?: Span) => {
    type: "TsTypeAnnotation";
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsTypeParameterDeclaration: (parameters?: TsTypeParameter[], span?: Span) => {
    type: "TsTypeParameterDeclaration";
    parameters: TsTypeParameter[];
    span: Span;
};
export declare const createTsTypeParameter: (name: Identifier, _in: boolean, _out: boolean, constraint?: TsType, _default?: TsType, span?: Span) => {
    type: "TsTypeParameter";
    name: Identifier;
    in: boolean;
    out: boolean;
    constraint: TsType | undefined;
    default: TsType | undefined;
    span: Span;
};
export declare const createTsTypeParameterInstantiation: (params?: TsType[], span?: Span) => {
    type: "TsTypeParameterInstantiation";
    params: TsType[];
    span: Span;
};
export declare const createTsParameterProperty: (param: TsParameterPropertyParameter, accessibility?: Accessibility, decorators?: Decorator[], override?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsParameterProperty";
    decorators: Decorator[] | undefined;
    accessibility: Accessibility | undefined;
    override: boolean;
    readonly: boolean;
    param: TsParameterPropertyParameter;
    span: Span;
};
export declare const createTsQualifiedName: (left: TsEntityName, right: Identifier) => {
    type: "TsQualifiedName";
    left: TsEntityName;
    right: Identifier;
};
export declare const createTsCallSignatureDeclaration: (params?: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, span?: Span) => {
    type: "TsCallSignatureDeclaration";
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: Span;
};
export declare const createTsConstructSignatureDeclaration: (params?: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, span?: Span) => {
    type: "TsConstructSignatureDeclaration";
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: Span;
};
export declare const createTsPropertySignature: (key: Expression, params: TsFnParameter[], init?: Expression, typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsPropertySignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    init: Expression | undefined;
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: Span;
};
export declare const createTsGetterSignature: (key: Expression, typeAnnotation?: TsTypeAnnotation, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsGetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: Span;
};
export declare const createTsSetterSignature: (key: Expression, param: TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsSetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    param: TsFnParameter;
    span: Span;
};
export declare const createTsMethodSignature: (key: Expression, params: TsFnParameter[], typeAnn?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean, span?: Span) => {
    type: "TsMethodSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    params: TsFnParameter[];
    typeAnn: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: Span;
};
export declare const createTsIndexSignature: (params: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, readonly?: boolean, isStatic?: boolean, span?: Span) => {
    type: "TsIndexSignature";
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    readonly: boolean;
    static: boolean;
    span: Span;
};
export declare const createTsKeywordType: (kind: TsKeywordTypeKind, span?: Span) => {
    type: "TsKeywordType";
    kind: TsKeywordTypeKind;
    span: Span;
};
export declare const createTsThisType: (span?: Span) => {
    type: "TsThisType";
    span: Span;
};
export declare const createTsFunctionType: (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, span?: Span) => {
    type: "TsFunctionType";
    params: TsFnParameter[];
    typeParams: TsTypeParameterDeclaration | undefined;
    typeAnnotation: TsTypeAnnotation;
    span: Span;
};
export declare const createTsConstructorType: (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, isAbstract?: boolean, span?: Span) => {
    type: "TsConstructorType";
    params: TsFnParameter[];
    typeParams: TsTypeParameterDeclaration | undefined;
    typeAnnotation: TsTypeAnnotation;
    isAbstract: boolean;
    span: Span;
};
export declare const createTsTypeReference: (typeName: TsEntityName, typeParams?: TsTypeParameterInstantiation, span?: Span) => {
    type: "TsTypeReference";
    typeName: TsEntityName;
    typeParams: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createTsTypePredicate: (paramName: TsThisTypeOrIdent, typeAnnotation?: TsTypeAnnotation, asserts?: boolean, span?: Span) => {
    type: "TsTypePredicate";
    asserts: boolean;
    paramName: TsThisTypeOrIdent;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: Span;
};
export declare const createTsImportType: (argument: StringLiteral, qualifier?: TsEntityName, typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "TsImportType";
    argument: StringLiteral;
    qualifier: TsEntityName | undefined;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createTsTypeQuery: (exprName: TsTypeQueryExpr, typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "TsTypeQuery";
    exprName: TsTypeQueryExpr;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createTsTypeLiteral: (members?: TsTypeElement[], span?: Span) => {
    type: "TsTypeLiteral";
    members: TsTypeElement[];
    span: Span;
};
export declare const createTsArrayType: (elemType: TsType, span?: Span) => {
    type: "TsArrayType";
    elemType: TsType;
    span: Span;
};
export declare const createTsTupleType: (elemTypes?: TsTupleElement[], span?: Span) => {
    type: "TsTupleType";
    elemTypes: TsTupleElement[];
    span: Span;
};
export declare const createTsTupleElement: (ty: TsType, label?: Pattern, span?: Span) => {
    type: "TsTupleElement";
    label: Pattern | undefined;
    ty: TsType;
    span: Span;
};
export declare const createTsOptionalType: (typeAnnotation: TsType, span?: Span) => {
    type: "TsOptionalType";
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsRestType: (typeAnnotation: TsType, span?: Span) => {
    type: "TsRestType";
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsUnionType: (types?: TsType[], span?: Span) => {
    type: "TsUnionType";
    types: TsType[];
    span: Span;
};
export declare const createTsIntersectionType: (types?: TsType[], span?: Span) => {
    type: "TsIntersectionType";
    types: TsType[];
    span: Span;
};
export declare const createTsConditionalType: (checkType: TsType, extendsType: TsType, trueType: TsType, falseType: TsType, span?: Span) => {
    type: "TsConditionalType";
    checkType: TsType;
    extendsType: TsType;
    trueType: TsType;
    falseType: TsType;
    span: Span;
};
export declare const createTsInferType: (typeParam: TsTypeParameter, span?: Span) => {
    type: "TsInferType";
    typeParam: TsTypeParameter;
    span: Span;
};
export declare const createTsParenthesizedType: (typeAnnotation: TsType, span?: Span) => {
    type: "TsParenthesizedType";
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsTypeOperator: (op: TsTypeOperatorOp, typeAnnotation: TsType, span?: Span) => {
    type: "TsTypeOperator";
    op: TsTypeOperatorOp;
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsIndexedAccessType: (objectType: TsType, indexType: TsType, readonly?: boolean, span?: Span) => {
    type: "TsIndexedAccessType";
    readonly: boolean;
    objectType: TsType;
    indexType: TsType;
    span: Span;
};
export declare const createTsMappedType: (typeParam: TsTypeParameter, typeAnnotation?: TsType, nameType?: TsType, optional?: TruePlusMinus, readonly?: TruePlusMinus, span?: Span) => {
    type: "TsMappedType";
    readonly: TruePlusMinus | undefined;
    typeParam: TsTypeParameter;
    nameType: TsType | undefined;
    optional: TruePlusMinus | undefined;
    typeAnnotation: TsType | undefined;
    span: Span;
};
export declare const createTsLiteralType: (literal: TsLiteral, span?: Span) => {
    type: "TsLiteralType";
    literal: TsLiteral;
    span: Span;
};
export declare const createTsTemplateLiteralType: (types?: TsType[], quasis?: TemplateElement[], span?: Span) => {
    type: "TemplateLiteral";
    types: TsType[];
    quasis: TemplateElement[];
    span: Span;
};
export declare const createTsInterfaceDeclaration: (id: Identifier, body: TsInterfaceBody, _extends?: TsExpressionWithTypeArguments[], typeParams?: TsTypeParameterDeclaration, declare?: boolean, span?: Span) => {
    type: "TsInterfaceDeclaration";
    id: Identifier;
    declare: boolean;
    typeParams: TsTypeParameterDeclaration | undefined;
    extends: TsExpressionWithTypeArguments[];
    body: TsInterfaceBody;
    span: Span;
};
export declare const createTsInterfaceBody: (body?: TsTypeElement[], span?: Span) => {
    type: "TsInterfaceBody";
    body: TsTypeElement[];
    span: Span;
};
export declare const createTsExpressionWithTypeArguments: (expression: Expression, typeArguments?: TsTypeParameterInstantiation, span?: Span) => {
    type: "TsExpressionWithTypeArguments";
    expression: Expression;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: Span;
};
export declare const createTsTypeAliasDeclaration: (id: Identifier, typeAnnotation: TsType, typeParams?: TsTypeParameterDeclaration, declare?: boolean, span?: Span) => {
    type: "TsTypeAliasDeclaration";
    declare: boolean;
    id: Identifier;
    typeParams: TsTypeParameterDeclaration | undefined;
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsEnumDeclaration: (id: Identifier, members?: TsEnumMember[], declare?: boolean, isConst?: boolean, span?: Span) => {
    type: "TsEnumDeclaration";
    declare: boolean;
    isConst: boolean;
    id: Identifier;
    members: TsEnumMember[];
    span: Span;
};
export declare const createTsEnumMember: (id: TsEnumMemberId, init?: Expression, span?: Span) => {
    type: "TsEnumMember";
    id: TsEnumMemberId;
    init: Expression | undefined;
    span: Span;
};
export declare const createTsModuleDeclaration: (id: TsModuleName, body?: TsNamespaceBody, declare?: boolean, global?: boolean, span?: Span) => {
    type: "TsModuleDeclaration";
    declare: boolean;
    global: boolean;
    id: TsModuleName;
    body: TsNamespaceBody | undefined;
    span: Span;
};
export declare const createTsModuleBlock: (body: ModuleItem[], span?: Span) => {
    type: "TsModuleBlock";
    body: ModuleItem[];
    span: Span;
};
export declare const createTsNamespaceDeclaration: (id: Identifier, body: TsNamespaceBody, declare?: boolean, global?: boolean, span?: Span) => {
    type: "TsNamespaceDeclaration";
    declare: boolean;
    global: boolean;
    id: Identifier;
    body: TsNamespaceBody;
    span: Span;
};
export declare const createTsImportEqualsDeclaration: (id: Identifier, moduleRef: TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean, span?: Span) => {
    type: "TsImportEqualsDeclaration";
    declare: boolean;
    isExport: boolean;
    isTypeOnly: boolean;
    id: Identifier;
    moduleRef: TsModuleReference;
    span: Span;
};
export declare const createTsExternalModuleReference: (expression: StringLiteral, span?: Span) => {
    type: "TsExternalModuleReference";
    expression: StringLiteral;
    span: Span;
};
export declare const createTsExportAssignment: (expression: Expression, span?: Span) => {
    type: "TsExportAssignment";
    expression: Expression;
    span: Span;
};
export declare const createTsNamespaceExportDeclaration: (id: Identifier, span?: Span) => {
    type: "TsNamespaceExportDeclaration";
    id: Identifier;
    span: Span;
};
export declare const createTsAsExpression: (expression: Expression, typeAnnotation: TsType, span?: Span) => {
    type: "TsAsExpression";
    expression: Expression;
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsSatisfiesExpression: (expression: Expression, typeAnnotation: TsType, span?: Span) => {
    type: "TsSatisfiesExpression";
    expression: Expression;
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsInstantiation: (expression: Expression, typeArguments: TsTypeParameterInstantiation, span?: Span) => {
    type: "TsInstantiation";
    expression: Expression;
    typeArguments: TsTypeParameterInstantiation;
    span: Span;
};
export declare const createTsTypeAssertion: (expression: Expression, typeAnnotation: TsType, span?: Span) => {
    type: "TsTypeAssertion";
    expression: Expression;
    typeAnnotation: TsType;
    span: Span;
};
export declare const createTsConstAssertion: (expression: Expression, span?: Span) => {
    type: "TsConstAssertion";
    expression: Expression;
    span: Span;
};
export declare const createTsNonNullExpression: (expression: Expression, span?: Span) => {
    type: "TsNonNullExpression";
    expression: Expression;
    span: Span;
};
export declare const createInvalid: (span?: Span) => {
    type: "Invalid";
    span: Span;
};
