import "./style.css"
import { h, text } from "hyperapp"
import Counter from "./counter"
import Logos from "./logos"

export const init = () => ({
  counter: 0,
})

const HandleClick = state => ({
  ...state,
  counter: state.counter + 1,
})

export const view = state =>
  h("main", { id: "app" }, [
    h("h1", {}, text("Vite + Hyperapp")),
    ...Logos(),
    Counter({ clicks: state.counter, onclick: HandleClick }),
    h(
      "p",
      { class: "read-the-docs" },
      text("Click on the Vite & Hyperapp logos to learn more"),
    ),
  ])
