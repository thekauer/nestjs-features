import { resolve } from 'path';
require('dotenv').config({
  path: resolve(__dirname, '../..', '.env'),
});
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PermissionsGuard } from './permission/permission.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalGuards(new PermissionsGuard(new Reflector()));
  const config = new DocumentBuilder()
    .setTitle('Fit4All Proof Of Concept')
    .setDescription('The nestjs API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
