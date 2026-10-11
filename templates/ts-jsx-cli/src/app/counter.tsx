import type { Action } from "hyperapp"

type CounterProps<S> = {
  clicks: number
  onclick: Action<S>
}

const Counter = <S,>({ clicks, onclick }: CounterProps<S>) => (
  <div class="card">
    <button onclick={onclick}>Clicks: {clicks}</button>
  </div>
)

export default Counter
