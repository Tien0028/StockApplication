import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import {
  IStockExchangeService,
  IStockExchangeServiceProvider,
} from '../../core/primary-ports/stock-exchange.service.interface';
import { StockUpdateDTO } from '../dtos/stock-update.dto';
import { Stock } from '../../core/models/stock.model';

@WebSocketGateway()
export class StockExchangeGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IStockExchangeServiceProvider)
    private stockExchangeService: IStockExchangeService,
  ) {}

  @WebSocketServer() server;
  @SubscribeMessage('update')
  async handleStockUpdateEvent(
    @MessageBody() stockUpdate: StockUpdateDTO,
  ): Promise<void> {
    console.log('Gateway = ', stockUpdate.id, stockUpdate.updatedStockValue);
    await this.stockExchangeService.updateStockValue(
      stockUpdate.id,
      stockUpdate.updatedStockValue,
    );
    this.server.emit('update', this.stockExchangeService.getAllStocks());
  }

  @SubscribeMessage('create-stock')
  async handleMessage(
    @MessageBody() data: Stock,
    @ConnectedSocket() client: Socket,
  ) {
    const stock: Stock = {
      id: data.id,
      name: data.name,
      description: data.description,
      currentPrice: data.currentPrice,
      startPrice: data.startPrice,
      startDate: data.startDate,
    };
    try {
      const stockCreated = await this.stockExchangeService.createStock(stock);
      client.emit('stock-created-success', stockCreated);
    } catch (e) {
      client.emit('stock-created-error', e.message);
    }
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
    client.emit('allStocks', await this.stockExchangeService.getAllStocks()); //
  }

  async handleDisconnect(client: Socket, ...args: any): Promise<any> {
    console.log('Client Disconnect', client.id);
    client.emit('allStocks', await this.stockExchangeService.getAllStocks()); //
  }
}
