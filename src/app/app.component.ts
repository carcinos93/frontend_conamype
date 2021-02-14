import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef, HostBinding  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfig } from './services/app-config.service';
import { ConamypeService } from './services/conamype.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 styles: [ ],
  animations: [ trigger('routeAnimations', [
    transition( '* => *', [

      query(':enter', 
          [
              style({ opacity: 0 })
          ], 
          { optional: true }
      ),

      query(':leave', 
          [
              style({ opacity: 1 }),
              animate('0.2s', style({ opacity: 0 }))
          ], 
          { optional: true }
      ),

      query(':enter', 
          [
              style({ opacity: 0 }),
              animate('0.2s', style({ opacity: 1 }))
          ], 
          { optional: true }
      )

  ])
    /*transition('* => *', [
     query(':enter, :leave', [
        style({
          opacity: 0,
        }),
      ], { optional: true}),
  
      query(':leave', [
        animate('1.5s', style({ opacity: 1 })),
      ],  { optional: true })
    
    ])*/

]) ]
})
export class AppComponent implements OnInit {
  title = 'frontend-conamype';
  constructor(public appConfig: AppConfig, private conamypeService: ConamypeService) {
      
  }
  ngOnInit(): void {
    this.conamypeService.template("contactenos").subscribe( (data: any) => {
        console.log(data);
    } );
    if (this.appConfig.habilitarSonido) {
      var audio = document.getElementById("audioBackground") as HTMLAudioElement;
      audio.loop=true;
      audio.play();
    }
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ?  outlet.activatedRouteData['page']  : 'inicio';
   // return outlet.activatedRouteData['page'] || 'inicio';
    //return outlet
  }




}

