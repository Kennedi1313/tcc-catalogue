import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {
  tag: any;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.tag = params);
    const token = this.route.snapshot.params;
    console.log({1:this.tag, 2:token})
  }
}
