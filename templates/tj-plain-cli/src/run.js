import { app } from "hyperapp"
import { init, view } from "./app/main"
const node = document.querySelector("#app")
if (!node) throw new Error("mountpoint not found")
app({ init, view, node })
