import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-anfiteatro',
  templateUrl: './anfiteatro.component.html',
  styles: [ 
  ]
})
export class AnfiteatroComponent implements OnInit {
    constructor(private route: Router, public appConfig: AppConfig) {

    }
  ngOnInit(): void {

  }

  
  bntAnterior(event) {
    this.route.navigate(['/recepcion']);
  }
    
 
}
