import { Either, left, right } from '../../shared/either'
import { InvalidEmailError } from '../../entitites/errors/invalid-email-error'
import { InvalidNameError } from '../../entitites/errors/invalid-name-error'
import { User } from '../../entitites/user'
import { UserData } from '../user-data'
import { UserRepository } from './ports/user-repository'

export class RegisterUserOnaMailingList {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async RegisterUserOnaMailingList (request: UserData): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError = User.create(request)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!await this.userRepo.exists(request)) {
      await this.userRepo.add(request)
    }
    return right(request)
  }
}
