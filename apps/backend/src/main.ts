import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Получаем эквивалент __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bootstrap() {
  // Читаем сертификаты
  const httpsOptions = {
    key: fs.readFileSync(
      path.join(__dirname, '..', 'cert', 'localhost-key.pem')
    ),
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert', 'localhost.pem')),
  };
  console.log('CERT:', httpsOptions);

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors({
    origin: process.env.CLIENT_URL || 'https://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server running on https://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('❌ Failed to bootstrap:', err);
  process.exit(1);
});
