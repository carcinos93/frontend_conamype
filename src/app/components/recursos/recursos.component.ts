import { Component, Input, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/recurso.model';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styles: [
  ]
})
export class RecursosComponent implements OnInit {
  @Input() recursos: Recurso[] = [];
  @Input() IdRecurso: string;
  tipoRecurso = new TipoRecurso();
  constructor() { }
  
  ngOnInit(): void {
  }



}

export class TipoRecurso {
  PRODUCTOS_SERVICIOS: string = '2';
  VIDEOS: string = '3';
  DOCUMENTOS: string = '4';
  VINCULOS_INTERES: string = '5';
  BANNERS: string = '10';
  AFICHES: string = '11';
}
