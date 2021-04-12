import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import { AddStockComponent } from './stock-exchange/shared/add-stock/add-stock.component';
import { NgxsModule } from '@ngxs/store';
import {environment} from '../environments/environment.prod';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({ url: 'http://localhost:3000', options: {} });
  }
}

@Injectable()
export class SocketStocks extends Socket {
  constructor() {
    super({ url: 'http://localhost:3001', options: {} });
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AddStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    SharedModule,
    MatCardModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
