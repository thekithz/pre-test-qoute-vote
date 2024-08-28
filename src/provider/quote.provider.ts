import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import { Db } from 'mongodb'
import { IRepositoryMapping } from '../common/interface/repository.interface'
import { QuoteRepositoryMapping } from '../repository/qoute/quote.mapping'
import { IQuoteModel } from '../domain/qoute/interface/model.interface'
import { IQuoteSchema } from '../repository/qoute/quote.schema'
import { QuoteRepository } from '../repository/qoute/quote.repository'
import { IQuoteRepository } from '../domain/qoute/interface/repository.interface'
import { QuoteService } from '../domain/qoute/quote.service'
import { IVoteTransactionsRepository } from '../domain/vote-transactions/interface/repository.interface'

export const quoteRepositoryProvider: Provider[] = [
  {
    provide: providerNames.QUOTE_REPOSITORY_MAPPING,
    useClass: QuoteRepositoryMapping
  },
  {
    provide: providerNames.QUOTE_REPOSITORY,
    inject: [
      providerNames.MONGO_CONNECTION,
      providerNames.QUOTE_REPOSITORY_MAPPING
    ],
    useFactory: (
      db: Db,
      mapping: IRepositoryMapping<IQuoteModel, IQuoteSchema>
    ) => {
      return new QuoteRepository(
        db,
        mapping
      )
    }
  }
]

export const quoteServiceProvider: Provider = {
  provide: providerNames.QUOTE_SERVICE,
  inject: [
    providerNames.QUOTE_REPOSITORY,
    providerNames.VOTE_TRANSACTIONS_REPOSITORY
  ],
  useFactory: (
    quoteRepository: IQuoteRepository,
    voteRepository: IVoteTransactionsRepository
  ) => {
    return new QuoteService(
      quoteRepository,
      voteRepository
    )
  }
}