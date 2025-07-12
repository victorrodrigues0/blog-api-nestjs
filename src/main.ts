import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("/api");
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('Blog API seguindo o padrão RESTFul e clean architecture')
      .setDescription('')
      .setVersion('1.0')
      .addTag('api')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);


    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException("Server offline.");
  }
}
bootstrap();
