import { Notification } from './../shared/notification';
import { catchError } from 'rxjs/operators';
import { KeycloakSecurityService } from './keycloak-security.service';
import { StageExperience } from './../shared/stageExperience';
import { Certificat } from './../shared/certificat';
import { Distinction } from './../shared/distinction';
import { Bac } from './../shared/bac';
import { AnneeUniversitaireService } from './annee-universitaire.service';
import { FormationService } from './formation.service';
import { DiplomeService } from './diplome.service';
import { Formation } from './../shared/formation';
import { Diplome } from './../shared/diplome';
import { Etudiant } from './../shared/etudiant';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

/*
* @author: Camara Laby Damaro
* @Email: ldamaro98@gmail.com
*/


@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(
    private anneeUniversitaireService: AnneeUniversitaireService,
    private formationService: FormationService,
    private diplomeService: DiplomeService,
    private httpClient: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private securityService: KeycloakSecurityService
  ) {}


  //Les methodes de récuperation
  public getEtudiants(): Observable<Etudiant[]> {
    return this.httpClient.get<Etudiant[]>( baseURL + 'etudiants')
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  //Les methodes de récuperation
  public getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>( baseURL + 'etudiants')
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public getEtudiantById(id: string): Observable<Etudiant> {
    return this.httpClient.get<Etudiant>( baseURL + 'etudiants/' + id)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public getEtudiantByUsername(username: string): Observable<Etudiant> {
    return this.httpClient.get<Etudiant>( baseURL + 'users/' + username)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public validerDossierEtudiant(idEtudiant: string) {
    return this.httpClient.patch<Etudiant>( baseURL + 'etudiant-valider-dossier/' + idEtudiant, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public annulerDossierEtudiant(idEtudiant: string) {
    return this.httpClient.patch<Etudiant>( baseURL + 'etudiant-annuler-dossier/' + idEtudiant, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  //Les methodes de suppression
  public deleteEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.httpClient.delete<Etudiant>( baseURL + "etablissements/"+ etudiant.id)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }



  //Les methodes de création ici

  public createEtudiants(etudiant: Etudiant): Observable<Etudiant> {
    return this.httpClient.post<Etudiant>( baseURL + "etudiants/", etudiant)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  public ajouterBacAUnEtudiant(id: string, idBac: number): Observable<Bac> {
    return this.httpClient.patch<Bac>( baseURL + 'etudiant-bac/' + id  + '/' +  idBac, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  public ajouterNotificationAUnEtudiant(idEtudiant: string, idNotifcation: number): Observable<Notification> {
    return this.httpClient.patch<Notification>( baseURL + 'etudiant-notification/' + idEtudiant + '/' + idNotifcation, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterCertificatAUnEtudiant(idEtudiant: string, idCertificat: number): Observable<Certificat> {
    return this.httpClient.patch<Certificat>( baseURL + 'etudiant-certificat/' + idEtudiant  + '/' +  idCertificat, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  public ajouterStageExperienceAUnEtudiant(idEtudiant: string, idStageExperience: number): Observable<StageExperience> {
    return this.httpClient.patch<StageExperience>( baseURL + 'etudiant-stage-experience/' + idEtudiant  + '/' +  idStageExperience, null)
               .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterDiplomesAUnEtudiant(id: string, diplomeId: number): Observable<Diplome> {
    return this.httpClient.patch<Diplome>( baseURL + 'etudiant-diplome/' + id + '/' +  diplomeId, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterUnDiplomeAUnEtudiant(id: number, diplome: Diplome): Observable<Diplome> {
    return this.httpClient.patch<Diplome>( baseURL + 'etudiants/' + id + 'diplomes/' + diplome.id,  diplome)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterFormationsAUnEtudiant(id: string, formationId: number): Observable<Formation> {
    return this.httpClient.patch<Formation>( baseURL + 'etudiant-formation/' + id + '/' +  formationId, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public ajouterDistinctionAUnEtudiant(id: number, distinctionId: number): Observable<Distinction> {
    return this.httpClient.patch<Distinction>( baseURL + 'etudiant-distinction/' + id + '/' +  distinctionId, null)
                .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  public updateEtudiant( id: string, etudiant: Etudiant ): Observable<Etudiant> {
    return this.httpClient.put<Etudiant>( baseURL + 'etudiant/' + id, etudiant)
              .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getTokenParsed(): any {
    return this.securityService.keycloakInstance.tokenParsed;
  }
}

