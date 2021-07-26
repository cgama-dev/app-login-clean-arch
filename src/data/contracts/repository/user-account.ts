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

export interface CreateUserAccountRespository {
  createFromFacebook: (params: CreateUserAccountRespository.Params) => Promise<CreateUserAccountRespository.Result>
}

namespace CreateUserAccountRespository {
  export type Params = {
    email: string
    name: string
    facebookId: string
  }

  export type Result = string | undefined
}
export interface UpdateUserWithFacebookRespoitory {
  updateUserWithFacebook: (params: UpdateUserWithFacebookRespoitory.Params) => Promise<CreateUserAccountRespository.Result>
}

namespace UpdateUserWithFacebookRespoitory {
  export type Params = {
    id: string
    name: string
    facebookId: string
  }

  export type Result = undefined | {
    email: string
    name: string
    facebookId: string
  }
}
