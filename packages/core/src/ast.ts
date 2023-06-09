import type { ArrayExpression, ArrayPattern, ArrowFunctionExpression, AssignmentExpression, AssignmentPattern, AssignmentPatternProperty, AssignmentProperty, AwaitExpression, BigIntLiteral, BinaryExpression, BlockStatement, BooleanLiteral, BreakStatement, CallExpression, CatchClause, ClassDeclaration, ClassExpression, ClassMethod, ClassProperty, ComputedPropName, ConditionalExpression, Constructor, ContinueStatement, DebuggerStatement, Decorator, DoWhileStatement, EmptyStatement, ExportAllDeclaration, ExportDeclaration, ExportDefaultDeclaration, ExportDefaultExpression, ExportDefaultSpecifier, ExportNamedDeclaration, ExportNamespaceSpecifier, ExpressionStatement, ForInStatement, ForOfStatement, ForStatement, FunctionDeclaration, FunctionExpression, GetterProperty, Identifier, IfStatement, Import, ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, Invalid, JSXAttribute, JSXClosingElement, JSXClosingFragment, JSXElement, JSXEmptyExpression, JSXExpressionContainer, JSXFragment, JSXMemberExpression, JSXNamespacedName, JSXOpeningElement, JSXOpeningFragment, JSXSpreadChild, JSXText, KeyValuePatternProperty, KeyValueProperty, LabeledStatement, MemberExpression, MetaProperty, MethodProperty, Module, NamedExportSpecifier, NamedImportSpecifier, NewExpression, NullLiteral, NumericLiteral, ObjectExpression, ObjectPattern, OptionalChainingCall, OptionalChainingExpression, Param, ParenthesisExpression, PrivateMethod, PrivateName, PrivateProperty, RegExpLiteral, RestElement, ReturnStatement, Script, SequenceExpression, SetterProperty, SpreadElement, StaticBlock, StringLiteral, Super, SuperPropExpression, SwitchCase, SwitchStatement, TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, ThrowStatement, TryStatement, TsArrayType, TsAsExpression, TsCallSignatureDeclaration, TsConditionalType, TsConstAssertion, TsConstructSignatureDeclaration, TsConstructorType, TsEnumDeclaration, TsEnumMember, TsExportAssignment, TsExpressionWithTypeArguments, TsExternalModuleReference, TsFunctionType, TsGetterSignature, TsImportEqualsDeclaration, TsImportType, TsIndexSignature, TsIndexedAccessType, TsInferType, TsInstantiation, TsInterfaceBody, TsInterfaceDeclaration, TsIntersectionType, TsKeywordType, TsLiteralType, TsMappedType, TsMethodSignature, TsModuleBlock, TsModuleDeclaration, TsNamespaceDeclaration, TsNamespaceExportDeclaration, TsNonNullExpression, TsOptionalType, TsParameterProperty, TsParenthesizedType, TsPropertySignature, TsQualifiedName, TsRestType, TsSetterSignature, TsTemplateLiteralType, TsThisType, TsTupleElement, TsTupleType, TsTypeAliasDeclaration, TsTypeAnnotation, TsTypeAssertion, TsTypeLiteral, TsTypeOperator, TsTypeParameter, TsTypeParameterDeclaration, TsTypeParameterInstantiation, TsTypePredicate, TsTypeQuery, TsTypeReference, TsUnionType, UnaryExpression, UpdateExpression, VariableDeclaration, VariableDeclarator, WhileStatement, WithStatement, YieldExpression } from "@swc/core"

export interface AST {
 "Identifier": Identifier
 "StringLiteral": StringLiteral
 "NumericLiteral": NumericLiteral
 "BigIntLiteral": BigIntLiteral
 "BooleanLiteral": BooleanLiteral
 "NullLiteral": NullLiteral
 "RegExpLiteral": RegExpLiteral
//  "Argument": Argument
 "CallExpression": CallExpression
 "ClassProperty": ClassProperty
 "PrivateProperty": PrivateProperty
 "Param": Param
 "Constructor": Constructor
 "ClassMethod": ClassMethod
 "PrivateMethod": PrivateMethod
 "StaticBlock": StaticBlock
 "Decorator": Decorator
 "FunctionDeclaration": FunctionDeclaration
 "ClassDeclaration": ClassDeclaration
 "VariableDeclaration": VariableDeclaration
 "VariableDeclarator": VariableDeclarator
 "OptionalChainingExpression": OptionalChainingExpression
 "OptionalChainingCall": OptionalChainingCall
 "ThisExpression": ThisExpression
 "ArrayExpression": ArrayExpression
//  "ExprOrSpread": ExprOrSpread
 "ObjectExpression": ObjectExpression
 "SpreadElement": SpreadElement
 "UnaryExpression": UnaryExpression
 "UpdateExpression": UpdateExpression
 "BinaryExpression": BinaryExpression
 "FunctionExpression": FunctionExpression
 "ClassExpression": ClassExpression
 "AssignmentExpression": AssignmentExpression
 "MemberExpression": MemberExpression
 "SuperPropExpression": SuperPropExpression
 "ConditionalExpression": ConditionalExpression
 "Super": Super
 "Import": Import
 "NewExpression": NewExpression
 "SequenceExpression": SequenceExpression
 "ArrowFunctionExpression": ArrowFunctionExpression
 "YieldExpression": YieldExpression
 "MetaProperty": MetaProperty
 "AwaitExpression": AwaitExpression
 "TemplateLiteral": TemplateLiteral
 "TaggedTemplateExpression": TaggedTemplateExpression
 "TemplateElement": TemplateElement
 "ParenthesisExpression": ParenthesisExpression
 "PrivateName": PrivateName
 "JSXMemberExpression": JSXMemberExpression
 "JSXNamespacedName": JSXNamespacedName
 "JSXEmptyExpression": JSXEmptyExpression
 "JSXExpressionContainer": JSXExpressionContainer
 "JSXSpreadChild": JSXSpreadChild
 "JSXOpeningElement": JSXOpeningElement
 "JSXClosingElement": JSXClosingElement
 "JSXAttribute": JSXAttribute
 "JSXText": JSXText
 "JSXElement": JSXElement
 "JSXFragment": JSXFragment
 "JSXOpeningFragment": JSXOpeningFragment
 "JSXClosingFragment": JSXClosingFragment
 "ExportDefaultExpression": ExportDefaultExpression
 "ExportDeclaration": ExportDeclaration
 "ImportDeclaration": ImportDeclaration
 "ExportAllDeclaration": ExportAllDeclaration
 "ExportNamedDeclaration": ExportNamedDeclaration
 "ExportDefaultDeclaration": ExportDefaultDeclaration
 "ImportDefaultSpecifier": ImportDefaultSpecifier
 "ImportNamespaceSpecifier": ImportNamespaceSpecifier
 "NamedImportSpecifier": NamedImportSpecifier
 "ExportNamespaceSpecifier": ExportNamespaceSpecifier
 "ExportDefaultSpecifier": ExportDefaultSpecifier
 "NamedExportSpecifier": NamedExportSpecifier
 "Module": Module
 "Script": Script
 "ArrayPattern": ArrayPattern
 "ObjectPattern": ObjectPattern
 "AssignmentPattern": AssignmentPattern
 "RestElement": RestElement
 "KeyValuePatternProperty": KeyValuePatternProperty
 "AssignmentPatternProperty": AssignmentPatternProperty
 "KeyValueProperty": KeyValueProperty
 "AssignmentProperty": AssignmentProperty
 "GetterProperty": GetterProperty
 "SetterProperty": SetterProperty
 "MethodProperty": MethodProperty
 "ComputedPropName": ComputedPropName
 "BlockStatement": BlockStatement
 "ExpressionStatement": ExpressionStatement
 "EmptyStatement": EmptyStatement
 "DebuggerStatement": DebuggerStatement
 "WithStatement": WithStatement
 "ReturnStatement": ReturnStatement
 "LabeledStatement": LabeledStatement
 "BreakStatement": BreakStatement
 "ContinueStatement": ContinueStatement
 "IfStatement": IfStatement
 "SwitchStatement": SwitchStatement
 "ThrowStatement": ThrowStatement
 "TryStatement": TryStatement
 "WhileStatement": WhileStatement
 "DoWhileStatement": DoWhileStatement
 "ForStatement": ForStatement
 "ForInStatement": ForInStatement
 "ForOfStatement": ForOfStatement
 "SwitchCase": SwitchCase
 "CatchClause": CatchClause
 "TsTypeAnnotation": TsTypeAnnotation
 "TsTypeParameterDeclaration": TsTypeParameterDeclaration
 "TsTypeParameter": TsTypeParameter
 "TsTypeParameterInstantiation": TsTypeParameterInstantiation
 "TsParameterProperty": TsParameterProperty
 "TsQualifiedName": TsQualifiedName
 "TsCallSignatureDeclaration": TsCallSignatureDeclaration
 "TsConstructSignatureDeclaration": TsConstructSignatureDeclaration
 "TsPropertySignature": TsPropertySignature
 "TsGetterSignature": TsGetterSignature
 "TsSetterSignature": TsSetterSignature
 "TsMethodSignature": TsMethodSignature
 "TsIndexSignature": TsIndexSignature
 "TsKeywordType": TsKeywordType
 "TsThisType": TsThisType
 "TsFunctionType": TsFunctionType
 "TsConstructorType": TsConstructorType
 "TsTypeReference": TsTypeReference
 "TsTypePredicate": TsTypePredicate
 "TsImportType": TsImportType
 "TsTypeQuery": TsTypeQuery
 "TsTypeLiteral": TsTypeLiteral
 "TsArrayType": TsArrayType
 "TsTupleType": TsTupleType
 "TsTupleElement": TsTupleElement
 "TsOptionalType": TsOptionalType
 "TsRestType": TsRestType
 "TsUnionType": TsUnionType
 "TsIntersectionType": TsIntersectionType
 "TsConditionalType": TsConditionalType
 "TsInferType": TsInferType
 "TsParenthesizedType": TsParenthesizedType
 "TsTypeOperator": TsTypeOperator
 "TsIndexedAccessType": TsIndexedAccessType
 "TsMappedType": TsMappedType
 "TsLiteralType": TsLiteralType
 "TsTemplateLiteralType": TsTemplateLiteralType
 "TsInterfaceDeclaration": TsInterfaceDeclaration
 "TsInterfaceBody": TsInterfaceBody
 "TsExpressionWithTypeArguments": TsExpressionWithTypeArguments
 "TsTypeAliasDeclaration": TsTypeAliasDeclaration
 "TsEnumDeclaration": TsEnumDeclaration
 "TsEnumMember": TsEnumMember
 "TsModuleDeclaration": TsModuleDeclaration
 "TsModuleBlock": TsModuleBlock
 "TsNamespaceDeclaration": TsNamespaceDeclaration
 "TsImportEqualsDeclaration": TsImportEqualsDeclaration
 "TsExternalModuleReference": TsExternalModuleReference
 "TsExportAssignment": TsExportAssignment
 "TsNamespaceExportDeclaration": TsNamespaceExportDeclaration
 "TsAsExpression": TsAsExpression
//  "TsSatisfiesExpression": TsSatisfiesExpression
 "TsInstantiation": TsInstantiation
 "TsTypeAssertion": TsTypeAssertion
 "TsConstAssertion": TsConstAssertion
 "TsNonNullExpression": TsNonNullExpression
 "Invalid": Invalid
}
