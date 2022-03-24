import { EmailTemplate } from './../shared/emailTemplate';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de création ici
  public sendTo(emailTemplate: EmailTemplate): Observable<string> {
    return this.httpClient.post<string>( 'http://localhost:8087/notification/textemail', emailTemplate)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
