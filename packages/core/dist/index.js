'use strict';

var core = require('@swc/core');
var fs = require('fs');

const dummySpan = {
    start: 0,
    end: 0,
    ctxt: 0,
};
const defaultGlobalExpr = {
    type: "TsFunctionType",
    span: dummySpan,
    params: [
        {
            type: "RestElement",
            span: dummySpan,
            rest: dummySpan,
            argument: {
                type: "Identifier",
                span: dummySpan,
                value: "args",
                optional: false,
            },
            typeAnnotation: {
                type: "TsTypeAnnotation",
                span: dummySpan,
                typeAnnotation: {
                    type: "TsArrayType",
                    span: dummySpan,
                    elemType: {
                        type: "TsTypeReference",
                        span: dummySpan,
                        typeName: {
                            type: "Identifier",
                            span: dummySpan,
                            value: "T",
                            optional: false
                        },
                    }
                }
            }
        }
    ],
    typeParams: {
        type: "TsTypeParameterDeclaration",
        span: dummySpan,
        parameters: [
            {
                type: "TsTypeParameter",
                span: dummySpan,
                name: {
                    type: "Identifier",
                    span: dummySpan,
                    value: "T",
                    optional: false
                },
                in: false,
                out: false,
            }
        ]
    },
    typeAnnotation: {
        type: "TsTypeAnnotation",
        span: dummySpan,
        typeAnnotation: {
            type: "TsTypeReference",
            span: dummySpan,
            typeName: {
                type: "Identifier",
                span: dummySpan,
                value: "T",
                optional: false
            },
        }
    }
};
const defaultGlobalType = {
    type: "TsFunctionType",
    span: dummySpan,
    params: [],
    typeParams: {
        type: "TsTypeParameterDeclaration",
        span: dummySpan,
        parameters: [
            {
                type: "TsTypeParameter",
                span: dummySpan,
                name: {
                    type: "Identifier",
                    span: dummySpan,
                    value: "T",
                    optional: false
                },
                in: false,
                out: false,
            }
        ]
    },
    typeAnnotation: {
        type: "TsTypeAnnotation",
        span: dummySpan,
        typeAnnotation: {
            type: "TsTypeReference",
            span: dummySpan,
            typeName: {
                type: "Identifier",
                span: dummySpan,
                value: "T",
                optional: false
            },
        }
    }
};
const defaultGlobalTmpl = {
    type: "TsKeywordType",
    span: dummySpan,
    kind: "string"
};

function extractExpr(stmt) {
    if (stmt && stmt.type === "ExpressionStatement" && stmt.expression.type === "ParenthesisExpression")
        return stmt.expression.expression;
    return {
        type: "Invalid",
        span: dummySpan
    };
}
function parseExpr(expr, options) {
    return extractExpr(core.parseSync("(" + expr + ")", options).body[0]);
}
function parseType(ty, options) {
    return core.parseSync(`type A = ${ty}`, Object.assign(Object.assign({}, options), { syntax: "typescript" })).body[0].typeAnnotation;
}

/**
 * Turns an AST into code, maintaining sourcemaps, user preferences, and valid output.
 * @param ast - the abstract syntax tree from which to generate output code.
 * @param options - used for specifying options for code generation.
 * @returns - an object containing the output code and source map.
 */
function print(ast, options) {
    const { code, map } = core.printSync({
        type: "Script",
        span: dummySpan,
        body: Array.isArray(ast) ? ast : [ast],
    }, options);
    return { code: code.trim(), map };
}
async function printAsync(ast, options) {
    const { code, map } = await core.print({
        type: "Script",
        span: dummySpan,
        body: Array.isArray(ast) ? ast : [ast],
    }, options);
    return { code: code.trim(), map };
}
function printExpr(expr, options) {
    const { code, map } = print({
        type: "ExpressionStatement",
        span: dummySpan,
        expression: expr
    }, options);
    return { code: code.replace(/\s*;\s*$/, ""), map };
}
async function printExprAsync(expr, options) {
    const { code, map } = await printAsync({
        type: "ExpressionStatement",
        span: dummySpan,
        expression: expr
    }, options);
    return { code: code.replace(/\s*;\s*$/, ""), map };
}
function printType(ty, options) {
    const { code, map } = print({
        type: "TsTypeAliasDeclaration",
        span: dummySpan,
        declare: false,
        id: {
            type: "Identifier",
            span: dummySpan,
            value: "__PrintType__",
            optional: false
        },
        typeAnnotation: ty,
    }, options);
    return { code: code.replace(/\s*type\s+__PrintType__\s*=\s*/, "").replace(/\s*;\s*$/, ""), map };
}
async function printTypeAsync(ty, options) {
    const { code, map } = await printAsync({
        type: "TsTypeAliasDeclaration",
        span: dummySpan,
        declare: false,
        id: {
            type: "Identifier",
            span: dummySpan,
            value: "__PrintType__",
            optional: false
        },
        typeAnnotation: ty,
    }, options);
    return { code: code.replace(/\s*type\s+__PrintType__\s*=\s*/, "").replace(/\s*;\s*$/, ""), map };
}

function defineConfig(config) {
    return config;
}
function createMacro(macro) {
    Reflect.set(macro, "__macro_plugin__", true);
    return macro;
}
function createProxyMacro(macro) {
    return new Proxy(macro, {
        get(macro, p) {
            if (p === "proxy") {
                return (runtime) => new Proxy(runtime, {
                    ownKeys(target) {
                        return [...Reflect.ownKeys(macro), ...Reflect.ownKeys(target)];
                    },
                    has(target, p) {
                        return Reflect.has(macro, p) || Reflect.has(target, p);
                    },
                    get(target, p) {
                        return p === "__macro_proxy__" || p === "__macro_plugin__" || Reflect.get(macro, p) || Reflect.get(target, p);
                    },
                });
            }
            return p === "__macro_plugin__" || Reflect.get(macro, p);
        },
    });
}
function createLitMacro(arg, value, typeAnnotation) {
    return createMacro(typeof arg === "string"
        ? {
            Module() {
                this.declareGlobalConst(arg, typeAnnotation || guessType(value));
            },
            Identifier(ast) {
                if (ast.value === arg && !this.track(arg)) {
                    this.replace(createLit.apply(this, [value]));
                    this.skip();
                }
            }
        }
        : {
            Module() {
                let t;
                for (const [k, v] of Object.entries(arg)) {
                    if (value && Object.keys(value).includes(k)) {
                        t = value[k];
                        this.declareGlobalConst(k, t);
                    }
                    else {
                        this.declareGlobalConst(k, guessType(v));
                    }
                }
            },
            Identifier(ast) {
                if (ast.value in arg && !this.track(ast.value)) {
                    this.replace(createLit.apply(this, [arg[ast.value]]));
                    this.skip();
                }
            }
        });
}
function createExprMacro(name, f, fnType = defaultGlobalExpr) {
    if (typeof f === "object") {
        return createProxyMacro({
            Module() {
                this.declareGlobalConst(name, fnType);
            },
            CallExpression: {
                enter(ast) {
                    var _a;
                    if (f.enter && ast.callee.type === "Identifier" && ast.callee.value === name) { // && !this.track(ast.callee.value)) {
                        return f.enter.apply(this, [ast.arguments.map(i => i.expression), (_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params, ast.callee.optional]);
                    }
                },
                leave(ast) {
                    var _a;
                    if (f.leave && ast.callee.type === "Identifier" && ast.callee.value === name) { // && !this.track(ast.callee.value)) {
                        return f.leave.apply(this, [ast.arguments.map(i => i.expression), (_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params, ast.callee.optional]);
                    }
                }
            }
        });
    }
    return createProxyMacro({
        Module() {
            this.declareGlobalConst(name, fnType);
        },
        CallExpression(ast) {
            var _a;
            if (ast.callee.type === "Identifier" && ast.callee.value === name) { // && !this.track(ast.callee.value)) {
                const args = ast.arguments.map(i => i.expression);
                const tys = (_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params;
                return f.toString().startsWith("function") ? f.apply(this, [args, tys, ast.callee.optional]) : flatExpr(f, args, tys, ast.callee.optional);
            }
        }
    });
}
function createTypeMacro(name, f, fnType = defaultGlobalType) {
    if (typeof f === "object") {
        return createMacro({
            Module() {
                this.declareGlobalConst(name, fnType);
            },
            CallExpression: {
                enter(ast) {
                    var _a;
                    if (f.enter && ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
                        if (ast.arguments.length > 0)
                            throw new Error("TypeMacro doesn't support call with args.");
                        return f.enter.apply(this, [(_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params, ast.callee.optional]);
                    }
                },
                leave(ast) {
                    var _a;
                    if (f.leave && ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
                        if (ast.arguments.length > 0)
                            throw new Error("TypeMacro doesn't support call with args.");
                        return f.leave.apply(this, [(_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params, ast.callee.optional]);
                    }
                }
            }
        });
    }
    return createMacro({
        Module() {
            this.declareGlobalConst(name, fnType);
        },
        CallExpression(ast) {
            var _a;
            if (ast.callee.type === "Identifier" && ast.callee.value === name && !this.track(ast.callee.value)) {
                if (ast.arguments.length > 0)
                    throw new Error("TypeMacro doesn't support call with args.");
                const tys = (_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params;
                return f.apply(this, [tys, ast.callee.optional]);
            }
        }
    });
}
function createTmplMacro(tag, f, returnType = defaultGlobalTmpl) {
    return createProxyMacro({
        Module() {
            this.declareGlobalConst(tag, {
                type: "TsFunctionType",
                span: dummySpan,
                params: [
                    {
                        type: "Identifier",
                        span: dummySpan,
                        value: "strings",
                        optional: false,
                        typeAnnotation: {
                            type: "TsTypeAnnotation",
                            span: dummySpan,
                            typeAnnotation: {
                                type: "TsTypeReference",
                                span: dummySpan,
                                typeName: {
                                    type: "Identifier",
                                    span: dummySpan,
                                    value: "TemplateStringsArray",
                                    optional: false
                                },
                            }
                        }
                    },
                    {
                        type: "RestElement",
                        span: dummySpan,
                        rest: dummySpan,
                        argument: {
                            type: "Identifier",
                            span: dummySpan,
                            value: "expressions",
                            optional: false,
                        },
                        typeAnnotation: {
                            type: "TsTypeAnnotation",
                            span: dummySpan,
                            typeAnnotation: {
                                type: "TsArrayType",
                                span: dummySpan,
                                elemType: {
                                    type: "TsKeywordType",
                                    span: dummySpan,
                                    kind: "unknown"
                                }
                            }
                        }
                    }
                ],
                typeAnnotation: {
                    type: "TsTypeAnnotation",
                    span: dummySpan,
                    typeAnnotation: typeof returnType === "string" ? this.parseType(returnType) : returnType
                }
            });
        },
        TaggedTemplateExpression: {
            enter(ast) {
                var _a;
                if (ast.tag.type === "Identifier" && ast.tag.value === tag)
                    return (_a = (typeof f === "object" ? f.enter : f)) === null || _a === void 0 ? void 0 : _a.apply(this, [ast.template.quasis.map(i => i.raw), ...ast.template.expressions]);
            },
            leave(ast) {
                if (typeof f === "object" && f.leave && ast.tag.type === "Identifier")
                    return f.leave.apply(this, [ast.template.quasis.map(i => i.raw), ...ast.template.expressions]);
            }
        }
    });
}
function createLabeledMacro(label, f) {
    return createMacro({
        LabeledStatement: {
            enter(ast, parent, prop, index) {
                var _a;
                if (ast.label.value === label)
                    return (_a = (typeof f === "object" ? f.enter : f)) === null || _a === void 0 ? void 0 : _a.apply(this, [ast.body, parent, prop, index]);
            },
            leave(ast, parent, prop, index) {
                var _a;
                if (ast.label.value === label && typeof f === "object")
                    return (_a = f.leave) === null || _a === void 0 ? void 0 : _a.apply(this, [ast.body, parent, prop, index]);
            }
        }
    });
}

// handle external macro plugins
var externalsPlugin = createMacro({
    enter(ast) {
        if (ast.type === "ImportDeclaration" && !ast.typeOnly && !ast.asserts) {
            if (typeof this.config.externals === "object") {
                const macroDict = this.config.externals[ast.source.value];
                let plugin;
                if (macroDict) {
                    for (const specifier of ast.specifiers) {
                        if (specifier.type === "ImportSpecifier") {
                            plugin = macroDict[specifier.local.value];
                            if (plugin)
                                this.addPlugin(plugin);
                        }
                        else if (specifier.type === "ImportDefaultSpecifier") {
                            // TODO: this may have problem when changing import name
                            plugin = macroDict.default;
                            if (plugin)
                                this.addPlugin(plugin);
                        }
                        else if (specifier.type === "ImportNamespaceSpecifier") {
                            const keys = Object.keys(macroDict);
                            this.addPlugin(Object.values(macroDict));
                            this.addPlugin({
                                MemberExpression(ast) {
                                    if (ast.object.type === "Identifier" && ast.object.value === specifier.local.value && ast.property.type === "Identifier" && keys.includes(ast.property.value)) {
                                        return ast.property;
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }
    }
});

var trackPlugin = createMacro({
    enter(ast) {
        const scopeVars = this.get("scopeVars", [[]]);
        function pushIdentifier(node, value = undefined) {
            var _a, _b;
            if (node.type === "Identifier") {
                // @ts-ignore
                (_a = scopeVars[scopeVars.length - 1]) === null || _a === void 0 ? void 0 : _a.push({ name: node.value, value, marker: node.marker });
            }
            else if (node.type === "PrivateName") {
                // @ts-ignore
                (_b = scopeVars[scopeVars.length - 1]) === null || _b === void 0 ? void 0 : _b.push({ name: node.id.value, value, marker: node.marker, private: true });
            }
            else {
                throw new Error(`Unhandled type ${node.type}!`);
            }
        }
        function pushObjectPattern(obj) {
            for (const el of obj.properties) {
                if (el.type === "AssignmentPatternProperty") {
                    pushIdentifier(el.key);
                }
                else if (el.type === "RestElement") {
                    pushIdentifier(el.argument);
                }
            }
        }
        function pushArrayPattern(array) {
            for (const el of array.elements) {
                if (!el)
                    continue;
                if (el.type === "Identifier") {
                    pushIdentifier(el);
                }
                else if (el.type === "RestElement") {
                    pushIdentifier(el.argument);
                }
                else if (el.type === "ObjectPattern") {
                    pushObjectPattern(el);
                }
                else if (el.type === "ArrayPattern") {
                    pushArrayPattern(el);
                }
            }
        }
        function pushAssignPattern(i) {
            if (i.left.type === "Identifier") {
                pushIdentifier(i.left, i.right);
            }
            else if (i.left.type === "ArrayPattern") {
                pushArrayPattern(i.left);
            }
            else if (i.left.type === "ObjectPattern") {
                pushObjectPattern(i.left);
            }
        }
        function pushParams(params) {
            scopeVars.push([]);
            for (const p of params) {
                switch (p.type) {
                    case "Identifier":
                        pushIdentifier(p);
                        break;
                    case "RestElement":
                        pushIdentifier(p.argument);
                        break;
                    case "AssignmentPattern":
                        pushAssignPattern(p);
                        break;
                }
            }
        }
        if (ast.type === "FunctionDeclaration") {
            pushIdentifier(ast.identifier, ast);
            pushParams(ast.params.map(i => i.pat));
        }
        else if (ast.type === "FunctionExpression") {
            pushParams(ast.params.map(i => i.pat));
        }
        else if (ast.type === "ArrowFunctionExpression") {
            pushParams(ast.params);
        }
        else if (ast.type === "ClassDeclaration") {
            pushIdentifier(ast.identifier, ast);
        }
        else if (ast.type === "ClassMethod") {
            pushIdentifier(ast.key);
            pushParams(ast.function.params.map(i => i.pat));
        }
        else if (ast.type === "PrivateMethod") {
            pushIdentifier(ast.key.id);
            pushParams(ast.function.params.map(i => i.pat));
        }
        else if (ast.type === "VariableDeclaration") {
            for (const d of ast.declarations) {
                if (d.id.type === "Identifier") {
                    // var a = v;
                    pushIdentifier(d.id, d.init);
                }
                else if (d.id.type === "ArrayPattern") {
                    // var [a, b, ...c] = v;
                    pushArrayPattern(d.id);
                }
                else if (d.id.type === "ObjectPattern") {
                    // var {a, b, ...c} = v;
                    pushObjectPattern(d.id);
                }
            }
        }
        else if (ast.type === "CatchClause") {
            scopeVars.push([]);
            const param = ast.param;
            if (param) {
                if (param.type === "Identifier") {
                    pushIdentifier(param);
                }
                else if (param.type === "ArrayPattern") {
                    pushArrayPattern(param);
                }
                else if (param.type === "ObjectPattern") {
                    pushObjectPattern(param);
                }
            }
        }
        else if (ast.type === "ImportDeclaration") {
            for (const s of ast.specifiers) {
                pushIdentifier(s.local);
            }
        }
    },
    leave(ast) {
        if (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression", "ClassDeclaration", "ClassMethod", "ClassPrivateMethod"].includes(ast.type) || ast.type === "CatchClause") {
            this.get("scopeVars", [[]]).pop();
        }
    }
});

class Walker {
    constructor({ enter, leave }, src, config = {}, enableTracker = false) {
        this.node = { type: "Invalid", span: dummySpan };
        this.data = {};
        this.imports = [];
        this.exports = [];
        this.prepends = [];
        this.appends = [];
        this.globalDts = [];
        this.moduleDts = [];
        this.references = [];
        this.prependDts = [];
        this.appendDts = [];
        this.importHashes = {};
        this.exportHashes = {};
        this.enters = [];
        this.leaves = [];
        this.enableTracker = false;
        this.spanOffset = 0;
        this.set = (key, value) => { this.data[key] = value; };
        this.get = (key, defaultValue) => {
            if (!(key in this.data))
                this.data[key] = defaultValue;
            return this.data[key] || defaultValue;
        };
        this.import = (pkg, source, isDefault = false) => {
            let h;
            const pushImport = (specifiers, source) => {
                this.imports.push({
                    type: "ImportDeclaration",
                    specifiers,
                    source: {
                        type: "StringLiteral",
                        value: source,
                        span: dummySpan
                    },
                    typeOnly: false,
                    span: dummySpan,
                });
                this.importHashes[h] = true;
            };
            if (source == null && typeof pkg === "string") {
                h = hashMap({ pkg });
                if (!(h in this.importHashes))
                    pushImport([], pkg);
                return;
            }
            for (const s of (typeof pkg === "string" ? [pkg] : pkg)) {
                h = hashMap({ s, source, isDefault });
                if (!(h in this.importHashes))
                    pushImport([genImportSpecifier(s, isDefault)], source);
            }
        };
        this.export = (pkg, source, isNamespace = false) => {
            let h;
            for (const s of (typeof pkg === "string" ? [pkg] : pkg)) {
                h = hashMap({ s, source, isNamespace });
                if (!(h in this.exportHashes)) {
                    this.exports.push({
                        type: "ExportNamedDeclaration",
                        specifiers: [
                            genExportSpecifier(s, isNamespace)
                        ],
                        source: source == null
                            ? undefined
                            : {
                                type: "StringLiteral",
                                value: source,
                                span: dummySpan
                            },
                        typeOnly: false,
                        span: dummySpan
                    });
                    this.exportHashes[h] = true;
                }
            }
        };
        this.prepend = (stmts) => this.prepends.push(...stmts);
        this.append = (stmts) => this.appends.push(...stmts);
        this.addPlugin = (macro) => {
            const { enter, leave } = createWalkPlugin(macro);
            enter && this.enters.push(enter);
            leave && this.leaves.push(leave);
        };
        this.declareModule = (id, body) => this.moduleDts.push({
            type: "TsModuleDeclaration",
            span: dummySpan,
            declare: true,
            global: false,
            id: {
                type: "StringLiteral",
                span: dummySpan,
                value: id,
            },
            body: {
                type: "TsModuleBlock",
                span: dummySpan,
                body: Array.isArray(body) ? body : [body]
            }
        });
        this.declareGlobal = (body) => Array.isArray(body) ? this.globalDts.push(...body) : this.globalDts.push(body);
        this.declareGlobalConst = (name, ty) => this.declareGlobal(genConstType(name, typeof ty === "string" ? parseType(ty) : ty));
        this.declareReference = ({ types, path }) => this.references.push({ types, path });
        this.declarePrepend = (stmts) => this.prependDts.push(...stmts);
        this.declareAppend = (stmts) => this.appendDts.push(...stmts);
        this.defaultContext = {
            cursor: () => {
                const { start, end } = this.node.span;
                return [start > this.spanOffset ? start - this.spanOffset - 1 : 0, end > this.spanOffset ? end - this.spanOffset - 1 : 0];
            },
            span: (ctxt = undefined) => {
                const { start, end, ctxt: _ctxt } = this.node.span;
                return { start: start > this.spanOffset ? start - this.spanOffset - 1 : 0, end: end > this.spanOffset ? end - this.spanOffset - 1 : 0, ctxt: ctxt !== null && ctxt !== void 0 ? ctxt : _ctxt };
            },
            set: this.set,
            get: this.get,
            track: this.track,
            import: this.import,
            export: this.export,
            prepend: this.prepend,
            append: this.append,
            parseExpr,
            parseType,
            parse: (src, options) => core.parseSync(src, options).body,
            printExpr: (expr) => printExpr(expr).code,
            printType: (ty) => printType(ty).code,
            addPlugin: this.addPlugin,
            startTracking: () => (this.enableTracker = true),
            stopTracking: () => (this.enableTracker = false),
            declareAppend: this.declareAppend,
            declareGlobal: this.declareGlobal,
            declareModule: this.declareModule,
            declarePrepend: this.declarePrepend,
            declareReference: this.declareReference,
            declareGlobalConst: this.declareGlobalConst
        };
        enter && this.enters.push(enter);
        leave && this.leaves.push(leave);
        this.src = src;
        this.config = config;
        this.enableTracker = enableTracker;
    }
    walkSingle(n, parent, prop, index) {
        let _replaced;
        let _skipped;
        let _removed;
        let _skipCount = 0;
        this.node = n;
        const ctx = Object.assign(Object.assign({ src: this.src, config: this.config }, this.defaultContext), { skip: () => {
                _skipped = true;
            }, print: (ast) => print((ast || n)).code, remove: () => {
                if (parent && prop) {
                    if (index != null) {
                        parent[prop].splice(index, 1);
                    }
                    else {
                        // @ts-ignore
                        delete parent[prop];
                    }
                }
                _removed = true;
            }, replace: (newNode) => {
                if (parent && prop) {
                    if (index != null) {
                        if (Array.isArray(newNode)) {
                            parent[prop].splice(index, 1, ...newNode);
                            _skipCount = newNode.length - 1;
                        }
                        else {
                            parent[prop][index] = newNode;
                        }
                    }
                    else {
                        // @ts-ignore
                        parent[prop] = newNode;
                    }
                    _replaced = newNode;
                }
            } });
        this.config.externals && externalsPlugin.enter.apply(ctx, [n, parent, prop, index]);
        this.enableTracker && trackPlugin.enter.apply(ctx, [n, parent, prop, index]);
        this.enters.forEach(f => f.apply(ctx, [n, parent, prop, index]));
        if (Array.isArray(_replaced)) {
            this.walkMany(_replaced, parent);
        }
        else if (!_skipped && !_removed) {
            for (const [k, v] of Object.entries(_replaced || n)) {
                if (!v)
                    continue;
                if (Array.isArray(v)) {
                    this.walkMany(v, n, k);
                }
                else if (v.type) {
                    this.walkSingle(v, n, k);
                }
            }
        }
        this.leaves.forEach(f => f.apply(ctx, [n, parent, prop, index]));
        this.enableTracker && trackPlugin.leave.apply(ctx, [n, parent, prop, index]);
        return _skipCount;
    }
    walkMany(nodes, parent, prop) {
        let skipCount = 0;
        for (let i = 0; i < nodes.length; i++) {
            if (skipCount > 0) {
                skipCount -= 1;
                continue;
            }
            skipCount = this.walkSingle(nodes[i], parent, prop, i);
        }
    }
    walk(n, spanOffset = 0) {
        this.spanOffset = spanOffset;
        if (Array.isArray(n)) {
            this.walkMany(n);
        }
        else if (n.type) {
            this.walkSingle(n);
        }
        if (!Array.isArray(n) && (n.type === "Module" || n.type === "Script")) {
            const _imports = [];
            const _exports = [];
            const _stmts = [];
            for (const i of n.body) {
                if (["ImportDeclaration"].includes(i.type)) {
                    _imports.push(i);
                }
                else if (["ExportDeclaration", "ExportNamedDeclaration", "ExportDefaultDeclaration", "ExportAllDeclaration"].includes(i.type)) {
                    _exports.push(i);
                }
                else {
                    _stmts.push(i);
                }
            }
            n.body = [..._imports, ...this.imports, ...this.prepends, ..._stmts, ...this.appends, ..._exports, ...this.exports];
        }
        return n;
    }
    emit() {
        const refs = [];
        let o;
        for (const r of this.references) {
            o = "/// <reference ";
            if (r.types)
                o += `types="${r.types}"`;
            if (r.path)
                o += `path="${r.path}"`;
            o += " />\n";
            refs.push(o);
        }
        const globalDts = this.globalDts.length > 0
            ? {
                type: "TsModuleDeclaration",
                span: dummySpan,
                declare: true,
                global: true,
                id: {
                    type: "Identifier",
                    span: dummySpan,
                    value: "global",
                    optional: false
                },
                body: {
                    type: "TsModuleBlock",
                    span: dummySpan,
                    body: this.globalDts
                }
            }
            : undefined;
        return (refs.length > 0 ? refs.join("") : "") + print([
            ...this.prependDts,
            ...(globalDts ? [globalDts] : []),
            ...this.moduleDts,
            ...this.appendDts
        ]).code.replace(/declare module global/g, "declare global") + "\nexport {}\n";
    }
    track(name) {
        let v;
        const scopeVars = this.get("scopeVars", [[]]);
        for (let y = scopeVars.length - 1; y >= 0; y--) {
            v = scopeVars[y];
            for (let x = v.length - 1; x >= 0; x--) {
                if (v[x].name === name)
                    return v[x];
            }
        }
        return undefined;
    }
}
function walk(n, plugin) {
    const base = new Walker(plugin);
    return base.walk(n);
}

function isMacroPlugin(v) {
    return !!(v && v.__macro_plugin__);
}
function isMacroProxy(v) {
    return !!(v && v.__macro_proxy__);
}
function hash(str) {
    str = str.replace(/\r/g, "");
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return (hash >>> 0).toString(36);
}
function getSpanOffset() {
    return core.parseSync("").span.end;
}
function hashMap(map) {
    return hash(JSON.stringify(map));
}
function isRegExp(input) {
    return Object.prototype.toString.call(input) === "[object RegExp]";
}
function isNode(value) {
    return value && typeof value === "object" && "type" in value;
}
const noop = () => { };
function markedNode(marker, node) {
    // @ts-ignore
    node.marker = marker;
    return node;
}
function unMarkNode(node) {
    // @ts-ignore
    delete node.marker;
    return node;
}
function evalExpr(expr) {
    // eslint-disable-next-line no-new-func
    return (new Function(`return (${expr})`))();
}
function evalAst(expr) {
    return evalExpr(printExpr(expr).code);
}
function createLit(value) {
    if (value === undefined) {
        return {
            type: "Identifier",
            span: dummySpan,
            value: "undefined",
            optional: false
        };
    }
    if (value && typeof value === "object") {
        if (isRegExp(value))
            return this.parseExpr(value.toString());
        if ("span" in value && "type" in value)
            return value;
    }
    if (typeof value === "function")
        return this.parseExpr(value.toString());
    return this.parseExpr(JSON.stringify(value));
}
function flatExpr(f, args, typeParams, optional = false) {
    if (optional)
        throw new Error("optional is not supported.");
    const ast = typeof f === "object" ? f : parseExpr(f.toString());
    const params = {};
    ast.params.forEach((p, i) => {
        const pat = ast.type === "ArrowFunctionExpression" ? p : (p.pat);
        if (pat.type === "Identifier") {
            params[pat.value] = args[i] ? { value: args[i] } : {};
        }
        else if (pat.type === "AssignmentPattern") {
            if (pat.left.type === "Identifier") {
                params[pat.left.value] = { value: args[i] || pat.right };
            }
        }
    });
    let output = {
        type: "Invalid",
        span: dummySpan
    };
    if (ast.body) {
        walk(ast.body, {
            // @ts-ignore
            enter(ast) {
                if (ast.type === "Identifier" && ast.value in params) {
                    const v = params[ast.value].value;
                    if (v)
                        this.replace(v);
                }
            },
            // @ts-ignore
            leave(ast) {
                if (ast.type === "ReturnStatement" && ast.argument) {
                    output = ast.argument;
                }
            }
        });
        if (ast.body.type !== "BlockStatement")
            output = ast.body;
    }
    return output;
}
function createWalkPlugin(plugins) {
    if (!Array.isArray(plugins))
        plugins = [plugins];
    return {
        enter(node, parent, prop, index) {
            let r, e;
            const run = (fn) => {
                r = fn.apply(this, [node, parent, prop, index]);
                if (r)
                    this.replace(r);
            };
            for (const p of plugins) {
                if (typeof p === "function" && !isMacroProxy(p)) {
                    run(p);
                    continue;
                }
                if (p.enter)
                    run(p.enter);
                if (node.type in p) {
                    e = p[node.type];
                    if (typeof e === "function") {
                        run(e);
                    }
                    else if (typeof e === "object" && e.enter) {
                        run(e.enter);
                    }
                }
            }
        },
        leave(node, parent, prop, index) {
            let r, e;
            const run = (fn) => {
                r = fn.apply(this, [node, parent, prop, index]);
                if (r)
                    this.replace(r);
            };
            for (const p of plugins) {
                if (typeof p !== "object")
                    continue;
                if (p.leave)
                    run(p.leave);
                if (node.type in p) {
                    e = p[node.type];
                    if (typeof e === "object" && e.leave)
                        run(e.leave);
                }
            }
        }
    };
}
function genConstType(name, typeAnnotation) {
    return {
        type: "VariableDeclaration",
        span: dummySpan,
        kind: "const",
        declare: false,
        declarations: [
            {
                type: "VariableDeclarator",
                span: dummySpan,
                id: {
                    type: "Identifier",
                    span: dummySpan,
                    value: name,
                    optional: false,
                    typeAnnotation: {
                        type: "TsTypeAnnotation",
                        span: dummySpan,
                        typeAnnotation
                    }
                },
                definite: false
            }
        ]
    };
}
function genTypeImport(lib, mod, kind = "const") {
    return {
        type: "VariableDeclaration",
        span: dummySpan,
        kind,
        declare: false,
        declarations: [
            {
                type: "VariableDeclarator",
                span: dummySpan,
                id: {
                    type: "Identifier",
                    span: dummySpan,
                    value: mod,
                    optional: false,
                    typeAnnotation: {
                        type: "TsTypeAnnotation",
                        span: dummySpan,
                        typeAnnotation: {
                            type: "TsTypeQuery",
                            span: dummySpan,
                            exprName: {
                                type: "TsImportType",
                                span: dummySpan,
                                argument: {
                                    type: "StringLiteral",
                                    span: dummySpan,
                                    value: lib,
                                },
                                qualifier: {
                                    type: "Identifier",
                                    span: dummySpan,
                                    value: mod,
                                    optional: false
                                },
                            },
                        }
                    }
                },
                definite: false
            }
        ]
    };
}
function genTsRef(name) {
    return {
        type: "TsTypeReference",
        span: dummySpan,
        typeName: {
            type: "Identifier",
            span: dummySpan,
            value: name,
            optional: false
        }
    };
}
function guessType(value) {
    let t = typeof value;
    if (t === "function")
        return defaultGlobalExpr;
    if (t === "symbol")
        return genTsRef("Symbol");
    if (t === "object" && isRegExp(value))
        return genTsRef("RegExp");
    if (value === null)
        t = "null";
    return {
        type: "TsKeywordType",
        span: dummySpan,
        kind: t
    };
}
function genImportSpecifier(name, isDefault = false) {
    const local = {
        type: "Identifier",
        value: name,
        span: dummySpan,
        optional: false
    };
    if (isDefault) {
        return {
            type: "ImportDefaultSpecifier",
            local,
            span: dummySpan
        };
    }
    return {
        type: "ImportSpecifier",
        local,
        span: dummySpan,
        isTypeOnly: false
    };
}
function genExportSpecifier(name, isNamespace = false) {
    const orig = {
        type: "Identifier",
        value: name,
        span: dummySpan,
        optional: false
    };
    if (isNamespace) {
        return {
            type: "ExportNamespaceSpecifier",
            name: orig,
            span: dummySpan
        };
    }
    return {
        type: "ExportSpecifier",
        orig,
        span: dummySpan,
        isTypeOnly: false
    };
}

function createSwcPlugin(config, src, spanOffset = 0) {
    return (program) => {
        var _a;
        const walker = new Walker(createWalkPlugin(config.macros || []), src, config, true);
        program = walker.walk(program, spanOffset);
        if (config.emitDts) {
            const dts = walker.emit();
            (_a = config.onEmitDts) === null || _a === void 0 ? void 0 : _a.call(config, dts);
            program.dts = dts;
        }
        return program;
    };
}
function transformAst(ast, config, src, spanOffset = 0) {
    return createSwcPlugin(config, src, spanOffset)(ast);
}
/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
function transform(code, config) {
    var _a;
    const spanOffset = getSpanOffset();
    const ast = transformAst(core.parseSync(code, (_a = config.jsc) === null || _a === void 0 ? void 0 : _a.parser), config, code, spanOffset);
    const dts = ast.dts;
    if (dts)
        delete ast.dts;
    return Object.assign(Object.assign({}, core.printSync(ast)), { ast: ast, dts });
}
/**
 * Transform code with your labeled macro plugins.
 * @param code - input source code.
 * @param config - an object containing your macro config.
 * @returns - an object containing the output code and source map.
 */
async function transformAsync(code, config) {
    var _a;
    const spanOffset = getSpanOffset();
    const parsed = await core.parse(code, (_a = config.jsc) === null || _a === void 0 ? void 0 : _a.parser);
    const ast = transformAst(parsed, config, code, spanOffset);
    const result = await core.print(ast);
    const dts = ast.dts;
    if (dts)
        delete ast.dts;
    return Object.assign(Object.assign({}, result), { ast: ast, dts });
}

var $Macro = noop;
var $LitMacro = (i) => i;
var $ExprMacro = (f) => f;
var $TypeMacro = (f) => f;
var $TmplMacro = (f) => f;
var $LabeledMacro = noop;
const macro = createMacro({
    Module() {
        this.declareGlobal(["$Macro", "$LitMacro", "$ExprMacro", "$TypeMacro", "$TmplMacro", "$LabeledMacro"].map(i => genTypeImport("@macro-plugin/core", i, "var")));
    },
    LabeledStatement: {
        enter(ast) {
            var _a;
            if (ast.label.value !== "macro")
                return;
            this.stopTracking();
            const exprMacros = this.get("ExprMacros", {});
            const litMacros = this.get("LitMacros", {});
            const plugins = [];
            const stmts = ast.body.type === "BlockStatement" ? ast.body.stmts : [ast.body];
            const handleDecl = (pat, init) => {
                if (pat.type === "Identifier") {
                    plugins.push(createLitMacro(pat.value, init));
                }
                else if (pat.type === "ArrayPattern") {
                    pat.elements.forEach((item, index) => {
                        item && handleDecl(item, init
                            ? {
                                type: "MemberExpression",
                                span: dummySpan,
                                object: init,
                                property: {
                                    type: "Computed",
                                    span: dummySpan,
                                    expression: {
                                        type: "NumericLiteral",
                                        span: dummySpan,
                                        value: index,
                                    }
                                }
                            }
                            : undefined);
                    });
                }
                else if (pat.type === "ObjectPattern") {
                    pat.properties.forEach(item => {
                        if (item.type === "AssignmentPatternProperty" && item.value == null) {
                            handleDecl(item.key, init
                                ? {
                                    type: "MemberExpression",
                                    span: dummySpan,
                                    object: {
                                        type: "ParenthesisExpression",
                                        span: dummySpan,
                                        expression: init
                                    },
                                    property: {
                                        type: "Computed",
                                        span: dummySpan,
                                        expression: {
                                            type: "StringLiteral",
                                            span: dummySpan,
                                            value: item.key.value,
                                        }
                                    }
                                }
                                : undefined);
                        }
                        else if (item.type === "RestElement") {
                            handleDecl(item.argument, init
                                ? {
                                    type: "ArrowFunctionExpression",
                                    span: dummySpan,
                                    params: [],
                                    body: {
                                        type: "BlockStatement",
                                        span: dummySpan,
                                        stmts: [
                                            {
                                                type: "VariableDeclaration",
                                                span: dummySpan,
                                                kind: "const",
                                                declare: false,
                                                declarations: [
                                                    {
                                                        type: "VariableDeclarator",
                                                        span: dummySpan,
                                                        id: pat,
                                                        init,
                                                        definite: false
                                                    }
                                                ]
                                            },
                                            {
                                                type: "ReturnStatement",
                                                span: dummySpan,
                                                argument: item.argument
                                            }
                                        ]
                                    },
                                    async: false,
                                    generator: false,
                                }
                                : undefined);
                        }
                        else {
                            throw new Error("Unexpected Object Pattrn type.");
                        }
                    });
                }
                else {
                    throw new Error("Unexpected macro type.");
                }
            };
            for (const s of stmts) {
                if (s.type === "VariableDeclaration" && s.kind === "var") {
                    for (const d of s.declarations) {
                        if (d.id.type === "Identifier" && d.init) {
                            if (["FunctionExpression", "ArrowFunctionExpression", "FunctionDeclaration"].includes(d.init.type)) {
                                exprMacros[d.id.value] = d.init;
                            }
                            else if (d.init.type === "CallExpression" && d.init.callee.type === "Identifier") {
                                switch (d.init.callee.value) {
                                    case "$LitMacro":
                                        litMacros[d.id.value] = d.init.arguments[0].expression;
                                        break;
                                    case "$ExprMacro":
                                        plugins.push(createExprMacro(d.id.value, evalAst(d.init.arguments[0].expression)));
                                        break;
                                    case "$TmplMacro":
                                        plugins.push(createTmplMacro(d.id.value, evalAst(d.init.arguments[0].expression)));
                                        break;
                                    case "$TypeMacro":
                                        plugins.push(createTypeMacro(d.id.value, evalAst(d.init.arguments[0].expression)));
                                        break;
                                    case "$LabeledMacro":
                                    case "$Macro":
                                        throw new Error("VariableDeclaration is not expected for $Labeled and $Macro.");
                                    default:
                                        handleDecl(d.id, d.init);
                                }
                            }
                            else {
                                handleDecl(d.id, d.init);
                            }
                        }
                        else {
                            handleDecl(d.id, d.init);
                        }
                    }
                }
                else if (s.type === "ExpressionStatement" && s.expression.type === "CallExpression" && s.expression.callee.type === "Identifier") {
                    switch (s.expression.callee.value) {
                        case "$LabeledMacro":
                            if (s.expression.arguments[0].expression.type === "StringLiteral") {
                                plugins.push(createLabeledMacro(s.expression.arguments[0].expression.value, evalAst(s.expression.arguments[1].expression)));
                            }
                            else {
                                plugins.push(createLabeledMacro(((_a = s.expression.typeArguments) === null || _a === void 0 ? void 0 : _a.params[0]).literal.value, evalAst(s.expression.arguments[1].expression)));
                            }
                            break;
                        case "$Macro":
                            plugins.push(createMacro(evalAst(s.expression.arguments[0].expression)));
                            break;
                        case "$LitMacro":
                        case "$ExprMacro":
                        case "$TmplMacro":
                        case "$TypeMacro":
                            throw new Error("Expect VariableDeclaration for $Lit, $Expr, $Tmpl, $Type.");
                    }
                }
            }
            this.replace({
                type: "EmptyStatement",
                span: dummySpan
            });
            this.addPlugin(plugins);
        },
        leave(ast) {
            if (ast.label.value !== "macro")
                return;
            this.startTracking();
        }
    },
    Identifier(ast) {
        const litMacros = this.get("LitMacros", {});
        if (ast.value in litMacros) {
            this.replace(litMacros[ast.value]);
            this.skip();
        }
    },
    CallExpression(ast) {
        var _a;
        if (ast.callee.type === "Identifier") {
            const exprMacros = this.get("ExprMacros", {});
            if (ast.callee.value in exprMacros) {
                return flatExpr(exprMacros[ast.callee.value], ast.arguments.map(i => i.expression), (_a = ast.typeArguments) === null || _a === void 0 ? void 0 : _a.params, ast.callee.optional);
            }
        }
    }
});

const createLabeledExpr = (label, specifier, source) => {
    return createMacro({
        LabeledStatement(ast) {
            if (ast.label.value !== label)
                return;
            if (ast.body.type === "ExpressionStatement") {
                this.import(specifier, source);
                ast.body.expression = {
                    type: "CallExpression",
                    span: dummySpan,
                    callee: {
                        type: "Identifier",
                        span: dummySpan,
                        value: specifier,
                        optional: false
                    },
                    arguments: [
                        {
                            expression: ast.body.expression
                        }
                    ],
                };
                return ast.body;
            }
            else {
                throw new Error("this macro only accept an Expression");
            }
        }
    });
};
/**
 * Create a macro plugin that converts `labeled: {}` or `labeled: (...args) => {}` to `$specifier((...args) => {})`,
 * and also `import { $specifier } from $source`
 * @param specifier - the function name
 * @param source - the module path
 * @param allowParams - allow convert the input array to params, default is false.
 * @returns - A labeled macro plugin
 */
const createLabeledBlock = (label, specifier, source, allowParams = false) => createLabeledMacro(label, function (ast) {
    this.import(specifier, source);
    if (ast.type === "BlockStatement") {
        return ({
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: specifier,
                    span: dummySpan
                },
                arguments: [
                    {
                        expression: {
                            type: "ArrowFunctionExpression",
                            generator: false,
                            async: false,
                            params: [],
                            body: ast,
                            span: dummySpan
                        }
                    }
                ],
                span: dummySpan
            },
            span: dummySpan
        });
    }
    else if (ast.type === "ExpressionStatement" && ast.expression.type === "ArrowFunctionExpression") {
        return ({
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: specifier,
                    span: dummySpan
                },
                arguments: [
                    {
                        expression: ast.expression
                    }
                ],
                span: dummySpan
            },
            span: dummySpan
        });
    }
    else if (allowParams && ast.type === "ExpressionStatement" && ast.expression.type === "ArrayExpression") {
        return ({
            type: "ExpressionStatement",
            expression: {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: specifier,
                    span: dummySpan
                },
                arguments: ast.expression.elements,
                span: dummySpan
            },
            span: dummySpan
        });
    }
    else {
        throw new Error("this macro only accept a ArrowFunction or BlockStatement" + (allowParams ? " or an ArrayExpression" : ""));
    }
});
const $Undefined = {
    type: "Identifier",
    span: dummySpan,
    value: "undefined",
    optional: false
};
const patternProperty = (prop) => {
    switch (prop.type) {
        case "AssignmentPatternProperty":
            return {
                type: "AssignmentProperty",
                key: prop.key,
                value: prop.value || $Undefined
            };
        case "KeyValuePatternProperty":
            return {
                type: "KeyValueProperty",
                key: prop.key,
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                value: patternToExpr(prop.value).expression
            };
        case "RestElement":
            return {
                type: "SpreadElement",
                spread: dummySpan,
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                arguments: patternToExpr(prop.argument).expression
            };
        default:
            throw new Error("Unhandled pattern.");
    }
};
const patternToExpr = (pat) => {
    switch (pat.type) {
        case "Identifier": return { expression: pat };
        case "AssignmentPattern": return { expression: pat.right };
        case "ArrayPattern": return {
            expression: {
                type: "ArrayExpression",
                elements: pat.elements.map(i => i ? patternToExpr(i) : i),
                span: dummySpan
            }
        };
        case "ObjectPattern": return {
            expression: {
                type: "ObjectExpression",
                properties: pat.properties.map(i => patternProperty(i)),
                span: dummySpan
            }
        };
        case "RestElement": return {
            spread: pat.rest,
            expression: patternToExpr(pat.argument).expression
        };
        default:
            throw new Error("Unhandled pattern.");
    }
};
const paramsToArgs = (params) => params.map(i => patternToExpr(i.pat));
const filterNotDecorator = (stmts) => stmts.filter(i => i.type !== "LabeledStatement" || (i.type === "LabeledStatement" && i.label.value !== "decorator"));
const fixCallee = (callee) => {
    if (!callee)
        return $Undefined;
    if (["ArrayExpression", "CallExpression"].includes(callee.type))
        return callee;
    if (callee.type !== "Identifier")
        return { type: "ParenthesisExpression", span: dummySpan, expression: callee };
    return callee;
};
const handleDecoratorLabel = (parent, stmts = []) => {
    for (const stmt of stmts) {
        if (stmt.type === "LabeledStatement" && stmt.label.value === "decorator") {
            if (stmt.body.type === "ExpressionStatement" && parent.body) {
                let callee = fixCallee(stmt.body.expression);
                let finalCallee;
                const expression = {
                    type: "FunctionExpression",
                    identifier: parent.identifier,
                    params: parent.params,
                    decorators: parent.decorators,
                    span: dummySpan,
                    body: {
                        type: "BlockStatement",
                        span: dummySpan,
                        stmts: filterNotDecorator(parent.body.stmts)
                    },
                    generator: parent.generator,
                    async: parent.async,
                };
                if (callee.type === "ArrayExpression") {
                    let lastCallee = {};
                    let cacheCallee;
                    const els = callee.elements;
                    if (callee.elements[0]) {
                        callee = callee.elements[0].expression;
                    }
                    else {
                        parent.body.stmts = filterNotDecorator(parent.body.stmts);
                        return;
                    }
                    const last = els.length - 1;
                    els.length > 1 && els.forEach((el, index) => {
                        if (lastCallee.type === "CallExpression") {
                            cacheCallee = lastCallee;
                            lastCallee = { type: "CallExpression", span: dummySpan, callee: fixCallee(el === null || el === void 0 ? void 0 : el.expression), arguments: index === last ? [{ expression }] : [] };
                            if (index === last)
                                finalCallee = callee;
                            cacheCallee.arguments[0] = { expression: lastCallee };
                        }
                        else {
                            callee = { type: "CallExpression", span: dummySpan, callee, arguments: [{ expression: fixCallee(el === null || el === void 0 ? void 0 : el.expression), spread: el === null || el === void 0 ? void 0 : el.spread }] };
                            lastCallee = callee;
                        }
                    });
                }
                parent.body.stmts = [
                    {
                        type: "ReturnStatement",
                        span: dummySpan,
                        argument: {
                            type: "CallExpression",
                            span: dummySpan,
                            callee: finalCallee || {
                                type: "CallExpression",
                                span: dummySpan,
                                callee,
                                arguments: [
                                    {
                                        expression
                                    }
                                ],
                            },
                            arguments: paramsToArgs(parent.params),
                        }
                    }
                ];
            }
            else {
                throw new Error("this macro only accept an Expression");
            }
        }
    }
};
const decorator = createMacro({
    enter(ast, parent) {
        var _a, _b;
        if (ast.type === "FunctionDeclaration" || ast.type === "FunctionExpression") {
            handleDecoratorLabel(ast, (_a = ast.body) === null || _a === void 0 ? void 0 : _a.stmts);
        }
        else if (ast.type === "ArrowFunctionExpression" && ast.body.type === "BlockStatement") {
            handleDecoratorLabel(Object.assign(Object.assign({}, ast), { identifier: (parent === null || parent === void 0 ? void 0 : parent.type) === "VariableDeclarator" && parent.id.type === "Identifier" ? parent.id : undefined }), ast.body.stmts);
        }
        else if (ast.type === "PrivateMethod" || ast.type === "ClassMethod") {
            if (ast.key.type !== "Identifier")
                return;
            handleDecoratorLabel(Object.assign(Object.assign({}, ast.function), { type: "FunctionExpression", identifier: ast.key }), (_b = ast.function.body) === null || _b === void 0 ? void 0 : _b.stmts);
        }
    },
});

var $Eval = createExprMacro("$Eval", function (args) {
    const t = args[0].type;
    if (t === "StringLiteral")
        return this.parseExpr(evalExpr(args[0].value));
    if (t === "TemplateLiteral") {
        const track = (name) => this.track(name);
        walk(args[0], {
            enter(node) {
                if (node.type === "Identifier") {
                    const v = track(node.value);
                    if (v && v.value)
                        this.replace(v.value);
                }
            }
        });
        return this.parseExpr(evalExpr(evalExpr(this.printExpr(args[0]))));
    }
    if (t === "FunctionExpression" || t === "ArrowFunctionExpression")
        return this.parseExpr(evalExpr(`(${this.printExpr(args[0])})(${args.slice(1).map(i => this.printExpr(i)).join(",")})`));
    return this.parseExpr(evalAst(args[0]).toString());
}, "(<T>(expr: string) => T) & (<T>(expr: T) => T) & (<F extends (...args: any) => any>(expr: F, ...args: Parameters<F>) => ReturnType<F>)");
const printAst = (ast) => JSON.stringify(ast).replace(/("(start|end|ctxt)":\s*)(\d+)/g, "$10");
var $Ast = createExprMacro("$Ast", function (args) {
    return this.parseExpr(printAst(args[0].type === "StringLiteral" ? this.parseExpr(args[0].value) : args[0]));
}, '<T>(expr: T) => import("@swc/core").Expression');
var $Env = createExprMacro("$Env", function (args, typeArgs) {
    var _a;
    if (args[0].type !== "StringLiteral")
        throw new Error("$Env macro only support StringLiteral as input.");
    const value = (_a = process.env[args[0].value]) !== null && _a !== void 0 ? _a : "";
    if (typeArgs && (typeArgs === null || typeArgs === void 0 ? void 0 : typeArgs[0].type) === "TsKeywordType") {
        switch (typeArgs[0].kind) {
            case "boolean":
                return {
                    type: "BooleanLiteral",
                    value: !!value,
                    span: dummySpan
                };
            case "number":
                return {
                    type: "NumericLiteral",
                    value: +value,
                    span: dummySpan
                };
        }
    }
    return {
        type: "StringLiteral",
        span: dummySpan,
        value
    };
}, "<R = string>(key: string) => R");
var $Stringify = createExprMacro("$Stringify", function (args, typeArgs) {
    return {
        type: "StringLiteral",
        span: dummySpan,
        value: typeArgs && typeArgs.length > 0 ? this.printType(typeArgs[0]) : this.printExpr(args[0])
    };
}, "((expr: any) => string) & (<T>() => string)");
var $Span = createExprMacro("$Span", function () {
    const cursor = this.cursor();
    return {
        type: "ArrayExpression",
        span: dummySpan,
        elements: [
            {
                expression: {
                    type: "NumericLiteral",
                    span: dummySpan,
                    value: cursor[0],
                }
            },
            {
                expression: {
                    type: "NumericLiteral",
                    span: dummySpan,
                    value: cursor[1]
                }
            }
        ]
    };
}, "() => [number, number]");
var $Line = createExprMacro("$Line", function () {
    var _a;
    return {
        type: "NumericLiteral",
        span: this.span(),
        value: ((_a = this.src) === null || _a === void 0 ? void 0 : _a.slice(0, this.cursor()[0]).split(/\r\n|\r|\n/).length) || 1
    };
}, "() => number");
var $Column = createExprMacro("$Column", function () {
    var _a, _b, _c;
    return {
        type: "NumericLiteral",
        span: this.span(),
        value: ((_c = (_b = ((_a = this.src) === null || _a === void 0 ? void 0 : _a.slice(0, this.cursor()[0]))) === null || _b === void 0 ? void 0 : _b.match(/\n[^\n]*$/)) === null || _c === void 0 ? void 0 : _c[0].length) || 1
    };
}, "() => number");
var $ID = createExprMacro("$ID", function () {
    return {
        type: "StringLiteral",
        span: this.span(),
        value: hash(`${this.src}${this.cursor()}`)
    };
}, "() => string");
function throwError(msg) {
    return {
        type: "CallExpression",
        span: dummySpan,
        callee: {
            type: "ParenthesisExpression",
            span: dummySpan,
            expression: {
                type: "ArrowFunctionExpression",
                span: dummySpan,
                params: [],
                body: {
                    type: "BlockStatement",
                    span: dummySpan,
                    stmts: [
                        {
                            type: "ThrowStatement",
                            span: dummySpan,
                            argument: {
                                type: "NewExpression",
                                span: dummySpan,
                                callee: {
                                    type: "Identifier",
                                    span: dummySpan,
                                    value: "Error",
                                    optional: false
                                },
                                arguments: [
                                    {
                                        expression: {
                                            type: "StringLiteral",
                                            span: dummySpan,
                                            value: msg,
                                        }
                                    }
                                ],
                            }
                        }
                    ]
                },
                async: false,
                generator: false,
            }
        },
        arguments: [],
    };
}
// TODO: add filename and span to log message
var $UnImplemented = createExprMacro("$UnImplemented", function () {
    // eslint-disable-next-line no-console
    console.error("not implemented");
    return throwError("not implemented");
}, "() => never");
// TODO: add filename and span to log message
var $Todo = createExprMacro("$Todo", function () {
    // eslint-disable-next-line no-console
    console.warn("not yet implemented");
    this.replace(throwError("not yet implemented"));
}, "() => never");
// TODO: add filename and span to log message
var $UnReachable = createExprMacro("$UnReachable", function () {
    return throwError("internal error: entered unreachable code");
}, "() => never");
var $Include = createExprMacro("$Include", function (args) {
    var _a, _b;
    if (((_a = args[0]) === null || _a === void 0 ? void 0 : _a.type) !== "StringLiteral")
        throw new Error("$Include only accept StringLiteral as input.");
    let moduleType = "commonjs";
    if (((_b = args[1]) === null || _b === void 0 ? void 0 : _b.type) === "StringLiteral" && ["es6", "commonjs", "umd", "nodenext"].includes(args[1].value)) {
        moduleType = args[1].value;
    }
    const jsc = { parser: { syntax: "typescript" } };
    // TODO: allow plugin access current config
    const plugin = createSwcPlugin({ macros: [], jsc });
    return {
        type: "CallExpression",
        span: dummySpan,
        callee: {
            type: "ParenthesisExpression",
            span: dummySpan,
            expression: {
                type: "ArrowFunctionExpression",
                span: dummySpan,
                params: [],
                body: {
                    type: "BlockStatement",
                    span: dummySpan,
                    stmts: core.parseSync(core.transformFileSync(args[0].value, { jsc, plugin, module: { type: moduleType } }).code).body
                },
                async: false,
                generator: false,
            }
        },
        arguments: [],
    };
}, "(path: string, target?: 'es6' | 'commonjs' | 'umd' | 'nodenext') => void");
var $IncludeStr = createExprMacro("$IncludeStr", function (args) {
    var _a;
    if (((_a = args[0]) === null || _a === void 0 ? void 0 : _a.type) !== "StringLiteral")
        throw new Error("$IncludeStr only accept StringLiteral as input.");
    return {
        type: "StringLiteral",
        value: fs.readFileSync(args[0].value).toString(),
        span: dummySpan
    };
}, "(path: string) => string");
var $IncludeJSON = createExprMacro("$IncludeJSON", function (args) {
    var _a, _b;
    if (((_a = args[0]) === null || _a === void 0 ? void 0 : _a.type) !== "StringLiteral")
        throw new Error("$IncludeJSON only accept StringLiteral as input.");
    let json = fs.readFileSync(args[0].value).toString();
    if (((_b = args[1]) === null || _b === void 0 ? void 0 : _b.type) === "StringLiteral") {
        const value = JSON.parse(json)[args[1].value];
        json = JSON.stringify(value);
    }
    return this.parseExpr(json);
}, "(<T extends Record<string, any>>(path: string) => T) & (<R = string>(path: string, key: string) => R)");
var $WriteFile = createExprMacro("$WriteFile", function (args) {
    var _a, _b;
    if (((_a = args[0]) === null || _a === void 0 ? void 0 : _a.type) !== "StringLiteral")
        throw new Error("$WriteFile only accept StringLiteral as first parameter.");
    if (((_b = args[1]) === null || _b === void 0 ? void 0 : _b.type) !== "StringLiteral")
        throw new Error("$WriteFile only accept StringLiteral as second parameter.");
    fs.writeFileSync(args[0].value, args[1].value, { encoding: "utf-8" });
    return { type: "Identifier", value: "undefined", span: dummySpan };
}, "(file: string, data: string) => void");
var $Concat = createExprMacro("$Concat", function (args) {
    let value = "";
    const msg = 'only literals (like `"foo"`, `42` and `3.14`) can be passed to `$Concat()`';
    for (const arg of args) {
        switch (arg.type) {
            case "StringLiteral":
            case "BooleanLiteral":
            case "NumericLiteral":
            case "BigIntLiteral":
                value += arg.value;
                break;
            case "NullLiteral":
                value += "null";
                break;
            case "Identifier":
                if (arg.value === "undefined") {
                    value += arg.value;
                    break;
                }
                else {
                    throw new Error(msg);
                }
            default:
                throw new Error(msg);
        }
    }
    return {
        type: "StringLiteral",
        value,
        span: dummySpan
    };
}, "(...args: (string | null | undefined | boolean | number | bigint)[]) => string");
const printTmpl = (strings, exprs) => strings.reduce((query, queryPart, i) => {
    const valueExists = i < exprs.length;
    const text = query + queryPart;
    return valueExists ? text + printExpr(exprs[i]).code : text;
}, "");
const printRawTmpl = (strings, exprs) => strings.reduce((query, queryPart, i) => {
    const valueExists = i < exprs.length;
    const text = query + queryPart;
    return valueExists ? text + exprs[i] : text;
}, "");
function walkObject(obj, onEnter, grand, grandKey) {
    if (obj && typeof obj === "object") {
        const allKeys = Object.keys(obj);
        for (let i = 0; i < allKeys.length; i++) {
            const k = allKeys[i];
            const v = obj[k];
            const r = onEnter(k, v, obj);
            if (r != null && grand) {
                grand[grandKey] = r;
                break;
            }
            if (typeof v === "object") {
                walkObject(v, onEnter, obj, k);
            }
        }
    }
    return obj;
}
var $Expr = createTmplMacro("$Expr", function (strings, ...exprs) {
    const exprMarkers = exprs.map((_, i) => "_macro_marker_" + i + "_");
    const options = { syntax: "typescript", tsx: true };
    const ast = this.parseExpr(printRawTmpl(strings, exprMarkers), options);
    walkObject(ast, (k, v, parent) => {
        if (k === "span") {
            parent[k] = dummySpan;
            return;
        }
        if (typeof v === "string") {
            const i = exprMarkers.findIndex((m) => m === v);
            if (i !== -1)
                return "__macro$$Start__" + this.printExpr(exprs[i]) + "__macro$$End__";
        }
    });
    const expr = JSON.stringify(ast, undefined, 2).replace(/("__macro\$\$Start__)|(__macro\$\$End__")/g, "").replace(/\\"/g, '"');
    return this.parseExpr(expr);
}, "import(\"@swc/core\").Expression");
function _Quote(strings, ...exprs) {
    const exprMarkers = exprs.map((_, i) => "_macro_marker_" + i + "_");
    const options = { syntax: "typescript", tsx: true };
    const ast = core.parseSync(printRawTmpl(strings, exprMarkers), options).body;
    walkObject(ast, (k, v, parent) => {
        if (k === "span") {
            parent[k] = dummySpan;
            return;
        }
        if (typeof v === "string") {
            const i = exprMarkers.findIndex((m) => m === v);
            if (i !== -1)
                return "__macro$$Start__" + printExpr(exprs[i]).code + "__macro$$End__";
        }
    });
    const expr = JSON.stringify(ast, undefined, 2).replace(/("__macro\$\$Start__)|(__macro\$\$End__")/g, "").replace(/\\"/g, '"');
    return parseExpr(expr);
}
var $Quote = createTmplMacro("$Quote", _Quote, "(import(\"@swc/core\").Expression)[]").proxy(_Quote);

Object.defineProperty(exports, 'parse', {
  enumerable: true,
  get: function () { return core.parseSync; }
});
Object.defineProperty(exports, 'parseAsync', {
  enumerable: true,
  get: function () { return core.parse; }
});
exports.$Ast = $Ast;
exports.$Column = $Column;
exports.$Concat = $Concat;
exports.$Env = $Env;
exports.$Eval = $Eval;
exports.$Expr = $Expr;
exports.$ExprMacro = $ExprMacro;
exports.$ID = $ID;
exports.$Include = $Include;
exports.$IncludeJSON = $IncludeJSON;
exports.$IncludeStr = $IncludeStr;
exports.$LabeledMacro = $LabeledMacro;
exports.$Line = $Line;
exports.$LitMacro = $LitMacro;
exports.$Macro = $Macro;
exports.$Quote = $Quote;
exports.$Span = $Span;
exports.$Stringify = $Stringify;
exports.$TmplMacro = $TmplMacro;
exports.$Todo = $Todo;
exports.$TypeMacro = $TypeMacro;
exports.$UnImplemented = $UnImplemented;
exports.$UnReachable = $UnReachable;
exports.$WriteFile = $WriteFile;
exports.Walker = Walker;
exports.createExprMacro = createExprMacro;
exports.createLabeledBlock = createLabeledBlock;
exports.createLabeledExpr = createLabeledExpr;
exports.createLabeledMacro = createLabeledMacro;
exports.createLit = createLit;
exports.createLitMacro = createLitMacro;
exports.createMacro = createMacro;
exports.createProxyMacro = createProxyMacro;
exports.createSwcPlugin = createSwcPlugin;
exports.createTmplMacro = createTmplMacro;
exports.createTypeMacro = createTypeMacro;
exports.createWalkPlugin = createWalkPlugin;
exports.decorator = decorator;
exports.defineConfig = defineConfig;
exports.dummySpan = dummySpan;
exports.evalAst = evalAst;
exports.evalExpr = evalExpr;
exports.flatExpr = flatExpr;
exports.genConstType = genConstType;
exports.genExportSpecifier = genExportSpecifier;
exports.genImportSpecifier = genImportSpecifier;
exports.genTsRef = genTsRef;
exports.genTypeImport = genTypeImport;
exports.getSpanOffset = getSpanOffset;
exports.guessType = guessType;
exports.hash = hash;
exports.hashMap = hashMap;
exports.isMacroPlugin = isMacroPlugin;
exports.isMacroProxy = isMacroProxy;
exports.isNode = isNode;
exports.isRegExp = isRegExp;
exports.macro = macro;
exports.markedNode = markedNode;
exports.noop = noop;
exports.paramsToArgs = paramsToArgs;
exports.parseExpr = parseExpr;
exports.parseType = parseType;
exports.patternToExpr = patternToExpr;
exports.print = print;
exports.printAst = printAst;
exports.printAsync = printAsync;
exports.printExpr = printExpr;
exports.printExprAsync = printExprAsync;
exports.printRawTmpl = printRawTmpl;
exports.printTmpl = printTmpl;
exports.printType = printType;
exports.printTypeAsync = printTypeAsync;
exports.transform = transform;
exports.transformAst = transformAst;
exports.transformAsync = transformAsync;
exports.unMarkNode = unMarkNode;
exports.walk = walk;
