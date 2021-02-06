import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anfiteatro',
  templateUrl: './anfiteatro.component.html',
  styles: [ 
  ]
})
export class AnfiteatroComponent implements OnInit {
    constructor(private route: Router) {

    }
  ngOnInit(): void {

  }

  
  bntAnterior(event) {
    this.route.navigate(['/recepcion']);
  }
    
 
}
