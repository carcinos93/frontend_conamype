import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [ '*:not(i) { font-family: "Fira Sans" }'
  ]
})
export class HeaderComponent implements OnInit {

  @Output() OnBuscar = new EventEmitter();
  @Input() habilitarBusqueda: boolean = false;
  @ViewChild('textoBusqueda') textoBusqueda: ElementRef;
  constructor(public route: Router, public lsService: LocalStorageService) { }

  ngOnInit(): void {

  }
  buscar(texto: string) {
    this.OnBuscar.emit(texto);
  }

  limpiar() {
    this.textoBusqueda.nativeElement.value = "";
    //this.OnBuscar.emit("");
  
  }
  logout() {
      this.lsService.logout();
      this.route.navigateByUrl('/inicio');
      
  }

  validarRuta() {
    return (this.route.url != '/inicio');
  }

}
