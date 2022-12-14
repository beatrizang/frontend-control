import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthloginService } from "../servicios/authlogin.service";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService: AuthloginService,
        private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.authService.token;
        if(token != null){
            const authReq = req.clone({
                headers: req.headers.set('Authorization','Bearer ' + token)
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}
