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
              private productService: ProdutoService,
              private confirmationService: ConfirmationService) {
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
      this.images = result ? result.filter(res => res.avatar !== '') : [];
      console.log(this.images);
    });
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
      ).then( res => {
        const formData: FormData = new FormData();
        formData.append('item_id', this.itemId);
        if (this.file) {
          formData.append('avatar', this.file, this.file.name);
        }
        this.produtoService.addAvatar(formData).then(res => {
          this.images = [];
          this.produtoService.sendMessageItemCreated();
          this.buscarImages(this.itemId);
        });
      }).then( res => {
        this.addSingle('', 'Imagem adicionada.', 'image');
      });
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
    const params: any = {
      item_id: this.itemId,
      name: this.name,
      price: this.price.toString(),
      info: this.info ? this.info : ''
    };

    if (this.newCategoryFlag) {
      params.category = this.newCategory;
      if (this.newCategory) {
        this.lojaService.addCategory(this.newCategory, this.user.shop_id);
      }
    } else {
      params.category = this.category.name;
    }

    params.user_id = this.user.id;

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

  delete(avatar: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir essa imagem?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.produtoService.excluirAvatar(avatar)
        .then(() => {
          this.images = [];
          this.buscarImages(this.itemId)
        })
          .then(() =>
            this.produtoService.sendMessageItemCreated())
            .then( () =>
              this.messageService.add({severity: 'info', summary: 'Excluido', detail: 'Imagem excluida.', key: 'image'})
        );
      },
      reject: (type) => {
        this.messageService.add({severity: 'warn', summary: 'Cancelado', detail: 'Item não excluído', key: 'image'});
      }
    });
  }

  clear(): void {
    this.name = ' ';
    this.category = null;
    this.price = 0;
    this.imgResultAfterCompress = null;
    this.info = ' ';
  }

  addSingle(summary, message, key?): void {
    this.messageService.add({severity: 'success', summary: summary, detail: message, key: key });
  }

  addMsgError(summary, message): void {
    this.messageService.add({severity: 'error', summary: summary, detail: message});
  }
}
