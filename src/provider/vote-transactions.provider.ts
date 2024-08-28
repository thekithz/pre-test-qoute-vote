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
import { VoteTransactionsRepositoryMapping } from '../repository/vote-transaction/vote-transaction.mapping'
import { IVoteTransactionsModel } from '../domain/vote-transactions/interface/model.interface'
import { IVoteTransactionsSchema } from '../repository/vote-transaction/vote-transactions.schema'
import { VoteTransactionsRepository } from '../repository/vote-transaction/vote-transactions.repository'
import { IVoteTransactionsRepository } from '../domain/vote-transactions/interface/repository.interface'

export const voteTransactionsRepositoryProvider: Provider[] = [
    {
        provide: providerNames.VOTE_TRANSACTIONS_REPOSITORY_MAPPING,
        useClass: VoteTransactionsRepositoryMapping,
    },
    {
        provide: providerNames.VOTE_TRANSACTIONS_REPOSITORY,
        inject: [
            providerNames.MONGO_CONNECTION,
            providerNames.VOTE_TRANSACTIONS_REPOSITORY_MAPPING,
        ],
        useFactory: (
            db: Db,
            mapping: IRepositoryMapping<IVoteTransactionsModel, IVoteTransactionsSchema>,
        ) => {
            return new VoteTransactionsRepository(
                db,
                mapping,
            )
        },
    },
]

// export const voteTransactionsServiceProvider: Provider = {
//     provide: providerNames.VOTE_TRANSACTIONS_SERVICE,
//     inject: [
//         providerNames.VOTE_TRANSACTIONS_REPOSITORY,
//     ],
//     useFactory: (
//         voteTransactionsRepository: IVoteTransactionsRepository
//     ) => {
//         return new VoteTransactionsService(
//             voteTransactionsRepository,
//         )
//     },
// }