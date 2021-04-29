import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConamypeService } from '../../../services/conamype.service';

@Component({
  selector: 'app-contacto-organizador',
  templateUrl: './contacto-organizador.component.html',
  styles: [
  ]
})
export class ContactoOrganizadorComponent implements OnInit {
  datosEmpresa: { correoContacto: string, nombreContacto: string };
  constructor(public dialogRef: MatDialogRef<ContactoOrganizadorComponent>, private conamypeService: ConamypeService, @Inject(MAT_DIALOG_DATA) public data: {correoContacto: string, nombreContacto: string}) { }

  ngOnInit(): void {
    this.datosEmpresa = this.data;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  afterEnviar(data) {
    if (!data.error) {
      this.closeDialog();
    }
  }


}
