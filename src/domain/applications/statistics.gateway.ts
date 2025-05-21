// src/presentation/gateways/statistics.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { GetStatisticsUseCase } from '../usecases/get-statistic.usecase';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'statistics',
})
@Injectable()
export class StatisticsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(StatisticsGateway.name);
  private connectedClients = 0;

  @WebSocketServer()
  server: Server;

  constructor(private readonly getStatisticsUseCase: GetStatisticsUseCase) {}

  async handleConnection(client: Socket) {
    this.connectedClients++;
    this.logger.log(`Lientes Connectados: ${client.id}`);
    this.logger.log(`Total de clientes conectados: ${this.connectedClients}`);

    // Send initial statistics
    const statistics = await this.getStatisticsUseCase.execute();
    client.emit('statistics', statistics);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients--;
    this.logger.log(`Clientes Desconectados: ${client.id}`);
    this.logger.log(`Total de clientes conectados: ${this.connectedClients}`);
  }

  @Interval(1)
  async broadcastStatistics() {
    const start = Date.now();
    const statistics = await this.getStatisticsUseCase.execute();
    const duration = Date.now() - start;

    this.logger.log(`⏱️ Estatísticas calculadas em ${duration}ms`);
    this.server.emit('statistics', statistics);
  }
}
