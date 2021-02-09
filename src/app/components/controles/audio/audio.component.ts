import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styles: [ '.right {  bottom: 2%; right: 4% }'
  ]
})
export class AudioComponent implements AfterViewInit {

  constructor() { 
    if (this.config.position == null) {
      this.config.position = "right";
    }
  
   }
  ngAfterViewInit(): void {
    var audio = document.getElementById("audioBackground") as HTMLAudioElement;
    var iconoMusica = $("#iconoMusica");
     var pausado = audio.paused;
     console.log(pausado);
     console.log(iconoMusica);
    if (pausado) {
      iconoMusica.removeClass("fa-volume-up").addClass("fa-volume-off");
    } else {
      iconoMusica.addClass("fa-volume-up").removeClass("fa-volume-off");
    }
  }
  @Input() config: any = {};


  
  pausarReproducir() {
    var audio = document.getElementById("audioBackground") as HTMLAudioElement;
    var iconoMusica = $("#iconoMusica");
    if (audio.paused) {
      audio.play();
      iconoMusica.addClass("fa-volume-up");
      iconoMusica.removeClass("fa-volume-off");
 
    } else {
      audio.pause();
      iconoMusica.removeClass("fa-volume-up");
      iconoMusica.addClass("fa-volume-off");

    }
  }
}
