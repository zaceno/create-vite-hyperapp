import "./style.css"
import typescriptLogo from "./typescript.svg"
import hyperappLogo from "./hyperapp.svg"
import viteLogo from "/vite.svg"
import type { Action } from "hyperapp"
import Counter from "./counter"

type State = { counter: number }

export const init: Action<State> = () => ({
  counter: 0,
})

const HandleClick: Action<State> = (state: State) => ({
  ...state,
  counter: state.counter + 1,
})

const Logos = () => (
  <>
    <a href="https://vitejs.dev">
      <img src={viteLogo} class="logo" alt="Vite logo" />
    </a>
    <a href="https://hyperapp.dev/">
      <img src={hyperappLogo} class="logo vanilla" alt="Hyperapp logo" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src={typescriptLogo} class="logo vanilla" alt="TypeScript logo" />
    </a>
  </>
)

export const view = (state: State) => (
  <main id="app">
    <h1>Vite (SSR) + Hyperapp + TypeScript</h1>
    <Logos />
    <Counter clicks={state.counter} onclick={HandleClick} />
    <p class="read-the-docs">
      Click on the Vite, Hyperapp & TypeScript logos to learn more
    </p>
  </main>
)
