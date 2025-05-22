import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Transaction API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /transactions', () => {
    it('should create a transaction successfully', () => {
      const transactionData = {
        amount: 123.45,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      return request(app.getHttpServer())
        .post('/transactions')
        .send(transactionData)
        .expect(201);
    });

    it('should reject negative amount', () => {
      const transactionData = {
        amount: -10,
        timestamp: '2024-02-20T12:34:56.789Z',
      };

      return request(app.getHttpServer())
        .post('/transactions')
        .send(transactionData)
        .expect(400);
    });

    it('should reject future timestamp', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const transactionData = {
        amount: 100,
        timestamp: futureDate.toISOString(),
      };

      return request(app.getHttpServer())
        .post('/transactions')
        .send(transactionData)
        .expect(422);
    });

    it('should reject invalid JSON', () => {
      return request(app.getHttpServer())
        .post('/transactions')
        .send({ amount: 'invalid' })
        .expect(400);
    });
  });

  describe('DELETE /transactions', () => {
    it('should delete all transactions', async () => {
      // First create a transaction
      await request(app.getHttpServer()).post('/transactions').send({
        amount: 100,
        timestamp: new Date().toISOString(),
      });

      // Then delete all
      return request(app.getHttpServer()).delete('/transactions').expect(200);
    });
  });

  describe('GET /statistics', () => {
    it('should return empty statistics initially', () => {
      return request(app.getHttpServer())
        .get('/statistics')
        .expect(200)
        .expect({
          count: 0,
          sum: 0,
          avg: 0,
          min: 0,
          max: 0,
        });
    });

    it('should calculate statistics correctly', async () => {
      const now = new Date();

      // Create transactions within the last 60 seconds
      await request(app.getHttpServer())
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: new Date(now.getTime() - 30000).toISOString(), // 30 seconds ago
        });

      await request(app.getHttpServer())
        .post('/transactions')
        .send({
          amount: 200,
          timestamp: new Date(now.getTime() - 10000).toISOString(), // 10 seconds ago
        });

      const response = await request(app.getHttpServer())
        .get('/statistics')
        .expect(200);

      expect(response.body.count).toBe(2);
      expect(response.body.sum).toBe(300);
      expect(response.body.avg).toBe(150);
      expect(response.body.min).toBe(100);
      expect(response.body.max).toBe(200);
    });

    it('should exclude old transactions from statistics', async () => {
      const now = new Date();

      // Create an old transaction (older than 60 seconds)
      await request(app.getHttpServer())
        .post('/transactions')
        .send({
          amount: 500,
          timestamp: new Date(now.getTime() - 70000).toISOString(), // 70 seconds ago
        });

      // Create a recent transaction
      await request(app.getHttpServer())
        .post('/transactions')
        .send({
          amount: 100,
          timestamp: new Date(now.getTime() - 30000).toISOString(), // 30 seconds ago
        });

      const response = await request(app.getHttpServer())
        .get('/statistics')
        .expect(200);

      // Should only count the recent transaction
      expect(response.body.count).toBe(1);
      expect(response.body.sum).toBe(100);
      expect(response.body.avg).toBe(100);
      expect(response.body.min).toBe(100);
      expect(response.body.max).toBe(100);
    });
  });

  describe('GET /health', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.status).toBe('ok');
          expect(res.body.timestamp).toBeDefined();
        });
    });
  });
});
