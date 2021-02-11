import { Name, Email, UserData } from '@/entities'
import { Either, left, right } from '@/shared'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'

export class User {
    public readonly email: Email;
    public readonly name: Name;

    private constructor (name: Name, email: Email) {
      this.name = name
      this.email = email
    }

    static create (userData: UserData): Either<InvalidEmailError | InvalidNameError, User> {
      const emailOrError = Email.create(userData.email)
      const nameOrError = Name.create(userData.name)

      if (nameOrError.isLeft()) {
        return left(nameOrError.value)
      }

      if (emailOrError.isLeft()) {
        return left(emailOrError.value)
      }

      const name: Name = nameOrError.value as Name
      const email: Email = emailOrError.value as Email

      return right(new User(name, email))
    }
}
