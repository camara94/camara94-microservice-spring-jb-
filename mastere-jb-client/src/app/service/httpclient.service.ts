import { Etablissement } from './../shared/etablissement';
import { Type } from './../shared/type';
import { Mastere } from './../shared/mastere';
import { Mention } from './../shared/mention';
import { Domaine } from './../shared/domaine';
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
export class HttpClientService {

  constructor(
    private httpClient:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getEtablissements(): Observable<Etablissement[]> {
    return this.httpClient.get<Etablissement[]>( baseURL + 'etablissements')
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDomaines(): Observable<Domaine[]> {
    return this.httpClient.get<Domaine[]>( baseURL + 'domaines')
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getMentions(): Observable<Mention[]> {
    return this.httpClient.get<Mention[]>( baseURL + 'mentions' )
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getMasteres(): Observable<Mastere[]> {
    return this.httpClient.get<Mastere[]>( baseURL + 'masteres')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getType(): Observable<Type[]> {
    return this.httpClient.get<Type[]>( baseURL + 'types')
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


  public ajouterUnMastereAUnEtablissement(etablissement: Etablissement, id: number, mastereId: number): Observable<Etablissement> {
    return this.httpClient.patch<Etablissement>( baseURL + 'etablissements/' + id + '/masteres/' + mastereId,  etablissement)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public inscrireUnEtudiantAUnMastere(idMastere: number, idEtudiant: number): Observable<string> {
    return this.httpClient.patch<string>( baseURL + 'masteres/' + idMastere + '/' + idEtudiant, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public createEtudiants(etudiant: Etudiant): Observable<Etudiant> {
    return this.httpClient.post<Etudiant>(baseURL + 'etudiants', etudiant)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public createMasteres(mastere: Mastere, menId:number, tyId: number, idEtablissement: number): Observable<Mastere> {
    return this.httpClient.post<Mastere>( baseURL + 'masteres/' + menId + '/' + tyId + '/' + idEtablissement, mastere)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Mise à jour
  public updateMasteres(mastere:Mastere, mention:Mention): Observable<Mastere> {
    return this.httpClient.patch<Mastere>( baseURL + "masteres/" + mastere.id + '/mentions', mention)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
