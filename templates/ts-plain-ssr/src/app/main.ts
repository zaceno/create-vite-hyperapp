import "./style.css"
import { h, text, type Action } from "hyperapp"
import Counter from "./counter"
import Logos from "./logos"

type State = { counter: number }

export const init: Action<State> = () => ({
  counter: 0,
})

const HandleClick: Action<State> = state => ({
  ...state,
  counter: state.counter + 1,
})

export const view = (state: State) =>
  h("main", { id: "app" }, [
    h("h1", {}, text("Vite (SSR) + Hyperapp + TypeScript")),
    ...Logos(),
    Counter({ clicks: state.counter, onclick: HandleClick }),
    h(
      "p",
      { class: "read-the-docs" },
      text("Click on the Vite, Hyperapp & TypeScript logos to learn more"),
    ),
  ])
