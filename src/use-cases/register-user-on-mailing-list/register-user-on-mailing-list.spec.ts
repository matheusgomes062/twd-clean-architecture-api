import { left } from '../../shared/either'
import { UserData } from '../entitites/user-data'
import { InvalidEmailError } from '../entitites/errors/invalid-email-error'
import { UserRepository } from './ports/user-repository'
import { RegisterUserOnaMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on maling list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnaMailingList = new RegisterUserOnaMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnaMailingList = new RegisterUserOnaMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const invalidemail = 'invalid_email'
    const response = await usecase.registerUserOnMailingList({ name: name, email: invalidemail })
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })
})
