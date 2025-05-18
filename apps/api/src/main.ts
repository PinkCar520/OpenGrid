import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcHandler } from './trpc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific configuration
  app.enableCors({
    origin: ['http://localhost:9898', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Apply TRPC middleware
  const trpcHandler = app.get(TrpcHandler);
  await trpcHandler.applyMiddleware(app);

  const port = process.env.PORT || 3002;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`TRPC endpoint: http://localhost:${port}/trpc`);
}
bootstrap();
