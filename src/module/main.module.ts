import { Module } from '@nestjs/common'
import { CommonModule } from './common.module'
import { UserModule } from './user.module'
import { QuoteModule } from './quote.module'

@Module({
    imports: [
        CommonModule,
        UserModule,
        QuoteModule
    ]
})
export class MainModule {

}
