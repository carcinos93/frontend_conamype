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
  }

 
  bienvenidoClick() {
    this.router.navigate(['/inicio']);

  }
}
