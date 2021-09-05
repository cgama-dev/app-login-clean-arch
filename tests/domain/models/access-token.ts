import { AccessToken } from '@/domain/models/access-token'

describe('AccessToken', () => {
  it('should create with a value', () => {
    const accessToken = new AccessToken('any_value')
    expect(accessToken).toEqual({ value: 'any_value' })
  })
  it('should expire in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toEqual(1800000)
  })
})
