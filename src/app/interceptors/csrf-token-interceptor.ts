import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CSRFInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const storedCsrfTokenFromLS = localStorage.getItem('X-CSRF-TOKEN');
    if (storedCsrfTokenFromLS && req.url.includes('scapi.vannadev.com')) {
      const modifiedRequest = req.clone({ setHeaders: { 'X-CSRFToken': storedCsrfTokenFromLS } });
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}
