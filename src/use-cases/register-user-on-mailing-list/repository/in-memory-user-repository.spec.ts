import { UserData } from '../../../entitites/user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('shuld return user if it is in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@mail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({ name, email })
    const user = await sut.findUserByEmail('any@mail.com')
    expect(user.name).toBe('any_name')
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [{ name: 'any_name', email: 'any@mail.com' },
      { name: 'second_name', email: 'second@mail.com' }]
    const sut = new InMemoryUserRepository(users)
    const returnedUsers = sut.findAllUsers()
    expect((await returnedUsers).length).toBe(2)
  })
})
