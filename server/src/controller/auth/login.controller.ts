import { IncomingMessage, ServerResponse } from 'http'

export async function login(
  _url: URL,
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    // get body from buffer to string
    const { email, password } = (await getBody(req)) as IRegisterInfo

    const existingUser: IUser = await UserRepository.getByEmail(email)

    if (existingUser) throw new BadReqErr('Email in use')

    const hashed = await PasswordService.toHash(password)

    const user: IUser = await UserRepository.create({ email, password: hashed })

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

// const { email, password } = req.body

// const existUser = await UserRepository.getByEmail(email)

// if (!existUser) throw new BadReqErr('Invalid credentials')

// const matchedPass = await PasswordService.compare(existUser.password, password)

// if (!matchedPass) throw new BadReqErr('Invalid Credentials')

// // Generate JWT
// const userJwt = jwt.sign(
//   {
//     id: existUser.id,
//     email: existUser.email
//   },
//   process.env.JWT_KEY!
// )

// // Store it on session object
// req.session = {
//   jwt: userJwt
// }

// console.log(req.session)

// res.status(200).send([userRefine(existUser, userJwt)])
