import { IQuoteModel } from '../../domain/qoute/interface/model.interface'
import * as _ from 'lodash'

export interface IQuoteDto {
  id: string
  funny_quote: string
  total_vote: number
  createdAt: number
  updatedBy: string
  updatedAt: number
}

export class QuoteDto {
  public static toQuoteDto(model: IQuoteModel): IQuoteDto {
    let createdAt = null
    if (!_.isNil(model.getCreatedAt())) {
      createdAt = model.getCreatedAt().getTime()
    }

    let updatedAt = null
    if (!_.isNil(model.getUpdatedAt())) {
      updatedAt = model.getUpdatedAt().getTime()
    }

    return {
      id: model.getId(),
      funny_quote: model.getFunnyQuote(),
      total_vote: model.getTotalVote(),
      createdAt,
      updatedBy: model.getUpdatedBy(),
      updatedAt,
    }
  }
}