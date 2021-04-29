import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConamypeService } from '../../services/conamype.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private conamyeService: ConamypeService) { }
  estado: boolean = false;
  mensaje: string = "";
  ngOnInit(): void {
    let token = this.activeRoute.snapshot.paramMap.get('token_confirm');
    this.conamyeService.validarRegistro(token).subscribe((data: any) => {
       this.mensaje = data.message;
        this.estado = data.success;
    },(err) => {
        this.estado = true;
        this.mensaje = "Lo sentimos, el servicio no esta disponible"
    } );
  }

}
