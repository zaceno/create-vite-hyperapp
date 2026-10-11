import "./style.css"
import type { Action } from "hyperapp"
import Logos from "./logos"
import Counter from "./counter"

type State = { counter: number }

export const init: Action<State> = () => ({
  counter: 0,
})

const HandleClick: Action<State> = (state: State) => ({
  ...state,
  counter: state.counter + 1,
})

export const view = (state: State) => (
  <main id="app">
    <h1>Vite + Hyperapp + TypeScript</h1>
    <Logos />
    <Counter clicks={state.counter} onclick={HandleClick} />
    <p class="read-the-docs">
      Click on the Vite, Hyperapp & TypeScript logos to learn more
    </p>
  </main>
)
