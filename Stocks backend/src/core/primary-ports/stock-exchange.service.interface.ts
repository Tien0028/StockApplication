import { Stock } from '../models/stock.model';

export const IStockExchangeServiceProvider = 'IStockExchangeServiceProvider';
export interface IStockExchangeService {
  updateStockValue(stockId: number, updatedStockValue: string): Promise<void>;

  getAllStocks(): Promise<Stock[]>;
  createStock(stock: Stock): Promise<Stock>;
}
