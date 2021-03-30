import {
  // NEW FROM HERE!!!
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
    @MessageBody() stockUpdate: StockUpdateDTO, //, updatedStockValue: string  //REPLACE with DTO
  ): Promise<void> {
    console.log('Gateway = ', stockUpdate.id, stockUpdate.updatedStockValue);
    // const stockToReturn =

    await this.stockExchangeService.updateStockValue(
      stockUpdate.id,
      stockUpdate.updatedStockValue,
    );
    //this.stockExchangeService.updateStockValue(stockId[0], stockId[1]);  //WORKS OLD
    this.server.emit('update', this.stockExchangeService.getAllStocks()); // Return stockToReturn??  // NEW was allStocks
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
