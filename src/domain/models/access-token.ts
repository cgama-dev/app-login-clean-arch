export class AccessToken {
  value: string
  constructor (accessAtoken: string) {
    this.value = accessAtoken
  }

  static get expirationInMs (): number {
    return 30 * 60 * 1000
  }
}
