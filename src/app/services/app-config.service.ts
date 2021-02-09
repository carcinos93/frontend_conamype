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

  public habilitarSonido(): boolean {
    return this.config.habilitarSonido;
  }

  get redes() {
    return this.config.redes;
  }

  get servicios() {
    return this.config.servicios;
  }
  get unityObjeto() {
    return this.config.unityObjetos;
  }
  public urlChat(): string {
    return this.config.urlChat;
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
  urlChat: string,
  habilitarSonido: boolean,
  redes: { 
    facebook: string,
    twitter: string,
    whatapp: string,
    instagram: string
   }
   unityObjetos: {
    pabellon: string,
    recepcion: string,
    anfiteatro: string,
    ruedaNegocios: string,
    fachada: string
   },
   servicios: { 
    base: string,
    ruedaNegocios: string,
    anfiteatro: string,
    pabellon: string,
    recepcion: string
   }
}
