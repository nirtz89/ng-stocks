import { Component, Input, OnInit } from '@angular/core';
import { interval, mergeMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {

  @Input() symbol: string = '';
  @Input() name: string = '';
  @Input() image: string = '';
  private TIME_TO_UPDATE_IN_SECONDS = 6;
  price = 0;
  change = 0;
  changePercent = 0;
  dayLow = 0;
  dayHigh = 0;
  open = 0;
  previousClose = 0;
  isFlashPrice = false;

  private handleData(data: any) {
    this.price = data.c;
    this.change = data.d;
    this.changePercent = data.dp;
    this.dayHigh = data.h;
    this.dayLow = data.l;
    this.open = data.o;
    this.previousClose = data.pc;
    this.flashPrice();
  }

  private flashPrice() {
    this.isFlashPrice = true;
    setTimeout(() => {
      this.isFlashPrice = false;
    }, 200)
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSymbolData(this.symbol).subscribe(data => this.handleData(data));
    interval(this.TIME_TO_UPDATE_IN_SECONDS * 1000).pipe(
      mergeMap(() => this.dataService.getSymbolData(this.symbol))
    ).subscribe(
      data => this.handleData(data)
    )
  }

}
