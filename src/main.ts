import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setViewEngine('ejs');
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`App running on ${process.env.NODE_ENV} mode`);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(process.env.CLIENT_URL);
}

bootstrap();
