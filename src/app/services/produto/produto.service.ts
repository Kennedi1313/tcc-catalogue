import Produto from '../../models/produto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  public itemCreated: BehaviorSubject<string> = new BehaviorSubject(null);

  url_producao: string = 'https://catalogueme-backend.herokuapp.com';
  //url_producao = 'http://localhost:3333';
  //url_producao = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getProducts(shopId): any {
    return this.http.get<any>(this.url_producao + '/items', {
      params: {
        shop_id: shopId,
      }})
    .toPromise()
    .then(res => res.items as Produto[])
    .then(data => data);
  }

  getProductById(itemId: any): any {
    return this.http.get<any>(this.url_producao + '/itembyid', {
      params: {
        item_id: itemId,
      }})
    .toPromise()
    .then(res => res[0] as Produto)
    .then(data => data);
  }

  createProduto(formData: FormData): any {
    return this.http.post<any>(this.url_producao + '/items', formData)
    .toPromise()
    .then(res => res);
  }

  updateProduto(params: any): any {
    return this.http.post<any>(this.url_producao + '/items-edit', { params })
    .toPromise()
    .then(res => res);
  }

  sendMessageItemCreated(): void {
    this.itemCreated.next('item created');
  }

  subscribeOnItemCreated(): Observable<string> {
    return this.itemCreated.asObservable();
  }

  deleteProduto(itemId): any {
    return this.http.post<any>(this.url_producao + '/itemsDelete',
    {
      item_id: itemId
    })
    .toPromise()
    .then(res => res);
  }

  changeAtivo(item: any): any {
    return this.http.post<any>(this.url_producao + '/itemsInative',
    {
      item: item
    })
    .toPromise()
    .then(res => res);
  }

  addAvatar(formData: FormData): any {
    return this.http.post<any>(this.url_producao + '/avatar', formData)
    .toPromise()
    .then(res => res);
  }
}
