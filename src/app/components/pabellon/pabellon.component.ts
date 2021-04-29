import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConamypeService } from 'src/app/services/conamype.service';
import { Location } from '@angular/common';
import { AppConfig } from '../../services/app-config.service';
@Component({
  selector: 'app-pabellon',
  templateUrl: './pabellon.component.html',
  styles: [ '.pabellon-contenedor {  position: absolute; top : 0%; left: 0; right: 0  }', ':host { display: block;}' 
  ],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional:true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(300, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PabellonComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private conamypeService: ConamypeService, private location: Location
    , public appConfig: AppConfig) { }
  pabellones = [];
  participantes = [];
  pabellonesActivo = true;
  participantesActivo = false;
  selectedPabellon: string;
  selectedFeria: string;
  paginaPabellon: number = 1;
  paginaParticipante: number = 1;
  pabellonTotalPaginas: number = 1;
  participanteTotalPaginas: number = 1;
  cargando: boolean = true;
  ngOnInit(): void {
    this.selectedFeria = this.activatedRoute.snapshot.paramMap.get('idFeria');
    //this.canvasCargado(null);
      /*this.conamypeService.stand('1','1').subscribe( (e) => {
        console.log(e);
      } )*/
  }
  seleccionarFeria_Pabellones(idferia) {
    this.cargando = true;
    this.pabellones = [];
    this.conamypeService.pabellones(idferia, this.paginaPabellon.toString()).subscribe((e: any) => {
      this.pabellonesActivo = true;
      this.participantesActivo = false;
      setTimeout(() => {
        $("#participantesContenedor").addClass('hidden');
          this.pabellones = e.data ?? [];
          this.pabellonTotalPaginas = e.total_paginas ?? 1;
          this.cargando = false;
      }, 4500);
      });
  }
  seleccionarPabellon_Participantes(idpabellon) {
      this.cargando = true;
      this.participantes = [];
      this.conamypeService.participantes( idpabellon ).subscribe((e: any) => {
      this.selectedPabellon = idpabellon;  
      this.pabellonesActivo = false;
      this.participantesActivo = true;
 
      setTimeout(() => {
        $("#participantesContenedor").removeClass('hidden');
        this.participantes = e.data ?? [];
        this.participanteTotalPaginas = e.total_paginas ?? 1;
        this.cargando = false;
        }, 1500);

    });
  }

  canvasCargado(instance) {
    instance.SendMessage('Codigo','ImagenDb', this.appConfig.servicios.pabellon);
    instance.SendMessage('Codigo','FocusCanvas', '0');
    let idPabellon = this.activatedRoute.snapshot.paramMap.get('idPabellon');
    let idFeria = this.activatedRoute.snapshot.paramMap.get('idFeria');
    this.cargando = false;
    if (idPabellon != null) {
        this.seleccionarPabellon_Participantes( idPabellon );
    } else {
        this.seleccionarFeria_Pabellones( idFeria );
    }
  }

  bntAnterior(event) {
    let idFeria = this.activatedRoute.snapshot.paramMap.get('idFeria');
    //let idPabellon = this.activatedRoute.snapshot.paramMap.get('idPabellon') ?? this.selectedPabellon;
    if (this.participantesActivo ) {
      this.seleccionarFeria_Pabellones( idFeria );
    } else {
      this.route.navigate(['/recepcion']);
    }
  }

  onPaginaPabellon( pagina ) {
    this.paginaPabellon = pagina;
    this.conamypeService.pabellones(this.selectedFeria, pagina).subscribe((e: any) => {
      this.pabellones = [];
      setTimeout( () => {
        this.pabellones = e.data;  
      }, 1000 );

     // this.paginaPabellon = Number(pagina);
    });
  }
  
  buscarPabellon( termino: string ) {
    this.onPaginaParticipante( "1", termino );
  }
  onPaginaParticipante( pagina, termino: string = "" ) {
    this.paginaParticipante = pagina;
    this.conamypeService.participantes(this.selectedPabellon, pagina, termino).subscribe((e: any) => {
      this.participantes = [];
      setTimeout( () => {
        this.participantes = e.data;  
      }, 1000 );

     // this.paginaPabellon = Number(pagina);
    });
  }
}
