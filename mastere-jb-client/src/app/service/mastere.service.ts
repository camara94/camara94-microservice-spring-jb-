import { ChampFormule } from './../shared/champFormule';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Mastere } from './../shared/mastere';
import { Mention } from './../shared/mention';
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
export class MastereService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  getMasteres(): Observable<Mastere[]>
  {
    return this.httpClient.get<Mastere[]>( baseURL + 'masteres')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getMastereById(id: number): Observable<Mastere>
  {
    return this.httpClient.get<Mastere>( baseURL + 'masteres/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  afficherMastereEtudiantByMastereIdAndAnneeUniversitaire(id: number, annee: string): Observable<Mastere>
  {
    return this.httpClient.get<Mastere>( baseURL + 'mastere-etudiants/' + id + '/' + annee)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  public createMasteres(mastere: Mastere, menId: number, tyId: number, idEtablissement: number): Observable<Mastere> {
    console.log("URL: " + baseURL + 'masteres/' + menId + '/' + tyId);
    return this.httpClient.post<Mastere>( baseURL + 'masteres/' + menId + '/' + tyId + '/' + idEtablissement, mastere)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public createMastere(mastere: Mastere): Observable<Mastere> {
    return this.httpClient.post<Mastere>( baseURL + 'masteres', mastere)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Mise à jour
  public updateMasteres(idMastere: number, menId: number, tyId: number): Observable<Mastere> {
    return this.httpClient.patch<Mastere>( baseURL + 'masteres/' + idMastere + '/' + menId + '/' + tyId, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }


   //Mise à jour
   public updateMastereDisponible(idMastere: number, dipsonible: number): Observable<void> {
    return this.httpClient.patch<void>( baseURL + 'mastere-dis/' + idMastere + '/' + dipsonible, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public updateChampFormuleAUnMastere(idMastere: number): Observable<ChampFormule[]> {
    return this.httpClient.patch<ChampFormule[]>( baseURL + 'masteres-formules/' + idMastere, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  public ajouterChampFormuleAUnMastere(idMastere: number, idChampFormule: number): Observable<ChampFormule> {
    return this.httpClient.patch<ChampFormule>( baseURL + 'mastere-formule/' + idMastere  + '/' +  idChampFormule, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterChampFormulesAUnMasteres(idMastere: number, champFormules: ChampFormule[]): Observable<ChampFormule[]> {
    return this.httpClient.patch<ChampFormule[]>( baseURL + 'mastere-formules/' + idMastere, champFormules)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterChampFormulesAUnMastere(idMastere: number, champFormule: ChampFormule): Observable<ChampFormule> {
    return this.httpClient.patch<ChampFormule>( baseURL + 'mastere-formules/' + idMastere, champFormule)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
