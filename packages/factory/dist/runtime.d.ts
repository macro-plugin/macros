import type { Accessibility, Argument, ArrayExpression, ArrayPattern, ArrowFunctionExpression, AssignmentExpression, AssignmentOperator, AssignmentPattern, AwaitExpression, BigIntLiteral, BinaryExpression, BinaryOperator, BlockStatement, BooleanLiteral, CallExpression, CatchClause, ClassExpression, ClassMember, ComputedPropName, ConditionalExpression, Declaration, Decorator, DefaultDecl, ExportSpecifier, ExprOrSpread, Expression, Fn, FunctionExpression, Identifier, Import, ImportSpecifier, Invalid, JSXAttrValue, JSXAttributeName, JSXAttributeOrSpread, JSXClosingElement, JSXClosingFragment, JSXElement, JSXElementChild, JSXElementName, JSXEmptyExpression, JSXExpression, JSXFragment, JSXMemberExpression, JSXNamespacedName, JSXObject, JSXOpeningElement, JSXOpeningFragment, JSXText, MemberExpression, MetaProperty, MethodKind, Module, ModuleExportName, ModuleItem, NewExpression, NullLiteral, NumericLiteral, ObjectExpression, ObjectPattern, ObjectPatternProperty, OptionalChainingCall, OptionalChainingExpression, Param, ParenthesisExpression, Pattern, PrivateName, Property, PropertyName, RegExpLiteral, RestElement, Script, SequenceExpression, Span, SpreadElement, Statement, StringLiteral, Super, SuperPropExpression, SwitchCase, TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, TruePlusMinus, TsAsExpression, TsConstAssertion, TsEntityName, TsEnumMember, TsEnumMemberId, TsExpressionWithTypeArguments, TsFnParameter, TsInstantiation, TsInterfaceBody, TsKeywordTypeKind, TsLiteral, TsModuleName, TsModuleReference, TsNamespaceBody, TsNonNullExpression, TsParameterProperty, TsParameterPropertyParameter, TsThisTypeOrIdent, TsTupleElement, TsType, TsTypeAnnotation, TsTypeAssertion, TsTypeElement, TsTypeOperatorOp, TsTypeParameter, TsTypeParameterDeclaration, TsTypeParameterInstantiation, TsTypeQueryExpr, UnaryExpression, UnaryOperator, UpdateExpression, UpdateOperator, VariableDeclaration, VariableDeclarationKind, VariableDeclarator, YieldExpression } from "@swc/core";
export declare const createIdentifier: (value: string, optional?: boolean) => {
    type: "Identifier";
    value: string;
    optional: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createStringLiteral: (value: string, raw?: string) => {
    type: "StringLiteral";
    value: string;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createNumericLiteral: (value: number, raw?: string) => {
    type: "NumericLiteral";
    value: number;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createBigIntLiteral: (value: bigint, raw?: string) => {
    type: "BigIntLiteral";
    value: bigint;
    raw: string | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createBooleanLiteral: (value: boolean) => {
    type: "BooleanLiteral";
    value: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createNullLiteral: () => {
    type: "NullLiteral";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createRegExpLiteral: (pattern: string, flags: string) => {
    type: "RegExpLiteral";
    pattern: string;
    flags: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createArgument: (expression: Expression, spread?: boolean) => {
    spread: {
        start: number;
        end: number;
        ctxt: number;
    } | undefined;
    expression: Expression;
};
export declare const createCallExpression: (callee: Expression | Super | Import, args?: Argument[], typeArguments?: TsTypeParameterInstantiation) => {
    type: "CallExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    callee: Expression | Super | Import;
    arguments: Argument[];
    typeArguments: TsTypeParameterInstantiation | undefined;
};
export declare const createClassProperty: (key: PropertyName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => {
    type: "ClassProperty";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
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
export declare const createPrivateProperty: (key: PrivateName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => {
    type: "PrivateProperty";
    key: PrivateName;
    value: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    decorators: Decorator[] | undefined;
    typeAnnotation: TsTypeAnnotation | undefined;
    accessibility: Accessibility | undefined;
    definite: boolean;
    isOptional: boolean;
    isOverride: boolean;
    isStatic: boolean;
    readonly: boolean;
};
export declare const createParam: (pat: Pattern, decorators?: Decorator[]) => {
    type: "Parameter";
    pat: Pattern;
    decorators: Decorator[] | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createConstructor: (key: PropertyName, params: (TsParameterProperty | Param)[], body?: BlockStatement, accessibility?: Accessibility, isOptional?: boolean) => {
    type: "Constructor";
    key: PropertyName;
    params: (TsParameterProperty | Param)[];
    body: BlockStatement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    accessibility: Accessibility | undefined;
    isOptional: boolean;
};
export declare const createClassMethod: (kind: MethodKind, key: PropertyName, fn: Fn, accessibility?: Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => {
    type: "ClassMethod";
    key: PropertyName;
    function: Fn;
    kind: MethodKind;
    isStatic: boolean;
    accessibility: Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createPrivateMethod: (kind: MethodKind, key: PrivateName, fn: Fn, accessibility?: Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => {
    type: "PrivateMethod";
    key: PrivateName;
    function: Fn;
    kind: MethodKind;
    isStatic: boolean;
    accessibility: Accessibility | undefined;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createStaticBlock: (body: BlockStatement) => {
    type: "StaticBlock";
    body: BlockStatement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createDecorator: (expression: Expression) => {
    type: "Decorator";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createFunctionDeclaration: (identifier: Identifier, params: Param[], body?: BlockStatement, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], declare?: boolean, async?: boolean, generator?: boolean) => {
    type: "FunctionDeclaration";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
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
export declare const createClassDeclaration: (identifier: Identifier, body: ClassMember[], impls: TsExpressionWithTypeArguments[], superClass?: Expression, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], declare?: boolean, isAbstract?: boolean) => {
    type: "ClassDeclaration";
    identifier: Identifier;
    declare: boolean;
    body: ClassMember[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    superClass: Expression | undefined;
    isAbstract: boolean;
    decorators: Decorator[] | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    superTypeParams: TsTypeParameterInstantiation | undefined;
    implements: TsExpressionWithTypeArguments[];
};
export declare const createVariableDeclaration: (kind: VariableDeclarationKind, declarations?: VariableDeclarator[], declare?: boolean) => {
    type: "VariableDeclaration";
    kind: VariableDeclarationKind;
    declare: boolean;
    declarations: VariableDeclarator[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createVariableDeclarator: (id: Pattern, init?: Expression, definite?: boolean) => {
    type: "VariableDeclarator";
    id: Pattern;
    definite: boolean;
    init: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createOptionalChainingExpression: (base: MemberExpression | OptionalChainingCall) => {
    type: "OptionalChainingExpression";
    questionDotToken: {
        start: number;
        end: number;
        ctxt: number;
    };
    base: MemberExpression | OptionalChainingCall;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createOptionalChainingCall: (callee: Expression, args?: ExprOrSpread[], typeArguments?: TsTypeParameterInstantiation) => {
    type: "CallExpression";
    callee: Expression;
    arguments: ExprOrSpread[];
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createThisExpression: () => {
    type: "ThisExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createArrayExpression: (elements?: (ExprOrSpread | undefined)[]) => {
    type: "ArrayExpression";
    elements: (ExprOrSpread | undefined)[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExprOrSpread: (expression: Expression, spread?: boolean) => {
    spread: {
        start: number;
        end: number;
        ctxt: number;
    } | undefined;
    expression: Expression;
};
export declare const createObjectExpression: (properties?: (SpreadElement | Property)[]) => {
    type: "ObjectExpression";
    properties: (SpreadElement | Property)[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSpreadElement: (args: Expression) => {
    type: "SpreadElement";
    spread: {
        start: number;
        end: number;
        ctxt: number;
    };
    arguments: Expression;
};
export declare const createUnaryExpression: (operator: UnaryOperator, argument: Expression) => {
    type: "UnaryExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    operator: UnaryOperator;
    argument: Expression;
};
export declare const createUpdateExpression: (operator: UpdateOperator, argument: Expression, prefix?: boolean) => {
    type: "UpdateExpression";
    operator: UpdateOperator;
    prefix: boolean;
    argument: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createBinaryExpression: (left: Expression, operator: BinaryOperator, right: Expression) => {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createFunctionExpression: (params: Param[], body?: BlockStatement, identifier?: Identifier, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], async?: boolean, generator?: boolean) => {
    type: "FunctionExpression";
    params: Param[];
    decorators: Decorator[] | undefined;
    body: BlockStatement | undefined;
    generator: boolean;
    async: boolean;
    typeParameters: TsTypeParameterDeclaration | undefined;
    returnType: TsTypeAnnotation | undefined;
    identifier: Identifier | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createClassExpression: (body: ClassMember[], impls?: TsExpressionWithTypeArguments[], superClass?: Expression, identifier?: Identifier, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], isAbstract?: boolean) => {
    type: "ClassExpression";
    identifier: Identifier | undefined;
    body: ClassMember[];
    superClass: Expression | undefined;
    isAbstract: boolean;
    typeParams: TsTypeParameterDeclaration | undefined;
    superTypeParams: TsTypeParameterInstantiation | undefined;
    implements: TsExpressionWithTypeArguments[];
    decorators: Decorator[] | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createAssignmentExpression: (left: Expression | Pattern, operator: AssignmentOperator, right: Expression) => {
    type: "AssignmentExpression";
    operator: AssignmentOperator;
    left: ThisExpression | ArrayExpression | ObjectExpression | FunctionExpression | UnaryExpression | UpdateExpression | BinaryExpression | AssignmentExpression | MemberExpression | SuperPropExpression | ConditionalExpression | CallExpression | NewExpression | SequenceExpression | Identifier | StringLiteral | BooleanLiteral | NullLiteral | NumericLiteral | BigIntLiteral | RegExpLiteral | JSXText | TemplateLiteral | TaggedTemplateExpression | ArrowFunctionExpression | ClassExpression | YieldExpression | MetaProperty | AwaitExpression | ParenthesisExpression | JSXMemberExpression | JSXNamespacedName | JSXEmptyExpression | JSXElement | JSXFragment | TsTypeAssertion | TsConstAssertion | TsNonNullExpression | TsAsExpression | TsInstantiation | PrivateName | OptionalChainingExpression | Invalid | import("@swc/core").BindingIdentifier | ArrayPattern | RestElement | ObjectPattern | AssignmentPattern;
    right: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createMemberExpression: (object: Expression, property: Identifier | PrivateName | ComputedPropName) => {
    type: "MemberExpression";
    object: Expression;
    property: Identifier | PrivateName | ComputedPropName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSuperPropExpression: (obj: Super, property: Identifier | ComputedPropName) => {
    type: "SuperPropExpression";
    obj: Super;
    property: Identifier | ComputedPropName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createConditionalExpression: (test: Expression, consequent: Expression, alternate: Expression) => {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSuper: () => {
    type: "Super";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createImport: () => {
    type: "Import";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createNewExpression: (callee: Expression, args?: Argument[], typeArguments?: TsTypeParameterInstantiation) => {
    type: "NewExpression";
    callee: Expression;
    arguments: Argument[] | undefined;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSequenceExpression: (expressions: Expression[]) => {
    type: "SequenceExpression";
    expressions: Expression[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createArrowFunctionExpression: (params: Pattern[], body: BlockStatement | Expression, async?: boolean, generator?: boolean, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation) => {
    type: "ArrowFunctionExpression";
    params: Pattern[];
    body: Expression | BlockStatement;
    async: boolean;
    generator: boolean;
    typeParameters: TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    returnType: TsTypeAnnotation | undefined;
};
export declare const createYieldExpression: (argument?: Expression, delegate?: boolean) => {
    type: "YieldExpression";
    argument: Expression | undefined;
    delegate: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createMetaProperty: (kind: "new.target" | "import.meta") => {
    type: "MetaProperty";
    kind: "new.target" | "import.meta";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createAwaitExpression: (argument: Expression) => {
    type: "AwaitExpression";
    argument: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTemplateLiteral: (expressions?: Expression[], quasis?: TemplateElement[]) => {
    type: "TemplateLiteral";
    expressions: Expression[];
    quasis: TemplateElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTaggedTemplateExpression: (tag: Expression, template: TemplateLiteral, typeParameters?: TsTypeParameterInstantiation) => {
    type: "TaggedTemplateExpression";
    tag: Expression;
    typeParameters: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    template: TemplateLiteral;
};
export declare const createTemplateElement: (raw: string, cooked?: string, tail?: boolean) => {
    type: "TemplateElement";
    tail: boolean;
    cooked: string | undefined;
    raw: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createParenthesisExpression: (expression: Expression) => {
    type: "ParenthesisExpression";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createPrivateName: (id: Identifier) => {
    type: "PrivateName";
    id: Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
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
export declare const createJSXEmptyExpression: () => {
    type: "JSXEmptyExpression";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXExpressionContainer: (expression: JSXExpression) => {
    type: "JSXExpressionContainer";
    expression: JSXExpression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXSpreadChild: (expression: Expression) => {
    type: "JSXSpreadChild";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXOpeningElement: (name: JSXElementName, attributes?: JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: TsTypeParameterInstantiation) => {
    type: "JSXOpeningElement";
    name: JSXElementName;
    attributes: JSXAttributeOrSpread[];
    selfClosing: boolean;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXClosingElement: (name: JSXElementName) => {
    type: "JSXClosingElement";
    name: JSXElementName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXAttribute: (name: JSXAttributeName, value?: JSXAttrValue) => {
    type: "JSXAttribute";
    name: JSXAttributeName;
    value: JSXAttrValue | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXText: (value: string, raw?: string) => {
    type: "JSXText";
    value: string;
    raw: string;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXElement: (opening: JSXOpeningElement, children?: JSXElementChild[], closing?: JSXClosingElement) => {
    type: "JSXElement";
    opening: JSXOpeningElement;
    children: JSXElementChild[];
    closing: JSXClosingElement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXFragment: (opening: JSXOpeningFragment, children: JSXElementChild[] | undefined, closing: JSXClosingFragment) => {
    type: "JSXFragment";
    opening: JSXOpeningFragment;
    children: JSXElementChild[];
    closing: JSXClosingFragment;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXOpeningFragment: () => {
    type: "JSXOpeningFragment";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createJSXClosingFragment: () => {
    type: "JSXClosingFragment";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportDefaultExpression: (expression: Expression) => {
    type: "ExportDefaultExpression";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportDeclaration: (declaration: Declaration) => {
    type: "ExportDeclaration";
    declaration: Declaration;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createImportDeclaration: (specifiers: ImportSpecifier[], source: StringLiteral, asserts?: ObjectExpression, typeOnly?: boolean) => {
    type: "ImportDeclaration";
    specifiers: ImportSpecifier[];
    source: StringLiteral;
    typeOnly: boolean;
    asserts: ObjectExpression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportAllDeclaration: (source: StringLiteral, asserts?: ObjectExpression) => {
    type: "ExportAllDeclaration";
    source: StringLiteral;
    asserts: ObjectExpression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportNamedDeclaration: (specifiers: ExportSpecifier[], source?: StringLiteral, asserts?: ObjectExpression, typeOnly?: boolean) => {
    type: "ExportNamedDeclaration";
    specifiers: ExportSpecifier[];
    source: StringLiteral | undefined;
    typeOnly: boolean;
    asserts: ObjectExpression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportDefaultDeclaration: (decl: DefaultDecl) => {
    type: "ExportDefaultDeclaration";
    decl: DefaultDecl;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createImportDefaultSpecifier: (local: Identifier) => {
    type: "ImportDefaultSpecifier";
    local: Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createImportNamespaceSpecifier: (local: Identifier) => {
    type: "ImportNamespaceSpecifier";
    local: Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createNamedImportSpecifier: (local: Identifier, imported?: ModuleExportName, isTypeOnly?: boolean) => {
    type: "ImportSpecifier";
    local: Identifier;
    imported: ModuleExportName | undefined;
    isTypeOnly: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportNamespaceSpecifier: (name: ModuleExportName) => {
    type: "ExportNamespaceSpecifier";
    name: ModuleExportName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExportDefaultSpecifier: (exported: Identifier) => {
    type: "ExportDefaultSpecifier";
    exported: Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createNamedExportSpecifier: (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly?: boolean) => {
    type: "ExportSpecifier";
    orig: ModuleExportName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    exported: ModuleExportName | undefined;
    isTypeOnly: boolean;
};
export declare const createModule: (body?: ModuleItem[], interpreter?: string) => Module;
export declare const createScript: (body?: Statement[], interpreter?: string) => Script;
export declare const createArrayPattern: (elements: (Pattern | undefined)[], optional?: boolean, typeAnnotation?: TsTypeAnnotation) => {
    type: "ArrayPattern";
    elements: (Pattern | undefined)[];
    optional: boolean;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createObjectPattern: (properties: ObjectPatternProperty[], optional?: boolean, typeAnnotation?: TsTypeAnnotation) => {
    type: "ObjectPattern";
    properties: ObjectPatternProperty[];
    optional: boolean;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createAssignmentPattern: (left: Pattern, right: Expression, typeAnnotation?: TsTypeAnnotation) => {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createRestElement: (argument: Pattern, rest: Span, typeAnnotation?: TsTypeAnnotation) => {
    type: "RestElement";
    rest: Span;
    argument: Pattern;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createKeyValuePatternProperty: (key: PropertyName, value: Pattern) => {
    type: "KeyValuePatternProperty";
    key: PropertyName;
    value: Pattern;
};
export declare const createAssignmentPatternProperty: (key: Identifier, value?: Expression) => {
    type: "AssignmentPatternProperty";
    key: Identifier;
    value: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
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
export declare const createGetterProperty: (key: PropertyName, body?: BlockStatement, typeAnnotation?: TsTypeAnnotation) => {
    type: "GetterProperty";
    typeAnnotation: TsTypeAnnotation | undefined;
    body: BlockStatement | undefined;
    key: PropertyName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSetterProperty: (key: PropertyName, param: Pattern, body?: BlockStatement) => {
    type: "SetterProperty";
    param: Pattern;
    body: BlockStatement | undefined;
    key: PropertyName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createMethodProperty: (key: PropertyName, params: Param[], body?: BlockStatement, async?: boolean, generator?: boolean, decorators?: Decorator[], typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation) => {
    type: "MethodProperty";
    key: PropertyName;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
    params: Param[];
    body: BlockStatement | undefined;
    async: boolean;
    generator: boolean;
    decorators: Decorator[] | undefined;
    typeParameters: TsTypeParameterDeclaration | undefined;
    returnType: TsTypeAnnotation | undefined;
};
export declare const createComputedPropName: (expression: Expression) => {
    type: "Computed";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createBlockStatement: (stmts?: Statement[]) => {
    type: "BlockStatement";
    stmts: Statement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createExpressionStatement: (expression: Expression) => {
    type: "ExpressionStatement";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createEmptyStatement: () => {
    type: "EmptyStatement";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createDebuggerStatement: () => {
    type: "DebuggerStatement";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createWithStatement: (object: Expression, body: Statement) => {
    type: "WithStatement";
    object: Expression;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createReturnStatement: (argument?: Expression) => {
    type: "ReturnStatement";
    argument: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createLabeledStatement: (label: Identifier, body: Statement) => {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createBreakStatement: (label?: Identifier) => {
    type: "BreakStatement";
    label: Identifier | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createContinueStatement: (label?: Identifier) => {
    type: "ContinueStatement";
    label: Identifier | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createIfStatement: (test: Expression, consequent: Statement, alternate?: Statement) => {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate: Statement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSwitchStatement: (discriminant: Expression, cases?: SwitchCase[]) => {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: SwitchCase[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createThrowStatement: (argument: Expression) => {
    type: "ThrowStatement";
    argument: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTryStatement: (block: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement) => {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | undefined;
    finalizer: BlockStatement | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createWhileStatement: (test: Expression, body: Statement) => {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createDoWhileStatement: (test: Expression, body: Statement) => {
    type: "DoWhileStatement";
    test: Expression;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createForStatement: (body: Statement, init?: VariableDeclaration | Expression, test?: Expression, update?: Expression) => {
    type: "ForStatement";
    init: Expression | VariableDeclaration | undefined;
    test: Expression | undefined;
    update: Expression | undefined;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createForInStatement: (left: VariableDeclaration | Pattern, right: Expression, body: Statement) => {
    type: "ForInStatement";
    left: Pattern | VariableDeclaration;
    right: Expression;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createForOfStatement: (left: VariableDeclaration | Pattern, right: Expression, body: Statement, _await?: Span) => {
    type: "ForOfStatement";
    await: Span | undefined;
    left: Pattern | VariableDeclaration;
    right: Expression;
    body: Statement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createSwitchCase: (test?: Expression, consequent?: Statement[]) => {
    type: "SwitchCase";
    test: Expression | undefined;
    consequent: Statement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createCatchClause: (body: BlockStatement, param?: Pattern) => {
    type: "CatchClause";
    param: Pattern | undefined;
    body: BlockStatement;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeAnnotation: (typeAnnotation: TsType) => {
    type: "TsTypeAnnotation";
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeParameterDeclaration: (parameters?: TsTypeParameter[]) => {
    type: "TsTypeParameterDeclaration";
    parameters: TsTypeParameter[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeParameter: (name: Identifier, _in: boolean, _out: boolean, constraint?: TsType, _default?: TsType) => {
    type: "TsTypeParameter";
    name: Identifier;
    in: boolean;
    out: boolean;
    constraint: TsType | undefined;
    default: TsType | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeParameterInstantiation: (params?: TsType[]) => {
    type: "TsTypeParameterInstantiation";
    params: TsType[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsParameterProperty: (param: TsParameterPropertyParameter, accessibility?: Accessibility, decorators?: Decorator[], override?: boolean, readonly?: boolean) => {
    type: "TsParameterProperty";
    decorators: Decorator[] | undefined;
    accessibility: Accessibility | undefined;
    override: boolean;
    readonly: boolean;
    param: TsParameterPropertyParameter;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsQualifiedName: (left: TsEntityName, right: Identifier) => {
    type: "TsQualifiedName";
    left: TsEntityName;
    right: Identifier;
};
export declare const createTsCallSignatureDeclaration: (params?: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => {
    type: "TsCallSignatureDeclaration";
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsConstructSignatureDeclaration: (params?: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => {
    type: "TsConstructSignatureDeclaration";
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsPropertySignature: (key: Expression, params: TsFnParameter[], init?: Expression, typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsPropertySignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    init: Expression | undefined;
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsGetterSignature: (key: Expression, typeAnnotation?: TsTypeAnnotation, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsGetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsSetterSignature: (key: Expression, param: TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsSetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    param: TsFnParameter;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsMethodSignature: (key: Expression, params: TsFnParameter[], typeAnn?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean) => {
    type: "TsMethodSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    params: TsFnParameter[];
    typeAnn: TsTypeAnnotation | undefined;
    typeParams: TsTypeParameterDeclaration | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsIndexSignature: (params: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, readonly?: boolean, isStatic?: boolean) => {
    type: "TsIndexSignature";
    params: TsFnParameter[];
    typeAnnotation: TsTypeAnnotation | undefined;
    readonly: boolean;
    static: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsKeywordType: (kind: TsKeywordTypeKind) => {
    type: "TsKeywordType";
    kind: TsKeywordTypeKind;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsThisType: () => {
    type: "TsThisType";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsFunctionType: (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => {
    type: "TsFunctionType";
    params: TsFnParameter[];
    typeParams: TsTypeParameterDeclaration | undefined;
    typeAnnotation: TsTypeAnnotation;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsConstructorType: (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, isAbstract?: boolean) => {
    type: "TsConstructorType";
    params: TsFnParameter[];
    typeParams: TsTypeParameterDeclaration | undefined;
    typeAnnotation: TsTypeAnnotation;
    isAbstract: boolean;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeReference: (typeName: TsEntityName, typeParams?: TsTypeParameterInstantiation) => {
    type: "TsTypeReference";
    typeName: TsEntityName;
    typeParams: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypePredicate: (paramName: TsThisTypeOrIdent, typeAnnotation?: TsTypeAnnotation, asserts?: boolean) => {
    type: "TsTypePredicate";
    asserts: boolean;
    paramName: TsThisTypeOrIdent;
    typeAnnotation: TsTypeAnnotation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsImportType: (argument: StringLiteral, qualifier?: TsEntityName, typeArguments?: TsTypeParameterInstantiation) => {
    type: "TsImportType";
    argument: StringLiteral;
    qualifier: TsEntityName | undefined;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeQuery: (exprName: TsTypeQueryExpr, typeArguments?: TsTypeParameterInstantiation) => {
    type: "TsTypeQuery";
    exprName: TsTypeQueryExpr;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeLiteral: (members?: TsTypeElement[]) => {
    type: "TsTypeLiteral";
    members: TsTypeElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsArrayType: (elemType: TsType) => {
    type: "TsArrayType";
    elemType: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTupleType: (elemTypes?: TsTupleElement[]) => {
    type: "TsTupleType";
    elemTypes: TsTupleElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTupleElement: (ty: TsType, label?: Pattern) => {
    type: "TsTupleElement";
    label: Pattern | undefined;
    ty: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsOptionalType: (typeAnnotation: TsType) => {
    type: "TsOptionalType";
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsRestType: (typeAnnotation: TsType) => {
    type: "TsRestType";
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsUnionType: (types?: TsType[]) => {
    type: "TsUnionType";
    types: TsType[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsIntersectionType: (types?: TsType[]) => {
    type: "TsIntersectionType";
    types: TsType[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsConditionalType: (checkType: TsType, extendsType: TsType, trueType: TsType, falseType: TsType) => {
    type: "TsConditionalType";
    checkType: TsType;
    extendsType: TsType;
    trueType: TsType;
    falseType: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsInferType: (typeParam: TsTypeParameter) => {
    type: "TsInferType";
    typeParam: TsTypeParameter;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsParenthesizedType: (typeAnnotation: TsType) => {
    type: "TsParenthesizedType";
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeOperator: (op: TsTypeOperatorOp, typeAnnotation: TsType) => {
    type: "TsTypeOperator";
    op: TsTypeOperatorOp;
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsIndexedAccessType: (objectType: TsType, indexType: TsType, readonly?: boolean) => {
    type: "TsIndexedAccessType";
    readonly: boolean;
    objectType: TsType;
    indexType: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsMappedType: (typeParam: TsTypeParameter, typeAnnotation?: TsType, nameType?: TsType, optional?: TruePlusMinus, readonly?: TruePlusMinus) => {
    type: "TsMappedType";
    readonly: TruePlusMinus | undefined;
    typeParam: TsTypeParameter;
    nameType: TsType | undefined;
    optional: TruePlusMinus | undefined;
    typeAnnotation: TsType | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsLiteralType: (literal: TsLiteral) => {
    type: "TsLiteralType";
    literal: TsLiteral;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTemplateLiteralType: (types?: TsType[], quasis?: TemplateElement[]) => {
    type: "TemplateLiteral";
    types: TsType[];
    quasis: TemplateElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsInterfaceDeclaration: (id: Identifier, body: TsInterfaceBody, _extends?: TsExpressionWithTypeArguments[], typeParams?: TsTypeParameterDeclaration, declare?: boolean) => {
    type: "TsInterfaceDeclaration";
    id: Identifier;
    declare: boolean;
    typeParams: TsTypeParameterDeclaration | undefined;
    extends: TsExpressionWithTypeArguments[];
    body: TsInterfaceBody;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsInterfaceBody: (body?: TsTypeElement[]) => {
    type: "TsInterfaceBody";
    body: TsTypeElement[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsExpressionWithTypeArguments: (expression: Expression, typeArguments?: TsTypeParameterInstantiation) => {
    type: "TsExpressionWithTypeArguments";
    expression: Expression;
    typeArguments: TsTypeParameterInstantiation | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeAliasDeclaration: (id: Identifier, typeAnnotation: TsType, typeParams?: TsTypeParameterDeclaration, declare?: boolean) => {
    type: "TsTypeAliasDeclaration";
    declare: boolean;
    id: Identifier;
    typeParams: TsTypeParameterDeclaration | undefined;
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsEnumDeclaration: (id: Identifier, members?: TsEnumMember[], declare?: boolean, isConst?: boolean) => {
    type: "TsEnumDeclaration";
    declare: boolean;
    isConst: boolean;
    id: Identifier;
    members: TsEnumMember[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsEnumMember: (id: TsEnumMemberId, init?: Expression) => {
    type: "TsEnumMember";
    id: TsEnumMemberId;
    init: Expression | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsModuleDeclaration: (id: TsModuleName, body?: TsNamespaceBody, declare?: boolean, global?: boolean) => {
    type: "TsModuleDeclaration";
    declare: boolean;
    global: boolean;
    id: TsModuleName;
    body: TsNamespaceBody | undefined;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsModuleBlock: (body: ModuleItem[]) => {
    type: "TsModuleBlock";
    body: ModuleItem[];
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsNamespaceDeclaration: (id: Identifier, body: TsNamespaceBody, declare?: boolean, global?: boolean) => {
    type: "TsNamespaceDeclaration";
    declare: boolean;
    global: boolean;
    id: Identifier;
    body: TsNamespaceBody;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsImportEqualsDeclaration: (id: Identifier, moduleRef: TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean) => {
    type: "TsImportEqualsDeclaration";
    declare: boolean;
    isExport: boolean;
    isTypeOnly: boolean;
    id: Identifier;
    moduleRef: TsModuleReference;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsExternalModuleReference: (expression: StringLiteral) => {
    type: "TsExternalModuleReference";
    expression: StringLiteral;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsExportAssignment: (expression: Expression) => {
    type: "TsExportAssignment";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsNamespaceExportDeclaration: (id: Identifier) => {
    type: "TsNamespaceExportDeclaration";
    id: Identifier;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsAsExpression: (expression: Expression, typeAnnotation: TsType) => {
    type: "TsAsExpression";
    expression: Expression;
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsSatisfiesExpression: (expression: Expression, typeAnnotation: TsType) => {
    type: "TsSatisfiesExpression";
    expression: Expression;
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsInstantiation: (expression: Expression, typeArguments: TsTypeParameterInstantiation) => {
    type: "TsInstantiation";
    expression: Expression;
    typeArguments: TsTypeParameterInstantiation;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsTypeAssertion: (expression: Expression, typeAnnotation: TsType) => {
    type: "TsTypeAssertion";
    expression: Expression;
    typeAnnotation: TsType;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsConstAssertion: (expression: Expression) => {
    type: "TsConstAssertion";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createTsNonNullExpression: (expression: Expression) => {
    type: "TsNonNullExpression";
    expression: Expression;
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
export declare const createInvalid: () => {
    type: "Invalid";
    span: {
        start: number;
        end: number;
        ctxt: number;
    };
};
