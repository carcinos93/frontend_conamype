import { DOCUMENT } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styles: [ 
  ]
})
export class BienvenidoComponent implements OnInit  {

  constructor(private router: Router) { }

  ngOnInit(): void {
    $("body").css({"background-color" : "#63a1d3"});
  }

 
  bienvenidoClick() {

    $("body").css({"background-color" : "white"});
    this.router.navigate(['/inicio']);

  }
}
