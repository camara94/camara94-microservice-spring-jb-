import { Certificat } from './../shared/certificat';
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
export class CertificatService {

  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}


  //Les methodes de récuperation
  getCertificats(): Observable<Certificat[]> {
    return this.httpClient.get<Certificat[]>( baseURL + 'certificats')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  getCertificatById(id: number): Observable<Certificat> {
    return this.httpClient.get<Certificat>( baseURL + 'certificats/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de suppression
  public deleteCertificat(idCertificat: number, idEtudiant: string): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "certificats/" + idCertificat + '/' + idEtudiant)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici
  public createCertificat(certificat: Certificat): Observable<Certificat> {
    return this.httpClient.post<Certificat>( baseURL + "certificats/", certificat)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes
  updateCertificat(id: number, certificat: Certificat ): Observable<Certificat> {
    return this.httpClient.put<Certificat>( baseURL + 'certificats/' + id, certificat)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
