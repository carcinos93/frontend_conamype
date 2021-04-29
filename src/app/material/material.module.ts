import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import es from '@angular/common/locales/es';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from '@danielmoncada/angular-datetime-picker';
@Injectable()
export class DefaultIntl extends OwlDateTimeIntl {
  /** A label for the up second button (used by screen readers).  */
  upSecondLabel= 'Add a second';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel= 'Minus a second';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel= 'Add a minute';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel= 'Minus a minute';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel= 'Add a hour';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel= 'Minus a hour';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel= 'Previous month';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel= 'Next month';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel= 'Previous year';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel= 'Next year';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel= 'Previous 21 years';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel= 'Next 21 years';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel= 'Change to month view';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel= 'Choose month and year';

  /** A label for the cancel button */
  public cancelBtnLabel= 'Cerrar';

  /** A label for the set button */
  public setBtnLabel= 'Seleccionar';

  /** A label for the range 'from' in picker info */
  rangeFromLabel= 'Desde';

  /** A label for the range 'to' in picker info */
  rangeToLabel= 'A';

  /** A label for the hour12 button (AM) */
  hour12AMLabel= 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel= 'PM';
};
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    NgxMaterialTimepickerModule.setLocale("es"),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [ MatDatepickerModule,  {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},  {provide: OwlDateTimeIntl, useClass: DefaultIntl},  ],
  exports: [ MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatStepperModule, MatFormFieldModule, MatProgressSpinnerModule, NgxMaterialTimepickerModule, OwlDateTimeModule, OwlNativeDateTimeModule  ]
})
export class MaterialModule { }

