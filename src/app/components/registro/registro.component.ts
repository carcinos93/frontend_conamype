import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConamypeService } from 'src/app/services/conamype.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [ 'form small {margin-left: 45px;}' ]
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup;
  constructor(private conamypeService: ConamypeService, private route: Router, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      CorreoVisitante: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required] ],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Password: ['', Validators.required],
      RepetirPassword: ['', Validators.required],
      Genero: ['', Validators.required],
      Edad: ['', Validators.required],
      Empresa: ['', Validators.required]
      }, { validators: this.valdidarPassword( 'Password', 'RepetirPassword' )  } );
   }
  
   valdidarPassword(pass1, pass2) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if (pass2Control.value === pass1Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noIgual: true});
      }
    };
   }

   controlValido(nombre: string) {
    return this.formulario.get(nombre).invalid && this.formulario.get(nombre).touched;
   }
  
  get passValido() {
    const pass1 = this.formulario.get('Password').value;
    const pass2 = this.formulario.get('RepetirPassword').value;
    if (this.formulario.get('RepetirPassword').touched) {
      return (pass1 !== pass2);
    } else {
      return false;
    }
  }

  ngOnInit(): void {
  }

  registro() {
    if (this.formulario.invalid) {
      Object.values( this.formulario.controls ).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(subcontrol => subcontrol.markAsTouched());
        } else {
        control.markAsTouched();
        }
      });
    } else {
      this.conamypeService.registro(this.formulario.value).subscribe((data: any) => {
         if (data.success) {
           alert(data.message);
           this.route.navigate(['/recepcion']);
         } else {
          alert(data.message);
         }
      });
      //this.route.navigate(['/recepcion']);
    }

  }

  bntAnterior(event) {
    this.route.navigate(['/recepcion']);
  }


}
