import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix("/api");
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Blog API Nestjs')
      .setDescription('Blog API desenvolvida em NestJS, estruturada seguindo o padrão REST e os princípios da Clean Architecture. Implementa parte dos princípios SOLID e conceitos de DDD (Domain‑Driven Design), garantindo uma base escalável, organizada e de fácil manutenção.')
      .setVersion('1.0')
      .addServer("http://localhost:3100/")
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.useStaticAssets(join(__dirname, '..', 'public'));

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException("Server offline.");
  }
}
bootstrap();
