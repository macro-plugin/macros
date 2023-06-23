'use strict';

var core = require('@macro-plugin/core');

const createSpan = (start = 0, end = 0, ctxt = 0) => ({
    start,
    end,
    ctxt
});
const createIdentifier = (value, optional = false, span = core.dummySpan) => ({
    type: "Identifier",
    value,
    optional,
    span,
});
const createStringLiteral = (value, raw, span = core.dummySpan) => ({
    type: "StringLiteral",
    value,
    raw,
    span
});
const createNumericLiteral = (value, raw, span = core.dummySpan) => ({
    type: "NumericLiteral",
    value,
    raw,
    span
});
const createBigIntLiteral = (value, raw, span = core.dummySpan) => ({
    type: "BigIntLiteral",
    value,
    raw,
    span
});
const createBooleanLiteral = (value, span = core.dummySpan) => ({
    type: "BooleanLiteral",
    value,
    span
});
const createNullLiteral = (span = core.dummySpan) => ({
    type: "NullLiteral",
    span
});
const createRegExpLiteral = (pattern, flags, span = core.dummySpan) => ({
    type: "RegExpLiteral",
    pattern,
    flags,
    span
});
const createArgument = (expression, spread) => ({
    spread,
    expression
});
const createCallExpression = (callee, args = [], typeArguments, span = core.dummySpan) => ({
    type: "CallExpression",
    span,
    callee,
    arguments: args,
    typeArguments
});
const createClassProperty = (key, value, accessibility, typeAnnotation, decorators, declare = false, definite = false, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, readonly = false, span = core.dummySpan) => ({
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
const createPrivateProperty = (key, value, accessibility, typeAnnotation, decorators, definite = false, isOptional = false, isOverride = false, isStatic = false, readonly = false, span = core.dummySpan) => ({
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
const createParam = (pat, decorators, span = core.dummySpan) => ({
    type: "Parameter",
    pat,
    decorators,
    span
});
const createConstructor = (key, params, body, accessibility, isOptional = false, span = core.dummySpan) => ({
    type: "Constructor",
    key,
    params,
    body,
    span,
    accessibility,
    isOptional,
});
const createClassMethod = (kind, key, fn, accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, span = core.dummySpan) => ({
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
const createPrivateMethod = (kind, key, fn, accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, span = core.dummySpan) => ({
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
const createStaticBlock = (body, span = core.dummySpan) => ({
    type: "StaticBlock",
    body,
    span
});
const createDecorator = (expression, span = core.dummySpan) => ({
    type: "Decorator",
    expression,
    span
});
const createFunctionDeclaration = (identifier, params, body, typeParameters, returnType, decorators, declare = false, async = false, generator = false, span = core.dummySpan) => ({
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
const createClassDeclaration = (identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare = false, isAbstract = false, span = core.dummySpan) => ({
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
const createVariableDeclaration = (kind, declarations = [], declare = false, span = core.dummySpan) => ({
    type: "VariableDeclaration",
    kind,
    declare,
    declarations,
    span,
});
const createVariableDeclarator = (id, init, definite = false, span = core.dummySpan) => ({
    type: "VariableDeclarator",
    id,
    definite,
    init,
    span
});
const createOptionalChainingExpression = (base, questionDotToken = core.dummySpan, span = core.dummySpan) => ({
    type: "OptionalChainingExpression",
    questionDotToken,
    base,
    span
});
const createOptionalChainingCall = (callee, args = [], typeArguments, span = core.dummySpan) => ({
    type: "CallExpression",
    callee,
    arguments: args,
    typeArguments,
    span
});
const createThisExpression = (span = core.dummySpan) => ({
    type: "ThisExpression",
    span
});
const createArrayExpression = (elements = [], span = core.dummySpan) => ({
    type: "ArrayExpression",
    elements,
    span
});
const createExprOrSpread = (expression, spread) => ({
    spread,
    expression,
});
const createObjectExpression = (properties = [], span = core.dummySpan) => ({
    type: "ObjectExpression",
    properties,
    span
});
const createSpreadElement = (args, spread = core.dummySpan) => ({
    type: "SpreadElement",
    spread,
    arguments: args,
});
const createUnaryExpression = (operator, argument, span = core.dummySpan) => ({
    type: "UnaryExpression",
    span,
    operator,
    argument
});
const createUpdateExpression = (operator, argument, prefix = false, span = core.dummySpan) => ({
    type: "UpdateExpression",
    operator,
    prefix,
    argument,
    span
});
const createBinaryExpression = (left, operator, right, span = core.dummySpan) => ({
    type: "BinaryExpression",
    operator,
    left,
    right,
    span
});
const createFunctionExpression = (params, body, identifier, typeParameters, returnType, decorators, async = false, generator = false, span = core.dummySpan) => ({
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
const createClassExpression = (body, impls = [], superClass, identifier, typeParams, superTypeParams, decorators, isAbstract = false, span = core.dummySpan) => ({
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
const createAssignmentExpression = (left, operator, right, span = core.dummySpan) => ({
    type: "AssignmentExpression",
    operator,
    left,
    right,
    span
});
const createMemberExpression = (object, property, span = core.dummySpan) => ({
    type: "MemberExpression",
    object,
    property,
    span
});
const createSuperPropExpression = (obj, property, span = core.dummySpan) => ({
    type: "SuperPropExpression",
    obj,
    property,
    span
});
const createConditionalExpression = (test, consequent, alternate, span = core.dummySpan) => ({
    type: "ConditionalExpression",
    test,
    consequent,
    alternate,
    span
});
const createSuper = (span = core.dummySpan) => ({
    type: "Super",
    span
});
const createImport = (span = core.dummySpan) => ({
    type: "Import",
    span
});
const createNewExpression = (callee, args, typeArguments, span = core.dummySpan) => ({
    type: "NewExpression",
    callee,
    arguments: args,
    typeArguments,
    span
});
const createSequenceExpression = (expressions, span = core.dummySpan) => ({
    type: "SequenceExpression",
    expressions,
    span
});
const createArrowFunctionExpression = (params, body, async = false, generator = false, typeParameters, returnType, span = core.dummySpan) => ({
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    generator,
    typeParameters,
    span,
    returnType,
});
const createYieldExpression = (argument, delegate = false, span = core.dummySpan) => ({
    type: "YieldExpression",
    argument,
    delegate,
    span
});
const createMetaProperty = (kind, span = core.dummySpan) => ({
    type: "MetaProperty",
    kind,
    span
});
const createAwaitExpression = (argument, span = core.dummySpan) => ({
    type: "AwaitExpression",
    argument,
    span
});
const createTemplateLiteral = (expressions = [], quasis = [], span = core.dummySpan) => ({
    type: "TemplateLiteral",
    expressions,
    quasis,
    span
});
const createTaggedTemplateExpression = (tag, template, typeParameters, span = core.dummySpan) => ({
    type: "TaggedTemplateExpression",
    tag,
    typeParameters,
    span,
    template,
});
const createTemplateElement = (raw, cooked, tail = false, span = core.dummySpan) => ({
    type: "TemplateElement",
    tail,
    cooked,
    raw,
    span
});
const createParenthesisExpression = (expression, span = core.dummySpan) => ({
    type: "ParenthesisExpression",
    expression,
    span
});
const createPrivateName = (id, span = core.dummySpan) => ({
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
const createJSXEmptyExpression = (span = core.dummySpan) => ({
    type: "JSXEmptyExpression",
    span
});
const createJSXExpressionContainer = (expression, span = core.dummySpan) => ({
    type: "JSXExpressionContainer",
    expression,
    span
});
const createJSXSpreadChild = (expression, span = core.dummySpan) => ({
    type: "JSXSpreadChild",
    expression,
    span
});
const createJSXOpeningElement = (name, attributes = [], selfClosing = false, typeArguments, span = core.dummySpan) => ({
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing,
    typeArguments,
    span
});
const createJSXClosingElement = (name, span = core.dummySpan) => ({
    type: "JSXClosingElement",
    name,
    span
});
const createJSXAttribute = (name, value, span = core.dummySpan) => ({
    type: "JSXAttribute",
    name,
    value,
    span
});
const createJSXText = (value, raw = JSON.stringify(value), span = core.dummySpan) => ({
    type: "JSXText",
    value,
    raw,
    span
});
const createJSXElement = (opening, children = [], closing, span = core.dummySpan) => ({
    type: "JSXElement",
    opening,
    children,
    closing,
    span
});
const createJSXFragment = (opening, children = [], closing, span = core.dummySpan) => ({
    type: "JSXFragment",
    opening,
    children,
    closing,
    span
});
const createJSXOpeningFragment = (span = core.dummySpan) => ({
    type: "JSXOpeningFragment",
    span
});
const createJSXClosingFragment = (span = core.dummySpan) => ({
    type: "JSXClosingFragment",
    span
});
const createExportDefaultExpression = (expression, span = core.dummySpan) => ({
    type: "ExportDefaultExpression",
    expression,
    span
});
const createExportDeclaration = (declaration, span = core.dummySpan) => ({
    type: "ExportDeclaration",
    declaration,
    span
});
const createImportDeclaration = (specifiers, source, asserts, typeOnly = false, span = core.dummySpan) => ({
    type: "ImportDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span
});
const createExportAllDeclaration = (source, asserts, span = core.dummySpan) => ({
    type: "ExportAllDeclaration",
    source,
    asserts,
    span
});
const createExportNamedDeclaration = (specifiers, source, asserts, typeOnly = false, span = core.dummySpan) => ({
    type: "ExportNamedDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span
});
const createExportDefaultDeclaration = (decl, span = core.dummySpan) => ({
    type: "ExportDefaultDeclaration",
    decl,
    span
});
const createImportDefaultSpecifier = (local, span = core.dummySpan) => ({
    type: "ImportDefaultSpecifier",
    local,
    span
});
const createImportNamespaceSpecifier = (local, span = core.dummySpan) => ({
    type: "ImportNamespaceSpecifier",
    local,
    span
});
const createImportSpecifier = (local, imported, isTypeOnly = false, span = core.dummySpan) => ({
    type: "ImportSpecifier",
    local,
    imported,
    isTypeOnly,
    span
});
const createNamedImportSpecifier = (local, imported, isTypeOnly = false, span = core.dummySpan) => ({
    type: "ImportSpecifier",
    local,
    imported,
    isTypeOnly,
    span
});
const createExportNamespaceSpecifier = (name, span = core.dummySpan) => ({
    type: "ExportNamespaceSpecifier",
    name,
    span
});
const createExportDefaultSpecifier = (exported, span = core.dummySpan) => ({
    type: "ExportDefaultSpecifier",
    exported,
    span
});
const createExportSpecifier = (orig, exported, isTypeOnly = false, span = core.dummySpan) => ({
    type: "ExportSpecifier",
    orig,
    span,
    exported,
    isTypeOnly,
});
const createNamedExportSpecifier = (orig, exported, isTypeOnly = false, span = core.dummySpan) => ({
    type: "ExportSpecifier",
    orig,
    span,
    exported,
    isTypeOnly,
});
const createModule = (body = [], interpreter, span = core.dummySpan) => ({
    type: "Module",
    body,
    span,
    interpreter
});
const createScript = (body = [], interpreter, span = core.dummySpan) => ({
    type: "Script",
    body,
    span,
    interpreter
});
const createArrayPattern = (elements, optional = false, typeAnnotation, span = core.dummySpan) => ({
    type: "ArrayPattern",
    elements,
    optional,
    typeAnnotation,
    span
});
const createObjectPattern = (properties, optional = false, typeAnnotation, span = core.dummySpan) => ({
    type: "ObjectPattern",
    properties,
    optional,
    typeAnnotation,
    span
});
const createAssignmentPattern = (left, right, typeAnnotation, span = core.dummySpan) => ({
    type: "AssignmentPattern",
    left,
    right,
    typeAnnotation,
    span
});
const createRestElement = (argument, typeAnnotation, rest = core.dummySpan, span = core.dummySpan) => ({
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
const createAssignmentPatternProperty = (key, value, span = core.dummySpan) => ({
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
const createGetterProperty = (key, body, typeAnnotation, span = core.dummySpan) => ({
    type: "GetterProperty",
    typeAnnotation,
    body,
    key,
    span
});
const createSetterProperty = (key, param, body, span = core.dummySpan) => ({
    type: "SetterProperty",
    param,
    body,
    key,
    span
});
const createMethodProperty = (key, params, body, async = false, generator = false, decorators, typeParameters, returnType, span = core.dummySpan) => ({
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
const createComputedPropName = (expression, span = core.dummySpan) => ({
    type: "Computed",
    expression,
    span
});
const createComputed = (expression, span = core.dummySpan) => ({
    type: "Computed",
    expression,
    span
});
const createBlockStatement = (stmts = [], span = core.dummySpan) => ({
    type: "BlockStatement",
    stmts,
    span
});
const createExpressionStatement = (expression, span = core.dummySpan) => ({
    type: "ExpressionStatement",
    expression,
    span
});
const createEmptyStatement = (span = core.dummySpan) => ({
    type: "EmptyStatement",
    span
});
const createDebuggerStatement = (span = core.dummySpan) => ({
    type: "DebuggerStatement",
    span
});
const createWithStatement = (object, body, span = core.dummySpan) => ({
    type: "WithStatement",
    object,
    body,
    span
});
const createReturnStatement = (argument, span = core.dummySpan) => ({
    type: "ReturnStatement",
    argument,
    span
});
const createLabeledStatement = (label, body, span = core.dummySpan) => ({
    type: "LabeledStatement",
    label,
    body,
    span
});
const createBreakStatement = (label, span = core.dummySpan) => ({
    type: "BreakStatement",
    label,
    span
});
const createContinueStatement = (label, span = core.dummySpan) => ({
    type: "ContinueStatement",
    label,
    span
});
const createIfStatement = (test, consequent, alternate, span = core.dummySpan) => ({
    type: "IfStatement",
    test,
    consequent,
    alternate,
    span
});
const createSwitchStatement = (discriminant, cases = [], span = core.dummySpan) => ({
    type: "SwitchStatement",
    discriminant,
    cases,
    span
});
const createThrowStatement = (argument, span = core.dummySpan) => ({
    type: "ThrowStatement",
    argument,
    span
});
const createTryStatement = (block, handler, finalizer, span = core.dummySpan) => ({
    type: "TryStatement",
    block,
    handler,
    finalizer,
    span
});
const createWhileStatement = (test, body, span = core.dummySpan) => ({
    type: "WhileStatement",
    test,
    body,
    span
});
const createDoWhileStatement = (test, body, span = core.dummySpan) => ({
    type: "DoWhileStatement",
    test,
    body,
    span
});
const createForStatement = (body, init, test, update, span = core.dummySpan) => ({
    type: "ForStatement",
    init,
    test,
    update,
    body,
    span
});
const createForInStatement = (left, right, body, span = core.dummySpan) => ({
    type: "ForInStatement",
    left,
    right,
    body,
    span
});
const createForOfStatement = (left, right, body, _await = core.dummySpan, span = core.dummySpan) => ({
    type: "ForOfStatement",
    await: _await,
    left,
    right,
    body,
    span
});
const createSwitchCase = (test, consequent = [], span = core.dummySpan) => ({
    type: "SwitchCase",
    test,
    consequent,
    span
});
const createCatchClause = (body, param, span = core.dummySpan) => ({
    type: "CatchClause",
    param,
    body,
    span
});
const createTsTypeAnnotation = (typeAnnotation, span = core.dummySpan) => ({
    type: "TsTypeAnnotation",
    typeAnnotation,
    span
});
const createTsTypeParameterDeclaration = (parameters = [], span = core.dummySpan) => ({
    type: "TsTypeParameterDeclaration",
    parameters,
    span
});
const createTsTypeParameter = (name, _in, _out, constraint, _default, span = core.dummySpan) => ({
    type: "TsTypeParameter",
    name,
    in: _in,
    out: _out,
    constraint,
    default: _default,
    span
});
const createTsTypeParameterInstantiation = (params = [], span = core.dummySpan) => ({
    type: "TsTypeParameterInstantiation",
    params,
    span
});
const createTsParameterProperty = (param, accessibility, decorators, override = false, readonly = false, span = core.dummySpan) => ({
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
const createTsCallSignatureDeclaration = (params = [], typeAnnotation, typeParams, span = core.dummySpan) => ({
    type: "TsCallSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsConstructSignatureDeclaration = (params = [], typeAnnotation, typeParams, span = core.dummySpan) => ({
    type: "TsConstructSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsPropertySignature = (key, params, init, typeAnnotation, typeParams, computed = false, optional = false, readonly = false, span = core.dummySpan) => ({
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
const createTsGetterSignature = (key, typeAnnotation, computed = false, optional = false, readonly = false, span = core.dummySpan) => ({
    type: "TsGetterSignature",
    readonly,
    key,
    computed,
    optional,
    typeAnnotation,
    span
});
const createTsSetterSignature = (key, param, computed = false, optional = false, readonly = false, span = core.dummySpan) => ({
    type: "TsSetterSignature",
    readonly,
    key,
    computed,
    optional,
    param,
    span
});
const createTsMethodSignature = (key, params, typeAnn, typeParams, computed = false, optional = false, readonly = false, span = core.dummySpan) => ({
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
const createTsIndexSignature = (params, typeAnnotation, readonly = false, isStatic = false, span = core.dummySpan) => ({
    type: "TsIndexSignature",
    params,
    typeAnnotation,
    readonly,
    static: isStatic,
    span
});
const createTsKeywordType = (kind, span = core.dummySpan) => ({
    type: "TsKeywordType",
    kind,
    span
});
const createTsThisType = (span = core.dummySpan) => ({
    type: "TsThisType",
    span
});
const createTsFunctionType = (params, typeAnnotation, typeParams, span = core.dummySpan) => ({
    type: "TsFunctionType",
    params,
    typeParams,
    typeAnnotation,
    span
});
const createTsConstructorType = (params, typeAnnotation, typeParams, isAbstract = false, span = core.dummySpan) => ({
    type: "TsConstructorType",
    params,
    typeParams,
    typeAnnotation,
    isAbstract,
    span
});
const createTsTypeReference = (typeName, typeParams, span = core.dummySpan) => ({
    type: "TsTypeReference",
    typeName,
    typeParams,
    span
});
const createTsTypePredicate = (paramName, typeAnnotation, asserts = false, span = core.dummySpan) => ({
    type: "TsTypePredicate",
    asserts,
    paramName,
    typeAnnotation,
    span
});
const createTsImportType = (argument, qualifier, typeArguments, span = core.dummySpan) => ({
    type: "TsImportType",
    argument,
    qualifier,
    typeArguments,
    span
});
const createTsTypeQuery = (exprName, typeArguments, span = core.dummySpan) => ({
    type: "TsTypeQuery",
    exprName,
    typeArguments,
    span
});
const createTsTypeLiteral = (members = [], span = core.dummySpan) => ({
    type: "TsTypeLiteral",
    members,
    span
});
const createTsArrayType = (elemType, span = core.dummySpan) => ({
    type: "TsArrayType",
    elemType,
    span
});
const createTsTupleType = (elemTypes = [], span = core.dummySpan) => ({
    type: "TsTupleType",
    elemTypes,
    span
});
const createTsTupleElement = (ty, label, span = core.dummySpan) => ({
    type: "TsTupleElement",
    label,
    ty,
    span
});
const createTsOptionalType = (typeAnnotation, span = core.dummySpan) => ({
    type: "TsOptionalType",
    typeAnnotation,
    span
});
const createTsRestType = (typeAnnotation, span = core.dummySpan) => ({
    type: "TsRestType",
    typeAnnotation,
    span
});
const createTsUnionType = (types = [], span = core.dummySpan) => ({
    type: "TsUnionType",
    types,
    span
});
const createTsIntersectionType = (types = [], span = core.dummySpan) => ({
    type: "TsIntersectionType",
    types,
    span
});
const createTsConditionalType = (checkType, extendsType, trueType, falseType, span = core.dummySpan) => ({
    type: "TsConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
    span
});
const createTsInferType = (typeParam, span = core.dummySpan) => ({
    type: "TsInferType",
    typeParam,
    span
});
const createTsParenthesizedType = (typeAnnotation, span = core.dummySpan) => ({
    type: "TsParenthesizedType",
    typeAnnotation,
    span
});
const createTsTypeOperator = (op, typeAnnotation, span = core.dummySpan) => ({
    type: "TsTypeOperator",
    op,
    typeAnnotation,
    span
});
const createTsIndexedAccessType = (objectType, indexType, readonly = false, span = core.dummySpan) => ({
    type: "TsIndexedAccessType",
    readonly,
    objectType,
    indexType,
    span
});
const createTsMappedType = (typeParam, typeAnnotation, nameType, optional, readonly, span = core.dummySpan) => ({
    type: "TsMappedType",
    readonly,
    typeParam,
    nameType,
    optional,
    typeAnnotation,
    span
});
const createTsLiteralType = (literal, span = core.dummySpan) => ({
    type: "TsLiteralType",
    literal,
    span
});
const createTsTemplateLiteralType = (types = [], quasis = [], span = core.dummySpan) => ({
    type: "TemplateLiteral",
    types,
    quasis,
    span
});
const createTsInterfaceDeclaration = (id, body, _extends = [], typeParams, declare = false, span = core.dummySpan) => ({
    type: "TsInterfaceDeclaration",
    id,
    declare,
    typeParams,
    extends: _extends,
    body,
    span
});
const createTsInterfaceBody = (body = [], span = core.dummySpan) => ({
    type: "TsInterfaceBody",
    body,
    span
});
const createTsExpressionWithTypeArguments = (expression, typeArguments, span = core.dummySpan) => ({
    type: "TsExpressionWithTypeArguments",
    expression,
    typeArguments,
    span
});
const createTsTypeAliasDeclaration = (id, typeAnnotation, typeParams, declare = false, span = core.dummySpan) => ({
    type: "TsTypeAliasDeclaration",
    declare,
    id,
    typeParams,
    typeAnnotation,
    span
});
const createTsEnumDeclaration = (id, members = [], declare = false, isConst = false, span = core.dummySpan) => ({
    type: "TsEnumDeclaration",
    declare,
    isConst,
    id,
    members,
    span
});
const createTsEnumMember = (id, init, span = core.dummySpan) => ({
    type: "TsEnumMember",
    id,
    init,
    span
});
const createTsModuleDeclaration = (id, body, declare = false, global = false, span = core.dummySpan) => ({
    type: "TsModuleDeclaration",
    declare,
    global,
    id,
    body,
    span,
});
const createTsModuleBlock = (body, span = core.dummySpan) => ({
    type: "TsModuleBlock",
    body,
    span,
});
const createTsNamespaceDeclaration = (id, body, declare = false, global = false, span = core.dummySpan) => ({
    type: "TsNamespaceDeclaration",
    declare,
    global,
    id,
    body,
    span
});
const createTsImportEqualsDeclaration = (id, moduleRef, declare = false, isExport = false, isTypeOnly = false, span = core.dummySpan) => ({
    type: "TsImportEqualsDeclaration",
    declare,
    isExport,
    isTypeOnly,
    id,
    moduleRef,
    span
});
const createTsExternalModuleReference = (expression, span = core.dummySpan) => ({
    type: "TsExternalModuleReference",
    expression,
    span
});
const createTsExportAssignment = (expression, span = core.dummySpan) => ({
    type: "TsExportAssignment",
    expression,
    span
});
const createTsNamespaceExportDeclaration = (id, span = core.dummySpan) => ({
    type: "TsNamespaceExportDeclaration",
    id,
    span
});
const createTsAsExpression = (expression, typeAnnotation, span = core.dummySpan) => ({
    type: "TsAsExpression",
    expression,
    typeAnnotation,
    span,
});
const createTsSatisfiesExpression = (expression, typeAnnotation, span = core.dummySpan) => ({
    type: "TsSatisfiesExpression",
    expression,
    typeAnnotation,
    span,
});
const createTsInstantiation = (expression, typeArguments, span = core.dummySpan) => ({
    type: "TsInstantiation",
    expression,
    typeArguments,
    span
});
const createTsTypeAssertion = (expression, typeAnnotation, span = core.dummySpan) => ({
    type: "TsTypeAssertion",
    expression,
    typeAnnotation,
    span,
});
const createTsConstAssertion = (expression, span = core.dummySpan) => ({
    type: "TsConstAssertion",
    expression,
    span,
});
const createTsNonNullExpression = (expression, span = core.dummySpan) => ({
    type: "TsNonNullExpression",
    expression,
    span
});
const createInvalid = (span = core.dummySpan) => ({
    type: "Invalid",
    span
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
exports.createComputed = createComputed;
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
exports.createExportSpecifier = createExportSpecifier;
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
exports.createImportSpecifier = createImportSpecifier;
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
exports.createSpan = createSpan;
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
