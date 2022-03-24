import { AppelALaCandidature } from './../shared/appelALaCandidature';
import { Etudiant } from './../shared/etudiant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppelALaCandidatureService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }


  //Les methodes de récuperation
  getAppelALaCandidatures(): Observable<AppelALaCandidature[]> {
    return this.httpClient.get<AppelALaCandidature[]>( baseURL + 'appel-a-la-candidatures')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  getAppelALaCandidatureId(id: number): Observable<AppelALaCandidature> {
    return this.httpClient.get<AppelALaCandidature>( baseURL + 'appel-a-la-candidatures/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteAppelALaCandidature(idAppelALaCandidature: number): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "appel-a-la-candidatures/" + idAppelALaCandidature)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici
  public createAppelALaCandidature(appelALaCandidature: AppelALaCandidature): Observable<AppelALaCandidature> {
    return this.httpClient.post<AppelALaCandidature>( baseURL + "appel-a-la-candidatures/", appelALaCandidature)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateAppelALaCandidature(id: number, appelALaCandidature: AppelALaCandidature ): Observable<AppelALaCandidature> {
    return this.httpClient.put<AppelALaCandidature>( baseURL + 'appel-a-la-candidatures/' + id, AppelALaCandidature)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
