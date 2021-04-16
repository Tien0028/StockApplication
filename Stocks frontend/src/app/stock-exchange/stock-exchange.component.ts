import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockExchangeService} from './shared/stock-exchange.service';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {StockDTO} from './shared/stock.dto';
import {Stock} from './shared/stock.model';
import {StockState} from './shared/state/stocks.state';
import {Select, Store} from '@ngxs/store';
import {ListenForStocks} from './shared/state/stocks.actions';

@Component({
    selector: 'app-stocks',
    templateUrl: './stock-exchange.component.html',
    styleUrls: ['./stock-exchange.component.scss']
})
export class StockExchangeComponent implements OnInit, OnDestroy {
    @Select(StockState.stocks) stocks$: Observable<StockDTO[]> | undefined;

    stockFC = new FormControl('');
    public stock: StockDTO;
    allStocks: StockDTO[] = [];
    unsubscribe$ = new Subject();
    stockSelected: Stock | undefined;
    updatedStock: StockDTO;

    allStocks$: Subscription;

    constructor(private stockExchangeService: StockExchangeService, private store: Store) {}

    ngOnInit(): void {
        // this. allStocks$ = this.store.dispatch(new ListenForStocks());
        location.reload();
        this.allStocks$ = this.stockExchangeService.listenForStockUpdates()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(newStockValue => {
                console.log('listening for backend stocks');
                this.allStocks.push(newStockValue);
            });

        // this.stockExchangeService.getAllStocks()
        this.store.dispatch(new ListenForStocks())
            .pipe(
                take(1)
            )
            .subscribe(stocks => {
                this.allStocks = stocks;
                console.log('allStocks in Frontend =', stocks);
            });

    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    increaseValue(): void {
        this.changeStockValue(1);
        console.log('up', this.stockFC.value);
    }

    decreaseValue(): void  {
        this.changeStockValue(-1);
        console.log('down', this.stockFC.value);
    }

    changeStockValue(increment): void {
        if (this.updatedStock) {
            this.updatedStock.currentPrice += increment;
            this.stockFC.patchValue(this.updatedStock.currentPrice);
        } else {
            console.log('error - no stock selected to change value of');
        }
    }

    updateStock(): void  {
        console.log('update', this.stockFC.value);
        this.stockExchangeService.updateStock(this.updatedStock.id, this.stockFC.value);
        this.stockFC.patchValue(this.updatedStock.currentPrice);
        location.reload();
    }


    onSelection(e, v): any {
        console.log(this.stockSelected = e.option.value);
        this.stockSelected = e.option.value;
    }

    onNgModelChange($event: any): void {
        const stockName = this.stockSelected[0].toString();
        this.updatedStock = this.allStocks.find(us => us.name === stockName);
        if (this.updatedStock)
        {
            console.log(this.updatedStock.name, this.updatedStock.description);
            this.stockFC.patchValue(this.updatedStock.currentPrice);
        } else {
            console.log('error - no stock with that name found');
        }
    }
}
