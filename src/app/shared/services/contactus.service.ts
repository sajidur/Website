import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, flatMap, mergeMap, toArray, tap, switchMap, concatMap } from 'rxjs/operators';
import { from, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  private postEmailSendUrl = `http://mokles-001-site5.itempurl.com/Email`

  constructor(private http: HttpClient) { }

  sendEmail(body: any) {
    console.log("<=========== Email send service fired============>");
    // let rbody = {
    //     toEmail: "ashraful.ru37@gmail.com",
    //     subject: "ES",
    //     body: "heloo",
    //     phone:"01719304970",
    //     name:"ashraf" 
    // }
    // console.log(dmInfo)
    const httpOptions = {
        'Content-Type': 'application/json',
      headers: new HttpHeaders({
        // Authorization: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5ODk0Yzc4LWY0YzMtNDM0NS1iMzc4LWE5ZGIwNzVmN2MzYSIsInVzZXJfbmFtZSI6ImpvZ19hc2hyYWYiLCJlbWFpbCI6ImFzaHJhZnVsLmlzbGFtQGJlbmdhbG1vYmlsZXFhLmNvbSIsInVzZXJfaWQiOiIxOTg5NGM3OC1mNGMzLTQzNDUtYjM3OC1hOWRiMDc1ZjdjM2EiLCJjb21wYW55X2lkIjoiOTlhZjJlNzAtY2JhZi00NDIxLWIyZDItNmFmYTExMWFmNzMzIiwiY29tcGFueV9uYW1lIjoiQmVuZ2FsIE1vYmlsZSBRQSBTb2x1dGlvbiIsImFwcF9pZCI6IjM0MDMzODcwLTgwMmMtNDM0OS1iOGE2LWQ0ODIxMmQ3YzUwNyIsImFwcF9uYW1lIjoiSm9nYWpvZyIsImp0aSI6IjIxMzI2NzUzLTVhNjctNGU1ZS1hYzNkLWZmNGY2NjhmNDgwZSIsImlhdCI6MTYzOTg5MjM1OCwiaXNzIjoib2F1dGguc3Vycm91bmRhcHBzIiwic3ViIjoiMTk4OTRjNzgtZjRjMy00MzQ1LWIzNzgtYTlkYjA3NWY3YzNhIn0.BT0zfZWz1WM6qvpXqjM95DR9nzgnsPPXHMesBnHNNmkHCf973JMdAMKstkDW-FWrSkgSHnJQfwJWdoQz8GisGCLcttFOMZSYcQuGbwwk0ns70_x-3ZBF4SQb2HxGIG5ASJaQJiJmzphd9ljMcjIbtnHk5X2otSLcX1wW342vmqtPT4S-OVwqUyEE-RiV9Em11bDNHC72Afssy3GD4as3ZkW5I2OO1owDy1lOvYKegj6JysvrIdYypTItwQ5vvZbIx68zIt86fufm2zDaoamOSxIbihx82L_SlLaKY6xrvVkI3gTtdZkKStlyTJ8S4w3riOeMyypcFT2WO08Ef8DhKA"
      })
    };
    // let reqBody: any[] = []
    // body.forEach((element:any) => {
    //   reqBody.push({state: element.state, licenseNumber: element.licenseNumber})
    // });

    // console.log(reqBody)

    return this.http
      .post(`${this.postEmailSendUrl}`, body)
      .pipe(
        map((x: any) => x),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
