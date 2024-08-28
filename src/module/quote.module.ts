import { Module } from '@nestjs/common'
import { QuoteController } from '../controller/quote/quote.controller'
import { authServiceProvider } from '../provider/common.provider'
import { quoteRepositoryProvider, quoteServiceProvider } from '../provider/quote.provider'
import { voteTransactionsRepositoryProvider } from '../provider/vote-transactions.provider'
import { userRepositoryProvider, userServiceProvider } from '../provider/user.provider';

@Module({
  controllers: [
    QuoteController
  ],
  providers: [
    authServiceProvider,
    ...quoteRepositoryProvider,
    quoteServiceProvider,
    ...voteTransactionsRepositoryProvider,
    userServiceProvider,
    ...userRepositoryProvider,
  ],
  exports: [
    authServiceProvider,
    ...quoteRepositoryProvider,
    ...voteTransactionsRepositoryProvider,
    userServiceProvider,
    ...userRepositoryProvider,
  ]
})
export class QuoteModule {}