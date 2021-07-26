import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Loja from 'src/app/models/loja';

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  url_producao: string = 'https://catalogueme-backend.herokuapp.com';
  //url_producao = 'http://localhost:3333';
  //url_producao = 'http://localhost:8080';

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

  createLoja(name: string, whatsapp: string, passwd: string): any {
    return this.http.post<any>(this.url_producao + '/shops',
      {
        name,
        whatsapp,
        passwd
      }
    )
    .toPromise()
    .then(res => res);
  }

  editLoja(id, name, whatsapp): any {
    return this.http.post<any>(this.url_producao + '/shops-edit',
      {
        id,
        name,
        whatsapp
      }
    )
    .toPromise()
    .then(res => {
      localStorage['shop'] = JSON.stringify({
        id,
        name,
        whatsapp
      });
    });
  }
}
