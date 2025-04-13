import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();


async function bootstrap() {                    
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.use(cookieParser())
  app.enableCors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API description')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);



  await app.listen(process.env.PORT ?? 4000);
  console.log('running 4k ')
}
bootstrap();
