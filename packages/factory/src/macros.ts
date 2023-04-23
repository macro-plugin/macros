import type { ArrayExpression, BooleanLiteral, CallExpression, Expression, NullLiteral } from "@swc/core"
import { createArgument, createArrayExpression, createArrayPattern, createArrowFunctionExpression, createAssignmentExpression, createAssignmentPattern, createAssignmentPatternProperty, createAssignmentProperty, createAwaitExpression, createBigIntLiteral, createBinaryExpression, createBlockStatement, createBooleanLiteral, createBreakStatement, createCallExpression, createCatchClause, createClassDeclaration, createClassExpression, createClassMethod, createClassProperty, createComputedPropName, createConditionalExpression, createConstructor, createContinueStatement, createDebuggerStatement, createDecorator, createDoWhileStatement, createEmptyStatement, createExportAllDeclaration, createExportDeclaration, createExportDefaultDeclaration, createExportDefaultExpression, createExportDefaultSpecifier, createExportNamedDeclaration, createExportNamespaceSpecifier, createExprOrSpread, createExpressionStatement, createForInStatement, createForOfStatement, createForStatement, createFunctionDeclaration, createFunctionExpression, createGetterProperty, createIdentifier, createIfStatement, createImport, createImportDeclaration, createImportDefaultSpecifier, createImportNamespaceSpecifier, createInvalid, createJSXAttribute, createJSXClosingElement, createJSXClosingFragment, createJSXElement, createJSXEmptyExpression, createJSXExpressionContainer, createJSXFragment, createJSXMemberExpression, createJSXNamespacedName, createJSXOpeningElement, createJSXOpeningFragment, createJSXSpreadChild, createJSXText, createKeyValuePatternProperty, createKeyValueProperty, createLabeledStatement, createMemberExpression, createMetaProperty, createMethodProperty, createModule, createNamedExportSpecifier, createNamedImportSpecifier, createNewExpression, createNullLiteral, createNumericLiteral, createObjectExpression, createObjectPattern, createOptionalChainingCall, createOptionalChainingExpression, createParam, createParenthesisExpression, createPrivateMethod, createPrivateName, createPrivateProperty, createRegExpLiteral, createRestElement, createReturnStatement, createScript, createSequenceExpression, createSetterProperty, createSpreadElement, createStaticBlock, createStringLiteral, createSuper, createSuperPropExpression, createSwitchCase, createSwitchStatement, createTaggedTemplateExpression, createTemplateElement, createTemplateLiteral, createThisExpression, createThrowStatement, createTryStatement, createTsArrayType, createTsAsExpression, createTsCallSignatureDeclaration, createTsConditionalType, createTsConstAssertion, createTsConstructSignatureDeclaration, createTsConstructorType, createTsEnumDeclaration, createTsEnumMember, createTsExportAssignment, createTsExpressionWithTypeArguments, createTsExternalModuleReference, createTsFunctionType, createTsGetterSignature, createTsImportEqualsDeclaration, createTsImportType, createTsIndexSignature, createTsIndexedAccessType, createTsInferType, createTsInstantiation, createTsInterfaceBody, createTsInterfaceDeclaration, createTsIntersectionType, createTsKeywordType, createTsLiteralType, createTsMappedType, createTsMethodSignature, createTsModuleBlock, createTsModuleDeclaration, createTsNamespaceDeclaration, createTsNamespaceExportDeclaration, createTsNonNullExpression, createTsOptionalType, createTsParameterProperty, createTsParenthesizedType, createTsPropertySignature, createTsQualifiedName, createTsRestType, createTsSatisfiesExpression, createTsSetterSignature, createTsTemplateLiteralType, createTsThisType, createTsTupleElement, createTsTupleType, createTsTypeAliasDeclaration, createTsTypeAnnotation, createTsTypeAssertion, createTsTypeLiteral, createTsTypeOperator, createTsTypeParameter, createTsTypeParameterDeclaration, createTsTypeParameterInstantiation, createTsTypePredicate, createTsTypeQuery, createTsTypeReference, createTsUnionType, createUnaryExpression, createUpdateExpression, createVariableDeclaration, createVariableDeclarator, createWhileStatement, createWithStatement, createYieldExpression } from "./runtime"
import { createExprMacro, parseExpr, printExpr, span } from "@macro-plugin/core"

const spanStr = JSON.stringify(span)

export const createAst = (type: string, props: Record<string, Expression | string> = {}) => {
  return parseExpr(`{
    "type": "${type}",
    ${Object.entries(props).map(([k, v]) => '"' + k + '": ' + (v ? (typeof v === "string" ? v : printExpr(v).code) : undefined)) + ","}
    "span": ${spanStr},
  }`)
}

export const $True: BooleanLiteral = {
  type: "BooleanLiteral",
  span,
  value: true
}

export const $False: BooleanLiteral = {
  type: "BooleanLiteral",
  span,
  value: false
}

export const $Null: NullLiteral = {
  type: "NullLiteral",
  span
}

export const $Void: ArrayExpression = {
  type: "ArrayExpression",
  span,
  elements: []
}

function _JSONStringify (expression: Expression): CallExpression {
  return {
    type: "CallExpression",
    span,
    callee: {
      type: "MemberExpression",
      span,
      object: {
        type: "Identifier",
        span,
        value: "JSON",
        optional: false
      },
      property: {
        type: "Identifier",
        span,
        value: "stringify",
        optional: false
      }
    },
    arguments: [
      {
        expression
      }
    ],
  }
}

export const $Identifier = createExprMacro("$Identifier", function ([value, optional = $False]) {
  return createAst("Identifier", { value, optional })
}, "(value: string, optional?: boolean) => import(\"@swc/core\").Identifier").proxy(createIdentifier)

export const $StringLiteral = createExprMacro("$StringLiteral", function ([value, raw]) {
  return createAst("StringLiteral", { value, raw })
}, "(value: string, raw?: string) => stringLiteral").proxy(createStringLiteral)

export const $NumericLiteral = createExprMacro("$NumericLiteral", function ([value, raw]) {
  return createAst("NumericLiteral", { value, raw })
}, "(value: number, raw?: string) => import(\"@swc/core\").NumericLiteral").proxy(createNumericLiteral)

export const $BigIntLiteral = createExprMacro("$BigIntLiteral", function ([value, raw]) {
  return createAst("BigIntLiteral", { value, raw })
}, "(value: bigint, raw?: string) => import(\"@swc/core\").BigIntLiteral").proxy(createBigIntLiteral)

export const $BooleanLiteral = createExprMacro("$BooleanLiteral", function ([value]) {
  return createAst("BooleanLiteral", { value })
}, "(value: boolean) => booleanLiteral").proxy(createBooleanLiteral)

export const $NullLiteral = createExprMacro("$NullLiteral", function () {
  return createAst("NullLiteral")
}, "() => import(\"@swc/core\").NullLiteral").proxy(createNullLiteral)

export const $RegExpLiteral = createExprMacro("$RegExpLiteral", function ([pattern, flags]) {
  return createAst("RegExpLiteral", { pattern, flags })
}, "(pattern: string, flags: string) => import(\"@swc/core\").RegExpLiteral").proxy(createRegExpLiteral)

export const $Argument = createExprMacro("$Argument", function ([expression, spread]) {
  return this.parseExpr(`{
    ${spread ? ('"spread": ' + JSON.stringify(span) + ",") : ""}
    "expression": ${this.printExpr(expression)}
  }`)
}, "(expression: import(\"@swc/core\").Expression, spread?: boolean) => import(\"@swc/core\").Argument").proxy(createArgument)

export const $CallExpression = createExprMacro("$CallExpression", function ([callee, callArgs = $Void, typeArguments]) {
  return createAst("CallExpression", {
    callee,
    arguments: callArgs,
    typeArguments
  })
}, "(callee: import(\"@swc/core\").Expression | import(\"@swc/core\").Super | import(\"@swc/core\").Import, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").CallExpression").proxy(createCallExpression)

export const $ClassProperty = createExprMacro("$ClassProperty", function ([key, value, accessibility, typeAnnotation, decorators, declare = $False, definite = $False, isAbstract = $False, isOptional = $False, isOverride = $False, isStatic = $False, readonly = $False]) {
  return createAst("ClassProperty", { key, value, accessibility, typeAnnotation, decorators, declare, definite, isAbstract, isOptional, isOverride, readonly, isStatic })
}, "(key: import(\"@swc/core\").PropertyName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => import(\"@swc/core\").ClassProperty").proxy(createClassProperty)

export const $PrivateProperty = createExprMacro("$PrivateProperty", function ([key, value, accessibility, typeAnnotation, decorators, definite = $False, isOptional = $False, isOverride = $False, isStatic = $False, readonly = $False]) {
  return createAst("PrivateProperty", { key, value, accessibility, typeAnnotation, decorators, definite, isOptional, isOverride, isStatic, readonly })
}, "(key: import(\"@swc/core\").PrivateName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean) => import(\"@swc/core\").PrivateProperty").proxy(createPrivateProperty)

export const $Param = createExprMacro("$Param", function ([pat, decorators]) {
  return createAst("Parameter", { pat, decorators })
}, "(pat: import(\"@swc/core\").Pattern, decorators?: import(\"@swc/core\").Decorator[]) => import(\"@swc/core\").Param").proxy(createParam)

export const $Constructor = createExprMacro("$Constructor", function ([key, params, body, accessibility, isOptional = $False]) {
  return createAst("Constructor", { key, params, body, accessibility, isOptional })
}, "(key: import(\"@swc/core\").PropertyName, params: import(\"@swc/core\").(TsParameterProperty | Param)[], body?: import(\"@swc/core\").BlockStatement, accessibility?: import(\"@swc/core\").Accessibility, isOptional?: boolean) => import(\"@swc/core\").Constructor").proxy(createConstructor)

export const $ClassMethod = createExprMacro("$ClassMethod", function ([kind, key, fn, accessibility, isAbstract = $False, isOptional = $False, isOverride = $False, isStatic = $False]) {
  return createAst("ClassMethod", { kind, key, function: fn, accessibility, isAbstract, isOptional, isOverride, isStatic })
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PropertyName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => import(\"@swc/core\").ClassMethod").proxy(createClassMethod)

export const $PrivateMethod = createExprMacro("$PrivateMethod", function ([kind, key, fn, accessibility, isAbstract = $False, isOptional = $False, isOverride = $False, isStatic = $False]) {
  return createAst("PrivateMethod", { kind, key, function: fn, accessibility, isAbstract, isOptional, isOverride, isStatic })
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PrivateName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean) => import(\"@swc/core\").PrivateMethod").proxy(createPrivateMethod)

export const $StaticBlock = createExprMacro("$StaticBlock", function ([body]) {
  return createAst("StaticBlock", { body })
}, "(body: import(\"@swc/core\").BlockStatement) => import(\"@swc/core\").StaticBlock").proxy(createStaticBlock)

export const $Decorator = createExprMacro("$Decorator", function ([expression]) {
  return createAst("Decorator", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").Decorator").proxy(createDecorator)

export const $FunctionDeclaration = createExprMacro("$FunctionDeclaration", function ([identifier, params, body, typeParameters, returnType, decorators, declare = $False, async = $False, generator = $False]) {
  return createAst("FunctionDeclaration", { identifier, params, body, typeParameters, returnType, decorators, declare, async, generator })
}, "(identifier: import(\"@swc/core\").Identifier, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, async?: boolean, generator?: boolean) => import(\"@swc/core\").FunctionDeclaration").proxy(createFunctionDeclaration)

export const $ClassDeclaration = createExprMacro("$ClassDeclaration", function ([identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare = $False, isAbstract = $False]) {
  return createAst("ClassDeclaration", { identifier, body, implements: impls, superClass, typeParams, superTypeParams, decorators, declare, isAbstract })
}, "(identifier: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").ClassMember[], impls: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, isAbstract?: boolean) => import(\"@swc/core\").ClassDeclaration").proxy(createClassDeclaration)

export const $VariableDeclaration = createExprMacro("$VariableDeclaration", function ([kind, declarations = $Void, declare = $False]) {
  return createAst("VariableDeclaration", { kind, declare, declarations })
}, "(kind: import(\"@swc/core\").VariableDeclarationKind, declarations?: import(\"@swc/core\").VariableDeclarator[], declare?: boolean) => import(\"@swc/core\").VariableDeclaration").proxy(createVariableDeclaration)

export const $VariableDeclarator = createExprMacro("$VariableDeclarator", function ([id, init, definite = $False]) {
  return createAst("VariableDeclarator", { id, definite, init })
}, "(id: import(\"@swc/core\").Pattern, init?: import(\"@swc/core\").Expression, definite?: boolean) => import(\"@swc/core\").VariableDeclarator").proxy(createVariableDeclarator)

export const $OptionalChainingExpression = createExprMacro("$OptionalChainingExpression", function ([base]) {
  return createAst("OptionalChainingExpression", { base, questionDotToken: spanStr })
}, "(base: import(\"@swc/core\").MemberExpression | import(\"@swc/core\").OptionalChainingCall) => import(\"@swc/core\").OptionalChainingExpression").proxy(createOptionalChainingExpression)

export const $OptionalChainingCall = createExprMacro("$OptionalChainingCall", function ([callee, args = $Void, typeArguments]) {
  return createAst("OptionalChainingCall", { callee, arguments: args, typeArguments })
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").ExprOrSpread[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").OptionalChainingCall").proxy(createOptionalChainingCall)

export const $ThisExpression = createExprMacro("$ThisExpression", function () {
  return createAst("ThisExpression")
}, "() => import(\"@swc/core\").ThisExpression").proxy(createThisExpression)

export const $ArrayExpression = createExprMacro("$ArrayExpression", function ([elements = $Void]) {
  return createAst("ArrayExpression", { elements })
}, "(elements?: (import(\"@swc/core\").ExprOrSpread | undefined)[]) => import(\"@swc/core\").ArrayExpression").proxy(createArrayExpression)

export const $ExprOrSpread = createExprMacro("$ExprOrSpread", function ([expression, spread = $False]) {
  return this.parseExpr(`{
    ${spread ? ('"spread": ' + JSON.stringify(span) + ",") : ""}
    "expression": ${this.printExpr(expression)}
  }`)
}, "(expression: import(\"@swc/core\").Expression, spread?: boolean) => import(\"@swc/core\").ExprOrSpread").proxy(createExprOrSpread)

export const $ObjectExpression = createExprMacro("$ObjectExpression", function ([properties = $Void]) {
  return createAst("ObjectExpression", { properties })
}, "(properties?: (import(\"@swc/core\").SpreadElement | import(\"@swc/core\").Property)[]) => import(\"@swc/core\").ObjectExpression").proxy(createObjectExpression)

export const $SpreadElement = createExprMacro("$SpreadElement", function ([args]) {
  return createAst("SpreadElement", { args, spread: spanStr })
}, "(args: import(\"@swc/core\").Expression) => import(\"@swc/core\").SpreadElement").proxy(createSpreadElement)

export const $UnaryExpression = createExprMacro("$UnaryExpression", function ([operator, argument]) {
  return createAst("UnaryExpression", { operator, argument })
}, "(operator: import(\"@swc/core\").UnaryOperator, argument: import(\"@swc/core\").Expression) => import(\"@swc/core\").UnaryExpression").proxy(createUnaryExpression)

export const $UpdateExpression = createExprMacro("$UpdateExpression", function ([operator, argument, prefix = $False]) {
  return createAst("UpdateExpression", { operator, argument, prefix })
}, "(operator: import(\"@swc/core\").UpdateOperator, argument: import(\"@swc/core\").Expression, prefix?: boolean) => import(\"@swc/core\").UpdateExpression").proxy(createUpdateExpression)

export const $BinaryExpression = createExprMacro("$BinaryExpression", function ([left, operator, right]) {
  return createAst("BinaryExpression", { left, operator, right })
}, "(left: import(\"@swc/core\").Expression, operator: import(\"@swc/core\").BinaryOperator, right: import(\"@swc/core\").Expression) => import(\"@swc/core\").BinaryExpression").proxy(createBinaryExpression)

export const $FunctionExpression = createExprMacro("$FunctionExpression", function ([params, body, identifier, typeParameters, returnType, decorators, async = $False, generator = $False]) {
  return createAst("FunctionExpression", { params, body, identifier, typeParameters, returnType, decorators, async, generator })
}, "(params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, identifier?: import(\"@swc/core\").Identifier, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], async?: boolean, generator?: boolean) => import(\"@swc/core\").FunctionExpression").proxy(createFunctionExpression)

export const $ClassExpression = createExprMacro("$ClassExpression", function ([body, impls = $Void, superClass, identifier, typeParams, superTypeParams, decorators, isAbstract = $False]) {
  return createAst("ClassExpression", { body, implements: impls, superClass, identifier, typeParams, superTypeParams, decorators, isAbstract })
}, "(body: import(\"@swc/core\").ClassMember[], impls?: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, identifier?: import(\"@swc/core\").Identifier, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], isAbstract?: boolean) => import(\"@swc/core\").ClassExpression").proxy(createClassExpression)

export const $AssignmentExpression = createExprMacro("$AssignmentExpression", function ([left, operator, right]) {
  return createAst("AssignmentExpression", { left, operator, right })
}, "(left: import(\"@swc/core\").Expression | Pattern, operator: import(\"@swc/core\").AssignmentOperator, right: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentExpression").proxy(createAssignmentExpression)

export const $MemberExpression = createExprMacro("$MemberExpression", function ([object, property]) {
  return createAst("MemberExpression", { object, property })
}, "(object: import(\"@swc/core\").Expression, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").PrivateName | import(\"@swc/core\").ComputedPropName) => import(\"@swc/core\").MemberExpression").proxy(createMemberExpression)

export const $SuperPropExpression = createExprMacro("$SuperPropExpression", function ([obj, property]) {
  return createAst("SuperPropExpression", { obj, property })
}, "(obj: import(\"@swc/core\").Super, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").ComputedPropName) => import(\"@swc/core\").SuperPropExpression").proxy(createSuperPropExpression)

export const $ConditionalExpression = createExprMacro("$ConditionalExpression", function ([test, consequent, alternate]) {
  return createAst("ConditionalExpression", { test, consequent, alternate })
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Expression, alternate: import(\"@swc/core\").Expression) => import(\"@swc/core\").ConditionalExpression").proxy(createConditionalExpression)

export const $Super = createExprMacro("$Super", function () {
  return createAst("Super")
}, "() => import(\"@swc/core\").Super").proxy(createSuper)

export const $Import = createExprMacro("$Import", function () {
  return createAst("Import")
}, "() => import(\"@swc/core\").Import").proxy(createImport)

export const $NewExpression = createExprMacro("$NewExpression", function ([callee, args, typeArguments]) {
  return createAst("NewExpression", { callee, args, typeArguments })
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").NewExpression").proxy(createNewExpression)

export const $SequenceExpression = createExprMacro("$SequenceExpression", function ([expressions]) {
  return createAst("SequenceExpression", { expressions })
}, "(expressions: import(\"@swc/core\").Expression[]) => import(\"@swc/core\").SequenceExpression").proxy(createSequenceExpression)

export const $ArrowFunctionExpression = createExprMacro("$ArrowFunctionExpression", function ([params, body, async = $False, generator = $False, typeParameters, returnType]) {
  return createAst("ArrowFunctionExpression", { params, body, typeParameters, returnType, async, generator })
}, "(params: import(\"@swc/core\").Pattern[], body: import(\"@swc/core\").BlockStatement | import(\"@swc/core\").Expression, async?: boolean, generator?: boolean, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").ArrowFunctionExpression").proxy(createArrowFunctionExpression)

export const $YieldExpression = createExprMacro("$YieldExpression", function ([argument, delegate = $False]) {
  return createAst("YieldExpression", { argument, delegate })
}, "(argument?: import(\"@swc/core\").Expression, delegate?: boolean) => import(\"@swc/core\").YieldExpression").proxy(createYieldExpression)

export const $MetaProperty = createExprMacro("$MetaProperty", function ([kind]) {
  return createAst("MetaProperty", { kind })
}, "(kind: \"new.target\" | \"import.meta\") => import(\"@swc/core\").MetaProperty").proxy(createMetaProperty)

export const $AwaitExpression = createExprMacro("$AwaitExpression", function ([argument]) {
  return createAst("AwaitExpression", { argument })
}, "(argument: import(\"@swc/core\").Expression) => import(\"@swc/core\").AwaitExpression").proxy(createAwaitExpression)

export const $TemplateLiteral = createExprMacro("$TemplateLiteral", function ([expressions = $Void, quasis = $Void]) {
  return createAst("TemplateLiteral", { expressions, quasis })
}, "(expressions?: import(\"@swc/core\").Expression[], quasis?: import(\"@swc/core\").TemplateElement[]) => import(\"@swc/core\").TemplateLiteral").proxy(createTemplateLiteral)

export const $TaggedTemplateExpression = createExprMacro("$TaggedTemplateExpression", function ([tag, template, typeParameters]) {
  return createAst("TaggedTemplateExpression", { tag, template, typeParameters })
}, "(tag: import(\"@swc/core\").Expression, template: import(\"@swc/core\").TemplateLiteral, typeParameters?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TaggedTemplateExpression").proxy(createTaggedTemplateExpression)

export const $TemplateElement = createExprMacro("$TemplateElement", function ([raw, cooked, tail = $False]) {
  return createAst("TemplateElement", { raw, cooked, tail })
}, "(raw: string, cooked?: string, tail?: boolean) => import(\"@swc/core\").TemplateElement").proxy(createTemplateElement)

export const $ParenthesisExpression = createExprMacro("$ParenthesisExpression", function ([expression]) {
  return createAst("ParenthesisExpression", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ParenthesisExpression").proxy(createParenthesisExpression)

export const $PrivateName = createExprMacro("$PrivateName", function ([id]) {
  return createAst("PrivateName", { id })
}, "(id: import(\"@swc/core\").Identifier) => import(\"@swc/core\").PrivateName").proxy(createPrivateName)

export const $JSXMemberExpression = createExprMacro("$JSXMemberExpression", function ([object, property]) {
  return createAst("JSXMemberExpression", { object, property })
}, "(object: import(\"@swc/core\").JSXObject, property: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXMemberExpression").proxy(createJSXMemberExpression)

export const $JSXNamespacedName = createExprMacro("$JSXNamespacedName", function ([namespace, name]) {
  return createAst("JSXNamespacedName", { namespace, name })
}, "(namespace: import(\"@swc/core\").Identifier, name: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXNamespacedName").proxy(createJSXNamespacedName)

export const $JSXEmptyExpression = createExprMacro("$JSXEmptyExpression", function () {
  return createAst("JSXEmptyExpression")
}, "() => import(\"@swc/core\").JSXEmptyExpression").proxy(createJSXEmptyExpression)

export const $JSXExpressionContainer = createExprMacro("$JSXExpressionContainer", function ([expression]) {
  return createAst("JSXExpressionContainer", { expression })
}, "(expression: import(\"@swc/core\").JSXExpression) => import(\"@swc/core\").JSXExpressionContainer").proxy(createJSXExpressionContainer)

export const $JSXSpreadChild = createExprMacro("$JSXSpreadChild", function ([expression]) {
  return createAst("JSXSpreadChild", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").JSXSpreadChild").proxy(createJSXSpreadChild)

export const $JSXOpeningElement = createExprMacro("$JSXOpeningElement", function ([name, attributes = $Void, selfClosing = $False, typeArguments]) {
  return createAst("JSXOpeningElement", { name, attributes, selfClosing, typeArguments })
}, "(name: import(\"@swc/core\").JSXElementName, attributes?: import(\"@swc/core\").JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").JSXOpeningElement").proxy(createJSXOpeningElement)

export const $JSXClosingElement = createExprMacro("$JSXClosingElement", function ([name]) {
  return createAst("JSXClosingElement", { name })
}, "(name: import(\"@swc/core\").JSXElementName) => import(\"@swc/core\").JSXClosingElement").proxy(createJSXClosingElement)

export const $JSXAttribute = createExprMacro("$JSXAttribute", function ([name, value]) {
  return createAst("JSXAttribute", { name, value })
}, "(name: import(\"@swc/core\").JSXAttributeName, value?: import(\"@swc/core\").JSXAttrValue) => import(\"@swc/core\").JSXAttribute").proxy(createJSXAttribute)

export const $JSXText = createExprMacro("$JSXText", function ([value, raw = _JSONStringify(value)]) {
  return createAst("JSXText", { value, raw })
}, "(value: string, raw?: string) => import(\"@swc/core\").JSXText").proxy(createJSXText)

export const $JSXElement = createExprMacro("$JSXElement", function ([opening, children = $Void, closing]) {
  return createAst("JSXElement", { opening, children, closing })
}, "(opening: import(\"@swc/core\").JSXOpeningElement, children?: import(\"@swc/core\").JSXElementChild[], closing?: import(\"@swc/core\").JSXClosingElement) => import(\"@swc/core\").JSXElement").proxy(createJSXElement)

export const $JSXFragment = createExprMacro("$JSXFragment", function ([opening, children = $Void, closing]) {
  return createAst("JSXFragment", { opening, children, closing })
}, "(opening: import(\"@swc/core\").JSXOpeningFragment, children?: import(\"@swc/core\").JSXElementChild[], closing: import(\"@swc/core\").JSXClosingFragment) => import(\"@swc/core\").JSXFragment").proxy(createJSXFragment)

export const $JSXOpeningFragment = createExprMacro("$JSXOpeningFragment", function () {
  return createAst("JSXOpeningFragment")
}, "() => import(\"@swc/core\").JSXOpeningFragment").proxy(createJSXOpeningFragment)

export const $JSXClosingFragment = createExprMacro("$JSXClosingFragment", function () {
  return createAst("JSXClosingFragment")
}, "() => import(\"@swc/core\").JSXClosingFragment").proxy(createJSXClosingFragment)

export const $ExportDefaultExpression = createExprMacro("$ExportDefaultExpression", function ([expression]) {
  return createAst("ExportDefaultExpression", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ExportDefaultExpression").proxy(createExportDefaultExpression)

export const $ExportDeclaration = createExprMacro("$ExportDeclaration", function ([declaration]) {
  return createAst("ExportDeclaration", { declaration })
}, "(declaration: import(\"@swc/core\").Declaration) => import(\"@swc/core\").ExportDeclaration").proxy(createExportDeclaration)

export const $ImportDeclaration = createExprMacro("$ImportDeclaration", function ([specifiers, source, asserts, typeOnly = $False]) {
  return createAst("ImportDeclaration", { specifiers, source, typeOnly, asserts })
}, "(specifiers: import(\"@swc/core\").ImportSpecifier[], source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean) => import(\"@swc/core\").ImportDeclaration").proxy(createImportDeclaration)

export const $ExportAllDeclaration = createExprMacro("$ExportAllDeclaration", function ([source, asserts]) {
  return createAst("ExportAllDeclaration", { source, asserts })
}, "(source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression) => import(\"@swc/core\").ExportAllDeclaration").proxy(createExportAllDeclaration)

export const $ExportNamedDeclaration = createExprMacro("$ExportNamedDeclaration", function ([specifiers, source, asserts, typeOnly = $False]) {
  return createAst("ExportNamedDeclaration", { specifiers, source, typeOnly, asserts })
}, "(specifiers: import(\"@swc/core\").ExportSpecifier[], source?: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean) => import(\"@swc/core\").ExportNamedDeclaration").proxy(createExportNamedDeclaration)

export const $ExportDefaultDeclaration = createExprMacro("$ExportDefaultDeclaration", function ([decl]) {
  return createAst("ExportDefaultDeclaration", { decl })
}, "(decl: import(\"@swc/core\").DefaultDecl) => import(\"@swc/core\").ExportDefaultDeclaration").proxy(createExportDefaultDeclaration)

export const $ImportDefaultSpecifier = createExprMacro("$ImportDefaultSpecifier", function ([local]) {
  return createAst("ImportDefaultSpecifier", { local })
}, "(local: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ImportDefaultSpecifier").proxy(createImportDefaultSpecifier)

export const $ImportNamespaceSpecifier = createExprMacro("$ImportNamespaceSpecifier", function ([local]) {
  return createAst("ImportNamespaceSpecifier", { local })
}, "(local: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ImportNamespaceSpecifier").proxy(createImportNamespaceSpecifier)

export const $NamedImportSpecifier = createExprMacro("$NamedImportSpecifier", function ([local, imported, isTypeOnly = $False]) {
  return createAst("NamedImportSpecifier", { local, imported, isTypeOnly })
}, "(local: import(\"@swc/core\").Identifier, imported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean) => import(\"@swc/core\").NamedImportSpecifier").proxy(createNamedImportSpecifier)

export const $ExportNamespaceSpecifier = createExprMacro("$ExportNamespaceSpecifier", function ([name]) {
  return createAst("ExportNamespaceSpecifier", { name })
}, "(name: import(\"@swc/core\").ModuleExportName) => import(\"@swc/core\").ExportNamespaceSpecifier").proxy(createExportNamespaceSpecifier)

export const $ExportDefaultSpecifier = createExprMacro("$ExportDefaultSpecifier", function ([exported]) {
  return createAst("ExportDefaultSpecifier", { exported })
}, "(exported: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ExportDefaultSpecifier").proxy(createExportDefaultSpecifier)

export const $NamedExportSpecifier = createExprMacro("$NamedExportSpecifier", function ([orig, exported, isTypeOnly = $False]) {
  return createAst("NamedExportSpecifier", { orig, exported, isTypeOnly })
}, "(orig: import(\"@swc/core\").ModuleExportName, exported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean) => import(\"@swc/core\").NamedExportSpecifier").proxy(createNamedExportSpecifier)

export const $Module = createExprMacro("$Module", function ([body = $Void, interpreter]) {
  return createAst("Module", { body, interpreter })
}, "(body: import(\"@swc/core\").ModuleItem[], interpreter?: string) => import(\"@swc/core\").Module").proxy(createModule)

export const $Script = createExprMacro("$Script", function ([body = $Void, interpreter]) {
  return createAst("Script", { body, interpreter })
}, "(body: import(\"@swc/core\").Statement[], interpreter?: string) => import(\"@swc/core\").Script").proxy(createScript)

export const $ArrayPattern = createExprMacro("$ArrayPattern", function ([elements, optional = $False, typeAnnotation]) {
  return createAst("ArrayPattern", { elements, optional, typeAnnotation })
}, "(elements: (import(\"@swc/core\").Pattern | undefined)[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").ArrayPattern").proxy(createArrayPattern)

export const $ObjectPattern = createExprMacro("$ObjectPattern", function ([properties, optional = $False, typeAnnotation]) {
  return createAst("ObjectPattern", { properties, optional, typeAnnotation })
}, "(properties: import(\"@swc/core\").ObjectPatternProperty[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").ObjectPattern").proxy(createObjectPattern)

export const $AssignmentPattern = createExprMacro("$AssignmentPattern", function ([left, right, typeAnnotation]) {
  return createAst("AssignmentPattern", { left, right, typeAnnotation })
}, "(left: import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").AssignmentPattern").proxy(createAssignmentPattern)

export const $RestElement = createExprMacro("$RestElement", function ([argument, rest, typeAnnotation]) {
  return createAst("RestElement", { argument, rest, typeAnnotation })
}, "(argument: import(\"@swc/core\").Pattern, rest: import(\"@swc/core\").Span, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").RestElement").proxy(createRestElement)

export const $KeyValuePatternProperty = createExprMacro("$KeyValuePatternProperty", function ([key, value]) {
  return createAst("KeyValuePatternProperty", { key, value })
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Pattern) => import(\"@swc/core\").KeyValuePatternProperty").proxy(createKeyValuePatternProperty)

export const $AssignmentPatternProperty = createExprMacro("$AssignmentPatternProperty", function ([key, value]) {
  return createAst("AssignmentPatternProperty", { key, value })
}, "(key: import(\"@swc/core\").Identifier, value?: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentPatternProperty").proxy(createAssignmentPatternProperty)

export const $KeyValueProperty = createExprMacro("$KeyValueProperty", function ([key, value]) {
  return createAst("KeyValueProperty", { key, value })
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").KeyValueProperty").proxy(createKeyValueProperty)

export const $AssignmentProperty = createExprMacro("$AssignmentProperty", function ([key, value]) {
  return createAst("AssignmentProperty", { key, value })
}, "(key: import(\"@swc/core\").Identifier, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentProperty").proxy(createAssignmentProperty)

export const $GetterProperty = createExprMacro("$GetterProperty", function ([key, body, typeAnnotation]) {
  return createAst("GetterProperty", { key, body, typeAnnotation })
}, "(key: import(\"@swc/core\").PropertyName, body?: import(\"@swc/core\").BlockStatement, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").GetterProperty").proxy(createGetterProperty)

export const $SetterProperty = createExprMacro("$SetterProperty", function ([key, param, body]) {
  return createAst("SetterProperty", { key, param, body })
}, "(key: import(\"@swc/core\").PropertyName, param: import(\"@swc/core\").Pattern, body?: import(\"@swc/core\").BlockStatement) => import(\"@swc/core\").SetterProperty").proxy(createSetterProperty)

export const $MethodProperty = createExprMacro("$MethodProperty", function ([key, params, body, async = $False, generator = $False, decorators, typeParameters, returnType]) {
  return createAst("MethodProperty", { key, params, body, async, generator, decorators, typeParameters, returnType })
}, "(key: import(\"@swc/core\").PropertyName, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, async?: boolean, generator?: boolean, decorators?: import(\"@swc/core\").Decorator[], typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation) => import(\"@swc/core\").MethodProperty").proxy(createMethodProperty)

export const $ComputedPropName = createExprMacro("$ComputedPropName", function ([expression]) {
  return createAst("ComputedPropName", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ComputedPropName").proxy(createComputedPropName)

export const $BlockStatement = createExprMacro("$BlockStatement", function ([stmts = $Void]) {
  return createAst("BlockStatement", { stmts })
}, "(stmts: import(\"@swc/core\").Statement[]) => import(\"@swc/core\").BlockStatement").proxy(createBlockStatement)

export const $ExpressionStatement = createExprMacro("$ExpressionStatement", function ([expression]) {
  return createAst("ExpressionStatement", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").ExpressionStatement").proxy(createExpressionStatement)

export const $EmptyStatement = createExprMacro("$EmptyStatement", function () {
  return createAst("EmptyStatement")
}, "() => import(\"@swc/core\").EmptyStatement").proxy(createEmptyStatement)

export const $DebuggerStatement = createExprMacro("$DebuggerStatement", function () {
  return createAst("DebuggerStatement")
}, "() => import(\"@swc/core\").DebuggerStatement").proxy(createDebuggerStatement)

export const $WithStatement = createExprMacro("$WithStatement", function ([object, body]) {
  return createAst("WithStatement", { object, body })
}, "(object: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").WithStatement").proxy(createWithStatement)

export const $ReturnStatement = createExprMacro("$ReturnStatement", function ([argument]) {
  return createAst("ReturnStatement", { argument })
}, "(argument?: import(\"@swc/core\").Expression) => import(\"@swc/core\").ReturnStatement").proxy(createReturnStatement)

export const $LabeledStatement = createExprMacro("$LabeledStatement", function ([label, body]) {
  return createAst("LabeledStatement", { label, body })
}, "(label: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").LabeledStatement").proxy(createLabeledStatement)

export const $BreakStatement = createExprMacro("$BreakStatement", function ([label]) {
  return createAst("BreakStatement", { label })
}, "(label?: import(\"@swc/core\").Identifier) => import(\"@swc/core\").BreakStatement").proxy(createBreakStatement)

export const $ContinueStatement = createExprMacro("$ContinueStatement", function ([label]) {
  return createAst("ContinueStatement", { label })
}, "(label?: import(\"@swc/core\").Identifier) => import(\"@swc/core\").ContinueStatement").proxy(createContinueStatement)

export const $IfStatement = createExprMacro("$IfStatement", function ([test, consequent, alternate]) {
  return createAst("IfStatement", { test, consequent, alternate })
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Statement, alternate?: import(\"@swc/core\").Statement) => import(\"@swc/core\").IfStatement").proxy(createIfStatement)

export const $SwitchStatement = createExprMacro("$SwitchStatement", function ([discriminant, cases = $Void]) {
  return createAst("SwitchStatement", { discriminant, cases })
}, "(discriminant: import(\"@swc/core\").Expression, cases?: import(\"@swc/core\").SwitchCase[]) => import(\"@swc/core\").SwitchStatement").proxy(createSwitchStatement)

export const $ThrowStatement = createExprMacro("$ThrowStatement", function ([argument]) {
  return createAst("ThrowStatement", { argument })
}, "(argument: import(\"@swc/core\").Expression) => import(\"@swc/core\").ThrowStatement").proxy(createThrowStatement)

export const $TryStatement = createExprMacro("$TryStatement", function ([block, handler, finalizer]) {
  return createAst("TryStatement", { block, handler, finalizer })
}, "(block: import(\"@swc/core\").BlockStatement, handler?: import(\"@swc/core\").CatchClause, finalizer?: import(\"@swc/core\").BlockStatement) => import(\"@swc/core\").TryStatement").proxy(createTryStatement)

export const $WhileStatement = createExprMacro("$WhileStatement", function ([test, body]) {
  return createAst("WhileStatement", { test, body })
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").WhileStatement").proxy(createWhileStatement)

export const $DoWhileStatement = createExprMacro("$DoWhileStatement", function ([test, body]) {
  return createAst("DoWhileStatement", { test, body })
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").DoWhileStatement").proxy(createDoWhileStatement)

export const $ForStatement = createExprMacro("$ForStatement", function ([body, init, test, update]) {
  return createAst("ForStatement", { body, init, test, update })
}, "(body: import(\"@swc/core\").Statement, init?: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Expression, test?: import(\"@swc/core\").Expression, update?: import(\"@swc/core\").Expression) => import(\"@swc/core\").ForStatement").proxy(createForStatement)

export const $ForInStatement = createExprMacro("$ForInStatement", function ([left, right, body]) {
  return createAst("ForInStatement", { left, right, body })
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement) => import(\"@swc/core\").ForInStatement").proxy(createForInStatement)

export const $ForOfStatement = createExprMacro("$ForOfStatement", function ([left, right, body, _await]) {
  return createAst("ForOfStatement", { left, right, body, await: _await })
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, _await?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForOfStatement").proxy(createForOfStatement)

export const $SwitchCase = createExprMacro("$SwitchCase", function ([test, consequent = $Void]) {
  return createAst("SwitchCase", { test, consequent })
}, "(test?: import(\"@swc/core\").Expression, consequent?: import(\"@swc/core\").Statement[]) => import(\"@swc/core\").SwitchCase").proxy(createSwitchCase)

export const $CatchClause = createExprMacro("$CatchClause", function ([body, param]) {
  return createAst("CatchClause", { body, param })
}, "(body: import(\"@swc/core\").BlockStatement, param?: import(\"@swc/core\").Pattern) => import(\"@swc/core\").CatchClause").proxy(createCatchClause)

export const $TsTypeAnnotation = createExprMacro("$TsTypeAnnotation", function ([typeAnnotation]) {
  return createAst("TsTypeAnnotation", { typeAnnotation })
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeAnnotation").proxy(createTsTypeAnnotation)

export const $TsTypeParameterDeclaration = createExprMacro("$TsTypeParameterDeclaration", function ([parameters = $Void]) {
  return createAst("TsTypeParameterDeclaration", { parameters })
}, "(parameters?: import(\"@swc/core\").TsTypeParameter[]) => import(\"@swc/core\").TsTypeParameterDeclaration").proxy(createTsTypeParameterDeclaration)

export const $TsTypeParameter = createExprMacro("$TsTypeParameter", function ([name, _in, _out, constraint, _default]) {
  return createAst("TsTypeParameter", { name, in: _in, out: _out, constraint, default: _default })
}, "(name: import(\"@swc/core\").Identifier, _in: boolean, _out: boolean, constraint?: import(\"@swc/core\").TsType, _default?: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeParameter").proxy(createTsTypeParameter)

export const $TsTypeParameterInstantiation = createExprMacro("$TsTypeParameterInstantiation", function ([params = $Void]) {
  return createAst("TsTypeParameterInstantiation", { params })
}, "(params?: import(\"@swc/core\").TsType[]) => import(\"@swc/core\").TsTypeParameterInstantiation").proxy(createTsTypeParameterInstantiation)

export const $TsParameterProperty = createExprMacro("$TsParameterProperty", function ([param, accessibility, decorators, override = $False, readonly = $False]) {
  return createAst("TsParameterProperty", { param, accessibility, decorators, override, readonly })
}, "(param: import(\"@swc/core\").TsParameterPropertyParameter, accessibility?: import(\"@swc/core\").Accessibility, decorators?: import(\"@swc/core\").Decorator[], override?: boolean, readonly?: boolean) => import(\"@swc/core\").TsParameterProperty").proxy(createTsParameterProperty)

export const $TsQualifiedName = createExprMacro("$TsQualifiedName", function ([left, right]) {
  return createAst("TsQualifiedName", { left, right })
}, "(left: import(\"@swc/core\").TsEntityName, right: import(\"@swc/core\").Identifier) => import(\"@swc/core\").TsQualifiedName").proxy(createTsQualifiedName)

export const $TsCallSignatureDeclaration = createExprMacro("$TsCallSignatureDeclaration", function ([params = $Void, typeAnnotation, typeParams]) {
  return createAst("TsCallSignatureDeclaration", { params, typeAnnotation, typeParams })
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration) => import(\"@swc/core\").TsCallSignatureDeclaration").proxy(createTsCallSignatureDeclaration)

export const $TsConstructSignatureDeclaration = createExprMacro("$TsConstructSignatureDeclaration", function ([params = $Void, typeAnnotation, typeParams]) {
  return createAst("TsConstructSignatureDeclaration", { params, typeAnnotation, typeParams })
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration) => import(\"@swc/core\").TsConstructSignatureDeclaration").proxy(createTsConstructSignatureDeclaration)

export const $TsPropertySignature = createExprMacro("$TsPropertySignature", function ([key, params, init, typeAnnotation, typeParams, computed = $False, optional = $False, readonly = $False]) {
  return createAst("TsPropertySignature", { key, params, init, typeAnnotation, typeParams, computed, optional, readonly })
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], init?: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsPropertySignature").proxy(createTsPropertySignature)

export const $TsGetterSignature = createExprMacro("$TsGetterSignature", function ([key, typeAnnotation, computed = $False, optional = $False, readonly = $False]) {
  return createAst("TsGetterSignature", { key, typeAnnotation, computed, optional, readonly })
}, "(key: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsGetterSignature").proxy(createTsGetterSignature)

export const $TsSetterSignature = createExprMacro("$TsSetterSignature", function ([key, param, computed = $False, optional = $False, readonly = $False]) {
  return createAst("TsSetterSignature", { key, param, computed, optional, readonly })
}, "(key: import(\"@swc/core\").Expression, param: import(\"@swc/core\").TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsSetterSignature").proxy(createTsSetterSignature)

export const $TsMethodSignature = createExprMacro("$TsMethodSignature", function ([key, params, typeAnn, typeParams, computed = $False, optional = $False, readonly = $False]) {
  return createAst("TsMethodSignature", { key, params, typeAnn, typeParams, computed, optional, readonly })
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], typeAnn?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean) => import(\"@swc/core\").TsMethodSignature").proxy(createTsMethodSignature)

export const $TsIndexSignature = createExprMacro("$TsIndexSignature", function ([params, typeAnnotation, readonly = $False, isStatic = $False]) {
  return createAst("TsIndexSignature", { params, typeAnnotation, readonly, static: isStatic })
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, readonly?: boolean, isStatic?: boolean) => import(\"@swc/core\").TsIndexSignature").proxy(createTsIndexSignature)

export const $TsKeywordType = createExprMacro("$TsKeywordType", function ([kind]) {
  return createAst("TsKeywordType", { kind })
}, "(kind: import(\"@swc/core\").TsKeywordTypeKind) => import(\"@swc/core\").TsKeywordType").proxy(createTsKeywordType)

export const $TsThisType = createExprMacro("$TsThisType", function () {
  return createAst("TsThisType")
}, "() => import(\"@swc/core\").TsThisType").proxy(createTsThisType)

export const $TsFunctionType = createExprMacro("$TsFunctionType", function ([params, typeAnnotation, typeParams]) {
  return createAst("TsFunctionType", { params, typeAnnotation, typeParams })
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration) => import(\"@swc/core\").TsFunctionType").proxy(createTsFunctionType)

export const $TsConstructorType = createExprMacro("$TsConstructorType", function ([params, typeAnnotation, typeParams, isAbstract = $False]) {
  return createAst("TsConstructorType", { params, typeAnnotation, typeParams, isAbstract })
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, isAbstract?: boolean) => import(\"@swc/core\").TsConstructorType").proxy(createTsConstructorType)

export const $TsTypeReference = createExprMacro("$TsTypeReference", function ([typeName, typeParams]) {
  return createAst("TsTypeReference", { typeName, typeParams })
}, "(typeName: import(\"@swc/core\").TsEntityName, typeParams?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsTypeReference").proxy(createTsTypeReference)

export const $TsTypePredicate = createExprMacro("$TsTypePredicate", function ([paramName, typeAnnotation, asserts = $False]) {
  return createAst("TsTypePredicate", { paramName, typeAnnotation, asserts })
}, "(paramName: import(\"@swc/core\").TsThisTypeOrIdent, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, asserts?: boolean) => import(\"@swc/core\").TsTypePredicate").proxy(createTsTypePredicate)

export const $TsImportType = createExprMacro("$TsImportType", function ([argument, qualifier, typeArguments]) {
  return createAst("TsImportType", { argument, qualifier, typeArguments })
}, "(argument: stringLiteral, qualifier?: import(\"@swc/core\").TsEntityName, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsImportType").proxy(createTsImportType)

export const $TsTypeQuery = createExprMacro("$TsTypeQuery", function ([exprName, typeArguments]) {
  return createAst("TsTypeQuery", { exprName, typeArguments })
}, "(exprName: import(\"@swc/core\").TsTypeQueryExpr, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsTypeQuery").proxy(createTsTypeQuery)

export const $TsTypeLiteral = createExprMacro("$TsTypeLiteral", function ([members = $Void]) {
  return createAst("TsTypeLiteral", { members })
}, "(members?: import(\"@swc/core\").TsTypeElement[]) => import(\"@swc/core\").TsTypeLiteral").proxy(createTsTypeLiteral)

export const $TsArrayType = createExprMacro("$TsArrayType", function ([elemType]) {
  return createAst("TsArrayType", { elemType })
}, "(elemType: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsArrayType").proxy(createTsArrayType)

export const $TsTupleType = createExprMacro("$TsTupleType", function ([elemTypes = $Void]) {
  return createAst("TsTupleType", { elemTypes })
}, "(elemTypes?: import(\"@swc/core\").TsTupleElement[]) => import(\"@swc/core\").TsTupleType").proxy(createTsTupleType)

export const $TsTupleElement = createExprMacro("$TsTupleElement", function ([ty, label]) {
  return createAst("TsTupleElement", { ty, label })
}, "(ty: import(\"@swc/core\").TsType, label?: import(\"@swc/core\").Pattern) => import(\"@swc/core\").TsTupleElement").proxy(createTsTupleElement)

export const $TsOptionalType = createExprMacro("$TsOptionalType", function ([typeAnnotation]) {
  return createAst("TsOptionalType", { typeAnnotation })
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsOptionalType").proxy(createTsOptionalType)

export const $TsRestType = createExprMacro("$TsRestType", function ([typeAnnotation]) {
  return createAst("TsRestType", { typeAnnotation })
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsRestType").proxy(createTsRestType)

export const $TsUnionType = createExprMacro("$TsUnionType", function ([types]) {
  return createAst("TsUnionType", { types })
}, "(types: import(\"@swc/core\").TsType[]) => import(\"@swc/core\").TsUnionType").proxy(createTsUnionType)

export const $TsIntersectionType = createExprMacro("$TsIntersectionType", function ([types]) {
  return createAst("TsIntersectionType", { types })
}, "(types: import(\"@swc/core\").TsType[]) => import(\"@swc/core\").TsIntersectionType").proxy(createTsIntersectionType)

export const $TsConditionalType = createExprMacro("$TsConditionalType", function ([checkType, extendsType, trueType, falseType]) {
  return createAst("TsConditionalType", { checkType, extendsType, trueType, falseType })
}, "(checkType: import(\"@swc/core\").TsType, extendsType: import(\"@swc/core\").TsType, trueType: import(\"@swc/core\").TsType, falseType: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsConditionalType").proxy(createTsConditionalType)

export const $TsInferType = createExprMacro("$TsInferType", function ([typeParam]) {
  return createAst("TsInferType", { typeParam })
}, "(typeParam: import(\"@swc/core\").TsTypeParameter) => import(\"@swc/core\").TsInferType").proxy(createTsInferType)

export const $TsParenthesizedType = createExprMacro("$TsParenthesizedType", function ([typeAnnotation]) {
  return createAst("TsParenthesizedType", { typeAnnotation })
}, "(typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsParenthesizedType").proxy(createTsParenthesizedType)

export const $TsTypeOperator = createExprMacro("$TsTypeOperator", function ([op, typeAnnotation]) {
  return createAst("TsTypeOperator", { op, typeAnnotation })
}, "(op: import(\"@swc/core\").TsTypeOperatorOp, typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeOperator").proxy(createTsTypeOperator)

export const $TsIndexedAccessType = createExprMacro("$TsIndexedAccessType", function ([objectType, indexType, readonly = $False]) {
  return createAst("TsIndexedAccessType", { objectType, indexType, readonly })
}, "(objectType: import(\"@swc/core\").TsType, indexType: import(\"@swc/core\").TsType, readonly?: boolean) => import(\"@swc/core\").TsIndexedAccessType").proxy(createTsIndexedAccessType)

export const $TsMappedType = createExprMacro("$TsMappedType", function ([typeParam, typeAnnotation, nameType, optional, readonly]) {
  return createAst("TsMappedType", { typeParam, typeAnnotation, nameType, optional, readonly })
}, "(typeParam: import(\"@swc/core\").TsTypeParameter, typeAnnotation?: import(\"@swc/core\").TsType, nameType?: import(\"@swc/core\").TsType, optional?: import(\"@swc/core\").TruePlusMinus, readonly?: import(\"@swc/core\").TruePlusMinus) => import(\"@swc/core\").TsMappedType").proxy(createTsMappedType)

export const $TsLiteralType = createExprMacro("$TsLiteralType", function ([literal]) {
  return createAst("TsLiteralType", { literal })
}, "(literal: import(\"@swc/core\").TsLiteral) => import(\"@swc/core\").TsLiteralType").proxy(createTsLiteralType)

export const $TsTemplateLiteralType = createExprMacro("$TsTemplateLiteralType", function ([types = $Void, quasis = $Void]) {
  return createAst("TsTemplateLiteralType", { types, quasis })
}, "(types?: import(\"@swc/core\").TsType[], quasis?: import(\"@swc/core\").TemplateElement[]) => import(\"@swc/core\").TsTemplateLiteralType").proxy(createTsTemplateLiteralType)

export const $TsInterfaceDeclaration = createExprMacro("$TsInterfaceDeclaration", function ([id, body, _extends, typeParams, declare = $False]) {
  return createAst("TsInterfaceDeclaration", { id, body, extends: _extends, typeParams, declare })
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsInterfaceBody, _extends?: import(\"@swc/core\").TsExpressionWithTypeArguments[], typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean) => import(\"@swc/core\").TsInterfaceDeclaration").proxy(createTsInterfaceDeclaration)

export const $TsInterfaceBody = createExprMacro("$TsInterfaceBody", function ([body = $Void]) {
  return createAst("TsInterfaceBody", { body })
}, "(body?: import(\"@swc/core\").TsTypeElement[]) => import(\"@swc/core\").TsInterfaceBody").proxy(createTsInterfaceBody)

export const $TsExpressionWithTypeArguments = createExprMacro("$TsExpressionWithTypeArguments", function ([expression, typeArguments]) {
  return createAst("TsExpressionWithTypeArguments", { expression, typeArguments })
}, "(expression: import(\"@swc/core\").Expression, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsExpressionWithTypeArguments").proxy(createTsExpressionWithTypeArguments)

export const $TsTypeAliasDeclaration = createExprMacro("$TsTypeAliasDeclaration", function ([id, typeAnnotation, typeParams, declare = $False]) {
  return createAst("TsTypeAliasDeclaration", { id, typeAnnotation, typeParams, declare })
}, "(id: import(\"@swc/core\").Identifier, typeAnnotation: import(\"@swc/core\").TsType, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean) => import(\"@swc/core\").TsTypeAliasDeclaration").proxy(createTsTypeAliasDeclaration)

export const $TsEnumDeclaration = createExprMacro("$TsEnumDeclaration", function ([id, members = $Void, declare = $False, isConst = $False]) {
  return createAst("TsEnumDeclaration", { id, declare, isConst, members })
}, "(id: import(\"@swc/core\").Identifier, members?: import(\"@swc/core\").TsEnumMember[], declare?: boolean, isConst?: boolean) => import(\"@swc/core\").TsEnumDeclaration").proxy(createTsEnumDeclaration)

export const $TsEnumMember = createExprMacro("$TsEnumMember", function ([id, init]) {
  return createAst("TsEnumMember", { id, init })
}, "(id: import(\"@swc/core\").TsEnumMemberId, init?: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsEnumMember").proxy(createTsEnumMember)

export const $TsModuleDeclaration = createExprMacro("$TsModuleDeclaration", function ([id, body, declare = $False, global = $False]) {
  return createAst("TsModuleDeclaration", { id, body, declare, global })
}, "(id: import(\"@swc/core\").TsModuleName, body?: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean) => import(\"@swc/core\").TsModuleDeclaration").proxy(createTsModuleDeclaration)

export const $TsModuleBlock = createExprMacro("$TsModuleBlock", function ([body]) {
  return createAst("TsModuleBlock", { body })
}, "(body: import(\"@swc/core\").ModuleItem[]) => import(\"@swc/core\").TsModuleBlock").proxy(createTsModuleBlock)

export const $TsNamespaceDeclaration = createExprMacro("$TsNamespaceDeclaration", function ([id, body, declare = $False, global = $False]) {
  return createAst("TsNamespaceDeclaration", { id, body, declare, global })
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean) => import(\"@swc/core\").TsNamespaceDeclaration").proxy(createTsNamespaceDeclaration)

export const $TsImportEqualsDeclaration = createExprMacro("$TsImportEqualsDeclaration", function ([id, moduleRef, declare = $False, isExport = $False, isTypeOnly = $False]) {
  return createAst("TsImportEqualsDeclaration", { id, moduleRef, declare, isExport, isTypeOnly })
}, "(id: import(\"@swc/core\").Identifier, moduleRef: import(\"@swc/core\").TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean) => import(\"@swc/core\").TsImportEqualsDeclaration").proxy(createTsImportEqualsDeclaration)

export const $TsExternalModuleReference = createExprMacro("$TsExternalModuleReference", function ([expression]) {
  return createAst("TsExternalModuleReference", { expression })
}, "(expression: stringLiteral) => import(\"@swc/core\").TsExternalModuleReference").proxy(createTsExternalModuleReference)

export const $TsExportAssignment = createExprMacro("$TsExportAssignment", function ([expression]) {
  return createAst("TsExportAssignment", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsExportAssignment").proxy(createTsExportAssignment)

export const $TsNamespaceExportDeclaration = createExprMacro("$TsNamespaceExportDeclaration", function ([id]) {
  return createAst("TsNamespaceExportDeclaration", { id })
}, "(id: import(\"@swc/core\").Identifier) => import(\"@swc/core\").TsNamespaceExportDeclaration").proxy(createTsNamespaceExportDeclaration)

export const $TsAsExpression = createExprMacro("$TsAsExpression", function ([expression, typeAnnotation]) {
  return createAst("TsAsExpression", { expression, typeAnnotation })
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsAsExpression").proxy(createTsAsExpression)

// TODO: change type to TsSatisfiesExpression when swc support this
export const $TsSatisfiesExpression = createExprMacro("$TsSatisfiesExpression", function ([expression, typeAnnotation]) {
  return createAst("TsSatisfiesExpression", { expression, typeAnnotation })
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType) => Omit<import(\"@swc/core\").TsAsExpression, \"type\"> & { type: \"TsSatisfiesExpression\" }").proxy(createTsSatisfiesExpression)

export const $TsInstantiation = createExprMacro("$TsInstantiation", function ([expression, typeArguments]) {
  return createAst("TsInstantiation", { expression, typeArguments })
}, "(expression: import(\"@swc/core\").Expression, typeArguments: import(\"@swc/core\").TsTypeParameterInstantiation) => import(\"@swc/core\").TsInstantiation").proxy(createTsInstantiation)

export const $TsTypeAssertion = createExprMacro("$TsTypeAssertion", function ([expression, typeAnnotation]) {
  return createAst("TsTypeAssertion", { expression, typeAnnotation })
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType) => import(\"@swc/core\").TsTypeAssertion").proxy(createTsTypeAssertion)

export const $TsConstAssertion = createExprMacro("$TsConstAssertion", function ([expression]) {
  return createAst("TsConstAssertion", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsConstAssertion").proxy(createTsConstAssertion)

export const $TsNonNullExpression = createExprMacro("$TsNonNullExpression", function ([expression]) {
  return createAst("TsNonNullExpression", { expression })
}, "(expression: import(\"@swc/core\").Expression) => import(\"@swc/core\").TsNonNullExpression").proxy(createTsNonNullExpression)

export const $Invalid = createExprMacro("$Invalid", function () { return createAst("Invalid") }, "() => import(\"@swc/core\").Invalid").proxy(createInvalid)
