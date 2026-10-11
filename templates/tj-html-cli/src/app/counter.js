import { div, button, text } from "@hyperapp/html"
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
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))

export default Counter
