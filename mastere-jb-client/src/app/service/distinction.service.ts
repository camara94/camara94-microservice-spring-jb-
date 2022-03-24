import { Distinction } from './../shared/distinction';
import { Etudiant } from './../shared/etudiant';
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
export class DistinctionService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getDistinctions(): Observable<Distinction[]> {
    return this.httpClient.get<Distinction[]>( baseURL + 'distinctions')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  getDistinctionById(id: number): Observable<Distinction> {
    return this.httpClient.get<Distinction>( baseURL + 'distinctions/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de suppression
  public deleteDistinction(idDistinction: number, idEtudiant: string): Observable<Distinction> {
    return this.httpClient.delete<Distinction>( baseURL + "distinctions/" + idEtudiant + "/" + idDistinction)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de création ici

  public createDistinctions(distinction: Distinction): Observable<Distinction> {
    return this.httpClient.post<Distinction>( baseURL + "distinctions/", distinction)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateDistinction(id: number, distinction: Distinction ): Observable<void> {
    return this.httpClient.put<void>( baseURL + 'distinctions/' + id, distinction)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterDistinctionAUnEtudiant(id: string, distinctionId: number): Observable<Distinction> {
    return this.httpClient.patch<Distinction>( baseURL + 'distinctions/' + id + '/' + distinctionId, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
