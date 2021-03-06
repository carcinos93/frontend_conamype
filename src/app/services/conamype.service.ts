import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Directorio } from '../models/directorio.model';
import { Evento } from '../models/evento.model';
import { AppConfig } from './app-config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConamypeService {

  urlService:string;
  isAuthenticate = false;
  constructor(private http: HttpClient, private lrService: LocalStorageService, private appConfig: AppConfig) { 
    this.urlService = this.appConfig.servicios.base;
  }



  template( nombre: string ) {
    var headers = new HttpHeaders().append('Content-Type', 'text/html');
    return this.http.get( `./assets/templates/${nombre}.template.html`, { 
      headers: headers,
      responseType: 'text'
    });
  }

  ferias() {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.get( `${ this.urlService }ferias`, { 
      headers: headers, params: { 'IdFeriasEventos' : '1' }
    } );/*.pipe( map( (data: any[]) => {
        let copy = data;
        data.forEach( (v, i) => {
            copy.push( v );
        } );
       return copy;
    } ) );*/
  }


  eventosFeriasRuedaAnfiteatro() {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.get( `${ this.urlService }eventosFeriasRuedaAnfiteatro`, { 
      headers: headers
    });
  }

  directorio() {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.get<Directorio[]>( `${ this.urlService }directorio`, { 
      headers: headers
    });
  }

  empresas() {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.get<Directorio[]>( `${ this.urlService }empresas`, { 
      headers: headers
    });
  }



  pabellones(idferia: string, pagina: string = null) {

    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    var registros_pagina = this.appConfig.pabellonRegistrosPorPagina();
    return this.http.get( `${ this.urlService }pabellones`, { 
      headers: headers, params: { 'IdFeria' : idferia, 'pagina' : pagina, 'registros_pagina' :  registros_pagina }
    } );
  }

  participantes(idPabellon: string, pagina: string = null, termino: string = "") {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    var registros_pagina = this.appConfig.participanteRegistrosPorPagina();
    return this.http.get( `${ this.urlService }participantes`, { 
      headers: headers, params: { 'IdPabellon' : idPabellon, 'registros_pagina' :registros_pagina, 'termino' : termino }
    } );
  }

  eventos(tipo: 'RUEDA' | 'ANFITEATRO') {
      if (tipo == 'ANFITEATRO') {
        return this.eventosAnfiteatro();
      } else if (tipo == 'RUEDA') {
        return this.eventosRuedaNegocios();
      }
  }
  eventosAnfiteatro() {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.get<Evento[]>( `${ this.urlService }eventosAnfiteatro`, { 
      headers: headers
    } );
  }
  eventosRuedaNegocios() {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.get<Evento[]>( `${ this.urlService }eventosRuedaNegocios`, { 
      headers: headers
    } );
  }

  stand(idParticipante: string, idPabellon: string, idStand: string) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    let data = this.http.get(`${ this.urlService }estand/recursos`, { headers: headers, params: { 'IdParticipante' : idParticipante } });
    let data2 = this.http.get(`${ this.urlService }estand/participante`, { headers: headers, params: { 'IdEstand' : idStand } });
    let redes = this.http.get(`${ this.urlService }estand/redesSociales`, { headers: headers, params: { 'IdParticipante' : idParticipante } });
    let perfil = this.http.get(`${ this.urlService }estand/perfilEmpresa`, { headers: headers, params: { 'IdParticipante' : idParticipante } });
    return forkJoin([data, data2, redes, perfil]).pipe(
      map(([data, data2, redes, perfil],index) => {
       let valor2 = data2; /*(data2 as any).filter( e => {
          if (e.IdParticipante == idParticipante)
          {
          
            return e;
          }
        });*/
          if (valor2 == null) {
            valor2= [{}];
          }

        (data as any).map((e) => {
          this.http.get(`${ this.urlService }estand/participanteRecursos`, 
          { headers: headers, params: { 'IdParticipante' : idParticipante ,'IdRecurso' :  e.IdRecurso} }
          ).subscribe( (i) =>
              {
                  e['recursos'] = (i == null ? [] : i) ;
              }
           );
        });
          return { data: data, redes: redes, perfil: perfil, valor2: valor2[0] };
      })
    );
  }

  recuperarPassword( data: any ) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }recuperarPassword` , data , { 
      headers: headers
    } );
  }

  cambiarPassword( data: any ) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }cambiarPassword` , data , { 
      headers: headers
    } );
  }

  registro(data: any) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }registro` , data , { 
      headers: headers
    } );
  }

  contactenos(data: any) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }contactenos` , data , { 
      headers: headers
    } );
  }

  contactoEmpresa(data: any) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }contactoEmpresa` , data , { 
      headers: headers
    } );
  }

  vistaPreviaCorreoEmpresa(data: any) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }previewEmpresaCorreo` , data , { 
      headers: headers
    } );
  }

  login(username: string, password: string, recaptcha: string , recordarme: boolean = false, passwordModificado: boolean = false ) {
  if (!passwordModificado) {
    let userData = this.lrService.getUserData();
  
    if (userData != null) {
      return this.http.post( `${ this.urlService }loginToken`, { 'CorreoVisitante': username ,token: userData.recordarmeToken }, { 
        headers: headers 
      } ).pipe(
        map( (data: any) => {
            if (data.success) {
              userData.token = data.token;
              this.lrService.setCurrentSession(userData , recordarme );
              this.lrService.loadSessionData();
              this.isAuthenticate = true;
            } else {
              this.lrService.deleteUserData();
            }
  
            return data;
        })
      );

    }
  } else {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json');
    return this.http.post( `${ this.urlService }login`, { 'CorreoVisitante' : username, 'Password' : password, 'Recaptcha' : recaptcha, 'Recordarme' :  recordarme }, { 
      headers: headers 
    } ).pipe(
      map( (data: any) => {
          if (data.success) {
            this.lrService.setCurrentSession( { username: username, token: data.token, recordarmeToken: data.recordarmeToken  }, recordarme );
            this.lrService.loadSessionData();
            this.isAuthenticate = true;
          }

          return data;
      })
    );
  }
  
  }

  validarRegistro( token: string ) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json').append('skip','');
    return this.http.post( `${ this.urlService }validarRegistro`, { "token_confirm" : token } , { 
      headers: headers 
    } );

  }

  checkToken(  ) {
    var headers = new HttpHeaders().append('Accept','application/json').append('Content-Type', 'application/json').append('skip','');
    return this.http.get( `${ this.urlService }checkToken`, { 
      headers: headers 
    } );

  }
 private extractData(res: Response) {
  let body = res.json();
    return body;
  }

}
