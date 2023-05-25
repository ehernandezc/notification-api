import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityManager } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const { connection } = app.get(EntityManager);
  connection.runMigrations();
  
  await app.listen(4017);
}
bootstrap();
