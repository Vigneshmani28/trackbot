import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { AuthService } from "../services/auth-service/auth.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class AuthorizationHttpInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes("authenticate")){
            return next.handle(req);
        } else if(this.authService.token == undefined || this.authService.token == ""){
            this.router.navigate(["login"])
            throw new Error("Token not found");
        } else {
            let request = req.clone(
                {
                    headers: req.headers.set("Authorization" , "Bearer " + this.authService.token)
                }
            )
            return next
                .handle(request)
                .pipe(
                    catchError((err: HttpErrorResponse, event) => {
                        if (err.status === 401 || err.status === 403) {
                            console.log("Interceptor: Auth error", err.status);
                            this.router.navigate(["login"], { replaceUrl: true });
                          }
                        throw err
                    })
                )
        }
    }

}

