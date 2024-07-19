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

  let vite
  if (!isProduction) {
    const { createServer } = await import("vite")
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
      base,
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import("compression")).default
    const sirv = (await import("sirv")).default
    app.use(compression())
    app.use(base, sirv("./dist/client", { extensions: [] }))
  }

  app.use("*", async (req, res) => {
    const url = req.originalUrl.replace(base, "")
    try {
      let template
      let render
      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile("./index.html", "utf-8")
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule("/src/entry-server.js")).render
      } else {
        template = await fs.readFile("./dist/client/index.html", "utf-8")
        render = (await import("./dist/server/entry-server.js")).render
      }
      const html = template.replace(`<!--ssr-outlet-->`, await render())
      res.status(200).set({ "Content-Type": "text/html" }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
}

createServer()
