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
  uploadedFiles: any;
  user: any;

  constructor(private lojaService: LojaService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage['user']);
    console.log(this.user.shop_id)
    this.lojaService.getLoja(this.user.shop_id).then(loja => this.loja = loja);
  }

  onBasicUploadAuto(event): void {

  }

  salvar(): void {
    this.lojaService.editLoja(this.user.shop_id, this.loja.name, this.loja.whatsapp).then( () =>
      this.addSingle('Loja Atualizada', 'Informações da loja salvas com sucesso.', 'main')
    )
  }

  addSingle(symmary, message, key): void {
    this.messageService.add({severity: 'success', summary: symmary, detail: message, key: key});
  }
}
