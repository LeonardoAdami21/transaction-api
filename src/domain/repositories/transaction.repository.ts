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

  async findByTimestampRange(
    startTime: Date,
    endTime: Date,
  ): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) =>
        transaction.timestamp >= startTime && transaction.timestamp <= endTime,
    );
  }

  async deleteAll(): Promise<void> {
    this.transactions = [];
  }

  getTransactionCount(): number {
    return this.transactions.length;
  }

  async count() {
    return this.transactions.length;
  }

  async findByTimeWindow(seconds: number): Promise<Transaction[]> {
    const result = this.transactions.filter((transaction) =>
      transaction.isWithinTimeWindow(seconds),
    );

    return result;
  }
}
