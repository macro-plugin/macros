import type { Accessibility, Argument, ArrayExpression, ArrayPattern, ArrowFunctionExpression, AssignmentExpression, AssignmentOperator, AssignmentPattern, AssignmentPatternProperty, AssignmentProperty, AwaitExpression, BigIntLiteral, BinaryExpression, BinaryOperator, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, CatchClause, ClassDeclaration, ClassExpression, ClassMember, ClassMethod, ClassProperty, ComputedPropName, ConditionalExpression, Constructor, ContinueStatement, DebuggerStatement, Declaration, Decorator, DefaultDecl, DoWhileStatement, EmptyStatement, ExportAllDeclaration, ExportDeclaration, ExportDefaultDeclaration, ExportDefaultExpression, ExportDefaultSpecifier, ExportNamedDeclaration, ExportNamespaceSpecifier, ExportSpecifier, ExprOrSpread, Expression, ExpressionStatement, Fn, ForInStatement, ForOfStatement, ForStatement, FunctionDeclaration, FunctionExpression, GetterProperty, Identifier, IfStatement, Import, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Invalid, JSXAttrValue, JSXAttribute, JSXAttributeName, JSXAttributeOrSpread, JSXClosingElement, JSXClosingFragment, JSXElement, JSXElementChild, JSXElementName, JSXEmptyExpression, JSXExpression, JSXExpressionContainer, JSXFragment, JSXMemberExpression, JSXNamespacedName, JSXObject, JSXOpeningElement, JSXOpeningFragment, JSXSpreadChild, JSXText, KeyValuePatternProperty, KeyValueProperty, LabeledStatement, MemberExpression, MetaProperty, MethodKind, MethodProperty, Module, ModuleExportName, ModuleItem, NamedExportSpecifier, NewExpression, NullLiteral, NumericLiteral, ObjectExpression, ObjectPattern, ObjectPatternProperty, OptionalChainingCall, OptionalChainingExpression, Param, ParenthesisExpression, Pattern, PrivateMethod, PrivateName, PrivateProperty, Property, PropertyName, RegExpLiteral, RestElement, ReturnStatement, Script, SequenceExpression, SetterProperty, Span, SpreadElement, Statement, StaticBlock, StringLiteral, Super, SuperPropExpression, SwitchCase, SwitchStatement, TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, ThrowStatement, TruePlusMinus, TryStatement, TsArrayType, TsAsExpression, TsCallSignatureDeclaration, TsConditionalType, TsConstAssertion, TsConstructSignatureDeclaration, TsConstructorType, TsEntityName, TsEnumDeclaration, TsEnumMember, TsEnumMemberId, TsExportAssignment, TsExpressionWithTypeArguments, TsExternalModuleReference, TsFnParameter, TsFunctionType, TsGetterSignature, TsImportEqualsDeclaration, TsImportType, TsIndexSignature, TsIndexedAccessType, TsInferType, TsInstantiation, TsInterfaceBody, TsInterfaceDeclaration, TsIntersectionType, TsKeywordType, TsKeywordTypeKind, TsLiteral, TsLiteralType, TsMappedType, TsMethodSignature, TsModuleBlock, TsModuleDeclaration, TsModuleName, TsModuleReference, TsNamespaceBody, TsNamespaceDeclaration, TsNamespaceExportDeclaration, TsNonNullExpression, TsOptionalType, TsParameterProperty, TsParameterPropertyParameter, TsParenthesizedType, TsPropertySignature, TsQualifiedName, TsRestType, TsSetterSignature, TsTemplateLiteralType, TsThisType, TsThisTypeOrIdent, TsTupleElement, TsTupleType, TsType, TsTypeAliasDeclaration, TsTypeAnnotation, TsTypeAssertion, TsTypeElement, TsTypeLiteral, TsTypeOperator, TsTypeOperatorOp, TsTypeParameter, TsTypeParameterDeclaration, TsTypeParameterInstantiation, TsTypePredicate, TsTypeQuery, TsTypeQueryExpr, TsTypeReference, TsUnionType, UnaryExpression, UnaryOperator, UpdateExpression, UpdateOperator, VariableDeclaration, VariableDeclarationKind, VariableDeclarator, WhileStatement, WithStatement, YieldExpression } from "@swc/core"

import { span } from "@macro-plugin/core"

export const createIdentifier = (value: string, optional = false) => ({
  type: "Identifier",
  value,
  optional,
  span,
} satisfies Identifier)

export const createStringLiteral = (value: string, raw?: string) => ({
  type: "StringLiteral",
  value,
  raw,
  span
} satisfies StringLiteral)

export const createNumericLiteral = (value: number, raw?: string) => ({
  type: "NumericLiteral",
  value,
  raw,
  span
} satisfies NumericLiteral)

export const createBigIntLiteral = (value: bigint, raw?: string) => ({
  type: "BigIntLiteral",
  value,
  raw,
  span
} satisfies BigIntLiteral)

export const createBooleanLiteral = (value: boolean) => ({
  type: "BooleanLiteral",
  value,
  span
} satisfies BooleanLiteral)

export const createNullLiteral = () => ({
  type: "NullLiteral",
  span
} satisfies NullLiteral)

export const createRegExpLiteral = (pattern: string, flags: string) => ({
  type: "RegExpLiteral",
  pattern,
  flags,
  span
} satisfies RegExpLiteral)

export const createArgument: (expression: Expression, spread?: boolean) => Argument = (expression, spread) => ({
  spread: spread ? span : undefined,
  expression
})

export const createCallExpression: (callee: Expression | Super | Import, args?: Argument[], typeArguments?: TsTypeParameterInstantiation) => CallExpression = (callee, args = [], typeArguments) => ({
  type: "CallExpression",
  span,
  callee,
  arguments: args,
  typeArguments
})

export const createClassProperty = (key: PropertyName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], declare = false, definite = false, isAbstract = false, isOptional = false, isOverride = false, isStatic = false, readonly = false) => ({
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

export const createPrivateProperty = (key: PrivateName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], definite = false, isOptional = false, isOverride = false, isStatic = false, readonly = false) => ({
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

export const createParam = (pat: Pattern, decorators?: Decorator[]) => ({
  type: "Parameter",
  pat,
  decorators,
  span
} satisfies Param)

export const createConstructor = (key: PropertyName, params: (TsParameterProperty | Param)[], body?: BlockStatement, accessibility?: Accessibility, isOptional = false) => ({
  type: "Constructor",
  key,
  params,
  body,
  span,
  accessibility,
  isOptional,
} satisfies Constructor)

export const createClassMethod = (kind: MethodKind, key: PropertyName, fn: Fn, accessibility?: Accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false) => ({
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

export const createPrivateMethod = (kind: MethodKind, key: PrivateName, fn: Fn, accessibility?: Accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false) => ({
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

export const createStaticBlock = (body: BlockStatement) => ({
  type: "StaticBlock",
  body,
  span
} satisfies StaticBlock)

export const createDecorator = (expression: Expression) => ({
  type: "Decorator",
  expression,
  span
} satisfies Decorator)

export const createFunctionDeclaration = (identifier: Identifier, params: Param[], body?: BlockStatement, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], declare = false, async = false, generator = false) => ({
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

export const createClassDeclaration = (identifier: Identifier, body: ClassMember[], impls: TsExpressionWithTypeArguments[], superClass?: Expression, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], declare = false, isAbstract = false) => ({
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

export const createVariableDeclaration = (kind: VariableDeclarationKind, declare: boolean, declarations: VariableDeclarator[]) => ({
  type: "VariableDeclaration",
  kind,
  declare,
  declarations,
  span,
} satisfies VariableDeclaration)

export const createVariableDeclarator = (
  id: Pattern,
  definite: boolean,
  init?: Expression,
) => ({
  type: "VariableDeclarator",
  id,
  definite,
  init,
  span
} satisfies VariableDeclarator)

export const createOptionalChainingExpression = (base: MemberExpression | OptionalChainingCall, questionDotToken: Span) => ({
  type: "OptionalChainingExpression",
  questionDotToken,
  base,
  span
} satisfies OptionalChainingExpression)

export const createOptionalChainingCall = (callee: Expression, args: ExprOrSpread[] = [], typeArguments?: TsTypeParameterInstantiation) => ({
  type: "CallExpression",
  callee,
  arguments: args,
  typeArguments,
  span
} satisfies OptionalChainingCall)

export const createThisExpression = () => ({
  type: "ThisExpression",
  span
} satisfies ThisExpression)

export const createArrayExpression = (elements: (ExprOrSpread | undefined)[]) => ({
  type: "ArrayExpression",
  elements,
  span
} satisfies ArrayExpression)

export const createExprOrSpread = (expression: Expression, spread?: Span) => ({
  spread,
  expression,
} satisfies ExprOrSpread)

export const createObjectExpression = (properties: (SpreadElement | Property)[]) => ({
  type: "ObjectExpression",
  properties,
  span
} satisfies ObjectExpression)

export const createSpreadElement = (args: Expression, spread: Span) => ({
  type: "SpreadElement",
  spread,
  arguments: args,
} satisfies SpreadElement)

export const createUnaryExpression = (operator: UnaryOperator, argument: Expression) => ({
  type: "UnaryExpression",
  span,
  operator,
  argument
} satisfies UnaryExpression)

export const createUpdateExpression = (operator: UpdateOperator, argument: Expression, prefix = false) => ({
  type: "UpdateExpression",
  operator,
  prefix,
  argument,
  span
} satisfies UpdateExpression)

export const createBinaryExpression = (left: Expression, operator: BinaryOperator, right: Expression) => ({
  type: "BinaryExpression",
  operator,
  left,
  right,
  span
} satisfies BinaryExpression)

export const createFunctionExpression = (params: Param[], body?: BlockStatement, identifier?: Identifier, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation, decorators?: Decorator[], async = false, generator = false) => ({
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

export const createClassExpression = (body: ClassMember[], impls: TsExpressionWithTypeArguments[] = [], superClass?: Expression, identifier?: Identifier, typeParams?: TsTypeParameterDeclaration, superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], isAbstract = false) => ({
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

export const createAssignmentExpression = (left: Expression | Pattern, operator: AssignmentOperator, right: Expression) => ({
  type: "AssignmentExpression",
  operator,
  left,
  right,
  span
} satisfies AssignmentExpression)

export const createMemberExpression = (object: Expression, property: Identifier | PrivateName | ComputedPropName) => ({
  type: "MemberExpression",
  object,
  property,
  span
} satisfies MemberExpression)

export const createSuperPropExpression = (obj: Super, property: Identifier | ComputedPropName) => ({
  type: "SuperPropExpression",
  obj,
  property,
  span
} satisfies SuperPropExpression)

export const createConditionalExpression = (test: Expression, consequent: Expression, alternate: Expression) => ({
  type: "ConditionalExpression",
  test,
  consequent,
  alternate,
  span
} satisfies ConditionalExpression)

export const createSuper = () => ({
  type: "Super",
  span
} satisfies Super)

export const createImport = () => ({
  type: "Import",
  span
} satisfies Import)

export const createNewExpression = (callee: Expression, args?: Argument[], typeArguments?: TsTypeParameterInstantiation,) => ({
  type: "NewExpression",
  callee,
  arguments: args,
  typeArguments,
  span
} satisfies NewExpression)

export const createSequenceExpression = (expressions: Expression[]) => ({
  type: "SequenceExpression",
  expressions,
  span
} satisfies SequenceExpression)

export const createArrowFunctionExpression = (params: Pattern[], body: BlockStatement | Expression, async = false, generator = false, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation) => ({
  type: "ArrowFunctionExpression",
  params,
  body,
  async,
  generator,
  typeParameters,
  span,
  returnType,
} satisfies ArrowFunctionExpression)

export const createYieldExpression = (argument?: Expression, delegate = false) => ({
  type: "YieldExpression",
  argument,
  delegate,
  span
} satisfies YieldExpression)

export const createMetaProperty = (kind: "new.target" | "import.meta") => ({
  type: "MetaProperty",
  kind,
  span
} satisfies MetaProperty)

export const createAwaitExpression = (argument: Expression) => ({
  type: "AwaitExpression",
  argument,
  span
} satisfies AwaitExpression)

export const createTemplateLiteral = (expressions: Expression[] = [], quasis: TemplateElement[] = []) => ({
  type: "TemplateLiteral",
  expressions,
  quasis,
  span
} satisfies TemplateLiteral)

export const createTaggedTemplateExpression = (tag: Expression, template: TemplateLiteral, typeParameters?: TsTypeParameterInstantiation) => ({
  type: "TaggedTemplateExpression",
  tag,
  typeParameters,
  span,
  template,
} satisfies TaggedTemplateExpression)

export const createTemplateElement = (raw: string, cooked?: string, tail = false) => ({
  type: "TemplateElement",
  tail,
  cooked,
  raw,
  span
} satisfies TemplateElement)

export const createParenthesisExpression = (expression: Expression) => ({
  type: "ParenthesisExpression",
  expression,
  span
} satisfies ParenthesisExpression)

export const createPrivateName = (id: Identifier) => ({
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

export const createJSXEmptyExpression = () => ({
  type: "JSXEmptyExpression",
  span
} satisfies JSXEmptyExpression)

export const createJSXExpressionContainer = (expression: JSXExpression) => ({
  type: "JSXExpressionContainer",
  expression,
  span
} satisfies JSXExpressionContainer)

export const createJSXSpreadChild = (expression: Expression) => ({
  type: "JSXSpreadChild",
  expression,
  span
} satisfies JSXSpreadChild)

export const createJSXOpeningElement = (name: JSXElementName, attributes: JSXAttributeOrSpread[], selfClosing = false, typeArguments?: TsTypeParameterInstantiation) => ({
  type: "JSXOpeningElement",
  name,
  attributes,
  selfClosing,
  typeArguments,
  span
} satisfies JSXOpeningElement)

export const createJSXClosingElement = (name: JSXElementName) => ({
  type: "JSXClosingElement",
  name,
  span
} satisfies JSXClosingElement)

export const createJSXAttribute = (name: JSXAttributeName, value?: JSXAttrValue) => ({
  type: "JSXAttribute",
  name,
  value,
  span
} satisfies JSXAttribute)

export const createJSXText = (value: string, raw: string = JSON.stringify(value)) => ({
  type: "JSXText",
  value,
  raw,
  span
} satisfies JSXText)

export const createJSXElement = (opening: JSXOpeningElement, children: JSXElementChild[] = [], closing?: JSXClosingElement) => ({
  type: "JSXElement",
  opening,
  children,
  closing,
  span
} satisfies JSXElement)

export const createJSXFragment = (opening: JSXOpeningFragment, children: JSXElementChild[] = [], closing: JSXClosingFragment) => ({
  type: "JSXFragment",
  opening,
  children,
  closing,
  span
} satisfies JSXFragment)

export const createJSXOpeningFragment = () => ({
  type: "JSXOpeningFragment",
  span
} satisfies JSXOpeningFragment)

export const createJSXClosingFragment = () => ({
  type: "JSXClosingFragment",
  span
} satisfies JSXClosingFragment)

export const createExportDefaultExpression = (expression: Expression) => ({
  type: "ExportDefaultExpression",
  expression,
  span
} satisfies ExportDefaultExpression)

export const createExportDeclaration = (declaration: Declaration) => ({
  type: "ExportDeclaration",
  declaration,
  span
} satisfies ExportDeclaration)

export const createImportDeclaration = (specifiers: ImportSpecifier[], source: StringLiteral, typeOnly: boolean = false, asserts?: ObjectExpression,) => ({
  type: "ImportDeclaration",
  specifiers,
  source,
  typeOnly,
  asserts,
  span
} satisfies ImportDeclaration)

export const createExportAllDeclaration = (source: StringLiteral, asserts?: ObjectExpression) => ({
  type: "ExportAllDeclaration",
  source,
  asserts,
  span
} satisfies ExportAllDeclaration)

export const createExportNamedDeclaration = (specifiers: ExportSpecifier[], source?: StringLiteral, asserts?: ObjectExpression, typeOnly = false,) => ({
  type: "ExportNamedDeclaration",
  specifiers,
  source,
  typeOnly,
  asserts,
  span
} satisfies ExportNamedDeclaration)

export const createExportDefaultDeclaration = (decl: DefaultDecl) => ({
  type: "ExportDefaultDeclaration",
  decl,
  span
} satisfies ExportDefaultDeclaration)

export const createImportDefaultSpecifier = (local: Identifier) => ({
  type: "ImportDefaultSpecifier",
  local,
  span
} satisfies ImportDefaultSpecifier)

export const createImportNamespaceSpecifier = (local: Identifier) => ({
  type: "ImportNamespaceSpecifier",
  local,
  span
} satisfies ImportNamespaceSpecifier)

export const createNamedImportSpecifier = (local: Identifier, imported?: ModuleExportName, isTypeOnly = false) => ({
  type: "ImportSpecifier",
  local,
  imported,
  isTypeOnly,
  span
} satisfies ImportSpecifier)

export const createExportNamespaceSpecifier = (name: ModuleExportName) => ({
  type: "ExportNamespaceSpecifier",
  name,
  span
} satisfies ExportNamespaceSpecifier)

export const createExportDefaultSpecifier = (exported: Identifier) => ({
  type: "ExportDefaultSpecifier",
  exported,
  span
} satisfies ExportDefaultSpecifier)

export const createNamedExportSpecifier = (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly = false) => ({
  type: "ExportSpecifier",
  orig,
  span,
  exported,
  isTypeOnly,
} satisfies NamedExportSpecifier)

export const createModule = (body: ModuleItem[] = [], interpreter?: string) => ({
  type: "Module",
  body,
  span,
  interpreter
} as Module)

export const createScript = (body: Statement[] = [], interpreter?: string) => ({
  type: "Script",
  body,
  span,
  interpreter
} as Script)

export const createArrayPattern = (elements: (Pattern | undefined)[], optional: boolean = false, typeAnnotation?: TsTypeAnnotation,) => ({
  type: "ArrayPattern",
  elements,
  optional,
  typeAnnotation,
  span
} satisfies ArrayPattern)

export const createObjectPattern = (properties: ObjectPatternProperty[], optional = false, typeAnnotation?: TsTypeAnnotation,) => ({
  type: "ObjectPattern",
  properties,
  optional,
  typeAnnotation,
  span
} satisfies ObjectPattern)

export const createAssignmentPattern = (left: Pattern, right: Expression, typeAnnotation?: TsTypeAnnotation) => ({
  type: "AssignmentPattern",
  left,
  right,
  typeAnnotation,
  span
} satisfies AssignmentPattern)

export const createRestElement = (argument: Pattern, rest: Span, typeAnnotation?: TsTypeAnnotation,) => ({
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

export const createAssignmentPatternProperty = (key: Identifier, value?: Expression) => ({
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

export const createGetterProperty = (key: PropertyName, body?: BlockStatement, typeAnnotation?: TsTypeAnnotation) => ({
  type: "GetterProperty",
  typeAnnotation,
  body,
  key,
  span
} satisfies GetterProperty)

export const createSetterProperty = (key: PropertyName, param: Pattern, body?: BlockStatement) => ({
  type: "SetterProperty",
  param,
  body,
  key,
  span
} satisfies SetterProperty)

export const createMethodProperty = (key: PropertyName, params: Param[], body?: BlockStatement, async = false, generator = false, decorators?: Decorator[], typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation) => ({
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

export const createComputedPropName = (expression: Expression) => ({
  type: "Computed",
  expression,
  span
} satisfies ComputedPropName)

export const createBlockStatement = (stmts: Statement[] = []) => ({
  type: "BlockStatement",
  stmts,
  span
} satisfies BlockStatement)

export const createExpressionStatement = (expression: Expression) => ({
  type: "ExpressionStatement",
  expression,
  span
} satisfies ExpressionStatement)

export const createEmptyStatement = () => ({
  type: "EmptyStatement",
  span
} satisfies EmptyStatement)

export const createDebuggerStatement = () => ({
  type: "DebuggerStatement",
  span
} satisfies DebuggerStatement)

export const createWithStatement = (object: Expression, body: Statement) => ({
  type: "WithStatement",
  object,
  body,
  span
} satisfies WithStatement)

export const createReturnStatement = (argument?: Expression) => ({
  type: "ReturnStatement",
  argument,
  span
} satisfies ReturnStatement)

export const createLabeledStatement = (label: Identifier, body: Statement) => ({
  type: "LabeledStatement",
  label,
  body,
  span
} satisfies LabeledStatement)

export const createBreakStatement = (label?: Identifier) => ({
  type: "BreakStatement",
  label,
  span
} satisfies BreakStatement)

export const createContinueStatement = (label?: Identifier) => ({
  type: "ContinueStatement",
  label,
  span
} satisfies ContinueStatement)

export const createIfStatement = (test: Expression, consequent: Statement, alternate?: Statement) => ({
  type: "IfStatement",
  test,
  consequent,
  alternate,
  span
} satisfies IfStatement)

export const createSwitchStatement = (discriminant: Expression, cases: SwitchCase[] = []) => ({
  type: "SwitchStatement",
  discriminant,
  cases,
  span
} satisfies SwitchStatement)

export const createThrowStatement = (argument: Expression) => ({
  type: "ThrowStatement",
  argument,
  span
} satisfies ThrowStatement)

export const createTryStatement = (block: BlockStatement, handler?: CatchClause, finalizer?: BlockStatement) => ({
  type: "TryStatement",
  block,
  handler,
  finalizer,
  span
} satisfies TryStatement)

export const createWhileStatement = (test: Expression, body: Statement) => ({
  type: "WhileStatement",
  test,
  body,
  span
} satisfies WhileStatement)

export const createDoWhileStatement = (test: Expression, body: Statement) => ({
  type: "DoWhileStatement",
  test,
  body,
  span
} satisfies DoWhileStatement)

export const createForStatement = (body: Statement, init?: VariableDeclaration | Expression, test?: Expression, update?: Expression) => ({
  type: "ForStatement",
  init,
  test,
  update,
  body,
  span
} satisfies ForStatement)

export const createForInStatement = (left: VariableDeclaration | Pattern, right: Expression, body: Statement) => ({
  type: "ForInStatement",
  left,
  right,
  body,
  span
} satisfies ForInStatement)

export const createForOfStatement = (left: VariableDeclaration | Pattern, right: Expression, body: Statement, _await?: Span) => ({
  type: "ForOfStatement",
  await: _await,
  left,
  right,
  body,
  span
} satisfies ForOfStatement)

export const createSwitchCase = (test?: Expression, consequent: Statement[] = []) => ({
  type: "SwitchCase",
  test,
  consequent,
  span
} satisfies SwitchCase)

export const createCatchClause = (body: BlockStatement, param?: Pattern) => ({
  type: "CatchClause",
  param,
  body,
  span
} satisfies CatchClause)

export const createTsTypeAnnotation = (typeAnnotation: TsType) => ({
  type: "TsTypeAnnotation",
  typeAnnotation,
  span
} satisfies TsTypeAnnotation)

export const createTsTypeParameterDeclaration = (parameters: TsTypeParameter[] = []) => ({
  type: "TsTypeParameterDeclaration",
  parameters,
  span
} satisfies TsTypeParameterDeclaration)

export const createTsTypeParameter = (name: Identifier, _in: boolean, _out: boolean, constraint?: TsType, _default?: TsType) => ({
  type: "TsTypeParameter",
  name,
  in: _in,
  out: _out,
  constraint,
  default: _default,
  span
} satisfies TsTypeParameter)

export const createTsTypeParameterInstantiation = (params: TsType[] = []) => ({
  type: "TsTypeParameterInstantiation",
  params,
  span
} satisfies TsTypeParameterInstantiation)

export const createTsParameterProperty = (param: TsParameterPropertyParameter, accessibility?: Accessibility, decorators?: Decorator[], override = false, readonly = false) => ({
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

export const createTsCallSignatureDeclaration = (params: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => ({
  type: "TsCallSignatureDeclaration",
  params,
  typeAnnotation,
  typeParams,
  span
} satisfies TsCallSignatureDeclaration)

export const createTsConstructSignatureDeclaration = (params: TsFnParameter[] = [], typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => ({
  type: "TsConstructSignatureDeclaration",
  params,
  typeAnnotation,
  typeParams,
  span
} satisfies TsConstructSignatureDeclaration)

export const createTsPropertySignature = (key: Expression, params: TsFnParameter[], init?: Expression, typeAnnotation?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed = false, optional = false, readonly = false) => ({
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

export const createTsGetterSignature = (key: Expression, typeAnnotation?: TsTypeAnnotation, computed = false, optional = false, readonly = false) => ({
  type: "TsGetterSignature",
  readonly,
  key,
  computed,
  optional,
  typeAnnotation,
  span
} satisfies TsGetterSignature)

export const createTsSetterSignature = (key: Expression, param: TsFnParameter, computed = false, optional = false, readonly = false) => ({
  type: "TsSetterSignature",
  readonly,
  key,
  computed,
  optional,
  param,
  span
} satisfies TsSetterSignature)

export const createTsMethodSignature = (key: Expression, params: TsFnParameter[], typeAnn?: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, computed = false, optional = false, readonly = false) => ({
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

export const createTsIndexSignature = (params: TsFnParameter[], typeAnnotation?: TsTypeAnnotation, readonly = false, isStatic = false) => ({
  type: "TsIndexSignature",
  params,
  typeAnnotation,
  readonly,
  static: isStatic,
  span
} satisfies TsIndexSignature)

export const createTsKeywordType = (kind: TsKeywordTypeKind) => ({
  type: "TsKeywordType",
  kind,
  span
} satisfies TsKeywordType)

export const createTsThisType = () => ({
  type: "TsThisType",
  span
} satisfies TsThisType)

export const createTsFunctionType = (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => ({
  type: "TsFunctionType",
  params,
  typeParams,
  typeAnnotation,
  span
} satisfies TsFunctionType)

export const createTsConstructorType = (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, isAbstract = false) => ({
  type: "TsConstructorType",
  params,
  typeParams,
  typeAnnotation,
  isAbstract,
  span
} satisfies TsConstructorType)

export const createTsTypeReference = (typeName: TsEntityName, typeParams?: TsTypeParameterInstantiation,) => ({
  type: "TsTypeReference",
  typeName,
  typeParams,
  span
} satisfies TsTypeReference)

export const createTsTypePredicate = (paramName: TsThisTypeOrIdent, asserts = false, typeAnnotation?: TsTypeAnnotation,) => ({
  type: "TsTypePredicate",
  asserts,
  paramName,
  typeAnnotation,
  span
} satisfies TsTypePredicate)

export const createTsImportType = (argument: StringLiteral, qualifier?: TsEntityName, typeArguments?: TsTypeParameterInstantiation,) => ({
  type: "TsImportType",
  argument,
  qualifier,
  typeArguments,
  span
} satisfies TsImportType)

export const createTsTypeQuery = (exprName: TsTypeQueryExpr, typeArguments?: TsTypeParameterInstantiation) => ({
  type: "TsTypeQuery",
  exprName,
  typeArguments,
  span
} satisfies TsTypeQuery)

export const createTsTypeLiteral = (members: TsTypeElement[] = []) => ({
  type: "TsTypeLiteral",
  members,
  span
} satisfies TsTypeLiteral)

export const createTsArrayType = (elemType: TsType) => ({
  type: "TsArrayType",
  elemType,
  span
} satisfies TsArrayType)

export const createTsTupleType = (elemTypes: TsTupleElement[] = []) => ({
  type: "TsTupleType",
  elemTypes,
  span
} satisfies TsTupleType)

export const createTsTupleElement = (ty: TsType, label?: Pattern) => ({
  type: "TsTupleElement",
  label,
  ty,
  span
} satisfies TsTupleElement)

export const createTsOptionalType = (typeAnnotation: TsType) => ({
  type: "TsOptionalType",
  typeAnnotation,
  span
} satisfies TsOptionalType)

export const createTsRestType = (typeAnnotation: TsType) => ({
  type: "TsRestType",
  typeAnnotation,
  span
} satisfies TsRestType)

export const createTsUnionType = (types: TsType[] = []) => ({
  type: "TsUnionType",
  types,
  span
} satisfies TsUnionType)

export const createTsIntersectionType = (types: TsType[] = []) => ({
  type: "TsIntersectionType",
  types,
  span
} satisfies TsIntersectionType)

export const createTsConditionalType = (checkType: TsType, extendsType: TsType, trueType: TsType, falseType: TsType) => ({
  type: "TsConditionalType",
  checkType,
  extendsType,
  trueType,
  falseType,
  span
} satisfies TsConditionalType)

export const createTsInferType = (typeParam: TsTypeParameter) => ({
  type: "TsInferType",
  typeParam,
  span
} satisfies TsInferType)

export const createTsParenthesizedType = (typeAnnotation: TsType) => ({
  type: "TsParenthesizedType",
  typeAnnotation,
  span
} satisfies TsParenthesizedType)

export const createTsTypeOperator = (op: TsTypeOperatorOp, typeAnnotation: TsType) => ({
  type: "TsTypeOperator",
  op,
  typeAnnotation,
  span
} satisfies TsTypeOperator)

export const createTsIndexedAccessType = (objectType: TsType, indexType: TsType, readonly = false) => ({
  type: "TsIndexedAccessType",
  readonly,
  objectType,
  indexType,
  span
} satisfies TsIndexedAccessType)

export const createTsMappedType = (typeParam: TsTypeParameter, typeAnnotation?: TsType, nameType?: TsType, optional?: TruePlusMinus, readonly?: TruePlusMinus) => ({
  type: "TsMappedType",
  readonly,
  typeParam,
  nameType,
  optional,
  typeAnnotation,
  span
} satisfies TsMappedType)

export const createTsLiteralType = (literal: TsLiteral) => ({
  type: "TsLiteralType",
  literal,
  span
} satisfies TsLiteralType)

export const createTsTemplateLiteralType = (types: TsType[] = [], quasis: TemplateElement[] = []) => ({
  type: "TemplateLiteral",
  types,
  quasis,
  span
} satisfies TsTemplateLiteralType)

export const createTsInterfaceDeclaration = (id: Identifier, body: TsInterfaceBody, _extends: TsExpressionWithTypeArguments[] = [], typeParams?: TsTypeParameterDeclaration, declare = false) => ({
  type: "TsInterfaceDeclaration",
  id,
  declare,
  typeParams,
  extends: _extends,
  body,
  span
} satisfies TsInterfaceDeclaration)

export const createTsInterfaceBody = (body: TsTypeElement[] = []) => ({
  type: "TsInterfaceBody",
  body,
  span
} satisfies TsInterfaceBody)

export const createTsExpressionWithTypeArguments = (expression: Expression, typeArguments?: TsTypeParameterInstantiation) => ({
  type: "TsExpressionWithTypeArguments",
  expression,
  typeArguments,
  span
} satisfies TsExpressionWithTypeArguments)

export const createTsTypeAliasDeclaration = (id: Identifier, typeAnnotation: TsType, typeParams?: TsTypeParameterDeclaration, declare = false) => ({
  type: "TsTypeAliasDeclaration",
  declare,
  id,
  typeParams,
  typeAnnotation,
  span
} satisfies TsTypeAliasDeclaration)

export const createTsEnumDeclaration = (id: Identifier, members: TsEnumMember[] = [], declare = false, isConst = false) => ({
  type: "TsEnumDeclaration",
  declare,
  isConst,
  id,
  members,
  span
} satisfies TsEnumDeclaration)

export const createTsEnumMember = (id: TsEnumMemberId, init?: Expression,) => ({
  type: "TsEnumMember",
  id,
  init,
  span
} satisfies TsEnumMember)

export const createTsModuleDeclaration = (id: TsModuleName, body?: TsNamespaceBody, declare = false, global = false) => ({
  type: "TsModuleDeclaration",
  declare,
  global,
  id,
  body,
  span,
} satisfies TsModuleDeclaration)

export const createTsModuleBlock = (body: ModuleItem[]) => ({
  type: "TsModuleBlock",
  body,
  span,
} satisfies TsModuleBlock)

export const createTsNamespaceDeclaration = (id: Identifier, body: TsNamespaceBody, declare = false, global = false) => ({
  type: "TsNamespaceDeclaration",
  declare,
  global,
  id,
  body,
  span
} satisfies TsNamespaceDeclaration)

export const createTsImportEqualsDeclaration = (id: Identifier, moduleRef: TsModuleReference, declare = false, isExport = false, isTypeOnly = false) => ({
  type: "TsImportEqualsDeclaration",
  declare,
  isExport,
  isTypeOnly,
  id,
  moduleRef,
  span
} satisfies TsImportEqualsDeclaration)

export const createTsExternalModuleReference = (expression: StringLiteral) => ({
  type: "TsExternalModuleReference",
  expression,
  span
} satisfies TsExternalModuleReference)

export const createTsExportAssignment = (expression: Expression) => ({
  type: "TsExportAssignment",
  expression,
  span
} satisfies TsExportAssignment)

export const createTsNamespaceExportDeclaration = (id: Identifier) => ({
  type: "TsNamespaceExportDeclaration",
  id,
  span
} satisfies TsNamespaceExportDeclaration)

export const createTsAsExpression = (expression: Expression, typeAnnotation: TsType) => ({
  type: "TsAsExpression",
  expression,
  typeAnnotation,
  span,
} satisfies TsAsExpression)

export const createTsInstantiation = (expression: Expression, typeArguments: TsTypeParameterInstantiation) => ({
  type: "TsInstantiation",
  expression,
  typeArguments,
  span
} satisfies TsInstantiation)

export const createTsTypeAssertion = (expression: Expression, typeAnnotation: TsType) => ({
  type: "TsTypeAssertion",
  expression,
  typeAnnotation,
  span,
} satisfies TsTypeAssertion)

export const createTsConstAssertion = (expression: Expression) => ({
  type: "TsConstAssertion",
  expression,
  span,
} satisfies TsConstAssertion)

export const createTsNonNullExpression = (expression: Expression) => ({
  type: "TsNonNullExpression",
  expression,
  span
} satisfies TsNonNullExpression)

export const createInvalid = () => ({
  type: "Invalid",
  span
} satisfies Invalid)
