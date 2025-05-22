import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { pino, Logger } from 'pino';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    });
  }

  log(message: string, context?: any) {
    this.logger.info(context, message);
  }

  error(message: string, trace?: string, context?: any) {
    this.logger.error({ ...context, trace }, message);
  }

  warn(message: string, context?: any) {
    this.logger.warn(context, message);
  }

  debug(message: string, context?: any) {
    this.logger.debug(context, message);
  }

  verbose(message: string, context?: any) {
    this.logger.trace(context, message);
  }
}
