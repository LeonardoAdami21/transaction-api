import { Test, TestingModule } from '@nestjs/testing';
import { GetStatisticsUseCase } from '../get-statistics.use-case';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionRepository } from '../../../domain/repositories/transaction.repository';
import { ITransactionRepository } from '../../../applications/interface/transaction.intercace';

describe('GetStatisticsUseCase', () => {
  let useCase: GetStatisticsUseCase;
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
        GetStatisticsUseCase,
        {
          provide: TransactionRepository,
          useValue: mockRepository, // Use useValue instead of useClass
        },
      ],
    }).compile();

    useCase = module.get<GetStatisticsUseCase>(GetStatisticsUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return empty statistics when no transactions', async () => {
    mockRepository.findByTimeWindow.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });

  it('should calculate statistics correctly', async () => {
    const transactions = [
      new Transaction(100, new Date()),
      new Transaction(200, new Date()),
      new Transaction(50, new Date()),
    ];

    mockRepository.findByTimeWindow.mockResolvedValue(transactions);

    const result = await useCase.execute();

    expect(result).toEqual({
      count: 3,
      sum: 350,
      avg: 116.66666666666667,
      min: 50,
      max: 200,
    });
  });

  it('should call repository with correct time window', async () => {
    mockRepository.findByTimeWindow.mockResolvedValue([]);

    await useCase.execute();

    expect(mockRepository.findByTimeWindow).toHaveBeenCalledWith(60);
  });
});
