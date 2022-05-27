import { User } from '../types/models'
export class LocalStorageHandler {
  private static _token = localStorage.getItem('token')
  private static _user = localStorage.getItem('user')

  static get token(): string {
    return this._token || ''
  }

  static set token(jwt: string) {
    localStorage.setItem('token', jwt)
    this._token = jwt
  }

  static set user(userObj: User | null) {
    const stringified = JSON.stringify(userObj)
    this._user = stringified
    localStorage.setItem('user', stringified)
  }

  static get user(): User | null {
    if (this._user) {
      return JSON.parse(this._user) as User
    }

    return null
  }

  static clearToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this._token = null
    this._user = null
  }
}
