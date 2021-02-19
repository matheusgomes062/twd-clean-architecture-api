import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from '@/web-controllers/register-user-controller'
import { UserData } from '@/entities'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { UseCase } from '@/usecases/ports/use-case'

describe('Register user web Controller', () => {
  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterUserController = new RegisterUserController(usecase)

  test('should return 201 if request contains valid data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return 400 if request contains invalid name', async () => {
    const invalidRequest: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return 400 if request contains invalid email', async () => {
    const invalidRequest: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'invalid_email.com'
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return 400 if request is missing user name', async () => {
    const invalidRequest: HttpRequest = {
      body: {
        email: 'any@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return 400 if request is missing email', async () => {
    const invalidRequest: HttpRequest = {
      body: {
        name: 'Any name'
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('should return 400 if request is missing name and email', async () => {
    const invalidRequest: HttpRequest = {
      body: {
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
  })

  test('should return 500 if server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }
    const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()
    const controller: RegisterUserController = new RegisterUserController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
