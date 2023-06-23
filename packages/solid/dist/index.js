'use strict';

var core = require('@macro-plugin/core');

function getSetter$1(name) {
    return "set" + name[0].toUpperCase() + name.slice(1);
}
var signal = core.createMacro({
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
                        signals[name] = { value: d.init, setter: getSetter$1(name) };
                    }
                    else {
                        throw new Error("Expect pure identifier");
                    }
                }
            }
            else {
                throw new Error("Expect a `var` kind VariableDeclaration node in signal block");
            }
        }
        if (Object.keys(signals).length > 0) {
            this.import("createSignal", "solid-js");
            return Object.entries(signals).map(([k, v]) => ({
                type: "VariableDeclaration",
                kind: "var",
                declare: false,
                span: core.dummySpan,
                declarations: [
                    {
                        type: "VariableDeclarator",
                        definite: false,
                        span: core.dummySpan,
                        id: {
                            type: "ArrayPattern",
                            optional: false,
                            span: core.dummySpan,
                            elements: [
                                core.markedNode("signal", {
                                    type: "Identifier",
                                    value: k,
                                    optional: false,
                                    span: core.dummySpan
                                }),
                                core.markedNode("signalSetter", {
                                    type: "Identifier",
                                    value: v.setter,
                                    optional: false,
                                    span: core.dummySpan
                                }),
                            ]
                        },
                        init: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                value: "createSignal",
                                optional: false,
                                span: core.dummySpan
                            },
                            span: core.dummySpan,
                            arguments: [
                                {
                                    expression: v.value
                                }
                            ]
                        }
                    }
                ]
            }));
        }
    },
    AssignmentExpression(ast) {
        var _a;
        if (ast.left.type === "Identifier" && ((_a = this.track(ast.left.value)) === null || _a === void 0 ? void 0 : _a.marker) === "signal") {
            const name = ast.left.value;
            return {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: getSetter$1(name),
                    optional: false,
                    span: core.dummySpan
                },
                arguments: [
                    {
                        expression: ast.operator === "="
                            ? ast.right
                            : {
                                type: "BinaryExpression",
                                left: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        value: name,
                                        optional: false,
                                        span: core.dummySpan
                                    },
                                    arguments: [],
                                    span: core.dummySpan
                                },
                                operator: ast.operator.replace("=", ""),
                                span: core.dummySpan,
                                right: ast.right,
                            }
                    }
                ],
                span: core.dummySpan
            };
        }
    },
    UpdateExpression(ast) {
        var _a;
        if (ast.argument.type === "Identifier" && ((_a = this.track(ast.argument.value)) === null || _a === void 0 ? void 0 : _a.marker) === "signal") {
            const name = ast.argument.value;
            ast.argument = {
                type: "CallExpression",
                callee: ast.argument,
                arguments: [],
                span: core.dummySpan
            };
            return {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: getSetter$1(name),
                    optional: false,
                    span: core.dummySpan
                },
                arguments: [
                    {
                        expression: ast,
                    }
                ],
                span: core.dummySpan
            };
        }
    }
});

function getSetter(name) {
    return "set" + name[0].toUpperCase() + name.slice(1);
}
const plugin = core.createMacro({
    LabeledStatement(ast) {
        const stores = {};
        if (ast.body.type === "BlockStatement" && ast.label.value === "store") {
            let name;
            for (const i of ast.body.stmts) {
                if (i.type === "VariableDeclaration" && i.kind === "var") {
                    for (const d of i.declarations) {
                        if (d.id.type === "Identifier") {
                            name = d.id.value;
                            stores[name] = { value: d.init, setter: getSetter(name) };
                        }
                        else {
                            throw new Error("Expect a pure Identifier.");
                        }
                    }
                }
                else {
                    throw new Error("Expect a `var` kind VariableDeclaration node in store block");
                }
            }
            if (Object.keys(stores).length > 0) {
                this.import("createStore", "solid-js/store");
                return Object.entries(stores).map(([k, v]) => ({
                    type: "VariableDeclaration",
                    kind: "var",
                    declare: false,
                    span: core.dummySpan,
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "ArrayPattern",
                                span: core.dummySpan,
                                optional: false,
                                elements: [
                                    core.markedNode("store", {
                                        type: "Identifier",
                                        value: k,
                                        optional: false,
                                        span: core.dummySpan
                                    }),
                                    core.markedNode("storeSetter", {
                                        type: "Identifier",
                                        value: v.setter,
                                        optional: false,
                                        span: core.dummySpan
                                    })
                                ]
                            },
                            init: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    value: "createStore",
                                    optional: false,
                                    span: core.dummySpan
                                },
                                span: core.dummySpan,
                                arguments: [
                                    {
                                        expression: v.value
                                    }
                                ]
                            },
                            span: core.dummySpan
                        }
                    ]
                }));
            }
        }
    },
    AssignmentExpression(ast) {
        var _a;
        if (ast.left.type === "Identifier" && ((_a = this.track(ast.left.value)) === null || _a === void 0 ? void 0 : _a.marker) === "store") {
            const name = ast.left.value;
            return {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: getSetter(name),
                    optional: false,
                    span: core.dummySpan
                },
                arguments: [
                    {
                        expression: ast.operator === "="
                            ? ast.right
                            : {
                                type: "BinaryExpression",
                                left: {
                                    type: "CallExpression",
                                    callee: {
                                        type: "Identifier",
                                        value: name,
                                        span: core.dummySpan,
                                        optional: false
                                    },
                                    arguments: [],
                                    span: core.dummySpan
                                },
                                operator: ast.operator.replace("=", ""),
                                right: ast.right,
                                span: core.dummySpan
                            }
                    }
                ],
                span: core.dummySpan
            };
        }
    },
    UpdateExpression(ast) {
        var _a;
        if (ast.argument.type === "Identifier" && ((_a = this.track(ast.argument.value)) === null || _a === void 0 ? void 0 : _a.marker) === "store") {
            const name = ast.argument.value;
            ast.argument = {
                type: "CallExpression",
                callee: ast.argument,
                arguments: [],
                span: core.dummySpan
            };
            return {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: getSetter(name),
                    optional: false,
                    span: core.dummySpan
                },
                arguments: [
                    {
                        expression: ast
                    }
                ],
                span: core.dummySpan
            };
        }
    }
});

const effect = core.createLabeledBlock("effect", "createEffect", "solid-js", true);

const onMount = core.createLabeledBlock("onMount", "onMount", "solid-js");
const onError = core.createLabeledBlock("onError", "onError", "solid-js");
const onCleanup = core.createLabeledBlock("onCleanup", "onCleanup", "solid-js");

exports.effect = effect;
exports.onCleanup = onCleanup;
exports.onError = onError;
exports.onMount = onMount;
exports.signal = signal;
exports.store = plugin;
