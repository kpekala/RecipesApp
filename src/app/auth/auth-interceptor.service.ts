import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{ 

    constructor(private authService: AuthService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
              if (!user) 
                return next.handle(req);
              const params = new HttpParams().set('auth', user.token);
              const modifiedRequest = req.clone({params: params});
              return next.handle(modifiedRequest);
          }));
        return next.handle(req);
    }
}