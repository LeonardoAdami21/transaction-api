import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import * as Joi from 'joi';
import { HealthModule } from './domain/applications/modules/health.module';
import { LoggerModule } from './domain/applications/modules/logg.module';
import { MetricsModule } from './domain/applications/modules/metrics.module';
import { TransactionModule } from './domain/applications/modules/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        RATE_LIMIT_TTL: Joi.number().default(60),
        RATE_LIMIT_MAX: Joi.number().default(100),
      }),
    }),
    ScheduleModule.forRoot({
      timeouts: false,
    }),
    PrometheusModule.register({
      path: '/v2/metrics',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.RATE_LIMIT_WINDOW_MS),
        limit: Number(process.env.RATE_LIMIT_MAX),
      },
    ]),
    TransactionModule,
    HealthModule,
    MetricsModule,
    LoggerModule,
  ],
})
export class AppModule {}
