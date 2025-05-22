import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../interface/transaction.intercace';
import { LoggerService } from '../../infra/logger/logger.service';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';

@Injectable()
export class DeleteTransactionsUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(): Promise<void> {
    const transactions = await this.transactionRepository.findAll();
    const count = transactions.length;

    await this.transactionRepository.deleteAll();

    this.logger.log('All transactions deleted', { deletedCount: count });
  }
}
