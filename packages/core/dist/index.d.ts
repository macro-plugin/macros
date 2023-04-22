import { Node as Node$1, Declaration as Declaration$1, Expression as Expression$1, CatchClause as CatchClause$1, ClassDeclaration as ClassDeclaration$1, ImportDeclaration as ImportDeclaration$1, Param as Param$1, ClassMethod as ClassMethod$1, PrivateMethod as PrivateMethod$1, Statement as Statement$1, VariableDeclarator as VariableDeclarator$1, ModuleItem as ModuleItem$1, TsType as TsType$1, ParseOptions, Options, Program as Program$1, ExportNamedDeclaration as ExportNamedDeclaration$1, TsModuleDeclaration as TsModuleDeclaration$1, TsFunctionType as TsFunctionType$1, FunctionDeclaration as FunctionDeclaration$1, FunctionExpression as FunctionExpression$1, ArrowFunctionExpression as ArrowFunctionExpression$1, VariableDeclaration as VariableDeclaration$1, TsTypeReference as TsTypeReference$1, ImportSpecifier as ImportSpecifier$1, ImportDefaultSpecifier as ImportDefaultSpecifier$1, ExportSpecifier as ExportSpecifier$1, ExportNamespaceSpecifier as ExportNamespaceSpecifier$1 } from '@swc/core';
export { Node, parseSync as parse, parse as parseAsync } from '@swc/core';

interface Span {
    start: number;
    end: number;
    ctxt: number;
}
interface Node {
    type: string;
}
interface HasSpan {
    span: Span;
}
interface HasDecorator {
    decorators?: Decorator[];
}
interface Class extends HasSpan, HasDecorator {
    body: ClassMember[];
    superClass?: Expression;
    isAbstract: boolean;
    typeParams?: TsTypeParameterDeclaration;
    superTypeParams?: TsTypeParameterInstantiation;
    implements: TsExpressionWithTypeArguments[];
}
type ClassMember = Constructor | ClassMethod | PrivateMethod | ClassProperty | PrivateProperty | TsIndexSignature | EmptyStatement | StaticBlock;
interface ClassPropertyBase extends Node, HasSpan, HasDecorator {
    value?: Expression;
    typeAnnotation?: TsTypeAnnotation;
    isStatic: boolean;
    accessibility?: Accessibility;
    isOptional: boolean;
    isOverride: boolean;
    readonly: boolean;
    definite: boolean;
}
interface ClassProperty extends ClassPropertyBase {
    type: "ClassProperty";
    key: PropertyName;
    isAbstract: boolean;
    declare: boolean;
}
interface PrivateProperty extends ClassPropertyBase {
    type: "PrivateProperty";
    key: PrivateName;
}
interface Param extends Node, HasSpan, HasDecorator {
    type: "Parameter";
    pat: Pattern;
}
interface Constructor extends Node, HasSpan {
    type: "Constructor";
    key: PropertyName;
    params: (TsParameterProperty | Param)[];
    body?: BlockStatement;
    accessibility?: Accessibility;
    isOptional: boolean;
}
interface ClassMethodBase extends Node, HasSpan {
    function: Fn;
    kind: MethodKind;
    isStatic: boolean;
    accessibility?: Accessibility;
    isAbstract: boolean;
    isOptional: boolean;
    isOverride: boolean;
}
interface ClassMethod extends ClassMethodBase {
    type: "ClassMethod";
    key: PropertyName;
}
interface PrivateMethod extends ClassMethodBase {
    type: "PrivateMethod";
    key: PrivateName;
}
interface StaticBlock extends Node, HasSpan {
    type: "StaticBlock";
    body: BlockStatement;
}
interface Decorator extends Node, HasSpan {
    type: "Decorator";
    expression: Expression;
}
type MethodKind = "method" | "getter" | "setter";
type Declaration = ClassDeclaration | FunctionDeclaration | VariableDeclaration | TsInterfaceDeclaration | TsTypeAliasDeclaration | TsEnumDeclaration | TsModuleDeclaration;
interface FunctionDeclaration extends Fn {
    type: "FunctionDeclaration";
    identifier: Identifier;
    declare: boolean;
}
interface ClassDeclaration extends Class, Node {
    type: "ClassDeclaration";
    identifier: Identifier;
    declare: boolean;
}
interface VariableDeclaration extends Node, HasSpan {
    type: "VariableDeclaration";
    kind: VariableDeclarationKind;
    declare: boolean;
    declarations: VariableDeclarator[];
}
type VariableDeclarationKind = "var" | "let" | "const";
interface VariableDeclarator extends Node, HasSpan {
    type: "VariableDeclarator";
    id: Pattern;
    init?: Expression;
    definite: boolean;
}
type Expression = ThisExpression | ArrayExpression | ObjectExpression | FunctionExpression | UnaryExpression | UpdateExpression | BinaryExpression | AssignmentExpression | MemberExpression | SuperPropExpression | ConditionalExpression | CallExpression | NewExpression | SequenceExpression | Identifier | Literal | TemplateLiteral | TaggedTemplateExpression | ArrowFunctionExpression | ClassExpression | YieldExpression | MetaProperty | AwaitExpression | ParenthesisExpression | JSXMemberExpression | JSXNamespacedName | JSXEmptyExpression | JSXElement | JSXFragment | TsTypeAssertion | TsConstAssertion | TsNonNullExpression | TsAsExpression | TsInstantiation | PrivateName | OptionalChainingExpression | Invalid;
interface ExpressionBase extends Node, HasSpan {
}
interface Identifier extends ExpressionBase {
    type: "Identifier";
    value: string;
    optional: boolean;
}
interface OptionalChainingExpression extends ExpressionBase {
    type: "OptionalChainingExpression";
    questionDotToken: Span;
    /**
     * Call expression or member expression.
     */
    base: MemberExpression | OptionalChainingCall;
}
interface OptionalChainingCall extends ExpressionBase {
    type: "CallExpression";
    callee: Expression;
    arguments: ExprOrSpread[];
    typeArguments?: TsTypeParameterInstantiation;
}
interface ThisExpression extends ExpressionBase {
    type: "ThisExpression";
}
interface ArrayExpression extends ExpressionBase {
    type: "ArrayExpression";
    elements: (ExprOrSpread | undefined)[];
}
interface ExprOrSpread {
    spread?: Span;
    expression: Expression;
}
interface ObjectExpression extends ExpressionBase {
    type: "ObjectExpression";
    properties: (SpreadElement | Property)[];
}
interface Argument {
    spread?: Span;
    expression: Expression;
}
interface SpreadElement extends Node {
    type: "SpreadElement";
    spread: Span;
    arguments: Expression;
}
interface UnaryExpression extends ExpressionBase {
    type: "UnaryExpression";
    operator: UnaryOperator;
    argument: Expression;
}
interface UpdateExpression extends ExpressionBase {
    type: "UpdateExpression";
    operator: UpdateOperator;
    prefix: boolean;
    argument: Expression;
}
interface BinaryExpression extends ExpressionBase {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}
interface FunctionExpression extends Fn, ExpressionBase {
    type: "FunctionExpression";
    identifier?: Identifier;
}
interface ClassExpression extends Class, ExpressionBase {
    type: "ClassExpression";
    identifier?: Identifier;
}
interface AssignmentExpression extends ExpressionBase {
    type: "AssignmentExpression";
    operator: AssignmentOperator;
    left: Expression | Pattern;
    right: Expression;
}
interface MemberExpression extends ExpressionBase {
    type: "MemberExpression";
    object: Expression;
    property: Identifier | PrivateName | ComputedPropName;
}
interface SuperPropExpression extends ExpressionBase {
    type: "SuperPropExpression";
    obj: Super;
    property: Identifier | ComputedPropName;
}
interface ConditionalExpression extends ExpressionBase {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
}
interface Super extends Node, HasSpan {
    type: "Super";
}
interface Import extends Node, HasSpan {
    type: "Import";
}
interface CallExpression extends ExpressionBase {
    type: "CallExpression";
    callee: Super | Import | Expression;
    arguments: Argument[];
    typeArguments?: TsTypeParameterInstantiation;
}
interface NewExpression extends ExpressionBase {
    type: "NewExpression";
    callee: Expression;
    arguments?: Argument[];
    typeArguments?: TsTypeParameterInstantiation;
}
interface SequenceExpression extends ExpressionBase {
    type: "SequenceExpression";
    expressions: Expression[];
}
interface ArrowFunctionExpression extends ExpressionBase {
    type: "ArrowFunctionExpression";
    params: Pattern[];
    body: BlockStatement | Expression;
    async: boolean;
    generator: boolean;
    typeParameters?: TsTypeParameterDeclaration;
    returnType?: TsTypeAnnotation;
}
interface YieldExpression extends ExpressionBase {
    type: "YieldExpression";
    argument?: Expression;
    delegate: boolean;
}
interface MetaProperty extends Node, HasSpan {
    type: "MetaProperty";
    kind: "new.target" | "import.meta";
}
interface AwaitExpression extends ExpressionBase {
    type: "AwaitExpression";
    argument: Expression;
}
interface TemplateLiteral extends ExpressionBase {
    type: "TemplateLiteral";
    expressions: Expression[];
    quasis: TemplateElement[];
}
interface TaggedTemplateExpression extends ExpressionBase {
    type: "TaggedTemplateExpression";
    tag: Expression;
    typeParameters?: TsTypeParameterInstantiation;
    template: TemplateLiteral;
}
interface TemplateElement extends ExpressionBase {
    type: "TemplateElement";
    tail: boolean;
    cooked?: string;
    raw: string;
}
interface ParenthesisExpression extends ExpressionBase {
    type: "ParenthesisExpression";
    expression: Expression;
}
interface Fn extends HasSpan, HasDecorator {
    params: Param[];
    body?: BlockStatement;
    generator: boolean;
    async: boolean;
    typeParameters?: TsTypeParameterDeclaration;
    returnType?: TsTypeAnnotation;
}
interface PatternBase extends Node, HasSpan {
    typeAnnotation?: TsTypeAnnotation;
}
interface PrivateName extends ExpressionBase {
    type: "PrivateName";
    id: Identifier;
}
type JSXObject = JSXMemberExpression | Identifier;
interface JSXMemberExpression extends Node {
    type: "JSXMemberExpression";
    object: JSXObject;
    property: Identifier;
}
/**
 * XML-based namespace syntax:
 */
interface JSXNamespacedName extends Node {
    type: "JSXNamespacedName";
    namespace: Identifier;
    name: Identifier;
}
interface JSXEmptyExpression extends Node, HasSpan {
    type: "JSXEmptyExpression";
}
interface JSXExpressionContainer extends Node, HasSpan {
    type: "JSXExpressionContainer";
    expression: JSXExpression;
}
type JSXExpression = JSXEmptyExpression | Expression;
interface JSXSpreadChild extends Node, HasSpan {
    type: "JSXSpreadChild";
    expression: Expression;
}
type JSXElementName = Identifier | JSXMemberExpression | JSXNamespacedName;
interface JSXOpeningElement extends Node, HasSpan {
    type: "JSXOpeningElement";
    name: JSXElementName;
    attributes: JSXAttributeOrSpread[];
    selfClosing: boolean;
    typeArguments?: TsTypeParameterInstantiation;
}
type JSXAttributeOrSpread = JSXAttribute | SpreadElement;
interface JSXClosingElement extends Node, HasSpan {
    type: "JSXClosingElement";
    name: JSXElementName;
}
interface JSXAttribute extends Node, HasSpan {
    type: "JSXAttribute";
    name: JSXAttributeName;
    value?: JSXAttrValue;
}
type JSXAttributeName = Identifier | JSXNamespacedName;
type JSXAttrValue = Literal | JSXExpressionContainer | JSXElement | JSXFragment;
interface JSXText extends Node, HasSpan {
    type: "JSXText";
    value: string;
    raw: string;
}
interface JSXElement extends Node, HasSpan {
    type: "JSXElement";
    opening: JSXOpeningElement;
    children: JSXElementChild[];
    closing?: JSXClosingElement;
}
type JSXElementChild = JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment;
interface JSXFragment extends Node, HasSpan {
    type: "JSXFragment";
    opening: JSXOpeningFragment;
    children: JSXElementChild[];
    closing: JSXClosingFragment;
}
interface JSXOpeningFragment extends Node, HasSpan {
    type: "JSXOpeningFragment";
}
interface JSXClosingFragment extends Node, HasSpan {
    type: "JSXClosingFragment";
}
type Literal = StringLiteral | BooleanLiteral | NullLiteral | NumericLiteral | BigIntLiteral | RegExpLiteral | JSXText;
interface StringLiteral extends Node, HasSpan {
    type: "StringLiteral";
    value: string;
    raw?: string;
}
interface BooleanLiteral extends Node, HasSpan {
    type: "BooleanLiteral";
    value: boolean;
}
interface NullLiteral extends Node, HasSpan {
    type: "NullLiteral";
}
interface RegExpLiteral extends Node, HasSpan {
    type: "RegExpLiteral";
    pattern: string;
    flags: string;
}
interface NumericLiteral extends Node, HasSpan {
    type: "NumericLiteral";
    value: number;
    raw?: string;
}
interface BigIntLiteral extends Node, HasSpan {
    type: "BigIntLiteral";
    value: bigint;
    raw?: string;
}
type ModuleDeclaration = ImportDeclaration | ExportDeclaration | ExportNamedDeclaration | ExportDefaultDeclaration | ExportDefaultExpression | ExportAllDeclaration | TsImportEqualsDeclaration | TsExportAssignment | TsNamespaceExportDeclaration;
interface ExportDefaultExpression extends Node, HasSpan {
    type: "ExportDefaultExpression";
    expression: Expression;
}
interface ExportDeclaration extends Node, HasSpan {
    type: "ExportDeclaration";
    declaration: Declaration;
}
interface ImportDeclaration extends Node, HasSpan {
    type: "ImportDeclaration";
    specifiers: ImportSpecifier[];
    source: StringLiteral;
    typeOnly: boolean;
    asserts?: ObjectExpression;
}
interface ExportAllDeclaration extends Node, HasSpan {
    type: "ExportAllDeclaration";
    source: StringLiteral;
    asserts?: ObjectExpression;
}
/**
 * - `export { foo } from 'mod'`
 * - `export { foo as bar } from 'mod'`
 */
interface ExportNamedDeclaration extends Node, HasSpan {
    type: "ExportNamedDeclaration";
    specifiers: ExportSpecifier[];
    source?: StringLiteral;
    typeOnly: boolean;
    asserts?: ObjectExpression;
}
interface ExportDefaultDeclaration extends Node, HasSpan {
    type: "ExportDefaultDeclaration";
    decl: DefaultDecl;
}
type DefaultDecl = ClassExpression | FunctionExpression | TsInterfaceDeclaration;
type ImportSpecifier = NamedImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier;
/**
 * e.g. `import foo from 'mod.js'`
 */
interface ImportDefaultSpecifier extends Node, HasSpan {
    type: "ImportDefaultSpecifier";
    local: Identifier;
}
/**
 * e.g. `import * as foo from 'mod.js'`.
 */
interface ImportNamespaceSpecifier extends Node, HasSpan {
    type: "ImportNamespaceSpecifier";
    local: Identifier;
}
/**
 * e.g. - `import { foo } from 'mod.js'`
 *
 * local = foo, imported = None
 *
 * e.g. `import { foo as bar } from 'mod.js'`
 *
 * local = bar, imported = Some(foo) for
 */
interface NamedImportSpecifier extends Node, HasSpan {
    type: "ImportSpecifier";
    local: Identifier;
    imported?: ModuleExportName;
    isTypeOnly: boolean;
}
type ModuleExportName = Identifier | StringLiteral;
type ExportSpecifier = ExportNamespaceSpecifier | ExportDefaultSpecifier | NamedExportSpecifier;
/**
 * `export * as foo from 'src';`
 */
interface ExportNamespaceSpecifier extends Node, HasSpan {
    type: "ExportNamespaceSpecifier";
    name: ModuleExportName;
}
interface ExportDefaultSpecifier extends Node, HasSpan {
    type: "ExportDefaultSpecifier";
    exported: Identifier;
}
interface NamedExportSpecifier extends Node, HasSpan {
    type: "ExportSpecifier";
    orig: ModuleExportName;
    /**
     * `Some(bar)` in `export { foo as bar }`
     */
    exported?: ModuleExportName;
    isTypeOnly: boolean;
}
interface HasInterpreter {
    /**
     * e.g. `/usr/bin/node` for `#!/usr/bin/node`
     */
    interpreter: string;
}
type Program = Module | Script;
interface Module extends Node, HasSpan, HasInterpreter {
    type: "Module";
    body: ModuleItem[];
}
interface Script extends Node, HasSpan, HasInterpreter {
    type: "Script";
    body: Statement[];
}
type ModuleItem = ModuleDeclaration | Statement;
type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "||" | "&&" | "in" | "instanceof" | "**" | "??";
type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&=" | "**=" | "&&=" | "||=" | "??=";
type UpdateOperator = "++" | "--";
type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete";
type Pattern = BindingIdentifier | ArrayPattern | RestElement | ObjectPattern | AssignmentPattern | Invalid | Expression;
interface BindingIdentifier extends PatternBase {
    type: "Identifier";
    value: string;
    optional: boolean;
}
interface ArrayPattern extends PatternBase {
    type: "ArrayPattern";
    elements: (Pattern | undefined)[];
    optional: boolean;
}
interface ObjectPattern extends PatternBase {
    type: "ObjectPattern";
    properties: ObjectPatternProperty[];
    optional: boolean;
}
interface AssignmentPattern extends PatternBase {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
}
interface RestElement extends PatternBase {
    type: "RestElement";
    rest: Span;
    argument: Pattern;
}
type ObjectPatternProperty = KeyValuePatternProperty | AssignmentPatternProperty | RestElement;
/**
 * `{key: value}`
 */
interface KeyValuePatternProperty extends Node {
    type: "KeyValuePatternProperty";
    key: PropertyName;
    value: Pattern;
}
/**
 * `{key}` or `{key = value}`
 */
interface AssignmentPatternProperty extends Node, HasSpan {
    type: "AssignmentPatternProperty";
    key: Identifier;
    value?: Expression;
}
/** Identifier is `a` in `{ a, }` */
type Property = Identifier | KeyValueProperty | AssignmentProperty | GetterProperty | SetterProperty | MethodProperty;
interface PropBase extends Node {
    key: PropertyName;
}
interface KeyValueProperty extends PropBase {
    type: "KeyValueProperty";
    value: Expression;
}
interface AssignmentProperty extends Node {
    type: "AssignmentProperty";
    key: Identifier;
    value: Expression;
}
interface GetterProperty extends PropBase, HasSpan {
    type: "GetterProperty";
    typeAnnotation?: TsTypeAnnotation;
    body?: BlockStatement;
}
interface SetterProperty extends PropBase, HasSpan {
    type: "SetterProperty";
    param: Pattern;
    body?: BlockStatement;
}
interface MethodProperty extends PropBase, Fn {
    type: "MethodProperty";
}
type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropName | BigIntLiteral;
interface ComputedPropName extends Node, HasSpan {
    type: "Computed";
    expression: Expression;
}
interface BlockStatement extends Node, HasSpan {
    type: "BlockStatement";
    stmts: Statement[];
}
interface ExpressionStatement extends Node, HasSpan {
    type: "ExpressionStatement";
    expression: Expression;
}
type Statement = BlockStatement | EmptyStatement | DebuggerStatement | WithStatement | ReturnStatement | LabeledStatement | BreakStatement | ContinueStatement | IfStatement | SwitchStatement | ThrowStatement | TryStatement | WhileStatement | DoWhileStatement | ForStatement | ForInStatement | ForOfStatement | Declaration | ExpressionStatement;
interface EmptyStatement extends Node, HasSpan {
    type: "EmptyStatement";
}
interface DebuggerStatement extends Node, HasSpan {
    type: "DebuggerStatement";
}
interface WithStatement extends Node, HasSpan {
    type: "WithStatement";
    object: Expression;
    body: Statement;
}
interface ReturnStatement extends Node, HasSpan {
    type: "ReturnStatement";
    argument?: Expression;
}
interface LabeledStatement extends Node, HasSpan {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
}
interface BreakStatement extends Node, HasSpan {
    type: "BreakStatement";
    label?: Identifier;
}
interface ContinueStatement extends Node, HasSpan {
    type: "ContinueStatement";
    label?: Identifier;
}
interface IfStatement extends Node, HasSpan {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate?: Statement;
}
interface SwitchStatement extends Node, HasSpan {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: SwitchCase[];
}
interface ThrowStatement extends Node, HasSpan {
    type: "ThrowStatement";
    argument: Expression;
}
interface TryStatement extends Node, HasSpan {
    type: "TryStatement";
    block: BlockStatement;
    handler?: CatchClause;
    finalizer?: BlockStatement;
}
interface WhileStatement extends Node, HasSpan {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
}
interface DoWhileStatement extends Node, HasSpan {
    type: "DoWhileStatement";
    test: Expression;
    body: Statement;
}
interface ForStatement extends Node, HasSpan {
    type: "ForStatement";
    init?: VariableDeclaration | Expression;
    test?: Expression;
    update?: Expression;
    body: Statement;
}
interface ForInStatement extends Node, HasSpan {
    type: "ForInStatement";
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
}
interface ForOfStatement extends Node, HasSpan {
    type: "ForOfStatement";
    /**
     *  Span of the await token.
     *
     *  es2018 for-await-of statements, e.g., `for await (const x of xs) {`
     */
    await?: Span;
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
}
interface SwitchCase extends Node, HasSpan {
    type: "SwitchCase";
    /**
     * Undefined for default case
     */
    test?: Expression;
    consequent: Statement[];
}
interface CatchClause extends Node, HasSpan {
    type: "CatchClause";
    /**
     * The param is `undefined` if the catch binding is omitted. E.g., `try { foo() } catch {}`
     */
    param?: Pattern;
    body: BlockStatement;
}
interface TsTypeAnnotation extends Node, HasSpan {
    type: "TsTypeAnnotation";
    typeAnnotation: TsType;
}
interface TsTypeParameterDeclaration extends Node, HasSpan {
    type: "TsTypeParameterDeclaration";
    parameters: TsTypeParameter[];
}
interface TsTypeParameter extends Node, HasSpan {
    type: "TsTypeParameter";
    name: Identifier;
    in: boolean;
    out: boolean;
    constraint?: TsType;
    default?: TsType;
}
interface TsTypeParameterInstantiation extends Node, HasSpan {
    type: "TsTypeParameterInstantiation";
    params: TsType[];
}
interface TsParameterProperty extends Node, HasSpan, HasDecorator {
    type: "TsParameterProperty";
    accessibility?: Accessibility;
    override: boolean;
    readonly: boolean;
    param: TsParameterPropertyParameter;
}
type TsParameterPropertyParameter = BindingIdentifier | AssignmentPattern;
interface TsQualifiedName extends Node {
    type: "TsQualifiedName";
    left: TsEntityName;
    right: Identifier;
}
type TsEntityName = TsQualifiedName | Identifier;
type TsTypeElement = TsCallSignatureDeclaration | TsConstructSignatureDeclaration | TsPropertySignature | TsGetterSignature | TsSetterSignature | TsMethodSignature | TsIndexSignature;
interface TsCallSignatureDeclaration extends Node, HasSpan {
    type: "TsCallSignatureDeclaration";
    params: TsFnParameter[];
    typeAnnotation?: TsTypeAnnotation;
    typeParams?: TsTypeParameterDeclaration;
}
interface TsConstructSignatureDeclaration extends Node, HasSpan {
    type: "TsConstructSignatureDeclaration";
    params: TsFnParameter[];
    typeAnnotation?: TsTypeAnnotation;
    typeParams?: TsTypeParameterDeclaration;
}
interface TsPropertySignature extends Node, HasSpan {
    type: "TsPropertySignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    init?: Expression;
    params: TsFnParameter[];
    typeAnnotation?: TsTypeAnnotation;
    typeParams?: TsTypeParameterDeclaration;
}
interface TsGetterSignature extends Node, HasSpan {
    type: "TsGetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    typeAnnotation?: TsTypeAnnotation;
}
interface TsSetterSignature extends Node, HasSpan {
    type: "TsSetterSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    param: TsFnParameter;
}
interface TsMethodSignature extends Node, HasSpan {
    type: "TsMethodSignature";
    readonly: boolean;
    key: Expression;
    computed: boolean;
    optional: boolean;
    params: TsFnParameter[];
    typeAnn?: TsTypeAnnotation;
    typeParams?: TsTypeParameterDeclaration;
}
interface TsIndexSignature extends Node, HasSpan {
    type: "TsIndexSignature";
    params: TsFnParameter[];
    typeAnnotation?: TsTypeAnnotation;
    readonly: boolean;
    static: boolean;
}
type TsType = TsKeywordType | TsThisType | TsFnOrConstructorType | TsTypeReference | TsTypeQuery | TsTypeLiteral | TsArrayType | TsTupleType | TsOptionalType | TsRestType | TsUnionOrIntersectionType | TsConditionalType | TsInferType | TsParenthesizedType | TsTypeOperator | TsIndexedAccessType | TsMappedType | TsLiteralType | TsTypePredicate | TsImportType;
type TsFnOrConstructorType = TsFunctionType | TsConstructorType;
interface TsKeywordType extends Node, HasSpan {
    type: "TsKeywordType";
    kind: TsKeywordTypeKind;
}
type TsKeywordTypeKind = "any" | "unknown" | "number" | "object" | "boolean" | "bigint" | "string" | "symbol" | "void" | "undefined" | "null" | "never" | "intrinsic";
interface TsThisType extends Node, HasSpan {
    type: "TsThisType";
}
type TsFnParameter = BindingIdentifier | ArrayPattern | RestElement | ObjectPattern;
interface TsFunctionType extends Node, HasSpan {
    type: "TsFunctionType";
    params: TsFnParameter[];
    typeParams?: TsTypeParameterDeclaration;
    typeAnnotation: TsTypeAnnotation;
}
interface TsConstructorType extends Node, HasSpan {
    type: "TsConstructorType";
    params: TsFnParameter[];
    typeParams?: TsTypeParameterDeclaration;
    typeAnnotation: TsTypeAnnotation;
    isAbstract: boolean;
}
interface TsTypeReference extends Node, HasSpan {
    type: "TsTypeReference";
    typeName: TsEntityName;
    typeParams?: TsTypeParameterInstantiation;
}
interface TsTypePredicate extends Node, HasSpan {
    type: "TsTypePredicate";
    asserts: boolean;
    paramName: TsThisTypeOrIdent;
    typeAnnotation?: TsTypeAnnotation;
}
type TsThisTypeOrIdent = TsThisType | Identifier;
interface TsImportType extends Node, HasSpan {
    type: "TsImportType";
    argument: StringLiteral;
    qualifier?: TsEntityName;
    typeArguments?: TsTypeParameterInstantiation;
}
/**
 * `typeof` operator
 */
interface TsTypeQuery extends Node, HasSpan {
    type: "TsTypeQuery";
    exprName: TsTypeQueryExpr;
    typeArguments?: TsTypeParameterInstantiation;
}
type TsTypeQueryExpr = TsEntityName | TsImportType;
interface TsTypeLiteral extends Node, HasSpan {
    type: "TsTypeLiteral";
    members: TsTypeElement[];
}
interface TsArrayType extends Node, HasSpan {
    type: "TsArrayType";
    elemType: TsType;
}
interface TsTupleType extends Node, HasSpan {
    type: "TsTupleType";
    elemTypes: TsTupleElement[];
}
interface TsTupleElement extends Node, HasSpan {
    type: "TsTupleElement";
    label?: Pattern;
    ty: TsType;
}
interface TsOptionalType extends Node, HasSpan {
    type: "TsOptionalType";
    typeAnnotation: TsType;
}
interface TsRestType extends Node, HasSpan {
    type: "TsRestType";
    typeAnnotation: TsType;
}
type TsUnionOrIntersectionType = TsUnionType | TsIntersectionType;
interface TsUnionType extends Node, HasSpan {
    type: "TsUnionType";
    types: TsType[];
}
interface TsIntersectionType extends Node, HasSpan {
    type: "TsIntersectionType";
    types: TsType[];
}
interface TsConditionalType extends Node, HasSpan {
    type: "TsConditionalType";
    checkType: TsType;
    extendsType: TsType;
    trueType: TsType;
    falseType: TsType;
}
interface TsInferType extends Node, HasSpan {
    type: "TsInferType";
    typeParam: TsTypeParameter;
}
interface TsParenthesizedType extends Node, HasSpan {
    type: "TsParenthesizedType";
    typeAnnotation: TsType;
}
interface TsTypeOperator extends Node, HasSpan {
    type: "TsTypeOperator";
    op: TsTypeOperatorOp;
    typeAnnotation: TsType;
}
type TsTypeOperatorOp = "keyof" | "unique" | "readonly";
interface TsIndexedAccessType extends Node, HasSpan {
    type: "TsIndexedAccessType";
    readonly: boolean;
    objectType: TsType;
    indexType: TsType;
}
type TruePlusMinus = true | "+" | "-";
interface TsMappedType extends Node, HasSpan {
    type: "TsMappedType";
    readonly?: TruePlusMinus;
    typeParam: TsTypeParameter;
    nameType?: TsType;
    optional?: TruePlusMinus;
    typeAnnotation?: TsType;
}
interface TsLiteralType extends Node, HasSpan {
    type: "TsLiteralType";
    literal: TsLiteral;
}
type TsLiteral = NumericLiteral | StringLiteral | BooleanLiteral | BigIntLiteral | TsTemplateLiteralType;
interface TsTemplateLiteralType extends Node, HasSpan {
    type: "TemplateLiteral";
    types: TsType[];
    quasis: TemplateElement[];
}
interface TsInterfaceDeclaration extends Node, HasSpan {
    type: "TsInterfaceDeclaration";
    id: Identifier;
    declare: boolean;
    typeParams?: TsTypeParameterDeclaration;
    extends: TsExpressionWithTypeArguments[];
    body: TsInterfaceBody;
}
interface TsInterfaceBody extends Node, HasSpan {
    type: "TsInterfaceBody";
    body: TsTypeElement[];
}
interface TsExpressionWithTypeArguments extends Node, HasSpan {
    type: "TsExpressionWithTypeArguments";
    expression: Expression;
    typeArguments?: TsTypeParameterInstantiation;
}
interface TsTypeAliasDeclaration extends Node, HasSpan {
    type: "TsTypeAliasDeclaration";
    declare: boolean;
    id: Identifier;
    typeParams?: TsTypeParameterDeclaration;
    typeAnnotation: TsType;
}
interface TsEnumDeclaration extends Node, HasSpan {
    type: "TsEnumDeclaration";
    declare: boolean;
    isConst: boolean;
    id: Identifier;
    members: TsEnumMember[];
}
interface TsEnumMember extends Node, HasSpan {
    type: "TsEnumMember";
    id: TsEnumMemberId;
    init?: Expression;
}
type TsEnumMemberId = Identifier | StringLiteral;
interface TsModuleDeclaration extends Node, HasSpan {
    type: "TsModuleDeclaration";
    declare: boolean;
    global: boolean;
    id: TsModuleName;
    body?: TsNamespaceBody;
}
/**
 * `namespace A.B { }` is a namespace named `A` with another TsNamespaceDecl as its body.
 */
type TsNamespaceBody = TsModuleBlock | TsNamespaceDeclaration;
interface TsModuleBlock extends Node, HasSpan {
    type: "TsModuleBlock";
    body: ModuleItem[];
}
interface TsNamespaceDeclaration extends Node, HasSpan {
    type: "TsNamespaceDeclaration";
    declare: boolean;
    global: boolean;
    id: Identifier;
    body: TsNamespaceBody;
}
type TsModuleName = Identifier | StringLiteral;
interface TsImportEqualsDeclaration extends Node, HasSpan {
    type: "TsImportEqualsDeclaration";
    declare: boolean;
    isExport: boolean;
    isTypeOnly: boolean;
    id: Identifier;
    moduleRef: TsModuleReference;
}
type TsModuleReference = TsEntityName | TsExternalModuleReference;
interface TsExternalModuleReference extends Node, HasSpan {
    type: "TsExternalModuleReference";
    expression: StringLiteral;
}
interface TsExportAssignment extends Node, HasSpan {
    type: "TsExportAssignment";
    expression: Expression;
}
interface TsNamespaceExportDeclaration extends Node, HasSpan {
    type: "TsNamespaceExportDeclaration";
    id: Identifier;
}
interface TsAsExpression extends ExpressionBase {
    type: "TsAsExpression";
    expression: Expression;
    typeAnnotation: TsType;
}
interface TsInstantiation extends Node, HasSpan {
    type: "TsInstantiation";
    expression: Expression;
    typeArguments: TsTypeParameterInstantiation;
}
interface TsTypeAssertion extends ExpressionBase {
    type: "TsTypeAssertion";
    expression: Expression;
    typeAnnotation: TsType;
}
interface TsConstAssertion extends ExpressionBase {
    type: "TsConstAssertion";
    expression: Expression;
}
interface TsNonNullExpression extends ExpressionBase {
    type: "TsNonNullExpression";
    expression: Expression;
}
type Accessibility = "public" | "protected" | "private";
interface Invalid extends Node, HasSpan {
    type: "Invalid";
}

declare class Visitor {
    visitProgram(n: Program): Program;
    visitModule(m: Module): Module;
    visitScript(m: Script): Script;
    visitModuleItems(items: ModuleItem[]): ModuleItem[];
    visitModuleItem(n: ModuleItem): ModuleItem;
    visitModuleDeclaration(n: ModuleDeclaration): ModuleDeclaration;
    visitTsNamespaceExportDeclaration(n: TsNamespaceExportDeclaration): ModuleDeclaration;
    visitTsExportAssignment(n: TsExportAssignment): TsExportAssignment;
    visitTsImportEqualsDeclaration(n: TsImportEqualsDeclaration): ModuleDeclaration;
    visitTsModuleReference(n: TsModuleReference): TsModuleReference;
    visitTsExternalModuleReference(n: TsExternalModuleReference): TsExternalModuleReference;
    visitExportAllDeclaration(n: ExportAllDeclaration): ModuleDeclaration;
    visitExportDefaultExpression(n: ExportDefaultExpression): ModuleDeclaration;
    visitExportNamedDeclaration(n: ExportNamedDeclaration): ModuleDeclaration;
    visitExportSpecifiers(nodes: ExportSpecifier[]): ExportSpecifier[];
    visitExportSpecifier(n: ExportSpecifier): ExportSpecifier;
    visitNamedExportSpecifier(n: NamedExportSpecifier): ExportSpecifier;
    visitModuleExportName(n: ModuleExportName): ModuleExportName;
    visitExportNamespaceSpecifier(n: ExportNamespaceSpecifier): ExportSpecifier;
    visitExportDefaultSpecifier(n: ExportDefaultSpecifier): ExportSpecifier;
    visitOptionalStringLiteral(n: StringLiteral | undefined): StringLiteral | undefined;
    visitExportDefaultDeclaration(n: ExportDefaultDeclaration): ModuleDeclaration;
    visitDefaultDeclaration(n: DefaultDecl): DefaultDecl;
    visitFunctionExpression(n: FunctionExpression): FunctionExpression;
    visitClassExpression(n: ClassExpression): ClassExpression;
    visitExportDeclaration(n: ExportDeclaration): ModuleDeclaration;
    visitArrayExpression(e: ArrayExpression): Expression;
    visitArrayElement(e: ExprOrSpread | undefined): ExprOrSpread | undefined;
    visitExprOrSpread(e: ExprOrSpread): ExprOrSpread;
    visitExprOrSpreads(nodes: ExprOrSpread[]): ExprOrSpread[];
    visitSpreadElement(e: SpreadElement): SpreadElement;
    visitOptionalExpression(e: Expression | undefined): Expression | undefined;
    visitArrowFunctionExpression(e: ArrowFunctionExpression): Expression;
    visitArrowBody(body: BlockStatement | Expression): BlockStatement | Expression;
    visitBlockStatement(block: BlockStatement): BlockStatement;
    visitStatements(stmts: Statement[]): Statement[];
    visitStatement(stmt: Statement): Statement;
    visitSwitchStatement(stmt: SwitchStatement): Statement;
    visitSwitchCases(cases: SwitchCase[]): SwitchCase[];
    visitSwitchCase(c: SwitchCase): SwitchCase;
    visitIfStatement(stmt: IfStatement): Statement;
    visitOptionalStatement(stmt: Statement | undefined): Statement | undefined;
    visitBreakStatement(stmt: BreakStatement): Statement;
    visitWhileStatement(stmt: WhileStatement): Statement;
    visitTryStatement(stmt: TryStatement): Statement;
    visitCatchClause(handler: CatchClause | undefined): CatchClause | undefined;
    visitThrowStatement(stmt: ThrowStatement): Statement;
    visitReturnStatement(stmt: ReturnStatement): Statement;
    visitLabeledStatement(stmt: LabeledStatement): Statement;
    visitForStatement(stmt: ForStatement): Statement;
    visitForOfStatement(stmt: ForOfStatement): Statement;
    visitForInStatement(stmt: ForInStatement): Statement;
    visitEmptyStatement(stmt: EmptyStatement): EmptyStatement;
    visitDoWhileStatement(stmt: DoWhileStatement): Statement;
    visitDebuggerStatement(stmt: DebuggerStatement): Statement;
    visitWithStatement(stmt: WithStatement): Statement;
    visitDeclaration(decl: Declaration): Declaration;
    visitVariableDeclaration(n: VariableDeclaration): VariableDeclaration;
    visitVariableDeclarators(nodes: VariableDeclarator[]): VariableDeclarator[];
    visitVariableDeclarator(n: VariableDeclarator): VariableDeclarator;
    visitTsTypeAliasDeclaration(n: TsTypeAliasDeclaration): Declaration;
    visitTsModuleDeclaration(n: TsModuleDeclaration): Declaration;
    visitTsModuleName(n: TsModuleName): TsModuleName;
    visitTsNamespaceBody(n: TsNamespaceBody): TsNamespaceBody | undefined;
    visitTsNamespaceDeclaration(n: TsNamespaceDeclaration): TsModuleBlock | TsNamespaceDeclaration;
    visitTsModuleBlock(n: TsModuleBlock): TsModuleBlock | TsNamespaceDeclaration;
    visitTsInterfaceDeclaration(n: TsInterfaceDeclaration): TsInterfaceDeclaration;
    visitTsInterfaceBody(n: TsInterfaceBody): TsInterfaceBody;
    visitTsTypeElements(nodes: TsTypeElement[]): TsTypeElement[];
    visitTsTypeElement(n: TsTypeElement): TsTypeElement;
    visitTsCallSignatureDeclaration(n: TsCallSignatureDeclaration): TsCallSignatureDeclaration;
    visitTsConstructSignatureDeclaration(n: TsConstructSignatureDeclaration): TsConstructSignatureDeclaration;
    visitTsPropertySignature(n: TsPropertySignature): TsPropertySignature;
    visitTsGetterSignature(n: TsGetterSignature): TsGetterSignature;
    visitTsSetterSignature(n: TsSetterSignature): TsSetterSignature;
    visitTsMethodSignature(n: TsMethodSignature): TsMethodSignature;
    visitTsEnumDeclaration(n: TsEnumDeclaration): Declaration;
    visitTsEnumMembers(nodes: TsEnumMember[]): TsEnumMember[];
    visitTsEnumMember(n: TsEnumMember): TsEnumMember;
    visitTsEnumMemberId(n: TsEnumMemberId): TsEnumMemberId;
    visitFunctionDeclaration(decl: FunctionDeclaration): Declaration;
    visitClassDeclaration(decl: ClassDeclaration): Declaration;
    visitClassBody(members: ClassMember[]): ClassMember[];
    visitClassMember(member: ClassMember): ClassMember;
    visitTsIndexSignature(n: TsIndexSignature): TsIndexSignature;
    visitTsFnParameters(params: TsFnParameter[]): TsFnParameter[];
    visitTsFnParameter(n: TsFnParameter): TsFnParameter;
    visitPrivateProperty(n: PrivateProperty): ClassMember;
    visitPrivateMethod(n: PrivateMethod): ClassMember;
    visitPrivateName(n: PrivateName): PrivateName;
    visitConstructor(n: Constructor): ClassMember;
    visitConstructorParameters(nodes: (Param | TsParameterProperty)[]): (Param | TsParameterProperty)[];
    visitConstructorParameter(n: Param | TsParameterProperty): Param | TsParameterProperty;
    visitStaticBlock(n: StaticBlock): StaticBlock;
    visitTsParameterProperty(n: TsParameterProperty): TsParameterProperty | Param;
    visitTsParameterPropertyParameter(n: TsParameterPropertyParameter): TsParameterPropertyParameter;
    visitPropertyName(key: PropertyName): PropertyName;
    visitAccessibility(n: Accessibility | undefined): Accessibility | undefined;
    visitClassProperty(n: ClassProperty): ClassMember;
    visitClassMethod(n: ClassMethod): ClassMember;
    visitComputedPropertyKey(n: ComputedPropName): ComputedPropName;
    visitClass<T extends Class>(n: T): T;
    visitFunction<T extends Fn>(n: T): T;
    visitTsExpressionsWithTypeArguments(nodes: TsExpressionWithTypeArguments[]): TsExpressionWithTypeArguments[];
    visitTsExpressionWithTypeArguments(n: TsExpressionWithTypeArguments): TsExpressionWithTypeArguments;
    visitTsTypeParameterInstantiation(n: TsTypeParameterInstantiation | undefined): TsTypeParameterInstantiation | undefined;
    visitTsTypes(nodes: TsType[]): TsType[];
    visitTsEntityName(n: TsEntityName): TsEntityName;
    visitTsQualifiedName(n: TsQualifiedName): TsQualifiedName;
    visitDecorators(nodes: Decorator[] | undefined): Decorator[] | undefined;
    visitDecorator(n: Decorator): Decorator;
    visitExpressionStatement(stmt: ExpressionStatement): Statement;
    visitContinueStatement(stmt: ContinueStatement): Statement;
    visitExpression(n: Expression): Expression;
    visitOptionalChainingExpression(n: OptionalChainingExpression): Expression;
    visitMemberExpressionOrOptionalChainingCall(n: MemberExpression | OptionalChainingCall): MemberExpression | OptionalChainingCall;
    visitOptionalChainingCall(n: OptionalChainingCall): OptionalChainingCall;
    visitAssignmentExpression(n: AssignmentExpression): Expression;
    visitPatternOrExpression(n: Pattern | Expression): Pattern | Expression;
    visitYieldExpression(n: YieldExpression): Expression;
    visitUpdateExpression(n: UpdateExpression): Expression;
    visitUnaryExpression(n: UnaryExpression): Expression;
    visitTsTypeAssertion(n: TsTypeAssertion): Expression;
    visitTsConstAssertion(n: TsConstAssertion): Expression;
    visitTsInstantiation(n: TsInstantiation): TsInstantiation;
    visitTsNonNullExpression(n: TsNonNullExpression): Expression;
    visitTsAsExpression(n: TsAsExpression): Expression;
    visitThisExpression(n: ThisExpression): Expression;
    visitTemplateLiteral(n: TemplateLiteral): Expression;
    visitParameters(n: Param[]): Param[];
    visitParameter(n: Param): Param;
    visitTaggedTemplateExpression(n: TaggedTemplateExpression): Expression;
    visitSequenceExpression(n: SequenceExpression): Expression;
    visitRegExpLiteral(n: RegExpLiteral): Expression;
    visitParenthesisExpression(n: ParenthesisExpression): Expression;
    visitObjectExpression(n: ObjectExpression): Expression;
    visitObjectProperties(nodes: (Property | SpreadElement)[]): (Property | SpreadElement)[];
    visitObjectProperty(n: Property | SpreadElement): Property | SpreadElement;
    visitProperty(n: Property): Property | SpreadElement;
    visitSetterProperty(n: SetterProperty): Property | SpreadElement;
    visitMethodProperty(n: MethodProperty): Property | SpreadElement;
    visitKeyValueProperty(n: KeyValueProperty): Property | SpreadElement;
    visitGetterProperty(n: GetterProperty): Property | SpreadElement;
    visitAssignmentProperty(n: AssignmentProperty): Property | SpreadElement;
    visitNullLiteral(n: NullLiteral): NullLiteral;
    visitNewExpression(n: NewExpression): Expression;
    visitTsTypeArguments(n: TsTypeParameterInstantiation | undefined): TsTypeParameterInstantiation | undefined;
    visitArguments(nodes: Argument[]): Argument[];
    visitArgument(n: Argument): Argument;
    visitMetaProperty(n: MetaProperty): Expression;
    visitMemberExpression(n: MemberExpression): MemberExpression;
    visitSuperPropExpression(n: SuperPropExpression): Expression;
    visitCallee(n: Expression | Super | Import): Expression | Super | Import;
    visitJSXText(n: JSXText): JSXText;
    visitJSXNamespacedName(n: JSXNamespacedName): JSXNamespacedName;
    visitJSXMemberExpression(n: JSXMemberExpression): JSXMemberExpression;
    visitJSXObject(n: JSXObject): JSXObject;
    visitJSXFragment(n: JSXFragment): JSXFragment;
    visitJSXClosingFragment(n: JSXClosingFragment): JSXClosingFragment;
    visitJSXElementChildren(nodes: JSXElementChild[]): JSXElementChild[];
    visitJSXElementChild(n: JSXElementChild): JSXElementChild;
    visitJSXExpressionContainer(n: JSXExpressionContainer): JSXExpressionContainer;
    visitJSXSpreadChild(n: JSXSpreadChild): JSXElementChild;
    visitJSXOpeningFragment(n: JSXOpeningFragment): JSXOpeningFragment;
    visitJSXEmptyExpression(n: JSXEmptyExpression): Expression;
    visitJSXElement(n: JSXElement): JSXElement;
    visitJSXClosingElement(n: JSXClosingElement | undefined): JSXClosingElement | undefined;
    visitJSXElementName(n: JSXElementName): JSXElementName;
    visitJSXOpeningElement(n: JSXOpeningElement): JSXOpeningElement;
    visitJSXAttributes(attrs: JSXAttributeOrSpread[] | undefined): JSXAttributeOrSpread[] | undefined;
    visitJSXAttributeOrSpread(n: JSXAttributeOrSpread): JSXAttributeOrSpread;
    visitJSXAttributeOrSpreads(nodes: JSXAttributeOrSpread[]): JSXAttributeOrSpread[];
    visitJSXAttribute(n: JSXAttribute): JSXAttributeOrSpread;
    visitJSXAttributeValue(n: JSXAttrValue | undefined): JSXAttrValue | undefined;
    visitJSXAttributeName(n: JSXAttributeName): JSXAttributeName;
    visitConditionalExpression(n: ConditionalExpression): Expression;
    visitCallExpression(n: CallExpression): Expression;
    visitBooleanLiteral(n: BooleanLiteral): BooleanLiteral;
    visitBinaryExpression(n: BinaryExpression): Expression;
    visitAwaitExpression(n: AwaitExpression): Expression;
    visitTsTypeParameterDeclaration(n: TsTypeParameterDeclaration | undefined): TsTypeParameterDeclaration | undefined;
    visitTsTypeParameters(nodes: TsTypeParameter[]): TsTypeParameter[];
    visitTsTypeParameter(n: TsTypeParameter): TsTypeParameter;
    visitTsTypeAnnotation(a: TsTypeAnnotation | undefined): TsTypeAnnotation | undefined;
    visitTsType(n: TsType): TsType;
    visitPatterns(nodes: Pattern[]): Pattern[];
    visitImportDeclaration(n: ImportDeclaration): ImportDeclaration;
    visitImportSpecifiers(nodes: ImportSpecifier[]): ImportSpecifier[];
    visitImportSpecifier(node: ImportSpecifier): ImportSpecifier;
    visitNamedImportSpecifier(node: NamedImportSpecifier): NamedImportSpecifier;
    visitImportNamespaceSpecifier(node: ImportNamespaceSpecifier): ImportNamespaceSpecifier;
    visitImportDefaultSpecifier(node: ImportDefaultSpecifier): ImportSpecifier;
    visitBindingIdentifier(i: BindingIdentifier): BindingIdentifier;
    visitIdentifierReference(i: Identifier): Identifier;
    visitLabelIdentifier(label: Identifier): Identifier;
    visitIdentifier(n: Identifier): Identifier;
    visitStringLiteral(n: StringLiteral): StringLiteral;
    visitNumericLiteral(n: NumericLiteral): NumericLiteral;
    visitBigIntLiteral(n: BigIntLiteral): BigIntLiteral;
    visitPattern(n: Pattern): Pattern;
    visitRestElement(n: RestElement): RestElement;
    visitAssignmentPattern(n: AssignmentPattern): Pattern;
    visitObjectPattern(n: ObjectPattern): Pattern;
    visitObjectPatternProperties(nodes: ObjectPatternProperty[]): ObjectPatternProperty[];
    visitObjectPatternProperty(n: ObjectPatternProperty): ObjectPatternProperty;
    visitKeyValuePatternProperty(n: KeyValuePatternProperty): ObjectPatternProperty;
    visitAssignmentPatternProperty(n: AssignmentPatternProperty): ObjectPatternProperty;
    visitArrayPattern(n: ArrayPattern): Pattern;
    visitArrayPatternElements(nodes: (Pattern | undefined)[]): (Pattern | undefined)[];
    visitArrayPatternElement(n: Pattern | undefined): Pattern | undefined;
}

type ScopeVar = {
    name: string;
    private?: boolean;
    value?: Node$1;
    marker?: unknown;
};
type BaseNode = Declaration$1 | Expression$1 | CatchClause$1 | ClassDeclaration$1 | ImportDeclaration$1 | Param$1 | ClassMethod$1 | PrivateMethod$1 | Statement$1 | VariableDeclarator$1 | ModuleItem$1;
type WalkContext = {
    /** Get current script source code */
    src: string | undefined;
    /** Get current walking node's span */
    span(): [number, number];
    /** Save data to current plugin cache */
    set<T>(key: string, data: T): void;
    /** Get data from current plugin cache */
    get<T>(key: string, defaultValue: T): T;
    get<T>(key: string, defaultValue?: T): T | undefined;
    /** Skip this node, not handling */
    skip(): void;
    /** Remove this node */
    remove(): void;
    /** Replace matched node with new node, equals to `return node` */
    replace(newNode: Node$1 | Node$1[]): void;
    /** Track last variable with name */
    track(name: string): ScopeVar | undefined;
    /** Import some package */
    import(source: string): void;
    import(pkg: string | string[], source: string, isDefault?: boolean): void;
    /** Export some package */
    export(pkg: string | string[], source?: string | null, isNamespace?: boolean): void;
    /** Prepend some statement after imports */
    prepend(stmts: ModuleItem$1[]): void;
    /** Append some statement before exports */
    append(stmts: ModuleItem$1[]): void;
    /** decalre module in `macros.global.dts` */
    declareModule(id: string, body: ModuleItem$1 | ModuleItem$1[]): void;
    /** declare global types in `macros.global.dts` */
    declareGlobal(body: ModuleItem$1 | ModuleItem$1[]): void;
    /** decalre global const types in `macros.global.dts`, shorthand for `declareGlobal(genConstType(...))` */
    declareGlobalConst(name: string, ty: string | TsType$1): void;
    /** declare <reference /> in `macros.global.dts` */
    declareReference({ types, path }: {
        types?: string;
        path?: string;
    }): void;
    /** prepend declarations after references in `macros.global.dts` */
    declarePrepend(stmts: ModuleItem$1[]): void;
    /** append declarations after all declarations in `macros.global.dts` */
    declareAppend(stmts: ModuleItem$1[]): void;
    /** Convert source code to node list */
    parse(src: string, options?: ParseOptions): ModuleItem$1[];
    /** Convert expression to ast */
    parseExpr(src: string, options?: ParseOptions): Expression$1;
    /** Convert type expression to ast */
    parseType(ty: string, options?: ParseOptions): TsType$1;
    /** Convert current ast node to source code */
    print(ast?: Node$1 | Node$1[]): string;
    /** Convert an expression node to source code */
    printExpr(expr?: Node$1): string;
    /** Convert a type node to source code */
    printType(ty?: TsType$1): string;
    /** Add new macro plugins to the ast walker */
    addPlugin(macro: MacroPlugin | MacroPlugin[]): void;
    /** Start tracking variables */
    startTracking: () => boolean;
    /** Stop tracking variables */
    stopTracking: () => boolean;
};
type TrackFunc = (this: WalkContext, name: string) => ScopeVar | undefined;
type WalkFunc = (this: WalkContext, node: Node$1, parent?: Node$1, prop?: string, index?: number) => Node$1 | Node$1[] | undefined | void;
type WalkPlugin = {
    enter?: WalkFunc;
    leave?: WalkFunc;
    track?: TrackFunc;
};
type ExprMacro = (this: WalkContext, args: Expression$1[], typeParams?: TsType$1[], optional?: boolean) => BaseNode | BaseNode[] | void | undefined;
type TypeMacro = (this: WalkContext, typeParams?: TsType$1[], optional?: boolean) => BaseNode | BaseNode[] | void | undefined;
type TmplMacro = (this: WalkContext, strings: string[], ...expressions: Expression$1[]) => BaseNode | BaseNode[] | void | undefined;
type LabeledMacro = (this: WalkContext, stmt: Statement$1, parent?: BaseNode, prop?: string, index?: number) => BaseNode | BaseNode[] | void | undefined;
type GlobalMacro<T = BaseNode> = (this: WalkContext, ast: T, parent?: BaseNode, prop?: string, index?: number) => void | undefined | BaseNode | BaseNode[];
type SliceVisit<T> = T extends `visit${infer R}` ? R : never;
type GlobalMacroPlugin = {
    enter?: GlobalMacro;
    leave?: GlobalMacro;
};
type MacroPlugin = (GlobalMacro | (GlobalMacroPlugin & {
    [k in keyof Visitor & string as SliceVisit<k>]?: GlobalMacro<Parameters<Visitor[k]>[0]> | {
        enter?: GlobalMacro<Parameters<Visitor[k]>[0]>;
        leave?: GlobalMacro<Parameters<Visitor[k]>[0]>;
    };
}));
type MacroPluginWithProxy = MacroPlugin & {
    proxy<Runtime extends Function>(runtime: Runtime): MacroPlugin & Runtime;
};
type MacroOptions = {
    /** global macros to be used */
    macros?: MacroPlugin[];
    /**
     * Packages that includes macros.
     *
     * **Note**: All macros from these packages would been registed as **global macros**.
     *
     * The `macros` options also can implement similar behavior:
     * ```js
     * import { defineConfig, isMacroPlugin } from "@macro-plugin/core"
     * import * as macroPackage from "package-name"
     *
     * export default defineConfig({
     *   macros: [...Object.values(macroPackage).filter(isMacroPlugin)]
     * })
     * ```
     */
    depends?: string[];
    /**
     * External packages that includes macros.
     *
     * **Note**: All macros from these packages are lazy loading, they are only enabled when you imported them.
     * If you want include all macros globally from some package, please put them in `depends` options.
     */
    externals?: string[];
    /** emit dts file, default is false */
    emitDts?: boolean;
    /** the dts output path, default is `./macros.d.ts` */
    dtsOutputPath?: string;
    /** hook when emit dts, we use this hook for emitting dts file */
    onEmitDts?: (dts: string) => void;
};
type Config = Omit<Options, "plugin"> & MacroOptions;

/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
declare const createLabeledBlock: ((label: string, specifier: string, source: string, allowParams?: boolean) => MacroPlugin);

declare const createLabeledExpr: ((label: string, specifier: string, source: string) => MacroPlugin);

declare function createSwcPlugin(config: Config, src?: string, spanOffset?: number): (program: Program$1) => Program$1;
declare function transformAst(ast: Program$1, config: Config, src?: string, spanOffset?: number): Program$1 & {
    dts?: string;
};
/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
declare function transform(code: string, config: Config): {
    ast: Program$1;
    dts: string | undefined;
    code: string;
    map?: string | undefined;
};
/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
declare function transformAsync(code: string, config: Config): Promise<{
    ast: Program$1;
    dts: string | undefined;
    code: string;
    map?: string | undefined;
}>;

declare function parseExpr(expr: string, options?: ParseOptions): Expression$1;
declare function parseType(ty: string, options?: ParseOptions): TsType$1;

declare class Walker {
    src: string | undefined;
    node: Node$1;
    data: Record<string, unknown>;
    imports: ImportDeclaration$1[];
    exports: ExportNamedDeclaration$1[];
    prepends: ModuleItem$1[];
    appends: ModuleItem$1[];
    globalDts: ModuleItem$1[];
    moduleDts: TsModuleDeclaration$1[];
    references: {
        types?: string;
        path?: string;
    }[];
    prependDts: ModuleItem$1[];
    appendDts: ModuleItem$1[];
    importHashes: Record<string, true>;
    exportHashes: Record<string, true>;
    enters: WalkFunc[];
    leaves: WalkFunc[];
    enableTracker: boolean;
    spanOffset: number;
    set: <T>(key: string, value: T) => void;
    get: <T>(key: string, defaultValue?: T | undefined) => T;
    import: (pkg: string | string[], source?: string, isDefault?: boolean) => void;
    export: (pkg: string | string[], source?: string | null, isNamespace?: boolean) => void;
    prepend: (stmts: ModuleItem$1[]) => number;
    append: (stmts: ModuleItem$1[]) => number;
    addPlugin: (macro: MacroPlugin | MacroPlugin[]) => void;
    declareModule: (id: string, body: ModuleItem$1 | ModuleItem$1[]) => number;
    declareGlobal: (body: ModuleItem$1 | ModuleItem$1[]) => number;
    declareGlobalConst: (name: string, ty: string | TsType$1) => number;
    declareReference: ({ types, path }: {
        types?: string | undefined;
        path?: string | undefined;
    }) => number;
    declarePrepend: (stmts: ModuleItem$1[]) => number;
    declareAppend: (stmts: ModuleItem$1[]) => number;
    defaultContext: {
        span: () => [number, number];
        set: <T>(key: string, value: T) => void;
        get: <T_1>(key: string, defaultValue?: T_1 | undefined) => T_1;
        track: (name: string) => ScopeVar | undefined;
        import: (pkg: string | string[], source?: string, isDefault?: boolean) => void;
        export: (pkg: string | string[], source?: string | null, isNamespace?: boolean) => void;
        prepend: (stmts: ModuleItem$1[]) => number;
        append: (stmts: ModuleItem$1[]) => number;
        parseExpr: typeof parseExpr;
        parseType: typeof parseType;
        parse: (src: string, options: ParseOptions) => ModuleItem$1[];
        printExpr: (expr: Node$1) => string;
        printType: (ty: TsType$1) => string;
        addPlugin: (macro: MacroPlugin | MacroPlugin[]) => void;
        startTracking: () => boolean;
        stopTracking: () => boolean;
        declareAppend: (stmts: ModuleItem$1[]) => number;
        declareGlobal: (body: ModuleItem$1 | ModuleItem$1[]) => number;
        declareModule: (id: string, body: ModuleItem$1 | ModuleItem$1[]) => number;
        declarePrepend: (stmts: ModuleItem$1[]) => number;
        declareReference: ({ types, path }: {
            types?: string | undefined;
            path?: string | undefined;
        }) => number;
        declareGlobalConst: (name: string, ty: string | TsType$1) => number;
    };
    constructor({ enter, leave }: WalkPlugin, src?: string, enableTracker?: boolean);
    walkSingle(n: Node$1, parent?: Node$1, prop?: string, index?: number): number;
    walkMany(nodes: Node$1[], parent?: Node$1, prop?: string): void;
    walk(n: Node$1 | Node$1[], spanOffset?: number): Node$1 | Node$1[];
    emit(): string;
    track(name: string): ScopeVar | undefined;
}
declare function walk(n: Node$1 | Node$1[], plugin: WalkPlugin): Node$1 | Node$1[];

declare var $Macro: (f: MacroPlugin) => void;
declare var $LitMacro: <LitType>(i: LitType) => LitType;
declare var $ExprMacro: <FnType = (...args: unknown[]) => unknown>(f: ExprMacro | {
    enter?: ExprMacro;
    leave?: ExprMacro;
}) => FnType;
declare var $TypeMacro: <FnType = (...args: unknown[]) => unknown>(f: TypeMacro | {
    enter?: TypeMacro;
    leave?: TypeMacro;
}) => FnType;
declare var $TmplMacro: <ReturnType_1 = string>(f: TmplMacro | {
    enter?: TmplMacro;
    leave?: TmplMacro;
}) => (strings: TemplateStringsArray, ...exprs: unknown[]) => ReturnType_1;
declare var $LabeledMacro: (<label extends string>(f: LabeledMacro | {
    enter?: LabeledMacro;
    leave?: LabeledMacro;
}, label?: label) => void) & ((label: string, f: LabeledMacro | {
    enter?: LabeledMacro;
    leave?: LabeledMacro;
}) => void);
declare const macro: MacroPlugin;

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param options - used for specifying options for code generation.
 * @returns - an object containing the output code and source map.
 */
declare function print(ast: BaseNode | BaseNode[], options?: Options): {
    code: string;
    map: string | undefined;
};
declare function printAsync(ast: BaseNode | BaseNode[], options?: Options): Promise<{
    code: string;
    map: string | undefined;
}>;
declare function printExpr(expr: BaseNode, options?: Options): {
    code: string;
    map: string | undefined;
};
declare function printExprAsync(expr: BaseNode, options?: Options): Promise<{
    code: string;
    map: string | undefined;
}>;
declare function printType(ty: TsType$1, options?: Options): {
    code: string;
    map: string | undefined;
};
declare function printTypeAsync(ty: TsType$1, options?: Options): Promise<{
    code: string;
    map: string | undefined;
}>;

declare function defineConfig(config: Config): Config;
declare function createMacro(macro: MacroPlugin): MacroPlugin;
declare function createProxyMacro(macro: MacroPlugin): MacroPluginWithProxy;
declare function createLitMacro(map: Record<string, unknown>, typeAnnotations?: Record<string, string | TsType$1>): MacroPlugin;
declare function createLitMacro<T>(key: string, value: T, typeAnnotation?: string | TsType$1): MacroPlugin;
declare function createExprMacro(name: string, f: Function | ExprMacro | {
    enter?: ExprMacro;
    leave?: ExprMacro;
}, fnType?: TsFunctionType$1 | string): MacroPluginWithProxy;
declare function createTypeMacro(name: string, f: TypeMacro | {
    enter?: TypeMacro;
    leave?: TypeMacro;
}, fnType?: TsFunctionType$1 | string): MacroPlugin;
declare function createTmplMacro(tag: string, f: TmplMacro | {
    enter?: TmplMacro;
    leave?: TmplMacro;
}, returnType?: string | TsType$1): MacroPlugin;
declare function createLabeledMacro(label: string, f: LabeledMacro | {
    enter?: LabeledMacro;
    leave?: LabeledMacro;
}): MacroPlugin;

declare var $Eval: MacroPluginWithProxy;
declare const printAst: (ast: object) => string;
declare var $Ast: MacroPluginWithProxy;
declare var $Env: MacroPluginWithProxy;
declare var $Stringify: MacroPluginWithProxy;
declare var $Span: MacroPluginWithProxy;
declare var $Line: MacroPluginWithProxy;
declare var $Column: MacroPluginWithProxy;
declare var $ID: MacroPluginWithProxy;
declare var $UnImplemented: MacroPluginWithProxy;
declare var $Todo: MacroPluginWithProxy;
declare var $UnReachable: MacroPluginWithProxy;
declare var $Include: MacroPluginWithProxy;
declare var $IncludeStr: MacroPluginWithProxy;
declare var $IncludeJSON: MacroPluginWithProxy;
declare var $WriteFile: MacroPluginWithProxy;
declare var $Concat: MacroPluginWithProxy;
declare const printTmpl: (strings: string[], exprs: Expression$1[]) => string;
declare const printRawTmpl: (strings: string[], exprs: unknown[]) => string;
declare var $Expr: MacroPlugin;
declare var $Quote: MacroPlugin;

declare function isMacroPlugin(v: unknown): boolean;
declare function isMacroProxy(v: unknown): boolean;
declare function hash(str: string): string;
declare function getSpanOffset(): number;
declare function hashMap(map: object): string;
declare function isRegExp<T extends object>(input: T): boolean;
declare function isNode<T>(value: T): boolean;
declare const noop: () => void;
declare const span: {
    start: number;
    end: number;
    ctxt: number;
};
declare function markedNode<T extends object>(marker: string, node: T): T;
declare function unMarkNode<T extends object>(node: T): T;
declare function evalExpr<T = unknown>(expr: string): T;
declare function evalAst<F = Function>(expr: Expression$1): F;
declare function createLit(this: WalkContext, value: unknown): BaseNode;
declare function flatExpr(f: Function | FunctionDeclaration$1 | FunctionExpression$1 | ArrowFunctionExpression$1, args: Expression$1[], typeParams?: TsType$1[], optional?: boolean): Expression$1;
declare function createWalkPlugin(plugins: MacroPlugin | MacroPlugin[]): WalkPlugin;
declare function genConstType(name: string, typeAnnotation: TsType$1): VariableDeclaration$1;
declare function genTypeImport(lib: string, mod: string, kind?: string): VariableDeclaration$1;
declare function genTsRef(name: string): TsTypeReference$1;
declare function guessType(value: unknown): TsType$1;
declare function genImportSpecifier(name: string, isDefault?: boolean): ImportSpecifier$1 | ImportDefaultSpecifier$1;
declare function genExportSpecifier(name: string, isNamespace?: boolean): ExportSpecifier$1 | ExportNamespaceSpecifier$1;

export { $Ast, $Column, $Concat, $Env, $Eval, $Expr, $ExprMacro, $ID, $Include, $IncludeJSON, $IncludeStr, $LabeledMacro, $Line, $LitMacro, $Macro, $Quote, $Span, $Stringify, $TmplMacro, $Todo, $TypeMacro, $UnImplemented, $UnReachable, $WriteFile, BaseNode, Config, ExprMacro, GlobalMacro, GlobalMacroPlugin, LabeledMacro, MacroOptions, MacroPlugin, MacroPluginWithProxy, ScopeVar, TmplMacro, TrackFunc, TypeMacro, WalkContext, WalkFunc, WalkPlugin, Walker, createExprMacro, createLabeledBlock, createLabeledExpr, createLabeledMacro, createLit, createLitMacro, createMacro, createProxyMacro, createSwcPlugin, createTmplMacro, createTypeMacro, createWalkPlugin, defineConfig, evalAst, evalExpr, flatExpr, genConstType, genExportSpecifier, genImportSpecifier, genTsRef, genTypeImport, getSpanOffset, guessType, hash, hashMap, isMacroPlugin, isMacroProxy, isNode, isRegExp, macro, markedNode, noop, parseExpr, parseType, print, printAst, printAsync, printExpr, printExprAsync, printRawTmpl, printTmpl, printType, printTypeAsync, span, transform, transformAst, transformAsync, unMarkNode, walk };
