export class LocalStorageHandler {
  private static _token = localStorage.getItem('token')

  static get token(): string {
    return this._token || ''
  }

  static set token(jwt: string) {
    localStorage.setItem('token', jwt)
    this._token = jwt
  }

  static clearToken() {
    localStorage.removeItem('token')
    this._token = null
  }
}
