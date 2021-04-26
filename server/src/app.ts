import http, { IncomingMessage, ServerResponse } from 'http'

import { validRoutes } from './util'
import { Router } from './routes'
import { UrlRefiner } from './service/'

// ---

export const app = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //

    if (req.url == undefined) return res.end()

    const url = UrlRefiner.maker(req.url)

    const isOk = UrlRefiner.checker(url, req)

    if (!isOk) return res.end()

    const r = req.method + url.pathname

    if (!validRoutes.includes(r)) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify({ message: 'Route Not Found' }))
      res.end()
    }

    Router.dispatch(r, req, res)
  }
)
