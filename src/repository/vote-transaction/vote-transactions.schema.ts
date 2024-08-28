import { ObjectId } from 'bson'

export interface IVoteTransactionsSchema {
    _id: ObjectId
    quote_id: ObjectId
    user_id: ObjectId
    total_vote: number
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
}
