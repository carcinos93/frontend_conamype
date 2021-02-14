import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanatizer: DomSanitizer) {

  }
  transform(value: string): unknown {
    return this.sanatizer.bypassSecurityTrustHtml(value);
  }

}
