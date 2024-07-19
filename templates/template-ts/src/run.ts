import { app } from "hyperapp"
import { init, view } from "./main"
const node = document.querySelector("#app")
if (!node) throw new Error("mountpoint not found")
export const dispatch = app({ init, view, node })
