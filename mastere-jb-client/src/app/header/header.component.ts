import { VariablesGlobales } from './../shared/variableGlobale';
import { Etudiant } from './../shared/etudiant';
import { EtudiantService } from './../service/etudiant.service';
import { Notification } from './../shared/notification';
import { NotificationService } from './../service/notification.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  notifications: Notification[] = [];
  username1: string;
  username: string;
  etudiant: Etudiant;
  id: string;
  constructor(
      public authenticationService: AuthenticationService,
      public router: Router,
      private notificationService: NotificationService,
      private etudiantService: EtudiantService,
      public variablesGlobales: VariablesGlobales
      ) {
        if (this.authenticationService.getTokenParsed() != null) {
          this.username = this.authenticationService
                              .getTokenParsed()
                              .preferred_username;
       }
      }

      ngOnInit() {
        if ( this.username != null ) {
          console.log('Vérifier user: ' + this.username);
          this.etudiantService
              .getEtudiantByUsername(this.username)
              .subscribe( data => {
                  this.notifications = data.notifications;
                  if ( data.bac == null ) {
                    console.log('Vérifier bac: ' + data.bac);
                    this.notificationService
                        .createNotification( data.id, 'Vous devez ajouter votre diplôme du BAC pour id: ' + data.id )
                        .subscribe( notif => {
                            console.log(notif);
                            if ( notif != null ) {
                              this.etudiantService
                              .ajouterNotificationAUnEtudiant(data.id, notif.id)
                              .subscribe( n => console.log(n), error => console.error(error) );
                            }
                                    }, error => console.error(error));
                  }

                  if ( data.diplomes.length === 0 ) {
                    this.notificationService
                        .createNotification( data.id, 'Vous devez ajouter votre diplôme de la licence id: ' + data.id )
                        .subscribe( notif => {
                            console.log(notif);
                            if (notif != null) {
                                    this.etudiantService
                                        .ajouterNotificationAUnEtudiant(data.id, notif.id)
                                        .subscribe( n => console.log(n), error => console.error(error) );
                                 }
                                }, error => console.error(error));
                              }

                  if ( data.certificats.length === 0 ) {
                    this.notificationService
                        .createNotification( data.id, 'Vous n\'avez aucun certificat  id: ' + data.id )
                        .subscribe( notif => {
                          console.log(notif);
                          if (notif != null) {
                            this.etudiantService
                                .ajouterNotificationAUnEtudiant(data.id, notif.id)
                                .subscribe( n => console.log(n), error => console.error(error) );}
                                    }, error => console.error(error));
                                  }

                  if ( data.formations.length === 0 ) {
                    this.notificationService
                        .createNotification( data.id, 'Vous n\'avez aucun formation  id: ' + data.id )
                        .subscribe( notif => {
                          console.log(notif);
                          if (notif != null) {
                            this.etudiantService
                                .ajouterNotificationAUnEtudiant(data.id, notif.id)
                                .subscribe( n => console.log(n), error => console.error(error) );}
                                      }, error => console.error(error));
                  }

                  if ( data.distinctions.length === 0 ) {
                    this.notificationService
                        .createNotification( data.id, 'Vous n\'avez aucun distinction  id: ' + data.id )
                        .subscribe( notif => {
                          console.log(notif);
                          if (notif != null) {
                            this.etudiantService
                                .ajouterNotificationAUnEtudiant(data.id, notif.id)
                                .subscribe( n => console.log(n), error => console.error(error) );}
                                      }, error => console.error(error));
                  }




                  if ( data.stageExperiences.length === 0 ) {
                    this.notificationService
                      .createNotification( data.id, 'Vous n\'avez aucun stage ou expérience profession professionnel  id: ' + data.id )
                      .subscribe( notif => {
                        console.log(notif);
                                      if (notif != null) {
                                        this.etudiantService
                                            .ajouterNotificationAUnEtudiant(data.id, notif.id)
                                            .subscribe( n => console.log(n), error => console.error(error) );}}, error => console.error(error));
                      }




                  this.notifications
                      .forEach (
                        notification => {
                          if ( data.bac != null
                               && notification.message.indexOf('Vous devez ajouter votre diplôme du BAC pour id: ' + data.id) >= 0 ) {
                              this.notificationService
                                  .deleteNotification(notification.id, data.id )
                                  .subscribe( notif => console.log(notif), error => console.error(error));
                          }
                          if ( data.diplomes.length > 0
                               && notification.message.indexOf('Vous devez ajouter votre diplôme de la licence id: ' + data.id) >= 0 ) {
                                this.notificationService
                                    .deleteNotification(notification.id, data.id )
                                    .subscribe( notif => console.log(notif), error => console.error(error));
                          }

                          if ( data.certificats.length > 0
                            && notification.message.indexOf('Vous n\'avez aucun certificat  id: ' + data.id) >= 0 ) {
                             this.notificationService
                                 .deleteNotification(notification.id, data.id )
                                 .subscribe( notif => console.log(notif), error => console.error(error));
                            }
                          if ( data.formations.length > 0
                              && notification.message.indexOf('Vous n\'avez aucun formation  id: ' + data.id) >= 0 ) {
                               this.notificationService
                                   .deleteNotification(notification.id, data.id )
                                   .subscribe( notif => console.log(notif), error => console.error(error));
                          }

                          if ( data.distinctions.length > 0
                            && notification.message.indexOf('Vous n\'avez aucun distinction  id: ' + data.id) >= 0 ) {
                             this.notificationService
                                 .deleteNotification(notification.id, data.id )
                                 .subscribe( notif => console.log(notif), error => console.error(error));
                          }

                          if ( data.stageExperiences.length > 0
                             && notification.message.indexOf('Vous n\'avez aucun stage ou expérience profession professionnel  id: ' + data.id) >= 0 ) {
                            this.notificationService
                               .deleteNotification(notification.id, data.id )
                               .subscribe( notif => console.log(notif), error => console.error(error));
                          }



                        } );
                  this.etudiant = data;
                  console.log('voir: ', this.etudiant);
                  this.notifications = this.etudiant.notifications;
                  console.log( 'Id Etudiant: ' + this.etudiant.id );
        }, error => console.log(error) );
      }
  }

  open() {
    (!this.isOpen) ? this.isOpen = true : this.isOpen = false;
  }


}
