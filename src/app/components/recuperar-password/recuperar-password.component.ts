import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConamypeService } from '../../services/conamype.service';
@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styles: [':host { display: block;}' 
  ]
})
export class RecuperarPasswordComponent implements OnInit {
  formulario: FormGroup;
  @ViewChild('btnEnviar') btnEnviar: ElementRef;
  constructor(private conamypeService: ConamypeService, private router: Router) { 
    this.formulario = new FormGroup( {
      CorreoVisitante: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required])
    } );

  }

  ngOnInit(): void {
  }

  registro() {
    this.btnEnviar.nativeElement.disabled = true;
    if (this.formulario.invalid) {
      Object.values( this.formulario.controls ).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(subcontrol => subcontrol.markAsTouched());
        } else {
        control.markAsTouched();
        }
      });
      this.btnEnviar.nativeElement.disabled = false;
    } else {

        this.conamypeService.recuperarPassword( this.formulario.value ).subscribe((data: any) => {
            alert(data.mensaje);
            this.btnEnviar.nativeElement.disabled = false;
            if (data.enviado) {
              this.router.navigate(['/recepcion']);
            }
        }, (error: any) => {
          this.btnEnviar.nativeElement.disabled = false;
          alert('servicio no disponible');
        });
    }

  }
  controlValido(nombre: string) {
    return this.formulario.get(nombre).invalid && this.formulario.get(nombre).touched;
   }

  
}
