import { Transaction } from '../../domain/entities/transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findAll(): Promise<Transaction[]>;
  deleteAll(): Promise<void>;
  findByTimeWindow(seconds: number): Promise<Transaction[]>;
}
