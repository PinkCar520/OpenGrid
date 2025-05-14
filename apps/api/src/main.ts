import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcHandler } from './trpc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply TRPC middleware
  const trpcHandler = app.get(TrpcHandler);
  await trpcHandler.applyMiddleware(app);
  
  // Enable CORS
  app.enableCors();
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`TRPC endpoint: http://localhost:${port}/trpc`);
}
bootstrap();
