import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url_producao: string = 'https://catalogueme.herokuapp.com'

  constructor(private http: HttpClient) { }

  login(user, pass): any {
    return this.http.post<any>(this.url_producao + '/login',
      {
        user_email: user,
        user_passwd: pass,
      })
      .toPromise()
      .then(res => {
        console.log('login feito, resultado: ')
        console.log(res)
        localStorage['token'] = res.token;
        localStorage['user'] = JSON.stringify(res.user);
      });
  }
}
