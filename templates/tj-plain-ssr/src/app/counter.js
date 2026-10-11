import { h, text } from "hyperapp"

/**
 * @template S
 * @typedef CounterProps
 * @property {number} clicks
 * @property {Action<S>} onclick
 */

/**
 * @template S
 * @param {CounterProps<S>} props
 */
const Counter = ({ clicks, onclick }) =>
  h("div", { class: "card" }, [
    h("button", { onclick }, text("Clicks: " + clicks)),
  ])

export default Counter
