import { Statistics } from '../statistics.entity';

describe('Statistics Entity', () => {
  it('should create statistics with provided values', () => {
    const statistics = new Statistics(5, 500, 100, 50, 200);

    expect(statistics.count).toBe(5);
    expect(statistics.sum).toBe(500);
    expect(statistics.avg).toBe(100);
    expect(statistics.min).toBe(50);
    expect(statistics.max).toBe(200);
  });

  it('should create empty statistics', () => {
    const statistics = Statistics.empty();

    expect(statistics.count).toBe(0);
    expect(statistics.sum).toBe(0);
    expect(statistics.avg).toBe(0);
    expect(statistics.min).toBe(0);
    expect(statistics.max).toBe(0);
  });

  it('should create statistics from amounts array', () => {
    const amounts = [100, 200, 50, 150];
    const statistics = Statistics.fromAmounts(amounts);

    expect(statistics.count).toBe(4);
    expect(statistics.sum).toBe(500);
    expect(statistics.avg).toBe(125);
    expect(statistics.min).toBe(50);
    expect(statistics.max).toBe(200);
  });

  it('should return empty statistics for empty amounts array', () => {
    const statistics = Statistics.fromAmounts([]);

    expect(statistics.count).toBe(0);
    expect(statistics.sum).toBe(0);
    expect(statistics.avg).toBe(0);
    expect(statistics.min).toBe(0);
    expect(statistics.max).toBe(0);
  });

  it('should handle single amount correctly', () => {
    const amounts = [42.5];
    const statistics = Statistics.fromAmounts(amounts);

    expect(statistics.count).toBe(1);
    expect(statistics.sum).toBe(42.5);
    expect(statistics.avg).toBe(42.5);
    expect(statistics.min).toBe(42.5);
    expect(statistics.max).toBe(42.5);
  });
});
