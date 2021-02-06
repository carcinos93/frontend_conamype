import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Directorio } from 'src/app/models/directorio.model';
import { ConamypeService } from 'src/app/services/conamype.service';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styles: [ "* { color: #223972 }",
  ".titulo {  font-family: 'Lato'; }",
  ".participante {  font-family: 'Fira Sans'; }"
  ]
})
export class DirectorioComponent implements OnInit {
  constructor( private conamypeService: ConamypeService, private route: Router ) { }

  directorioItems: PabellonDirectorio[] = [];
  ngOnInit(): void {
      this.conamypeService.directorio().subscribe((data: Directorio[]) => {
        let temp = {};
        let pabellonDirectorio: PabellonDirectorio[] = [];
        data.forEach( ( v: Directorio, i ) =>  {
            temp[ v.Nombre_Pabellon ] = temp[ v.Nombre_Pabellon ] || [];
            temp[ v.Nombre_Pabellon ].push( { Nombre_Participante: v.Nombre_Participante, 
              Logo_Participante: v.Logo_Participante, Nombre_Contacto: v.Nombre_Contacto, Correo_Electronico: v.Correo_Electronico });
        });

        for (var e in temp) {
            pabellonDirectorio.push( {  NombrePabellon: e, Participantes: temp[e]  } );
        }
        
        this.directorioItems = pabellonDirectorio;

      });
  }

  bntAnterior(event) {
    this.route.navigate(['/recepcion']);
  }

}
export interface PabellonDirectorio {
  NombrePabellon: string,
  Participantes: []
}