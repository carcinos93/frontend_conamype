import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfig } from '../../services/app-config.service';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.css']

})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy  {
  
  @Input() unityObjeto: string = '';
  @Input() style: string = '';
  @Input() parametros: string = '';
  @Input() autoWidth: boolean = true;
  @Output() thenEvent = new EventEmitter();
  @Output() clickEvent = new EventEmitter();
  @Output() externalCallEvent = new EventEmitter();
  @ViewChild('unityCanvas') myCanvas: ElementRef<HTMLCanvasElement>;
  @Input() visible: boolean = true;
  private _unityInstance: any = null;
  public cargando: boolean = true;
  constructor(private appConfig: AppConfig, private ngZone: NgZone) {
        window["externalCall"] = function () {};
        window["externalCall"] = this.externalCall.bind(this);
   }

   public externalCall(input: string) {
       this.ngZone.run(() => {
            this.externalCallEvent.emit( input );
       });
   }
  
  ngOnDestroy(): void {
    window["externalCall"] = null;
    if (this._unityInstance != null) 
    {
      this._unityInstance.Quit(function() {
        console.log("done!");
      
    });
    }

  }
  ngAfterViewInit(): void {
    if (this.autoWidth) {
      this.myCanvas.nativeElement.className = this.myCanvas.nativeElement.className + " canvas-unity";
    } else {
      this.myCanvas.nativeElement.className = this.myCanvas.nativeElement.className + " w-100";
    }

    /*$(".canvas-unity").height(this.ratio * Number($(".canvas-unity").width()));*/
     this.cargarUnity(this.unityObjeto);

  }

 /* ngOnChanges(changes: SimpleChanges): void {
    if (changes.unityObjeto != null) {
    if (changes.unityObjeto.previousValue != changes.unityObjeto.currentValue && changes.unityObjeto.currentValue != '') {
      this.cargarUnity( changes.unityObjeto.currentValue );
    }
  }

  if (changes.parametros != null) {
    if (changes.parametros.previousValue != changes.parametros.currentValue && changes.parametros.currentValue != '' ) {
      if (this._unityInstance != null) {
        this._unityInstance.SendMessage('Productos', 'ImagenDB', changes.parametros.currentValue  );
      }
  }
  }

    
  }*/
  public setParametros( SendMessageUnity?: { objeto: string, funcionNombre: string, parametros: string }) {
    if (this._unityInstance != null) {
      this._unityInstance.SendMessage(SendMessageUnity.objeto  , SendMessageUnity.funcionNombre,  SendMessageUnity.parametros );
    }
  }
  public cargarUnity(objeto: string, SendMessageUnity?: { objeto: string, funcionNombre: string, parametros: string }) {
    if ( this._unityInstance != null ) {
      this.setParametros( SendMessageUnity );
      return;
    }
    if (objeto != null && objeto != '')
    {
      $("#unityLoader").removeClass('d-none');
       var version = environment.unityVersion;
       var extension = this.appConfig.extensionObjeto == "" ? "" : "." + this.appConfig.extensionObjeto;
      window['createUnityInstance'](this.myCanvas.nativeElement, {
        dataUrl: `./assets/Build/${objeto}.data${extension}?version=${version}`,
        frameworkUrl: `./assets/Build/${objeto}.framework.js${extension}?version=${version}`,
        codeUrl: `./assets/Build/${objeto}.wasm${extension}?version=${version}`,
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "ExpoMype",
        productVersion: "0.1",
      }, (progress) => {    
        if (progress == 1) {
            this.cargando = false;
          } 

      }).then((unityInstance) => {
          unityInstance.SendMessage('Codigo','FocusCanvas', '0');
          this._unityInstance = unityInstance;
          if (SendMessageUnity != null) {
            unityInstance.SendMessage(SendMessageUnity.objeto  , SendMessageUnity.funcionNombre,  SendMessageUnity.parametros );
          }
         
          this.thenEvent.emit( unityInstance );
      });
    }
  }
  eventClick($event): void {
    this.clickEvent.emit($event)
  }



  ngOnInit(): void {

   /* */
  

}
}