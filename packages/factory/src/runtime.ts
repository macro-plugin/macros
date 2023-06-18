import type { Accessibility, Argument, ArrayExpression, ArrayPattern, ArrowFunctionExpression, AssignmentExpression, AssignmentOperator, AssignmentPattern, AssignmentPatternProperty, AssignmentProperty, AwaitExpression, BigIntLiteral, BinaryExpression, BinaryOperator, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, CatchClause, ClassDeclaration, ClassExpression, ClassMember, ClassMethod, ClassProperty, ComputedPropName, ConditionalExpression, Constructor, ContinueStatement, DebuggerStatement, Declaration, Decorator, DefaultDecl, DoWhileStatement, EmptyStatement, ExportAllDeclaration, ExportDeclaration, ExportDefaultDeclaration, ExportDefaultExpression, ExportDefaultSpecifier, ExportNamedDeclaration, ExportNamespaceSpecifier, ExportSpecifier, ExprOrSpread, Expression, ExpressionStatement, Fn, ForInStatement, ForOfStatement, ForStatement, FunctionDeclaration, FunctionExpression, GetterProperty, Identifier, IfStatement, Import, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Invalid, JSXAttrValue, JSXAttribute, JSXAttributeName, JSXAttributeOrSpread, JSXClosingElement, JSXClosingFragment, JSXElement, JSXElementChild, JSXElementName, JSXEmptyExpression, JSXExpression, JSXExpressionContainer, JSXFragment, JSXMemberExpression, JSXNamespacedName, JSXObject, JSXOpeningElement, JSXOpeningFragment, JSXSpreadChild, JSXText, KeyValuePatternProperty, KeyValueProperty, LabeledStatement, MemberExpression, MetaProperty, MethodKind, MethodProperty, Module, ModuleExportName, ModuleItem, NamedExportSpecifier, NewExpression, NullLiteral, NumericLiteral, ObjectExpression, ObjectPattern, ObjectPatternProperty, OptionalChainingCall, OptionalChainingExpression, Param, ParenthesisExpression, Pattern, PrivateMethod, PrivateName, PrivateProperty, Property, PropertyName, RegExpLiteral, RestElement, ReturnStatement, Script, SequenceExpression, SetterProperty, Span, SpreadElement, Statement, StaticBlock, StringLiteral, Super, SuperPropExpression, SwitchCase, SwitchStatement, TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, ThrowStatement, TruePlusMinus, TryStatement, TsArrayType, TsAsExpression, TsCallSignatureDeclaration, TsConditionalType, TsConstAssertion, TsConstructSignatureDeclaration, TsConstructorType, TsEntityName, TsEnumDeclaration, TsEnumMember, TsEnumMemberId, TsExportAssignment, TsExpressionWithTypeArguments, TsExternalModuleReference, TsFnParameter, TsFunctionType, TsGetterSignature, TsImportEqualsDeclaration, TsImportType, TsIndexSignature, TsIndexedAccessType, TsInferType, TsInstantiation, TsInterfaceBody, TsInterfaceDeclaration, TsIntersectionType, TsKeywordType, TsKeywordTypeKind, TsLiteral, TsLiteralType, TsMappedType, TsMethodSignature, TsModuleBlock, TsModuleDeclaration, TsModuleName, TsModuleReference, TsNamespaceBody, TsNamespaceDeclaration, TsNamespaceExportDeclaration, TsNonNullExpression, TsOptionalType, TsParameterProperty, TsParameterPropertyParameter, TsParenthesizedType, TsPropertySignature, TsQualifiedName, TsRestType, TsSatisfiesExpression, TsSetterSignature, TsTemplateLiteralType, TsThisType, TsThisTypeOrIdent, TsTupleElement, TsTupleType, TsType, TsTypeAliasDeclaration, TsTypeAnnotation, TsTypeAssertion, TsTypeElement, TsTypeLiteral, TsTypeOperator, TsTypeOperatorOp, TsTypeParameter, TsTypeParameterDeclaration, TsTypeParameterInstantiation, TsTypePredicate, TsTypeQuery, TsTypeQueryExpr, TsTypeReference, TsUnionType, UnaryExpression, UnaryOperator, UpdateExpression, UpdateOperator, VariableDeclaration, VariableDeclarationKind, VariableDeclarator, WhileStatement, WithStatement, YieldExpression } from "@swc/core"

import { dummySpan } from "@macro-plugin/core"

export const createIdentifier = (value: string, optional = false, span: Span = dummySpan) => ({
  type: "Identifier",
  value,
  optional,
  span,
} satisfies Identifier)

export const createStringLiteral = (value: string, raw?: string, span: Span = dummySpan) => ({
  type: "StringLiteral",
  value,
  raw,
  span
} satisfies StringLiteral)

export const createNumericLiteral = (value: number, raw?: string, span: Span = dummySpan) => ({
  type: "NumericLiteral",
  value,
  raw,
  span
} satisfies NumericLiteral)

export const createBigIntLiteral = (value: bigint, raw?: string, span: Span = dummySpan) => ({
  type: "BigIntLiteral",
  value,
  raw,
  span
} satisfies BigIntLiteral)

export const createBooleanLiteral = (value: boolean, span: Span = dummySpan) => ({
  type: "BooleanLiteral",
  value,
  span
} satisfies BooleanLiteral)

export const createNullLiteral = (span: Span = dummySpan) => ({
  type: "NullLiteral",
  span
} satisfies NullLiteral)

export const createRegExpLiteral = (pattern: string, flags: string, span: Span = dummySpan) => ({
  type: "RegExpLiteral",
  pattern,
  flags,
  span
} satisfies RegExpLiteral)

export const createArgument = (expression: Expression, spread = false, span: Span = dummySpan) => ({
  spread: spread ? span : undefined,
  expression
} satisfies Argument)

export const createCallExpression = (callee: Expression | Super | Import, args: Argument[] = [], typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "CallExpression",
  span,
  callee,
  arguments: args,
  typeArguments
} satisfies CallExpression)

export const createClassProperty = (key: PropertyName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], declare = false, definite = false, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, readonly = false, span: Span = dummySpan) => ({
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
} satisfies ClassProperty)

export const createPrivateProperty = (key: PrivateName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], definite = false, isOptional = false, isOverride = false, isStatic = false, readonly = false, span: Span = dummySpan) => ({
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
} satisfies PrivateProperty)

export const createParam = (pat: Pattern, decorators?: Decorator[], span: Span = dummySpan) => ({
  type: "Parameter",
  pat,
  decorators,
  span
} satisfies Param)

export const createConstructor = (key: PropertyName, params: (TsParameterProperty | Param)[], body?: BlockStatement, accessibility?: Accessibility, isOptional = false, span: Span = dummySpan) => ({
  type: "Constructor",
  key,
  params,
  body,
  span,
  accessibility,
  isOptional,
} satisfies Constructor)

export const createClassMethod = (kind: MethodKind, key: PropertyName, fn: Fn, accessibility?: Accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, span: Span = dummySpan) => ({
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
} satisfies ClassMethod)

export const createPrivateMethod = (kind: MethodKind, key: PrivateName, fn: Fn, accessibility?: Accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, span: Span = dummySpan) => ({
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
} satisfies PrivateMethod)

export const createStaticBlock = (body: BlockStatement, span: Span = dummySpan) => ({
  type: "StaticBlock",
  body,
  span
} satisfies StaticBlock)

export const createDecorator = (expression: Expression, span: Span = dummySpan) => ({
  type: "Decorator",
  expression,
  span
} satisfies Decorator)

export const createFunctionDeclaration = (identifier: Identifier, params: Param[], body?: BlockStatement, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], declare = false, async = false, generator = false, span: Span = dummySpan) => ({
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
} satisfies FunctionDeclaration)

export const createClassDeclaration = (identifier: Identifier, body: ClassMember[], impls: TsExpressionWithTypeArguments[], superClass?: Expression, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], declare = false, isAbstract = false, span: Span = dummySpan) => ({
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
} satisfies ClassDeclaration)

export const createVariableDeclaration = (kind: VariableDeclarationKind, declarations: VariableDeclarator[] = [], declare = false, span: Span = dummySpan) => ({
  type: "VariableDeclaration",
  kind,
  declare,
  declarations,
  span,
} satisfies VariableDeclaration)

export const createVariableDeclarator = (id: Pattern, init?: Expression, definite = false, span: Span = dummySpan) => ({
  type: "VariableDeclarator",
  id,
  definite,
  init,
  span
} satisfies VariableDeclarator)

export const createOptionalChainingExpression = (base: MemberExpression | OptionalChainingCall, span: Span = dummySpan) => ({
  type: "OptionalChainingExpression",
  questionDotToken: span,
  base,
  span
} satisfies OptionalChainingExpression)

export const createOptionalChainingCall = (callee: Expression, args: ExprOrSpread[] = [], typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "CallExpression",
  callee,
  arguments: args,
  typeArguments,
  span
} satisfies OptionalChainingCall)

export const createThisExpression = (span: Span = dummySpan) => ({
  type: "ThisExpression",
  span
} satisfies ThisExpression)

export const createArrayExpression = (elements: (ExprOrSpread | undefined)[] = [], span: Span = dummySpan) => ({
  type: "ArrayExpression",
  elements,
  span
} satisfies ArrayExpression)

export const createExprOrSpread = (expression: Expression, spread = false, span: Span = dummySpan) => ({
  spread: spread ? span : undefined,
  expression,
} satisfies ExprOrSpread)

export const createObjectExpression = (properties: (SpreadElement | Property)[] = [], span: Span = dummySpan) => ({
  type: "ObjectExpression",
  properties,
  span
} satisfies ObjectExpression)

export const createSpreadElement = (args: Expression, span: Span = dummySpan) => ({
  type: "SpreadElement",
  spread: span,
  arguments: args,
} satisfies SpreadElement)

export const createUnaryExpression = (operator: UnaryOperator, argument: Expression, span: Span = dummySpan) => ({
  type: "UnaryExpression",
  span,
  operator,
  argument
} satisfies UnaryExpression)

export const createUpdateExpression = (operator: UpdateOperator, argument: Expression, prefix = false, span: Span = dummySpan) => ({
  type: "UpdateExpression",
  operator,
  prefix,
  argument,
  span
} satisfies UpdateExpression)

export const createBinaryExpression = (left: Expression, operator: BinaryOperator, right: Expression, span: Span = dummySpan) => ({
  type: "BinaryExpression",
  operator,
  left,
  right,
  span
} satisfies BinaryExpression)

export const createFunctionExpression = (params: Param[], body?: BlockStatement, identifier?: Identifier, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], async = false, generator = false, span: Span = dummySpan) => ({
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
} satisfies FunctionExpression)

export const createClassExpression = (body: ClassMember[], impls: TsExpressionWithTypeArguments[] = [], superClass?: Expression, identifier?: Identifier, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], isAbstract = false, span: Span = dummySpan) => ({
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
} satisfies ClassExpression)

export const createAssignmentExpression = (left: Expression | Pattern, operator: AssignmentOperator, right: Expression, span: Span = dummySpan) => ({
  type: "AssignmentExpression",
  operator,
  left,
  right,
  span
} satisfies AssignmentExpression)

export const createMemberExpression = (object: Expression, property: Identifier | PrivateName | ComputedPropName, span: Span = dummySpan) => ({
  type: "MemberExpression",
  object,
  property,
  span
} satisfies MemberExpression)

export const createSuperPropExpression = (obj: Super, property: Identifier | ComputedPropName, span: Span = dummySpan) => ({
  type: "SuperPropExpression",
  obj,
  property,
  span
} satisfies SuperPropExpression)

export const createConditionalExpression = (test: Expression, consequent: Expression, alternate: Expression, span: Span = dummySpan) => ({
  type: "ConditionalExpression",
  test,
  consequent,
  alternate,
  span
} satisfies ConditionalExpression)

export const createSuper = (span: Span = dummySpan) => ({
  type: "Super",
  span
} satisfies Super)

export const createImport = (span: Span = dummySpan) => ({
  type: "Import",
  span
} satisfies Import)

export const createNewExpression = (callee: Expression, args?: Argument[], typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "NewExpression",
  callee,
  arguments: args,
  typeArguments,
  span
} satisfies NewExpression)

export const createSequenceExpression = (expressions: Expression[], span: Span = dummySpan) => ({
  type: "SequenceExpression",
  expressions,
  span
} satisfies SequenceExpression)

export const createArrowFunctionExpression = (params: Pattern[], body: BlockStatement | Expression, async = false, generator = false, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, span: Span = dummySpan) => ({
  type: "ArrowFunctionExpression",
  params,
  body,
  async,
  generator,
  typeParameters,
  span,
  returnType,
} satisfies ArrowFunctionExpression)

export const createYieldExpression = (argument?: Expression, delegate = false, span: Span = dummySpan) => ({
  type: "YieldExpression",
  argument,
  delegate,
  span
} satisfies YieldExpression)

export const createMetaProperty = (kind: "new.target" | "import.meta", span: Span = dummySpan) => ({
  type: "MetaProperty",
  kind,
  span
} satisfies MetaProperty)

export const createAwaitExpression = (argument: Expression, span: Span = dummySpan) => ({
  type: "AwaitExpression",
  argument,
  span
} satisfies AwaitExpression)

export const createTemplateLiteral = (expressions: Expression[] = [], quasis: TemplateElement[] = [], span: Span = dummySpan) => ({
  type: "TemplateLiteral",
  expressions,
  quasis,
  span
} satisfies TemplateLiteral)

export const createTaggedTemplateExpression = (tag: Expression, template: TemplateLiteral, typeParameters?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "TaggedTemplateExpression",
  tag,
  typeParameters,
  span,
  template,
} satisfies TaggedTemplateExpression)

export const createTemplateElement = (raw: string, cooked?: string, tail = false, span: Span = dummySpan) => ({
  type: "TemplateElement",
  tail,
  cooked,
  raw,
  span
} satisfies TemplateElement)

export const createParenthesisExpression = (expression: Expression, span: Span = dummySpan) => ({
  type: "ParenthesisExpression",
  expression,
  span
} satisfies ParenthesisExpression)

export const createPrivateName = (id: Identifier, span: Span = dummySpan) => ({
  type: "PrivateName",
  id,
  span
} satisfies PrivateName)

export const createJSXMemberExpression = (object: JSXObject, property: Identifier) => ({
  type: "JSXMemberExpression",
  object,
  property,
} satisfies JSXMemberExpression)

export const createJSXNamespacedName = (namespace: Identifier, name: Identifier) => ({
  type: "JSXNamespacedName",
  namespace,
  name,
} satisfies JSXNamespacedName)

export const createJSXEmptyExpression = (span: Span = dummySpan) => ({
  type: "JSXEmptyExpression",
  span
} satisfies JSXEmptyExpression)

export const createJSXExpressionContainer = (expression: JSXExpression, span: Span = dummySpan) => ({
  type: "JSXExpressionContainer",
  expression,
  span
} satisfies JSXExpressionContainer)

export const createJSXSpreadChild = (expression: Expression, span: Span = dummySpan) => ({
  type: "JSXSpreadChild",
  expression,
  span
} satisfies JSXSpreadChild)

export const createJSXOpeningElement = (name: JSXElementName, attributes: JSXAttributeOrSpread[] = [], selfClosing = false, typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "JSXOpeningElement",
  name,
  attributes,
  selfClosing,
  typeArguments,
  span
} satisfies JSXOpeningElement)

export const createJSXClosingElement = (name: JSXElementName, span: Span = dummySpan) => ({
  type: "JSXClosingElement",
  name,
  span
} satisfies JSXClosingElement)

export const createJSXAttribute = (name: JSXAttributeName, value?: JSXAttrValue, span: Span = dummySpan) => ({
  type: "JSXAttribute",
  name,
  value,
  span
} satisfies JSXAttribute)

export const createJSXText = (value: string, raw: string = JSON.stringify(value), span: Span = dummySpan) => ({
  type: "JSXText",
  value,
  raw,
  span
} satisfies JSXText)

export const createJSXElement = (opening: JSXOpeningElement, children: JSXElementChild[] = [], closing?: JSXClosingElement, span: Span = dummySpan) => ({
  type: "JSXElement",
  opening,
  children,
  closing,
  span
} satisfies JSXElement)

export const createJSXFragment = (opening: JSXOpeningFragment, children: JSXElementChild[] = [], closing: JSXClosingFragment, span: Span = dummySpan) => ({
  type: "JSXFragment",
  opening,
  children,
  closing,
  span
} satisfies JSXFragment)

export const createJSXOpeningFragment = (span: Span = dummySpan) => ({
  type: "JSXOpeningFragment",
  span
} satisfies JSXOpeningFragment)

export const createJSXClosingFragment = (span: Span = dummySpan) => ({
  type: "JSXClosingFragment",
  span
} satisfies JSXClosingFragment)

export const createExportDefaultExpression = (expression: Expression, span: Span = dummySpan) => ({
  type: "ExportDefaultExpression",
  expression,
  span
} satisfies ExportDefaultExpression)

export const createExportDeclaration = (declaration: Declaration, span: Span = dummySpan) => ({
  type: "ExportDeclaration",
  declaration,
  span
} satisfies ExportDeclaration)

export const createImportDeclaration = (specifiers: ImportSpecifier[], source: StringLiteral, asserts?: ObjectExpression, typeOnly: boolean = false, span: Span = dummySpan) => ({
  type: "ImportDeclaration",
  specifiers,
  source,
  typeOnly,
  asserts,
  span
} satisfies ImportDeclaration)

export const createExportAllDeclaration = (source: StringLiteral, asserts?: ObjectExpression, span: Span = dummySpan) => ({
  type: "ExportAllDeclaration",
  source,
  asserts,
  span
} satisfies ExportAllDeclaration)

export const createExportNamedDeclaration = (specifiers: ExportSpecifier[], source?: StringLiteral, asserts?: ObjectExpression, typeOnly = false, span: Span = dummySpan) => ({
  type: "ExportNamedDeclaration",
  specifiers,
  source,
  typeOnly,
  asserts,
  span
} satisfies ExportNamedDeclaration)

export const createExportDefaultDeclaration = (decl: DefaultDecl, span: Span = dummySpan) => ({
  type: "ExportDefaultDeclaration",
  decl,
  span
} satisfies ExportDefaultDeclaration)

export const createImportDefaultSpecifier = (local: Identifier, span: Span = dummySpan) => ({
  type: "ImportDefaultSpecifier",
  local,
  span
} satisfies ImportDefaultSpecifier)

export const createImportNamespaceSpecifier = (local: Identifier, span: Span = dummySpan) => ({
  type: "ImportNamespaceSpecifier",
  local,
  span
} satisfies ImportNamespaceSpecifier)

export const createImportSpecifier = (local: Identifier, imported?: ModuleExportName, isTypeOnly = false, span: Span = dummySpan) => ({
  type: "ImportSpecifier",
  local,
  imported,
  isTypeOnly,
  span
} satisfies ImportSpecifier)

export const createNamedImportSpecifier = (local: Identifier, imported?: ModuleExportName, isTypeOnly = false, span: Span = dummySpan) => ({
  type: "ImportSpecifier",
  local,
  imported,
  isTypeOnly,
  span
} satisfies ImportSpecifier)

export const createExportNamespaceSpecifier = (name: ModuleExportName, span: Span = dummySpan) => ({
  type: "ExportNamespaceSpecifier",
  name,
  span
} satisfies ExportNamespaceSpecifier)

export const createExportDefaultSpecifier = (exported: Identifier, span: Span = dummySpan) => ({
  type: "ExportDefaultSpecifier",
  exported,
  span
} satisfies ExportDefaultSpecifier)

export const createExportSpecifier = (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly = false, span: Span = dummySpan) => ({
  type: "ExportSpecifier",
  orig,
  span,
  exported,
  isTypeOnly,
} satisfies NamedExportSpecifier)

export const createNamedExportSpecifier = (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly = false, span: Span = dummySpan) => ({
  type: "ExportSpecifier",
  orig,
  span,
  exported,
  isTypeOnly,
} satisfies NamedExportSpecifier)

export const createModule = (body: ModuleItem[] = [], interpreter?: string, span: Span = dummySpan) => ({
  type: "Module",
  body,
  span,
  interpreter
} as Module)

export const createScript = (body: Statement[] = [], interpreter?: string, span: Span = dummySpan) => ({
  type: "Script",
  body,
  span,
  interpreter
} as Script)

export const createArrayPattern = (elements: (Pattern | undefined)[], optional: boolean = false, typeAnnotation?: TsTypeAnnotation, span: Span = dummySpan) => ({
  type: "ArrayPattern",
  elements,
  optional,
  typeAnnotation,
  span
} satisfies ArrayPattern)

export const createObjectPattern = (properties: ObjectPatternProperty[], optional = false, typeAnnotation?: TsTypeAnnotation, span: Span = dummySpan) => ({
  type: "ObjectPattern",
  properties,
  optional,
  typeAnnotation,
  span
} satisfies ObjectPattern)

export const createAssignmentPattern = (left: Pattern, right: Expression, typeAnnotation?: TsTypeAnnotation, span: Span = dummySpan) => ({
  type: "AssignmentPattern",
  left,
  right,
  typeAnnotation,
  span
} satisfies AssignmentPattern)

export const createRestElement = (argument: Pattern, rest: Span, typeAnnotation?: TsTypeAnnotation, span: Span = dummySpan) => ({
  type: "RestElement",
  rest,
  argument,
  typeAnnotation,
  span
} satisfies RestElement)

export const createKeyValuePatternProperty = (key: PropertyName, value: Pattern) => ({
  type: "KeyValuePatternProperty",
  key,
  value,
} satisfies KeyValuePatternProperty)

export const createAssignmentPatternProperty = (key: Identifier, value?: Expression, span: Span = dummySpan) => ({
  type: "AssignmentPatternProperty",
  key,
  value,
  span
} satisfies AssignmentPatternProperty)

export const createKeyValueProperty = (key: PropertyName, value: Expression) => ({
  type: "KeyValueProperty",
  value,
  key,
} satisfies KeyValueProperty)

export const createAssignmentProperty = (key: Identifier, value: Expression) => ({
  type: "AssignmentProperty",
  key,
  value,
} satisfies AssignmentProperty)

export const createGetterProperty = (key: PropertyName, body?: BlockStatement, typeAnnotation?: TsTypeAnnotation, span: Span = dummySpan) => ({
  type: "GetterProperty",
  typeAnnotation,
  body,
  key,
  span
} satisfies GetterProperty)

export const createSetterProperty = (key: PropertyName, param: Pattern, body?: BlockStatement, span: Span = dummySpan) => ({
  type: "SetterProperty",
  param,
  body,
  key,
  span
} satisfies SetterProperty)

export const createMethodProperty = (key: PropertyName, params: Param[], body?: BlockStatement, async = false, generator = false, decorators?: Decorator[], typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, span: Span = dummySpan) => ({
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
} satisfies MethodProperty)

export const createComputedPropName = (expression: Expression, span: Span = dummySpan) => ({
  type: "Computed",
  expression,
  span
} satisfies ComputedPropName)

export const createComputed = (expression: Expression, span: Span = dummySpan) => ({
  type: "Computed",
  expression,
  span
} satisfies ComputedPropName)

export const createBlockStatement = (stmts: Statement[] = [], span: Span = dummySpan) => ({
  type: "BlockStatement",
  stmts,
  span
} satisfies BlockStatement)

export const createExpressionStatement = (expression: Expression, span: Span = dummySpan) => ({
  type: "ExpressionStatement",
  expression,
  span
} satisfies ExpressionStatement)

export const createEmptyStatement = (span: Span = dummySpan) => ({
  type: "EmptyStatement",
  span
} satisfies EmptyStatement)

export const createDebuggerStatement = (span: Span = dummySpan) => ({
  type: "DebuggerStatement",
  span
} satisfies DebuggerStatement)

export const createWithStatement = (object: Expression, body: Statement, span: Span = dummySpan) => ({
  type: "WithStatement",
  object,
  body,
  span
} satisfies WithStatement)

export const createReturnStatement = (argument?: Expression, span: Span = dummySpan) => ({
  type: "ReturnStatement",
  argument,
  span
} satisfies ReturnStatement)

export const createLabeledStatement = (label: Identifier, body: Statement, span: Span = dummySpan) => ({
  type: "LabeledStatement",
  label,
  body,
  span
} satisfies LabeledStatement)

export const createBreakStatement = (label?: Identifier, span: Span = dummySpan) => ({
  type: "BreakStatement",
  label,
  span
} satisfies BreakStatement)

export const createContinueStatement = (label?: Identifier, span: Span = dummySpan) => ({
  type: "ContinueStatement",
  label,
  span
} satisfies ContinueStatement)

export const createIfStatement = (test: Expression, consequent: Statement, alternate?: Statement, span: Span = dummySpan) => ({
  type: "IfStatement",
  test,
  consequent,
  alternate,
  span
} satisfies IfStatement)

export const createSwitchStatement = (discriminant: Expression, cases: SwitchCase[] = [], span: Span = dummySpan) => ({
  type: "SwitchStatement",
  discriminant,
  cases,
  span
} satisfies SwitchStatement)

export const createThrowStatement = (argument: Expression, span: Span = dummySpan) => ({
  type: "ThrowStatement",
  argument,
  span
} satisfies ThrowStatement)

export const createTryStatement = (block: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement, span: Span = dummySpan) => ({
  type: "TryStatement",
  block,
  handler,
  finalizer,
  span
} satisfies TryStatement)

export const createWhileStatement = (test: Expression, body: Statement, span: Span = dummySpan) => ({
  type: "WhileStatement",
  test,
  body,
  span
} satisfies WhileStatement)

export const createDoWhileStatement = (test: Expression, body: Statement, span: Span = dummySpan) => ({
  type: "DoWhileStatement",
  test,
  body,
  span
} satisfies DoWhileStatement)

export const createForStatement = (body: Statement, init?: VariableDeclaration | Expression, test?: Expression, update?: Expression, span: Span = dummySpan) => ({
  type: "ForStatement",
  init,
  test,
  update,
  body,
  span
} satisfies ForStatement)

export const createForInStatement = (left: VariableDeclaration | Pattern, right: Expression, body: Statement, span: Span = dummySpan) => ({
  type: "ForInStatement",
  left,
  right,
  body,
  span
} satisfies ForInStatement)

export const createForOfStatement = (left: VariableDeclaration | Pattern, right: Expression, body: Statement, _await?: Span, span: Span = dummySpan) => ({
  type: "ForOfStatement",
  await: _await,
  left,
  right,
  body,
  span
} satisfies ForOfStatement)

export const createSwitchCase = (test?: Expression, consequent: Statement[] = [], span: Span = dummySpan) => ({
  type: "SwitchCase",
  test,
  consequent,
  span
} satisfies SwitchCase)

export const createCatchClause = (body: BlockStatement, param?: Pattern, span: Span = dummySpan) => ({
  type: "CatchClause",
  param,
  body,
  span
} satisfies CatchClause)

export const createTsTypeAnnotation = (typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsTypeAnnotation",
  typeAnnotation,
  span
} satisfies TsTypeAnnotation)

export const createTsTypeParameterDeclaration = (parameters: TsTypeParameter[] = [], span: Span = dummySpan) => ({
  type: "TsTypeParameterDeclaration",
  parameters,
  span
} satisfies TsTypeParameterDeclaration)

export const createTsTypeParameter = (name: Identifier, _in: boolean, _out: boolean, constraint?: TsType, _default?: TsType, span: Span = dummySpan) => ({
  type: "TsTypeParameter",
  name,
  in: _in,
  out: _out,
  constraint,
  default: _default,
  span
} satisfies TsTypeParameter)

export const createTsTypeParameterInstantiation = (params: TsType[] = [], span: Span = dummySpan) => ({
  type: "TsTypeParameterInstantiation",
  params,
  span
} satisfies TsTypeParameterInstantiation)

export const createTsParameterProperty = (param: TsParameterPropertyParameter, accessibility?: Accessibility, decorators?: Decorator[], override = false, readonly = false, span: Span = dummySpan) => ({
  type: "TsParameterProperty",
  decorators,
  accessibility,
  override,
  readonly,
  param,
  span
} satisfies TsParameterProperty)

export const createTsQualifiedName = (left: TsEntityName, right: Identifier) => ({
  type: "TsQualifiedName",
  left,
  right,
} satisfies TsQualifiedName)

export const createTsCallSignatureDeclaration = (params: TsFnParameter[] = [], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, span: Span = dummySpan) => ({
  type: "TsCallSignatureDeclaration",
  params,
  typeAnnotation,
  typeParams,
  span
} satisfies TsCallSignatureDeclaration)

export const createTsConstructSignatureDeclaration = (params: TsFnParameter[] = [], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, span: Span = dummySpan) => ({
  type: "TsConstructSignatureDeclaration",
  params,
  typeAnnotation,
  typeParams,
  span
} satisfies TsConstructSignatureDeclaration)

export const createTsPropertySignature = (key: Expression, params: TsFnParameter[], init?: Expression, typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed = false, optional = false, readonly = false, span: Span = dummySpan) => ({
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
} satisfies TsPropertySignature)

export const createTsGetterSignature = (key: Expression, typeAnnotation?: TsTypeAnnotation, computed = false, optional = false, readonly = false, span: Span = dummySpan) => ({
  type: "TsGetterSignature",
  readonly,
  key,
  computed,
  optional,
  typeAnnotation,
  span
} satisfies TsGetterSignature)

export const createTsSetterSignature = (key: Expression, param: TsFnParameter, computed = false, optional = false, readonly = false, span: Span = dummySpan) => ({
  type: "TsSetterSignature",
  readonly,
  key,
  computed,
  optional,
  param,
  span
} satisfies TsSetterSignature)

export const createTsMethodSignature = (key: Expression, params: TsFnParameter[], typeAnn?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed = false, optional = false, readonly = false, span: Span = dummySpan) => ({
  type: "TsMethodSignature",
  readonly,
  key,
  computed,
  optional,
  params,
  typeAnn,
  typeParams,
  span
} satisfies TsMethodSignature)

export const createTsIndexSignature = (params: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, readonly = false, isStatic = false, span: Span = dummySpan) => ({
  type: "TsIndexSignature",
  params,
  typeAnnotation,
  readonly,
  static: isStatic,
  span
} satisfies TsIndexSignature)

export const createTsKeywordType = (kind: TsKeywordTypeKind, span: Span = dummySpan) => ({
  type: "TsKeywordType",
  kind,
  span
} satisfies TsKeywordType)

export const createTsThisType = (span: Span = dummySpan) => ({
  type: "TsThisType",
  span
} satisfies TsThisType)

export const createTsFunctionType = (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, span: Span = dummySpan) => ({
  type: "TsFunctionType",
  params,
  typeParams,
  typeAnnotation,
  span
} satisfies TsFunctionType)

export const createTsConstructorType = (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, isAbstract = false, span: Span = dummySpan) => ({
  type: "TsConstructorType",
  params,
  typeParams,
  typeAnnotation,
  isAbstract,
  span
} satisfies TsConstructorType)

export const createTsTypeReference = (typeName: TsEntityName, typeParams?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "TsTypeReference",
  typeName,
  typeParams,
  span
} satisfies TsTypeReference)

export const createTsTypePredicate = (paramName: TsThisTypeOrIdent, typeAnnotation?: TsTypeAnnotation, asserts = false, span: Span = dummySpan) => ({
  type: "TsTypePredicate",
  asserts,
  paramName,
  typeAnnotation,
  span
} satisfies TsTypePredicate)

export const createTsImportType = (argument: StringLiteral, qualifier?: TsEntityName, typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "TsImportType",
  argument,
  qualifier,
  typeArguments,
  span
} satisfies TsImportType)

export const createTsTypeQuery = (exprName: TsTypeQueryExpr, typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "TsTypeQuery",
  exprName,
  typeArguments,
  span
} satisfies TsTypeQuery)

export const createTsTypeLiteral = (members: TsTypeElement[] = [], span: Span = dummySpan) => ({
  type: "TsTypeLiteral",
  members,
  span
} satisfies TsTypeLiteral)

export const createTsArrayType = (elemType: TsType, span: Span = dummySpan) => ({
  type: "TsArrayType",
  elemType,
  span
} satisfies TsArrayType)

export const createTsTupleType = (elemTypes: TsTupleElement[] = [], span: Span = dummySpan) => ({
  type: "TsTupleType",
  elemTypes,
  span
} satisfies TsTupleType)

export const createTsTupleElement = (ty: TsType, label?: Pattern, span: Span = dummySpan) => ({
  type: "TsTupleElement",
  label,
  ty,
  span
} satisfies TsTupleElement)

export const createTsOptionalType = (typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsOptionalType",
  typeAnnotation,
  span
} satisfies TsOptionalType)

export const createTsRestType = (typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsRestType",
  typeAnnotation,
  span
} satisfies TsRestType)

export const createTsUnionType = (types: TsType[] = [], span: Span = dummySpan) => ({
  type: "TsUnionType",
  types,
  span
} satisfies TsUnionType)

export const createTsIntersectionType = (types: TsType[] = [], span: Span = dummySpan) => ({
  type: "TsIntersectionType",
  types,
  span
} satisfies TsIntersectionType)

export const createTsConditionalType = (checkType: TsType, extendsType: TsType, trueType: TsType, falseType: TsType, span: Span = dummySpan) => ({
  type: "TsConditionalType",
  checkType,
  extendsType,
  trueType,
  falseType,
  span
} satisfies TsConditionalType)

export const createTsInferType = (typeParam: TsTypeParameter, span: Span = dummySpan) => ({
  type: "TsInferType",
  typeParam,
  span
} satisfies TsInferType)

export const createTsParenthesizedType = (typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsParenthesizedType",
  typeAnnotation,
  span
} satisfies TsParenthesizedType)

export const createTsTypeOperator = (op: TsTypeOperatorOp, typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsTypeOperator",
  op,
  typeAnnotation,
  span
} satisfies TsTypeOperator)

export const createTsIndexedAccessType = (objectType: TsType, indexType: TsType, readonly = false, span: Span = dummySpan) => ({
  type: "TsIndexedAccessType",
  readonly,
  objectType,
  indexType,
  span
} satisfies TsIndexedAccessType)

export const createTsMappedType = (typeParam: TsTypeParameter, typeAnnotation?: TsType, nameType?: TsType, optional?: TruePlusMinus, readonly?: TruePlusMinus, span: Span = dummySpan) => ({
  type: "TsMappedType",
  readonly,
  typeParam,
  nameType,
  optional,
  typeAnnotation,
  span
} satisfies TsMappedType)

export const createTsLiteralType = (literal: TsLiteral, span: Span = dummySpan) => ({
  type: "TsLiteralType",
  literal,
  span
} satisfies TsLiteralType)

export const createTsTemplateLiteralType = (types: TsType[] = [], quasis: TemplateElement[] = [], span: Span = dummySpan) => ({
  type: "TemplateLiteral",
  types,
  quasis,
  span
} satisfies TsTemplateLiteralType)

export const createTsInterfaceDeclaration = (id: Identifier, body: TsInterfaceBody, _extends: TsExpressionWithTypeArguments[] = [], typeParams?: TsTypeParameterDeclaration, declare = false, span: Span = dummySpan) => ({
  type: "TsInterfaceDeclaration",
  id,
  declare,
  typeParams,
  extends: _extends,
  body,
  span
} satisfies TsInterfaceDeclaration)

export const createTsInterfaceBody = (body: TsTypeElement[] = [], span: Span = dummySpan) => ({
  type: "TsInterfaceBody",
  body,
  span
} satisfies TsInterfaceBody)

export const createTsExpressionWithTypeArguments = (expression: Expression, typeArguments?: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "TsExpressionWithTypeArguments",
  expression,
  typeArguments,
  span
} satisfies TsExpressionWithTypeArguments)

export const createTsTypeAliasDeclaration = (id: Identifier, typeAnnotation: TsType, typeParams?: TsTypeParameterDeclaration, declare = false, span: Span = dummySpan) => ({
  type: "TsTypeAliasDeclaration",
  declare,
  id,
  typeParams,
  typeAnnotation,
  span
} satisfies TsTypeAliasDeclaration)

export const createTsEnumDeclaration = (id: Identifier, members: TsEnumMember[] = [], declare = false, isConst = false, span: Span = dummySpan) => ({
  type: "TsEnumDeclaration",
  declare,
  isConst,
  id,
  members,
  span
} satisfies TsEnumDeclaration)

export const createTsEnumMember = (id: TsEnumMemberId, init?: Expression, span: Span = dummySpan) => ({
  type: "TsEnumMember",
  id,
  init,
  span
} satisfies TsEnumMember)

export const createTsModuleDeclaration = (id: TsModuleName, body?: TsNamespaceBody, declare = false, global = false, span: Span = dummySpan) => ({
  type: "TsModuleDeclaration",
  declare,
  global,
  id,
  body,
  span,
} satisfies TsModuleDeclaration)

export const createTsModuleBlock = (body: ModuleItem[], span: Span = dummySpan) => ({
  type: "TsModuleBlock",
  body,
  span,
} satisfies TsModuleBlock)

export const createTsNamespaceDeclaration = (id: Identifier, body: TsNamespaceBody, declare = false, global = false, span: Span = dummySpan) => ({
  type: "TsNamespaceDeclaration",
  declare,
  global,
  id,
  body,
  span
} satisfies TsNamespaceDeclaration)

export const createTsImportEqualsDeclaration = (id: Identifier, moduleRef: TsModuleReference, declare = false, isExport = false, isTypeOnly = false, span: Span = dummySpan) => ({
  type: "TsImportEqualsDeclaration",
  declare,
  isExport,
  isTypeOnly,
  id,
  moduleRef,
  span
} satisfies TsImportEqualsDeclaration)

export const createTsExternalModuleReference = (expression: StringLiteral, span: Span = dummySpan) => ({
  type: "TsExternalModuleReference",
  expression,
  span
} satisfies TsExternalModuleReference)

export const createTsExportAssignment = (expression: Expression, span: Span = dummySpan) => ({
  type: "TsExportAssignment",
  expression,
  span
} satisfies TsExportAssignment)

export const createTsNamespaceExportDeclaration = (id: Identifier, span: Span = dummySpan) => ({
  type: "TsNamespaceExportDeclaration",
  id,
  span
} satisfies TsNamespaceExportDeclaration)

export const createTsAsExpression = (expression: Expression, typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsAsExpression",
  expression,
  typeAnnotation,
  span,
} satisfies TsAsExpression)

export const createTsSatisfiesExpression = (expression: Expression, typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsSatisfiesExpression",
  expression,
  typeAnnotation,
  span,
} satisfies TsSatisfiesExpression)

export const createTsInstantiation = (expression: Expression, typeArguments: TsTypeParameterInstantiation, span: Span = dummySpan) => ({
  type: "TsInstantiation",
  expression,
  typeArguments,
  span
} satisfies TsInstantiation)

export const createTsTypeAssertion = (expression: Expression, typeAnnotation: TsType, span: Span = dummySpan) => ({
  type: "TsTypeAssertion",
  expression,
  typeAnnotation,
  span,
} satisfies TsTypeAssertion)

export const createTsConstAssertion = (expression: Expression, span: Span = dummySpan) => ({
  type: "TsConstAssertion",
  expression,
  span,
} satisfies TsConstAssertion)

export const createTsNonNullExpression = (expression: Expression, span: Span = dummySpan) => ({
  type: "TsNonNullExpression",
  expression,
  span
} satisfies TsNonNullExpression)

export const createInvalid = (span: Span = dummySpan) => ({
  type: "Invalid",
  span
} satisfies Invalid)
