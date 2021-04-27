/*
 ** Description :
 */
// import jwt from 'jsonwebtoken'

import { IncomingMessage, ServerResponse } from 'http'

// import { config } from '../../config/'
// import { PasswordService } from '../../service'

// const { JWT_KEY } = config

// ---

export const register = async (
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) => {
  let body = ''

  req.on('data', chunk => {
    body += chunk
  })

  req.on('end', () => {
    let postBody = JSON.parse(body.toString())
    console.log(postBody)
    let response = {
      text: 'Post Request Value is  ' + postBody.email
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(response))
    res.end()
  })

  // res.end()

  // Generate JWT
  // const userJwt = jwt.sign(
  //   {
  //     id: user.id,
  //     email: user.email
  //   },
  //   JWT_KEY!
  // )

  // // Store it on session object
  // req.session = {
  //   jwt: userJwt
}
