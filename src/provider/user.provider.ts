import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import { IConfig } from '../common/interface/config.interface'
import { UserRepository } from '../repository/user/user.repository'
import { UserRepositoryMapping } from '../repository/user/user.mapping'
import { IUserRepository } from '../domain/user/interface/repository.interface'
import { Db } from 'mongodb'
import { IRepositoryMapping } from '../common/interface/repository.interface'
import { IUserModel } from '../domain/user/interface/model.interface'
import { IUserSchema } from '../repository/user/user.schema'
import { UserService } from '../domain/user/user.service'
// import { LdapAdapter } from '../adapter/ldap/ldap.adapter'
// import { ILdapAdapter } from '../adapter/ldap/interface/ldap.interface'
// import { IRoleRepository } from '../domain/master/role/interface/repository.interface'


export const userRepositoryProvider: Provider[] = [
    {
        provide: providerNames.USER_REPOSITORY_MAPPING,
        useClass: UserRepositoryMapping,
    },
    {
        provide: providerNames.USER_REPOSITORY,
        inject: [
            providerNames.MONGO_CONNECTION,
            providerNames.USER_REPOSITORY_MAPPING,
        ],
        useFactory: (
            db: Db,
            mapping: IRepositoryMapping<IUserModel, IUserSchema>,
        ) => {
            return new UserRepository(
                db,
                mapping,
            )
        },
    },
]

export const userServiceProvider: Provider = {
    provide: providerNames.USER_SERVICE,
    inject: [
        providerNames.USER_REPOSITORY,
        // providerNames.LDAP_ADAPTER,
        // providerNames.ROLE_REPOSITORY,
    ],
    useFactory: (
        userRepository: IUserRepository,
        // ldapAdapter: ILdapAdapter,
        // roleRepository: IRoleRepository,
    ) => {
        return new UserService(
            userRepository,
            // ldapAdapter,
            // roleRepository,
        )
    },
}


// export const userAdapterProvider: Provider = {
//     provide: providerNames.LDAP_ADAPTER,
//     inject: [
//         providerNames.CONFIG,
//     ],
//     useFactory: (
//         config: IConfig,
//     ) => {
//         return new LdapAdapter(
//             config,
//         )
//     },
// }


