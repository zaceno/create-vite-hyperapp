import { h } from "hyperapp"
import hyperappLogo from "@/assets/hyperapp.svg"
import viteLogo from "@/assets/vite.svg"

const Logos = () => [
  h("a", { href: "https://vitejs.dev" }, [
    h("img", { src: viteLogo, class: "logo", alt: "Vite logo" }),
  ]),
  h("a", { href: "https://github.com/jorgebucaran/hyperapp" }, [
    h("img", {
      src: hyperappLogo,
      class: "logo",
      alt: "Hyperapp logo",
    }),
  ]),
]

export default Logos
