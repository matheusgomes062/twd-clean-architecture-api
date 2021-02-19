import { RegisterUserController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@test/usecases/register-user-on-mailing-list/node_modules/@/usecases/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repositorty'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingList = new RegisterUserOnMailingList(inMemoryUserRepository)
  return new RegisterUserController(registerUserOnMailingList)
}
