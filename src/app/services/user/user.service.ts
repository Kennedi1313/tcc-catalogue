import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_producao: string = 'https://catalogueme-backend.herokuapp.com';
  // url_producao = 'http://localhost:3333';
  //url_producao = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(user, pass): any {
    return this.http.post<any>(this.url_producao + '/login',
      {
        whatsapp: user,
        passwd: pass,
      })
      .toPromise()
      .then(res => {
        localStorage['token'] = res.token;
        localStorage['shop'] = JSON.stringify({
          id: res.shop.id,
          name: res.shop.name,
          whatsapp: res.shop.whatsapp
        });
      });
  }
}
