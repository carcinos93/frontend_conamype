import { Component, OnInit } from '@angular/core';
import { ConamypeService } from 'src/app/services/conamype.service';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styles: [
  ]
})
export class QuienesSomosComponent implements OnInit {
  contenido: string = "";
  constructor(public appConfig: AppConfig, private conamypeService: ConamypeService,) { }


  ngOnInit(): void {
      this.conamypeService.template( "quienes-somos" ).subscribe((data: string) => {
            this.contenido = data;
      });
  }

}
