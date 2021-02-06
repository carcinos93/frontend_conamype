import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [ '* { font-family: "Fira Sans" }'
  ]
})
export class HeaderComponent implements OnInit {

  @Output() OnBtnAtras = new EventEmitter();
  constructor(public route: Router, public lsService: LocalStorageService) { }

  ngOnInit(): void {

  }
  atras(event) {
    this.OnBtnAtras.emit(event);
  }
  logout() {
      this.lsService.logout();
      this.route.navigateByUrl('/inicio');
      
  }

  validarRuta() {
    return (this.route.url != '/inicio');
  }

}
