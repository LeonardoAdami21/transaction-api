import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionUseCase } from '../create-transaction.use-case';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { ITransactionRepository } from '../../../applications/interface/transaction.intercace';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let mockRepository: jest.Mocked<ITransactionRepository>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      findAll: jest.fn(),
      deleteAll: jest.fn(),
      findByTimeWindow: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionUseCase,
        {
          provide: TransactionRepository,
          useValue: mockRepository, // Use useValue instead of useClass
        },
      ],
    }).compile();

    useCase = module.get<CreateTransactionUseCase>(CreateTransactionUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a transaction successfully', async () => {
    const dto = {
      amount: 100.5,
      timestamp: '2024-02-20T12:34:56.789Z',
    };

    mockRepository.save.mockResolvedValue(undefined); // Mock the return value

    await useCase.execute(dto);

    expect(mockRepository.save).toHaveBeenCalledWith(expect.any(Transaction));
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw error for negative amount', async () => {
    const dto = {
      amount: -10,
      timestamp: '2024-02-20T12:34:56.789Z',
    };

    await expect(useCase.execute(dto)).rejects.toThrow(
      'Amount cannot be negative',
    );
  });

  it('should throw error for future timestamp', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const dto = {
      amount: 100,
      timestamp: futureDate.toISOString(),
    };

    await expect(useCase.execute(dto)).rejects.toThrow(
      'Transaction cannot be in the future',
    );
  });
});
