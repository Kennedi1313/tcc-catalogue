import { ActivatedRoute } from '@angular/router';
import { LojaService } from '../../../services/loja/loja.service';
import { Component, OnInit } from '@angular/core';
import Loja from '../../../models/loja'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loja: Loja;
  tag: any;

  constructor(private lojaService: LojaService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => this.tag = params['loja']);
    this.tag = this.activeRoute.snapshot.params.loja;
  }

  ngOnInit(): void {

    console.log(this.tag)
    this.lojaService.getLojaByTag(this.tag).then(loja => this.loja = loja).then((result) => {
      console.log(this.loja);
    });
  }

}
