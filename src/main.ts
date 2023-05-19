import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('NestBootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1/');
  
  const config = new DocumentBuilder()
    .setTitle('TecnoLibros API')
    .setDescription('A TecnoLibros API with CRUD functionality')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors(); 
  
  await app.listen(process.env.PORT);
  logger.log(`Listen on port ${process.env.PORT}`)
}
bootstrap();