import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const config = new DocumentBuilder()
  .setTitle('Portfolio')
  .addBearerAuth()
  .setDescription('The Portfolio API description')
  .setVersion('1.0')
  .addTag('portfolio')
  .build();

export function openApi(app: INestApplication) {
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
