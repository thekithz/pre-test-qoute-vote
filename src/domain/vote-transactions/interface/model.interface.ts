import { IEntity } from '../../../common/interface/entity.interface'

export interface IVoteTransactionsModel extends IEntity {
  getQuoteID(): string
  getUserID(): string
  getTotalVote(): number
  getCreatedAt(): Date
  getCreatedBy(): string
  getUpdatedAt(): Date
  getUpdatedBy(): string

  setQuoteID(quoteId: string): void
  setUserID(userId: string): void
  setTotalVote(totalVote: number): void
  setCreatedAt(createdAt: Date): void
  setCreatedBy(createdBy: string): void
  setUpdatedAt(updatedAt: Date): void
  setUpdatedBy(updatedBy: string): void
}