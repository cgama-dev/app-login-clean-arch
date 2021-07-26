import { AuthenticationError } from '@/domain/error'
import { FacebookAuthenticationUseCase } from '@/data/usecases'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRespository, CreateUserAccountRespository, UpdateUserWithFacebookRespoitory } from '@/data/contracts/repository/user-account'

describe('FacebookAuthenticationUseCase', () => {
  let apiFacebookMemory: MockProxy<LoadFacebookUserApi>
  let userAccountRespositoryMemory: MockProxy<LoadUserAccountRespository & CreateUserAccountRespository & UpdateUserWithFacebookRespoitory>
  let facebookAuthenticationUseCase: FacebookAuthenticationUseCase
  const token = 'any_token'
  beforeEach(() => {
    apiFacebookMemory = mock()
    userAccountRespositoryMemory = mock()
    apiFacebookMemory.loadFacebookUser.mockResolvedValue({
      email: 'any_fb_email',
      name: 'any_fb_name',
      facebookId: 'any_fb_id'
    })
    facebookAuthenticationUseCase = new FacebookAuthenticationUseCase(
      apiFacebookMemory,
      userAccountRespositoryMemory
    )
  })
  it('should call LoadFacebookUserApi with corrent params', async () => {
    await facebookAuthenticationUseCase.execute({ token })
    expect(apiFacebookMemory.loadFacebookUser).toHaveBeenCalledWith({ token })
    expect(apiFacebookMemory.loadFacebookUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookApi return undefined', async () => {
    apiFacebookMemory.loadFacebookUser.mockResolvedValueOnce(undefined)
    const authResult = await facebookAuthenticationUseCase.execute({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserByEmailRepository wheren LoadFacebookApi returns data', async () => {
    await facebookAuthenticationUseCase.execute({ token })
    expect(userAccountRespositoryMemory.get).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRespositoryMemory.get).toHaveBeenCalledTimes(1)
  })

  it('should call CreateUserAccountRepo when LoadUserAccountRespository returns undefined', async () => {
    userAccountRespositoryMemory.get.mockResolvedValueOnce(undefined)
    await facebookAuthenticationUseCase.execute({ token })
    expect(userAccountRespositoryMemory.createFromFacebook).toHaveBeenCalledWith(
      {
        email: 'any_fb_email',
        name: 'any_fb_name',
        facebookId: 'any_fb_id'
      }
    )
    expect(userAccountRespositoryMemory.createFromFacebook).toHaveBeenCalledTimes(1)
  })
  it('should call UpdateWithFacebookUserAccountRepo when LoadUserAccountRespository returns data', async () => {
    userAccountRespositoryMemory.get.mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name'
    })
    await facebookAuthenticationUseCase.execute({ token })
    expect(userAccountRespositoryMemory.updateUserWithFacebook).toHaveBeenCalledWith(
      {
        id: 'any_id',
        name: 'any_name',
        facebookId: 'any_fb_id'
      }
    )
    expect(userAccountRespositoryMemory.updateUserWithFacebook).toHaveBeenCalledTimes(1)
  })
})
