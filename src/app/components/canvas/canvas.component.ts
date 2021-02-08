import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.css']

})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy  {
  
  @Input() unityObjeto: string = '';
  @Input() style: string = '';
  @Input() parametros: string = '';
  @Input() ratio: number = 0.59;
  @Input() autoWidth: boolean = true;
  @Output() thenEvent = new EventEmitter();
  @Output() clickEvent = new EventEmitter();
  @ViewChild('unityCanvas') myCanvas: ElementRef<HTMLCanvasElement>;

  private _unityInstance: any = null;
  constructor() {

   }
  ngOnDestroy(): void {
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
    if (objeto != null && objeto != '')
    {
      $("#unityLoader").removeClass('d-none');
       var version = environment.unityVersion;
      window['createUnityInstance'](this.myCanvas.nativeElement, {
        dataUrl: `./assets/Build/${objeto}.data?version=${version}`,
        frameworkUrl: `./assets/Build/${objeto}.framework.js?version=${version}`,
        codeUrl: `./assets/Build/${objeto}.wasm?version=${version}`,
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "ExpoMype",
        productVersion: "0.1",
      }, (progress) => {
          
        if (progress == 1) {
            $("#unityLoader").addClass('d-none');
          } 

      }).then((unityInstance) => {
          unityInstance.SendMessage('Main Camera','FocusCanvas', '0');
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