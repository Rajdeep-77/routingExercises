import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log("Request is on its way !");
        console.log(req.url);

        const modifiedReq = req.clone( { headers: req.headers.append('HeaderSettedWith','Interceptor') } );

        return next.handle(modifiedReq).pipe(tap( event => { 

            console.log(event);
            console.log(modifiedReq);

            if(event.type === HttpEventType.Response){
                console.log("Response arrived");
                console.log( event.body );
            }
         } ));
    }

}