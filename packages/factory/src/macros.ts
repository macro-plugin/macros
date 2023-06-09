import type { ArrayExpression, BooleanLiteral, CallExpression, Expression, Identifier, KeyValueProperty, NullLiteral, NumericLiteral, ObjectExpression, Span, StringLiteral } from "@swc/core"
import { createArgument, createArrayExpression, createArrayPattern, createArrowFunctionExpression, createAssignmentExpression, createAssignmentPattern, createAssignmentPatternProperty, createAssignmentProperty, createAwaitExpression, createBigIntLiteral, createBinaryExpression, createBlockStatement, createBooleanLiteral, createBreakStatement, createCallExpression, createCatchClause, createClassDeclaration, createClassExpression, createClassMethod, createClassProperty, createComputed, createComputedPropName, createConditionalExpression, createConstructor, createContinueStatement, createDebuggerStatement, createDecorator, createDoWhileStatement, createEmptyStatement, createExportAllDeclaration, createExportDeclaration, createExportDefaultDeclaration, createExportDefaultExpression, createExportDefaultSpecifier, createExportNamedDeclaration, createExportNamespaceSpecifier, createExportSpecifier, createExprOrSpread, createExpressionStatement, createForInStatement, createForOfStatement, createForStatement, createFunctionDeclaration, createFunctionExpression, createGetterProperty, createIdentifier, createIfStatement, createImport, createImportDeclaration, createImportDefaultSpecifier, createImportNamespaceSpecifier, createImportSpecifier, createInvalid, createJSXAttribute, createJSXClosingElement, createJSXClosingFragment, createJSXElement, createJSXEmptyExpression, createJSXExpressionContainer, createJSXFragment, createJSXMemberExpression, createJSXNamespacedName, createJSXOpeningElement, createJSXOpeningFragment, createJSXSpreadChild, createJSXText, createKeyValuePatternProperty, createKeyValueProperty, createLabeledStatement, createMemberExpression, createMetaProperty, createMethodProperty, createModule, createNamedExportSpecifier, createNamedImportSpecifier, createNewExpression, createNullLiteral, createNumericLiteral, createObjectExpression, createObjectPattern, createOptionalChainingCall, createOptionalChainingExpression, createParam, createParenthesisExpression, createPrivateMethod, createPrivateName, createPrivateProperty, createRegExpLiteral, createRestElement, createReturnStatement, createScript, createSequenceExpression, createSetterProperty, createSpan, createSpreadElement, createStaticBlock, createStringLiteral, createSuper, createSuperPropExpression, createSwitchCase, createSwitchStatement, createTaggedTemplateExpression, createTemplateElement, createTemplateLiteral, createThisExpression, createThrowStatement, createTryStatement, createTsArrayType, createTsAsExpression, createTsCallSignatureDeclaration, createTsConditionalType, createTsConstAssertion, createTsConstructSignatureDeclaration, createTsConstructorType, createTsEnumDeclaration, createTsEnumMember, createTsExportAssignment, createTsExpressionWithTypeArguments, createTsExternalModuleReference, createTsFunctionType, createTsGetterSignature, createTsImportEqualsDeclaration, createTsImportType, createTsIndexSignature, createTsIndexedAccessType, createTsInferType, createTsInstantiation, createTsInterfaceBody, createTsInterfaceDeclaration, createTsIntersectionType, createTsKeywordType, createTsLiteralType, createTsMappedType, createTsMethodSignature, createTsModuleBlock, createTsModuleDeclaration, createTsNamespaceDeclaration, createTsNamespaceExportDeclaration, createTsNonNullExpression, createTsOptionalType, createTsParameterProperty, createTsParenthesizedType, createTsPropertySignature, createTsQualifiedName, createTsRestType, createTsSatisfiesExpression, createTsSetterSignature, createTsTemplateLiteralType, createTsThisType, createTsTupleElement, createTsTupleType, createTsTypeAliasDeclaration, createTsTypeAnnotation, createTsTypeAssertion, createTsTypeLiteral, createTsTypeOperator, createTsTypeParameter, createTsTypeParameterDeclaration, createTsTypeParameterInstantiation, createTsTypePredicate, createTsTypeQuery, createTsTypeReference, createTsUnionType, createUnaryExpression, createUpdateExpression, createVariableDeclaration, createVariableDeclarator, createWhileStatement, createWithStatement, createYieldExpression } from "./runtime"
import { createExprMacro, dummySpan } from "@macro-plugin/core"

const transformTsExpr = (expr: Expression) => {
  switch (expr.type) {
    case "TsTypeAssertion":
    case "TsNonNullExpression":
    case "TsConstAssertion":
    case "TsAsExpression":
    case "TsSatisfiesExpression":
    case "TsInstantiation":
      return expr.expression
  }

  return expr
}

export const isNullExpr = (expr: Expression | undefined) => expr == null || (expr.type === "Identifier" && expr.value === "undefined") || expr.type === "NullLiteral"

const createAstProp = (key: string, value: Expression, span: Span) => ({
  type: "KeyValueProperty",
  key: { type: "StringLiteral", span, value: key },
  value
} as KeyValueProperty)

export const createAst = (type: string, props: Record<string, Expression | undefined>, span: Span) => {
  let v: Expression | undefined

  const properties: KeyValueProperty[] = [
    createAstProp("type", {
      type: "StringLiteral",
      span,
      value: type,
    }, span)
  ]

  if (isNullExpr(props.span)) props.span = undefined

  for (const k in props) {
    v = props[k as keyof typeof props]
    if (v) properties.push(createAstProp(k, transformTsExpr(v), span))
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (props.span == null) properties.push(createAstProp("span", createSpanAst(span), span))

  return {
    type: "ObjectExpression",
    span,
    properties
  } as ObjectExpression
}

const createSpanAst = (span: Span) => ({
  type: "ObjectExpression",
  properties: [
    createAstProp("start", { type: "NumericLiteral", value: span.start, span }, span),
    createAstProp("end", { type: "NumericLiteral", value: span.end, span }, span),
    createAstProp("ctxt", { type: "NumericLiteral", value: span.ctxt, span }, span)
  ],
  span
} as ObjectExpression)

const optional = (expr: Expression, defaultValue: unknown, span = dummySpan) => {
  if (isNullExpr(expr)) {
    switch (typeof defaultValue) {
      case "boolean":
        return {
          type: "BooleanLiteral",
          span,
          value: defaultValue
        } as BooleanLiteral
      case "number":
        return {
          type: "NumericLiteral",
          span,
          value: defaultValue
        } as NumericLiteral
      case "string":
        return {
          type: "StringLiteral",
          span,
          value: defaultValue
        } as StringLiteral
      case "undefined":
        return {
          type: "Identifier",
          span,
          value: "undefined"
        } as Identifier
      case "object":
        return Array.isArray(defaultValue)
          ? {
            type: "ArrayExpression",
            span,
            elements: []
          } as ArrayExpression
          : defaultValue == null
            ? {
              type: "NullLiteral",
              span
            } as NullLiteral
            : {
              type: "ObjectExpression",
              span,
              properties: []
            } as ObjectExpression
    }
  }
  return expr
}

function _JSONStringify (expression: Expression, span: Span): CallExpression {
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

export const $Span = createExprMacro("$Span", function ([start, end, ctxt]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    properties: [
      createAstProp("start", optional(start, 0), span),
      createAstProp("end", optional(end, 0), span),
      createAstProp("ctxt", optional(ctxt, 0), span)
    ],
    span
  } as ObjectExpression
}, "(start?: number, end?: number, ctxt?: number) => import(\"@swc/core\").Span").proxy(createSpan)

export const $Identifier = createExprMacro("$Identifier", function ([value, isOptional, span]) {
  return createAst("Identifier", { value, optional: optional(isOptional, false), span }, this.span())
}, "(value: string, optional?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Identifier").proxy(createIdentifier)

export const $StringLiteral = createExprMacro("$StringLiteral", function ([value, raw, span]) {
  return createAst("StringLiteral", { value, raw, span }, this.span())
}, "(value: string, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").StringLiteral").proxy(createStringLiteral)

export const $NumericLiteral = createExprMacro("$NumericLiteral", function ([value, raw, span]) {
  return createAst("NumericLiteral", { value, raw, span }, this.span())
}, "(value: number, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NumericLiteral").proxy(createNumericLiteral)

export const $BigIntLiteral = createExprMacro("$BigIntLiteral", function ([value, raw, span]) {
  return createAst("BigIntLiteral", { value, raw, span }, this.span())
}, "(value: bigint, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BigIntLiteral").proxy(createBigIntLiteral)

export const $BooleanLiteral = createExprMacro("$BooleanLiteral", function ([value, span]) {
  return createAst("BooleanLiteral", { value, span }, this.span())
}, "(value: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BooleanLiteral").proxy(createBooleanLiteral)

export const $NullLiteral = createExprMacro("$NullLiteral", function ([span]) {
  return createAst("NullLiteral", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NullLiteral").proxy(createNullLiteral)

export const $RegExpLiteral = createExprMacro("$RegExpLiteral", function ([pattern, flags, span]) {
  return createAst("RegExpLiteral", { pattern, flags, span }, this.span())
}, "(pattern: string, flags: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").RegExpLiteral").proxy(createRegExpLiteral)

export const $Argument = createExprMacro("$Argument", function ([expression, spread]) {
  const span = this.span()
  const properties: KeyValueProperty[] = []
  if (!isNullExpr(spread)) properties.push(createAstProp("spread", spread, span))
  properties.push(createAstProp("expression", expression, span))

  return {
    type: "ObjectExpression",
    span,
    properties
  } as ObjectExpression
}, "(expression: import(\"@swc/core\").Expression, spread?: import(\"@swc/core\").Span) => import(\"@swc/core\").Argument").proxy(createArgument)

export const $CallExpression = createExprMacro("$CallExpression", function ([callee, callArgs, typeArguments, span]) {
  return createAst("CallExpression", { callee, arguments: optional(callArgs, []), typeArguments, span }, this.span())
}, "(callee: import(\"@swc/core\").Expression | import(\"@swc/core\").Super | import(\"@swc/core\").Import, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").CallExpression").proxy(createCallExpression)

export const $ClassProperty = createExprMacro("$ClassProperty", function ([key, value, accessibility, typeAnnotation, decorators, declare, definite, isAbstract, isOptional, isOverride, isStatic, isReadonly, span]) {
  return createAst("ClassProperty", { key, value, accessibility, typeAnnotation, decorators, declare: optional(declare, false), definite: optional(definite, false), isAbstract: optional(isAbstract, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), readonly: optional(isReadonly, false), isStatic: optional(isStatic, false), span }, this.span())
}, "(key: import(\"@swc/core\").PropertyName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, definite?: boolean, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassProperty").proxy(createClassProperty)

export const $PrivateProperty = createExprMacro("$PrivateProperty", function ([key, value, accessibility, typeAnnotation, decorators, definite, isOptional, isOverride, isStatic, isReadonly, span]) {
  return createAst("PrivateProperty", { key, value, accessibility, typeAnnotation, decorators, definite: optional(definite, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), isStatic: optional(isStatic, false), readonly: optional(isReadonly, false), span }, this.span())
}, "(key: import(\"@swc/core\").PrivateName, value?: import(\"@swc/core\").Expression, accessibility?: import(\"@swc/core\").Accessibility, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], definite?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").PrivateProperty").proxy(createPrivateProperty)

export const $Param = createExprMacro("$Param", function ([pat, decorators, span]) {
  return createAst("Parameter", { pat, decorators, span }, this.span())
}, "(pat: import(\"@swc/core\").Pattern, decorators?: import(\"@swc/core\").Decorator[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Param").proxy(createParam)

export const $Constructor = createExprMacro("$Constructor", function ([key, params, body, accessibility, isOptional, span]) {
  return createAst("Constructor", { key, params, body, accessibility, isOptional: optional(isOptional, false), span }, this.span())
}, "(key: import(\"@swc/core\").PropertyName, params: (import(\"@swc/core\").TsParameterProperty | import(\"@swc/core\").Param)[], body?: import(\"@swc/core\").BlockStatement, accessibility?: import(\"@swc/core\").Accessibility, isOptional?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Constructor").proxy(createConstructor)

export const $ClassMethod = createExprMacro("$ClassMethod", function ([kind, key, fn, accessibility, isAbstract, isOptional, isOverride, isStatic, span]) {
  return createAst("ClassMethod", { kind, key, function: fn, accessibility, isAbstract: optional(isAbstract, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), isStatic: optional(isStatic, false), span }, this.span())
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PropertyName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassMethod").proxy(createClassMethod)

export const $PrivateMethod = createExprMacro("$PrivateMethod", function ([kind, key, fn, accessibility, isAbstract, isOptional, isOverride, isStatic, span]) {
  return createAst("PrivateMethod", { kind, key, function: fn, accessibility, isAbstract: optional(isAbstract, false), isOptional: optional(isOptional, false), isOverride: optional(isOverride, false), isStatic: optional(isStatic, false), span }, this.span())
}, "(kind: import(\"@swc/core\").MethodKind, key: import(\"@swc/core\").PrivateName, fn: import(\"@swc/core\").Fn, accessibility?: import(\"@swc/core\").Accessibility, isAbstract?: boolean, isOptional?: boolean, isOverride?: boolean, isStatic?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").PrivateMethod").proxy(createPrivateMethod)

export const $StaticBlock = createExprMacro("$StaticBlock", function ([body, span]) {
  return createAst("StaticBlock", { body, span }, this.span())
}, "(body: import(\"@swc/core\").BlockStatement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").StaticBlock").proxy(createStaticBlock)

export const $Decorator = createExprMacro("$Decorator", function ([expression, span]) {
  return createAst("Decorator", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Decorator").proxy(createDecorator)

export const $FunctionDeclaration = createExprMacro("$FunctionDeclaration", function ([identifier, params, body, typeParameters, returnType, decorators, declare, async, generator, span]) {
  return createAst("FunctionDeclaration", { identifier, params, body, typeParameters, returnType, decorators, declare: optional(declare, false), async: optional(async, false), generator: optional(generator, false), span }, this.span())
}, "(identifier: import(\"@swc/core\").Identifier, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, async?: boolean, generator?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").FunctionDeclaration").proxy(createFunctionDeclaration)

export const $ClassDeclaration = createExprMacro("$ClassDeclaration", function ([identifier, body, impls, superClass, typeParams, superTypeParams, decorators, declare, isAbstract, span]) {
  return createAst("ClassDeclaration", { identifier, body, implements: impls, superClass, typeParams, superTypeParams, decorators, declare: optional(declare, false), isAbstract: optional(isAbstract, false), span }, this.span())
}, "(identifier: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").ClassMember[], impls: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], declare?: boolean, isAbstract?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassDeclaration").proxy(createClassDeclaration)

export const $VariableDeclaration = createExprMacro("$VariableDeclaration", function ([kind, declarations, declare, span]) {
  return createAst("VariableDeclaration", { kind, declare: optional(declare, false), declarations: optional(declarations, []), span }, this.span())
}, "(kind: import(\"@swc/core\").VariableDeclarationKind, declarations?: import(\"@swc/core\").VariableDeclarator[], declare?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").VariableDeclaration").proxy(createVariableDeclaration)

export const $VariableDeclarator = createExprMacro("$VariableDeclarator", function ([id, init, definite, span]) {
  return createAst("VariableDeclarator", { id, definite: optional(definite, false), init, span }, this.span())
}, "(id: import(\"@swc/core\").Pattern, init?: import(\"@swc/core\").Expression, definite?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").VariableDeclarator").proxy(createVariableDeclarator)

export const $OptionalChainingExpression = createExprMacro("$OptionalChainingExpression", function ([base, questionDotToken, span]) {
  const blockSpan = this.span()
  return createAst("OptionalChainingExpression", { base, questionDotToken: isNullExpr(questionDotToken) ? createSpanAst(blockSpan) : questionDotToken, span }, blockSpan)
}, "(base: import(\"@swc/core\").MemberExpression | import(\"@swc/core\").OptionalChainingCall, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").OptionalChainingExpression").proxy(createOptionalChainingExpression)

export const $OptionalChainingCall = createExprMacro("$OptionalChainingCall", function ([callee, args, typeArguments, span]) {
  return createAst("OptionalChainingCall", { callee, arguments: optional(args, []), typeArguments, span }, this.span())
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").ExprOrSpread[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").OptionalChainingCall").proxy(createOptionalChainingCall)

export const $ThisExpression = createExprMacro("$ThisExpression", function ([span]) {
  return createAst("ThisExpression", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ThisExpression").proxy(createThisExpression)

export const $ArrayExpression = createExprMacro("$ArrayExpression", function ([elements, span]) {
  return createAst("ArrayExpression", { elements: optional(elements, []), span }, this.span())
}, "(elements?: (import(\"@swc/core\").ExprOrSpread | undefined)[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ArrayExpression").proxy(createArrayExpression)

export const $ExprOrSpread = createExprMacro("$ExprOrSpread", function ([expression, spread]) {
  const span = this.span()
  const properties: KeyValueProperty[] = []
  if (!isNullExpr(spread)) properties.push(createAstProp("spread", spread, span))
  properties.push(createAstProp("expression", expression, span))

  return {
    type: "ObjectExpression",
    span,
    properties
  } as ObjectExpression
}, "(expression: import(\"@swc/core\").Expression, spread?: import(\"@swc/core\").Span, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExprOrSpread").proxy(createExprOrSpread)

export const $ObjectExpression = createExprMacro("$ObjectExpression", function ([properties, span]) {
  return createAst("ObjectExpression", { properties: optional(properties, []), span }, this.span())
}, "(properties?: (import(\"@swc/core\").SpreadElement | import(\"@swc/core\").Property)[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ObjectExpression").proxy(createObjectExpression)

export const $SpreadElement = createExprMacro("$SpreadElement", function ([args, spread]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "SpreadElement", span }, span), createAstProp("arguments", args, span), createAstProp("spread", isNullExpr(spread) ? createSpanAst(span) : spread, span)]
  } as ObjectExpression
}, "(args: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SpreadElement").proxy(createSpreadElement)

export const $UnaryExpression = createExprMacro("$UnaryExpression", function ([operator, argument, span]) {
  return createAst("UnaryExpression", { operator, argument, span }, this.span())
}, "(operator: import(\"@swc/core\").UnaryOperator, argument: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").UnaryExpression").proxy(createUnaryExpression)

export const $UpdateExpression = createExprMacro("$UpdateExpression", function ([operator, argument, prefix, span]) {
  return createAst("UpdateExpression", { operator, argument, prefix: optional(prefix, false), span }, this.span())
}, "(operator: import(\"@swc/core\").UpdateOperator, argument: import(\"@swc/core\").Expression, prefix?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").UpdateExpression").proxy(createUpdateExpression)

export const $BinaryExpression = createExprMacro("$BinaryExpression", function ([left, operator, right, span]) {
  return createAst("BinaryExpression", { left, operator, right, span }, this.span())
}, "(left: import(\"@swc/core\").Expression, operator: import(\"@swc/core\").BinaryOperator, right: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BinaryExpression").proxy(createBinaryExpression)

export const $FunctionExpression = createExprMacro("$FunctionExpression", function ([params, body, identifier, typeParameters, returnType, decorators, async, generator, span]) {
  return createAst("FunctionExpression", { params, body, identifier, typeParameters, returnType, decorators, async: optional(async, false), generator: optional(generator, false), span }, this.span())
}, "(params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, identifier?: import(\"@swc/core\").Identifier, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, decorators?: import(\"@swc/core\").Decorator[], async?: boolean, generator?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").FunctionExpression").proxy(createFunctionExpression)

export const $ClassExpression = createExprMacro("$ClassExpression", function ([body, impls, superClass, identifier, typeParams, superTypeParams, decorators, isAbstract, span]) {
  return createAst("ClassExpression", { body, implements: optional(impls, []), superClass, identifier, typeParams, superTypeParams, decorators, isAbstract: optional(isAbstract, false), span }, this.span())
}, "(body: import(\"@swc/core\").ClassMember[], impls?: import(\"@swc/core\").TsExpressionWithTypeArguments[], superClass?: import(\"@swc/core\").Expression, identifier?: import(\"@swc/core\").Identifier, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, superTypeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, decorators?: import(\"@swc/core\").Decorator[], isAbstract?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ClassExpression").proxy(createClassExpression)

export const $AssignmentExpression = createExprMacro("$AssignmentExpression", function ([left, operator, right, span]) {
  return createAst("AssignmentExpression", { left, operator, right, span }, this.span())
}, "(left: import(\"@swc/core\").Expression | Pattern, operator: import(\"@swc/core\").AssignmentOperator, right: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AssignmentExpression").proxy(createAssignmentExpression)

export const $MemberExpression = createExprMacro("$MemberExpression", function ([object, property, span]) {
  return createAst("MemberExpression", { object, property, span }, this.span())
}, "(object: import(\"@swc/core\").Expression, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").PrivateName | import(\"@swc/core\").ComputedPropName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").MemberExpression").proxy(createMemberExpression)

export const $SuperPropExpression = createExprMacro("$SuperPropExpression", function ([obj, property, span]) {
  return createAst("SuperPropExpression", { obj, property, span }, this.span())
}, "(obj: import(\"@swc/core\").Super, property: import(\"@swc/core\").Identifier | import(\"@swc/core\").ComputedPropName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SuperPropExpression").proxy(createSuperPropExpression)

export const $ConditionalExpression = createExprMacro("$ConditionalExpression", function ([test, consequent, alternate, span]) {
  return createAst("ConditionalExpression", { test, consequent, alternate, span }, this.span())
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Expression, alternate: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ConditionalExpression").proxy(createConditionalExpression)

export const $Super = createExprMacro("$Super", function ([span]) {
  return createAst("Super", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Super").proxy(createSuper)

export const $Import = createExprMacro("$Import", function ([span]) {
  return createAst("Import", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Import").proxy(createImport)

export const $NewExpression = createExprMacro("$NewExpression", function ([callee, args, typeArguments, span]) {
  return createAst("NewExpression", { callee, arguments: args, typeArguments, span }, this.span())
}, "(callee: import(\"@swc/core\").Expression, args?: import(\"@swc/core\").Argument[], typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NewExpression").proxy(createNewExpression)

export const $SequenceExpression = createExprMacro("$SequenceExpression", function ([expressions, span]) {
  return createAst("SequenceExpression", { expressions, span }, this.span())
}, "(expressions: import(\"@swc/core\").Expression[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SequenceExpression").proxy(createSequenceExpression)

export const $ArrowFunctionExpression = createExprMacro("$ArrowFunctionExpression", function ([params, body, async, generator, typeParameters, returnType, span]) {
  return createAst("ArrowFunctionExpression", { params, body, typeParameters, returnType, async: optional(async, false), generator: optional(generator, false), span }, this.span())
}, "(params: import(\"@swc/core\").Pattern[], body: import(\"@swc/core\").BlockStatement | import(\"@swc/core\").Expression, async?: boolean, generator?: boolean, typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ArrowFunctionExpression").proxy(createArrowFunctionExpression)

export const $YieldExpression = createExprMacro("$YieldExpression", function ([argument, delegate, span]) {
  return createAst("YieldExpression", { argument, delegate: optional(delegate, false), span }, this.span())
}, "(argument?: import(\"@swc/core\").Expression, delegate?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").YieldExpression").proxy(createYieldExpression)

export const $MetaProperty = createExprMacro("$MetaProperty", function ([kind, span]) {
  return createAst("MetaProperty", { kind, span }, this.span())
}, "(kind: \"new.target\" | \"import.meta\", span?: import(\"@swc/core\").Span) => import(\"@swc/core\").MetaProperty").proxy(createMetaProperty)

export const $AwaitExpression = createExprMacro("$AwaitExpression", function ([argument, span]) {
  return createAst("AwaitExpression", { argument, span }, this.span())
}, "(argument: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AwaitExpression").proxy(createAwaitExpression)

export const $TemplateLiteral = createExprMacro("$TemplateLiteral", function ([expressions, quasis, span]) {
  return createAst("TemplateLiteral", { expressions: optional(expressions, []), quasis: optional(quasis, []), span }, this.span())
}, "(expressions?: import(\"@swc/core\").Expression[], quasis?: import(\"@swc/core\").TemplateElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TemplateLiteral").proxy(createTemplateLiteral)

export const $TaggedTemplateExpression = createExprMacro("$TaggedTemplateExpression", function ([tag, template, typeParameters, span]) {
  return createAst("TaggedTemplateExpression", { tag, template, typeParameters, span }, this.span())
}, "(tag: import(\"@swc/core\").Expression, template: import(\"@swc/core\").TemplateLiteral, typeParameters?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TaggedTemplateExpression").proxy(createTaggedTemplateExpression)

export const $TemplateElement = createExprMacro("$TemplateElement", function ([raw, cooked, tail, span]) {
  return createAst("TemplateElement", { raw, cooked, tail: optional(tail, false), span }, this.span())
}, "(raw: string, cooked?: string, tail?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TemplateElement").proxy(createTemplateElement)

export const $ParenthesisExpression = createExprMacro("$ParenthesisExpression", function ([expression, span]) {
  return createAst("ParenthesisExpression", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ParenthesisExpression").proxy(createParenthesisExpression)

export const $PrivateName = createExprMacro("$PrivateName", function ([id, span]) {
  return createAst("PrivateName", { id, span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").PrivateName").proxy(createPrivateName)

export const $JSXMemberExpression = createExprMacro("$JSXMemberExpression", function ([object, property]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "JSXMemberExpression", span }, span), createAstProp("object", object, span), createAstProp("property", property, span)]
  } as ObjectExpression
}, "(object: import(\"@swc/core\").JSXObject, property: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXMemberExpression").proxy(createJSXMemberExpression)

export const $JSXNamespacedName = createExprMacro("$JSXNamespacedName", function ([namespace, name]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "JSXNamespacedName", span }, span), createAstProp("namespace", namespace, span), createAstProp("name", name, span)]
  } as ObjectExpression
}, "(namespace: import(\"@swc/core\").Identifier, name: import(\"@swc/core\").Identifier) => import(\"@swc/core\").JSXNamespacedName").proxy(createJSXNamespacedName)

export const $JSXEmptyExpression = createExprMacro("$JSXEmptyExpression", function ([span]) {
  return createAst("JSXEmptyExpression", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXEmptyExpression").proxy(createJSXEmptyExpression)

export const $JSXExpressionContainer = createExprMacro("$JSXExpressionContainer", function ([expression, span]) {
  return createAst("JSXExpressionContainer", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").JSXExpression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXExpressionContainer").proxy(createJSXExpressionContainer)

export const $JSXSpreadChild = createExprMacro("$JSXSpreadChild", function ([expression, span]) {
  return createAst("JSXSpreadChild", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXSpreadChild").proxy(createJSXSpreadChild)

export const $JSXOpeningElement = createExprMacro("$JSXOpeningElement", function ([name, attributes, selfClosing, typeArguments, span]) {
  return createAst("JSXOpeningElement", { name, attributes: optional(attributes, []), selfClosing: optional(selfClosing, false), typeArguments, span }, this.span())
}, "(name: import(\"@swc/core\").JSXElementName, attributes?: import(\"@swc/core\").JSXAttributeOrSpread[], selfClosing?: boolean, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXOpeningElement").proxy(createJSXOpeningElement)

export const $JSXClosingElement = createExprMacro("$JSXClosingElement", function ([name, span]) {
  return createAst("JSXClosingElement", { name, span }, this.span())
}, "(name: import(\"@swc/core\").JSXElementName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXClosingElement").proxy(createJSXClosingElement)

export const $JSXAttribute = createExprMacro("$JSXAttribute", function ([name, value, span]) {
  return createAst("JSXAttribute", { name, value, span }, this.span())
}, "(name: import(\"@swc/core\").JSXAttributeName, value?: import(\"@swc/core\").JSXAttrValue, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXAttribute").proxy(createJSXAttribute)

export const $JSXText = createExprMacro("$JSXText", function ([value, raw, span]) {
  const blockSpan = this.span()
  return createAst("JSXText", { value, raw: raw || _JSONStringify(value, blockSpan), span }, blockSpan)
}, "(value: string, raw?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXText").proxy(createJSXText)

export const $JSXElement = createExprMacro("$JSXElement", function ([opening, children, closing, span]) {
  return createAst("JSXElement", { opening, children: optional(children, []), closing, span }, this.span())
}, "(opening: import(\"@swc/core\").JSXOpeningElement, children?: import(\"@swc/core\").JSXElementChild[], closing?: import(\"@swc/core\").JSXClosingElement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXElement").proxy(createJSXElement)

export const $JSXFragment = createExprMacro("$JSXFragment", function ([opening, children, closing, span]) {
  return createAst("JSXFragment", { opening, children: optional(children, []), closing, span }, this.span())
}, "(opening: import(\"@swc/core\").JSXOpeningFragment, children?: import(\"@swc/core\").JSXElementChild[], closing: import(\"@swc/core\").JSXClosingFragment, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXFragment").proxy(createJSXFragment)

export const $JSXOpeningFragment = createExprMacro("$JSXOpeningFragment", function ([span]) {
  return createAst("JSXOpeningFragment", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXOpeningFragment").proxy(createJSXOpeningFragment)

export const $JSXClosingFragment = createExprMacro("$JSXClosingFragment", function ([span]) {
  return createAst("JSXClosingFragment", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").JSXClosingFragment").proxy(createJSXClosingFragment)

export const $ExportDefaultExpression = createExprMacro("$ExportDefaultExpression", function ([expression, span]) {
  return createAst("ExportDefaultExpression", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDefaultExpression").proxy(createExportDefaultExpression)

export const $ExportDeclaration = createExprMacro("$ExportDeclaration", function ([declaration, span]) {
  return createAst("ExportDeclaration", { declaration, span }, this.span())
}, "(declaration: import(\"@swc/core\").Declaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDeclaration").proxy(createExportDeclaration)

export const $ImportDeclaration = createExprMacro("$ImportDeclaration", function ([specifiers, source, asserts, typeOnly, span]) {
  return createAst("ImportDeclaration", { specifiers, source, typeOnly: optional(typeOnly, false), asserts, span }, this.span())
}, "(specifiers: import(\"@swc/core\").ImportSpecifier[], source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ImportDeclaration").proxy(createImportDeclaration)

export const $ExportAllDeclaration = createExprMacro("$ExportAllDeclaration", function ([source, asserts, span]) {
  return createAst("ExportAllDeclaration", { source, asserts, span }, this.span())
}, "(source: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportAllDeclaration").proxy(createExportAllDeclaration)

export const $ExportNamedDeclaration = createExprMacro("$ExportNamedDeclaration", function ([specifiers, source, asserts, typeOnly, span]) {
  return createAst("ExportNamedDeclaration", { specifiers, source, typeOnly: optional(typeOnly, false), asserts, span }, this.span())
}, "(specifiers: import(\"@swc/core\").ExportSpecifier[], source?: stringLiteral, asserts?: import(\"@swc/core\").ObjectExpression, typeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportNamedDeclaration").proxy(createExportNamedDeclaration)

export const $ExportDefaultDeclaration = createExprMacro("$ExportDefaultDeclaration", function ([decl, span]) {
  return createAst("ExportDefaultDeclaration", { decl, span }, this.span())
}, "(decl: import(\"@swc/core\").DefaultDecl, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDefaultDeclaration").proxy(createExportDefaultDeclaration)

export const $ImportDefaultSpecifier = createExprMacro("$ImportDefaultSpecifier", function ([local, span]) {
  return createAst("ImportDefaultSpecifier", { local, span }, this.span())
}, "(local: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ImportDefaultSpecifier").proxy(createImportDefaultSpecifier)

export const $ImportNamespaceSpecifier = createExprMacro("$ImportNamespaceSpecifier", function ([local, span]) {
  return createAst("ImportNamespaceSpecifier", { local, span }, this.span())
}, "(local: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ImportNamespaceSpecifier").proxy(createImportNamespaceSpecifier)

export const $ImportSpecifier = createExprMacro("$ImportSpecifier", function ([local, imported, isTypeOnly, span]) {
  return createAst("ImportSpecifier", { local, imported, isTypeOnly: optional(isTypeOnly, false), span }, this.span())
}, "(local: import(\"@swc/core\").Identifier, imported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedImportSpecifier").proxy(createImportSpecifier)

export const $NamedImportSpecifier = createExprMacro("$NamedImportSpecifier", function ([local, imported, isTypeOnly, span]) {
  return createAst("ImportSpecifier", { local, imported, isTypeOnly: optional(isTypeOnly, false), span }, this.span())
}, "(local: import(\"@swc/core\").Identifier, imported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedImportSpecifier").proxy(createNamedImportSpecifier)

export const $ExportNamespaceSpecifier = createExprMacro("$ExportNamespaceSpecifier", function ([name, span]) {
  return createAst("ExportNamespaceSpecifier", { name, span }, this.span())
}, "(name: import(\"@swc/core\").ModuleExportName, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportNamespaceSpecifier").proxy(createExportNamespaceSpecifier)

export const $ExportDefaultSpecifier = createExprMacro("$ExportDefaultSpecifier", function ([exported, span]) {
  return createAst("ExportDefaultSpecifier", { exported, span }, this.span())
}, "(exported: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExportDefaultSpecifier").proxy(createExportDefaultSpecifier)

export const $ExportSpecifier = createExprMacro("$NamedExportSpecifier", function ([orig, exported, isTypeOnly, span]) {
  return createAst("ExportSpecifier", { orig, exported, isTypeOnly: optional(isTypeOnly, false), span }, this.span())
}, "(orig: import(\"@swc/core\").ModuleExportName, exported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedExportSpecifier").proxy(createExportSpecifier)

export const $NamedExportSpecifier = createExprMacro("$NamedExportSpecifier", function ([orig, exported, isTypeOnly, span]) {
  return createAst("ExportSpecifier", { orig, exported, isTypeOnly: optional(isTypeOnly, false), span }, this.span())
}, "(orig: import(\"@swc/core\").ModuleExportName, exported?: import(\"@swc/core\").ModuleExportName, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").NamedExportSpecifier").proxy(createNamedExportSpecifier)

export const $Module = createExprMacro("$Module", function ([body, interpreter, span]) {
  return createAst("Module", { body: optional(body, []), interpreter, span }, this.span())
}, "(body: import(\"@swc/core\").ModuleItem[], interpreter?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Module").proxy(createModule)

export const $Script = createExprMacro("$Script", function ([body, interpreter, span]) {
  return createAst("Script", { body: optional(body, []), interpreter, span }, this.span())
}, "(body: import(\"@swc/core\").Statement[], interpreter?: string, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Script").proxy(createScript)

export const $ArrayPattern = createExprMacro("$ArrayPattern", function ([elements, isOptional, typeAnnotation, span]) {
  return createAst("ArrayPattern", { elements, optional: optional(isOptional, false), typeAnnotation, span }, this.span())
}, "(elements: (import(\"@swc/core\").Pattern | undefined)[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ArrayPattern").proxy(createArrayPattern)

export const $ObjectPattern = createExprMacro("$ObjectPattern", function ([properties, isOptional, typeAnnotation, span]) {
  return createAst("ObjectPattern", { properties, optional: optional(isOptional, false), typeAnnotation, span }, this.span())
}, "(properties: import(\"@swc/core\").ObjectPatternProperty[], optional?: boolean, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ObjectPattern").proxy(createObjectPattern)

export const $AssignmentPattern = createExprMacro("$AssignmentPattern", function ([left, right, typeAnnotation, span]) {
  return createAst("AssignmentPattern", { left, right, typeAnnotation, span }, this.span())
}, "(left: import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AssignmentPattern").proxy(createAssignmentPattern)

export const $RestElement = createExprMacro("$RestElement", function ([argument, typeAnnotation, rest, span]) {
  const blockSpan = this.span()
  return createAst("RestElement", { argument, rest: isNullExpr(rest) ? createSpanAst(blockSpan) : rest, typeAnnotation, span }, blockSpan)
}, "(argument: import(\"@swc/core\").Pattern, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, rest?: import(\"@swc/core\").Span, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").RestElement").proxy(createRestElement)

export const $KeyValuePatternProperty = createExprMacro("$KeyValuePatternProperty", function ([key, value]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "KeyValuePatternProperty", span }, span), createAstProp("key", key, span), createAstProp("value", value, span)]
  } as ObjectExpression
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Pattern) => import(\"@swc/core\").KeyValuePatternProperty").proxy(createKeyValuePatternProperty)

export const $AssignmentPatternProperty = createExprMacro("$AssignmentPatternProperty", function ([key, value, span]) {
  return createAst("AssignmentPatternProperty", { key, value, span }, this.span())
}, "(key: import(\"@swc/core\").Identifier, value?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").AssignmentPatternProperty").proxy(createAssignmentPatternProperty)

export const $KeyValueProperty = createExprMacro("$KeyValueProperty", function ([key, value]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "KeyValueProperty", span }, span), createAstProp("key", key, span), createAstProp("value", value, span)]
  } as ObjectExpression
}, "(key: import(\"@swc/core\").PropertyName, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").KeyValueProperty").proxy(createKeyValueProperty)

export const $AssignmentProperty = createExprMacro("$AssignmentProperty", function ([key, value]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "AssignmentProperty", span }, span), createAstProp("key", key, span), createAstProp("value", value, span)]
  } as ObjectExpression
}, "(key: import(\"@swc/core\").Identifier, value: import(\"@swc/core\").Expression) => import(\"@swc/core\").AssignmentProperty").proxy(createAssignmentProperty)

export const $GetterProperty = createExprMacro("$GetterProperty", function ([key, body, typeAnnotation, span]) {
  return createAst("GetterProperty", { key, body, typeAnnotation, span }, this.span())
}, "(key: import(\"@swc/core\").PropertyName, body?: import(\"@swc/core\").BlockStatement, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").GetterProperty").proxy(createGetterProperty)

export const $SetterProperty = createExprMacro("$SetterProperty", function ([key, param, body, span]) {
  return createAst("SetterProperty", { key, param, body, span }, this.span())
}, "(key: import(\"@swc/core\").PropertyName, param: import(\"@swc/core\").Pattern, body?: import(\"@swc/core\").BlockStatement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SetterProperty").proxy(createSetterProperty)

export const $MethodProperty = createExprMacro("$MethodProperty", function ([key, params, body, async, generator, decorators, typeParameters, returnType, span]) {
  return createAst("MethodProperty", { key, params, body, async: optional(async, false), generator: optional(generator, false), decorators, typeParameters, returnType, span }, this.span())
}, "(key: import(\"@swc/core\").PropertyName, params: import(\"@swc/core\").Param[], body?: import(\"@swc/core\").BlockStatement, async?: boolean, generator?: boolean, decorators?: import(\"@swc/core\").Decorator[], typeParameters?: import(\"@swc/core\").TsTypeParameterDeclaration, returnType?: import(\"@swc/core\").TsTypeAnnotation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").MethodProperty").proxy(createMethodProperty)

export const $Computed = createExprMacro("$Computed", function ([expression, span]) {
  return createAst("Computed", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ComputedPropName").proxy(createComputed)

export const $ComputedPropName = createExprMacro("$ComputedPropName", function ([expression, span]) {
  return createAst("Computed", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ComputedPropName").proxy(createComputedPropName)

export const $BlockStatement = createExprMacro("$BlockStatement", function ([stmts, span]) {
  return createAst("BlockStatement", { stmts: optional(stmts, []), span }, this.span())
}, "(stmts: import(\"@swc/core\").Statement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BlockStatement").proxy(createBlockStatement)

export const $ExpressionStatement = createExprMacro("$ExpressionStatement", function ([expression, span]) {
  return createAst("ExpressionStatement", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ExpressionStatement").proxy(createExpressionStatement)

export const $EmptyStatement = createExprMacro("$EmptyStatement", function ([span]) {
  return createAst("EmptyStatement", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").EmptyStatement").proxy(createEmptyStatement)

export const $DebuggerStatement = createExprMacro("$DebuggerStatement", function ([span]) {
  return createAst("DebuggerStatement", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").DebuggerStatement").proxy(createDebuggerStatement)

export const $WithStatement = createExprMacro("$WithStatement", function ([object, body, span]) {
  return createAst("WithStatement", { object, body, span }, this.span())
}, "(object: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").WithStatement").proxy(createWithStatement)

export const $ReturnStatement = createExprMacro("$ReturnStatement", function ([argument, span]) {
  return createAst("ReturnStatement", { argument, span }, this.span())
}, "(argument?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ReturnStatement").proxy(createReturnStatement)

export const $LabeledStatement = createExprMacro("$LabeledStatement", function ([label, body, span]) {
  return createAst("LabeledStatement", { label, body, span }, this.span())
}, "(label: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").LabeledStatement").proxy(createLabeledStatement)

export const $BreakStatement = createExprMacro("$BreakStatement", function ([label, span]) {
  return createAst("BreakStatement", { label, span }, this.span())
}, "(label?: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").BreakStatement").proxy(createBreakStatement)

export const $ContinueStatement = createExprMacro("$ContinueStatement", function ([label, span]) {
  return createAst("ContinueStatement", { label, span }, this.span())
}, "(label?: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ContinueStatement").proxy(createContinueStatement)

export const $IfStatement = createExprMacro("$IfStatement", function ([test, consequent, alternate, span]) {
  return createAst("IfStatement", { test, consequent, alternate, span }, this.span())
}, "(test: import(\"@swc/core\").Expression, consequent: import(\"@swc/core\").Statement, alternate?: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").IfStatement").proxy(createIfStatement)

export const $SwitchStatement = createExprMacro("$SwitchStatement", function ([discriminant, cases, span]) {
  return createAst("SwitchStatement", { discriminant, cases: optional(cases, []), span }, this.span())
}, "(discriminant: import(\"@swc/core\").Expression, cases?: import(\"@swc/core\").SwitchCase[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SwitchStatement").proxy(createSwitchStatement)

export const $ThrowStatement = createExprMacro("$ThrowStatement", function ([argument, span]) {
  return createAst("ThrowStatement", { argument, span }, this.span())
}, "(argument: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ThrowStatement").proxy(createThrowStatement)

export const $TryStatement = createExprMacro("$TryStatement", function ([block, handler, finalizer, span]) {
  return createAst("TryStatement", { block, handler, finalizer, span }, this.span())
}, "(block: import(\"@swc/core\").BlockStatement, handler?: import(\"@swc/core\").CatchClause, finalizer?: import(\"@swc/core\").BlockStatement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TryStatement").proxy(createTryStatement)

export const $WhileStatement = createExprMacro("$WhileStatement", function ([test, body, span]) {
  return createAst("WhileStatement", { test, body, span }, this.span())
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").WhileStatement").proxy(createWhileStatement)

export const $DoWhileStatement = createExprMacro("$DoWhileStatement", function ([test, body, span]) {
  return createAst("DoWhileStatement", { test, body, span }, this.span())
}, "(test: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").DoWhileStatement").proxy(createDoWhileStatement)

export const $ForStatement = createExprMacro("$ForStatement", function ([body, init, test, update, span]) {
  return createAst("ForStatement", { body, init, test, update, span }, this.span())
}, "(body: import(\"@swc/core\").Statement, init?: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Expression, test?: import(\"@swc/core\").Expression, update?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForStatement").proxy(createForStatement)

export const $ForInStatement = createExprMacro("$ForInStatement", function ([left, right, body, span]) {
  return createAst("ForInStatement", { left, right, body, span }, this.span())
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForInStatement").proxy(createForInStatement)

export const $ForOfStatement = createExprMacro("$ForOfStatement", function ([left, right, body, _await, span]) {
  return createAst("ForOfStatement", { left, right, body, await: _await, span }, this.span())
}, "(left: import(\"@swc/core\").VariableDeclaration | import(\"@swc/core\").Pattern, right: import(\"@swc/core\").Expression, body: import(\"@swc/core\").Statement, _await?: import(\"@swc/core\").Span, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").ForOfStatement").proxy(createForOfStatement)

export const $SwitchCase = createExprMacro("$SwitchCase", function ([test, consequent, span]) {
  return createAst("SwitchCase", { test, consequent: optional(consequent, []), span }, this.span())
}, "(test?: import(\"@swc/core\").Expression, consequent?: import(\"@swc/core\").Statement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").SwitchCase").proxy(createSwitchCase)

export const $CatchClause = createExprMacro("$CatchClause", function ([body, param, span]) {
  return createAst("CatchClause", { body, param, span }, this.span())
}, "(body: import(\"@swc/core\").BlockStatement, param?: import(\"@swc/core\").Pattern, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").CatchClause").proxy(createCatchClause)

export const $TsTypeAnnotation = createExprMacro("$TsTypeAnnotation", function ([typeAnnotation, span]) {
  return createAst("TsTypeAnnotation", { typeAnnotation, span }, this.span())
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeAnnotation").proxy(createTsTypeAnnotation)

export const $TsTypeParameterDeclaration = createExprMacro("$TsTypeParameterDeclaration", function ([parameters, span]) {
  return createAst("TsTypeParameterDeclaration", { parameters: optional(parameters, []), span }, this.span())
}, "(parameters?: import(\"@swc/core\").TsTypeParameter[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeParameterDeclaration").proxy(createTsTypeParameterDeclaration)

export const $TsTypeParameter = createExprMacro("$TsTypeParameter", function ([name, _in, _out, constraint, _default, span]) {
  return createAst("TsTypeParameter", { name, in: _in, out: _out, constraint, default: _default, span }, this.span())
}, "(name: import(\"@swc/core\").Identifier, _in: boolean, _out: boolean, constraint?: import(\"@swc/core\").TsType, _default?: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeParameter").proxy(createTsTypeParameter)

export const $TsTypeParameterInstantiation = createExprMacro("$TsTypeParameterInstantiation", function ([params, span]) {
  return createAst("TsTypeParameterInstantiation", { params: optional(params, []), span }, this.span())
}, "(params?: import(\"@swc/core\").TsType[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeParameterInstantiation").proxy(createTsTypeParameterInstantiation)

export const $TsParameterProperty = createExprMacro("$TsParameterProperty", function ([param, accessibility, decorators, override, readonly, span]) {
  return createAst("TsParameterProperty", { param, accessibility, decorators, override: optional(override, false), readonly: optional(readonly, false), span }, this.span())
}, "(param: import(\"@swc/core\").TsParameterPropertyParameter, accessibility?: import(\"@swc/core\").Accessibility, decorators?: import(\"@swc/core\").Decorator[], override?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsParameterProperty").proxy(createTsParameterProperty)

export const $TsQualifiedName = createExprMacro("$TsQualifiedName", function ([left, right]) {
  const span = this.span()

  return {
    type: "ObjectExpression",
    span,
    properties: [createAstProp("type", { type: "StringLiteral", value: "TsQualifiedName", span }, span), createAstProp("left", left, span), createAstProp("right", right, span)]
  } as ObjectExpression
}, "(left: import(\"@swc/core\").TsEntityName, right: import(\"@swc/core\").Identifier) => import(\"@swc/core\").TsQualifiedName").proxy(createTsQualifiedName)

export const $TsCallSignatureDeclaration = createExprMacro("$TsCallSignatureDeclaration", function ([params, typeAnnotation, typeParams, span]) {
  return createAst("TsCallSignatureDeclaration", { params: optional(params, []), typeAnnotation, typeParams, span }, this.span())
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsCallSignatureDeclaration").proxy(createTsCallSignatureDeclaration)

export const $TsConstructSignatureDeclaration = createExprMacro("$TsConstructSignatureDeclaration", function ([params, typeAnnotation, typeParams, span]) {
  return createAst("TsConstructSignatureDeclaration", { params: optional(params, []), typeAnnotation, typeParams, span }, this.span())
}, "(params?: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConstructSignatureDeclaration").proxy(createTsConstructSignatureDeclaration)

export const $TsPropertySignature = createExprMacro("$TsPropertySignature", function ([key, params, init, typeAnnotation, typeParams, computed, isOptional, readonly, span]) {
  return createAst("TsPropertySignature", { key, params, init, typeAnnotation, typeParams, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span())
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], init?: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsPropertySignature").proxy(createTsPropertySignature)

export const $TsGetterSignature = createExprMacro("$TsGetterSignature", function ([key, typeAnnotation, computed, isOptional, readonly, span]) {
  return createAst("TsGetterSignature", { key, typeAnnotation, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span())
}, "(key: import(\"@swc/core\").Expression, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsGetterSignature").proxy(createTsGetterSignature)

export const $TsSetterSignature = createExprMacro("$TsSetterSignature", function ([key, param, computed, isOptional, readonly, span]) {
  return createAst("TsSetterSignature", { key, param, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span())
}, "(key: import(\"@swc/core\").Expression, param: import(\"@swc/core\").TsFnParameter, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsSetterSignature").proxy(createTsSetterSignature)

export const $TsMethodSignature = createExprMacro("$TsMethodSignature", function ([key, params, typeAnn, typeParams, computed, isOptional, readonly, span]) {
  return createAst("TsMethodSignature", { key, params, typeAnn, typeParams, computed: optional(computed, false), optional: optional(isOptional, false), readonly: optional(readonly, false), span }, this.span())
}, "(key: import(\"@swc/core\").Expression, params: import(\"@swc/core\").TsFnParameter[], typeAnn?: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, computed?: boolean, optional?: boolean, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsMethodSignature").proxy(createTsMethodSignature)

export const $TsIndexSignature = createExprMacro("$TsIndexSignature", function ([params, typeAnnotation, readonly, isStatic, span]) {
  return createAst("TsIndexSignature", { params, typeAnnotation, readonly: optional(readonly, false), static: optional(isStatic, false), span }, this.span())
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, readonly?: boolean, isStatic?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsIndexSignature").proxy(createTsIndexSignature)

export const $TsKeywordType = createExprMacro("$TsKeywordType", function ([kind, span]) {
  return createAst("TsKeywordType", { kind, span }, this.span())
}, "(kind: import(\"@swc/core\").TsKeywordTypeKind, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsKeywordType").proxy(createTsKeywordType)

export const $TsThisType = createExprMacro("$TsThisType", function ([span]) {
  return createAst("TsThisType", { span }, this.span())
}, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsThisType").proxy(createTsThisType)

export const $TsFunctionType = createExprMacro("$TsFunctionType", function ([params, typeAnnotation, typeParams, span]) {
  return createAst("TsFunctionType", { params, typeAnnotation, typeParams, span }, this.span())
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsFunctionType").proxy(createTsFunctionType)

export const $TsConstructorType = createExprMacro("$TsConstructorType", function ([params, typeAnnotation, typeParams, isAbstract, span]) {
  return createAst("TsConstructorType", { params, typeAnnotation, typeParams, isAbstract: optional(isAbstract, false), span }, this.span())
}, "(params: import(\"@swc/core\").TsFnParameter[], typeAnnotation: import(\"@swc/core\").TsTypeAnnotation, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, isAbstract?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConstructorType").proxy(createTsConstructorType)

export const $TsTypeReference = createExprMacro("$TsTypeReference", function ([typeName, typeParams, span]) {
  return createAst("TsTypeReference", { typeName, typeParams, span }, this.span())
}, "(typeName: import(\"@swc/core\").TsEntityName, typeParams?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeReference").proxy(createTsTypeReference)

export const $TsTypePredicate = createExprMacro("$TsTypePredicate", function ([paramName, typeAnnotation, asserts, span]) {
  return createAst("TsTypePredicate", { paramName, typeAnnotation, asserts: optional(asserts, false), span }, this.span())
}, "(paramName: import(\"@swc/core\").TsThisTypeOrIdent, typeAnnotation?: import(\"@swc/core\").TsTypeAnnotation, asserts?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypePredicate").proxy(createTsTypePredicate)

export const $TsImportType = createExprMacro("$TsImportType", function ([argument, qualifier, typeArguments, span]) {
  return createAst("TsImportType", { argument, qualifier, typeArguments, span }, this.span())
}, "(argument: stringLiteral, qualifier?: import(\"@swc/core\").TsEntityName, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsImportType").proxy(createTsImportType)

export const $TsTypeQuery = createExprMacro("$TsTypeQuery", function ([exprName, typeArguments, span]) {
  return createAst("TsTypeQuery", { exprName, typeArguments, span }, this.span())
}, "(exprName: import(\"@swc/core\").TsTypeQueryExpr, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeQuery").proxy(createTsTypeQuery)

export const $TsTypeLiteral = createExprMacro("$TsTypeLiteral", function ([members, span]) {
  return createAst("TsTypeLiteral", { members: optional(members, []), span }, this.span())
}, "(members?: import(\"@swc/core\").TsTypeElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeLiteral").proxy(createTsTypeLiteral)

export const $TsArrayType = createExprMacro("$TsArrayType", function ([elemType, span]) {
  return createAst("TsArrayType", { elemType, span }, this.span())
}, "(elemType: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsArrayType").proxy(createTsArrayType)

export const $TsTupleType = createExprMacro("$TsTupleType", function ([elemTypes, span]) {
  return createAst("TsTupleType", { elemTypes: optional(elemTypes, []), span }, this.span())
}, "(elemTypes?: import(\"@swc/core\").TsTupleElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTupleType").proxy(createTsTupleType)

export const $TsTupleElement = createExprMacro("$TsTupleElement", function ([ty, label, span]) {
  return createAst("TsTupleElement", { ty, label, span }, this.span())
}, "(ty: import(\"@swc/core\").TsType, label?: import(\"@swc/core\").Pattern, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTupleElement").proxy(createTsTupleElement)

export const $TsOptionalType = createExprMacro("$TsOptionalType", function ([typeAnnotation, span]) {
  return createAst("TsOptionalType", { typeAnnotation, span }, this.span())
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsOptionalType").proxy(createTsOptionalType)

export const $TsRestType = createExprMacro("$TsRestType", function ([typeAnnotation, span]) {
  return createAst("TsRestType", { typeAnnotation, span }, this.span())
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsRestType").proxy(createTsRestType)

export const $TsUnionType = createExprMacro("$TsUnionType", function ([types, span]) {
  return createAst("TsUnionType", { types, span }, this.span())
}, "(types: import(\"@swc/core\").TsType[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsUnionType").proxy(createTsUnionType)

export const $TsIntersectionType = createExprMacro("$TsIntersectionType", function ([types, span]) {
  return createAst("TsIntersectionType", { types, span }, this.span())
}, "(types: import(\"@swc/core\").TsType[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsIntersectionType").proxy(createTsIntersectionType)

export const $TsConditionalType = createExprMacro("$TsConditionalType", function ([checkType, extendsType, trueType, falseType, span]) {
  return createAst("TsConditionalType", { checkType, extendsType, trueType, falseType, span }, this.span())
}, "(checkType: import(\"@swc/core\").TsType, extendsType: import(\"@swc/core\").TsType, trueType: import(\"@swc/core\").TsType, falseType: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConditionalType").proxy(createTsConditionalType)

export const $TsInferType = createExprMacro("$TsInferType", function ([typeParam, span]) {
  return createAst("TsInferType", { typeParam, span }, this.span())
}, "(typeParam: import(\"@swc/core\").TsTypeParameter, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInferType").proxy(createTsInferType)

export const $TsParenthesizedType = createExprMacro("$TsParenthesizedType", function ([typeAnnotation, span]) {
  return createAst("TsParenthesizedType", { typeAnnotation, span }, this.span())
}, "(typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsParenthesizedType").proxy(createTsParenthesizedType)

export const $TsTypeOperator = createExprMacro("$TsTypeOperator", function ([op, typeAnnotation, span]) {
  return createAst("TsTypeOperator", { op, typeAnnotation, span }, this.span())
}, "(op: import(\"@swc/core\").TsTypeOperatorOp, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeOperator").proxy(createTsTypeOperator)

export const $TsIndexedAccessType = createExprMacro("$TsIndexedAccessType", function ([objectType, indexType, readonly, span]) {
  return createAst("TsIndexedAccessType", { objectType, indexType, readonly: optional(readonly, false), span }, this.span())
}, "(objectType: import(\"@swc/core\").TsType, indexType: import(\"@swc/core\").TsType, readonly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsIndexedAccessType").proxy(createTsIndexedAccessType)

export const $TsMappedType = createExprMacro("$TsMappedType", function ([typeParam, typeAnnotation, nameType, optional, readonly, span]) {
  return createAst("TsMappedType", { typeParam, typeAnnotation, nameType, optional, readonly, span }, this.span())
}, "(typeParam: import(\"@swc/core\").TsTypeParameter, typeAnnotation?: import(\"@swc/core\").TsType, nameType?: import(\"@swc/core\").TsType, optional?: import(\"@swc/core\").TruePlusMinus, readonly?: import(\"@swc/core\").TruePlusMinus, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsMappedType").proxy(createTsMappedType)

export const $TsLiteralType = createExprMacro("$TsLiteralType", function ([literal, span]) {
  return createAst("TsLiteralType", { literal, span }, this.span())
}, "(literal: import(\"@swc/core\").TsLiteral, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsLiteralType").proxy(createTsLiteralType)

export const $TsTemplateLiteralType = createExprMacro("$TsTemplateLiteralType", function ([types, quasis, span]) {
  return createAst("TsTemplateLiteralType", { types: optional(types, []), quasis: optional(quasis, []), span }, this.span())
}, "(types?: import(\"@swc/core\").TsType[], quasis?: import(\"@swc/core\").TemplateElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTemplateLiteralType").proxy(createTsTemplateLiteralType)

export const $TsInterfaceDeclaration = createExprMacro("$TsInterfaceDeclaration", function ([id, body, _extends, typeParams, declare, span]) {
  return createAst("TsInterfaceDeclaration", { id, body, extends: _extends, typeParams, declare: optional(declare, false), span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsInterfaceBody, _extends?: import(\"@swc/core\").TsExpressionWithTypeArguments[], typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInterfaceDeclaration").proxy(createTsInterfaceDeclaration)

export const $TsInterfaceBody = createExprMacro("$TsInterfaceBody", function ([body, span]) {
  return createAst("TsInterfaceBody", { body: optional(body, []), span }, this.span())
}, "(body?: import(\"@swc/core\").TsTypeElement[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInterfaceBody").proxy(createTsInterfaceBody)

export const $TsExpressionWithTypeArguments = createExprMacro("$TsExpressionWithTypeArguments", function ([expression, typeArguments, span]) {
  return createAst("TsExpressionWithTypeArguments", { expression, typeArguments, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, typeArguments?: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsExpressionWithTypeArguments").proxy(createTsExpressionWithTypeArguments)

export const $TsTypeAliasDeclaration = createExprMacro("$TsTypeAliasDeclaration", function ([id, typeAnnotation, typeParams, declare, span]) {
  return createAst("TsTypeAliasDeclaration", { id, typeAnnotation, typeParams, declare: optional(declare, false), span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, typeAnnotation: import(\"@swc/core\").TsType, typeParams?: import(\"@swc/core\").TsTypeParameterDeclaration, declare?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeAliasDeclaration").proxy(createTsTypeAliasDeclaration)

export const $TsEnumDeclaration = createExprMacro("$TsEnumDeclaration", function ([id, members, declare, isConst, span]) {
  return createAst("TsEnumDeclaration", { id, declare: optional(declare, false), isConst: optional(isConst, false), members: optional(members, []), span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, members?: import(\"@swc/core\").TsEnumMember[], declare?: boolean, isConst?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsEnumDeclaration").proxy(createTsEnumDeclaration)

export const $TsEnumMember = createExprMacro("$TsEnumMember", function ([id, init, span]) {
  return createAst("TsEnumMember", { id, init, span }, this.span())
}, "(id: import(\"@swc/core\").TsEnumMemberId, init?: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsEnumMember").proxy(createTsEnumMember)

export const $TsModuleDeclaration = createExprMacro("$TsModuleDeclaration", function ([id, body, declare, global, span]) {
  return createAst("TsModuleDeclaration", { id, body, declare: optional(declare, false), global: optional(global, false), span }, this.span())
}, "(id: import(\"@swc/core\").TsModuleName, body?: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsModuleDeclaration").proxy(createTsModuleDeclaration)

export const $TsModuleBlock = createExprMacro("$TsModuleBlock", function ([body, span]) {
  return createAst("TsModuleBlock", { body, span }, this.span())
}, "(body: import(\"@swc/core\").ModuleItem[], span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsModuleBlock").proxy(createTsModuleBlock)

export const $TsNamespaceDeclaration = createExprMacro("$TsNamespaceDeclaration", function ([id, body, declare, global, span]) {
  return createAst("TsNamespaceDeclaration", { id, body, declare: optional(declare, false), global: optional(global, false), span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, body: import(\"@swc/core\").TsNamespaceBody, declare?: boolean, global?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsNamespaceDeclaration").proxy(createTsNamespaceDeclaration)

export const $TsImportEqualsDeclaration = createExprMacro("$TsImportEqualsDeclaration", function ([id, moduleRef, declare, isExport, isTypeOnly, span]) {
  return createAst("TsImportEqualsDeclaration", { id, moduleRef, declare: optional(declare, false), isExport: optional(isExport, false), isTypeOnly: optional(isTypeOnly, false), span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, moduleRef: import(\"@swc/core\").TsModuleReference, declare?: boolean, isExport?: boolean, isTypeOnly?: boolean, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsImportEqualsDeclaration").proxy(createTsImportEqualsDeclaration)

export const $TsExternalModuleReference = createExprMacro("$TsExternalModuleReference", function ([expression, span]) {
  return createAst("TsExternalModuleReference", { expression, span }, this.span())
}, "(expression: stringLiteral, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsExternalModuleReference").proxy(createTsExternalModuleReference)

export const $TsExportAssignment = createExprMacro("$TsExportAssignment", function ([expression, span]) {
  return createAst("TsExportAssignment", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsExportAssignment").proxy(createTsExportAssignment)

export const $TsNamespaceExportDeclaration = createExprMacro("$TsNamespaceExportDeclaration", function ([id, span]) {
  return createAst("TsNamespaceExportDeclaration", { id, span }, this.span())
}, "(id: import(\"@swc/core\").Identifier, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsNamespaceExportDeclaration").proxy(createTsNamespaceExportDeclaration)

export const $TsAsExpression = createExprMacro("$TsAsExpression", function ([expression, typeAnnotation, span]) {
  return createAst("TsAsExpression", { expression, typeAnnotation, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsAsExpression").proxy(createTsAsExpression)

export const $TsSatisfiesExpression = createExprMacro("$TsSatisfiesExpression", function ([expression, typeAnnotation, span]) {
  return createAst("TsSatisfiesExpression", { expression, typeAnnotation, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsSatisfiesExpression").proxy(createTsSatisfiesExpression)

export const $TsInstantiation = createExprMacro("$TsInstantiation", function ([expression, typeArguments, span]) {
  return createAst("TsInstantiation", { expression, typeArguments, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, typeArguments: import(\"@swc/core\").TsTypeParameterInstantiation, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsInstantiation").proxy(createTsInstantiation)

export const $TsTypeAssertion = createExprMacro("$TsTypeAssertion", function ([expression, typeAnnotation, span]) {
  return createAst("TsTypeAssertion", { expression, typeAnnotation, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, typeAnnotation: import(\"@swc/core\").TsType, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsTypeAssertion").proxy(createTsTypeAssertion)

export const $TsConstAssertion = createExprMacro("$TsConstAssertion", function ([expression, span]) {
  return createAst("TsConstAssertion", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsConstAssertion").proxy(createTsConstAssertion)

export const $TsNonNullExpression = createExprMacro("$TsNonNullExpression", function ([expression, span]) {
  return createAst("TsNonNullExpression", { expression, span }, this.span())
}, "(expression: import(\"@swc/core\").Expression, span?: import(\"@swc/core\").Span) => import(\"@swc/core\").TsNonNullExpression").proxy(createTsNonNullExpression)

export const $Invalid = createExprMacro("$Invalid", function ([span]) { return createAst("Invalid", { span }, this.span()) }, "(span?: import(\"@swc/core\").Span) => import(\"@swc/core\").Invalid").proxy(createInvalid)
