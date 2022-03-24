import { KeycloakSecurityService } from './keycloak-security.service';
import { Domaine } from './../shared/domaine';
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
export class DomaineService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private keycloakSecurityService: KeycloakSecurityService
  ) {}


  getDomaines(): Observable<Domaine[]> {
    return this.httpClient.get<Domaine[]>( baseURL + 'domaines')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getDomaineById(id: number): Observable<Domaine> {
    return this.httpClient.get<Domaine>( baseURL + 'domaines/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  public createDomaines(domaine: Domaine): Observable<Domaine> {
    return this.httpClient.post<Domaine>( baseURL + 'domaines', domaine)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }




  //Mise à jour
  public updateDomaines(domaineId: number, domaine: Domaine): Observable<Domaine> {
    return this.httpClient.patch<Domaine>( baseURL + "domaines/" + domaineId, domaine)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
