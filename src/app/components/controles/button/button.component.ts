import { Component, OnDestroy, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [
  ]
})
export class ButtonComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() btnConfig: any;
  @Output() OnBtnClick = new EventEmitter();
  @ViewChild('componentButton') btn: ElementRef;
  constructor() { }
  ngOnDestroy(): void {
 
  }
  
  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {


  }
  onBtnClickEvent($event) {
    $event.preventDefault();
    this.OnBtnClick.emit($event);
  
  }
}
