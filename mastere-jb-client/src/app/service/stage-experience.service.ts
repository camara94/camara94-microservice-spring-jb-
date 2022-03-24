import { StageExperience } from './../shared/stageExperience';
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
export class StageExperienceService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getStageExperiences(): Observable<StageExperience[]> {
    return this.httpClient.get<StageExperience[]>( baseURL + 'stage-experiences')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  getStageExperienceById(id: number): Observable<StageExperience> {
    return this.httpClient.get<StageExperience>( baseURL + 'stage-experiences/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteStageExperience(idStageExperience: number, idEtudiant: string): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "stage-experiences/" + idStageExperience + '/' + idEtudiant)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici
  public createStageExperience(stageExperience: StageExperience): Observable<StageExperience> {
    return this.httpClient.post<StageExperience>( baseURL + "stage-experiences", stageExperience)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateStageExperience(id: number, stageExperience: StageExperience ): Observable<StageExperience> {
    return this.httpClient.put<StageExperience>( baseURL + 'stage-experiences/' + id, stageExperience)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
