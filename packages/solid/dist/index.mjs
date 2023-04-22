import { createMacro, markedNode, createLabeledBlock } from '@macro-plugin/core';

function getSetter$1(name) {
    return "set" + name[0].toUpperCase() + name.slice(1);
}
var signal = createMacro({
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
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                },
                declarations: [
                    {
                        type: "VariableDeclarator",
                        definite: false,
                        span: {
                            start: 0,
                            end: 0,
                            ctxt: 0
                        },
                        id: {
                            type: "ArrayPattern",
                            optional: false,
                            span: {
                                start: 0,
                                end: 0,
                                ctxt: 0
                            },
                            elements: [
                                markedNode("signal", {
                                    type: "Identifier",
                                    value: k,
                                    optional: false,
                                    span: {
                                        start: 0,
                                        end: 0,
                                        ctxt: 0
                                    }
                                }),
                                markedNode("signalSetter", {
                                    type: "Identifier",
                                    value: v.setter,
                                    optional: false,
                                    span: {
                                        start: 0,
                                        end: 0,
                                        ctxt: 0
                                    }
                                }),
                            ]
                        },
                        init: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                value: "createSignal",
                                optional: false,
                                span: {
                                    start: 0,
                                    end: 0,
                                    ctxt: 1
                                }
                            },
                            span: {
                                start: 0,
                                end: 0,
                                ctxt: 0
                            },
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
                    span: {
                        start: 0,
                        end: 0,
                        ctxt: 0
                    }
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
                                        span: {
                                            start: 0,
                                            end: 0,
                                            ctxt: 0
                                        }
                                    },
                                    arguments: [],
                                    span: {
                                        start: 0,
                                        end: 0,
                                        ctxt: 0
                                    }
                                },
                                operator: ast.operator.replace("=", ""),
                                span: {
                                    start: 0,
                                    end: 0,
                                    ctxt: 0
                                },
                                right: ast.right,
                            }
                    }
                ],
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                }
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
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                }
            };
            return {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: getSetter$1(name),
                    optional: false,
                    span: {
                        start: 0,
                        end: 0,
                        ctxt: 0
                    }
                },
                arguments: [
                    {
                        expression: ast,
                    }
                ],
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                }
            };
        }
    }
});

function getSetter(name) {
    return "set" + name[0].toUpperCase() + name.slice(1);
}
const plugin = createMacro({
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
                    span: {
                        start: 0,
                        end: 0,
                        ctxt: 0
                    },
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            id: {
                                type: "ArrayPattern",
                                span: {
                                    start: 0,
                                    end: 0,
                                    ctxt: 0
                                },
                                optional: false,
                                elements: [
                                    markedNode("store", {
                                        type: "Identifier",
                                        value: k,
                                        optional: false,
                                        span: {
                                            start: 0,
                                            end: 0,
                                            ctxt: 1
                                        }
                                    }),
                                    markedNode("storeSetter", {
                                        type: "Identifier",
                                        value: v.setter,
                                        optional: false,
                                        span: {
                                            start: 0,
                                            end: 0,
                                            ctxt: 1
                                        }
                                    })
                                ]
                            },
                            init: {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    value: "createStore",
                                    optional: false,
                                    span: {
                                        start: 0,
                                        end: 0,
                                        ctxt: 0
                                    }
                                },
                                span: {
                                    start: 0,
                                    end: 0,
                                    ctxt: 0
                                },
                                arguments: [
                                    {
                                        expression: v.value
                                    }
                                ]
                            },
                            span: {
                                start: 0,
                                end: 0,
                                ctxt: 0
                            }
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
                    span: {
                        start: 0,
                        end: 0,
                        ctxt: 0
                    }
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
                                        span: {
                                            start: 0,
                                            end: 0,
                                            ctxt: 0
                                        },
                                        optional: false
                                    },
                                    arguments: [],
                                    span: {
                                        start: 0,
                                        end: 0,
                                        ctxt: 0
                                    }
                                },
                                operator: ast.operator.replace("=", ""),
                                right: ast.right,
                                span: {
                                    start: 0,
                                    end: 0,
                                    ctxt: 0
                                }
                            }
                    }
                ],
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                }
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
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                }
            };
            return {
                type: "CallExpression",
                callee: {
                    type: "Identifier",
                    value: getSetter(name),
                    optional: false,
                    span: {
                        start: 0,
                        end: 0,
                        ctxt: 1
                    }
                },
                arguments: [
                    {
                        expression: ast
                    }
                ],
                span: {
                    start: 0,
                    end: 0,
                    ctxt: 0
                }
            };
        }
    }
});

const effect = createLabeledBlock("effect", "createEffect", "solid-js", true);

const onMount = createLabeledBlock("onMount", "onMount", "solid-js");
const onError = createLabeledBlock("onError", "onError", "solid-js");
const onCleanup = createLabeledBlock("onCleanup", "onCleanup", "solid-js");

export { effect, onCleanup, onError, onMount, signal, plugin as store };
