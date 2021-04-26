import { IncomingMessage, ServerResponse } from 'http'

import { validRoutes } from '../util'
import { register, login, currentUser, logout } from '../controller'

export class Router {
  static dispatch(r: string, req: IncomingMessage, res: ServerResponse) {
    if (r == validRoutes[0]) register(req, res)

    if (r == validRoutes[1]) login(req, res)

    if (r == validRoutes[2]) currentUser(req, res)

    if (r == validRoutes[3]) logout(req, res)
  }
}
