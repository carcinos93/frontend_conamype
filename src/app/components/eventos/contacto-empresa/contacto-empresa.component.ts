import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Directorio } from 'src/app/models/directorio.model';
import { ConamypeService } from '../../../services/conamype.service';

@Component({
  selector: 'app-contacto-empresa',
  templateUrl: './contacto-empresa.component.html',
  styles: [
  ]
})
export class ContactoEmpresaComponent implements OnInit {
  empresas: Directorio[] = [];
  empresa: Directorio = {} as Directorio;
  cargando: boolean = true;

 
  datosEmpresa: { correoContacto: string, nombreContacto: string };
  selectedStep: number = 0;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  constructor(public dialogRef: MatDialogRef<ContactoEmpresaComponent>, private conamypeService: ConamypeService, @Inject(MAT_DIALOG_DATA) public data: {correoContacto: string, nombreContacto: string}) { 
   
    if (this.data) {
      this.selectedStep = 1;
    }
    this.conamypeService.empresas().subscribe((data: Directorio[]) => {
         this.empresas = data ?? [];
        this.cargando = false;
   
    });
  }
  log(value: any) {
    console.log(value);
  }
  seleccionarEmpresa(empresa: Directorio) {
    this.empresa = empresa;
    this.datosEmpresa = { correoContacto: empresa.Correo_Electronico, nombreContacto: empresa.Nombre_Participante };
    this.stepper.next();
  }
  closeDialog() {
    this.empresa = {} as Directorio;
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


  afterEnviar(data) {
    if (!data.error) {
      this.closeDialog();
    }
  }

 

  cambio(event: StepperSelectionEvent, stepper: MatHorizontalStepper) {
    if (event.selectedIndex == 1 && Object.keys(this.empresa).length == 0 ) {

    } 
  }



}
