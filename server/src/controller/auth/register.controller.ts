import { IncomingMessage, ServerResponse } from 'http'

export async function register(req: IncomingMessage, res: ServerResponse) {
  console.log(req.method)
  console.log(req.url)
  res.end()
}
