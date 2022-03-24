import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Etudiant } from './../shared/etudiant';
import { Diplome } from './../shared/diplome';
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
export class DiplomeService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getDiplomes(): Observable<Diplome[]> {
    return this.httpClient.get<Diplome[]>( baseURL + 'diplomes')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de récuperation
  getDiplomeById(id: number): Observable<Diplome> {
    return this.httpClient.get<Diplome>( baseURL + 'diplomes/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  updateDiplome(id: number, idEtablissement: number, diplome: Diplome ): Observable<Diplome> {
    return this.httpClient.put<Diplome>( baseURL + 'diplomes/' + id + '/' + idEtablissement, diplome)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteDiplome(diplomeId: number, etudiantId: string): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "diplomes/" + diplomeId + '/' + etudiantId)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici

  public createDiplomes(idEtudiant: string, diplome: Diplome): Observable<Diplome> {
    return this.httpClient.post<Diplome>( baseURL + "diplomes/" + idEtudiant, diplome)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterAnneeUniversitairesAUnDiplome(
    id: number,
    anneeUniversitaireId: number
    ): Observable<AnneeUniversitaire> {
    return this.httpClient.patch<AnneeUniversitaire>( baseURL + 'diplome-releve/' + id + '/' +  anneeUniversitaireId, null)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
