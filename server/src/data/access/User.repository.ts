export class UserRepository {
  static getByEmail(email: string) {
    console.log(email)
  }

  static create(info: any) {
    console.log(info)
    return info
  }
}
