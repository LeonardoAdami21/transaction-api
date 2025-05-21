import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TransactionRepository } from '../infra/repositories/transaction.repository';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(amount: number, timestamp: Date) {
    try {
      const transaction = new Transaction(amount, timestamp);
      const savedTransaction =
        await this.transactionRepository.save(transaction);
      return savedTransaction;
    } catch (error) {
      throw new UnprocessableEntityException('Error creating transaction');
    }
  }
}
