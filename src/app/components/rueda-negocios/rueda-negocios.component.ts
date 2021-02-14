import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento.model';
import { ConamypeService } from 'src/app/services/conamype.service';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-rueda-negocios',
  templateUrl: './rueda-negocios.component.html',
  styles: [
  ]
})
export class RuedaNegociosComponent implements OnInit {

  constructor(private conamypeService: ConamypeService, private route: Router, public appConfig: AppConfig) { }

  ngOnInit(): void {
  }

  eventos: Evento[] = [];
  eventoSeleccionado:  Evento = {} as Evento;
  canvasCargado(unityInstance) {
 
  }
  bntAnterior(event) {
    this.route.navigate(['/recepcion']);
  }

}
