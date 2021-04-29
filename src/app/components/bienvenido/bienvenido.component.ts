import { DOCUMENT } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styles: [ ':host { display: block; height:100%}' 
  ]
})
export class BienvenidoComponent implements OnInit  {

  constructor(private router: Router, private appConfig: AppConfig) { }
  
  ngOnInit(): void {
    let tiempo = this.appConfig.transaccion.bienvenido * 1000;
    setTimeout(() => {
      this.bienvenidoClick();
    }, tiempo );
  }


   
  bienvenidoClick() {
    this.router.navigate(['/inicio']);

  }
}
