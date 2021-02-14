import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styles: [
  ]
})
export class AudioComponent implements AfterViewInit {
  @Input() config: any = {};
  @ViewChild('icono') icono: ElementRef;
  constructor() { 
   }

  ngAfterViewInit(): void {
    var audio = document.getElementById("audioBackground") as HTMLAudioElement;
    var iconoMusica = $(this.icono.nativeElement);
    var pausado = audio.paused;
  
    if (pausado) {
      iconoMusica.removeClass("fa-volume-up").addClass("fa-volume-off");
    } else {
      iconoMusica.addClass("fa-volume-up").removeClass("fa-volume-off");
    }

  }

  pausarReproducir() {
    var audio = document.getElementById("audioBackground") as HTMLAudioElement;
    var iconoMusica = $(this.icono.nativeElement);
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
