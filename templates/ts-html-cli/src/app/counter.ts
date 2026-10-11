import { div, button, text } from "@hyperapp/html"
import type { Action } from "hyperapp"

type CounterProps<S> = {
  clicks: number
  onclick: Action<S>
}

const Counter = <S>({ clicks, onclick }: CounterProps<S>) =>
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))

export default Counter
