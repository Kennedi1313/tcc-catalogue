import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Loja from 'src/app/models/loja';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  constructor(private http: HttpClient) { }

  getLoja(shopId): any {
    return this.http.get<any>('http://localhost:3333/shopbyid', {
      params: {
        shop_id: shopId,
      }})
    .toPromise()
    .then(res => res[0] as Loja[])
    .then(data => data);
  }

  getLojaByTag(tag): any {
    return this.http.get<any>('http://localhost:3333/shopbytag', {
      params: {
        shop_tag: tag,
      }})
    .toPromise()
    .then(res => res[0] as Loja[])
    .then(data => data);
  }

  getCategories(shopId): any {
    return this.http.get<any>('http://localhost:3333/categories', {
      params: {
        shop_id: shopId,
      }})
    .toPromise()
    .then(res => res as string[])
    .then(data => data);
  }

  addCategory(category, shopId): any {
    return this.http.post<any>('http://localhost:3333/shops-categories', {
      category: category,
      shop_id: shopId
    })
    .toPromise()
    .then(res => res);
  }
}
