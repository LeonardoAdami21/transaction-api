import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../applications/interface/transaction.intercace';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [];

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
  async findAll(): Promise<Transaction[]> {
    return [...this.transactions];
  }

  async deleteAll(): Promise<void> {
    this.transactions = [];
  }


  async findByTimeWindow(seconds: number) {
    const result = this.transactions.filter((transaction) =>
      transaction.isWithinTimeWindow(seconds),
    );

    return result;
  }
}
