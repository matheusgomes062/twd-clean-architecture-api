import { Either, left, right } from '../../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { UserData } from './user-data'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-error'
import { Name } from './name'

export class User {
  public readonly email: Email
  public readonly name: Name

  private constructor (name: Name, email: Email) {
    this.email = email
    this.name = name
  }

  public static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError(userData.name))
    }

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(userData.email))
    }

    const name: Name = nameOrError.value as Name
    const email: Email = emailOrError.value as Email

    return right(new User(name, email))
  }
}
