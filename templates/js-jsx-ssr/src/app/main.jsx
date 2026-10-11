import "./style.css"
import Logos from "./logos"
import Counter from "./counter"

export const init = () => ({
  counter: 0,
})

const HandleClick = state => ({
  ...state,
  counter: state.counter + 1,
})

export const view = state => (
  <main id="app">
    <h1>Vite (SSR) + Hyperapp</h1>
    <Logos />
    <Counter clicks={state.counter} onclick={HandleClick} />
    <p class="read-the-docs">
      Click on the Vite & Hyperapp logos to learn more
    </p>
  </main>
)
