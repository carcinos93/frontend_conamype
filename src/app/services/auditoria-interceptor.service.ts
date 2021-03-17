import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaInterceptorService implements HttpInterceptor {

  constructor(private ls: LocalStorageService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    /*-const skipIntercept = req.headers.has('skip');

      if (skipIntercept) {
        request = request.clone({
        headers: request.headers.delete('skip')
      });

      return next.handle(request);
    }
    */

    const correo = this.ls.getCurrentUsername();
    const token = this.ls.getCurrentToken();

    if (correo) {
      request = req.clone( {
        setHeaders: {
          'user-logged' : correo,
          'X-Authorization' : `${ token }`
        }
      } );
    }
    
    return next.handle(request).pipe( catchError((err: HttpErrorResponse) => {
      console.log(err);
      if (err.status === 401) {
          alert('Tiempo se sesión agotado, inicia nuevamente sesión');
          this.ls.logout();
          this.router.navigateByUrl('/recepcion');
      }
      return throwError( err );
    }) );
  }
}
