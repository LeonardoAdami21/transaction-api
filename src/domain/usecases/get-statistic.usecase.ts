import { Injectable } from '@nestjs/common';
import { Statistics } from '../entities/statistics.entity';
import { TransactionRepository } from '../infra/repositories/transaction.repository';

@Injectable()
export class GetStatisticsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(timeRangeInSeconds = 60): Promise<Statistics> {
    const transactions =
      await this.transactionRepository.getRecentTransactions(
        timeRangeInSeconds,
      );
    const amounts = transactions.map((transaction) => transaction.amount);
    const statistics = Statistics.fromTransactions(amounts);
    return {
      count: statistics.count,
      sum: statistics.sum,
      avg: statistics.avg,
      min: statistics.min,
      max: statistics.max,
    };
  }
}
