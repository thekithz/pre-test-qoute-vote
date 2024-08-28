import { ObjectId } from 'bson'

export interface IUserSchema {
    _id: ObjectId
    username: string
    password: string
    salt: string
    name: string
    email: string
    phone: string
    suspended: boolean
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
    sessionId: string
}
