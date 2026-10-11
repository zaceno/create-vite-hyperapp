import { h, text, type Action } from "hyperapp"

type CounterProps<S> = {
  clicks: number
  onclick: Action<S>
}

const Counter = <S>({ clicks, onclick }: CounterProps<S>) =>
  h("div", { class: "card" }, [
    h("button", { onclick }, text("Clicks: " + clicks)),
  ])

export default Counter
