import { MessageService } from 'primeng/api';
import { LojaService } from './../../../services/loja/loja.service';
import { Component, OnInit } from '@angular/core';
import Loja from 'src/app/models/loja';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {

  loja: Loja;
  shop: any;
  displayModal: boolean;

  constructor(private lojaService: LojaService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.shop = JSON.parse(localStorage['shop']);
    this.lojaService.getLoja(this.shop.id).then(loja => this.loja = loja);
  }

  salvar(): void {
    this.lojaService.editLoja(this.shop.id, this.loja.name, this.loja.whatsapp).then( () =>
      this.addSingle('Loja Atualizada', 'Informações da loja salvas com sucesso.', 'main'),
      this.displayModal = false
    )
  }

  addSingle(symmary, message, key): void {
    this.messageService.add({severity: 'success', summary: symmary, detail: message, key: key});
  }
}
