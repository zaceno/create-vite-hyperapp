# create-vite-hyperapp

Create a project using [Hyperapp](https://github.com/jorgebucaran/hyperapp) and [Vite](https://vite.dev/). The generated projects use [vite-plugin-hyperapp](https://github.com/zaceno/vite-plugin-hyperapp#readme) for development, builds, and optional server-side rendering; see its README for more about the plugin.

## Usage

```text
Usage: npm create vite-hyperapp -- [name] [options]

Create a Vite + Hyperapp project in an empty directory.
Run without arguments to choose options interactively.

Arguments:
  name                            Project name and directory (default: hyperapp-app)
                                  Use . or ./ for the current empty directory.

Options:
  --types=none|jsdoc|typescript   Type checking (default: typescript)
  --views=plain|html|jsx          View style (default: jsx)
  --ssr=no|yes                    Server-side rendering (default: no)
  -h, --help                      Show this message and exit

Examples:
  npm create vite-hyperapp -- my-app --types=jsdoc --views=html --ssr=yes
  npm create vite-hyperapp -- .
```

## Writing views

Choose how you want to write Hyperapp's view functions. These examples show the same counter component in plain JavaScript; your choice of view style is independent of your choice of typing system.

### Plain Hyperapp (`--views=plain`)

Use Hyperapp's built-in `h` and `text` functions:

```js
import { h, text } from "hyperapp"

const Counter = ({ clicks, onclick }) =>
  h("div", { class: "card" }, [
    h("button", { onclick }, text("Clicks: " + clicks)),
  ])
```

### HTML functions (`--views=html`)

Use tags from `@hyperapp/html` as functions:

```js
import { div, button, text } from "@hyperapp/html"

const Counter = ({ clicks, onclick }) =>
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))
```

### JSX (`--views=jsx`)

Write markup-like components in `.jsx` files:

```jsx
const Counter = ({ clicks, onclick }) => (
  <div class="card">
    <button onclick={onclick}>Clicks: {clicks}</button>
  </div>
)
```

## Typing

Choose separately whether—and how—to type-check your project. The following examples all use the HTML-function view style so you can compare the same component.

### JavaScript without type-checking (`--types=none`)

Write JavaScript without type annotations. `npm run build` does not run a type checker:

```js
import { div, button, text } from "@hyperapp/html"

const Counter = ({ clicks, onclick }) =>
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))
```

### JavaScript with JSDoc type-checking (`--types=jsdoc`)

Keep `.js`/`.jsx` files and add types in [JSDoc comments](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html). The build runs TypeScript's checker on your JavaScript:

```js
import { div, button, text } from "@hyperapp/html"

/**
 * @template S
 * @typedef CounterProps
 * @property {number} clicks
 * @property {Action<S>} onclick
 */

/**
 * @template S
 * @param {CounterProps<S>} props
 */
const Counter = ({ clicks, onclick }) =>
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))
```

Here `Action<S>` is available from the generated project's `src/types/global.d.ts`.

### TypeScript (`--types=typescript`)

Use [TypeScript syntax](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) in `.ts`/`.tsx` files. The build type-checks the project before bundling:

```ts
import { div, button, text } from "@hyperapp/html"
import type { Action } from "hyperapp"

type CounterProps<S> = {
  clicks: number
  onclick: Action<S>
}

const Counter = <S>({ clicks, onclick }: CounterProps<S>) =>
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))
```

## Server-side rendering

With `--ssr=yes`, the server sends the initial view as HTML, so visitors can see it before the client app finishes loading. This can improve perceived loading speed. When the client starts, Hyperapp recycles the server-provided DOM rather than replacing it. The generated project includes separate client and server entries and a server for development and production. See the [vite-plugin-hyperapp SSR documentation](https://github.com/zaceno/vite-plugin-hyperapp#server-side-rendering) for more detail.
