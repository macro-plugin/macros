import type { Accessibility, Argument, ArrayExpression, ArrayPattern, ArrowFunctionExpression, AssignmentExpression, AssignmentOperator, AssignmentPattern, AssignmentPatternProperty, AssignmentProperty, AwaitExpression, BigIntLiteral, BinaryExpression, BinaryOperator, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, CatchClause, ClassDeclaration, ClassExpression, ClassMember, ClassMethod, ClassProperty, ComputedPropName, ConditionalExpression, Constructor, ContinueStatement, DebuggerStatement, Declaration, Decorator, DefaultDecl, DoWhileStatement, EmptyStatement, ExportAllDeclaration, ExportDeclaration, ExportDefaultDeclaration, ExportDefaultExpression, ExportDefaultSpecifier, ExportNamedDeclaration, ExportNamespaceSpecifier, ExportSpecifier, ExprOrSpread, Expression, ExpressionStatement, Fn, ForInStatement, ForOfStatement, ForStatement, FunctionDeclaration, FunctionExpression, GetterProperty, Identifier, IfStatement, Import, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, JSXAttrValue, JSXAttribute, JSXAttributeName, JSXAttributeOrSpread, JSXClosingElement, JSXClosingFragment, JSXElement, JSXElementChild, JSXElementName, JSXEmptyExpression, JSXExpression, JSXExpressionContainer, JSXFragment, JSXMemberExpression, JSXNamespacedName, JSXObject, JSXOpeningElement, JSXOpeningFragment, JSXSpreadChild, JSXText, KeyValuePatternProperty, KeyValueProperty, LabeledStatement, MemberExpression, MetaProperty, MethodKind, MethodProperty, Module, ModuleExportName, ModuleItem, NamedExportSpecifier, NewExpression, NullLiteral, NumericLiteral, ObjectExpression, ObjectPattern, ObjectPatternProperty, OptionalChainingCall, OptionalChainingExpression, Param, ParenthesisExpression, Pattern, PrivateMethod, PrivateName, PrivateProperty, Property, PropertyName, RegExpLiteral, RestElement, ReturnStatement, Script, SequenceExpression, SetterProperty, Span, SpreadElement, Statement, StaticBlock, StringLiteral, Super, SuperPropExpression, SwitchCase, SwitchStatement, TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, ThrowStatement, TruePlusMinus, TryStatement, TsArrayType, TsAsExpression, TsCallSignatureDeclaration, TsConditionalType, TsConstAssertion, TsConstructSignatureDeclaration, TsConstructorType, TsEntityName, TsEnumDeclaration, TsEnumMember, TsEnumMemberId, TsExportAssignment, TsExpressionWithTypeArguments, TsExternalModuleReference, TsFnParameter, TsFunctionType, TsGetterSignature, TsImportEqualsDeclaration, TsImportType, TsIndexSignature, TsIndexedAccessType, TsInferType, TsInstantiation, TsInterfaceBody, TsInterfaceDeclaration, TsIntersectionType, TsKeywordType, TsKeywordTypeKind, TsLiteral, TsLiteralType, TsMappedType, TsMethodSignature, TsModuleBlock, TsModuleDeclaration, TsModuleName, TsModuleReference, TsNamespaceBody, TsNamespaceDeclaration, TsNamespaceExportDeclaration, TsNonNullExpression, TsOptionalType, TsParameterProperty, TsParameterPropertyParameter, TsParenthesizedType, TsPropertySignature, TsQualifiedName, TsRestType, TsSetterSignature, TsTemplateLiteralType, TsThisType, TsThisTypeOrIdent, TsTupleElement, TsTupleType, TsType, TsTypeAliasDeclaration, TsTypeAnnotation, TsTypeAssertion, TsTypeElement, TsTypeLiteral, TsTypeOperator, TsTypeOperatorOp, TsTypeParameter, TsTypeParameterDeclaration, TsTypeParameterInstantiation, TsTypePredicate, TsTypeQuery, TsTypeQueryExpr, TsTypeReference, TsUnionType, UnaryExpression, UnaryOperator, UpdateExpression, UpdateOperator, VariableDeclaration, VariableDeclarationKind, VariableDeclarator, WhileStatement, WithStatement, YieldExpression } from "@swc/core"

import { span } from "@macro-plugin/core"

export const createIdentifier: (value: string, optional?: boolean) => Identifier = (value, optional = false) => ({
  type: "Identifier",
  value,
  optional,
  span,
})

export const createStringLiteral: (value: string, raw?: string) => StringLiteral = (value, raw) => ({
  type: "StringLiteral",
  value,
  raw,
  span
})

export const createNumericLiteral: (value: number, raw?: string) => NumericLiteral = (value, raw) => ({
  type: "NumericLiteral",
  value,
  raw,
  span
})

export const createBigIntLiteral: (value: bigint, raw?: string) => BigIntLiteral = (value, raw) => ({
  type: "BigIntLiteral",
  value,
  raw,
  span
})

export const createBooleanLiteral = (value: boolean) => ({
  type: "BooleanLiteral",
  value,
  span
} as BooleanLiteral)

export const createNullLiteral = () => ({
  type: "NullLiteral",
  span
} as NullLiteral)

export const createRegExpLiteral = (pattern: string,
  flags: string) => ({
  type: "RegExpLiteral",
  pattern,
  flags,
  span
} as RegExpLiteral)

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

export const createClassProperty = (key: PropertyName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], declare = false, definite = false,
  isAbstract = false,
  isOptional = false,
  isOverride = false,
  isStatic = false,
  readonly = false) => ({
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
} as ClassProperty)

export const createPrivateProperty = (key: PrivateName, value?: Expression, accessibility?: Accessibility, typeAnnotation?: TsTypeAnnotation, decorators?: Decorator[], definite = false,
  isOptional = false,
  isOverride = false,
  isStatic = false,
  readonly = false) => ({
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
} as PrivateProperty)

export const createParam = (pat: Pattern,
  decorators?: Decorator[]) => ({
  type: "Parameter",
  pat,
  decorators,
  span
} as Param)

export const createConstructor = (key: PropertyName,
  params: (TsParameterProperty | Param)[],
  body?: BlockStatement,
  accessibility?: Accessibility,
  isOptional = false) => ({
  type: "Constructor",
  key,
  params,
  body,
  accessibility,
  isOptional,
} as Constructor)

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
} as ClassMethod)

export const createPrivateMethod = (kind: MethodKind, key: PrivateName, fn: Fn, accessibility?: Accessibility, isAbstract = false, isOptional = false, isOverride = false, isStatic = false) => ({
  type: "PrivateMethod",
  key,
  function: fn,
  kind,
  isStatic,
  accessibility,
  isAbstract,
  isOptional,
  isOverride
} as PrivateMethod)

export const createStaticBlock = (body: BlockStatement) => ({
  type: "StaticBlock",
  body,
  span
} as StaticBlock)

export const createDecorator = (expression: Expression) => ({
  type: "Decorator",
  expression,
  span
} as Decorator)

export const createFunctionDeclaration = (identifier: Identifier, params: Param[], body?: BlockStatement, typeParameters?: TsTypeParameterDeclaration,
  returnType?: TsTypeAnnotation, decorators?: Decorator[], declare = false, async = false, generator = false) => ({
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
} as FunctionDeclaration)

export const createClassDeclaration = (identifier: Identifier, body: ClassMember[], impls: TsExpressionWithTypeArguments[], superClass?: Expression, typeParams?: TsTypeParameterDeclaration,
  superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], declare = false, isAbstract = false) => ({
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
} as ClassDeclaration)

export const createVariableDeclaration = (
  kind: VariableDeclarationKind,
  declare: boolean,
  declarations: VariableDeclarator[],
) => ({
  type: "VariableDeclaration",
  kind,
  declare,
  declarations,
  span,
} as VariableDeclaration)

export const createVariableDeclarator = (
  id: Pattern,
  definite: boolean,
  init?: Expression,
) => ({
  type: "VariableDeclarator",
  id,
  definite,
  init
} as VariableDeclarator)

export const createOptionalChainingExpression = (base: MemberExpression | OptionalChainingCall, questionDotToken: Span) => ({
  type: "OptionalChainingExpression",
  questionDotToken,
  base,
  span
} as OptionalChainingExpression)

export const createOptionalChainingCall = (callee: Expression,
  args: ExprOrSpread[] = [],
  typeArguments?: TsTypeParameterInstantiation) => ({
  type: "CallExpression",
  callee,
  arguments: args,
  typeArguments,
  span
} as OptionalChainingCall)

export const createThisExpression = () => ({
  type: "ThisExpression",
  span
} as ThisExpression)

export const createArrayExpression = (elements: (ExprOrSpread | undefined)[]) => ({
  type: "ArrayExpression",
  elements,
  span
} as ArrayExpression)

export const createExprOrSpread = (expression: Expression, spread?: Span) => ({
  spread,
  expression,
} as ExprOrSpread)

export const createObjectExpression = (properties: (SpreadElement | Property)[]) => ({
  type: "ObjectExpression",
  properties,
  span
} as ObjectExpression)

export const createSpreadElement = (args: Expression, spread: Span) => ({
  type: "SpreadElement",
  spread,
  arguments: args,
} as SpreadElement)

export const createUnaryExpression = (
  operator: UnaryOperator,
  argument: Expression,
) => ({
  type: "UnaryExpression",
  span,
  argument
} as UnaryExpression)

export const createUpdateExpression = (operator: UpdateOperator, argument: Expression, prefix = false) => ({
  type: "UpdateExpression",
  operator,
  prefix,
  argument,
  span
} as UpdateExpression)

export const createBinaryExpression = (
  left: Expression,
  operator: BinaryOperator,
  right: Expression) => ({
  type: "BinaryExpression",
  operator,
  left,
  right,
  span
} as BinaryExpression)

export const createFunctionExpression = (params: Param[], body?: BlockStatement, identifier?: Identifier, typeParameters?: TsTypeParameterDeclaration,
  returnType?: TsTypeAnnotation, decorators?: Decorator[], async = false, generator = false) => ({
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
} as FunctionExpression)

export const createClassExpression = (body: ClassMember[], impls: TsExpressionWithTypeArguments[] = [], superClass?: Expression, identifier?: Identifier, typeParams?: TsTypeParameterDeclaration,
  superTypeParams?: TsTypeParameterInstantiation, decorators?: Decorator[], isAbstract = false) => ({
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
} as ClassExpression)

export const createAssignmentExpression = (left: Expression | Pattern, operator: AssignmentOperator, right: Expression) => ({
  type: "AssignmentExpression",
  operator,
  left,
  right,
  span
} as AssignmentExpression)

export const createMemberExpression = (object: Expression,
  property: Identifier | PrivateName | ComputedPropName) => ({
  type: "MemberExpression",
  object,
  property,
  span
} as MemberExpression)

export const createSuperPropExpression = (obj: Super, property: Identifier | ComputedPropName) => ({
  type: "SuperPropExpression",
  obj,
  property,
  span
} as SuperPropExpression)

export const createConditionalExpression = (test: Expression,
  consequent: Expression,
  alternate: Expression) => ({
  type: "ConditionalExpression",
  test,
  consequent,
  alternate,
  span
} as ConditionalExpression)

export const createSuper = () => ({
  type: "Super",
  span
} as Super)

export const createImport = () => ({
  type: "Import",
  span
} as Import)

export const createNewExpression = (callee: Expression,
  args?: Argument[],
  typeArguments?: TsTypeParameterInstantiation,) => ({
  type: "NewExpression",
  callee,
  arguments: args,
  typeArguments,
  span
} as NewExpression)

export const createSequenceExpression = (expressions: Expression[]) => ({
  type: "SequenceExpression",
  expressions,
  span
} as SequenceExpression)

export const createArrowFunctionExpression = (params: Pattern[], body: BlockStatement | Expression, async = false, generator = false, typeParameters?: TsTypeParameterDeclaration, returnType?: TsTypeAnnotation) => ({
  type: "ArrowFunctionExpression",
  params,
  body,
  async,
  generator,
  typeParameters,
  returnType,
} as ArrowFunctionExpression)

export const createYieldExpression = (argument?: Expression, delegate = false) => ({
  type: "YieldExpression",
  argument,
  delegate,
  span
} as YieldExpression)

export const createMetaProperty = (kind: "new.target" | "import.meta") => ({
  type: "MetaProperty",
  kind,
  span
} as MetaProperty)

export const createAwaitExpression = (argument: Expression) => ({
  type: "AwaitExpression",
  argument,
  span
} as AwaitExpression)

export const createTemplateLiteral = (expressions: Expression[] = [],
  quasis: TemplateElement[] = []) => ({
  type: "TemplateLiteral",
  expressions,
  quasis,
  span
} as TemplateLiteral)

export const createTaggedTemplateExpression = (tag: Expression, template: TemplateLiteral, typeParameters?: TsTypeParameterInstantiation) => ({
  type: "TaggedTemplateExpression",
  tag,
  typeParameters,
  span,
  template,
} as TaggedTemplateExpression)

export const createTemplateElement = (raw: string, cooked?: string, tail = false) => ({
  type: "TemplateElement",
  tail,
  cooked,
  raw,
  span
} as TemplateElement)

export const createParenthesisExpression = (expression: Expression) => ({
  type: "ParenthesisExpression",
  expression,
  span
} as ParenthesisExpression)

export const createPrivateName = (id: Identifier) => ({
  type: "PrivateName",
  id,
  span
} as PrivateName)

export const createJSXMemberExpression = (object: JSXObject,
  property: Identifier) => ({
  type: "JSXMemberExpression",
  object,
  property,
} as JSXMemberExpression)

export const createJSXNamespacedName = (namespace: Identifier,
  name: Identifier) => ({
  type: "JSXNamespacedName",
  namespace,
  name,
} as JSXNamespacedName)

export const createJSXEmptyExpression = () => ({
  type: "JSXEmptyExpression",
  span
} as JSXEmptyExpression)

export const createJSXExpressionContainer = (expression: JSXExpression) => ({
  type: "JSXExpressionContainer",
  expression,
  span
} as JSXExpressionContainer)

export const createJSXSpreadChild = (expression: Expression) => ({
  type: "JSXSpreadChild",
  expression,
  span
} as JSXSpreadChild)

export const createJSXOpeningElement = (name: JSXElementName,
  attributes: JSXAttributeOrSpread[],
  selfClosing = false,
  typeArguments?: TsTypeParameterInstantiation) => ({
  type: "JSXOpeningElement",
  name,
  attributes,
  selfClosing,
  typeArguments,
  span
} as JSXOpeningElement)

export const createJSXClosingElement = (name: JSXElementName) => ({
  type: "JSXClosingElement",
  name,
  span
} as JSXClosingElement)

export const createJSXAttribute = (name: JSXAttributeName, value?: JSXAttrValue) => ({
  type: "JSXAttribute",
  name,
  value,
  span
} as JSXAttribute)

export const createJSXText = (value: string,
  raw: string = JSON.stringify(value)) => ({
  type: "JSXText",
  value,
  raw,
  span
} as JSXText)

export const createJSXElement = (opening: JSXOpeningElement,
  children: JSXElementChild[] = [],
  closing?: JSXClosingElement) => ({
  type: "JSXElement",
  opening,
  children,
  closing,
  span
} as JSXElement)

export const createJSXFragment = (opening: JSXOpeningFragment,
  children: JSXElementChild[] = [],
  closing: JSXClosingFragment) => ({
  type: "JSXFragment",
  opening,
  children,
  closing,
  span
} as JSXFragment)

export const createJSXOpeningFragment = () => ({
  type: "JSXOpeningFragment",
  span
} as JSXOpeningFragment)

export const createJSXClosingFragment = () => ({
  type: "JSXClosingFragment",
  span
} as JSXClosingFragment)

export const createExportDefaultExpression = (expression: Expression) => ({
  type: "ExportDefaultExpression",
  expression,
  span
} as ExportDefaultExpression)

export const createExportDeclaration = (declaration: Declaration) => ({
  type: "ExportDeclaration",
  declaration,
  span
} as ExportDeclaration)

export const createImportDeclaration = (specifiers: ImportSpecifier[],
  source: StringLiteral,
  typeOnly: boolean = false,
  asserts?: ObjectExpression,) => ({
  type: "ImportDeclaration",
  specifiers,
  source,
  typeOnly,
  asserts,
  span
} as ImportDeclaration)

export const createExportAllDeclaration = (source: StringLiteral,
  asserts?: ObjectExpression) => ({
  type: "ExportAllDeclaration",
  source,
  asserts,
  span
} as ExportAllDeclaration)

export const createExportNamedDeclaration = (specifiers: ExportSpecifier[],
  source?: StringLiteral,
  asserts?: ObjectExpression, typeOnly = false,) => ({
  type: "ExportNamedDeclaration",
  specifiers,
  source,
  typeOnly,
  asserts,
  span
} as ExportNamedDeclaration)

export const createExportDefaultDeclaration = (decl: DefaultDecl) => ({
  type: "ExportDefaultDeclaration",
  decl,
  span
} as ExportDefaultDeclaration)

export const createImportDefaultSpecifier = (local: Identifier) => ({
  type: "ImportDefaultSpecifier",
  local,
  span
} as ImportDefaultSpecifier)

export const createImportNamespaceSpecifier = (local: Identifier) => ({
  type: "ImportNamespaceSpecifier",
  local,
  span
} as ImportNamespaceSpecifier)

export const createNamedImportSpecifier = (local: Identifier, imported?: ModuleExportName, isTypeOnly = false) => ({
  type: "ImportSpecifier",
  local,
  imported,
  isTypeOnly,
  span
} as ImportSpecifier)

export const createExportNamespaceSpecifier = (name: ModuleExportName) => ({
  type: "ExportNamespaceSpecifier",
  name,
  span
} as ExportNamespaceSpecifier)

export const createExportDefaultSpecifier = (exported: Identifier) => ({
  type: "ExportDefaultSpecifier",
  exported,
  span
} as ExportDefaultSpecifier)

export const createNamedExportSpecifier = (orig: ModuleExportName, exported?: ModuleExportName, isTypeOnly = false) => ({
  type: "ExportSpecifier",
  orig,
  span,
  exported,
  isTypeOnly,
} as NamedExportSpecifier)

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

export const createArrayPattern = (elements: (Pattern | undefined)[],
  optional: boolean = false,
  typeAnnotation?: TsTypeAnnotation,) => ({
  type: "ArrayPattern",
  elements,
  optional,
  typeAnnotation,
  span
} as ArrayPattern)

export const createObjectPattern = (properties: ObjectPatternProperty[],
  optional = false,
  typeAnnotation?: TsTypeAnnotation,) => ({
  type: "ObjectPattern",
  properties,
  optional,
  typeAnnotation,
  span
} as ObjectPattern)

export const createAssignmentPattern = (left: Pattern,
  right: Expression,
  typeAnnotation?: TsTypeAnnotation) => ({
  type: "AssignmentPattern",
  left,
  right,
  typeAnnotation,
  span
} as AssignmentPattern)

export const createRestElement = (argument: Pattern, rest: Span,
  typeAnnotation?: TsTypeAnnotation,) => ({
  type: "RestElement",
  rest,
  argument,
  typeAnnotation,
  span
} as RestElement)

export const createKeyValuePatternProperty = (key: PropertyName,
  value: Pattern) => ({
  type: "KeyValuePatternProperty",
  key,
  value,
} as KeyValuePatternProperty)

export const createAssignmentPatternProperty = (key: Identifier,
  value?: Expression) => ({
  type: "AssignmentPatternProperty",
  key,
  value,
  span
} as AssignmentPatternProperty)

export const createKeyValueProperty = (key: PropertyName, value: Expression) => ({
  type: "KeyValueProperty",
  value,
  key,
} as KeyValueProperty)

export const createAssignmentProperty = (key: Identifier, value: Expression) => ({
  type: "AssignmentProperty",
  key,
  value,
} as AssignmentProperty)

export const createGetterProperty = (key: PropertyName, body?: BlockStatement, typeAnnotation?: TsTypeAnnotation) => ({
  type: "GetterProperty",
  typeAnnotation,
  body,
  key,
  span
} as GetterProperty)

export const createSetterProperty = (key: PropertyName, param: Pattern, body?: BlockStatement) => ({
  type: "SetterProperty",
  param,
  body,
  key,
  span
} as SetterProperty)

export const createMethodProperty = (key: PropertyName, params: Param[], body?: BlockStatement, async = false, generator = false, decorators?: Decorator[],
  typeParameters?: TsTypeParameterDeclaration,
  returnType?: TsTypeAnnotation) => ({
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
} as MethodProperty)

export const createComputedPropName = (expression: Expression) => ({
  type: "Computed",
  expression,
  span
} as ComputedPropName)

export const createBlockStatement = (stmts: Statement[] = []) => ({
  type: "BlockStatement",
  stmts,
  span
} as BlockStatement)

export const createExpressionStatement = (expression: Expression) => ({
  type: "ExpressionStatement",
  expression,
  span
} as ExpressionStatement)

export const createEmptyStatement = () => ({
  type: "EmptyStatement",
  span
} as EmptyStatement)

export const createDebuggerStatement = () => ({
  type: "DebuggerStatement",
  span
} as DebuggerStatement)

export const createWithStatement = (object: Expression,
  body: Statement) => ({
  type: "WithStatement",
  object,
  body,
  span
} as WithStatement)

export const createReturnStatement = (argument?: Expression) => ({
  type: "ReturnStatement",
  argument,
  span
} as ReturnStatement)

export const createLabeledStatement = (label: Identifier, body: Statement) => ({
  type: "LabeledStatement",
  label,
  body,
  span
} as LabeledStatement)

export const createBreakStatement = (label?: Identifier) => ({
  type: "BreakStatement",
  label,
  span
} as BreakStatement)

export const createContinueStatement = (label?: Identifier) => ({
  type: "ContinueStatement",
  label,
  span
} as ContinueStatement)

export const createIfStatement = (test: Expression,
  consequent: Statement,
  alternate?: Statement) => ({
  type: "IfStatement",
  test,
  consequent,
  alternate,
  span
} as IfStatement)

export const createSwitchStatement = (discriminant: Expression,
  cases: SwitchCase[] = []) => ({
  type: "SwitchStatement",
  discriminant,
  cases,
  span
} as SwitchStatement)

export const createThrowStatement = (argument: Expression) => ({
  type: "ThrowStatement",
  argument,
  span
} as ThrowStatement)

export const createTryStatement = (block: BlockStatement,
  handler?: CatchClause,
  finalizer?: BlockStatement) => ({
  type: "TryStatement",
  block,
  handler,
  finalizer,
  span
} as TryStatement)

export const createWhileStatement = (
  test: Expression,
  body: Statement,
) => ({ type: "WhileStatement", test, body, span } as WhileStatement)

export const createDoWhileStatement = (test: Expression, body: Statement) => ({
  type: "DoWhileStatement",
  test,
  body,
  span
} as DoWhileStatement)

export const createForStatement = (body: Statement, init?: VariableDeclaration | Expression,
  test?: Expression,
  update?: Expression) => ({
  type: "ForStatement",
  init,
  test,
  update,
  body,
  span
} as ForStatement)

export const createForInStatement = (left: VariableDeclaration | Pattern,
  right: Expression,
  body: Statement) => ({
  type: "ForInStatement",
  left,
  right,
  body,
  span
} as ForInStatement)

export const createForOfStatement = (left: VariableDeclaration | Pattern,
  right: Expression,
  body: Statement, _await?: Span) => ({
  type: "ForOfStatement",
  await: _await,
  left,
  right,
  body,
  span
} as ForOfStatement)

export const createSwitchCase = (test?: Expression,
  consequent: Statement[] = []) => ({
  type: "SwitchCase",
  test,
  consequent,
  span
} as SwitchCase)

export const createCatchClause = (
  body: BlockStatement, param?: Pattern) => ({
  type: "CatchClause",
  param,
  body,
  span
} as CatchClause)

export const createTsTypeAnnotation = (typeAnnotation: TsType) => ({
  type: "TsTypeAnnotation",
  typeAnnotation,
  span
} as TsTypeAnnotation)

export const createTsTypeParameterDeclaration = (parameters: TsTypeParameter[] = []) => ({
  type: "TsTypeParameterDeclaration",
  parameters,
  span
} as TsTypeParameterDeclaration)

export const createTsTypeParameter = (name: Identifier,
  _in: boolean,
  _out: boolean,
  constraint?: TsType,
  _default?: TsType) => ({
  type: "TsTypeParameter",
  name,
  in: _in,
  out: _out,
  constraint,
  default: _default,
  span
} as TsTypeParameter)

export const createTsTypeParameterInstantiation = (params: TsType[] = []) => ({
  type: "TsTypeParameterInstantiation",
  params,
  span
} as TsTypeParameterInstantiation)

export const createTsParameterProperty = (param: TsParameterPropertyParameter, accessibility?: Accessibility, decorators?: Decorator[], override = false, readonly = false) => ({
  type: "TsParameterProperty",
  decorators,
  accessibility,
  override,
  readonly,
  param,
  span
} as TsParameterProperty)

export const createTsQualifiedName = (left: TsEntityName,
  right: Identifier) => ({
  type: "TsQualifiedName",
  left,
  right,
} as TsQualifiedName)

export const createTsCallSignatureDeclaration = (params: TsFnParameter[],
  typeAnnotation?: TsTypeAnnotation,
  typeParams?: TsTypeParameterDeclaration) => ({
  type: "TsCallSignatureDeclaration",
  params,
  typeAnnotation,
  typeParams,
  span
} as TsCallSignatureDeclaration)

export const createTsConstructSignatureDeclaration = (params: TsFnParameter[] = [],
  typeAnnotation?: TsTypeAnnotation,
  typeParams?: TsTypeParameterDeclaration) => ({
  type: "TsConstructSignatureDeclaration",
  params,
  typeAnnotation,
  typeParams,
  span
} as TsConstructSignatureDeclaration)

export const createTsPropertySignature = (key: Expression, params: TsFnParameter[], init?: Expression, typeAnnotation?: TsTypeAnnotation,
  typeParams?: TsTypeParameterDeclaration, computed = false, optional = false, readonly = false) => ({
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
} as TsPropertySignature)

export const createTsGetterSignature = (key: Expression, typeAnnotation?: TsTypeAnnotation, computed = false, optional = false, readonly = false) => ({
  type: "TsGetterSignature",
  readonly,
  key,
  computed,
  optional,
  typeAnnotation,
  span
} as TsGetterSignature)

export const createTsSetterSignature = (key: Expression, param: TsFnParameter, computed = false, optional = false, readonly = false) => ({
  type: "TsSetterSignature",
  readonly,
  key,
  computed,
  optional,
  param,
  span
} as TsSetterSignature)

export const createTsMethodSignature = (key: Expression, params: TsFnParameter[], typeAnn?: TsTypeAnnotation,
  typeParams?: TsTypeParameterDeclaration, computed = false, optional = false, readonly = false) => ({
  type: "TsMethodSignature",
  readonly,
  key,
  computed,
  optional,
  params,
  typeAnn,
  typeParams,
  span
} as TsMethodSignature)

export const createTsIndexSignature = (params: TsFnParameter[],
  typeAnnotation?: TsTypeAnnotation, readonly = false, isStatic = false) => ({
  type: "TsIndexSignature",
  params,
  typeAnnotation,
  readonly,
  static: isStatic,
  span
} as TsIndexSignature)

export const createTsKeywordType = (kind: TsKeywordTypeKind) => ({
  type: "TsKeywordType",
  kind,
  span
} as TsKeywordType)

export const createTsThisType = () => ({
  type: "TsThisType",
  span
} as TsThisType)

export const createTsFunctionType = (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration) => ({
  type: "TsFunctionType",
  params,
  typeParams,
  typeAnnotation,
  span
} as TsFunctionType)

export const createTsConstructorType = (params: TsFnParameter[], typeAnnotation: TsTypeAnnotation, typeParams?: TsTypeParameterDeclaration, isAbstract = false) => ({
  type: "TsConstructorType",
  params,
  typeParams,
  typeAnnotation,
  isAbstract,
  span
} as TsConstructorType)

export const createTsTypeReference = (typeName: TsEntityName,
  typeParams?: TsTypeParameterInstantiation,) => ({
  type: "TsTypeReference",
  typeName,
  typeParams,
  span
} as TsTypeReference)

export const createTsTypePredicate = (
  paramName: TsThisTypeOrIdent,
  asserts = false,
  typeAnnotation?: TsTypeAnnotation,) => ({
  type: "TsTypePredicate",
  asserts,
  paramName,
  typeAnnotation,
  span
} as TsTypePredicate)

export const createTsImportType = (argument: StringLiteral,
  qualifier?: TsEntityName,
  typeArguments?: TsTypeParameterInstantiation,) => ({
  type: "TsImportType",
  argument,
  qualifier,
  typeArguments,
  span
} as TsImportType)

export const createTsTypeQuery = (exprName: TsTypeQueryExpr,
  typeArguments?: TsTypeParameterInstantiation) => ({
  type: "TsTypeQuery",
  exprName,
  typeArguments,
  span
} as TsTypeQuery)

export const createTsTypeLiteral = (members: TsTypeElement[] = []) => ({
  type: "TsTypeLiteral",
  members,
  span
} as TsTypeLiteral)

export const createTsArrayType = (elemType: TsType) => ({
  type: "TsArrayType",
  elemType,
  span
} as TsArrayType)

export const createTsTupleType = (elemTypes: TsTupleElement[] = []) => ({
  type: "TsTupleType",
  elemTypes,
  span
} as TsTupleType)

export const createTsTupleElement = (ty: TsType, label?: Pattern) => ({
  type: "TsTupleElement",
  label,
  ty,
  span
} as TsTupleElement)

export const createTsOptionalType = (typeAnnotation: TsType) => ({
  type: "TsOptionalType",
  typeAnnotation,
  span
} as TsOptionalType)

export const createTsRestType = (typeAnnotation: TsType) => ({
  type: "TsRestType",
  typeAnnotation,
  span
} as TsRestType)

export const createTsUnionType = (types: TsType[] = []) => ({
  type: "TsUnionType",
  types,
  span
} as TsUnionType)

export const createTsIntersectionType = (types: TsType[] = []) => ({
  type: "TsIntersectionType",
  types,
  span
} as TsIntersectionType)

export const createTsConditionalType = (checkType: TsType,
  extendsType: TsType,
  trueType: TsType,
  falseType: TsType) => ({
  type: "TsConditionalType",
  checkType,
  extendsType,
  trueType,
  falseType,
  span
} as TsConditionalType)

export const createTsInferType = (typeParam: TsTypeParameter) => ({
  type: "TsInferType",
  typeParam,
  span
} as TsInferType)

export const createTsParenthesizedType = (typeAnnotation: TsType) => ({
  type: "TsParenthesizedType",
  typeAnnotation,
  span
} as TsParenthesizedType)

export const createTsTypeOperator = (op: TsTypeOperatorOp, typeAnnotation: TsType) => ({
  type: "TsTypeOperator",
  op,
  typeAnnotation,
  span
} as TsTypeOperator)

export const createTsIndexedAccessType = (objectType: TsType,
  indexType: TsType, readonly = false) => ({
  type: "TsIndexedAccessType",
  readonly,
  objectType,
  indexType,
  span
} as TsIndexedAccessType)

export const createTsMappedType = (typeParam: TsTypeParameter, typeAnnotation?: TsType, nameType?: TsType,
  optional?: TruePlusMinus,
  readonly?: TruePlusMinus) => ({
  type: "TsMappedType",
  readonly,
  typeParam,
  nameType,
  optional,
  typeAnnotation,
  span
} as TsMappedType)

export const createTsLiteralType = (literal: TsLiteral) => ({
  type: "TsLiteralType",
  literal,
  span
} as TsLiteralType)

export const createTsTemplateLiteralType = (types: TsType[] = [],
  quasis: TemplateElement[] = []) => ({
  type: "TemplateLiteral",
  types,
  quasis,
  span
} as TsTemplateLiteralType)

export const createTsInterfaceDeclaration = (id: Identifier, body: TsInterfaceBody, _extends: TsExpressionWithTypeArguments[] = [], typeParams?: TsTypeParameterDeclaration, declare = false) => ({
  type: "TsInterfaceDeclaration",
  id,
  declare,
  typeParams,
  extends: _extends,
  body,
  span
} as TsInterfaceDeclaration)

export const createTsInterfaceBody = (body: TsTypeElement[] = []) => ({
  type: "TsInterfaceBody",
  body,
  span
} as TsInterfaceBody)

export const createTsExpressionWithTypeArguments = (expression: Expression,
  typeArguments?: TsTypeParameterInstantiation) => ({
  type: "TsExpressionWithTypeArguments",
  expression,
  typeArguments,
  span
} as TsExpressionWithTypeArguments)

export const createTsTypeAliasDeclaration = (id: Identifier, typeAnnotation: TsType,
  typeParams?: TsTypeParameterDeclaration,
  declare = false) => ({
  type: "TsTypeAliasDeclaration",
  declare,
  id,
  typeParams,
  typeAnnotation,
  span
} as TsTypeAliasDeclaration)

export const createTsEnumDeclaration = (id: Identifier,
  members: TsEnumMember[] = [], declare = false, isConst = false) => ({
  type: "TsEnumDeclaration",
  declare,
  isConst,
  id,
  members,
  span
} as TsEnumDeclaration)

export const createTsEnumMember = (id: TsEnumMemberId,
  init?: Expression,) => ({
  type: "TsEnumMember",
  id,
  init,
  span
} as TsEnumMember)

export const createTsModuleDeclaration = (id: TsModuleName,
  body?: TsNamespaceBody, declare = false,
  global = false) => ({
  type: "TsModuleDeclaration",
  declare,
  global,
  id,
  body,
  span,
} as TsModuleDeclaration)

export const createTsModuleBlock = (body: ModuleItem[]) => ({
  type: "TsModuleBlock",
  body,
  span,
} as TsModuleBlock)

export const createTsNamespaceDeclaration = (id: Identifier,
  body: TsNamespaceBody, declare = false,
  global = false) => ({
  type: "TsNamespaceDeclaration",
  declare,
  global,
  id,
  body,
  span
} as TsNamespaceDeclaration)

export const createTsImportEqualsDeclaration = (id: Identifier,
  moduleRef: TsModuleReference, declare = false,
  isExport = false,
  isTypeOnly = false) => ({
  type: "TsImportEqualsDeclaration",
  declare,
  isExport,
  isTypeOnly,
  id,
  moduleRef,
  span
} as TsImportEqualsDeclaration)

export const createTsExternalModuleReference = (expression: StringLiteral) => ({
  type: "TsExternalModuleReference",
  expression,
  span
} as TsExternalModuleReference)

export const createTsExportAssignment = (expression: Expression) => ({
  type: "TsExportAssignment",
  expression,
  span
} as TsExportAssignment)

export const createTsNamespaceExportDeclaration = (id: Identifier) => ({
  type: "TsNamespaceExportDeclaration",
  id,
  span
} as TsNamespaceExportDeclaration)

export const createTsAsExpression = (expression: Expression,
  typeAnnotation: TsType) => ({
  type: "TsAsExpression",
  expression,
  typeAnnotation,
  span,
} as TsAsExpression)

export const createTsInstantiation = (expression: Expression,
  typeArguments: TsTypeParameterInstantiation) => ({
  type: "TsInstantiation",
  expression,
  typeArguments,
  span
} as TsInstantiation)

export const createTsTypeAssertion = (expression: Expression, typeAnnotation: TsType) => ({
  type: "TsTypeAssertion",
  expression,
  typeAnnotation,
  span,
} as TsTypeAssertion)

export const createTsConstAssertion = (expression: Expression) => ({
  type: "TsConstAssertion",
  expression,
  span,
} as TsConstAssertion)

export const createTsNonNullExpression = (expression: Expression) => ({
  type: "TsNonNullExpression",
  expression,
  span
} as TsNonNullExpression)

export const createInvalid = () => ({
  type: "Invalid",
  span
})
