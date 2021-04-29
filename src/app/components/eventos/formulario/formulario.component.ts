import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Directorio } from 'src/app/models/directorio.model';
import { ConamypeService } from '../../../services/conamype.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  enviarHabilitado: boolean = true;
  htmlVistaPrevia: string = "";
  esVistaPrevia: boolean = false;
  @Output() afterEnviar = new EventEmitter();
  @Input() data: { correoContacto: string, nombreContacto: string };
  constructor(private conamypeService: ConamypeService) { 

    this.formulario = new FormGroup({
      fecha1: new FormControl('', Validators.required),
      fecha2: new FormControl(''),
      telefono: new FormControl('', Validators.required),
      comentario: new FormControl('')
    });

  }

  
  enviarCorreo() {
    this.enviarHabilitado = false;
    let datos = this.datosFormulario();
    this.conamypeService.contactoEmpresa(  datos  ).subscribe((data: any) => {
      alert(data.message);
    }, (err: any) => {
      this.enviarHabilitado = true;
      alert("Servicio no disponible");
      this.afterEnviar.emit({ "error" : true, "message" : err  });
    }, () => {
      this.enviarHabilitado = true; 
      this.afterEnviar.emit({ "error" : false, "message" : "ok"  });
    } );
  }

  vistaPrevia() {
    console.log(this.data);
    this.enviarHabilitado = false;
  
    if (this.formulario.invalid) {
      Object.values( this.formulario.controls ).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(subcontrol => subcontrol.markAsTouched());
        } else {
        control.markAsTouched();
        }
      });
      this.enviarHabilitado = true;
    } else {
        let datos = this.datosFormulario();
        this.conamypeService.vistaPreviaCorreoEmpresa(  datos  ).subscribe((data: any) => {
            if (data.message == "ok") {

                  this.htmlVistaPrevia = data.htmlContent;
            } else {
              alert(data.message);
            }
          
        }, (err: any) => {
          this.enviarHabilitado = true;
          alert("Servicio no disponible");
        }, () => {
          this.enviarHabilitado = true;
          this.esVistaPrevia = true;
        } );
    }
  }

  datosFormulario() {
    let objeto = new Object();
    objeto['comentario'] = this.formulario.value.comentario;
    objeto['fecha1'] =  this.fecha(this.formulario.value.fecha1);

    if (this.data) {
      objeto['empresaCorreo'] = this.data.correoContacto;
      objeto['empresa'] = this.data.nombreContacto;
    } 
    objeto['telefono'] = this.formulario.value.telefono;
    objeto['fecha2'] =  this.fecha(this.formulario.value.fecha2);
    
  
    return objeto;
  }

  fecha(value: Date) {
    if (value) {
      var date = value;
      var userTimezoneOffset = date.getTimezoneOffset() * 60000;
       return new Date(date.getTime() - userTimezoneOffset);
    }

    return null;

  }
  ngOnInit(): void {
  }

  controlValido(nombre: string) {
    return this.formulario.get(nombre).invalid && this.formulario.get(nombre).touched;
   }

}
