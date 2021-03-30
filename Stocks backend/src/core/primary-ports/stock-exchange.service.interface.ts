import { Stock } from '../models/stock.model';

export const IStockExchangeServiceProvider = 'IStockExchangeServiceProvider';
export interface IStockExchangeService {

  updateStockValue(stockId: string, updatedStockValue: string): Promise<void>;

  getAllStocks(): Promise<Stock[]>;
}
