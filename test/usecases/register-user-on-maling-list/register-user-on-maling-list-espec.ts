import { UserData } from '@/entities'
import { UserRepository } from '@/usecases/register-user-on-maling-list/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-maling-list'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-maling-list/repository'

describe('Register User on Mailing List use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any_@email.com'
    const response = await usecase.perform({ name, email })
    const user = repo.findUserByEmail(email)
    expect(await user).toBe(name)
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = (await usecase.perform({ name: name, email: invalidemail })).value as Error
    const user = await repo.findUserByEmail('invalidemail')
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidname = ''
    const email = 'any@mail.com'
    const response = (await usecase.perform({ name: invalidname, email: email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
