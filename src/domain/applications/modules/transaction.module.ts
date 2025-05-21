import { Module } from '@nestjs/common';
import { TransactionController } from '../transaction.controller';
import { CreateTransactionUseCase } from 'src/domain/usecases/create-transaction.usecase';
import { DeleteTransactionUseCase } from 'src/domain/usecases/delete-transaction.usecase';
import { TransactionRepository } from 'src/domain/infra/repositories/transaction.repository';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    {
      provide: TransactionRepository,
      useClass: TransactionRepository,
    },
  ],
  exports: [],
})
export class TransactionModule {}
