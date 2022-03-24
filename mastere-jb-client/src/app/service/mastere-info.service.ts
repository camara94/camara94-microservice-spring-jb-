import { catchError } from 'rxjs/operators';
import { baseURL } from './../shared/baseurl';
import { Observable } from 'rxjs';
import { MastereInfo } from './../shared/mastereInfo';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MastereInfoService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  //Les methodes de récuperation
  getMastereInfos(): Observable<MastereInfo[]> {
    return this.httpClient.get<MastereInfo[]>( baseURL + 'mastere-infos')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de récuperation
  getMastereInfoById(id: number): Observable<MastereInfo> {
    return this.httpClient.get<MastereInfo>( baseURL + 'mastere-infos/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteMastereInfo(idFormation: number): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "mastere-infos/" + idFormation)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici

  public createMastereInfos(mastereInfo: MastereInfo): Observable<MastereInfo> {
    return this.httpClient.post<MastereInfo>( baseURL + "mastere-infos/", mastereInfo)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateMastereInfo(id: number, mastereInfo: MastereInfo ): Observable<MastereInfo> {
    return this.httpClient.put<MastereInfo>( baseURL + 'mastere-infos/' + id, mastereInfo)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
