import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { appPort } from './domain/infra/env/envoriment';
import helmet from 'helmet';
import { MetricsService } from './domain/infra/metrics/metrics.service';
import { MetricsInterceptor } from './domain/infra/interceptors/metrics.interceptor';
import { CustomLoggerService } from './domain/infra/logger/logger.service';
import { HttpExceptionFilter } from './domain/filters/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
    bufferLogs: true,
  });

  app.use(helmet());
  app.enableCors({});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const metrics = app.get(MetricsService);
  app.useGlobalInterceptors(new MetricsInterceptor(metrics));
  initSwagger(app);

  const logger = new Logger('NestApplication');
  app.listen(appPort, '0.0.0.0', async () => {
    logger.log(`Running At: ${await app.getUrl()}`);
    logger.log(`Documentation: ${await app.getUrl()}/v2/docs`);
  });
}
bootstrap();
