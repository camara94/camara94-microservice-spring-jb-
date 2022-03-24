import { Etudiant } from './../shared/etudiant';
import { Formation } from './../shared/formation';
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
export class FormationService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getFormations(): Observable<Formation[]> {
    return this.httpClient.get<Formation[]>( baseURL + 'formations')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  getFormationById(id: number): Observable<Formation> {
    return this.httpClient.get<Formation>( baseURL + 'formations/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteFormation(idFormation: number, idEtudiant: string): Observable<string> {
    return this.httpClient.delete<string>( baseURL + "formations/" + idFormation + '/' + idEtudiant)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici

  public createFormations(formation: Formation): Observable<Formation> {
    return this.httpClient.post<Formation>( baseURL + "formations/", formation)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateFormation(id: number, formation: Formation ): Observable<Formation> {
    return this.httpClient.put<Formation>( baseURL + 'formations/' + id, formation)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
