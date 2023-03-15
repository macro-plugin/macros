

// Literal, StaticBlock, ArrowFunction, ExpressionStatement, BlockStatement, IfStatement, ForStatement, SwitchStatement, TryStatement, WhileStatement, DoWhileStatement, ThrowStatement, BreakStatement, ContinueStatement, ReturnStatement

```js
function call() {
  island: true
 
  state: {
    var count = 0
  }

  onmount: {

  }

  return HStack(
    VStack.style(bg.red[500], text.lg, font.bold)(
      Text.style(p[2], rounded.lg),
    )
  )
}
```

## Typescript

```json
{
  "compilerOptions": {
    // ...
    "allowUnusedLabels": true,
  },
}
```

## Eslint

```js
module.exports = {
  rules: {
    // ...
    "no-labels": 0,
  }
}
```