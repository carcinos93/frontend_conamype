import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styles: [ '.right {  bottom: 0%; right: 4% }'
  ]
})
export class AudioComponent implements OnInit {

  constructor() { 
    if (this.config.position == null) {
      this.config.position = "right";
    }
  
   }
  @Input() config: any = {};
  ngOnInit(): void {
    var audio = document.getElementById("audioBackground") as HTMLAudioElement;
    var iconoMusica = $("#iconoMusica");
    if (audio.paused) {
      iconoMusica.removeClass("fa-volume-up");
      iconoMusica.addClass("fa-volume-off");
    } else {
      iconoMusica.addClass("fa-volume-up");
      iconoMusica.removeClass("fa-volume-off");
    }
  }

  
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
