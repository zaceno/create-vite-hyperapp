import type { Action } from "hyperapp"

type CounterProps = {
  clicks: number
  onclick: Action<any>
}

const Counter = ({ clicks, onclick }: CounterProps) => (
  <div class="card">
    <button onclick={onclick}>Clicks: {clicks}</button>
  </div>
)

export default Counter
