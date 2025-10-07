import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { openApi } from './common/configs/openApi-config';
import { validationConfig } from './common/configs/validation-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const configService = app.get(ConfigService);
  const logger = new NestLogger();

  const port = configService.get<number>('PORT');

  openApi(app);

  await app.listen(port ?? 3000, () => {
    logger.log(`App is working on ${port}`);
  });
}
bootstrap();
