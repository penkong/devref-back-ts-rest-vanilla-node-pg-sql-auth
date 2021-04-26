import { IncomingMessage } from 'http'

import { config } from '../config'

export class UrlRefiner {
  //

  static maker(
    url: string,
    baseUrl: string = `http://localhost:${config.PORT}`
  ): URL {
    return new URL(url, baseUrl)
  }

  static checker(url: URL, req: IncomingMessage): boolean {
    if (url.pathname === '/favicon.ico') return false

    const methods = ['GET', 'POST']

    if (!methods.includes(req.method!)) return false

    const pathname = url.pathname.split('/').splice(1).slice(0, 3).join('/')

    if (pathname != 'api/v1/auth') return false

    return true
  }
}
