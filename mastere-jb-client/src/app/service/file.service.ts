import { FileResponse } from './../shared/fileResponse';

import { Etudiant } from './../shared/etudiant';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getFiles(): Observable<FileResponse[]> {
    return this.httpClient.get<FileResponse[]>( baseURL + 'files')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de récuperation
  getFile(name: string): Observable<any> {
    return this.httpClient.get<any>( baseURL + 'download/' + name)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFileById(name: string): Observable<FileResponse> {
    return this.httpClient.get<FileResponse>( baseURL + 'upload-file/' + name)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de création ici
  public createfiles(formData: FormData): Observable<FileResponse> {
    return this.httpClient.post<FileResponse>( baseURL + "upload-file/", formData)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public createMultiplefiles(formDatas: FormData[]): Observable<FileResponse[]> {
    return this.httpClient.post<FileResponse[]>( baseURL + "upload-multiple-files/", formDatas)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
