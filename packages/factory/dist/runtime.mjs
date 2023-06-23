import { dummySpan } from '@macro-plugin/core';

const createSpan = (start = 0, end = 0, ctxt = 0) => ({
    start,
    end,
    ctxt
});
const createIdentifier = (value, optional = false, span = dummySpan) => ({
    type: "Identifier",
    value,
    optional,
    span,
});
const createStringLiteral = (value, raw, span = dummySpan) => ({
    type: "StringLiteral",
    value,
    raw,
    span
});
const createNumericLiteral = (value, raw, span = dummySpan) => ({
    type: "NumericLiteral",
    value,
    raw,
    span
});
const createBigIntLiteral = (value, raw, span = dummySpan) => ({
    type: "BigIntLiteral",
    value,
    raw,
    span
});
const createBooleanLiteral = (value, span = dummySpan) => ({
    type: "BooleanLiteral",
    value,
    span
});
const createNullLiteral = (span = dummySpan) => ({
    type: "NullLiteral",
    span
});
const createRegExpLiteral = (pattern, flags, span = dummySpan) => ({
    type: "RegExpLiteral",
    pattern,
    flags,
    span
});
const createArgument = (expression, spread) => ({
    spread,
    expression
});
const createCallExpression = (callee, args = [], typeArguments, span = dummySpan) => ({
    type: "CallExpression",
    span,
    callee,
    arguments: args,
    typeArguments
});
const createClassProperty = (key, value, accessibility, typeAnnotation, decorators, declare = false, definite = false, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, readonly = false, span = dummySpan) => ({
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
const createPrivateProperty = (key, value, accessibility, typeAnnotation, decorators, definite = false, isOptional = false, isOverride = false, isStatic = false, readonly = false, span = dummySpan) => ({
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
const createParam = (pat, decorators, span = dummySpan) => ({
    type: "Parameter",
    pat,
    decorators,
    span
});
const createConstructor = (key, params, body, accessibility, isOptional = false, span = dummySpan) => ({
    type: "Constructor",
    key,
    params,
    body,
    span,
    accessibility,
    isOptional,
});
const createClassMethod = (kind, key, fn, accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, span = dummySpan) => ({
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
const createPrivateMethod = (kind, key, fn, accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, span = dummySpan) => ({
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
const createStaticBlock = (body, span = dummySpan) => ({
    type: "StaticBlock",
    body,
    span
});
const createDecorator = (expression, span = dummySpan) => ({
    type: "Decorator",
    expression,
    span
});
const createFunctionDeclaration = (identifier, params, body, typeParameters, returnType, decorators, declare = false, async = false, generator = false, span = dummySpan) => ({
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
const createClassDeclaration = (identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare = false, isAbstract = false, span = dummySpan) => ({
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
const createVariableDeclaration = (kind, declarations = [], declare = false, span = dummySpan) => ({
    type: "VariableDeclaration",
    kind,
    declare,
    declarations,
    span,
});
const createVariableDeclarator = (id, init, definite = false, span = dummySpan) => ({
    type: "VariableDeclarator",
    id,
    definite,
    init,
    span
});
const createOptionalChainingExpression = (base, questionDotToken = dummySpan, span = dummySpan) => ({
    type: "OptionalChainingExpression",
    questionDotToken,
    base,
    span
});
const createOptionalChainingCall = (callee, args = [], typeArguments, span = dummySpan) => ({
    type: "CallExpression",
    callee,
    arguments: args,
    typeArguments,
    span
});
const createThisExpression = (span = dummySpan) => ({
    type: "ThisExpression",
    span
});
const createArrayExpression = (elements = [], span = dummySpan) => ({
    type: "ArrayExpression",
    elements,
    span
});
const createExprOrSpread = (expression, spread) => ({
    spread,
    expression,
});
const createObjectExpression = (properties = [], span = dummySpan) => ({
    type: "ObjectExpression",
    properties,
    span
});
const createSpreadElement = (args, spread = dummySpan) => ({
    type: "SpreadElement",
    spread,
    arguments: args,
});
const createUnaryExpression = (operator, argument, span = dummySpan) => ({
    type: "UnaryExpression",
    span,
    operator,
    argument
});
const createUpdateExpression = (operator, argument, prefix = false, span = dummySpan) => ({
    type: "UpdateExpression",
    operator,
    prefix,
    argument,
    span
});
const createBinaryExpression = (left, operator, right, span = dummySpan) => ({
    type: "BinaryExpression",
    operator,
    left,
    right,
    span
});
const createFunctionExpression = (params, body, identifier, typeParameters, returnType, decorators, async = false, generator = false, span = dummySpan) => ({
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
const createClassExpression = (body, impls = [], superClass, identifier, typeParams, superTypeParams, decorators, isAbstract = false, span = dummySpan) => ({
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
const createAssignmentExpression = (left, operator, right, span = dummySpan) => ({
    type: "AssignmentExpression",
    operator,
    left,
    right,
    span
});
const createMemberExpression = (object, property, span = dummySpan) => ({
    type: "MemberExpression",
    object,
    property,
    span
});
const createSuperPropExpression = (obj, property, span = dummySpan) => ({
    type: "SuperPropExpression",
    obj,
    property,
    span
});
const createConditionalExpression = (test, consequent, alternate, span = dummySpan) => ({
    type: "ConditionalExpression",
    test,
    consequent,
    alternate,
    span
});
const createSuper = (span = dummySpan) => ({
    type: "Super",
    span
});
const createImport = (span = dummySpan) => ({
    type: "Import",
    span
});
const createNewExpression = (callee, args, typeArguments, span = dummySpan) => ({
    type: "NewExpression",
    callee,
    arguments: args,
    typeArguments,
    span
});
const createSequenceExpression = (expressions, span = dummySpan) => ({
    type: "SequenceExpression",
    expressions,
    span
});
const createArrowFunctionExpression = (params, body, async = false, generator = false, typeParameters, returnType, span = dummySpan) => ({
    type: "ArrowFunctionExpression",
    params,
    body,
    async,
    generator,
    typeParameters,
    span,
    returnType,
});
const createYieldExpression = (argument, delegate = false, span = dummySpan) => ({
    type: "YieldExpression",
    argument,
    delegate,
    span
});
const createMetaProperty = (kind, span = dummySpan) => ({
    type: "MetaProperty",
    kind,
    span
});
const createAwaitExpression = (argument, span = dummySpan) => ({
    type: "AwaitExpression",
    argument,
    span
});
const createTemplateLiteral = (expressions = [], quasis = [], span = dummySpan) => ({
    type: "TemplateLiteral",
    expressions,
    quasis,
    span
});
const createTaggedTemplateExpression = (tag, template, typeParameters, span = dummySpan) => ({
    type: "TaggedTemplateExpression",
    tag,
    typeParameters,
    span,
    template,
});
const createTemplateElement = (raw, cooked, tail = false, span = dummySpan) => ({
    type: "TemplateElement",
    tail,
    cooked,
    raw,
    span
});
const createParenthesisExpression = (expression, span = dummySpan) => ({
    type: "ParenthesisExpression",
    expression,
    span
});
const createPrivateName = (id, span = dummySpan) => ({
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
const createJSXEmptyExpression = (span = dummySpan) => ({
    type: "JSXEmptyExpression",
    span
});
const createJSXExpressionContainer = (expression, span = dummySpan) => ({
    type: "JSXExpressionContainer",
    expression,
    span
});
const createJSXSpreadChild = (expression, span = dummySpan) => ({
    type: "JSXSpreadChild",
    expression,
    span
});
const createJSXOpeningElement = (name, attributes = [], selfClosing = false, typeArguments, span = dummySpan) => ({
    type: "JSXOpeningElement",
    name,
    attributes,
    selfClosing,
    typeArguments,
    span
});
const createJSXClosingElement = (name, span = dummySpan) => ({
    type: "JSXClosingElement",
    name,
    span
});
const createJSXAttribute = (name, value, span = dummySpan) => ({
    type: "JSXAttribute",
    name,
    value,
    span
});
const createJSXText = (value, raw = JSON.stringify(value), span = dummySpan) => ({
    type: "JSXText",
    value,
    raw,
    span
});
const createJSXElement = (opening, children = [], closing, span = dummySpan) => ({
    type: "JSXElement",
    opening,
    children,
    closing,
    span
});
const createJSXFragment = (opening, children = [], closing, span = dummySpan) => ({
    type: "JSXFragment",
    opening,
    children,
    closing,
    span
});
const createJSXOpeningFragment = (span = dummySpan) => ({
    type: "JSXOpeningFragment",
    span
});
const createJSXClosingFragment = (span = dummySpan) => ({
    type: "JSXClosingFragment",
    span
});
const createExportDefaultExpression = (expression, span = dummySpan) => ({
    type: "ExportDefaultExpression",
    expression,
    span
});
const createExportDeclaration = (declaration, span = dummySpan) => ({
    type: "ExportDeclaration",
    declaration,
    span
});
const createImportDeclaration = (specifiers, source, asserts, typeOnly = false, span = dummySpan) => ({
    type: "ImportDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span
});
const createExportAllDeclaration = (source, asserts, span = dummySpan) => ({
    type: "ExportAllDeclaration",
    source,
    asserts,
    span
});
const createExportNamedDeclaration = (specifiers, source, asserts, typeOnly = false, span = dummySpan) => ({
    type: "ExportNamedDeclaration",
    specifiers,
    source,
    typeOnly,
    asserts,
    span
});
const createExportDefaultDeclaration = (decl, span = dummySpan) => ({
    type: "ExportDefaultDeclaration",
    decl,
    span
});
const createImportDefaultSpecifier = (local, span = dummySpan) => ({
    type: "ImportDefaultSpecifier",
    local,
    span
});
const createImportNamespaceSpecifier = (local, span = dummySpan) => ({
    type: "ImportNamespaceSpecifier",
    local,
    span
});
const createImportSpecifier = (local, imported, isTypeOnly = false, span = dummySpan) => ({
    type: "ImportSpecifier",
    local,
    imported,
    isTypeOnly,
    span
});
const createNamedImportSpecifier = (local, imported, isTypeOnly = false, span = dummySpan) => ({
    type: "ImportSpecifier",
    local,
    imported,
    isTypeOnly,
    span
});
const createExportNamespaceSpecifier = (name, span = dummySpan) => ({
    type: "ExportNamespaceSpecifier",
    name,
    span
});
const createExportDefaultSpecifier = (exported, span = dummySpan) => ({
    type: "ExportDefaultSpecifier",
    exported,
    span
});
const createExportSpecifier = (orig, exported, isTypeOnly = false, span = dummySpan) => ({
    type: "ExportSpecifier",
    orig,
    span,
    exported,
    isTypeOnly,
});
const createNamedExportSpecifier = (orig, exported, isTypeOnly = false, span = dummySpan) => ({
    type: "ExportSpecifier",
    orig,
    span,
    exported,
    isTypeOnly,
});
const createModule = (body = [], interpreter, span = dummySpan) => ({
    type: "Module",
    body,
    span,
    interpreter
});
const createScript = (body = [], interpreter, span = dummySpan) => ({
    type: "Script",
    body,
    span,
    interpreter
});
const createArrayPattern = (elements, optional = false, typeAnnotation, span = dummySpan) => ({
    type: "ArrayPattern",
    elements,
    optional,
    typeAnnotation,
    span
});
const createObjectPattern = (properties, optional = false, typeAnnotation, span = dummySpan) => ({
    type: "ObjectPattern",
    properties,
    optional,
    typeAnnotation,
    span
});
const createAssignmentPattern = (left, right, typeAnnotation, span = dummySpan) => ({
    type: "AssignmentPattern",
    left,
    right,
    typeAnnotation,
    span
});
const createRestElement = (argument, typeAnnotation, rest = dummySpan, span = dummySpan) => ({
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
const createAssignmentPatternProperty = (key, value, span = dummySpan) => ({
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
const createGetterProperty = (key, body, typeAnnotation, span = dummySpan) => ({
    type: "GetterProperty",
    typeAnnotation,
    body,
    key,
    span
});
const createSetterProperty = (key, param, body, span = dummySpan) => ({
    type: "SetterProperty",
    param,
    body,
    key,
    span
});
const createMethodProperty = (key, params, body, async = false, generator = false, decorators, typeParameters, returnType, span = dummySpan) => ({
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
const createComputedPropName = (expression, span = dummySpan) => ({
    type: "Computed",
    expression,
    span
});
const createComputed = (expression, span = dummySpan) => ({
    type: "Computed",
    expression,
    span
});
const createBlockStatement = (stmts = [], span = dummySpan) => ({
    type: "BlockStatement",
    stmts,
    span
});
const createExpressionStatement = (expression, span = dummySpan) => ({
    type: "ExpressionStatement",
    expression,
    span
});
const createEmptyStatement = (span = dummySpan) => ({
    type: "EmptyStatement",
    span
});
const createDebuggerStatement = (span = dummySpan) => ({
    type: "DebuggerStatement",
    span
});
const createWithStatement = (object, body, span = dummySpan) => ({
    type: "WithStatement",
    object,
    body,
    span
});
const createReturnStatement = (argument, span = dummySpan) => ({
    type: "ReturnStatement",
    argument,
    span
});
const createLabeledStatement = (label, body, span = dummySpan) => ({
    type: "LabeledStatement",
    label,
    body,
    span
});
const createBreakStatement = (label, span = dummySpan) => ({
    type: "BreakStatement",
    label,
    span
});
const createContinueStatement = (label, span = dummySpan) => ({
    type: "ContinueStatement",
    label,
    span
});
const createIfStatement = (test, consequent, alternate, span = dummySpan) => ({
    type: "IfStatement",
    test,
    consequent,
    alternate,
    span
});
const createSwitchStatement = (discriminant, cases = [], span = dummySpan) => ({
    type: "SwitchStatement",
    discriminant,
    cases,
    span
});
const createThrowStatement = (argument, span = dummySpan) => ({
    type: "ThrowStatement",
    argument,
    span
});
const createTryStatement = (block, handler, finalizer, span = dummySpan) => ({
    type: "TryStatement",
    block,
    handler,
    finalizer,
    span
});
const createWhileStatement = (test, body, span = dummySpan) => ({
    type: "WhileStatement",
    test,
    body,
    span
});
const createDoWhileStatement = (test, body, span = dummySpan) => ({
    type: "DoWhileStatement",
    test,
    body,
    span
});
const createForStatement = (body, init, test, update, span = dummySpan) => ({
    type: "ForStatement",
    init,
    test,
    update,
    body,
    span
});
const createForInStatement = (left, right, body, span = dummySpan) => ({
    type: "ForInStatement",
    left,
    right,
    body,
    span
});
const createForOfStatement = (left, right, body, _await = dummySpan, span = dummySpan) => ({
    type: "ForOfStatement",
    await: _await,
    left,
    right,
    body,
    span
});
const createSwitchCase = (test, consequent = [], span = dummySpan) => ({
    type: "SwitchCase",
    test,
    consequent,
    span
});
const createCatchClause = (body, param, span = dummySpan) => ({
    type: "CatchClause",
    param,
    body,
    span
});
const createTsTypeAnnotation = (typeAnnotation, span = dummySpan) => ({
    type: "TsTypeAnnotation",
    typeAnnotation,
    span
});
const createTsTypeParameterDeclaration = (parameters = [], span = dummySpan) => ({
    type: "TsTypeParameterDeclaration",
    parameters,
    span
});
const createTsTypeParameter = (name, _in, _out, constraint, _default, span = dummySpan) => ({
    type: "TsTypeParameter",
    name,
    in: _in,
    out: _out,
    constraint,
    default: _default,
    span
});
const createTsTypeParameterInstantiation = (params = [], span = dummySpan) => ({
    type: "TsTypeParameterInstantiation",
    params,
    span
});
const createTsParameterProperty = (param, accessibility, decorators, override = false, readonly = false, span = dummySpan) => ({
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
const createTsCallSignatureDeclaration = (params = [], typeAnnotation, typeParams, span = dummySpan) => ({
    type: "TsCallSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsConstructSignatureDeclaration = (params = [], typeAnnotation, typeParams, span = dummySpan) => ({
    type: "TsConstructSignatureDeclaration",
    params,
    typeAnnotation,
    typeParams,
    span
});
const createTsPropertySignature = (key, params, init, typeAnnotation, typeParams, computed = false, optional = false, readonly = false, span = dummySpan) => ({
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
const createTsGetterSignature = (key, typeAnnotation, computed = false, optional = false, readonly = false, span = dummySpan) => ({
    type: "TsGetterSignature",
    readonly,
    key,
    computed,
    optional,
    typeAnnotation,
    span
});
const createTsSetterSignature = (key, param, computed = false, optional = false, readonly = false, span = dummySpan) => ({
    type: "TsSetterSignature",
    readonly,
    key,
    computed,
    optional,
    param,
    span
});
const createTsMethodSignature = (key, params, typeAnn, typeParams, computed = false, optional = false, readonly = false, span = dummySpan) => ({
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
const createTsIndexSignature = (params, typeAnnotation, readonly = false, isStatic = false, span = dummySpan) => ({
    type: "TsIndexSignature",
    params,
    typeAnnotation,
    readonly,
    static: isStatic,
    span
});
const createTsKeywordType = (kind, span = dummySpan) => ({
    type: "TsKeywordType",
    kind,
    span
});
const createTsThisType = (span = dummySpan) => ({
    type: "TsThisType",
    span
});
const createTsFunctionType = (params, typeAnnotation, typeParams, span = dummySpan) => ({
    type: "TsFunctionType",
    params,
    typeParams,
    typeAnnotation,
    span
});
const createTsConstructorType = (params, typeAnnotation, typeParams, isAbstract = false, span = dummySpan) => ({
    type: "TsConstructorType",
    params,
    typeParams,
    typeAnnotation,
    isAbstract,
    span
});
const createTsTypeReference = (typeName, typeParams, span = dummySpan) => ({
    type: "TsTypeReference",
    typeName,
    typeParams,
    span
});
const createTsTypePredicate = (paramName, typeAnnotation, asserts = false, span = dummySpan) => ({
    type: "TsTypePredicate",
    asserts,
    paramName,
    typeAnnotation,
    span
});
const createTsImportType = (argument, qualifier, typeArguments, span = dummySpan) => ({
    type: "TsImportType",
    argument,
    qualifier,
    typeArguments,
    span
});
const createTsTypeQuery = (exprName, typeArguments, span = dummySpan) => ({
    type: "TsTypeQuery",
    exprName,
    typeArguments,
    span
});
const createTsTypeLiteral = (members = [], span = dummySpan) => ({
    type: "TsTypeLiteral",
    members,
    span
});
const createTsArrayType = (elemType, span = dummySpan) => ({
    type: "TsArrayType",
    elemType,
    span
});
const createTsTupleType = (elemTypes = [], span = dummySpan) => ({
    type: "TsTupleType",
    elemTypes,
    span
});
const createTsTupleElement = (ty, label, span = dummySpan) => ({
    type: "TsTupleElement",
    label,
    ty,
    span
});
const createTsOptionalType = (typeAnnotation, span = dummySpan) => ({
    type: "TsOptionalType",
    typeAnnotation,
    span
});
const createTsRestType = (typeAnnotation, span = dummySpan) => ({
    type: "TsRestType",
    typeAnnotation,
    span
});
const createTsUnionType = (types = [], span = dummySpan) => ({
    type: "TsUnionType",
    types,
    span
});
const createTsIntersectionType = (types = [], span = dummySpan) => ({
    type: "TsIntersectionType",
    types,
    span
});
const createTsConditionalType = (checkType, extendsType, trueType, falseType, span = dummySpan) => ({
    type: "TsConditionalType",
    checkType,
    extendsType,
    trueType,
    falseType,
    span
});
const createTsInferType = (typeParam, span = dummySpan) => ({
    type: "TsInferType",
    typeParam,
    span
});
const createTsParenthesizedType = (typeAnnotation, span = dummySpan) => ({
    type: "TsParenthesizedType",
    typeAnnotation,
    span
});
const createTsTypeOperator = (op, typeAnnotation, span = dummySpan) => ({
    type: "TsTypeOperator",
    op,
    typeAnnotation,
    span
});
const createTsIndexedAccessType = (objectType, indexType, readonly = false, span = dummySpan) => ({
    type: "TsIndexedAccessType",
    readonly,
    objectType,
    indexType,
    span
});
const createTsMappedType = (typeParam, typeAnnotation, nameType, optional, readonly, span = dummySpan) => ({
    type: "TsMappedType",
    readonly,
    typeParam,
    nameType,
    optional,
    typeAnnotation,
    span
});
const createTsLiteralType = (literal, span = dummySpan) => ({
    type: "TsLiteralType",
    literal,
    span
});
const createTsTemplateLiteralType = (types = [], quasis = [], span = dummySpan) => ({
    type: "TemplateLiteral",
    types,
    quasis,
    span
});
const createTsInterfaceDeclaration = (id, body, _extends = [], typeParams, declare = false, span = dummySpan) => ({
    type: "TsInterfaceDeclaration",
    id,
    declare,
    typeParams,
    extends: _extends,
    body,
    span
});
const createTsInterfaceBody = (body = [], span = dummySpan) => ({
    type: "TsInterfaceBody",
    body,
    span
});
const createTsExpressionWithTypeArguments = (expression, typeArguments, span = dummySpan) => ({
    type: "TsExpressionWithTypeArguments",
    expression,
    typeArguments,
    span
});
const createTsTypeAliasDeclaration = (id, typeAnnotation, typeParams, declare = false, span = dummySpan) => ({
    type: "TsTypeAliasDeclaration",
    declare,
    id,
    typeParams,
    typeAnnotation,
    span
});
const createTsEnumDeclaration = (id, members = [], declare = false, isConst = false, span = dummySpan) => ({
    type: "TsEnumDeclaration",
    declare,
    isConst,
    id,
    members,
    span
});
const createTsEnumMember = (id, init, span = dummySpan) => ({
    type: "TsEnumMember",
    id,
    init,
    span
});
const createTsModuleDeclaration = (id, body, declare = false, global = false, span = dummySpan) => ({
    type: "TsModuleDeclaration",
    declare,
    global,
    id,
    body,
    span,
});
const createTsModuleBlock = (body, span = dummySpan) => ({
    type: "TsModuleBlock",
    body,
    span,
});
const createTsNamespaceDeclaration = (id, body, declare = false, global = false, span = dummySpan) => ({
    type: "TsNamespaceDeclaration",
    declare,
    global,
    id,
    body,
    span
});
const createTsImportEqualsDeclaration = (id, moduleRef, declare = false, isExport = false, isTypeOnly = false, span = dummySpan) => ({
    type: "TsImportEqualsDeclaration",
    declare,
    isExport,
    isTypeOnly,
    id,
    moduleRef,
    span
});
const createTsExternalModuleReference = (expression, span = dummySpan) => ({
    type: "TsExternalModuleReference",
    expression,
    span
});
const createTsExportAssignment = (expression, span = dummySpan) => ({
    type: "TsExportAssignment",
    expression,
    span
});
const createTsNamespaceExportDeclaration = (id, span = dummySpan) => ({
    type: "TsNamespaceExportDeclaration",
    id,
    span
});
const createTsAsExpression = (expression, typeAnnotation, span = dummySpan) => ({
    type: "TsAsExpression",
    expression,
    typeAnnotation,
    span,
});
const createTsSatisfiesExpression = (expression, typeAnnotation, span = dummySpan) => ({
    type: "TsSatisfiesExpression",
    expression,
    typeAnnotation,
    span,
});
const createTsInstantiation = (expression, typeArguments, span = dummySpan) => ({
    type: "TsInstantiation",
    expression,
    typeArguments,
    span
});
const createTsTypeAssertion = (expression, typeAnnotation, span = dummySpan) => ({
    type: "TsTypeAssertion",
    expression,
    typeAnnotation,
    span,
});
const createTsConstAssertion = (expression, span = dummySpan) => ({
    type: "TsConstAssertion",
    expression,
    span,
});
const createTsNonNullExpression = (expression, span = dummySpan) => ({
    type: "TsNonNullExpression",
    expression,
    span
});
const createInvalid = (span = dummySpan) => ({
    type: "Invalid",
    span
});

export { createArgument, createArrayExpression, createArrayPattern, createArrowFunctionExpression, createAssignmentExpression, createAssignmentPattern, createAssignmentPatternProperty, createAssignmentProperty, createAwaitExpression, createBigIntLiteral, createBinaryExpression, createBlockStatement, createBooleanLiteral, createBreakStatement, createCallExpression, createCatchClause, createClassDeclaration, createClassExpression, createClassMethod, createClassProperty, createComputed, createComputedPropName, createConditionalExpression, createConstructor, createContinueStatement, createDebuggerStatement, createDecorator, createDoWhileStatement, createEmptyStatement, createExportAllDeclaration, createExportDeclaration, createExportDefaultDeclaration, createExportDefaultExpression, createExportDefaultSpecifier, createExportNamedDeclaration, createExportNamespaceSpecifier, createExportSpecifier, createExprOrSpread, createExpressionStatement, createForInStatement, createForOfStatement, createForStatement, createFunctionDeclaration, createFunctionExpression, createGetterProperty, createIdentifier, createIfStatement, createImport, createImportDeclaration, createImportDefaultSpecifier, createImportNamespaceSpecifier, createImportSpecifier, createInvalid, createJSXAttribute, createJSXClosingElement, createJSXClosingFragment, createJSXElement, createJSXEmptyExpression, createJSXExpressionContainer, createJSXFragment, createJSXMemberExpression, createJSXNamespacedName, createJSXOpeningElement, createJSXOpeningFragment, createJSXSpreadChild, createJSXText, createKeyValuePatternProperty, createKeyValueProperty, createLabeledStatement, createMemberExpression, createMetaProperty, createMethodProperty, createModule, createNamedExportSpecifier, createNamedImportSpecifier, createNewExpression, createNullLiteral, createNumericLiteral, createObjectExpression, createObjectPattern, createOptionalChainingCall, createOptionalChainingExpression, createParam, createParenthesisExpression, createPrivateMethod, createPrivateName, createPrivateProperty, createRegExpLiteral, createRestElement, createReturnStatement, createScript, createSequenceExpression, createSetterProperty, createSpan, createSpreadElement, createStaticBlock, createStringLiteral, createSuper, createSuperPropExpression, createSwitchCase, createSwitchStatement, createTaggedTemplateExpression, createTemplateElement, createTemplateLiteral, createThisExpression, createThrowStatement, createTryStatement, createTsArrayType, createTsAsExpression, createTsCallSignatureDeclaration, createTsConditionalType, createTsConstAssertion, createTsConstructSignatureDeclaration, createTsConstructorType, createTsEnumDeclaration, createTsEnumMember, createTsExportAssignment, createTsExpressionWithTypeArguments, createTsExternalModuleReference, createTsFunctionType, createTsGetterSignature, createTsImportEqualsDeclaration, createTsImportType, createTsIndexSignature, createTsIndexedAccessType, createTsInferType, createTsInstantiation, createTsInterfaceBody, createTsInterfaceDeclaration, createTsIntersectionType, createTsKeywordType, createTsLiteralType, createTsMappedType, createTsMethodSignature, createTsModuleBlock, createTsModuleDeclaration, createTsNamespaceDeclaration, createTsNamespaceExportDeclaration, createTsNonNullExpression, createTsOptionalType, createTsParameterProperty, createTsParenthesizedType, createTsPropertySignature, createTsQualifiedName, createTsRestType, createTsSatisfiesExpression, createTsSetterSignature, createTsTemplateLiteralType, createTsThisType, createTsTupleElement, createTsTupleType, createTsTypeAliasDeclaration, createTsTypeAnnotation, createTsTypeAssertion, createTsTypeLiteral, createTsTypeOperator, createTsTypeParameter, createTsTypeParameterDeclaration, createTsTypeParameterInstantiation, createTsTypePredicate, createTsTypeQuery, createTsTypeReference, createTsUnionType, createUnaryExpression, createUpdateExpression, createVariableDeclaration, createVariableDeclarator, createWhileStatement, createWithStatement, createYieldExpression };
