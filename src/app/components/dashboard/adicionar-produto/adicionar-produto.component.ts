import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LojaService } from './../../../services/loja/loja.service';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../../../services/produto/produto.service';
import Produto from '../../../models/produto';
import { Component, Input, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  file: any;

  displayModal: boolean;
  images: any[];
  product: Produto;
  itemId: any = 0;

  shopCategories: string[];
  shopCategoriesFiltered: string[];
  newCategoryFlag: boolean = false;
  newCategory: string;

  name: string;
  category: { name: string, code: string };
  info: string;
  price: number;
  user: any;

  constructor(private produtoService: ProdutoService, router: ActivatedRoute,
              private lojaService: LojaService, private messageService: MessageService,
              private imageCompress: NgxImageCompressService,
              private productService: ProdutoService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage['user']);
    this.buscarCategorias();
    this.category = {name: '', code: ''};
  }

  buscarCategorias(): void {
    this.lojaService.getCategories(this.user.shop_id).then((result) => {
      this.shopCategories = result.filter(res => res !== '');
      console.log(this.shopCategories);
    });
  }

  buscarImages(itemId: any): void {
    console.log(itemId);
    this.produtoService.getItemAvatarById(itemId).then((result) => {
      console.log(result)
      this.images = result;
    });
    console.log(this.images);
  }

  compressFile(): void {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          this.file = this.dataURItoBlob(result);
          console.log(this.file);
        }
      );
    });
  }

  dataURItoBlob(dataURI): any {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  salvar(): void {
    const formData: FormData = new FormData();
    formData.append('user_id', this.user.id);
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('info', this.info ? this.info : '');
    if (this.file) {
      formData.append('avatar', this.file, this.file.name);
    }
    if (this.newCategoryFlag) {
      formData.append('category', this.newCategory);
      if (this.newCategory) {
        this.lojaService.addCategory(this.newCategory, this.user.shop_id);
      }
    } else {
      formData.append('category', this.category.name);
    }
    this.produtoService.createProduto(formData).then((res) => {
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

  filterCountry(event): void {
    const filtered: any[] = [];
    const query = event.query;

    for (let i = 0; i < this.shopCategories.length; i++) {
        const category = this.shopCategories[i];
        if (category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push({ name: category, code: category });
        }
    }
    this.shopCategoriesFiltered = filtered;
    if (this.shopCategoriesFiltered.length === 0) {
      this.newCategoryFlag = true;
      this.newCategory = query;
    } else {
      this.newCategoryFlag = false;
    }
  }

  clear(): void {
    this.name = '';
    this.category = {name: '', code: ''};
    this.price = null;
    this.imgResultAfterCompress = null;
    this.info = ' ';
  }

  addSingle(summary, message, key): void {
    this.messageService.add({severity: 'success', summary: summary, detail: message, key: key});
  }

  addMsgError(summary, message): void {
    this.messageService.add({severity: 'error', summary: summary, detail: message});
  }
}
