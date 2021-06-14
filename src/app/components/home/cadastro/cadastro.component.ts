import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LojaService } from './../../../services/loja/loja.service';
import Loja from 'src/app/models/loja';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})
export class CadastroComponent implements OnInit {


  loja: Loja;
  login: string = '';
  pass: string;
  passConfirm: string;
  loginstr: string;
  wpp: string;
  name: string;
  confirmpass = true;

  constructor(private lojaService: LojaService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  checkpass() {

    this.confirmpass = !(this.pass === this.passConfirm);
    console.log(this.confirmpass)
  }

  formatar() {
    this.loginstr = this.login.trim().toLowerCase().replace(/\s/g, '');
  }

  create() {
    this.lojaService.createLoja(
      this.name, this.wpp, this.login, this.pass
    ).then(
    () =>
      this.router.navigate(['/dashboard', '']),
    error =>
      this.messageService.add({severity: 'error', summary: 'Falha ao cadastrar loja', detail: 'Dados inválidos.', key: 'main'})
    )
  }
}
