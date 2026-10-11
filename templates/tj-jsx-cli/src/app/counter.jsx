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
const Counter = ({ clicks, onclick }) => (
  <div class="card">
    <button onclick={onclick}>Clicks: {clicks}</button>
  </div>
)

export default Counter
