import "./style.css"
import { main, h1, p, text } from "@hyperapp/html"
import Counter from "./counter"
import Logos from "./logos"

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
export const view = state =>
  main({ id: "app" }, [
    h1(text("Vite (SSR) + Hyperapp")),
    ...Logos(),
    Counter({ clicks: state.counter, onclick: HandleClick }),
    p(
      { class: "read-the-docs" },
      text("Click on the Vite & Hyperapp logos to learn more"),
    ),
  ])
