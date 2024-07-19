import { init, view } from "./main"
import renderApp from "vite-plugin-hyperapp/ssr"
export async function render() {
  return await renderApp({ init, view })
}
