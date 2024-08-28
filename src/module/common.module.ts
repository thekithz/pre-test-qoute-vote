import {
    Global,
    Module,
} from '@nestjs/common'
import {
    // audioDecoderProvider,
    // audioTranscoderProvider,
    commonProviders,
    // dashboardConnection,
    authServiceProvider,
    mongoConnection,
    // mysqlProviders,
    // reportProviders,
} from '../provider/common.provider'

@Global()
@Module({
    providers: [
        ...commonProviders,
        mongoConnection,
        // dashboardConnection,
        // mysqlProviders,
        // reportProviders,
        // audioTranscoderProvider,
        // audioDecoderProvider,
        authServiceProvider,
    ],
    controllers: [
    ],
    exports: [
        ...commonProviders,
        mongoConnection,
        // dashboardConnection,
        // mysqlProviders,
        // reportProviders,
        // audioTranscoderProvider,
        // audioDecoderProvider,
        authServiceProvider,
    ],
})
export class CommonModule {

}
