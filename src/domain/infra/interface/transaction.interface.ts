import { Transaction } from '../../entities/transaction.entity';

export interface ITransaction {
  save(transaction: Transaction): Promise<any>;
  getAll(): Promise<Transaction[]>;
  getRecentTransactions(seconds: number): Promise<Transaction[]>;
  deleteAll(): Promise<void>;
}
