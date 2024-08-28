import { IUserService } from './interface/service.interface'
import { IUserRepository } from './interface/repository.interface'
import {
  forkJoin,
  Observable,
  of
} from 'rxjs'
import { IUserModel } from './interface/model.interface'
import {
  map,
  mergeMap, tap,
  throwIfEmpty
} from 'rxjs/operators'
import {
  BadRequestException,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { ObjectId } from 'bson'
import * as _ from 'lodash'
import {
  ICreateUserValidator,
  IUpdateUserValidator
} from './interface/validator.interface'
import { UserBuilder } from './user.builder'

export class UserService implements IUserService {
  constructor(
    private readonly _userRepository: IUserRepository
  ) {
  }

  public getAll(): Observable<IUserModel> {
    return this._userRepository.find().pipe(
      throwIfEmpty(() => {
        throw new HttpException(
          `User not found`,
          HttpStatus.NOT_FOUND
        )
      })
    )
  }

  public getById(id: string): Observable<IUserModel> {
    const queryById = {
      _id: new ObjectId(id)
    }
    return this._userRepository.find(queryById).pipe(
      throwIfEmpty(() => {
        throw new HttpException(
          `User Not Found`,
          HttpStatus.NOT_FOUND
        )
      })
    )
  }

  public save(input: ICreateUserValidator): Observable<{ id: string }> {
    return this._userRepository.count({ username: input.getUsername() }).pipe(
      mergeMap((total: number) => {
        if (total === 0) {
          const builder = new UserBuilder()
          builder
            .setUsername(input.getUsername())
            .setPassword(input.getPassword())
            .setName(input.getName())
            .setEmail(input.getEmail())
            .setPhone(input.getPhone())
            .setSuspended(false)
            .setCreatedAt(new Date())
            .setCreatedBy(input.getCreatedBy())
          return this._userRepository.save(builder.build())
        } else {
          throw new BadRequestException(`username: ${input.getUsername()} is duplicate`)
        }
      })
    )

  }

  public challengeUserAccount(username: string, password: string): Observable<IUserModel> {
    return this._userRepository.getByUsername(username).pipe(
      tap(model => {
        if (model.isSuspended() || !model.challengePassword(password)) {
          throw new HttpException(
            `Authentication failed`,
            HttpStatus.UNAUTHORIZED
          )
        }
      })
    )
  }

  public update(input: IUpdateUserValidator): Observable<boolean> {
      if (!ObjectId.isValid(input.getId())) {
          throw new HttpException(
              `Invalid Role ID`,
              HttpStatus.NOT_FOUND,
          )
      }
      return this._userRepository.find({_id: new ObjectId(input.getId())}).pipe(
          throwIfEmpty(() => {
              throw new HttpException(
                  `User Not Found`,
                  HttpStatus.NOT_FOUND,
              )
          }),
          mergeMap((model: IUserModel) => {
              const userModel = model

              userModel.setName(!_.isNil(input.getName()) ? input.getName() : userModel.getName())
              userModel.setEmail(!_.isNil(input.getEmail()) ? input.getEmail() : userModel.getEmail())
              userModel.setPhone(!_.isNil(input.getPhone()) ? input.getPhone() : userModel.getPhone())
              userModel.setUpdatedBy(!_.isNil(input.getUpdatedBy()) ? input.getUpdatedBy() : userModel.getUpdatedBy())
              userModel.setUpdatedAt(new Date())
              return this._userRepository.update(userModel)
          }),
      )
  }

  public delete(id: string): Observable<boolean> {
      return this._userRepository.delete(id)
  }

  public updateSession(userId: string, sessionId: string): Observable<boolean> {
    return this.getById(userId).pipe(
      map((result: IUserModel) => {
        if (_.isNil(result)) {
          throw new HttpException(
            `Profile not found`,
            HttpStatus.BAD_REQUEST,
          )
        }
        return result
      }),
      map((model: IUserModel) => {
        model.setSessionId(sessionId)
        return model
      }),
      mergeMap(model => {
        return this._userRepository.update(model)
      }),
    )
  }
}
