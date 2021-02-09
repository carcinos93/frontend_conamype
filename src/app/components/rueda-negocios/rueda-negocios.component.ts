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

  eventoClick(event) {
    this.conamypeService.eventosRuedaNegocios( "'2020-01-01'", "'2021-01-31'" ).subscribe((data) => {
      console.log(data);  
      this.eventos = data;
        $("#eventos").removeClass('hidden');
    });
  }
  
  mostrarInformacion(evento: Evento) {
    this.eventoSeleccionado = evento;
    $("#infoEventoModal")['modal']();
  }
  mostrarVentanaVideo(vinculo: string) {
      let html = `<iframe style="width:100%;height:100%" src="${vinculo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      $("#videoModal .modal-body").html( html );
      $("#videoModal .modal-title").html( "Video" );
      $("#videoModal")['modal']();
    
  }
  bntAnterior(event) {
    this.route.navigate(['/recepcion']);
  }

}
