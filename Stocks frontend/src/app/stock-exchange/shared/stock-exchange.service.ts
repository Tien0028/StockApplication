import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {StockUpdateDTO} from './stock-update.dto';
import {StockDTO} from './stock.dto';
import {Stock} from './stock.model';

@Injectable({
    providedIn: 'root'
})
export class StockExchangeService {

    constructor(private socket: Socket) { }
    updateStock(stockId: number, updatedStock: string): void {
        const stockUpdateDto: StockUpdateDTO = {
            id: stockId,
            updatedStockValue: updatedStock
        };
        console.log('DTO = ', stockUpdateDto.id, stockUpdateDto.updatedStockValue);

        this.socket.emit('update', stockUpdateDto);
    }
    createStock(stock: Stock): void{
        this.socket.emit('create-stock', stock);
    }

    listenForStockUpdates(): Observable<StockDTO> {
        console.log('Stock updated in service');

        const ss = this.socket
            .fromEvent<StockDTO>('allStocks');
        if (!ss) {
            console.log('Ss = undefined');
        } else {
            console.log('Ss = DEFINED', ss);
        }
        return ss;
    }

    getAllStocks(): Observable<StockDTO[]> {
        const staks =  this.socket
            .fromEvent<StockDTO[]>('allStocks');
        return staks;
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }
}
