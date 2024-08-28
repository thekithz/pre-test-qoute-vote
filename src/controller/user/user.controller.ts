import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Headers,
  Put,
  Param,
  Query,
  Req,
  Delete, UseGuards, Patch,
} from '@nestjs/common';
import { providerNames } from '../../provider/provider.name';
import { IUserService } from '../../domain/user/interface/service.interface';
import {
  map,
  mergeMap,
  reduce,
} from 'rxjs/operators';
import { UserDto } from './user.dto';
import * as _ from 'lodash';
import {
  CreateUserValidator,
  UpdateUserValidator,
} from './user.validator';
import { IAuthService } from '../../common/interface/auth.interface';
import * as jwt from 'jsonwebtoken';
import { UserGuard } from '../../common/guard/user.guard';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(providerNames.USER_SERVICE)
    private readonly _userService: IUserService,
    @Inject(providerNames.AUTH_SERVICE)
    private readonly _authService: IAuthService,
  ) {
  }

  @Get('/logout')
  public logoutUser(
    @Headers('authorization') authorizationToken: string,
  ) {
    return { success: true };
  }

  @Get('/')
  public getAllUser() {
    const dtoTemplate = {
      total: 0,
      data: [],
    };

    return this._userService.getAll().pipe(
      reduce((acc, model) => {
        if (_.isNil(model)) {
          return dtoTemplate;
        }
        acc.total++;
        acc.data.push(UserDto.toUserDto(model));
        return acc;
      }, dtoTemplate),
    );
  }

  @Post('/signup')
  public createNewProfile(
    @Headers('authorization') profileToken: string,
    @Body() payload: CreateUserValidator,
  ) {
    if (!_.isEmpty(profileToken)) {
      const profile: any = jwt.decode(profileToken.split(' ')[1]);
      const user = profile.username;
      payload.setCreatedBy(user);
    }
    return this._userService.save(payload);
  }

  // @UseGuards(UserGuard)
  // @Patch('/session')
  // public patchCookieSession(
  //   @Req() req: any,
  //   @Headers('authorization') profileToken: string,
  // ) {
  //   const profile: any = jwt.decode(profileToken.split(' ')[1]);
  //   req.session.user = profile.id;
  //   return this._userService.updateSession(profile.id, req.session.id).pipe(
  //     map(success => ({ success })),
  //   );
  // }

  @UseGuards(UserGuard)
  @Put('/update/:id')
  public UpdateUser(
    @Headers('authorization') token: string,
    @Param('id') id: string,
    @Body() body: UpdateUserValidator,
  ) {
    if (!_.isEmpty(token)) {
      const profile: any = jwt.decode(token.split(' ')[1]);
      const user = profile.username;
      body.setUpdatedBy(user);
    }

    body.setId(id);
    return this._userService.update(body);

  }

  @UseGuards(UserGuard)
  @Get('/get/:id')
  public GetById(
    @Param('id') id: string,
  ) {
    return this._userService.getById(id).pipe(
      map((userModel) => {
        return UserDto.toUserDto(userModel);
      }),
    );
  }

  @UseGuards(UserGuard)
  @Delete('/delete/:id')
  public DeleteById(
    @Param('id') id: string,
  ) {
    return this._userService.delete(id);
  }
}
