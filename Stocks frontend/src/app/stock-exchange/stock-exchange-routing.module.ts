import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockExchangeComponent } from './stock-exchange.component';
import {AddStockComponent} from './shared/add-stock/add-stock.component';

const routes: Routes = [{ path: '', component: StockExchangeComponent },
  {path: 'add-stock', component: AddStockComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockExchangeRoutingModule { }
