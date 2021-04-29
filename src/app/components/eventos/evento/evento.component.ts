import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evento } from 'src/app/models/evento.model';
import { ConamypeService } from 'src/app/services/conamype.service';
import { ContactoOrganizadorComponent } from '../contacto-organizador/contacto-organizador.component';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styles: [
  ]
})
export class EventoComponent implements OnInit {
  eventoSeleccionado:  Evento = {} as Evento;
  tipo: string = "";
  constructor(private conamypeService: ConamypeService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { evento: Evento, tipo: string } ) { 
    this.eventoSeleccionado = this.data.evento;
    this.tipo = this.data.tipo;
  }

  ngOnInit(): void {
 
  }

  abrirFormulario() {

    const dialog = this.dialog.open( ContactoOrganizadorComponent, {
      width: '650px',
      data: {correoContacto:  this.data.evento.Correo_Organizador , nombreContacto: this.data.evento.Contacto_Organizador }
    } );
  }



}
