import { init, view } from "./app/main"
import { renderToString } from "vite-plugin-hyperapp/ssr"
export function render() {
  return renderToString({ init, view })
}
