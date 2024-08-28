import { ObjectId } from 'bson'

export interface IQuoteSchema {
    _id: ObjectId
    category_name: string
    funny_quote: string
    total_vote: number
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
}
