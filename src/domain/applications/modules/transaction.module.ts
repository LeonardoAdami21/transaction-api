import { Module } from '@nestjs/common';
import { TransactionController } from '../transaction.controller';
import { CreateTransactionUseCase } from 'src/domain/usecases/create-transaction.usecase';
import { DeleteTransactionUseCase } from 'src/domain/usecases/delete-transaction.usecase';
import { TransactionRepository } from 'src/domain/infra/repositories/transaction.repository';
import { GetStatisticsUseCase } from 'src/domain/usecases/get-statistic.usecase';
import { StatisticsController } from '../statistic.controller';

@Module({
  imports: [],
  controllers: [TransactionController, StatisticsController],
  providers: [
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetStatisticsUseCase,
    {
      provide: TransactionRepository,
      useClass: TransactionRepository,
    },
  ],
  exports: [],
})
export class TransactionModule {}
