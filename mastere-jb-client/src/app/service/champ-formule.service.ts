import { MastereEtudiantId } from './../shared/mastereEtudiantId';
import { ChampFormule } from './../shared/champFormule';
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
export class ChampFormuleService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getChampFormules(): Observable<ChampFormule[]> {
    return this.httpClient.get<ChampFormule[]>( baseURL + 'formules')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  getChampFormuleById(id: number): Observable<ChampFormule> {
    return this.httpClient.get<ChampFormule>( baseURL + 'formules/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteChampFormule(idChampFormule: number, idMastere: number): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "formules/" + idChampFormule + '/' + idMastere)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici
  public createChampFormule(champFormule: ChampFormule): Observable<ChampFormule> {
    return this.httpClient.post<ChampFormule>( baseURL + "formules/", champFormule)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateChampFormule(id: number, champFormule: ChampFormule ): Observable<ChampFormule> {
    return this.httpClient.put<ChampFormule>( baseURL + 'formules/' + id, champFormule)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
