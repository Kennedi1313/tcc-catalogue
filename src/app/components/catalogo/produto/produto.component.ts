import { ProdutoService } from './../../../services/produto/produto.service';
import Produto from '../../../models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  images: any[];
  product: Produto;
  itemId: any;

  constructor(private produtoService: ProdutoService, router: ActivatedRoute) {
    this.itemId = router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.produtoService.getProductById(this.itemId).then(res => this.product = res);
    this.produtoService.getItemAvatarById(this.itemId).then(res => this.images = res).then(() => console.log(this.images));

  }

}
