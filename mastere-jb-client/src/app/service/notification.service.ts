import { Notification } from './../shared/notification';
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
export class NotificationService {
  constructor(
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}
  //Les methodes de récuperation
  getNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>( baseURL + 'notifications')
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de récuperation
  getNotificationById(id: number): Observable<Notification> {
    return this.httpClient.get<Notification>( baseURL + 'notifications/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de récuperation
  getNotificationByEtudiantId(id: string): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>( baseURL + 'notification/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de récuperation
  getNotificationByEtudiant(id: string): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>( baseURL + 'notification/' + id)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de suppression
  public deleteNotification(idNotification: number, idEtudiant: string): Observable<void> {
    return this.httpClient.delete<void>( baseURL + "notifications/" + idNotification + '/' + idEtudiant)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes de création ici
  public createNotification(id: string, messageNotification: string): Observable<Notification> {
    return this.httpClient.post<Notification>( baseURL + "notifications/" + id, messageNotification)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  //Les methodes
  updateNotification(id: string): Observable<Notification[]> {
    return this.httpClient.put<Notification[]>( baseURL + 'notifications/' + id, null)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
