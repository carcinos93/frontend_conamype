import { trigger, state, stagger, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evento } from 'src/app/models/evento.model';
import { ConamypeService } from 'src/app/services/conamype.service';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styles: [ 'h2 { font-family: "Lato"; color: #04235b; } ',
  ' .marco {  border: 1.5rem solid #232323 !important; }'
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        height: '0px',
        width: '0px',
        opacity: 0.5
      })),
      state('out', style({
        height: '100%',
        width: '100%',
        opacity: 1
      })),
      state('altoMax', style({
        'height': '100%'
      })),
      state('altoMin', style({
        'height': '*'
      })),
      transition('* <=> *', animate('2.5s ease-in-out'))
    ])
  ]
})
export class EventosComponent implements OnInit {
  @Input() tipo: 'RUEDA' | 'ANFITEATRO';
  @Input() url: string;
  constructor(private conamypeService: ConamypeService, private router: Router, public appConfig: AppConfig) { }
  animacion_estado = 'in';
  animacion_contenedor = 'altoMin';
  ngOnInit(): void {
  }
  eventos: Evento[] = [];
  eventoSeleccionado:  Evento = {} as Evento;
  canvasCargado(unityInstance) {
    unityInstance.SendMessage('Codigo','ImagenDb', this.url);
  }
  fechaFin: Date = new Date();
  eventoClick(event) { 

    this.conamypeService.eventos( this.tipo ).subscribe((data) => {
      this.eventos = data;
        $("#eventos").removeClass('hidden');
        $("canvas").addClass("blur");
    });
  }
  mostrarInformacion(evento: Evento) {
    this.eventoSeleccionado = evento;
    $("#infoEventoModal")['modal']();
  }

  get titulo() {
    return this.tipo == 'RUEDA' ? 'Nombre Rueda de negocios' : 'Nombre evento';
  }

  get titulo_tabla() {
     return this.tipo == 'RUEDA' ? 'RUEDA DE NEGOCIOS' : 'CONFERENCIAS';
  }

  animacionContenedor(event) {
    if ( this.animacion_contenedor == 'altoMax') {
      this.animacion_estado = 'out';

    } else {
      this.animacion_estado = 'in';
    }
  }

  animacionVideo(event) {
    if (this.animacion_estado == 'in'){
      $("#contenido-anfiteatro").removeClass('fadeOut');
      $("#contenido-anfiteatro").removeClass('d-none');
      $("#contenido-anfiteatro").addClass('animated fadeIn');
      $("#video-contenedor").html("");
    }
  }
  mostrarEvento(evento: Evento) {

    if ( !this.SringisEmpty( evento.Vinculo_Video ) ) {
     let html = `<iframe style="width:100%;height:100%" src="${evento.Vinculo_Video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      /*$(".videoModal .modal-body").html( html );
      $(".videoModal")['modal']();*/
      $("#contenido-anfiteatro").removeClass('fadeIn');
      $("#contenido-anfiteatro").addClass('animated fadeOut');
      $("#video-contenedor").html(html);
      setTimeout(()=> {
        this.animacion_contenedor = 'altoMax'
        $("#contenido-anfiteatro").addClass('d-none');
      }, 1500);

    } else {

       window.open( evento.Vinculo_Inscripcion, '_BLANK');
    }
  }
  SringisEmpty(str) {
    if (str == null || str == undefined)
    {
      return true;
    }

    str=str.trim();
    return  (0 === str.length );
  }
  RegresarEventos() {

    this.animacion_contenedor = 'altoMin';
   
  }

  bntAnterior(event) {
    this.router.navigate(['/recepcion']);
  }

  cerrar() {
    $("#eventos").addClass('hidden');
    $("canvas").removeClass("blur");
  }



}
