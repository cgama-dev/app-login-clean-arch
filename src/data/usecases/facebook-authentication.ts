import { AuthenticationError } from '@/domain/error'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { LoadUserAccountRespository, CreateUserAccountRespository, UpdateUserWithFacebookRespoitory } from '@/data/contracts/repository/user-account'

export class FacebookAuthenticationUseCase {
  constructor (
    private readonly apiFacebook: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRespository & CreateUserAccountRespository & UpdateUserWithFacebookRespoitory
  ) {}

  async execute (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbUserData = await this.apiFacebook.loadFacebookUser({ token: params.token })
    if (fbUserData !== undefined) {
      const userAccount = await this.userAccountRepository.get({ email: fbUserData.email })
      if (userAccount?.name !== undefined) {
        await this.userAccountRepository.updateUserWithFacebook({
          id: userAccount.id,
          name: userAccount.name,
          facebookId: fbUserData.facebookId
        })
      } else {
        await this.userAccountRepository.createFromFacebook(fbUserData)
      }
    }
    return new AuthenticationError()
  }
}
