import { Entity } from '../../common/entity'
import { IVoteTransactionsModel } from './interface/model.interface'

export class VoteTransactionsModel extends Entity implements IVoteTransactionsModel {
  private _quoteId: string
  private _userId: string
  private _totalVote: number
  private _createdAt: Date
  private _createdBy: string
  private _updatedAt: Date
  private _updatedBy: string

  constructor() {
    super()
    this._quoteId = ''
    this._userId = ''
    this._totalVote = 0
    this._createdBy = ''
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  getQuoteID(): string {
    return this._quoteId
  }

  getUserID(): string {
    return this._userId
  }

  getTotalVote(): number {
    return this._totalVote
  }

  getCreatedAt(): Date {
    return this._createdAt
  }

  getCreatedBy(): string {
    return this._createdBy
  }

  getUpdatedAt(): Date {
    return this._updatedAt
  }

  getUpdatedBy(): string {
    return this._updatedBy
  }

  setQuoteID(quoteId: string) {
    this._quoteId = quoteId
  }

  setUserID(userId: string) {
    this._userId = userId
  }

  setTotalVote(totalVote: number) {
    this._totalVote = totalVote
  }

  setCreatedAt(createdAt: Date) {
    this._createdAt = createdAt
  }

  setCreatedBy(createdBy: string) {
    this._createdBy = createdBy
  }

  setUpdatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt
  }

  setUpdatedBy(updatedBy: string) {
    this._updatedBy = updatedBy
  }
}