import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ITransaction } from '../interface/transaction.interface';
import { Transaction } from 'src/domain/entities/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransaction {
  private transactions: Transaction[] = [];

  async save(transaction: Transaction) {
    try {
      const transactions = this.transactions.push(transaction);
      return transactions;
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
    const cutOffTime = new Date(Date.now() - seconds * 1000);
    const recentTransactions = this.transactions.filter(
      (transaction) => transaction.timestamp >= cutOffTime,
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
