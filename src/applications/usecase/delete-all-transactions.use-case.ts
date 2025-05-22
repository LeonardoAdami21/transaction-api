import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';

@Injectable()
export class DeleteTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute() {
    const transactions = await this.transactionRepository.findAll();
    const count = transactions.length;

    await this.transactionRepository.deleteAll();

    return {
      message: `Todas as transações foram excluídas. Foram excluídas essas ${count} transações.`,
    };
  }
}
