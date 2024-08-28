import { IEntity } from '../../../common/interface/entity.interface'

export interface IQuoteModel extends IEntity {
  getFunnyQuote(): string
  getCategoryName(): string
  getTotalVote(): number
  getCreatedAt(): Date
  getCreatedBy(): string
  getUpdatedAt(): Date
  getUpdatedBy(): string

  setFunnyQuote(funnyQuote: string): void
  setCategoryName(categoryName: string): void
  setTotalVote(totalVote: number): void
  setCreatedAt(createdAt: Date): void
  setCreatedBy(createdBy: string): void
  setUpdatedAt(updatedAt: Date): void
  setUpdatedBy(updatedBy: string): void
}
