import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConamypeService } from 'src/app/services/conamype.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginComponent } from '../login/login.component';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styles: [ 
    ':host { display: block;}' ,
    ' p { font-family: "Fira Sans"; color: #233971 } ',
    '.icono-sort { color: #233971 } ',
    '.scrollable { max-height: 548px; overflow-y: auto;} ',
    '@media (max-width:1440px) { .scrollable { max-height: 481px; }}',
    '@media (max-width:1366px) { .scrollable { max-height: 436px; }}',
    '@media (max-width:1024px) { .scrollable { max-height: 315px; }}',
    ' /*#ruedaAnfiteatro { max-width: 10.66%;  } */',
    '/*@media (max-width:1366px) { #ruedaAnfiteatro { top: 34% !important; max-width: 12.66% !important }}*/'
  ]
})
export class RecepcionComponent implements OnInit, AfterViewInit {

  idTimeout: any;
  @ViewChild(LoginComponent) login: LoginComponent;
  constructor(private conamypeService: ConamypeService, private route: Router, public lsService: LocalStorageService,
    public appConfig: AppConfig) { 
 
  }
  ngAfterViewInit(): void {
   // $("#ventana1")["animatedModal"]({animatedIn: 'fadeInUp',top: '50%',animationDuration: '3s', color: "rgba(255, 255, 255, 0.5)" });
  //  $("#ventana2")["animatedModal"]({animatedIn: 'fadeInUp',top: '47%', left: null, right: '0',animationDuration: '3s', color: "rgba(255, 255, 255, 0)" });
  }


  ferias = [];
  ngOnInit(): void {
 
    if (this.lsService.isAuthenticated()) {
      this.conamypeService.ferias().subscribe((res: any) => {
        this.ferias = res;
      });
    }

  }
  canvasCargado(unityInstance) {
    unityInstance.SendMessage('Codigo','ImagenDb', this.appConfig.servicios.recepcion);
  }

  collapse(id: string, idIconoEstado) {
    if ($("#"  +id ).hasClass('show')) {
      $("#"  + idIconoEstado).removeClass("abajo").addClass("arriba");
      $("#"  +id )['collapse']('hide');
    } else {
      $("#"  +id )['collapse']('show');
      $("#"  + idIconoEstado).removeClass("arriba").addClass("abajo");
    }

  }
  canvasClick(event) {
    /*  this.login.forzarLoginVentana();
    if (this.idTimeout != null) {
      clearTimeout( this.idTimeout );
      this.mostrarVentanas();
      this.idTimeout = null;
    }*/

  }
 /*tiempoVentanas() {
    this.idTimeout = setTimeout( () =>  {
        this.mostrarVentanas();
    }, 3000);
  }

  mostrarVentanas() {
    
    $("#ferias").removeClass("hidden");
    $("#ruedaAnfiteatro").removeClass("hidden");

    $("#ventana1").click();
    $("#ventana2").click();
  }*/
  afterLogin() {
      //this.tiempoVentanas();
      this.conamypeService.ferias().subscribe((res: any) => {
        this.ferias = res;
      });
  }

  bntAnterior(event) {
    this.route.navigate(['/inicio']);
  }


}
