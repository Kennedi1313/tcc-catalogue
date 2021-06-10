import Produto from '../../../models/produto';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { LojaService } from './../../../services/loja/loja.service';
import { ProdutoService } from './../../../services/produto/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss'],
  providers: [ConfirmationService]
})
export class ItensComponent implements OnInit {

  user: any;
  products: Produto[];
  categories: string[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  @ViewChild('dv') dv: any;

  constructor(private productService: ProdutoService, private lojaService: LojaService,
              private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.productService.subscribeOnItemCreated().subscribe((res) => {
      this.getProducts();
    });
    this.getProducts();
    this.sortOptions = [
      {label: 'Maior para menor', value: '!price'},
      {label: 'Menor para maior', value: 'price'}
    ];
  }

  getProducts(): void {
    this.user = JSON.parse(localStorage['user']);
    this.lojaService.getCategories(this.user.shop_id).then(data => this.categories =  data.filter(res => res !== ''));
    this.productService.getProducts(this.user.shop_id)
    .then(data => this.products = data)
    .then(() => {
      this.products.map((res: Produto) => res.price = Number.parseFloat(res.price.toString()));
    }).then(res => {
      this.products.map( (prod: Produto) => {
        this.productService.getItemAvatarById(prod.id).then( ava => {
          const avatar = ava.filter(foto => foto !== '' && foto.avatar !== '');
          if (avatar.length > 0) {
            console.log(avatar)
            prod.avatar = avatar[0].avatar;
          }
        });
      });
    });
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

  delete(itemId): void {

    let avatar = null;
    console.log('entrou aqui')
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esse produto?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
          this.productService.getItemAvatarById(itemId).then((result) => {
            console.log(result);
            avatar = result;
          }).then( () =>
            this.productService.deleteProduto(itemId, avatar).then((result) => {
            console.log(result);
          })).then( () => {
            this.getProducts();
            this.messageService.add({severity: 'info', summary: 'Excluido', detail: 'Item excluido com sucesso.', key: 'main'})
          }
          );
      },
      reject: (type) => {
        this.messageService.add({severity: 'warn', summary: 'Cancelado', detail: 'Item não excluído', key: 'main'});
      }
  });
  }

  changeAtivoItem(item: any): void {
    item.ativo = !item.ativo;
    this.productService.changeAtivo(item).then(res => console.log(res), err => console.error(err));
  }
}
