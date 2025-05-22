import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { appPort } from './infra/env/envoriment';
import { LoggerService } from './infra/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use(helmet());
  app.enableCors({});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  initSwagger(app);

  const logger = new Logger('NestApplication');
  app.listen(appPort, '0.0.0.0', async () => {
    logger.log(`Running At: ${await app.getUrl()}`);
    logger.log(`Documentation: ${await app.getUrl()}/v2/docs`);
    logger.log(`Metrics: ${await app.getUrl()}/v2/metrics`);
  });
}
bootstrap();
