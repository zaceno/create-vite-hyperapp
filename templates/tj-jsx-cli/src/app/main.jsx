import "./style.css"
import Logos from "./logos"
import Counter from "./counter"

/** @type {AppAction} */
export const init = () => ({
  counter: 0,
})

/** @type {AppAction} */
const HandleClick = state => ({
  ...state,
  counter: state.counter + 1,
})

/** @param {State} state */
export const view = state => (
  <main id="app">
    <h1>Vite + Hyperapp</h1>
    <Logos />
    <Counter clicks={state.counter} onclick={HandleClick} />
    <p class="read-the-docs">
      Click on the Vite & Hyperapp logos to learn more
    </p>
  </main>
)
