import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig } from 'src/app/services/app-config.service';
import { ConamypeService } from 'src/app/services/conamype.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-stand',
  templateUrl: './stand.component.html',
  styles: [ 
    ' p, .icono-sort { font-family: "Fira Sans"; color: #233971 } ',
    '.modal-recurso img  { width: 75% }', 
   ' @media (max-width:1440px){ .modal-recurso img { width:50% }  }',
   ' #edit-modal .modal-content { background-color:none;} ',
   ' .fondo { background-color:none;background-image: url("./assets/img/fondo blanco.png"); background-size:cover; } '
  ]
})
export class StandComponent implements OnInit {
  @ViewChild(CanvasComponent) canvas: CanvasComponent;
  constructor(private session: LocalStorageService,private conamypeService: ConamypeService, private route: ActivatedRoute, private router: Router,
    private appConfig: AppConfig) { }
  stand = { data: [], redes: [], perfil: [], valor2: {} };
  idPabellon;
  parametros = '';
  idFeria;
  dataVentana: any = {};
  ngOnInit(): void {
      let idParticipante =this.route.snapshot.paramMap.get('idParticipante');
      let idPabellon =this.route.snapshot.paramMap.get('idPabellon');
      let idStand =this.route.snapshot.paramMap.get('idStand');
      this.idFeria = this.route.snapshot.paramMap.get('idFeria');
      this.idPabellon = idPabellon;
      this.conamypeService.stand( idParticipante, idPabellon, idStand ).subscribe((data: any) => {
        this.stand = data;

        if (data.valor2 != null) {
           this.canvas.cargarUnity(data.valor2.Objeto3D, { objeto: 'Canvas', funcionNombre: 'ImagenDB', parametros:
           `?IdEstand=${data.valor2.IdEstand}` });
        }
      });
  }
  
  mostrarVentana(idHTML: string,data: any) {
    if (data.IdRecurso == "12") {
      var empresa = this.stand.perfil[0].Nombre_Participante;
      var usuario = this.session.getCurrentUsername();
      if (usuario.indexOf("@") >=  0) {
        usuario = usuario.slice(0, usuario.indexOf("@"));
      }
      var url = this.appConfig.urlChat().replace( "{usuario}", usuario ).replace("{empresa}", empresa);
      var features = 'resizable= yes; status= no; scroll= no; help= no; center= yes;width=400;height=500;menubar=no;directories=no;location=no;modal=yes';
        
      window.open(url, 'chat', features, false);
    } else {
      this.dataVentana = data;
      $("#modalBody").html( $( `#${idHTML}`).html()  );
      $("#edit-modal .modal-title").html( data.Nombre_Recurso );
      $("#modal-imagen").attr("src",  data.Logo );
      $("#edit-modal")['modal']();
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
