import { Injectable } from '@nestjs/common';
import { Stock } from '../models/stock.model';
import { IStockExchangeService } from '../primary-ports/stock-exchange.service.interface';
import StockEntity from '../../infrastructure/data-source/entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StockExchangeService implements IStockExchangeService {
  allStocks: Stock[] = [];

  constructor(
    @InjectRepository(StockEntity)
    private stockRepository: Repository<StockEntity>,
  ) {}

  addStock(): void {
    const testStock: Stock = {
      id: 1,
      name: 'Gnome Power',
      description: 'Does gnome stuff',
      currentPrice: 1111,
      startPrice: 1010,
      startDate: 'unimplemented',
    };
    this.stockRepository.create(testStock);
    this.stockRepository
      .save(testStock)
      .then((testStock) => {
        console.log('Stock has been found: ', testStock);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
      .finally(() => {
        console.log('Finally called');
      });
    console.log('ADDed STOCK');
  }

  async updateStockValue(
    stockId: number,
    updatedStockValue: string,
  ): Promise<void> {
    const stockDB = await this.stockRepository.findOne({ id: stockId });
    if (stockDB) {
      stockDB.currentPrice = parseInt(updatedStockValue);
      await this.stockRepository.update(stockId, stockDB);
    }
  }

  async getAllStocks(): Promise<Stock[]> {
    const stocks = await this.stockRepository.find();
    console.log('Stocks = ', stocks);
    const allStocks: Stock[] = JSON.parse(JSON.stringify(stocks));
    console.log('getAllStocks total: ', allStocks.length);
    return allStocks;
  }
  async createStock(stock: Stock): Promise<Stock> {
    try {
      const stockCreated = await this.stockRepository.create({
        name: stock.name,
        description: stock.description,
        currentPrice: stock.currentPrice,
        startDate: stock.startDate,
        startPrice: stock.startPrice,
      });
      await this.stockRepository.save(stockCreated);
      return stockCreated;
    } catch (e) {
      console.log('Catch an error', e);
    }
  }
}
