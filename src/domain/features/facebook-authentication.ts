import { AccessToken } from '@/domain/models/access-token'
import { AuthenticationError } from '@/domain/error'

// Cada feature do sistema será implamentada por um serviço ou caso de uso
export interface FacebookAuthentication {
  execute: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }
  export type Result = AccessToken | AuthenticationError
}
