import { div, button, text } from "@hyperapp/html"
const Counter = ({ clicks, onclick }) =>
  div({ class: "card" }, button({ onclick }, text("Clicks: " + clicks)))

export default Counter
