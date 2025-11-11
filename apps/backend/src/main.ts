import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Загружаем .env перед созданием приложения
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Разрешаем запросы с фронтенда (React)
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  });

  // Глобальная валидация (если добавишь class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to bootstrap:', err);
  process.exit(1);
});
