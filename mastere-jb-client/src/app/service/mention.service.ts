import { Etudiant } from './../shared/etudiant';
import { Mention } from './../shared/mention';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MentionService {


  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  getMentions(): Observable<Mention[]> {
    return this.httpClient.get<Mention[]>( baseURL + 'mentions')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getMentionById(id: number): Observable<Mention> {
    return this.httpClient.get<Mention>( baseURL + 'mentions/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  public createMentions(mention:Mention): Observable<Mention> {
    console.log("URL: " + baseURL + 'mentions');
    return this.httpClient.post<Mention>( baseURL + 'mentions', mention)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }




  //Mise à jour
  public updateMentions(mentionId: number, domaineId: number, mention: Mention): Observable<Mention> {
    return this.httpClient.patch<Mention>( baseURL + "mention-domaines/" + mentionId + '/' + domaineId, mention)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
