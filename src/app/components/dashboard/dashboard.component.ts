import { LojaService } from './../../services/loja/loja.service';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  tag: string;
  shop: any;
  constructor(private router: Router, private messageService: MessageService,
              private lojaService: LojaService) { }

  ngOnInit(): void {
    if (!localStorage['token']) {
      this.router.navigate(['/login']);
    }
    this.shop = JSON.parse(localStorage['shop']);
    this.tag = this.shop.name.replace(' ', '');
  }

  deslogar(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('shop');
    this.router.navigate(['/']);
  }

  copyToClipboard(link): void {
    // @ts-ignore
    link.select();
    document.execCommand('copy');
    this.addSingle('Link Copiado', 'Copiado com sucesso.', 'main');
  }

  addSingle(symmary, message, key): void {
    this.messageService.add({severity: 'success', summary: symmary, detail: message, key: key});
  }

}
