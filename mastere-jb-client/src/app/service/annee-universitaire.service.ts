import { Etudiant } from './../shared/etudiant';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
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
export class AnneeUniversitaireService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getAnneeUniversitaires(): Observable<AnneeUniversitaire[]> {
    return this.httpClient.get<AnneeUniversitaire[]>( baseURL + 'releves')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getAnneeUniversitaireById(id: number): Observable<AnneeUniversitaire> {
    return this.httpClient.get<AnneeUniversitaire>( baseURL + 'releves/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteAnneeUniversitaire(anneeUniversitaireId: number, idDiplome: number): Observable<string> {
    return this.httpClient.delete<string>( baseURL + "releves/"+ anneeUniversitaireId + '/' + idDiplome)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

   //Les methodes de suppression
   public deleteAllAnneeUniversitaire(anneeUniversitaireId: number, idDiplome: number): Observable<string> {
    return this.httpClient.delete<string>( baseURL + "releves-all/"+ anneeUniversitaireId + '/' + idDiplome)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici

  public updateAnneeUniversitaires(idReleve: number, anneeUniversitaire: AnneeUniversitaire): Observable<AnneeUniversitaire> {
    return this.httpClient.put<AnneeUniversitaire>( baseURL + "releves/" + idReleve, anneeUniversitaire)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de mise à jour ici

  public createAnneeUniversitaires(anneeUniversitaire: AnneeUniversitaire): Observable<AnneeUniversitaire> {
    return this.httpClient.post<AnneeUniversitaire>( baseURL + "releves", anneeUniversitaire)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
