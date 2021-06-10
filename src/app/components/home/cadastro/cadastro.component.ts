import Loja from 'src/app/models/loja';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  loja: Loja;
  uploadedFiles: any;

  login: string = '';
  pass: string;
  loginstr: string;
  wpp: number;

  constructor() { }

  ngOnInit(): void {
  }

  formatar() {
    this.loginstr = this.login.trim().toLowerCase().replace(/\s/g, '');
  }

  onBasicUploadAuto(event): void {

  }
}
