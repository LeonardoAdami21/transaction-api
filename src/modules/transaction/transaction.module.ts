import { forwardRef, Module } from '@nestjs/common';
import { LoggerModule } from '../../infra/logger/logger.module';
import { TransactionController } from './transaction.controller';
import { CreateTransactionUseCase } from '../../applications/usecase/create-transaction.use-case';
import { GetStatisticsUseCase } from '../../applications/usecase/get-statistics.use-case';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { StatisticsController } from '../statistics/statistic.controller';
import { DeleteTransactionsUseCase } from '../../applications/usecase/delete-all-transactions.use-case';
@Module({
  imports: [forwardRef(() => LoggerModule)],
  controllers: [TransactionController, StatisticsController],
  providers: [
    CreateTransactionUseCase,
    DeleteTransactionsUseCase,
    GetStatisticsUseCase,
    {
      provide: TransactionRepository,
      useClass: TransactionRepository,
    },
  ],
  exports: [CreateTransactionUseCase, DeleteTransactionsUseCase, TransactionRepository],
})
export class TransactionModule {}
