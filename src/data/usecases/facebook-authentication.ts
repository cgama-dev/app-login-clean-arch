import { AuthenticationError } from '@/domain/error'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { LoadUserAccountRespository, SaveUserAccountRespository } from '@/data/contracts/repository/user-account'
import { FacebookAccount } from '@/domain/models/facebook-account'

export class FacebookAuthenticationUseCase {
  constructor (
    private readonly apiFacebook: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRespository & SaveUserAccountRespository
  ) {}

  async execute (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbUserData = await this.apiFacebook.loadFacebookUser({ token: params.token })
    if (fbUserData !== undefined) {
      const userAccount = await this.userAccountRepository.get({ email: fbUserData.email })
      const fbAccount = new FacebookAccount(fbUserData, userAccount)
      await this.userAccountRepository.saveUserWithFacebook(fbAccount)
    }
    return new AuthenticationError()
  }
}
