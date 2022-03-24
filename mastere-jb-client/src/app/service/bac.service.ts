import { Bac } from './../shared/bac';
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
export class BacService {
  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  //Les methodes de récuperation
  getBacs(): Observable<Bac[]> {
    return this.httpClient.get<Bac[]>( baseURL + 'bac')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de récuperation
  getBacById(id: number): Observable<Bac> {
    return this.httpClient.get<Bac>( baseURL + 'bac/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de suppression
  public deleteBac(idBac: number, idEtudiant: string): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "bac/" + idBac + '/' + idEtudiant)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de création ici
  public createbac(bac: Bac): Observable<Bac> {
    return this.httpClient.post<Bac>( baseURL + "bac/", bac)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes
  updateBac(id: number, bac: Bac ): Observable<Bac> {
    return this.httpClient.put<Bac>( baseURL + 'bac/' + id, bac)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
