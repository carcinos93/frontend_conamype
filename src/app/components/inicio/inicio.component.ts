import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../services/app-config.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})
export class InicioComponent implements OnInit {

  constructor(private route: Router, public appConfig: AppConfig) { }

  ngOnInit(): void {
  }
  redirect() { 
    this.route.navigate(['recepcion']);
  }

  canvasCargado(unityInstance) {
    unityInstance.SendMessage('Codigo','ImagenDb', this.appConfig.servicios.fachada);
    let tiempo = this.appConfig.transaccion.inicio * 1000;
    $("#btnEntrar").removeClass('hidden');
    setTimeout( ()=> {
      this.redirect();
    },  tiempo);
  }


}
