# Qwik Macros

Macros for [qwik](https://qwik.builder.io/).

## qwik

Macro for create a qwik component.

```jsx
export const HelloWorld = () => {
  qwik: true

  return <div>Hello world</div>
};
```

or 

```jsx
export function HelloWorld() {
  qwik: true

  return <div>Hello world</div>
}
```

compiles to

```jsx
import { $component } from "@builder.io/qwik"

export const HelloWorld = $component(() => {
  return <div>Hello world</div>
})

```

## signal

Macro for using qwik signals.

```jsx
export function Counter() {
  qwik: true
  signal: {
    var count = 0
  }
  return (
    <>
      <div>Value is: {count}</div>
      <button onClick$={() => count++}>Increment</button>
    </>
  );
}
```

compiles to

```jsx
import { useSignal, $component } from "@builder.io/qwik"

export const Counter = component$(() => {
  const count = useSignal(0);
  return (
    <>
      <div>Value is: {count.value}</div>
      <button onClick$={() => count.value++}>Increment</button>
    </>
  );
});
```

## computed

Macro for create a reactive variable.

```jsx
function ComputedExample() {
  qwik: true
  signal: {
    var count = 1
  }
  computed: {
    var doubleCount = 2 * count
  }
  return <div>{count} / {doubleCount}</div>
}
```

compiles to

```jsx
import { useSignal } from "@builder.io/qwik";
import { useTask$ } from "@builder.io/qwik";
import { $component } from "@builder.io/qwik"

const ComputedExample = component$(() => {
  const count = useSignal(1);
  const doubleCount = useSignal(2 * count.value);
  useTask$(({ track  })=>{
    const __count = track(()=>count.value);
    doubleCount.value = 2 * __count;
  });
  return <div>{count} / {doubleCount}</div>
})
```

## store

Macro for using qwik store.

```jsx
export function LocalStateExample() {
  qwik: true
  store: {
    var state = {
      value: 0
    }
  }
  return <div>Value is: {state.value}</div>
}
```

compiles to

```jsx
import { useStore, $component } from "@builder.io/qwik"

export const LocalStateExample = component$(() => {
  const state = useStore({
    value: 0,
  });
  return <div>Value is: {state.value}</div>;
});
```

## resource

Macro for qwik `useResource$`.

```js
function ResourceExample() {
  qwik: true
  signal: {
    var bar = 'foo'
  }
  resource: async (ctx) => {
    ctx.track(() => bar);
    ctx.track(() => props.url);
    ctx.cleanup(() => console.log('cleanup'));

    var someResource = await expensiveCompute(bar, props.url);
  }
  return <div></div>
}
```

compiles to

```js
import { useSignal } from "@builder.io/qwik";
import { useResource$ } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

const ResourceExample = component$(() => {
  const bar = useSignal("foo");
  const someResource = useResource$(async (ctx)=>{
      ctx.track(()=>bar.value);
      ctx.track(()=>props.url);
      ctx.cleanup(()=>console.log("cleanup"));
      return await expensiveCompute(bar.value, props.url);
  });
})
```

## task

Macro for qwik `useTask$`.

```js
function DoubleCounter() {
  qwik: true
  signal: {
    var count = 1
    var doubleCount = 0
  }
  task: {
    console.log('component mounted')
  }
  task: ({track}) => {
    const newCount = track(() => count)
    doubleCount = 2 * newCount
  }
  return <div>{count} / {doubleCount}</div>
}
```

compiles to

```js
import { useSignal } from "@builder.io/qwik";
import { useTask$ } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

const DoubleCounter = component$(() => {
  const count = useSignal(1);
  const doubleCount = useSignal(0);
  useTask$(()=>{
    console.log("component mounted");
  });
  useTask$(({ track  })=>{
    const newCount = track(()=>count.value);
    doubleCount.value = 2 * newCount;
  });
  return <div>{count} / {doubleCount}</div>;
})
```

## vtask

Macro for qwik `useVisibleTask$`

```js
export function Clock() {
  qwik: true
  signal: {
    var seconds = 0
  }
  vtask: {
    const interval = setInterval(() => {
      seconds++
    }, 1000)
    return () => clearInterval(interval)
  }
  return <div>Seconds: {seconds}</div>
}
```

compiles to

```js
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"

export const Clock = component$(() => {
  const seconds = useSignal(0);
  useVisibleTask$(() => {
    const interval = setInterval(() => {
      seconds.value++;
    }, 1000);
    return () => clearInterval(interval);
  });

  return <div>Seconds: {seconds.value}</div>;
});
```

## events

Apply for all labels that starts with `on`, add event listener for qwik component.

```js
export function ClickableComponent() {
  qwik: true
  onclick: {
    alert('Alert from Clickable Component.');
  }

  return <div>click from other component 1</div>;
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { useOn } from "@builder.io/qwik";
export const ClickableComponent = component$(()=>{
  useOn("click", $(()=>{
    alert("Alert from Clickable Component.");
  }));
  return <div>click from other component 1</div>;
});
```

### document

```js
function KeyBoard() {
  qwik: true
  signal: {
    var keyPressed = ''
  }
  onkeydown: (event) => {
    document: true
    keyPressed = keyPressed + event.key;
  }

  return <div>{keyPressed}</div>;
}
```

or

```js
function KeyBoard() {
  qwik: true
  signal: {
    var keyPressed = ''
  }
  document: {
    onkeydown: (event) => {
      keyPressed = keyPressed + event.key;
    }
    onkeyup: (event) => {
      console.log('keyup')
    }
  }

  return <div>{keyPressed}</div>;
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { useOnDocument } from "@builder.io/qwik";
const KeyBoard = component$(()=>{
  const keyPressed = useSignal("");
  useOnDocument("keydown", $((event)=>{
    keyPressed.value = keyPressed.value + event.key;
  }));
  return <div>{keyPressed.value}</div>;
});
```

### window

```js
export function Online() {
  qwik: true
  window: {
    ononline: {
      alert('Your Device is now Online')
    }
    onoffline: {
      alert('Your Device is now Offline')
    }
  }

  return <div></div>
};
```

or

```js
export function Online() {
  qwik: true
  ononline: {
    window: true
    alert('Your Device is now Online')
  }
  onoffline: {
    window: true
    alert('Your Device is now Offline')
  }

  return <div></div>
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { useOnWindow } from "@builder.io/qwik";

export const Online = component$(()=>{
  useOnWindow("online", $(()=>{
    alert("Your Device is now Online");
  }));
  useOnWindow("offline", $(()=>{
    alert("Your Device is now Offline");
  }));
  return <div></div>;
})
```

## link

Macro for import a css file.

### single

```js
export const CmpStyles = () => {
  qwik: true
  link: './code-block.css?inline'

  return <span class="my-text">Some text</span>
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import __link0 from "./code-block.css?inline";

export const CmpStyles = component$(()=>{
  useStyles$(__link0);
  return <span class="my-text">Some text</span>;
});
```

### multiple

```js
export const CmpStyles = () => {
  qwik: true
  link: [
    './code-block.css?inline',
    './font-style.css?inline',
  ]

  return <span class="my-text">Some text</span>
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { useStyles$ } from "@builder.io/qwik";
import __link0 from "./code-block.css?inline";
import __link1 from "./font-style.css?inline";

export const CmpStyles = component$(()=>{
  useStyles$(__link0);
  useStyles$(__link1);
  return <span class="my-text">Some text</span>;
});
```

## css

Macro for use inline css.

```js
export const CmpStyles = () => {
  qwik: true
  css: `
    .my-text {
      color: red;
    }
  `
  return <span class="my-text">Some text</span>
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { useStyle$ } from "@builder.io/qwik";

export const CmpStyles = component$(()=>{
  useStyle$(`
    .my-text {
      color: red;
    }
  `);
  return <span class="my-text">Some text</span>;
});
```

## scoped

Macro for use scoped css link or string.

```js
export const CmpStyles = () => {
  qwik: true
  scoped: {
    link: './code-block.css?inline'

    css: `
      .my-text {
        color: red;
      }
    `
  }

  return <span class="my-text">Some text</span>
}
```

compiles to

```js
import { component$ } from "@builder.io/qwik";
import { useStyleScoped$ } from "@builder.io/qwik";
import __link0 from "./code-block.css?inline";

export const CmpStyles = component$(()=>{
  useStyleScoped$(__link0);
  useStyleScoped$(`
    .my-text {
      color: red;
    }
  `);
  return <span class="my-text">Some text</span>;
});
```