import { ActivatedRoute } from '@angular/router';
import { LojaService } from './../../../services/loja/loja.service';
import { ProdutoService } from './../../../services/produto/produto.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import Produto from 'src/app/models/produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  loja: any;
  tag: any;
  products: Produto[];
  categories: string[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  @ViewChild('dv') dv: any;
  loading = false;

  constructor(private productService: ProdutoService, private lojaService: LojaService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => this.tag = params['loja']);
  }

  ngOnInit(): void {
    this.loading = true;
    this.lojaService.getLojaByTag(this.tag).then(data => this.loja = data).then(
      () => {
        console.log(this.loja);
        this.lojaService.getCategories(this.loja.id).then(data => this.categories = data.filter(res => res !== ''));
        this.productService.getProducts(this.loja.id)
        .then(data => this.products = data)
        .then(() => {
          this.products.map((res: Produto) => res.price = Number.parseFloat(res.price.toString()));
        }).then(res => {
          this.products.map( (prod: Produto) => {
            this.productService.getItemAvatarById(prod.id).then( ava => {
              const avatar = ava.filter(foto => foto !== '' && foto.avatar !== '');
              if (avatar.length > 0) {
                prod.avatar = avatar[0].avatar;
              }
              this.loading = false;
            });
          });
        });
      }
    );

    this.sortOptions = [
        {label: 'Maior para menor', value: '!price'},
        {label: 'Menor para maior', value: 'price'}
    ];

  }

  onSortChange(event: any): void {
    const value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  search(event: any): void {
    this.dv.filter((event.target as HTMLInputElement).value, 'contains');
  }

  onCategoryChange(event: any): void {
    this.dv.filter(event.value, 'equals');
  }

}
