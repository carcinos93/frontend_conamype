import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  private config: Config = null;
  constructor(private http: HttpClient) { 
  }
  public pabellonRegistrosPorPagina(): string {
    return this.config.pabellon.registrosPorPagina;   
  }

  public participanteRegistrosPorPagina(): string {
    return this.config.participante.registrosPorPagina;   
  }

  get habilitarSonido(): boolean {
    return this.config.habilitarSonido;
  }

  get recaptchaKey() {
    return this.config.recaptchaKey;
  }

  get redes() {
    return this.config.redes;
  }

  get enlaces() {
    return this.config.enlaces;
  }
  get servicios() {
    return this.config.servicios;
  }
  get unityObjeto() {
    return this.config.unityObjetos;
  }
  public urlChat(): string {
    return this.config.urlChat.facebook;
  }

  get fecha() {
    return new Date();
  }

  get extensionObjeto() {
    return this.config.extensionObjeto;
  }
  get videoPlayer() {
    return this.config.videoPlayer;
  }
  public loadAppConfig(): any {
    const envFile = environment.production ? 'prod' : 'dev';
    var f = new Date().toISOString();
    return this.http.get(`./assets/config/config-${envFile}.json?v${f}`)
    .toPromise()
    .then( (data: Config) => { 
      this.config = data;

    });

  }

  
}

export interface Config
{
  pabellon: {
    registrosPorPagina: string
  },
  participante: { 
    registrosPorPagina: string
  }
  urlChat: {
    facebook: string
  },
  habilitarSonido: boolean,
  redes: { 
    facebook: string,
    twitter: string,
    whatapp: string,
    instagram: string
   }
   extensionObjeto: string,
   unityObjetos: {
    pabellon: string,
    recepcion: string,
    anfiteatro: string,
    ruedaNegocios: string,
    fachada: string
   },
   enlaces: {
     servicios: string
   }
   servicios: { 
    base: string,
    ruedaNegocios: string,
    anfiteatro: string,
    pabellon: string,
    recepcion: string,
    fachada: string
    estand: object
   },
   recaptchaKey: string,
   videoPlayer: videoTipo[]
}

export interface videoTipo {
  embedMask: string,
  videoEmbed: string,
  siteMask: string
}