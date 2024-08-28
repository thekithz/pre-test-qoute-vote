import { NestFactory } from '@nestjs/core'
import { MainModule } from './module/main.module'
import * as _ from 'lodash'
import * as Config from 'config'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap() {
  const port: number =
      _.toNumber(process.env.PORT) || Config.get(`application.port`) || 3000
  const app = await NestFactory.create(MainModule)
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  await app.listen(port)
  return port
}

bootstrap().then(port => {
  console.log(`application started on port ${port}`)
})
