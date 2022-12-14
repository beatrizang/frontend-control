import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AuthloginService } from "../servicios/authlogin.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthloginService,
        private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(e => {
                if(e.status==401){
                    if(this.authService.isAuthenticated()){
                      this.authService.logout();
                    }
                    this.router.navigate(['/login']);
                  }

                  if(e.status==403){
                    Swal.fire('Acceso Denegado',`Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,'warning');
                    this.router.navigate(['/inicio']);
                  }
                  return throwError(e);
            })
        );
    }
}
