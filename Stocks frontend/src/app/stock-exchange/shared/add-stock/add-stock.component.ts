import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {StockExchangeService} from '../stock-exchange.service';
import {Stock} from '../stock.model';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  stockForm = this.fb.group({
    name: [''],
    description: [''],
    currentPrice: [''],
    startDate: [''],
    startPrice:['']
  });
  stockCreate: Stock | undefined;
  error: string | undefined;
  constructor(private fb: FormBuilder, private stockExchangeService: StockExchangeService) { }

  ngOnInit(): void {
  }

  createStock(): void{
    this.error = undefined;
    const stockDto: Stock = this.stockForm.value;
    this.stockExchangeService.createStock(stockDto);
  }
}
