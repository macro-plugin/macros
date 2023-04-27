import { span } from '@macro-plugin/core';

const createIdentifier = (value, optional = false) => ({
    type: "Identifier",
    value,
    optional,
    span,
});
const createStringLiteral = (value, raw) => ({
    type: "StringLiteral",
    value,
    raw,
    span
});
const createNumericLiteral = (value, raw) => ({
    type: "NumericLiteral",
    value,
    raw,
    span
});
const createBigIntLiteral = (value, raw) => ({
    type: "BigIntLiteral",
    value,
    raw,
    span
});
const createBooleanLiteral = (value) => ({
    type: "BooleanLiteral",
    value,
    span
});
const createNullLiteral = () => ({
    type: "NullLiteral",
    span
});
const createRegExpLiteral = (pattern, flags) => ({
    type: "RegExpLiteral",
    pattern,
    flags,
    span
});
const createArgument = (expression, spread = false) => ({
    spread: spread ? span : undefined,
    expression
});
const createCallExpression = (callee, args = [], typeArguments) => ({
    type: "CallExpression",
    span,
    callee,
    arguments: args,
    typeArguments
});
const createClassProperty = (key, value, accessibility, typeAnnotation, decorators, declare = false, definite = false, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, readonly = false) => ({
    type: "ClassProperty",
    span,
    decorators,
    key,
    isAbstract,
    declare,
    value,
    typeAnnotation,
    isStatic,
    accessibility,
    isOptional,
    isOverride,
    readonly,
    definite,
});
const createPrivateProperty = (key, value, accessibility, typeAnnotation, decorators, definite = false, isOptional = false, isOverride = false, isStatic = false, readonly = false) => ({
    type: "PrivateProperty",
    key,
    value,
    span,
    decorators,
    typeAnnotation,
    accessibility,
    definite,
    isOptional,
    isOverride,
    isStatic,
    readonly,
});
const createParam = (pat, decorators) => ({
    type: "Parameter",
    pat,
    decorators,
    span
});
const createConstructor = (key, params, body, accessibility, isOptional = false) => ({
    type: "Constructor",
    key,
    params,
    body,
    span,
    accessibility,
    isOptional,
});
const createClassMethod = (kind, key, fn, accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false) => ({
    type: "ClassMethod",
    key,
    function: fn,
    kind,
    isStatic,
    accessibility,
    isAbstract,
    isOptional,
    isOverride,
    span
});
const createPrivateMethod = (kind, key, fn, accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false) => ({
    type: "PrivateMethod",
    key,
    function: fn,
    kind,
    isStatic,
    accessibility,
    isAbstract,
    isOptional,
    isOverride,
    span
});
const createStaticBlock = (body) => ({
    type: "StaticBlock",
    body,
    span
});
const createDecorator = (expression) => ({
    type: "Decorator",
    expression,
    span
});
const createFunctionDeclaration = (identifier, params, body, typeParameters, returnType, decorators, declare = false, async = false, generator = false) => ({
    type: "FunctionDeclaration",
    span,
    params,
    body,
    generator,
    async,
    decorators,
    typeParameters,
    returnType,
    identifier,
    declare,
});
const createClassDeclaration = (identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare = false, isAbstract = false) => ({
    type: "ClassDeclaration",
    identifier,
    declare,
    body,
    span,
    superClass,
    isAbstract,
    decorators,
    typeParams,
    superTypeParams,
    implements: impls,
});
const createVariableDeclaration = (kind, declarations = [], declare = false) => ({
    type: "VariableDeclaration",
    kind,
    declare,
    declarations,
    span,
});
const createVariableDeclarator = (id, init, definite = false) => ({
    type: "VariableDeclarator",
    id,
    definite,
    init,
    span
});
const createOptionalChainingExpression = (base) => ({
    type: "OptionalChainingExpression",
    questionDotToken: span,
    base,
    span
});
const createOptionalChainingCall = (callee, args = [], typeArguments) => ({
    type: "CallExpression",
    callee,
    arguments: args,
    typeArguments,
    span
});
const createThisExpression = () => ({
    type: "ThisExpression",
    span
});
const createArrayExpression = (elements = []) => ({
    type: "ArrayExpression",
    elements,
    span
});
const createExprOrSpread = (expression, spread = false) => ({
    spread: spread ? span : undefined,
    expression,
});
const createObjectExpression = (properties = []) => ({
    type: "ObjectExpression",
    properties,
    span
});
const createSpreadElement = (args) => ({
    type: "SpreadElement",
    spread: span,
    arguments: args,
});
const createUnaryExpression = (operator, argument) => ({
    type: "UnaryExpression",
    span,
    operator,
    argument
});
const createUpdateExpression = (operator, argument, prefix = false) => ({
    type: "UpdateExpression",
    operator,
    prefix,
    argument,
    span
});
const createBinaryExpression = (left, operator, right) => ({
    type: "BinaryExpression",
    operator,
    left,
    right,
    span
});
const createFunctionExpression = (params, body, identifier, typeParameters, returnType, decorators, async = false, generator = false) => ({
    type: "FunctionExpression",
    params,
    decorators,
    body,
    generator,
    async,
    typeParameters,
    returnType,
    identifier,
    span
});
const createClassExpression = (body, impls = [], superClass, identifier, typeParams, superTypeParams, decorators, isAbstract = false) => ({
    type: "ClassExpression",
    identifier,
    body,
    superClass,
    isAbstract,
    typeParams,
    superTypeParams,
    implements: impls,
    decorators,
    span
});
const createAssignmentExpression = (left, operator, right) => ({
    type: "AssignmentExpression",
    operator,
    left,
    right,
    span
});
const createMemberExpression = (object, property) => ({
    type: "MemberExpression",
    object,
    property,
    span
});
const createSuperPropExpression = (obj, property) => ({
    type: "SuperPropExpression",
    obj,
    property,
    span
});
const createConditionalExpression = (test, consequent, alternate) => ({
    type: "ConditionalExpression",
    test,
    consequent,
    alternate,
    span
});
const createSuper = () => ({
    type: "Super",
    span
});
const createImport = () => ({
    type: "Import",
    span
});
const createNewExpression = (callee, args, typeArguments) => ({
    type: "NewExpression",
    callee,
    arguments: args,
    typeArguments,
    span
});
const createSequenceExpression = (expressions) => ({
    type: "SequenceExpression",
    expressions,
    span
});
const createArrowFunctionExpression = (params, body, async = false, generator = false, typeParameters, returnType) => ({
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    generator,
    typeParameters,
    span,
    returnType,
});
const createYieldExpression = (argument, delegate = false) => ({
    type: "YieldExpression",
    argument,
    delegate,
    span
});
const createMetaProperty = (kind) => ({
    type: "MetaProperty",
    kind,
    span
});
const createAwaitExpression = (argument) => ({
    type: "AwaitExpression",
    argument,
    span
});
const createTemplateLiteral = (expressions = [], quasis = []) => ({
    type: "TemplateLiteral",
    expressions,
    quasis,
    span
});
const createTaggedTemplateExpression = (tag, template, typeParameters) => ({
    type: "TaggedTemplateExpression",
    tag,
    typeParameters,
    span,
    template,
});
const createTemplateElement = (raw, cooked, tail = false) => ({
    type: "TemplateElement",
    tail,
    cooked,
    raw,
    span
});
const createParenthesisExpression = (expression) => ({
    type: "ParenthesisExpression",
    expression,
    span
});
const createPrivateName = (id) => ({
    type: "PrivateName",
    id,
    span
});
const createJSXMemberExpression = (object, property) => ({
    type: "JSXMemberExpression",
    object,
    property,
});
const createJSXNamespacedName = (namespace, name) => ({
    type: "JSXNamespacedName",
    namespace,
    name,
});
const createJSXEmptyExpression = () => ({
    type: "JSXEmptyExpression",
    span
});
const createJSXExpressionContainer = (expression) => ({
    type: "JSXExpressionContainer",
    expression,
    span
});
const createJSXSpreadChild = (expression) => ({
    type: "JSXSpreadChild",
    expression,
    span
});
const createJSXOpeningElement = (name, attributes = [], selfClosing = false, typeArguments) => ({
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing,
    typeArguments,
    span
});
const createJSXClosingElement = (name) => ({
    type: "JSXClosingElement",
    name,
    span
});
const createJSXAttribute = (name, value) => ({
    type: "JSXAttribute",
    name,
    value,
    span
});
const createJSXText = (value, raw = JSON.stringify(value)) => ({
    type: "JSXText",
    value,
    raw,
    span
});
const createJSXElement = (opening, children = [], closing) => ({
    type: "JSXElement",
    opening,
    children,
    closing,
    span
});
const createJSXFragment = (opening, children = [], closing) => ({
    type: "JSXFragment",
    opening,
    children,
    closing,
    span
});
const createJSXOpeningFragment = () => ({
    type: "JSXOpeningFragment",
    span
});
const createJSXClosingFragment = () => ({
    type: "JSXClosingFragment",
    span
});
const createExportDefaultExpression = (expression) => ({
    type: "ExportDefaultExpression",
    expression,
    span
});
const createExportDeclaration = (declaration) => ({
    type: "ExportDeclaration",
    declaration,
    span
});
const createImportDeclaration = (specifiers, source, asserts, typeOnly = false) => ({
    type: "ImportDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span
});
const createExportAllDeclaration = (source, asserts) => ({
    type: "ExportAllDeclaration",
    source,
    asserts,
    span
});
const createExportNamedDeclaration = (specifiers, source, asserts, typeOnly = false) => ({
    type: "ExportNamedDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span
});
const createExportDefaultDeclaration = (decl) => ({
    type: "ExportDefaultDeclaration",
    decl,
    span
});
const createImportDefaultSpecifier = (local) => ({
    type: "ImportDefaultSpecifier",
    local,
    span
});
const createImportNamespaceSpecifier = (local) => ({
    type: "ImportNamespaceSpecifier",
    local,
    span
});
const createNamedImportSpecifier = (local, imported, isTypeOnly = false) => ({
    type: "ImportSpecifier",
    local,
    imported,
    isTypeOnly,
    span
});
const createExportNamespaceSpecifier = (name) => ({
    type: "ExportNamespaceSpecifier",
    name,
    span
});
const createExportDefaultSpecifier = (exported) => ({
    type: "ExportDefaultSpecifier",
    exported,
    span
});
const createNamedExportSpecifier = (orig, exported, isTypeOnly = false) => ({
    type: "ExportSpecifier",
    orig,
    span,
    exported,
    isTypeOnly,
});
const createModule = (body = [], interpreter) => ({
    type: "Module",
    body,
    span,
    interpreter
});
const createScript = (body = [], interpreter) => ({
    type: "Script",
    body,
    span,
    interpreter
});
const createArrayPattern = (elements, optional = false, typeAnnotation) => ({
    type: "ArrayPattern",
    elements,
    optional,
    typeAnnotation,
    span
});
const createObjectPattern = (properties, optional = false, typeAnnotation) => ({
    type: "ObjectPattern",
    properties,
    optional,
    typeAnnotation,
    span
});
const createAssignmentPattern = (left, right, typeAnnotation) => ({
    type: "AssignmentPattern",
    left,
    right,
    typeAnnotation,
    span
});
const createRestElement = (argument, rest, typeAnnotation) => ({
    type: "RestElement",
    rest,
    argument,
    typeAnnotation,
    span
});
const createKeyValuePatternProperty = (key, value) => ({
    type: "KeyValuePatternProperty",
    key,
    value,
});
const createAssignmentPatternProperty = (key, value) => ({
    type: "AssignmentPatternProperty",
    key,
    value,
    span
});
const createKeyValueProperty = (key, value) => ({
    type: "KeyValueProperty",
    value,
    key,
});
const createAssignmentProperty = (key, value) => ({
    type: "AssignmentProperty",
    key,
    value,
});
const createGetterProperty = (key, body, typeAnnotation) => ({
    type: "GetterProperty",
    typeAnnotation,
    body,
    key,
    span
});
const createSetterProperty = (key, param, body) => ({
    type: "SetterProperty",
    param,
    body,
    key,
    span
});
const createMethodProperty = (key, params, body, async = false, generator = false, decorators, typeParameters, returnType) => ({
    type: "MethodProperty",
    key,
    span,
    params,
    body,
    async,
    generator,
    decorators,
    typeParameters,
    returnType,
});
const createComputedPropName = (expression) => ({
    type: "Computed",
    expression,
    span
});
const createBlockStatement = (stmts = []) => ({
    type: "BlockStatement",
    stmts,
    span
});
const createExpressionStatement = (expression) => ({
    type: "ExpressionStatement",
    expression,
    span
});
const createEmptyStatement = () => ({
    type: "EmptyStatement",
    span
});
const createDebuggerStatement = () => ({
    type: "DebuggerStatement",
    span
});
const createWithStatement = (object, body) => ({
    type: "WithStatement",
    object,
    body,
    span
});
const createReturnStatement = (argument) => ({
    type: "ReturnStatement",
    argument,
    span
});
const createLabeledStatement = (label, body) => ({
    type: "LabeledStatement",
    label,
    body,
    span
});
const createBreakStatement = (label) => ({
    type: "BreakStatement",
    label,
    span
});
const createContinueStatement = (label) => ({
    type: "ContinueStatement",
    label,
    span
});
const createIfStatement = (test, consequent, alternate) => ({
    type: "IfStatement",
    test,
    consequent,
    alternate,
    span
});
const createSwitchStatement = (discriminant, cases = []) => ({
    type: "SwitchStatement",
    discriminant,
    cases,
    span
});
const createThrowStatement = (argument) => ({
    type: "ThrowStatement",
    argument,
    span
});
const createTryStatement = (block, handler, finalizer) => ({
    type: "TryStatement",
    block,
    handler,
    finalizer,
    span
});
const createWhileStatement = (test, body) => ({
    type: "WhileStatement",
    test,
    body,
    span
});
const createDoWhileStatement = (test, body) => ({
    type: "DoWhileStatement",
    test,
    body,
    span
});
const createForStatement = (body, init, test, update) => ({
    type: "ForStatement",
    init,
    test,
    update,
    body,
    span
});
const createForInStatement = (left, right, body) => ({
    type: "ForInStatement",
    left,
    right,
    body,
    span
});
const createForOfStatement = (left, right, body, _await) => ({
    type: "ForOfStatement",
    await: _await,
    left,
    right,
    body,
    span
});
const createSwitchCase = (test, consequent = []) => ({
    type: "SwitchCase",
    test,
    consequent,
    span
});
const createCatchClause = (body, param) => ({
    type: "CatchClause",
    param,
    body,
    span
});
const createTsTypeAnnotation = (typeAnnotation) => ({
    type: "TsTypeAnnotation",
    typeAnnotation,
    span
});
const createTsTypeParameterDeclaration = (parameters = []) => ({
    type: "TsTypeParameterDeclaration",
    parameters,
    span
});
const createTsTypeParameter = (name, _in, _out, constraint, _default) => ({
    type: "TsTypeParameter",
    name,
    in: _in,
    out: _out,
    constraint,
    default: _default,
    span
});
const createTsTypeParameterInstantiation = (params = []) => ({
    type: "TsTypeParameterInstantiation",
    params,
    span
});
const createTsParameterProperty = (param, accessibility, decorators, override = false, readonly = false) => ({
    type: "TsParameterProperty",
    decorators,
    accessibility,
    override,
    readonly,
    param,
    span
});
const createTsQualifiedName = (left, right) => ({
    type: "TsQualifiedName",
    left,
    right,
});
const createTsCallSignatureDeclaration = (params = [], typeAnnotation, typeParams) => ({
    type: "TsCallSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsConstructSignatureDeclaration = (params = [], typeAnnotation, typeParams) => ({
    type: "TsConstructSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsPropertySignature = (key, params, init, typeAnnotation, typeParams, computed = false, optional = false, readonly = false) => ({
    type: "TsPropertySignature",
    readonly,
    key,
    computed,
    optional,
    init,
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsGetterSignature = (key, typeAnnotation, computed = false, optional = false, readonly = false) => ({
    type: "TsGetterSignature",
    readonly,
    key,
    computed,
    optional,
    typeAnnotation,
    span
});
const createTsSetterSignature = (key, param, computed = false, optional = false, readonly = false) => ({
    type: "TsSetterSignature",
    readonly,
    key,
    computed,
    optional,
    param,
    span
});
const createTsMethodSignature = (key, params, typeAnn, typeParams, computed = false, optional = false, readonly = false) => ({
    type: "TsMethodSignature",
    readonly,
    key,
    computed,
    optional,
    params,
    typeAnn,
    typeParams,
    span
});
const createTsIndexSignature = (params, typeAnnotation, readonly = false, isStatic = false) => ({
    type: "TsIndexSignature",
    params,
    typeAnnotation,
    readonly,
    static: isStatic,
    span
});
const createTsKeywordType = (kind) => ({
    type: "TsKeywordType",
    kind,
    span
});
const createTsThisType = () => ({
    type: "TsThisType",
    span
});
const createTsFunctionType = (params, typeAnnotation, typeParams) => ({
    type: "TsFunctionType",
    params,
    typeParams,
    typeAnnotation,
    span
});
const createTsConstructorType = (params, typeAnnotation, typeParams, isAbstract = false) => ({
    type: "TsConstructorType",
    params,
    typeParams,
    typeAnnotation,
    isAbstract,
    span
});
const createTsTypeReference = (typeName, typeParams) => ({
    type: "TsTypeReference",
    typeName,
    typeParams,
    span
});
const createTsTypePredicate = (paramName, typeAnnotation, asserts = false) => ({
    type: "TsTypePredicate",
    asserts,
    paramName,
    typeAnnotation,
    span
});
const createTsImportType = (argument, qualifier, typeArguments) => ({
    type: "TsImportType",
    argument,
    qualifier,
    typeArguments,
    span
});
const createTsTypeQuery = (exprName, typeArguments) => ({
    type: "TsTypeQuery",
    exprName,
    typeArguments,
    span
});
const createTsTypeLiteral = (members = []) => ({
    type: "TsTypeLiteral",
    members,
    span
});
const createTsArrayType = (elemType) => ({
    type: "TsArrayType",
    elemType,
    span
});
const createTsTupleType = (elemTypes = []) => ({
    type: "TsTupleType",
    elemTypes,
    span
});
const createTsTupleElement = (ty, label) => ({
    type: "TsTupleElement",
    label,
    ty,
    span
});
const createTsOptionalType = (typeAnnotation) => ({
    type: "TsOptionalType",
    typeAnnotation,
    span
});
const createTsRestType = (typeAnnotation) => ({
    type: "TsRestType",
    typeAnnotation,
    span
});
const createTsUnionType = (types = []) => ({
    type: "TsUnionType",
    types,
    span
});
const createTsIntersectionType = (types = []) => ({
    type: "TsIntersectionType",
    types,
    span
});
const createTsConditionalType = (checkType, extendsType, trueType, falseType) => ({
    type: "TsConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
    span
});
const createTsInferType = (typeParam) => ({
    type: "TsInferType",
    typeParam,
    span
});
const createTsParenthesizedType = (typeAnnotation) => ({
    type: "TsParenthesizedType",
    typeAnnotation,
    span
});
const createTsTypeOperator = (op, typeAnnotation) => ({
    type: "TsTypeOperator",
    op,
    typeAnnotation,
    span
});
const createTsIndexedAccessType = (objectType, indexType, readonly = false) => ({
    type: "TsIndexedAccessType",
    readonly,
    objectType,
    indexType,
    span
});
const createTsMappedType = (typeParam, typeAnnotation, nameType, optional, readonly) => ({
    type: "TsMappedType",
    readonly,
    typeParam,
    nameType,
    optional,
    typeAnnotation,
    span
});
const createTsLiteralType = (literal) => ({
    type: "TsLiteralType",
    literal,
    span
});
const createTsTemplateLiteralType = (types = [], quasis = []) => ({
    type: "TemplateLiteral",
    types,
    quasis,
    span
});
const createTsInterfaceDeclaration = (id, body, _extends = [], typeParams, declare = false) => ({
    type: "TsInterfaceDeclaration",
    id,
    declare,
    typeParams,
    extends: _extends,
    body,
    span
});
const createTsInterfaceBody = (body = []) => ({
    type: "TsInterfaceBody",
    body,
    span
});
const createTsExpressionWithTypeArguments = (expression, typeArguments) => ({
    type: "TsExpressionWithTypeArguments",
    expression,
    typeArguments,
    span
});
const createTsTypeAliasDeclaration = (id, typeAnnotation, typeParams, declare = false) => ({
    type: "TsTypeAliasDeclaration",
    declare,
    id,
    typeParams,
    typeAnnotation,
    span
});
const createTsEnumDeclaration = (id, members = [], declare = false, isConst = false) => ({
    type: "TsEnumDeclaration",
    declare,
    isConst,
    id,
    members,
    span
});
const createTsEnumMember = (id, init) => ({
    type: "TsEnumMember",
    id,
    init,
    span
});
const createTsModuleDeclaration = (id, body, declare = false, global = false) => ({
    type: "TsModuleDeclaration",
    declare,
    global,
    id,
    body,
    span,
});
const createTsModuleBlock = (body) => ({
    type: "TsModuleBlock",
    body,
    span,
});
const createTsNamespaceDeclaration = (id, body, declare = false, global = false) => ({
    type: "TsNamespaceDeclaration",
    declare,
    global,
    id,
    body,
    span
});
const createTsImportEqualsDeclaration = (id, moduleRef, declare = false, isExport = false, isTypeOnly = false) => ({
    type: "TsImportEqualsDeclaration",
    declare,
    isExport,
    isTypeOnly,
    id,
    moduleRef,
    span
});
const createTsExternalModuleReference = (expression) => ({
    type: "TsExternalModuleReference",
    expression,
    span
});
const createTsExportAssignment = (expression) => ({
    type: "TsExportAssignment",
    expression,
    span
});
const createTsNamespaceExportDeclaration = (id) => ({
    type: "TsNamespaceExportDeclaration",
    id,
    span
});
const createTsAsExpression = (expression, typeAnnotation) => ({
    type: "TsAsExpression",
    expression,
    typeAnnotation,
    span,
});
// TODO: change type to TsSatisfiesExpression when swc support this
const createTsSatisfiesExpression = (expression, typeAnnotation) => ({
    type: "TsSatisfiesExpression",
    expression,
    typeAnnotation,
    span,
});
const createTsInstantiation = (expression, typeArguments) => ({
    type: "TsInstantiation",
    expression,
    typeArguments,
    span
});
const createTsTypeAssertion = (expression, typeAnnotation) => ({
    type: "TsTypeAssertion",
    expression,
    typeAnnotation,
    span,
});
const createTsConstAssertion = (expression) => ({
    type: "TsConstAssertion",
    expression,
    span,
});
const createTsNonNullExpression = (expression) => ({
    type: "TsNonNullExpression",
    expression,
    span
});
const createInvalid = () => ({
    type: "Invalid",
    span
});

export { createArgument, createArrayExpression, createArrayPattern, createArrowFunctionExpression, createAssignmentExpression, createAssignmentPattern, createAssignmentPatternProperty, createAssignmentProperty, createAwaitExpression, createBigIntLiteral, createBinaryExpression, createBlockStatement, createBooleanLiteral, createBreakStatement, createCallExpression, createCatchClause, createClassDeclaration, createClassExpression, createClassMethod, createClassProperty, createComputedPropName, createConditionalExpression, createConstructor, createContinueStatement, createDebuggerStatement, createDecorator, createDoWhileStatement, createEmptyStatement, createExportAllDeclaration, createExportDeclaration, createExportDefaultDeclaration, createExportDefaultExpression, createExportDefaultSpecifier, createExportNamedDeclaration, createExportNamespaceSpecifier, createExprOrSpread, createExpressionStatement, createForInStatement, createForOfStatement, createForStatement, createFunctionDeclaration, createFunctionExpression, createGetterProperty, createIdentifier, createIfStatement, createImport, createImportDeclaration, createImportDefaultSpecifier, createImportNamespaceSpecifier, createInvalid, createJSXAttribute, createJSXClosingElement, createJSXClosingFragment, createJSXElement, createJSXEmptyExpression, createJSXExpressionContainer, createJSXFragment, createJSXMemberExpression, createJSXNamespacedName, createJSXOpeningElement, createJSXOpeningFragment, createJSXSpreadChild, createJSXText, createKeyValuePatternProperty, createKeyValueProperty, createLabeledStatement, createMemberExpression, createMetaProperty, createMethodProperty, createModule, createNamedExportSpecifier, createNamedImportSpecifier, createNewExpression, createNullLiteral, createNumericLiteral, createObjectExpression, createObjectPattern, createOptionalChainingCall, createOptionalChainingExpression, createParam, createParenthesisExpression, createPrivateMethod, createPrivateName, createPrivateProperty, createRegExpLiteral, createRestElement, createReturnStatement, createScript, createSequenceExpression, createSetterProperty, createSpreadElement, createStaticBlock, createStringLiteral, createSuper, createSuperPropExpression, createSwitchCase, createSwitchStatement, createTaggedTemplateExpression, createTemplateElement, createTemplateLiteral, createThisExpression, createThrowStatement, createTryStatement, createTsArrayType, createTsAsExpression, createTsCallSignatureDeclaration, createTsConditionalType, createTsConstAssertion, createTsConstructSignatureDeclaration, createTsConstructorType, createTsEnumDeclaration, createTsEnumMember, createTsExportAssignment, createTsExpressionWithTypeArguments, createTsExternalModuleReference, createTsFunctionType, createTsGetterSignature, createTsImportEqualsDeclaration, createTsImportType, createTsIndexSignature, createTsIndexedAccessType, createTsInferType, createTsInstantiation, createTsInterfaceBody, createTsInterfaceDeclaration, createTsIntersectionType, createTsKeywordType, createTsLiteralType, createTsMappedType, createTsMethodSignature, createTsModuleBlock, createTsModuleDeclaration, createTsNamespaceDeclaration, createTsNamespaceExportDeclaration, createTsNonNullExpression, createTsOptionalType, createTsParameterProperty, createTsParenthesizedType, createTsPropertySignature, createTsQualifiedName, createTsRestType, createTsSatisfiesExpression, createTsSetterSignature, createTsTemplateLiteralType, createTsThisType, createTsTupleElement, createTsTupleType, createTsTypeAliasDeclaration, createTsTypeAnnotation, createTsTypeAssertion, createTsTypeLiteral, createTsTypeOperator, createTsTypeParameter, createTsTypeParameterDeclaration, createTsTypeParameterInstantiation, createTsTypePredicate, createTsTypeQuery, createTsTypeReference, createTsUnionType, createUnaryExpression, createUpdateExpression, createVariableDeclaration, createVariableDeclarator, createWhileStatement, createWithStatement, createYieldExpression };
