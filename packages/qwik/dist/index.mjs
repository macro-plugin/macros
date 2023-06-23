import { createMacro, dummySpan, createLabeledBlock, createLabeledMacro, markedNode, walk, unMarkNode } from '@macro-plugin/core';

function handleFunc(ast) {
    let label;
    if (!ast.body || ast.body.type !== "BlockStatement")
        return;
    for (let i = 0; i < ast.body.stmts.length; i++) {
        if (ast.body.stmts[i].type === "LabeledStatement") {
            label = ast.body.stmts[i];
            if (label.label.value === "qwik") {
                if (label.body.type === "ExpressionStatement" && label.body.expression.type === "BooleanLiteral") {
                    ast.body.stmts = ast.body.stmts.filter((_, index) => index !== i);
                    const isDecl = "identifier" in ast && ast.identifier != null;
                    if (label.body.expression.value) {
                        this.import("component$", "@builder.io/qwik");
                        const init = {
                            type: "CallExpression",
                            span: dummySpan,
                            callee: {
                                type: "Identifier",
                                span: dummySpan,
                                value: "component$",
                                optional: false
                            },
                            arguments: [
                                {
                                    expression: isDecl
                                        ? {
                                            type: "ArrowFunctionExpression",
                                            span: dummySpan,
                                            params: ast.params.map(i => i.pat),
                                            body: ast.body,
                                            async: false,
                                            generator: false,
                                        }
                                        : ast
                                }
                            ],
                        };
                        if (!isDecl)
                            return init;
                        return {
                            type: "VariableDeclaration",
                            span: dummySpan,
                            kind: "const",
                            declare: false,
                            declarations: [
                                {
                                    type: "VariableDeclarator",
                                    span: dummySpan,
                                    id: ast.identifier,
                                    init,
                                    definite: false
                                }
                            ]
                        };
                    }
                }
                else {
                    throw new Error("Expect an boolean in qwik macro.");
                }
            }
        }
    }
}
const qwik = createMacro({
    FunctionDeclaration(ast) {
        return handleFunc.apply(this, [ast]);
    },
    FunctionExpression(ast) {
        return handleFunc.apply(this, [ast]);
    },
    ArrowFunctionExpression(ast) {
        return handleFunc.apply(this, [ast]);
    }
});

const task = createLabeledBlock("task", "useTask$", "@builder.io/qwik");
const vtask = createLabeledBlock("vtask", "useVisibleTask$", "@builder.io/qwik", true);

const varToReturn = (body) => {
    let ident;
    body = body.map(i => {
        if (i.type === "VariableDeclaration" && i.kind === "var") {
            if (i.declarations[0].id.type === "Identifier") {
                ident = i.declarations[0].id;
            }
            else {
                throw new Error("Expect an Identifier");
            }
            return {
                type: "ReturnStatement",
                argument: i.declarations[0].init,
                span: dummySpan
            };
        }
        return i;
    });
    return [ident, body];
};
const resource = createLabeledMacro("resource", function (stmt) {
    this.import("useResource$", "@builder.io/qwik");
    if (stmt.type === "BlockStatement") {
        const [id, stmts] = varToReturn(stmt.stmts);
        return {
            type: "VariableDeclaration",
            declarations: [
                {
                    type: "VariableDeclarator",
                    definite: false,
                    span: dummySpan,
                    id,
                    init: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            optional: false,
                            value: "useResource$",
                            span: dummySpan
                        },
                        span: dummySpan,
                        arguments: [
                            {
                                expression: {
                                    type: "ArrowFunctionExpression",
                                    generator: false,
                                    async: false,
                                    params: [],
                                    span: dummySpan,
                                    body: {
                                        type: "BlockStatement",
                                        stmts,
                                        span: dummySpan,
                                    }
                                }
                            }
                        ]
                    }
                }
            ],
            span: dummySpan,
            declare: false,
            kind: "const"
        };
    }
    else if (stmt.type === "ExpressionStatement" && stmt.expression.type === "ArrowFunctionExpression") {
        let id, stmts;
        if (stmt.expression.body.type === "BlockStatement") {
            [id, stmts] = varToReturn(stmt.expression.body.stmts);
            stmt.expression.body.stmts = stmts;
        }
        else {
            throw new Error("expect an arrow block inside resource.");
        }
        return {
            type: "VariableDeclaration",
            declarations: [
                {
                    type: "VariableDeclarator",
                    definite: false,
                    span: dummySpan,
                    id,
                    init: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            value: "useResource$",
                            span: dummySpan,
                            optional: false
                        },
                        arguments: [
                            {
                                expression: stmt.expression
                            }
                        ],
                        span: dummySpan,
                    }
                }
            ],
            kind: "const",
            span: dummySpan,
            declare: false,
        };
    }
    else {
        throw new Error("this macro only accept a ArrowFunction or BlockStatement");
    }
});

const store = createLabeledMacro("store", function (stmt) {
    if (stmt.type !== "BlockStatement")
        return;
    const signals = {};
    let name;
    for (const i of stmt.stmts) {
        if (i.type === "VariableDeclaration" && i.kind === "var") {
            for (const d of i.declarations) {
                if (d.id.type === "Identifier") {
                    name = d.id.value;
                    signals[name] = { value: d.init };
                }
                else {
                    throw new Error("Expect Identifier in store");
                }
            }
        }
        else {
            throw new Error("Expect a `var` kind VariableDeclaration node in store block");
        }
    }
    if (Object.keys(signals).length > 0) {
        this.import("useStore", "@builder.io/qwik");
        return Object.entries(signals).map(([k, v]) => ({
            type: "VariableDeclaration",
            kind: "const",
            declare: false,
            declarations: [
                {
                    type: "VariableDeclarator",
                    id: markedNode("qwikStore", {
                        type: "Identifier",
                        value: k,
                        optional: false,
                        span: dummySpan
                    }),
                    init: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            value: "useStore",
                            optional: false,
                            span: dummySpan
                        },
                        arguments: [
                            {
                                expression: v.value
                            }
                        ],
                        span: dummySpan
                    },
                    definite: false,
                    span: dummySpan
                }
            ],
            span: dummySpan
        }));
    }
});

const signal = createMacro({
    LabeledStatement(ast) {
        if (ast.body.type !== "BlockStatement" || ast.label.value !== "signal")
            return;
        const signals = {};
        let name;
        for (const i of ast.body.stmts) {
            if (i.type === "VariableDeclaration" && i.kind === "var") {
                for (const d of i.declarations) {
                    if (d.id.type === "Identifier") {
                        name = d.id.value;
                        signals[name] = { value: d.init };
                    }
                    else {
                        throw new Error("Expect Identifier in signal");
                    }
                }
            }
            else {
                throw new Error("Expect a `var` kind VariableDeclaration node in signal block");
            }
        }
        if (Object.keys(signals).length > 0) {
            this.import("useSignal", "@builder.io/qwik");
            return Object.entries(signals).map(([k, v]) => ({
                type: "VariableDeclaration",
                kind: "const",
                declare: false,
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: markedNode("qwikSignal", {
                            type: "Identifier",
                            value: k,
                            optional: false,
                            span: dummySpan
                        }),
                        init: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                value: "useSignal",
                                optional: false,
                                span: dummySpan
                            },
                            arguments: [
                                {
                                    expression: v.value
                                }
                            ],
                            span: dummySpan
                        },
                        definite: false,
                        span: dummySpan
                    }
                ],
                span: dummySpan
            }));
        }
    },
    Identifier(ast, parent) {
        var _a;
        if ((parent === null || parent === void 0 ? void 0 : parent.type) !== "VariableDeclarator" && ((_a = this.track(ast.value)) === null || _a === void 0 ? void 0 : _a.marker) === "qwikSignal") {
            this.replace({
                type: "MemberExpression",
                object: ast,
                property: {
                    type: "Identifier",
                    value: "value",
                    optional: false,
                    span: dummySpan
                },
                span: dummySpan
            });
            this.skip();
        }
    }
});

const events = createMacro({
    LabeledStatement: {
        enter(ast) {
            var _a;
            if (ast.label.value === "document" && ast.body.type === "BlockStatement") {
                this.set("QwikInDocument", true);
                return;
            }
            if (ast.label.value === "window" && ast.body.type === "BlockStatement") {
                this.set("QwikInWindow", true);
                return;
            }
            const inDoc = this.get("QwikInDocument", false);
            const inWin = this.get("QwikInWindow", false);
            if (!ast.label.value.startsWith("on") || !["BlockStatement", "ExpressionStatement"].includes(ast.body.type))
                return;
            let expression;
            let name = inDoc ? "useOnDocument" : inWin ? "useOnWindow" : "useOn";
            this.import("$", "@builder.io/qwik");
            if (ast.body.type === "BlockStatement") {
                const firstLabel = ast.body.stmts[0];
                if (firstLabel && firstLabel.type === "LabeledStatement") {
                    if (firstLabel.label.value === "document") {
                        ast.body.stmts = ast.body.stmts.slice(1);
                        name = "useOnDocument";
                    }
                    else if (firstLabel.label.value === "window") {
                        ast.body.stmts = ast.body.stmts.slice(1);
                        name = "useOnWindow";
                    }
                }
                expression = {
                    type: "ArrowFunctionExpression",
                    span: dummySpan,
                    params: [],
                    body: ast.body,
                    async: false,
                    generator: false,
                };
            }
            else if (ast.body.type === "ExpressionStatement") {
                expression = ast.body.expression;
                if (ast.body.expression.type === "FunctionExpression" || ast.body.expression.type === "ArrowFunctionExpression") {
                    if (((_a = ast.body.expression.body) === null || _a === void 0 ? void 0 : _a.type) === "BlockStatement") {
                        const firstLabel = ast.body.expression.body.stmts[0];
                        if (firstLabel && firstLabel.type === "LabeledStatement") {
                            if (firstLabel.label.value === "document") {
                                ast.body.expression.body.stmts = ast.body.expression.body.stmts.slice(1);
                                name = "useOnDocument";
                            }
                            else if (firstLabel.label.value === "window") {
                                ast.body.expression.body.stmts = ast.body.expression.body.stmts.slice(1);
                                name = "useOnWindow";
                            }
                        }
                    }
                }
            }
            this.import(name, "@builder.io/qwik");
            return {
                type: "ExpressionStatement",
                span: dummySpan,
                expression: {
                    type: "CallExpression",
                    span: dummySpan,
                    callee: {
                        type: "Identifier",
                        span: dummySpan,
                        value: name,
                        optional: false
                    },
                    arguments: [
                        {
                            expression: {
                                type: "StringLiteral",
                                span: dummySpan,
                                value: ast.label.value.slice(2),
                                raw: `'${ast.label.value.slice(2)}'`
                            }
                        },
                        {
                            expression: {
                                type: "CallExpression",
                                span: dummySpan,
                                callee: {
                                    type: "Identifier",
                                    span: dummySpan,
                                    value: "$",
                                    optional: false
                                },
                                arguments: [
                                    {
                                        expression
                                    }
                                ],
                            }
                        }
                    ],
                }
            };
        },
        leave(ast) {
            if (ast.label.value === "document" && ast.body.type === "BlockStatement") {
                this.replace(ast.body.stmts);
                this.set("QwikInDocument", false);
            }
            if (ast.label.value === "window" && ast.body.type === "BlockStatement") {
                this.replace(ast.body.stmts);
                this.set("QwikInWindow", false);
            }
        }
    }
});

const computed = createLabeledMacro("computed", function (stmt) {
    if (stmt.type !== "BlockStatement")
        return;
    const computeds = {};
    const signals = [];
    let name;
    for (const i of stmt.stmts) {
        if (i.type === "VariableDeclaration" && i.kind === "var") {
            for (const d of i.declarations) {
                if (d.id.type === "Identifier") {
                    name = d.id.value;
                    if (d.init) {
                        computeds[name] = { value: JSON.parse(JSON.stringify(d.init)), computed: d.init };
                        const isSignal = (name) => { var _a; return ((_a = this.track(name)) === null || _a === void 0 ? void 0 : _a.marker) === "qwikSignal"; };
                        walk(d.init, {
                            enter(node) {
                                if (node.type === "Identifier") {
                                    const name = node.value;
                                    if (isSignal(name)) {
                                        unMarkNode(node);
                                        node.value = "__" + name;
                                        if (!signals.includes(name))
                                            signals.push(name);
                                    }
                                }
                            },
                        });
                    }
                }
                else {
                    throw new Error("Expect an Identifier");
                }
            }
        }
        else {
            throw new Error("Expect a `var` kind VariableDeclaration node in signal block");
        }
    }
    if (Object.keys(computeds).length > 0) {
        this.import(["useSignal", "useTask$"], "@builder.io/qwik");
        return [...Object.entries(computeds).map(([k, v]) => ({
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                    {
                        type: "VariableDeclarator",
                        id: markedNode("qwikSignal", {
                            type: "Identifier",
                            value: k,
                            span: dummySpan,
                            optional: false
                        }),
                        init: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                value: "useSignal",
                                span: dummySpan,
                                optional: false
                            },
                            arguments: [
                                {
                                    expression: v.value
                                }
                            ],
                            span: dummySpan
                        },
                        span: dummySpan
                    }
                ],
                declare: false,
                span: dummySpan
            })), {
                type: "ExpressionStatement",
                span: dummySpan,
                expression: {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        value: "useTask$",
                        optional: false,
                        span: dummySpan
                    },
                    span: dummySpan,
                    arguments: [
                        {
                            expression: {
                                type: "ArrowFunctionExpression",
                                async: false,
                                generator: false,
                                params: [
                                    {
                                        type: "ObjectPattern",
                                        optional: false,
                                        span: dummySpan,
                                        properties: [
                                            {
                                                type: "AssignmentPatternProperty",
                                                span: dummySpan,
                                                key: {
                                                    type: "Identifier",
                                                    value: "track",
                                                    optional: false,
                                                    span: dummySpan,
                                                },
                                            }
                                        ]
                                    }
                                ],
                                body: {
                                    type: "BlockStatement",
                                    span: dummySpan,
                                    stmts: [
                                        ...signals.map(name => ({
                                            type: "VariableDeclaration",
                                            kind: "const",
                                            declarations: [
                                                {
                                                    type: "VariableDeclarator",
                                                    definite: false,
                                                    span: dummySpan,
                                                    id: {
                                                        type: "Identifier",
                                                        value: "__" + name,
                                                        span: dummySpan,
                                                        optional: false
                                                    },
                                                    init: {
                                                        type: "CallExpression",
                                                        callee: {
                                                            type: "Identifier",
                                                            value: "track",
                                                            span: dummySpan,
                                                            optional: false
                                                        },
                                                        span: dummySpan,
                                                        arguments: [
                                                            {
                                                                expression: {
                                                                    type: "ArrowFunctionExpression",
                                                                    async: false,
                                                                    generator: false,
                                                                    params: [],
                                                                    body: {
                                                                        type: "Identifier",
                                                                        value: name,
                                                                        optional: false,
                                                                        span: dummySpan
                                                                    },
                                                                    span: dummySpan
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            ],
                                            declare: false,
                                            span: dummySpan
                                        })),
                                        ...Object.entries(computeds).map(([k, v]) => ({
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "AssignmentExpression",
                                                operator: "=",
                                                left: markedNode("qwikSignal", {
                                                    type: "Identifier",
                                                    value: k,
                                                    optional: false,
                                                    span: dummySpan
                                                }),
                                                right: v.computed,
                                                span: dummySpan
                                            },
                                            span: dummySpan
                                        }))
                                    ]
                                },
                                span: dummySpan
                            }
                        }
                    ]
                }
            }];
    }
});

const css = createLabeledMacro("css", function (stmt) {
    if (stmt.type === "ExpressionStatement") {
        const specifier = this.get("QwikScoped", false) ? "useStyleScoped$" : "useStyle$";
        this.import(specifier, "@builder.io/qwik");
        stmt.expression = {
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
                    expression: stmt.expression
                }
            ],
        };
        return stmt;
    }
    else {
        throw new Error("this macro only accept an Expression");
    }
});
const link = createLabeledMacro("link", function (stmt) {
    if (stmt.type !== "ExpressionStatement")
        return;
    let name;
    let linkCount = this.get("QwikLinkCount", 0);
    const scoped = this.get("QwikScoped", false);
    const specifier = scoped ? "useStyleScoped$" : "useStyles$";
    const links = [];
    if (stmt.expression.type === "StringLiteral") {
        name = "__link" + linkCount;
        links.push(name);
        this.import(name, stmt.expression.value, true);
        linkCount += 1;
    }
    else if (stmt.expression.type === "ArrayExpression") {
        for (const i of stmt.expression.elements) {
            if ((i === null || i === void 0 ? void 0 : i.expression.type) === "StringLiteral") {
                name = "__link" + linkCount;
                links.push(name);
                this.import(name, i.expression.value, true);
                linkCount += 1;
            }
            else {
                throw new Error("Expect a StringLiteral");
            }
        }
    }
    else {
        throw new Error("Only support StringLiteral or ArrayExpression");
    }
    this.set("QwikLinkCount", linkCount);
    this.import(specifier, "@builder.io/qwik");
    return links.map(i => ({
        type: "ExpressionStatement",
        span: dummySpan,
        expression: {
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
                    expression: {
                        type: "Identifier",
                        span: dummySpan,
                        value: i,
                        optional: false
                    }
                }
            ],
        }
    }));
});
const scoped = createLabeledMacro("scoped", {
    enter(stmt) {
        if (stmt.type === "BlockStatement") {
            this.set("QwikScoped", true);
        }
        else {
            throw new Error("Only accept BlockStatement in scoped macro.");
        }
    },
    leave(stmt) {
        if (stmt.type === "BlockStatement") {
            this.replace(stmt.stmts);
            this.set("QwikScoped", false);
        }
    }
});

export { computed, css, events, link, qwik, resource, scoped, signal, store, task, vtask };