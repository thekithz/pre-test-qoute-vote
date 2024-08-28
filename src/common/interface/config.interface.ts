export interface IConfig {
    application: {
        host: string
        port: number
    }
    mongodb: IMongoDB
    auth: IAuth
}

interface IMongoDB {
    url?: string
    servers?: string
    port?: number
    dbName: string
    username?: string
    password?: string
    authSource?: string
    replicaSetName?: string
}

interface IMysqlDB {
    host: string
    port: number
    user: string
    password?: string
    database: string
}

interface IReportDB {
    host: string
    port: number
    user: string
    password?: string
    database: string
    team: string
    section: string
}

interface IAdapter {
    endpoint: IAudio
    ldap: ILdap
}

interface IAudio {
    host: string
    path: string
}

interface IAuth {
    ignoreExpiration: boolean
    public: string
    private: string
}

interface ILdap {
    host: string
    port: number
    dn: string
}

interface IStatic {
    files: string
}
