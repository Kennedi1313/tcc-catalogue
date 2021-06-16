import { LojaService } from './../../../services/loja/loja.service';
import { ProdutoService } from './../../../services/produto/produto.service';
import Produto from '../../../models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  images: any[];
  product: Produto;
  itemId: any;
  loja: any;
  shopTag: string;
  text: string;

  constructor(private produtoService: ProdutoService,
              activatedRouter: ActivatedRoute,
              private router: Router,
              private lojaService: LojaService) {
    this.itemId = activatedRouter.snapshot.params['id'];
    this.shopTag = activatedRouter.snapshot.params['loja'];
  }

  ngOnInit(): void {
    this.produtoService.getItemAvatarById(this.itemId).then(res => this.images = res);
    this.produtoService.getProductById(this.itemId).then(res => this.product = res).then( () =>
    this.lojaService.getLojaByTag(this.shopTag).then(res => this.loja = res).then(() =>
      this.loja.whatsapp = this.loja.whatsapp.replace(/[^0-9,]*/g, '').replace(',', '.'),
      this.text = 'Olá! Tenho interesse no item: ' + this.product.name +
        ' ( https://catalogueme.vercel.app/' + this.shopTag + '/' + this.itemId + ')'
    ));
  }

  comprar(): void {

  }
}
