export interface LoadFacebookUserApi {
  loadFacebookUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined | {
    email: string
    name: string
    facebookId: string
  }
}
