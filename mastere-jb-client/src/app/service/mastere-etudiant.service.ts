import { Reponse } from './../shared/Reponse';
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
import { MastereEtudiant } from '../shared/mastereEtudiant';


@Injectable({
  providedIn: 'root'
})
export class MastereEtudiantService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }


  getMastereEtudiants(): Observable<MastereEtudiant[]> {
    return this.httpClient.get<MastereEtudiant[]>( baseURL + 'mastere-etudiants')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getAnneeUniversitaire(): Observable<string[]> {
    return this.httpClient.get<string[]>( baseURL + 'annees')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getMastereByAnneeUniversitaire(anneeUniversitaire: string): Observable<MastereEtudiant> {
    return this.httpClient.get<MastereEtudiant>( baseURL + 'mastere-etudiants/' + anneeUniversitaire)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getMastereEtudiantByMastereIdAndAnneeUniversitaire(mastereId: number, annee: string): Observable<MastereEtudiant[]> {
    return this.httpClient.get<MastereEtudiant[]>( baseURL + 'mastere-etudiants/' + mastereId + '/' + annee)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getMastereEtudiantScore(mastereId: number, etudiantId: string): Observable<MastereEtudiant> {
    return this.httpClient.get<MastereEtudiant>( baseURL + 'mastere-etudiants/' + mastereId + '/' + etudiantId)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public createMastereEtudiant(mastereId: number, etudiantId: string, annee: string): Observable<Reponse> {
    return this.httpClient.post<Reponse>( baseURL + 'mastere-etudiants/' + mastereId + '/' + etudiantId, annee)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Mise à jour
  public updateMasteres(mastere: Mastere, mention: Mention): Observable<Mastere> {
    return this.httpClient.patch<Mastere>( baseURL + "masteres/" + mastere.id + '/mentions', mention)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
