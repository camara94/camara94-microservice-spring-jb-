import { Reponse } from './../shared/Reponse';
import { VariablesGlobales } from './../shared/variableGlobale';
import { EtablissementService } from './../service/etablissement.service';
import { Notification } from './../shared/notification';
import { NotificationService } from './../service/notification.service';
import { AppelALaCandidature } from './../shared/appelALaCandidature';
import { AppelALaCandidatureService } from './../service/appel-a-la-candidature.service';
import { MastereEtudiantService } from './../service/mastere-etudiant.service';
import { MastereService } from './../service/mastere.service';
import { Mastere } from './../shared/mastere';
import { EtudiantService } from './../service/etudiant.service';
import { Etablissement } from './../shared/etablissement';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Etudiant } from '../shared/etudiant';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { InscriptionModalComponent } from '../inscription-modal/inscription-modal.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  etablissements: Etablissement[];
  etablissementAppelALaCandidatures: Etablissement[] = [];
  etablissement: Etablissement = null;
  etabErrMess: string;

  @Input()
  ngSwitch: any
  message: Reponse;
  etudError: string;
  //username: string;
  etudiants: Etudiant[];
  masteres: Mastere[];
  mastere: Mastere;
  public etudiant: Etudiant;
  dejaInscrit: boolean = false;
  appelALaCandidatures: AppelALaCandidature[];
  appelALaCandidaturesUnique = new Set([]);
  public notifications: Notification[];
  @Input() username: string;
  messageInscription: string;

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    public dialog: MatDialog,
    private mastereService: MastereService,
    private etablissementService: EtablissementService,
    private etudiantService: EtudiantService,
    private mastereEtudiantService: MastereEtudiantService,
    private appelALaCandidatureService: AppelALaCandidatureService,
    public notificationService: NotificationService,
    public authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private variablesGlobales: VariablesGlobales
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
              this.etudiant = data;
              this.notifications = this.etudiant.notifications;
    }, error => console.log(error) );
  }

    this.etablissementService
        .getEtablissements()
        .subscribe(
            response => this.etablissements = response,
            errmess => this.etabErrMess = <any>errmess
           );
    setTimeout( () => {
            this.getUnEtablissement( 0 );
      } , 900);

    this.appelALaCandidatureService
           .getAppelALaCandidatures()
           .subscribe( data => this.appelALaCandidatures = data, error => console.error(error) );

    this.mastereService
        .getMasteres()
        .subscribe(
            data => {
              data.forEach((mastere, index) => {
                mastere.etudiants.forEach((e, i) => {
              });
                this.masteres = data;
            });
          },
            error => { console.error(error); }
    );

  }

  getUnEtablissement = (index: number) => this.etablissement = this.etablissements[index];

  getMastere = ( mastere: Mastere ) => {
    this.mastere = mastere;
    mastere.etudiants.forEach( (me, i) => {
      if ( me.id.etudiantId === this.etudiant.id
           && me.id.mastereId === this.etudiant.masteres.find( m => m.id.mastereId === me.id.mastereId ).id.mastereId
           && me.anneeUniversitaire === this.etudiant.masteres.find( m => m.id.mastereId === me.id.mastereId ).anneeUniversitaire
         ) {
         this.dejaInscrit = true;
        }
    });
    console.log('déjà inscrit: ' + this.dejaInscrit);
    return this.dejaInscrit;
  }

  inscrireMastere(idMastere: number, idEtudiant: string, annee: string) {
    console.log(idEtudiant);
    this.mastereEtudiantService
        .createMastereEtudiant(idMastere, idEtudiant, annee)
        .subscribe( data => { this.openDialog(data); console.log(data); }, err => console.error(err) );
  }

  getAnneeByMasetereId = ( id: number ) => this.appelALaCandidatures.filter( appel => appel.mastereId === id )[0];

  openDialog(rep: Reponse): void {
    const dialogRef = this.dialog.open( InscriptionModalComponent , {
      width: '50%',
      height: '30%',
      position: { left: '15%', right: '15%' },
      data: { reponse: rep}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.message = result;
    });
    //console.log('voir etudiant --- ', this.message);
  }


}
