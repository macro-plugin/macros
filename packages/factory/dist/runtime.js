'use strict';

var core = require('@macro-plugin/core');

const createIdentifier = (value, optional = false) => ({
    type: "Identifier",
    value,
    optional,
    span: core.span,
});
const createStringLiteral = (value, raw) => ({
    type: "StringLiteral",
    value,
    raw,
    span: core.span
});
const createNumericLiteral = (value, raw) => ({
    type: "NumericLiteral",
    value,
    raw,
    span: core.span
});
const createBigIntLiteral = (value, raw) => ({
    type: "BigIntLiteral",
    value,
    raw,
    span: core.span
});
const createBooleanLiteral = (value) => ({
    type: "BooleanLiteral",
    value,
    span: core.span
});
const createNullLiteral = () => ({
    type: "NullLiteral",
    span: core.span
});
const createRegExpLiteral = (pattern, flags) => ({
    type: "RegExpLiteral",
    pattern,
    flags,
    span: core.span
});
const createArgument = (expression, spread = false) => ({
    spread: spread ? core.span : undefined,
    expression
});
const createCallExpression = (callee, args = [], typeArguments) => ({
    type: "CallExpression",
    span: core.span,
    callee,
    arguments: args,
    typeArguments
});
const createClassProperty = (key, value, accessibility, typeAnnotation, decorators, declare = false, definite = false, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, readonly = false) => ({
    type: "ClassProperty",
    span: core.span,
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
    span: core.span,
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
    span: core.span
});
const createConstructor = (key, params, body, accessibility, isOptional = false) => ({
    type: "Constructor",
    key,
    params,
    body,
    span: core.span,
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
    span: core.span
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
    span: core.span
});
const createStaticBlock = (body) => ({
    type: "StaticBlock",
    body,
    span: core.span
});
const createDecorator = (expression) => ({
    type: "Decorator",
    expression,
    span: core.span
});
const createFunctionDeclaration = (identifier, params, body, typeParameters, returnType, decorators, declare = false, async = false, generator = false) => ({
    type: "FunctionDeclaration",
    span: core.span,
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
    span: core.span,
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
    span: core.span,
});
const createVariableDeclarator = (id, init, definite = false) => ({
    type: "VariableDeclarator",
    id,
    definite,
    init,
    span: core.span
});
const createOptionalChainingExpression = (base) => ({
    type: "OptionalChainingExpression",
    questionDotToken: core.span,
    base,
    span: core.span
});
const createOptionalChainingCall = (callee, args = [], typeArguments) => ({
    type: "CallExpression",
    callee,
    arguments: args,
    typeArguments,
    span: core.span
});
const createThisExpression = () => ({
    type: "ThisExpression",
    span: core.span
});
const createArrayExpression = (elements = []) => ({
    type: "ArrayExpression",
    elements,
    span: core.span
});
const createExprOrSpread = (expression, spread = false) => ({
    spread: spread ? core.span : undefined,
    expression,
});
const createObjectExpression = (properties = []) => ({
    type: "ObjectExpression",
    properties,
    span: core.span
});
const createSpreadElement = (args) => ({
    type: "SpreadElement",
    spread: core.span,
    arguments: args,
});
const createUnaryExpression = (operator, argument) => ({
    type: "UnaryExpression",
    span: core.span,
    operator,
    argument
});
const createUpdateExpression = (operator, argument, prefix = false) => ({
    type: "UpdateExpression",
    operator,
    prefix,
    argument,
    span: core.span
});
const createBinaryExpression = (left, operator, right) => ({
    type: "BinaryExpression",
    operator,
    left,
    right,
    span: core.span
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
    span: core.span
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
    span: core.span
});
const createAssignmentExpression = (left, operator, right) => ({
    type: "AssignmentExpression",
    operator,
    left,
    right,
    span: core.span
});
const createMemberExpression = (object, property) => ({
    type: "MemberExpression",
    object,
    property,
    span: core.span
});
const createSuperPropExpression = (obj, property) => ({
    type: "SuperPropExpression",
    obj,
    property,
    span: core.span
});
const createConditionalExpression = (test, consequent, alternate) => ({
    type: "ConditionalExpression",
    test,
    consequent,
    alternate,
    span: core.span
});
const createSuper = () => ({
    type: "Super",
    span: core.span
});
const createImport = () => ({
    type: "Import",
    span: core.span
});
const createNewExpression = (callee, args, typeArguments) => ({
    type: "NewExpression",
    callee,
    arguments: args,
    typeArguments,
    span: core.span
});
const createSequenceExpression = (expressions) => ({
    type: "SequenceExpression",
    expressions,
    span: core.span
});
const createArrowFunctionExpression = (params, body, async = false, generator = false, typeParameters, returnType) => ({
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    generator,
    typeParameters,
    span: core.span,
    returnType,
});
const createYieldExpression = (argument, delegate = false) => ({
    type: "YieldExpression",
    argument,
    delegate,
    span: core.span
});
const createMetaProperty = (kind) => ({
    type: "MetaProperty",
    kind,
    span: core.span
});
const createAwaitExpression = (argument) => ({
    type: "AwaitExpression",
    argument,
    span: core.span
});
const createTemplateLiteral = (expressions = [], quasis = []) => ({
    type: "TemplateLiteral",
    expressions,
    quasis,
    span: core.span
});
const createTaggedTemplateExpression = (tag, template, typeParameters) => ({
    type: "TaggedTemplateExpression",
    tag,
    typeParameters,
    span: core.span,
    template,
});
const createTemplateElement = (raw, cooked, tail = false) => ({
    type: "TemplateElement",
    tail,
    cooked,
    raw,
    span: core.span
});
const createParenthesisExpression = (expression) => ({
    type: "ParenthesisExpression",
    expression,
    span: core.span
});
const createPrivateName = (id) => ({
    type: "PrivateName",
    id,
    span: core.span
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
    span: core.span
});
const createJSXExpressionContainer = (expression) => ({
    type: "JSXExpressionContainer",
    expression,
    span: core.span
});
const createJSXSpreadChild = (expression) => ({
    type: "JSXSpreadChild",
    expression,
    span: core.span
});
const createJSXOpeningElement = (name, attributes = [], selfClosing = false, typeArguments) => ({
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing,
    typeArguments,
    span: core.span
});
const createJSXClosingElement = (name) => ({
    type: "JSXClosingElement",
    name,
    span: core.span
});
const createJSXAttribute = (name, value) => ({
    type: "JSXAttribute",
    name,
    value,
    span: core.span
});
const createJSXText = (value, raw = JSON.stringify(value)) => ({
    type: "JSXText",
    value,
    raw,
    span: core.span
});
const createJSXElement = (opening, children = [], closing) => ({
    type: "JSXElement",
    opening,
    children,
    closing,
    span: core.span
});
const createJSXFragment = (opening, children = [], closing) => ({
    type: "JSXFragment",
    opening,
    children,
    closing,
    span: core.span
});
const createJSXOpeningFragment = () => ({
    type: "JSXOpeningFragment",
    span: core.span
});
const createJSXClosingFragment = () => ({
    type: "JSXClosingFragment",
    span: core.span
});
const createExportDefaultExpression = (expression) => ({
    type: "ExportDefaultExpression",
    expression,
    span: core.span
});
const createExportDeclaration = (declaration) => ({
    type: "ExportDeclaration",
    declaration,
    span: core.span
});
const createImportDeclaration = (specifiers, source, asserts, typeOnly = false) => ({
    type: "ImportDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span: core.span
});
const createExportAllDeclaration = (source, asserts) => ({
    type: "ExportAllDeclaration",
    source,
    asserts,
    span: core.span
});
const createExportNamedDeclaration = (specifiers, source, asserts, typeOnly = false) => ({
    type: "ExportNamedDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span: core.span
});
const createExportDefaultDeclaration = (decl) => ({
    type: "ExportDefaultDeclaration",
    decl,
    span: core.span
});
const createImportDefaultSpecifier = (local) => ({
    type: "ImportDefaultSpecifier",
    local,
    span: core.span
});
const createImportNamespaceSpecifier = (local) => ({
    type: "ImportNamespaceSpecifier",
    local,
    span: core.span
});
const createNamedImportSpecifier = (local, imported, isTypeOnly = false) => ({
    type: "ImportSpecifier",
    local,
    imported,
    isTypeOnly,
    span: core.span
});
const createExportNamespaceSpecifier = (name) => ({
    type: "ExportNamespaceSpecifier",
    name,
    span: core.span
});
const createExportDefaultSpecifier = (exported) => ({
    type: "ExportDefaultSpecifier",
    exported,
    span: core.span
});
const createNamedExportSpecifier = (orig, exported, isTypeOnly = false) => ({
    type: "ExportSpecifier",
    orig,
    span: core.span,
    exported,
    isTypeOnly,
});
const createModule = (body = [], interpreter) => ({
    type: "Module",
    body,
    span: core.span,
    interpreter
});
const createScript = (body = [], interpreter) => ({
    type: "Script",
    body,
    span: core.span,
    interpreter
});
const createArrayPattern = (elements, optional = false, typeAnnotation) => ({
    type: "ArrayPattern",
    elements,
    optional,
    typeAnnotation,
    span: core.span
});
const createObjectPattern = (properties, optional = false, typeAnnotation) => ({
    type: "ObjectPattern",
    properties,
    optional,
    typeAnnotation,
    span: core.span
});
const createAssignmentPattern = (left, right, typeAnnotation) => ({
    type: "AssignmentPattern",
    left,
    right,
    typeAnnotation,
    span: core.span
});
const createRestElement = (argument, rest, typeAnnotation) => ({
    type: "RestElement",
    rest,
    argument,
    typeAnnotation,
    span: core.span
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
    span: core.span
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
    span: core.span
});
const createSetterProperty = (key, param, body) => ({
    type: "SetterProperty",
    param,
    body,
    key,
    span: core.span
});
const createMethodProperty = (key, params, body, async = false, generator = false, decorators, typeParameters, returnType) => ({
    type: "MethodProperty",
    key,
    span: core.span,
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
    span: core.span
});
const createBlockStatement = (stmts = []) => ({
    type: "BlockStatement",
    stmts,
    span: core.span
});
const createExpressionStatement = (expression) => ({
    type: "ExpressionStatement",
    expression,
    span: core.span
});
const createEmptyStatement = () => ({
    type: "EmptyStatement",
    span: core.span
});
const createDebuggerStatement = () => ({
    type: "DebuggerStatement",
    span: core.span
});
const createWithStatement = (object, body) => ({
    type: "WithStatement",
    object,
    body,
    span: core.span
});
const createReturnStatement = (argument) => ({
    type: "ReturnStatement",
    argument,
    span: core.span
});
const createLabeledStatement = (label, body) => ({
    type: "LabeledStatement",
    label,
    body,
    span: core.span
});
const createBreakStatement = (label) => ({
    type: "BreakStatement",
    label,
    span: core.span
});
const createContinueStatement = (label) => ({
    type: "ContinueStatement",
    label,
    span: core.span
});
const createIfStatement = (test, consequent, alternate) => ({
    type: "IfStatement",
    test,
    consequent,
    alternate,
    span: core.span
});
const createSwitchStatement = (discriminant, cases = []) => ({
    type: "SwitchStatement",
    discriminant,
    cases,
    span: core.span
});
const createThrowStatement = (argument) => ({
    type: "ThrowStatement",
    argument,
    span: core.span
});
const createTryStatement = (block, handler, finalizer) => ({
    type: "TryStatement",
    block,
    handler,
    finalizer,
    span: core.span
});
const createWhileStatement = (test, body) => ({
    type: "WhileStatement",
    test,
    body,
    span: core.span
});
const createDoWhileStatement = (test, body) => ({
    type: "DoWhileStatement",
    test,
    body,
    span: core.span
});
const createForStatement = (body, init, test, update) => ({
    type: "ForStatement",
    init,
    test,
    update,
    body,
    span: core.span
});
const createForInStatement = (left, right, body) => ({
    type: "ForInStatement",
    left,
    right,
    body,
    span: core.span
});
const createForOfStatement = (left, right, body, _await) => ({
    type: "ForOfStatement",
    await: _await,
    left,
    right,
    body,
    span: core.span
});
const createSwitchCase = (test, consequent = []) => ({
    type: "SwitchCase",
    test,
    consequent,
    span: core.span
});
const createCatchClause = (body, param) => ({
    type: "CatchClause",
    param,
    body,
    span: core.span
});
const createTsTypeAnnotation = (typeAnnotation) => ({
    type: "TsTypeAnnotation",
    typeAnnotation,
    span: core.span
});
const createTsTypeParameterDeclaration = (parameters = []) => ({
    type: "TsTypeParameterDeclaration",
    parameters,
    span: core.span
});
const createTsTypeParameter = (name, _in, _out, constraint, _default) => ({
    type: "TsTypeParameter",
    name,
    in: _in,
    out: _out,
    constraint,
    default: _default,
    span: core.span
});
const createTsTypeParameterInstantiation = (params = []) => ({
    type: "TsTypeParameterInstantiation",
    params,
    span: core.span
});
const createTsParameterProperty = (param, accessibility, decorators, override = false, readonly = false) => ({
    type: "TsParameterProperty",
    decorators,
    accessibility,
    override,
    readonly,
    param,
    span: core.span
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
    span: core.span
});
const createTsConstructSignatureDeclaration = (params = [], typeAnnotation, typeParams) => ({
    type: "TsConstructSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span: core.span
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
    span: core.span
});
const createTsGetterSignature = (key, typeAnnotation, computed = false, optional = false, readonly = false) => ({
    type: "TsGetterSignature",
    readonly,
    key,
    computed,
    optional,
    typeAnnotation,
    span: core.span
});
const createTsSetterSignature = (key, param, computed = false, optional = false, readonly = false) => ({
    type: "TsSetterSignature",
    readonly,
    key,
    computed,
    optional,
    param,
    span: core.span
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
    span: core.span
});
const createTsIndexSignature = (params, typeAnnotation, readonly = false, isStatic = false) => ({
    type: "TsIndexSignature",
    params,
    typeAnnotation,
    readonly,
    static: isStatic,
    span: core.span
});
const createTsKeywordType = (kind) => ({
    type: "TsKeywordType",
    kind,
    span: core.span
});
const createTsThisType = () => ({
    type: "TsThisType",
    span: core.span
});
const createTsFunctionType = (params, typeAnnotation, typeParams) => ({
    type: "TsFunctionType",
    params,
    typeParams,
    typeAnnotation,
    span: core.span
});
const createTsConstructorType = (params, typeAnnotation, typeParams, isAbstract = false) => ({
    type: "TsConstructorType",
    params,
    typeParams,
    typeAnnotation,
    isAbstract,
    span: core.span
});
const createTsTypeReference = (typeName, typeParams) => ({
    type: "TsTypeReference",
    typeName,
    typeParams,
    span: core.span
});
const createTsTypePredicate = (paramName, typeAnnotation, asserts = false) => ({
    type: "TsTypePredicate",
    asserts,
    paramName,
    typeAnnotation,
    span: core.span
});
const createTsImportType = (argument, qualifier, typeArguments) => ({
    type: "TsImportType",
    argument,
    qualifier,
    typeArguments,
    span: core.span
});
const createTsTypeQuery = (exprName, typeArguments) => ({
    type: "TsTypeQuery",
    exprName,
    typeArguments,
    span: core.span
});
const createTsTypeLiteral = (members = []) => ({
    type: "TsTypeLiteral",
    members,
    span: core.span
});
const createTsArrayType = (elemType) => ({
    type: "TsArrayType",
    elemType,
    span: core.span
});
const createTsTupleType = (elemTypes = []) => ({
    type: "TsTupleType",
    elemTypes,
    span: core.span
});
const createTsTupleElement = (ty, label) => ({
    type: "TsTupleElement",
    label,
    ty,
    span: core.span
});
const createTsOptionalType = (typeAnnotation) => ({
    type: "TsOptionalType",
    typeAnnotation,
    span: core.span
});
const createTsRestType = (typeAnnotation) => ({
    type: "TsRestType",
    typeAnnotation,
    span: core.span
});
const createTsUnionType = (types = []) => ({
    type: "TsUnionType",
    types,
    span: core.span
});
const createTsIntersectionType = (types = []) => ({
    type: "TsIntersectionType",
    types,
    span: core.span
});
const createTsConditionalType = (checkType, extendsType, trueType, falseType) => ({
    type: "TsConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
    span: core.span
});
const createTsInferType = (typeParam) => ({
    type: "TsInferType",
    typeParam,
    span: core.span
});
const createTsParenthesizedType = (typeAnnotation) => ({
    type: "TsParenthesizedType",
    typeAnnotation,
    span: core.span
});
const createTsTypeOperator = (op, typeAnnotation) => ({
    type: "TsTypeOperator",
    op,
    typeAnnotation,
    span: core.span
});
const createTsIndexedAccessType = (objectType, indexType, readonly = false) => ({
    type: "TsIndexedAccessType",
    readonly,
    objectType,
    indexType,
    span: core.span
});
const createTsMappedType = (typeParam, typeAnnotation, nameType, optional, readonly) => ({
    type: "TsMappedType",
    readonly,
    typeParam,
    nameType,
    optional,
    typeAnnotation,
    span: core.span
});
const createTsLiteralType = (literal) => ({
    type: "TsLiteralType",
    literal,
    span: core.span
});
const createTsTemplateLiteralType = (types = [], quasis = []) => ({
    type: "TemplateLiteral",
    types,
    quasis,
    span: core.span
});
const createTsInterfaceDeclaration = (id, body, _extends = [], typeParams, declare = false) => ({
    type: "TsInterfaceDeclaration",
    id,
    declare,
    typeParams,
    extends: _extends,
    body,
    span: core.span
});
const createTsInterfaceBody = (body = []) => ({
    type: "TsInterfaceBody",
    body,
    span: core.span
});
const createTsExpressionWithTypeArguments = (expression, typeArguments) => ({
    type: "TsExpressionWithTypeArguments",
    expression,
    typeArguments,
    span: core.span
});
const createTsTypeAliasDeclaration = (id, typeAnnotation, typeParams, declare = false) => ({
    type: "TsTypeAliasDeclaration",
    declare,
    id,
    typeParams,
    typeAnnotation,
    span: core.span
});
const createTsEnumDeclaration = (id, members = [], declare = false, isConst = false) => ({
    type: "TsEnumDeclaration",
    declare,
    isConst,
    id,
    members,
    span: core.span
});
const createTsEnumMember = (id, init) => ({
    type: "TsEnumMember",
    id,
    init,
    span: core.span
});
const createTsModuleDeclaration = (id, body, declare = false, global = false) => ({
    type: "TsModuleDeclaration",
    declare,
    global,
    id,
    body,
    span: core.span,
});
const createTsModuleBlock = (body) => ({
    type: "TsModuleBlock",
    body,
    span: core.span,
});
const createTsNamespaceDeclaration = (id, body, declare = false, global = false) => ({
    type: "TsNamespaceDeclaration",
    declare,
    global,
    id,
    body,
    span: core.span
});
const createTsImportEqualsDeclaration = (id, moduleRef, declare = false, isExport = false, isTypeOnly = false) => ({
    type: "TsImportEqualsDeclaration",
    declare,
    isExport,
    isTypeOnly,
    id,
    moduleRef,
    span: core.span
});
const createTsExternalModuleReference = (expression) => ({
    type: "TsExternalModuleReference",
    expression,
    span: core.span
});
const createTsExportAssignment = (expression) => ({
    type: "TsExportAssignment",
    expression,
    span: core.span
});
const createTsNamespaceExportDeclaration = (id) => ({
    type: "TsNamespaceExportDeclaration",
    id,
    span: core.span
});
const createTsAsExpression = (expression, typeAnnotation) => ({
    type: "TsAsExpression",
    expression,
    typeAnnotation,
    span: core.span,
});
// TODO: change type to TsSatisfiesExpression when swc support this
const createTsSatisfiesExpression = (expression, typeAnnotation) => ({
    type: "TsSatisfiesExpression",
    expression,
    typeAnnotation,
    span: core.span,
});
const createTsInstantiation = (expression, typeArguments) => ({
    type: "TsInstantiation",
    expression,
    typeArguments,
    span: core.span
});
const createTsTypeAssertion = (expression, typeAnnotation) => ({
    type: "TsTypeAssertion",
    expression,
    typeAnnotation,
    span: core.span,
});
const createTsConstAssertion = (expression) => ({
    type: "TsConstAssertion",
    expression,
    span: core.span,
});
const createTsNonNullExpression = (expression) => ({
    type: "TsNonNullExpression",
    expression,
    span: core.span
});
const createInvalid = () => ({
    type: "Invalid",
    span: core.span
});

exports.createArgument = createArgument;
exports.createArrayExpression = createArrayExpression;
exports.createArrayPattern = createArrayPattern;
exports.createArrowFunctionExpression = createArrowFunctionExpression;
exports.createAssignmentExpression = createAssignmentExpression;
exports.createAssignmentPattern = createAssignmentPattern;
exports.createAssignmentPatternProperty = createAssignmentPatternProperty;
exports.createAssignmentProperty = createAssignmentProperty;
exports.createAwaitExpression = createAwaitExpression;
exports.createBigIntLiteral = createBigIntLiteral;
exports.createBinaryExpression = createBinaryExpression;
exports.createBlockStatement = createBlockStatement;
exports.createBooleanLiteral = createBooleanLiteral;
exports.createBreakStatement = createBreakStatement;
exports.createCallExpression = createCallExpression;
exports.createCatchClause = createCatchClause;
exports.createClassDeclaration = createClassDeclaration;
exports.createClassExpression = createClassExpression;
exports.createClassMethod = createClassMethod;
exports.createClassProperty = createClassProperty;
exports.createComputedPropName = createComputedPropName;
exports.createConditionalExpression = createConditionalExpression;
exports.createConstructor = createConstructor;
exports.createContinueStatement = createContinueStatement;
exports.createDebuggerStatement = createDebuggerStatement;
exports.createDecorator = createDecorator;
exports.createDoWhileStatement = createDoWhileStatement;
exports.createEmptyStatement = createEmptyStatement;
exports.createExportAllDeclaration = createExportAllDeclaration;
exports.createExportDeclaration = createExportDeclaration;
exports.createExportDefaultDeclaration = createExportDefaultDeclaration;
exports.createExportDefaultExpression = createExportDefaultExpression;
exports.createExportDefaultSpecifier = createExportDefaultSpecifier;
exports.createExportNamedDeclaration = createExportNamedDeclaration;
exports.createExportNamespaceSpecifier = createExportNamespaceSpecifier;
exports.createExprOrSpread = createExprOrSpread;
exports.createExpressionStatement = createExpressionStatement;
exports.createForInStatement = createForInStatement;
exports.createForOfStatement = createForOfStatement;
exports.createForStatement = createForStatement;
exports.createFunctionDeclaration = createFunctionDeclaration;
exports.createFunctionExpression = createFunctionExpression;
exports.createGetterProperty = createGetterProperty;
exports.createIdentifier = createIdentifier;
exports.createIfStatement = createIfStatement;
exports.createImport = createImport;
exports.createImportDeclaration = createImportDeclaration;
exports.createImportDefaultSpecifier = createImportDefaultSpecifier;
exports.createImportNamespaceSpecifier = createImportNamespaceSpecifier;
exports.createInvalid = createInvalid;
exports.createJSXAttribute = createJSXAttribute;
exports.createJSXClosingElement = createJSXClosingElement;
exports.createJSXClosingFragment = createJSXClosingFragment;
exports.createJSXElement = createJSXElement;
exports.createJSXEmptyExpression = createJSXEmptyExpression;
exports.createJSXExpressionContainer = createJSXExpressionContainer;
exports.createJSXFragment = createJSXFragment;
exports.createJSXMemberExpression = createJSXMemberExpression;
exports.createJSXNamespacedName = createJSXNamespacedName;
exports.createJSXOpeningElement = createJSXOpeningElement;
exports.createJSXOpeningFragment = createJSXOpeningFragment;
exports.createJSXSpreadChild = createJSXSpreadChild;
exports.createJSXText = createJSXText;
exports.createKeyValuePatternProperty = createKeyValuePatternProperty;
exports.createKeyValueProperty = createKeyValueProperty;
exports.createLabeledStatement = createLabeledStatement;
exports.createMemberExpression = createMemberExpression;
exports.createMetaProperty = createMetaProperty;
exports.createMethodProperty = createMethodProperty;
exports.createModule = createModule;
exports.createNamedExportSpecifier = createNamedExportSpecifier;
exports.createNamedImportSpecifier = createNamedImportSpecifier;
exports.createNewExpression = createNewExpression;
exports.createNullLiteral = createNullLiteral;
exports.createNumericLiteral = createNumericLiteral;
exports.createObjectExpression = createObjectExpression;
exports.createObjectPattern = createObjectPattern;
exports.createOptionalChainingCall = createOptionalChainingCall;
exports.createOptionalChainingExpression = createOptionalChainingExpression;
exports.createParam = createParam;
exports.createParenthesisExpression = createParenthesisExpression;
exports.createPrivateMethod = createPrivateMethod;
exports.createPrivateName = createPrivateName;
exports.createPrivateProperty = createPrivateProperty;
exports.createRegExpLiteral = createRegExpLiteral;
exports.createRestElement = createRestElement;
exports.createReturnStatement = createReturnStatement;
exports.createScript = createScript;
exports.createSequenceExpression = createSequenceExpression;
exports.createSetterProperty = createSetterProperty;
exports.createSpreadElement = createSpreadElement;
exports.createStaticBlock = createStaticBlock;
exports.createStringLiteral = createStringLiteral;
exports.createSuper = createSuper;
exports.createSuperPropExpression = createSuperPropExpression;
exports.createSwitchCase = createSwitchCase;
exports.createSwitchStatement = createSwitchStatement;
exports.createTaggedTemplateExpression = createTaggedTemplateExpression;
exports.createTemplateElement = createTemplateElement;
exports.createTemplateLiteral = createTemplateLiteral;
exports.createThisExpression = createThisExpression;
exports.createThrowStatement = createThrowStatement;
exports.createTryStatement = createTryStatement;
exports.createTsArrayType = createTsArrayType;
exports.createTsAsExpression = createTsAsExpression;
exports.createTsCallSignatureDeclaration = createTsCallSignatureDeclaration;
exports.createTsConditionalType = createTsConditionalType;
exports.createTsConstAssertion = createTsConstAssertion;
exports.createTsConstructSignatureDeclaration = createTsConstructSignatureDeclaration;
exports.createTsConstructorType = createTsConstructorType;
exports.createTsEnumDeclaration = createTsEnumDeclaration;
exports.createTsEnumMember = createTsEnumMember;
exports.createTsExportAssignment = createTsExportAssignment;
exports.createTsExpressionWithTypeArguments = createTsExpressionWithTypeArguments;
exports.createTsExternalModuleReference = createTsExternalModuleReference;
exports.createTsFunctionType = createTsFunctionType;
exports.createTsGetterSignature = createTsGetterSignature;
exports.createTsImportEqualsDeclaration = createTsImportEqualsDeclaration;
exports.createTsImportType = createTsImportType;
exports.createTsIndexSignature = createTsIndexSignature;
exports.createTsIndexedAccessType = createTsIndexedAccessType;
exports.createTsInferType = createTsInferType;
exports.createTsInstantiation = createTsInstantiation;
exports.createTsInterfaceBody = createTsInterfaceBody;
exports.createTsInterfaceDeclaration = createTsInterfaceDeclaration;
exports.createTsIntersectionType = createTsIntersectionType;
exports.createTsKeywordType = createTsKeywordType;
exports.createTsLiteralType = createTsLiteralType;
exports.createTsMappedType = createTsMappedType;
exports.createTsMethodSignature = createTsMethodSignature;
exports.createTsModuleBlock = createTsModuleBlock;
exports.createTsModuleDeclaration = createTsModuleDeclaration;
exports.createTsNamespaceDeclaration = createTsNamespaceDeclaration;
exports.createTsNamespaceExportDeclaration = createTsNamespaceExportDeclaration;
exports.createTsNonNullExpression = createTsNonNullExpression;
exports.createTsOptionalType = createTsOptionalType;
exports.createTsParameterProperty = createTsParameterProperty;
exports.createTsParenthesizedType = createTsParenthesizedType;
exports.createTsPropertySignature = createTsPropertySignature;
exports.createTsQualifiedName = createTsQualifiedName;
exports.createTsRestType = createTsRestType;
exports.createTsSatisfiesExpression = createTsSatisfiesExpression;
exports.createTsSetterSignature = createTsSetterSignature;
exports.createTsTemplateLiteralType = createTsTemplateLiteralType;
exports.createTsThisType = createTsThisType;
exports.createTsTupleElement = createTsTupleElement;
exports.createTsTupleType = createTsTupleType;
exports.createTsTypeAliasDeclaration = createTsTypeAliasDeclaration;
exports.createTsTypeAnnotation = createTsTypeAnnotation;
exports.createTsTypeAssertion = createTsTypeAssertion;
exports.createTsTypeLiteral = createTsTypeLiteral;
exports.createTsTypeOperator = createTsTypeOperator;
exports.createTsTypeParameter = createTsTypeParameter;
exports.createTsTypeParameterDeclaration = createTsTypeParameterDeclaration;
exports.createTsTypeParameterInstantiation = createTsTypeParameterInstantiation;
exports.createTsTypePredicate = createTsTypePredicate;
exports.createTsTypeQuery = createTsTypeQuery;
exports.createTsTypeReference = createTsTypeReference;
exports.createTsUnionType = createTsUnionType;
exports.createUnaryExpression = createUnaryExpression;
exports.createUpdateExpression = createUpdateExpression;
exports.createVariableDeclaration = createVariableDeclaration;
exports.createVariableDeclarator = createVariableDeclarator;
exports.createWhileStatement = createWhileStatement;
exports.createWithStatement = createWithStatement;
exports.createYieldExpression = createYieldExpression;
