import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'src/domain/infra/logger/logger.service';

@Module({
  controllers: [],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
