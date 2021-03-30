import { Module } from '@nestjs/common';
import { StockExchangeGateway } from './gateways/stock-exchange.gateway';
import { StockExchangeService } from '../core/services/stock-exchange.service';
import { IStockExchangeServiceProvider } from '../core/primary-ports/stock-exchange.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import StockEntity from '../infrastructure/data-source/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockEntity])],
  providers: [
    StockExchangeGateway,
    {
      provide: IStockExchangeServiceProvider,
      useClass: StockExchangeService,
    },
  ],
})
export class StockExchangeModule {}
