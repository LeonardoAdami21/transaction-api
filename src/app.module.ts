import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { TransactionModule } from './domain/applications/modules/transaction.module';
import { HealthModule } from './domain/applications/modules/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrometheusModule.register({
      path: '/v2/metrics',
    }),
    TransactionModule,
    HealthModule,
  ],
})
export class AppModule {}
