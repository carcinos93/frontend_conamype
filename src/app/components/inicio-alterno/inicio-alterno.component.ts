import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-alterno',
  templateUrl: './inicio-alterno.component.html',
  styles: [
  ]
})
export class InicioAlternoComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  redirect() { 
    this.route.navigate(['recepcion']);
  }
}
