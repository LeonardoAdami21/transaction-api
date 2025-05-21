import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetStatisticsUseCase } from '../usecases/get-statistic.usecase';
import { StatisticsDto } from '../usecases/dto/get-stastics.dto';

@ApiTags('Estatísticas')
@Controller('v2/statistics')
export class StatisticsController {
  private readonly logger = new Logger(StatisticsController.name);

  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna estatísticas das transações dos últimos 60 segundos',
  })
  @ApiOkResponse({
    description: 'Estatísticas das transações',
  })
  async getStatistics(): Promise<StatisticsDto> {
    this.logger.log('Retornando estatísticas das transações');
    const statistics = await this.getStatisticsUseCase.execute();

    return {
      count: statistics.count,
      sum: statistics.sum,
      avg: statistics.avg,
      min: statistics.min,
      max: statistics.max,
    };
  }
}
