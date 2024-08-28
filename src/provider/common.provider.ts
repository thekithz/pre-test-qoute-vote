import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import { IConfig } from '../common/interface/config.interface'
import {
    Db,
    MongoClient,
} from 'mongodb'
import * as Config from 'config'
// import * as mysql from 'mysql'
// import { FfmpegTranscoder } from '../common/ffmpeg-transcoder'
import * as _ from 'lodash'
import * as Path from 'path'
// import * as FfBinaries from 'ffbinaries'
// import { AudioDecoder } from '../common/audio-decoder'
import { Auth } from '../common/auth'
// import * as ldap from 'ldapjs'

export const mongoConnection: Provider = {
    provide: providerNames.MONGO_CONNECTION,
    useFactory: async (config: IConfig): Promise<Db> => {
        if (config && config.mongodb) {
            const url = process.env.MONGO_URL || config.mongodb.url;

            return await MongoClient.connect(url, {
            }).then((client: MongoClient) => client.db(config.mongodb.dbName));
        }

        return Promise.reject('Cannot connect MongoDB');
    },
    inject: [providerNames.CONFIG],
};

// export const mongoConnection: Provider = {
//     provide: providerNames.MONGO_CONNECTION,
//     useFactory: async (config: IConfig): Promise<Db> => {
//         if (config && config.mongodb) {
//             const mongoConfig = config.mongodb
//             const servers = process.env.MONGO_URL || mongoConfig.servers
//             let auth = ''
//             let url: string =
//                 'mongodb://' +
//                 auth +
//                 servers
//                     .split(',')
//                     .map((servers: string) => {
//                         return servers + ':' + mongoConfig.port
//                     })
//                     .toString() +
//                 '/' +
//                 mongoConfig.dbName
//
//             if (mongoConfig.authSource) {
//                 url += `?authSource=${mongoConfig.authSource}`
//             }
//             return await MongoClient.connect(url, {
//                 // useNewUrlParser: true,
//                 // useUnifiedTopology: true,
//             }).then((client: MongoClient) => client.db(mongoConfig.dbName))
//         }
//
//         return Promise.reject('Cannot connect MongoDB')
//     },
//     inject: [providerNames.CONFIG],
// }

// export const dashboardConnection: Provider = {
//     provide: providerNames.DASHBOARD_CONNECTION,
//     useFactory: async (config: IConfig): Promise<Db> => {
//         if (config && config.dashboardDB) {
//             const dashboardConfig = config.dashboardDB
//             const servers = process.env.MONGO_URL || dashboardConfig.servers
//             let auth = ''
//             let url: string =
//                 'mongodb://' +
//                 auth +
//                 servers
//                     .split(',')
//                     .map((servers: string) => {
//                         return servers + ':' + dashboardConfig.port
//                     })
//                     .toString() +
//                 '/' +
//                 dashboardConfig.dbName
//             if (dashboardConfig.authSource) {
//                 url += `?authSource=${dashboardConfig.authSource}`
//             }
//             return await MongoClient.connect(url, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             }).then((client: MongoClient) => client.db(dashboardConfig.dbName))
//         }
//
//         return Promise.reject('Cannot connect Dashboard DB')
//     },
//     inject: [providerNames.CONFIG],
// }

export const commonProviders: Provider[] = [
    {
        provide: providerNames.CONFIG,
        useFactory: (): IConfig => Config.util.toObject(),
    },
]

// export const mysqlProviders: Provider = {
//     provide: providerNames.MYSQL_CONNECTION,
//     inject: [
//         providerNames.CONFIG,
//     ],
//     useFactory: async (
//         config: IConfig,
//     ): Promise<any> => {
//         const connection: mysql.Connection = mysql.createConnection({
//             host: config.mysqlDb.host,
//             database: config.mysqlDb.database,
//             user: config.mysqlDb.user,
//             password: config.mysqlDb.password,
//             port: config.mysqlDb.port,
//         })
//         await connection.connect((err) => {
//             if (err) {
//                 console.log(`error connecting mysql: ${err.stack}`)
//                 // return
//             }
//             console.log('connected mysql as id ' + connection.threadId)
//             // return
//         })
//         return connection
//
//     },
// }

// export const reportProviders: Provider = {
//     provide: providerNames.REPORT_CONNECTION,
//     inject: [
//         providerNames.CONFIG,
//     ],
//     useFactory: async (
//         config: IConfig,
//     ): Promise<any> => {
//         const connection: mysql.Connection = mysql.createConnection({
//             host: config.reportDb.host,
//             database: config.reportDb.database,
//             user: config.reportDb.user,
//             password: config.reportDb.password,
//             port: config.reportDb.port,
//         })
//         await connection.connect((err) => {
//             if (err) {
//                 console.log(`error connecting report: ${err.stack}`)
//                 // return
//             }
//             console.log('connected report as id ' + connection.threadId)
//             // return
//         })
//         return connection
//     },
// }

export const authServiceProvider: Provider = {
    provide: providerNames.AUTH_SERVICE,
    inject: [
        providerNames.CONFIG,
    ],
    useFactory: (
        config: IConfig
    ) => {
        return new Auth(
            config
        )
    }
}


