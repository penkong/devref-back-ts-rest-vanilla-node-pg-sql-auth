import { pool } from '../../service/'
import { IRegisterInfo } from '../../@types'

// ---

export class UserRepository {
  //

  static async getByEmail(email: string): Promise<any> {
    try {
      const { rows } = await pool.query(
        `select * from users where email = $1`,
        [email]
      )
      return rows[0]
    } catch (error) {
      console.log(error)
      return
    }
  }

  static async create({ email, password }: IRegisterInfo) {
    try {
      const {
        rows
      } = await pool.query(
        `insert into users(email, hashed_pass) values ($1, $2) returning *`,
        [email, password]
      )
      return rows[0]
    } catch (error) {
      console.log(error)
      return
    }
  }
}
