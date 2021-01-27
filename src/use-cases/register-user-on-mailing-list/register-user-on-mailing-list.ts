import { Either, left, right } from '@/shared'
import { InvalidEmailError, InvalidNameError } from '@/entitites/errors'
import { User, UserData } from '@/entitites'
import { UserRepository } from '@/use-cases/register-user-on-mailing-list/ports'

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
