import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styles: [
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true
    }
  ]
})
export class DatetimepickerComponent implements OnInit, ControlValueAccessor  {
  value = null;
  onChange: any = () => { };
  onTouched: any = () => { };
  disabled = false;
  constructor() { }
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
      
  }

  getTime(value: string): Time  {
      let time: Time;
      let reg = new RegExp("([0-9]*):([0-9]*)", "g");
      let result = reg.exec(value);
      if (result != null) {
        if (result.length >= 1) {
            time.hour = Number(result[0]) + ( value.indexOf("p. m.") >= 0 ? 12 : 0 );
            time.minute = Number(result[1]);
          }
       
      }
    
      return time;
  }


}

export interface Time {
  hour: number;
  minute: number
}
