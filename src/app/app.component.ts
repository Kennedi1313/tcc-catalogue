import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private primengConfig: PrimeNGConfig) {}
  title = 'catalogueme';

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
