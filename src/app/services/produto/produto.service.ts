import Produto from '../../models/produto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  public itemCreated: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getProducts(shopId): any {
    return this.http.get<any>('http://localhost:3333/items', {
      params: {
        shop_id: shopId,
        page: '1',
        limit: '12',
      }})
    .toPromise()
    .then(res => res.items as Produto[])
    .then(data => data);
  }

  getProductById(itemId: any): any {
    return this.http.get<any>('http://localhost:3333/itembyid', {
      params: {
        item_id: itemId,
      }})
    .toPromise()
    .then(res => res[0] as Produto)
    .then(data => data);
  }

  getItemAvatarById(itemId: any): any {
    return this.http.get<any>('http://localhost:3333/itemavatarbyid', {
      params: {
        item_id: itemId,
      }})
      .toPromise()
      .then(res => res.itemsAvatar)
      .then(data => data);
  }

  createProduto(formData: FormData): any {
    return this.http.post<any>('http://localhost:3333/items', formData)
    .toPromise()
    .then(res => res);
  }

  updateProduto(params: any): any {
    return this.http.post<any>('http://localhost:3333/items-edit', { params })
    .toPromise()
    .then(res => res);
  }

  sendMessageItemCreated(): void {
    this.itemCreated.next('item created');
  }

  subscribeOnItemCreated(): Observable<string> {
    return this.itemCreated.asObservable();
  }

  deleteProduto(itemId, avatar): any {
    return this.http.post<any>('http://localhost:3333/itemsDelete',
    {
      item_id: itemId,
      avatars: avatar
    })
    .toPromise()
    .then(res => res);
  }

  changeAtivo(item: any): any {
    return this.http.post<any>('http://localhost:3333/itemsInative',
    {
      item: item
    })
    .toPromise()
    .then(res => res);
  }

  addAvatar(formData: FormData): any {
    return this.http.post<any>('http://localhost:3333/avatar', formData)
    .toPromise()
    .then(res => res);
  }

  excluirAvatar(avatar: any): any {
    return this.http.post<any>('http://localhost:3333/avatar-delete',
    {
      avatar: avatar.avatar,
      id: avatar.id
    })
    .toPromise()
    .then(res => res);
  }
}
