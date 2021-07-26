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

  displayModal: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}
