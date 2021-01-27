import { UserData } from '@/entitites'
import { UserRepository } from '@/use-cases/register-user-on-mailing-list/ports'
import { RegisterUserOnaMailingList } from '@/use-cases/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('Register user on maling list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnaMailingList = new RegisterUserOnaMailingList(repo)
    const name = 'any_name'
    const email = 'any_@email.com'
    const response = await usecase.RegisterUserOnaMailingList({ name, email })
    const user = repo.findUserByEmail(email)
    expect(await user).toBe(name)
    expect(response.value.name).toBe('any_name')
  })

  test('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnaMailingList = new RegisterUserOnaMailingList(repo)
    const name = 'any_name'
    const invalidemail = 'invalid_email'
    const response = (await usecase.RegisterUserOnaMailingList({ name: name, email: invalidemail })).value as Error
    const user = await repo.findUserByEmail('invalidemail')
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('should not add user with invalid name to maling list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnaMailingList = new RegisterUserOnaMailingList(repo)
    const invalidname = ''
    const email = 'any@mail.com'
    const response = (await usecase.RegisterUserOnaMailingList({ name: invalidname, email: email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
