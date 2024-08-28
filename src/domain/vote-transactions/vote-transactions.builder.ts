import { VoteTransactionsModel } from './vote-transactions.model'

export class VoteTransactionsBuilder {
  private readonly _model: VoteTransactionsModel

  constructor() {
    this._model = new VoteTransactionsModel()
  }

  public build(): VoteTransactionsModel {
    return this._model
  }

  public setId(id: string) {
    this._model.setId(id)
    return this
  }

  public setQuoteID(id: string) {
    this._model.setQuoteID(id)
    return this
  }

  public setUserID(id: string) {
    this._model.setUserID(id)
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