import {Stock} from '../stock.model';


export class ListenForStocks {
    static readonly type = '[Stock] Listen For Stocks';
}
export class UpdateStockValues {
    constructor(public stocks: Stock[]) {}

    static readonly type = '[Stock] Update Stock Values';
}
