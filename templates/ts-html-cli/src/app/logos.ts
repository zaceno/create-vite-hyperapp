import { a, img } from "@hyperapp/html"
import viteLogo from "@/assets/vite.svg"
import typescriptLogo from "@/assets/typescript.svg"
import hyperappLogo from "@/assets/hyperapp.svg"

const Logos = () => [
  a(
    { href: "https://vitejs.dev" },
    img({
      src: viteLogo,
      class: "logo",
      alt: "Vite logo",
    }),
  ),
  a(
    { href: "https://github.com/jorgebucaran/hyperapp" },
    img({
      src: hyperappLogo,
      class: "logo",
      alt: "Hyperapp logo",
    }),
  ),
  a(
    { href: "https://www.typescriptlang.org/" },
    img({
      src: typescriptLogo,
      class: "logo",
      alt: "TypeScript logo",
    }),
  ),
]

export default Logos
