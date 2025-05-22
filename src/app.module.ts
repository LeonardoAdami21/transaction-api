import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from './infra/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot({}),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.RATE_LIMIT_WINDOW_MS),
        limit: Number(process.env.RATE_LIMIT_MAX),
      },
    ]),
    TransactionModule,
    HealthModule,
    LoggerModule,
  ],
})
export class AppModule {}
