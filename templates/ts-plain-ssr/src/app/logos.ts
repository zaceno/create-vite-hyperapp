import { h } from "hyperapp"
import viteLogo from "@/assets/vite.svg"
import typescriptLogo from "@/assets/typescript.svg"
import hyperappLogo from "@/assets/hyperapp.svg"

const Logos = () => [
  h("a", { href: "https://vitejs.dev" }, [
    h("img", {
      src: viteLogo,
      class: "logo",
      alt: "Vite logo",
    }),
  ]),
  h("a", { href: "https://github.com/jorgebucaran/hyperapp" }, [
    h("img", {
      src: hyperappLogo,
      class: "logo",
      alt: "Hyperapp logo",
    }),
  ]),
  h("a", { href: "https://www.typescriptlang.org/" }, [
    h("img", {
      src: typescriptLogo,
      class: "logo",
      alt: "TypeScript logo",
    }),
  ]),
]

export default Logos
