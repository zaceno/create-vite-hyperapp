import "./style.css"
import hyperappLogo from "./hyperapp.svg"
import viteLogo from "/vite.svg"
import Counter from "./counter"

export const init = () => ({
  counter: 0,
})

const HandleClick = state => ({
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
  </>
)

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
