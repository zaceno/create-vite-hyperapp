import "./style.css"
import type { Action } from "hyperapp"
import { main, h1, p, text } from "@hyperapp/html"
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
  main({ id: "app" }, [
    h1(text("Vite (SSR) + Hyperapp + TypeScript")),
    ...Logos(),
    Counter({ clicks: state.counter, onclick: HandleClick }),
    p(
      { class: "read-the-docs" },
      text("Click on the Vite, Hyperapp & TypeScript logos to learn more"),
    ),
  ])
