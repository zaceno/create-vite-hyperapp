/*
---------------------------------
Cribbed to large extent from template-ssr-solid/server.js 
---------------------------------
*/
import fs from "node:fs/promises"
import express from "express"

const isProduction = process.env.NODE_ENV === "production"
const port = process.env.PORT || 5173
const base = process.env.BASE || "/"

async function createServer() {
  const app = express()

  /** @type {import("vite").ViteDevServer | undefined} */
  let vite
  if (!isProduction) {
    const { createServer } = await import("vite")
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import("compression")).default
    const sirv = (await import("sirv")).default
    app.use(compression())
    app.use(base, sirv("./dist/client", { extensions: [] }))
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl
    if (!url.startsWith(base)) return next()
    try {
      let template
      let render
      if (!isProduction) {
        if (!vite) throw new Error("Vite dev server is not initialized")
        // Always read fresh template in development
        template = await fs.readFile("./index.html", "utf-8")
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule("/src/entry-server.js")).render
      } else {
        template = await fs.readFile("./dist/client/index.html", "utf-8")
        const serverEntry = "./dist/server/entry-server.js"
        render = (await import(serverEntry)).render
      }
      const html = template.replace(`<!--ssr-outlet-->`, () => render())
      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      if (e instanceof Error) vite?.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end()
    }
  })

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()
