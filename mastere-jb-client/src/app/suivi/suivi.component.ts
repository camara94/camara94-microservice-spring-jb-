import { NotificationService } from './../service/notification.service';
import { AuthenticationService } from './../service/authentication.service';
import { Notification } from './../shared/notification';
import { EtudiantService } from './../service/etudiant.service';
import { MastereService } from './../service/mastere.service';
import { Component, OnInit } from '@angular/core';
import { MastereEtudiantService } from '../service/mastere-etudiant.service';
import { Etudiant } from '../shared/etudiant';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {

  username: string;
  etudiant: Etudiant;
  notifications: Notification[];
  certifpercent: number;
  distinctionpercent: number;
  diplomepercent: number;
  formationpercent: number;
  stagepercent: number;
  erreurValiderDossier: string;
  emailDossierValide: string = '';
  annuler: boolean = false;
  constructor(
    private mastereService: MastereService,
    private etudiantService: EtudiantService,
    private mastereEtudiantService: MastereEtudiantService,
    public notificationService: NotificationService,
    public authenticationService: AuthenticationService
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
              this.etudiant = data;
              this.notifications = this.etudiant.notifications;

              this.stagepercent = Math.round((100 * this.etudiant.stageExperiences.length) / 3);

              this.diplomepercent = Math.round((100 * this.etudiant.diplomes.length) / 3);

              this.formationpercent = Math.round((100 * this.etudiant.formations.length) / 3);

              this.distinctionpercent = Math.round((100 * this.etudiant.distinctions.length) / 3);

              this.certifpercent = Math.round(100 * this.etudiant.certificats.length / 3);
              console.log('pourcent: ' + this.certifpercent);
      }, error => console.log(error) );
    }
  }

  validerDossier  = (idEtudiant: string) => {
    this.etudiantService
                      .validerDossierEtudiant(idEtudiant)
                      .subscribe( data => this.emailDossierValide = data.email, error => this.erreurValiderDossier = error );
    this.ngOnInit();
  }

  annulerDossier = (idEtudiant: string) => {
    this.etudiantService
                      .annulerDossierEtudiant(idEtudiant)
                      .subscribe( data => {this.annuler = true; }, error => this.erreurValiderDossier = error );
    this.ngOnInit();
  }
}
