import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ITransaction } from '../interface/transaction.interface';
import { Transaction } from 'src/domain/entities/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransaction {
  private transactions: Transaction[] = [];

  async save(transaction: Transaction) {
    try {
      const result = await this.transactions.push(transaction);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error saving transaction');
    }
  }
  async getAll(): Promise<Transaction[]> {
    try {
      const transactions = [...this.transactions];
      return transactions;
    } catch (error) {
      throw new InternalServerErrorException('Error getting transactions');
    }
  }
  async getRecentTransactions(seconds: number): Promise<Transaction[]> {
    const now = new Date();
    const pastTimestamp = new Date(now.getTime() - seconds * 1000);

    const recentTransactions = this.transactions.filter(
      (transaction) => transaction.timestamp >= pastTimestamp,
    );
    return recentTransactions;
  }
  async deleteAll(): Promise<any> {
    this.transactions = [];
    return {
      success: true,
      message: 'All transactions deleted successfully',
    };
  }
}
