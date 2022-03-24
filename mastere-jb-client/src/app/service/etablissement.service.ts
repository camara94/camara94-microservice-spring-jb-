import { Etudiant } from './../shared/etudiant';
import { catchError } from 'rxjs/operators';
import { baseURL } from './../shared/baseurl';
import { Observable } from 'rxjs';
import { Etablissement } from './../shared/etablissement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  //Les methodes de récuperation
  getEtablissements(): Observable<Etablissement[]> {
    return this.httpClient.get<Etablissement[]>( baseURL + 'etablissements')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de récuperation
  getDiplomeById(id:number): Observable<Etablissement> {
    return this.httpClient.get<Etablissement>( baseURL + 'diplomes/'+ id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de récuperation
  updateEtablissement(id: number, etablissement: Etablissement ): Observable<Etablissement> {
    return this.httpClient.put<Etablissement>( baseURL + 'etablissements/' + id, etablissement)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de suppression
  public deleteEtablissement(etablissement: Etablissement): Observable<Etablissement> {
    return this.httpClient.delete<Etablissement>( baseURL + "etablissements/"+ etablissement.id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de création ici
  public createEtablissements(etablissement: Etablissement): Observable<Etablissement> {
    return this.httpClient.post<Etablissement>( baseURL + "etablissements/", etablissement)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  public ajouterUnMastereAUnEtablissement(id: number, mastereId: number): Observable<Etablissement> {
    return this.httpClient.patch<Etablissement>( baseURL + "etablissements/" + id +"/" + mastereId, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
