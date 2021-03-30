import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'chats', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'stock-exchange', loadChildren: () => import('./stock-exchange/stock-exchange.module').then(m => m.StockExchangeModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
