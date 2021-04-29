
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookService, InitParams } from 'ngx-facebook';
import { AppConfig } from 'src/app/services/app-config.service';
import { ConamypeService } from 'src/app/services/conamype.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-stand',
  templateUrl: './stand.component.html',
  styles: [ 
    ':host { display: block;}' ,
    ' p, .icono-sort { font-family: "Fira Sans"; color: #233971 } ',
    '.modal-recurso img  { width: 75% }', 
   ' @media (max-width:1440px){ .modal-recurso img { width:50% }  }',
   ' #edit-modal .modal-content { background-color:none;} ',
   ' .fondo { background-color:none;background-image: url("./assets/img/fondo blanco.png"); background-size:cover; } ',
   '#fb-root { visibility: visible }'
  ]
})
export class StandComponent implements OnInit, OnDestroy {
  @ViewChild(CanvasComponent) canvas: CanvasComponent;
  constructor(private session: LocalStorageService,private conamypeService: ConamypeService, private route: ActivatedRoute, private router: Router,
    private appConfig: AppConfig, private fbService: FacebookService) { }

  stand = { data: [], redes: [], perfil: [], valor2: { FanPage: "" } };
  idPabellon;
  parametros = '';
  idFeria;
  dataVentana: any = {};
  videoHabilitado: boolean = false;
  urlVideo: string = "";
  ngOnInit(): void {

     this.cargarDatos();
  }
private facebookInit(): void {
  const initParams: InitParams = { xfbml: true,
    version: 'v10.0' };
    this.fbService.init( initParams );
    $("#fb-root").html("");
}
ngOnDestroy(): void {
  $("#fb-root").html("");
}
  cargarDatos() {
    let idParticipante =this.route.snapshot.paramMap.get('idParticipante');
    let idPabellon =this.route.snapshot.paramMap.get('idPabellon');
    let idStand =this.route.snapshot.paramMap.get('idStand');
    this.idFeria = this.route.snapshot.paramMap.get('idFeria');
    this.idPabellon = idPabellon;
    this.conamypeService.stand( idParticipante, idPabellon, idStand ).subscribe((data: any) => {
      this.stand = data;

      let estandObjeto = this.appConfig.servicios.estand;
      $("#chat").html(`<div class="fb-customerchat" attribution="setup_tool" page_id="${data.valor2.FanPage}"></div>`);
      this.facebookInit();
      estandObjeto['parametros'] = `?IdEstand=${data.valor2.IdEstand}`;
      if (data.valor2 != null) {
         this.urlVideo = data.valor2.URL_Video;
         this.canvas.cargarUnity(data.valor2.Objeto3D, { objeto: 'Codigo', funcionNombre: 'ImagenDB', parametros: JSON.stringify(estandObjeto)
          });
      }
    });
  }
  clickPantalla(escena: string) {
    /*if ( escena.indexOf("Pantalla") < 0 ) {
        this.cargarDatos();
    }*/
    this.videoHabilitado = (escena.indexOf("Pantalla") >= 0 );
}

cerrarVideo(): void {
  this.videoHabilitado = false;
}

  mostrarVentana(idHTML: string,data: any) {
    if (data.IdRecurso == "12") {
      /*var empresa = this.stand.perfil[0].Nombre_Participante;
      var usuario = this.session.getCurrentUsername();
      /*if (usuario.indexOf("@") >=  0) {
        usuario = usuario.slice(0, usuario.indexOf("@"));

      }*/

      /*var url = this.appConfig.urlChat().replace('{fanpage}', this.stand.valor2.FanPage);
      if (url != null) {
        var features = 'resizable= yes, status= no, scroll= no, help= no, center= yes,width=800,height=800,menubar=no,directories=no,location=no,modal=yes';
        window.open(url, 'chat', features);
      } else {
        alert('Chat no disponible');
      }*/
    } else {
      this.dataVentana = data;
      $( `#${idHTML}`)['modal']();
     /* $("#modalBody").html( $( `#${idHTML}`).html()  );
      $("#edit-modal .modal-title").html( data.Nombre_Recurso );
      $("#modal-imagen").attr("src",  data.Logo );
      $("#edit-modal")['modal']();*/
    }
 
  }

  canvasCargado(unityInstance) {

  }

  bntAnterior(event) {
    this.router.navigate(['/pabellones/pabellon', this.idPabellon, this.idFeria]);
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

}
