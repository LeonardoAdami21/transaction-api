// src/infrastructure/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private register: client.Registry;
  private httpRequestDurationMicroseconds: client.Histogram<string>;
  private httpRequestCounter: client.Counter<string>;
  private transactionAmountSummary: client.Summary<string>;

  constructor() {
    this.register = new client.Registry();
    client.collectDefaultMetrics({ register: this.register });

    this.httpRequestDurationMicroseconds = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'code'],
      buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
    });

    this.httpRequestCounter = new client.Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'code'],
    });

    this.transactionAmountSummary = new client.Summary({
      name: 'transaction_amount_summary',
      help: 'Summary of transaction amounts',
    });

    this.register.registerMetric(this.httpRequestDurationMicroseconds);
    this.register.registerMetric(this.httpRequestCounter);
    this.register.registerMetric(this.transactionAmountSummary);
  }

  getRegister(): client.Registry {
    return this.register;
  }

  recordHttpRequest(
    method: string,
    route: string,
    code: number,
    duration: number,
  ): void {
    this.httpRequestDurationMicroseconds
      .labels(method, route, code.toString())
      .observe(duration);
    this.httpRequestCounter.labels(method, route, code.toString()).inc();
  }

  recordTransactionAmount(amount: number): void {
    this.transactionAmountSummary.observe(amount);
  }
}
