import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private symbolUrl = `https://finnhub.io/api/v1/quote?token=${process.env['NG_APP_API_KEY']}&symbol=`;

  private newsUrl = `https://finnhub.io/api/v1/news?category=general&token=${process.env['NG_APP_API_KEY']}`

  constructor(private http: HttpClient) { }

  getSymbolData(symbol: string): Observable<any> {
    return this.http.get(`${this.symbolUrl}${symbol}`);
  }

  getNews(): Observable<any> {
    return this.http.get(this.newsUrl);
  }
}
