import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { StatisticsDto } from '../../applications/dto/statistics.dto';
import { GetStatisticsUseCase } from '../../applications/usecase/get-statistics.use-case';

@ApiTags('Estatisticas')
@Controller('v2/statistics')
@UseGuards(ThrottlerGuard)
export class StatisticsController {
  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'Get transaction statistics for the last 60 seconds',
  })
  @ApiOkResponse({
    type: StatisticsDto,
    description: 'Statistics for the last 60 seconds',
  })
  async getStatistics() {
    return this.getStatisticsUseCase.execute();
  }
}
