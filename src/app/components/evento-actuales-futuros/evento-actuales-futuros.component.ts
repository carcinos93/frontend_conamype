import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ConamypeService } from '../../services/conamype.service';

@Component({
  selector: 'app-evento-actuales-futuros',
  templateUrl: './evento-actuales-futuros.component.html',
  styles: [' :host { display:block } ', '.carousel-caption p  { font-size: 0.85rem !important }']
})
export class EventoActualesFuturosComponent implements OnInit {

  constructor(private conamypeService: ConamypeService) { }
  eventos: any[] = [];
  ngOnInit(): void {
    this.conamypeService.eventosFeriasRuedaAnfiteatro().subscribe((data: any) => {
        this.eventos = data;
    }, (err) => {}, () => {
      setTimeout(function () {
        $('#eventos')['carousel']('cycle');
      }, 1500);
    } );
  }
  
  fechaTexto(evento)
  {
    var d1 = evento.Fecha_Inicio;
    var d2 = evento.Fecha_Fin;
    var fecha1 = new Date( d1 );
    var fecha2 = new Date( d2 );

    if ( formatDate(d1, "ddMMyyyy", "es-ES") === formatDate(d2, "ddMMyyyy", "es-ES") ) {
      return ` ${ fecha1.getDate() } ${ formatDate(d1, "MMMM", "es-ES").toLowerCase() } `;
  } else if ( formatDate(d1, "MMyyyy", "es-ES") === formatDate(d2, "MMyyyy", "es-ES") ) {
        return ` ${ fecha1.getDate() } al ${ fecha2.getDate() } ${ formatDate(d1, "MMMM", "es-ES").toLowerCase() } `;
    } else {
      return ` ${ fecha1.getDate() } ${ formatDate(d1, "MMMM", "es-ES").toLowerCase() } al  ${ fecha2.getDate() } ${ formatDate(d2, "MMMM", "es-ES").toLowerCase() }  `;
    }

  }



}


