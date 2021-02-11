import { User } from '@/entities'

describe('User class entity', () => {
  test('should not create user with invalid email address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: 'invalid_email' }).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual('Invalid email: ' + invalidEmail + '.')
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O'
    const error = User.create({ name: invalidName, email: 'any@mail.com' }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName + '.')
  })

  // test('should not create user with invalid name (too many characters)', () => {
  //   const error = User.create({ name: 'O'.repeat(257), email: 'any@mail.com' })
  //   expect(error).toEqual(left(new InvalidNameError()))
  // })

  test('should create user with valid data', () => {
    const user: User = User.create({ name: 'valid name', email: 'any@mail.com' }).value as User
    expect(user.name.value).toBe('valid name')
    expect(user.email.value).toBe('any@mail.com')
  })
})
