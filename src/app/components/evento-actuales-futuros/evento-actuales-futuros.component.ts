import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConamypeService } from '../../services/conamype.service';

@Component({
  selector: 'app-evento-actuales-futuros',
  templateUrl: './evento-actuales-futuros.component.html',
  styles: [
  ]
})
export class EventoActualesFuturosComponent implements OnInit {

  constructor(private conamypeService: ConamypeService) { }
  eventos: any[] = [];
  ngOnInit(): void {
    this.conamypeService.eventosFeriasRuedaAnfiteatro().subscribe((data: any) => {
        this.eventos = data;
    });
  }

  fechaTexto(evento)
  {
    var d1 = evento.Fecha_Inicio;
    var d2 = evento.Fecha_Fin;
    var fecha1 = new Date( d1 );
    var fecha2 = new Date( d2 );

    if ( formatDate(d1, "ddMMyyyy", "es-ES") === formatDate(d2, "ddMMyyyy", "es-ES") ) {
      return ` ${ fecha1.getDate() + 1 } ${ formatDate(d1, "MMMM", "es-ES").toUpperCase() } `;
  } else if ( formatDate(d1, "MMyyyy", "es-ES") === formatDate(d2, "MMyyyy", "es-ES") ) {
    console.log( evento.Nombre ,formatDate(d1, "ddMMyyyy", "es-ES"),formatDate(d2, "ddMMyyyy", "es-ES")  )
        return ` ${ fecha1.getDate() } AL ${ fecha2.getDate()+ 1 } ${ formatDate(d1, "MMMM", "es-ES").toUpperCase() } `;
    } else {
      return ` ${ fecha1.getDate() + 1 } ${ formatDate(d1, "MMMM", "es-ES").toUpperCase() } AL  ${ fecha2.getDate() + 1 } ${ formatDate(d2, "MMMM", "es-ES").toUpperCase() }  `;
    }

  }



}
