import { Component,  EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-imagen-button',
  templateUrl: './imagen-button.component.html',
  styles: [ 
  ]
})
export class ImagenButtonComponent implements OnInit {
  @Input() btnConfig: any;
  @Output() OnBtnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
 
  }

    
  onBtnClickEvent($event) {
    $event.preventDefault();
    this.OnBtnClick.emit($event);
  }

}
