import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Statistics } from '../../domain/entities/statistics.entity';
import { LoggerService } from '../../infra/logger/logger.service';

@Injectable()
export class GetStatisticsUseCase {
  private static readonly TIME_WINDOW_SECONDS = 60;
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute() {
    //Esperando 1 minuto
    const transactions = await this.transactionRepository.findByTimeWindow(
      GetStatisticsUseCase.TIME_WINDOW_SECONDS,
    );

    // Mapeando os valores de amount
    const amounts = transactions.map((transaction) => transaction.amount);
    // Calculando as estatisticas
    const statistics = Statistics.fromAmounts(amounts);
    // Retornando as estatisticas
    return {
      count: statistics.count,
      sum: statistics.sum,
      avg: statistics.avg,
      min: statistics.min,
      max: statistics.max,
    };
  }
}
