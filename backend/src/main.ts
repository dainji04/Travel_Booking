import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser'

dotenv.config();


async function bootstrap() {                    
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser())
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true

  })

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
