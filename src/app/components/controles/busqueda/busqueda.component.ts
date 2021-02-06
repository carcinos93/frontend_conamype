import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  @ViewChild('textoBusqueda') texto: ElementRef 
  @Output() buscarEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  buscar($event) {
      this.buscarEvent.emit( this.texto.nativeElement.value );
  }

}
