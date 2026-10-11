import "./style.css"
import { main, h1, p, text } from "@hyperapp/html"
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
  main({ id: "app" }, [
    h1(text("Vite + Hyperapp")),
    ...Logos(),
    Counter({ clicks: state.counter, onclick: HandleClick }),
    p(
      { class: "read-the-docs" },
      text("Click on the Vite & Hyperapp logos to learn more"),
    ),
  ])
