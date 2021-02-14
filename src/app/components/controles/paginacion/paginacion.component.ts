import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styles: [ 
    '.active{ background-color: rgba(48,126,228,.7); color: black }'
  ]
})
export class PaginacionComponent implements OnInit, OnChanges {
  
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;
  @Input() paginaEnlinea: number = 5;
  @Output() OnPagina = new EventEmitter();
  @Input() config: any = {};
  anteriorTexto: string = "anterior";
  siguienteTexto: string = "siguiente";
  paginas: number[] = [];
  constructor() {

        this.paginacion();
   }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPaginas'] != undefined) {
      if (changes['totalPaginas'].previousValue != changes['totalPaginas'].currentValue && changes['totalPaginas'].currentValue != null)
      {
        this.paginacion();
      }
    } 
  }
  OnPaginaClick(pagina: number) {
    this.paginaActual = pagina;
    this.paginacion();
    this.OnPagina.emit( pagina.toString() );
  }
  paginacion() {
        this.paginas = [];
        let paginasMax = Number((Math.ceil(this.paginaEnlinea / 2)).toFixed(0) );
        let inicio =  ( this.paginaActual  - paginasMax );
        let final = paginasMax  + this.paginaActual;
        if (inicio <= 0) {
          final+= paginasMax - this.paginaActual;
          inicio = 1;
       }
        if (final >= this.totalPaginas) {
          final = this.totalPaginas;  
        }
       

      for (let i = inicio, total = final; i <= total; i++) {
          this.paginas.push( i );
      }

  }
  ngOnInit(): void {
    if (this.config.siguienteTexto != null) {
      this.siguienteTexto = this.config.siguienteTexto ;
    }
    if (this.config.anteriorTexto != null) {
      this.anteriorTexto = this.config.anteriorTexto ;
    }
  }
  

}

