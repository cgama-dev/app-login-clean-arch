export interface LoadUserAccountRespository {
  get: (params: LoadUserAccountRespository.Params) => Promise<LoadUserAccountRespository.Result>
}

namespace LoadUserAccountRespository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface SaveUserAccountRespository {
  saveUserWithFacebook: (params: SaveUserAccountRespository.Params) => Promise<SaveUserAccountRespository.Result>
}

namespace SaveUserAccountRespository {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }

  export type Result = {
    id: string
  }
}
