import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const initSwagger = (app: INestApplication, serverUrl: string) => {
    const config = new DocumentBuilder()
      .setTitle('CASL RBAC')
      .setDescription('Checkout RBAC and ABAC')
      .setVersion('1.0')
      .addServer(serverUrl)
      .addBearerAuth();

    // Tags.forEach((tag) => config.addTag(tag.name, tag.description));

    const document = SwaggerModule.createDocument(app, config.build());

    SwaggerModule.setup('/swagger', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  };

  const app = await NestFactory.create(AppModule);
  initSwagger(app, 'http://localhost:3000');
  await app.listen(3000);
}
bootstrap();
