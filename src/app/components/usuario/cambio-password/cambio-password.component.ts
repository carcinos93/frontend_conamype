import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConamypeService } from '../../../services/conamype.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styles: [':host { display: block;}' 
  ]
})
export class CambioPasswordComponent implements OnInit {
  formulario: FormGroup;
  constructor(private conamypeService: ConamypeService, private router: Router) { 
    this.formulario = new FormGroup( {
      AnteriorPassword: new FormControl('', Validators.required),
      NuevoPassword: new FormControl('', Validators.required),
      ConfirmarPassword: new FormControl('', [Validators.required ] )
     }, { validators: [ this.validatorPassword(),  this.validatorNuevoAnterior()] });

    //this.formulario.setValidators( [  this.validatorNuevoAnterior, this.validatorNuevoAnterior ] );
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
        this.conamypeService.cambiarPassword( this.formulario.value ).subscribe((data: any) => {
            alert(data.message);
            if (data.success) {
              this.router.navigate(['/recepcion']);
            }
        },  (error) => {
          console.log(error);
          alert("servicio no disponible");
        });
    }
  }
//#region validacion de nuevo password con repetir password



//#endregion
validatorPassword(): ValidatorFn {
  return (f: AbstractControl): ValidationErrors => {
    let control = f.get('ConfirmarPassword');
    let valido = this.validarPassword('NuevoPassword', 'ConfirmarPassword', f);

    if (valido) {
      //control.setErrors(null);
    } else {
      control.setErrors({ noIgual: true  });
    }

    return null;

  };
 }
   validatorNuevoAnterior(): ValidatorFn {
    return (f: AbstractControl): ValidationErrors => {
      let control = f.get('NuevoPassword');
      let valido = this.validarNuevoAnterior('NuevoPassword', 'AnteriorPassword', f)
      if (valido) {
        //pass2Control.setErrors(null);
        //control.setErrors(null);
      } else {
        control.setErrors({ igual: true  });
      }
        return null;
    };

   }


  validarNuevoAnterior(_pass1: string, _pass2: string, f: AbstractControl) {
    const pass1 = f.get(_pass1).value;
    const pass2 = f.get(_pass2).value;
    if  (pass1 == "" && pass2 == "") {
      return true;
    } else {
      return (pass1 !== pass2 );
    }
    
  
  }

  validarPassword( _pass1: string, _pass2: string, f: AbstractControl ) {
    const pass1 = f.get(_pass1).value;
    const pass2 = f.get(_pass2).value;
    if (pass1 == "" && pass2 == "")
    {
      return true;
    } else {
      return pass1 == pass2;  
    }
    
  }




  controlValido(nombre: string, tipo: string) {
  
    return (this.formulario.get(nombre).errors == null ? [] : this.formulario.get(nombre).errors)[tipo] && this.formulario.get(nombre).touched;
   }
}
