import { KeycloakSecurityService } from './../service/keycloak-security.service';
import { AppelALaCandidature } from './../shared/appelALaCandidature';
import { AppelALaCandidatureService } from './../service/appel-a-la-candidature.service';
import { MastereEtudiantService } from './../service/mastere-etudiant.service';
import { MastereService } from './../service/mastere.service';
import { Mastere } from './../shared/mastere';
import { EtudiantService } from './../service/etudiant.service';
import { Etablissement } from './../shared/etablissement';
import { HttpClientService } from './../service/httpclient.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Etudiant } from '../shared/etudiant';





@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  etablissements: Etablissement[];
  etablissementAppelALaCandidatures: Etablissement[] = [];
  etablissement: Etablissement = null;
  etabErrMess: string;

  message: string;
  etudError: string;
  username: string;
  etudiants: Etudiant[];
  masteres: Mastere[];
  etudiant: Etudiant;
  dejaInscrit: boolean = false;
  appelALaCandidatures: AppelALaCandidature[];
  appelALaCandidaturesUnique = new Set([]);

  constructor(
    private mastereService: MastereService,
    private httpClientService: HttpClientService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private mastereEtudiantService: MastereEtudiantService,
    private appelALaCandidatureService: AppelALaCandidatureService,
    private securityService: KeycloakSecurityService
  ) {
      this.username = this.authenticationService
                          .getTokenParsed()
                          .preferred_username;
   }

  ngOnInit() {

    this.etudiantService
        .getEtudiantByUsername(this.username)
        .subscribe( data => { this.etudiant = data; console.log("voir: ", this.etudiant); }, error => console.log(error) );

    this.httpClientService
        .getEtablissements()
        .subscribe(
          response => this.handleSuccessfulResponse(response),
          errmess => this.etabErrMess = <any>errmess
         );

    this.appelALaCandidatureService
         .getAppelALaCandidatures()
         .subscribe( data => this.appelALaCandidatures = data, error => console.error(error) );

    setTimeout( () => {
        this.getEtablissements();
        this.appelALaCandidaturesUnique = new Set(this.etablissementAppelALaCandidatures);
      } , 2000);

    this.mastereService
          .getMasteres()
          .subscribe(
            data => {

            data.forEach((mastere, index) => {
              mastere.etudiants.forEach((e, i) => {

              });

            });
            console.log(data);
          },
          error => { console.error(error); }
          );
    console.log(this.handleSuccessfulResponse);
  }

  handleSuccessfulResponse( response ) {
      this.etablissements = response;
  }

  getUnEtablissement(index: number) {
    this.etablissement = this.etablissements[index];
  }

  getMastere = ( mastere: Mastere ) => {
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
        .subscribe( data => console.log(data), error => console.error(error) );
    this.ngOnInit();
  }

  getEtablissements = (  ) => {
    this.appelALaCandidatures
        .forEach( appel => {
           this.etablissementAppelALaCandidatures
               .push( this.etablissements.filter( et => et.id === appel.etablissementId )[0] );
        } );
  }

  getAnneeByMasetereId = ( id: number ) => this.appelALaCandidatures.filter( appel => appel.mastereId === id )[0];

}
