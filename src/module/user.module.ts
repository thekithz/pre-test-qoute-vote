import { Module } from '@nestjs/common'
import {
  // userAdapterProvider,
  userRepositoryProvider,
  userServiceProvider
} from '../provider/user.provider'
import { UserController } from '../controller/user/user.controller'
import { LoginController } from '../controller/login/login.controller'
import { authServiceProvider } from '../provider/common.provider'

// import { roleRepositoryProvider } from '../provider/master.provider'

@Module({
  controllers: [
    UserController,
    LoginController
  ],
  providers: [
    authServiceProvider,
    ...userRepositoryProvider,
    userServiceProvider,
    // userAdapterProvider,
    // ...roleRepositoryProvider,
  ],
  exports: [
    authServiceProvider,
    ...userRepositoryProvider,
    // userAdapterProvider,
  ]
})
export class UserModule {

}
