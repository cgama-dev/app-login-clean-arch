import { AuthenticationError } from '@/domain/error'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis/facebook'
import { LoadUserAccountRespository, SaveUserAccountRespository } from '@/data/contracts/repository/user-account'
import { FacebookAccount } from '@/domain/models/facebook-account'
import { TokenGenerator } from '@/data/contracts/crypto/token'
export class FacebookAuthenticationUseCase {
  constructor (
    private readonly apiFacebook: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRespository & SaveUserAccountRespository,
    private readonly crypto: TokenGenerator
  ) {}

  async execute (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbUserData = await this.apiFacebook.loadFacebookUser({ token: params.token })
    if (fbUserData !== undefined) {
      const userAccount = await this.userAccountRepository.get({ email: fbUserData.email })
      const fbAccount = new FacebookAccount(fbUserData, userAccount)
      const { id } = await this.userAccountRepository.saveUserWithFacebook(fbAccount)
      await this.crypto.generateToken({ key: id })
    }
    return new AuthenticationError()
  }
}
