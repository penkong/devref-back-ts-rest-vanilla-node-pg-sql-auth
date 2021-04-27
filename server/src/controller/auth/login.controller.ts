import jwt from 'jsonwebtoken'

import { IncomingMessage, ServerResponse } from 'http'

import { config } from '../../config'
import { BadReqErr } from '../../error'
import { UserRepository } from '../../data'
import { PasswordService } from '../../service'
import { getBody, userRefine } from '../../util'
import { IRegisterInfo, IUser } from '../../@types'

// ---

const { JWT_KEY } = config

export async function login(
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    // get body from buffer to string
    const { email, password } = (await getBody(req)) as IRegisterInfo

    const user: IUser = await UserRepository.getByEmail(email)

    if (!user) throw new BadReqErr('Wrong Inputs!')

    const isMatched = await PasswordService.compare(user.hashed_pass, password)

    if (!isMatched) throw new BadReqErr('Invalid Creds!')

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.user_id,
        email: user.email
      },
      JWT_KEY!
    )

    res.setHeader(
      'Set-cookie',
      `vanillajwt=${userJwt};path=/;expires=${new Date(
        new Date().getTime() + 86409000
      ).toUTCString()}`
    )

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([userRefine(user, userJwt)]))
    res.end()

    return
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify([{ message: error.message }]))
    res.end()

    return
  }
}
