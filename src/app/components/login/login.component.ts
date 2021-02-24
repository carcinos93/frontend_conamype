import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ConamypeService } from 'src/app/services/conamype.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  //$: any;
  @ViewChild('recordarme') recordarme: ElementRef;
  @Input() top = "5%";
  @Input() right = "10%";
  @Input() timeShow = 3;
  @Output() afterLogin = new EventEmitter();
  idTimeout: any;
  loginForm: FormGroup;
  constructor( public lsService: LocalStorageService, private conamypeService: ConamypeService ) { 
    this.loginForm = new FormGroup({
      correoVisitante: new FormControl(),
      password: new FormControl()
    });
  }

  
  ngOnInit(): void {
    this.idTimeout = setTimeout( () => {
       $("#login").removeClass('hidden').addClass("animated fadeIn");
        let dataUser = this.lsService.getUserData();
        if (dataUser != null) {
          if (!$("#login").hasClass('hidden')) {
            this.loginForm.controls['correoVisitante'].setValue( dataUser.username );
            this.loginForm.controls['password'].setValue( dataUser.password );
            this.recordarme.nativeElement.checked = dataUser.recordar;
          }
        }
      
    }, this.timeShow * 1000 );

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
     var correo = this.loginForm.controls['correoVisitante'].value;
     var password = this.loginForm.controls['password'].value;
      this.conamypeService.login( correo, password, this.recordarme.nativeElement.checked  ).subscribe((data: any) => {
        if (!data.success) {
          alert(data.message);
        } else {
          this.afterLogin.emit();
        }
      });

  
  }

}
