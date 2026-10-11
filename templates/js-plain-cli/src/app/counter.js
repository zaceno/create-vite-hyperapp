import { h, text } from "hyperapp"

const Counter = ({ clicks, onclick }) =>
  h("div", { class: "card" }, [
    h("button", { onclick }, text("Clicks: " + clicks)),
  ])

export default Counter
