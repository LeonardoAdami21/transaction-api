import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MetricsController } from '../metrics.controller';
import { MetricsService } from 'src/domain/infra/metrics/metrics.service';

@Module({
  providers: [MetricsService],
  controllers: [MetricsController],
  exports: [MetricsService],
})
export class MetricsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsService).exclude()
  }
}
