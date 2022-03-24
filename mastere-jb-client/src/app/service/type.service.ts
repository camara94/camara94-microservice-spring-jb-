import { Type } from './../shared/type';
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
export class TypeService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  getTypes(): Observable<Type[]>
  {

    return this.httpClient.get<Type[]>( baseURL + 'types')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getTypeById(id: number): Observable<Type> {

    return this.httpClient.get<Type>( baseURL + 'types/' + id )
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  public createTypes(type: Type): Observable<Type> {
    console.log("URL: " + baseURL + 'types');
    return this.httpClient.post<Type>( baseURL + 'types', type)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }




  //Mise à jour
  public updateMentions(typeId: number, type: Type): Observable<Type> {
    return this.httpClient.patch<Type>( baseURL + "types/" + typeId, type)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
