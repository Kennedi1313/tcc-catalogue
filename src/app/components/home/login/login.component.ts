import { MessageService } from 'primeng/api';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {


  user: string;
  pass: string;

  constructor(private userService: UserService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.user, this.pass)
    .then(
      (result) => {
        this.router.navigate(['/dashboard', '']);
      },
      error => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Falha ao entrar', detail: 'Usuário ou senha inválidos.', key: 'main'});
      }
    )
  }
}
