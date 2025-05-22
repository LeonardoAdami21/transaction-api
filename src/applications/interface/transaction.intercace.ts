import { Transaction } from '../../domain/entities/transaction.entity';

export interface ITransactionRepository {
  save(transaction: Transaction);
  findAll();
  deleteAll();
  findByTimeWindow(seconds: number);
}
