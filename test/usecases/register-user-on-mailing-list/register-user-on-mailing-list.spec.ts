import { UserData } from '../../../src/use-cases/entitites/user-data'
import { UserRepository } from '../../../src/use-cases/register-user-on-mailing-list/ports/user-repository'
import { RegisterUserOnaMailingList } from '../../../src/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../../src/use-cases/register-user-on-mailing-list/repository/in-memory-user-repository'

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
    const invalidemail = 'invalid_email'
    const response = (await usecase.registerUserOnMailingList({ name: name, email: invalidemail })).value as Error
    const user = await repo.findUserByEmail(invalidemail)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnaMailingList = new RegisterUserOnaMailingList(repo)
    const invalidName = ''
    const email = 'any@email.com'
    const response = (await usecase.registerUserOnMailingList({ name: invalidName, email: email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
