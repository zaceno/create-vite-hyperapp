const Counter = ({ clicks, onclick }) => (
  <div class="card">
    <button onclick={onclick}>Clicks: {clicks}</button>
  </div>
)

export default Counter
