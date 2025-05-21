// src/presentation/controllers/metrics.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MetricsService } from '../infra/metrics/metrics.service';

@Controller('v2/metrics')
@ApiTags('Metricas')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  @ApiOkResponse({ description: 'Metricas' })
  async getMetrics(@Res() response: Response): Promise<void> {
    response.setHeader(
      'Content-Type',
      this.metricsService.getRegister().contentType,
    );
    response.end(await this.metricsService.getRegister().metrics());
  }
}
