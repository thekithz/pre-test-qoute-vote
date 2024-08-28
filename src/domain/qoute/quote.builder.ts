import { QuoteModel } from './quote.model'

export class QuoteBuilder {
  private readonly _model: QuoteModel

  constructor() {
    this._model = new QuoteModel()
  }

  public build(): QuoteModel {
    return this._model
  }

  public setId(id: string) {
    this._model.setId(id)
    return this
  }

  public setFunnyQuote(funnyQuote: string) {
    this._model.setFunnyQuote(funnyQuote)
    return this
  }

  public setCategoryName(categoryName: string) {
    this._model.setCategoryName(categoryName)
    return this
  }

  public setTotalVote(totalVote: number) {
    this._model.setTotalVote(totalVote)
    return this
  }

  public setCreatedAt(createdAt: Date) {
    this._model.setCreatedAt(createdAt)
    return this
  }

  public setCreatedBy(createdBy: string) {
    this._model.setCreatedBy(createdBy)
    return this
  }

  public setUpdatedAt(updatedAt: Date) {
    this._model.setUpdatedAt(updatedAt)
    return this
  }

  public setUpdatedBy(updatedBy: string) {
    this._model.setUpdatedBy(updatedBy)
    return this
  }
}
