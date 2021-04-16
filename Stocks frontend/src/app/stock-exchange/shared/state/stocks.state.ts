import {Stock} from '../stock.model';
import {Subscription} from 'rxjs';
import {Injectable} from '@angular/core';
import {StockExchangeService} from '../stock-exchange.service';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ListenForStocks, UpdateStockValues} from './stocks.actions';


export interface StocksStateModel{
    stocks: Stock[];
}
@State<StocksStateModel>({
    name: 'stock',
    defaults: {
        stocks: [],
    }
})
@Injectable()
export class StockState {
    private stockUbsub: Subscription | undefined;

    constructor(private stockService: StockExchangeService) {
    }

    @Selector()
    static stocks(state: StocksStateModel): Stock[] {
        return state.stocks;
    }

    @Action(ListenForStocks)
    getAllStocks(stx: StateContext<StocksStateModel>): void {
        this.stockService.getAllStocks();
    }


    @Action(UpdateStockValues)
    updateStockValues(stx: StateContext<StocksStateModel>, us: UpdateStockValues): void {
        // Old state Object...
        // {
        //     chatClients: [
        //       //    {id: '33', nickname: 'bob'},
        //       //    {id: '22', nickname: 'dd'}
        //     //    ],
        //     chatClient: {id: '2', nickname: 'd'}
        //   }
        const state = stx.getState();
        const newState: StocksStateModel = {
            ...state,
            stocks: us.stocks
        };
        stx.setState(newState);
    }
}
