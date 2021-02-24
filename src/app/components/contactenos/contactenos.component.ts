import { Component, OnInit } from '@angular/core';
import { ConamypeService } from '../../services/conamype.service';
import { AppConfig } from '../../services/app-config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styles: [':host { display: block;}' 
  ]
})
export class ContactenosComponent implements OnInit {
  formulario: FormGroup;
  constructor(private conamypeService: ConamypeService, public appConfig: AppConfig) {
    this.formulario = new FormGroup( {
      Nombre: new FormControl('', Validators.required),
      Correo: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]),
      tipoMensaje: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    } );



   }
  enviar() {
    if (this.formulario.invalid) {
      Object.values( this.formulario.controls ).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(subcontrol => subcontrol.markAsTouched());
        } else {
        control.markAsTouched();
        }
      });
    } else {
    }
  }
  contenido: string = "";
  ngOnInit(): void {
      this.conamypeService.template( "contactenos" ).subscribe((data: string) => {
            this.contenido = data;
      });
  }

  controlValido(nombre: string) {
    return this.formulario.get(nombre).invalid && this.formulario.get(nombre).touched;
   }

}
