import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Loja from 'src/app/models/loja';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  //url_producao: string = 'https://catalogueme-backend.herokuapp.com';
  url_producao = 'http://localhost:3333';

  constructor(private http: HttpClient) { }

  getLoja(shopId): any {
    return this.http.get<any>(this.url_producao + '/shopbyid', {
      params: {
        shop_id: shopId,
      }})
    .toPromise()
    .then(res => res[0] as Loja[])
    .then(data => data);
  }

  getLojaByTag(tag): any {
    return this.http.get<any>(this.url_producao + '/shopbytag', {
      params: {
        shop_tag: tag,
      }})
    .toPromise()
    .then(res => res[0] as Loja[])
    .then(data => data);
  }

  getCategories(shopId): any {
    return this.http.get<any>(this.url_producao + '/categories', {
      params: {
        shop_id: shopId,
      }})
    .toPromise()
    .then(res => res as string[])
    .then(data => data);
  }

  addCategory(category, shopId): any {
    return this.http.post<any>(this.url_producao + '/shops-categories', {
      category: category,
      shop_id: shopId
    })
    .toPromise()
    .then(res => res);
  }

  createLoja(name: string, wpp: string, login: string, passwd: string): any {
    return this.http.post<any>(this.url_producao + '/shops',
      {
        user_name: 'adm',
        user_whatsapp: '84998594171',
        user_email: login,
        user_passwd: passwd,
        shop_name: name,
        shop_whatsapp: wpp,
        shop_bio: ''
      }
    )
    .toPromise()
    .then(res => res);
  }

  editLoja(id, name, whatsapp): any {
    return this.http.post<any>(this.url_producao + '/shops-edit',
      {
        shop_id: id,
        shop_name: name,
        shop_whatsapp: whatsapp
      }
    )
    .toPromise()
    .then(res => res);
  }
}
