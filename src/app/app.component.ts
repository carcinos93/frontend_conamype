import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConfig } from './services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ trigger('routeAnimations', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0 })
    ], { optional: true }
),
group([
    query(':leave', [
            animate(300, style({ opacity: 0 }))
        ],
        { optional: true }
    ),
    query(':enter', [
            style({ opacity: 0 }),
            animate(300, style({ opacity: 1 }))
        ],
        { optional: true }
    )
])
     /* query(':enter, :leave', [
        style({
          opacity: 0,
        }),
      ], { optional: true}),
  
      query(':leave', [
        animate('1s', style({ opacity: 1 })),
      ],  { optional: true })
      */
    ])

]) ]
})
export class AppComponent implements OnInit {
  title = 'frontend-conamype';
  constructor(private appConfig: AppConfig) {
      
  }
  ngOnInit(): void {
    if (this.appConfig.habilitarSonido) {
      var audio = document.getElementById("audioBackground") as HTMLAudioElement;
      audio.play();
    }
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['page'] || 'inicio';
    //return outlet
  }




}

