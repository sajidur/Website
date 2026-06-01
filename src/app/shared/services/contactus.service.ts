import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, flatMap, mergeMap, toArray, tap, switchMap, concatMap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  private postEmailSendUrl = `https://auth.rexsystemsbd.com/api/Newsletter/contactwithus`

  constructor(private http: HttpClient) { }

  sendEmail(body: any) {
    console.log("<=========== Email send service fired============>");
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'AppKey': '8a181fbe-7fa7-43fe-84de-dc4a9a749e9c'
      }),
      responseType: 'text' as const
    };

    return this.http
      .post(`${this.postEmailSendUrl}`, body, httpOptions)
      .pipe(
        map((x: any) => x),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
