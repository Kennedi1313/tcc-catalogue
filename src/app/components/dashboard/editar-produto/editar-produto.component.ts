import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LojaService } from './../../../services/loja/loja.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../../../services/produto/produto.service';
import Produto from '../../../models/produto';
import { Component, Input, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  file: any;

  displayModal: boolean;
  product: Produto;
  itemId: any = 0;

  avatar: string;
  name: string;
  info: string;
  price: number;
  shop: any;

  constructor(private produtoService: ProdutoService, router: ActivatedRoute,
              private lojaService: LojaService, private messageService: MessageService,
              private imageCompress: NgxImageCompressService,
              private productService: ProdutoService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.shop = JSON.parse(localStorage['shop']);
  }

  compressFile(): void {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.avatar = result;
          this.file = this.dataURItoBlob(result);
        }
      ).then( res => {
        const formData: FormData = new FormData();
        formData.append('item_id', this.itemId);
        if (this.file) {
          formData.append('avatar', this.file, this.file.name);
        }
        this.produtoService.addAvatar(formData).then(res => {
          this.produtoService.sendMessageItemCreated();
        });
      }).then( res => {
        this.addSingle('', 'Imagem adicionada.', 'image');
      });
    });
  }

  dataURItoBlob(dataURI): any {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  salvar(): void {
    const params: any = {
      item_id: this.itemId,
      name: this.name,
      price: this.price.toString(),
      info: this.info ? this.info : ''
    };

    params.shop_id = this.shop.id;

    this.produtoService.updateProduto(params).then((res) => {
        this.addSingle('Item Concluido', 'Informações do item salvas com sucesso.', 'main');
        this.produtoService.sendMessageItemCreated();
        this.clear();
      },
      error => {
        this.addMsgError('Item não criado', 'Houve algum erro.');
      }
    );
    this.displayModal = false;
  }

  clear(): void {
    this.name = ' ';
    this.price = 0;
    this.info = ' ';
  }

  addSingle(summary, message, key?): void {
    this.messageService.add({severity: 'success', summary: summary, detail: message, key: key });
  }

  addMsgError(summary, message): void {
    this.messageService.add({severity: 'error', summary: summary, detail: message});
  }
}
