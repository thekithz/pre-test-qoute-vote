import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
  Post,
  Query,
  Req,
  ValidationPipe
} from '@nestjs/common'
import { providerNames } from '../../provider/provider.name'
import { IUserService } from '../../domain/user/interface/service.interface'
import {
  catchError,
  map,
  mergeMap,
  toArray
} from 'rxjs/operators'
import {
  EMPTY,
  from,
  of
} from 'rxjs'
import * as _ from 'lodash'
import {
  IUserDto,
  UserDto
} from '../user/user.dto'
import { Auth } from '../../common/auth'
import { IAuthService } from '../../common/interface/auth.interface'
import { Request } from 'express'
import { CreateUserValidator, LoginUserValidator } from '../user/user.validator'

@Controller('/login')
export class LoginController {
  constructor(
    @Inject(providerNames.USER_SERVICE)
    private readonly _userService: IUserService,
    @Inject(providerNames.AUTH_SERVICE)
    private readonly _auth: IAuthService
  ) {
  }

  @Post('/')
  public login(
      @Body() payload: LoginUserValidator,
  ) {
    return this._userService.challengeUserAccount(payload.getUsername(), payload.getPassword()).pipe(
      catchError(err => {
        throw err
      }),
      map((userModel) => {
        return UserDto.toUserDto(userModel)
      }),
      mergeMap(data => {
        return this._auth.generateToken(data)
      })
    )
  }

  @Get('/token/refresh')
  public refreshToken(
    @Req() req: any,
  ) {
    const token = _.get(req, 'headers.authorization', false)
    if (!token) {
      throw new HttpException(
        'Invalid Header',
        HttpStatus.BAD_REQUEST
      )
    }
    const result = this._auth.verifyToken(_.replace(token, 'Bearer ', ''))
    if (!result) {
      throw new HttpException(
        'Invalid Authorization',
        HttpStatus.BAD_REQUEST
      )
    }
    return this._userService.getById(result.id).pipe(
      map((userModel) => {
        return UserDto.toUserDto(userModel)
      }),
      mergeMap(data => {
        return this._auth.generateToken(data)
      })
    )
  }
}
