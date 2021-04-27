/*
 ** Description :
 */
import jwt from 'jsonwebtoken'

import { IncomingMessage, ServerResponse } from 'http'

import { getBody } from '../../util'
import { config } from '../../config/'
import { UserRepository } from '../../data'
import { PasswordService } from '../../service'
// import { BadReqErr } from 'error/BadReqErr.error'

// ---

const { JWT_KEY } = config

interface IRegisterInfo {
  email: string
  password: string
}

// ---

export const register = async (
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) => {
  // get body
  const { email, password } = (await getBody(req)) as IRegisterInfo

  await UserRepository.getByEmail(email)
  // if (existingUser) {
  //   throw new BadReqErr('Email in use')
  // }

  const hashed = await PasswordService.toHash(password)
  const user = await UserRepository.create({ email, password: hashed })

  console.log(email, password)
  res.end()

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    JWT_KEY!
  )
  console.log(userJwt)
  // Store it on session object

  // req.session = {
  //   jwt: userJwt
  // }
}
