// src/infrastructure/interceptors/metrics.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const duration = (Date.now() - startTime) / 1000; // Convert to seconds
          this.metricsService.recordHttpRequest(
            method,
            originalUrl,
            statusCode,
            duration,
          );
        },
        error: (error) => {
          const statusCode = error.status || 500;
          const duration = (Date.now() - startTime) / 1000; // Convert to seconds
          this.metricsService.recordHttpRequest(
            method,
            originalUrl,
            statusCode,
            duration,
          );
        },
      }),
    );
  }
}
