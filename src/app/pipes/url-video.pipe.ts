import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConfig } from '../services/app-config.service';

@Pipe({
  name: 'urlVideo'
})
export class UrlVideoPipe implements PipeTransform {

  constructor(private sanatizer: DomSanitizer, private appConfig: AppConfig) {}
  transform(value: string): unknown {
    return this.sanatizer.bypassSecurityTrustResourceUrl( this.getUrl(value) );
  }
  getUrl(url: string): string {
    let config = this.appConfig.videoPlayer; 
    for (let i in config) {
        let v = config[i];
        /***se verifica si es un video embedido y lo retorna */
        if ( this.testReg(  url, v.embedMask ) ) {
            return url;
        } else {
                /*** si url del sitio */
            if ( this.testReg( url, v.siteMask ) ) {
                let reg = new RegExp( v.siteMask, "g" );
                let result = reg.exec(url);
                if (result != null) {
                    if (result.length >=1) {
                        /**se extrae el identificador del video y se retorna el url del embedido */
                        return v.videoEmbed.replace( "{VIDEO_ID}", result[1] );
                    }
                }
            }
        }
    }
    
    return null;
}
  testReg(  valor: string, reg: string  ): boolean {
    return new RegExp( reg, "g"  ).test( valor );
  }

}
