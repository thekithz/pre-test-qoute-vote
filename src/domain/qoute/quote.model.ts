import { Entity } from '../../common/entity'
import { IQuoteModel } from './interface/model.interface'

export class QuoteModel extends Entity implements IQuoteModel {
  private _funnyQuote: string
  private _categoryName: string
  private _totalVote: number
  private _createdAt: Date
  private _createdBy: string
  private _updatedAt: Date
  private _updatedBy: string

  constructor() {
    super()
    this._funnyQuote = ''
    this._categoryName = ''
    this._totalVote = 0
    this._createdBy = ''
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  getFunnyQuote(): string {
    return this._funnyQuote
  }

  getCategoryName(): string {
    return this._categoryName
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

  setFunnyQuote(funnyQuote: string) {
    this._funnyQuote = funnyQuote
  }

  setCategoryName(categoryName: string) {
    this._categoryName = categoryName
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