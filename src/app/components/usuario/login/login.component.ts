import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConamypeService } from 'src/app/services/conamype.service';
import { AppConfig } from 'src/app/services/app-config.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  //$: any;
  @ViewChild('recordarme') recordarme: ElementRef;
  @ViewChild('recaptcha') recaptcha: ReCaptchaV2.ReCaptcha;
  @Input() top = "5%";
  @Input() right = "10%";
  @Input() timeShow = 3;
  @Output() afterLogin = new EventEmitter();
  idTimeout: any;
  loginForm: FormGroup;
  passwordModificado: boolean = false;

  constructor( public lsService: LocalStorageService, private conamypeService: ConamypeService, public appConfig: AppConfig ) {
    this.loginForm = new FormGroup({
      correoVisitante: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      recaptcha: new FormControl('', Validators.required)
    });
  }
  ngAfterViewChecked(): void {
    //this.ajustarCaptcha();
  }
  cambioPassword(event: any) {
    this.passwordModificado = true;
  }
  ngOnInit(): void {
    this.idTimeout = setTimeout( () => {
       $("#login").removeClass('hidden').addClass("animated fadeIn");
        let dataUser = this.lsService.getUserData();
        //this.ajustarCaptcha();
        if (dataUser != null) {
          if (!$("#login").hasClass('hidden')) {
            if (this.recordarme !=  undefined) {
              this.recordarme.nativeElement.checked = dataUser.recordar;
            }
            this.loginForm.controls['correoVisitante'].setValue( dataUser.username );
            this.loginForm.controls['password'].setValue( dataUser.token.substring(0, 8) );
            
          }
        }
      this.passwordModificado = false;
    }, this.timeShow * 1000 );

  }

  ajustarCaptcha() {
    var formularioWidth = $("#formulario .card-body").width();
    let recaptcha = $("re-captcha > div");
    var width = recaptcha.width();
    var scale;
    if (width < 302) {
      scale = width / 302;
    } else{
      scale = 1.0; 
    }
  console.log(scale);
    recaptcha.css({ 
      'transform': `scale (${scale})`,
      '-webkit-transform' :  `scale (${scale})`,
      'transform-origin' : '0 0',
      '-webkit-transform-origin' : '0 0'
    });

  }

  forzarLoginVentana() {
    if (this.idTimeout != null) {
      clearInterval( this.idTimeout );
      this.idTimeout = null;
      $("#login").removeClass('hidden').addClass("animated fadeIn");
    }
  }
  clearForm() {
    this.loginForm.controls['correoVisitante'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      Object.values( this.loginForm.controls ).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach(subcontrol => subcontrol.markAsTouched());
        } else {
        control.markAsTouched();
        }
      });
    } else {
      var correo = this.loginForm.controls['correoVisitante'].value;
      var password = this.loginForm.controls['password'].value;
      var recaptcha = this.loginForm.controls['recaptcha'].value;
      console.log(this.passwordModificado);
       this.conamypeService.login( correo, password,recaptcha, this.recordarme.nativeElement.checked, this.passwordModificado  ).subscribe((data: any) => {
         if (!data.success) {
           alert(data.message);
           this.recaptcha.reset();
         } else {
           this.afterLogin.emit();
         }
         let dataUser = this.lsService.getUserData();
         if (dataUser == null) {
            this.loginForm.controls['correoVisitante'].setValue( "" );
            this.loginForm.controls['password'].setValue( "" );
         }

       });
    } 

  
  }

  resolved(captchaResponse: string, res) {
   
  }

  controlValido(nombre: string) {
    return this.loginForm.get(nombre).invalid && this.loginForm.get(nombre).touched;
   }
}
