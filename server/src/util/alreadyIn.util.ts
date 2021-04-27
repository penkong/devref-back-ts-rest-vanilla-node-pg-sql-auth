import { IncomingMessage, ServerResponse } from 'http'

export const alreadyIn = (req: IncomingMessage, res: ServerResponse) => {
  const cookie = req.headers.cookie?.split('=')

  if (cookie && cookie[0] == 'vanillajwt' && cookie[1].length > 0) {
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: 'Already Signed In!' }]))
    res.end()
    return
  }
}
