import { MastereEtudiantService } from './../service/mastere-etudiant.service';
import { StageExperienceService } from './../service/stage-experience.service';
import { CertificatService } from './../service/certificat.service';
import { DistinctionService } from './../service/distinction.service';
import { BacService } from './../service/bac.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormationService } from './../service/formation.service';
import { DiplomeService } from './../service/diplome.service';
import { AnneeUniversitaireService } from './../service/annee-universitaire.service';
import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { StageExperience } from './../shared/stageExperience';
import { Bac } from './../shared/bac';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Certificat } from './../shared/certificat';
import { Diplome } from './../shared/diplome';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Etudiant } from '../shared/etudiant';
import { Formation } from '../shared/formation';
import { Distinction } from '../shared/distinction';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  etudiant: Etudiant;
  id: number;
  selectedDiplome: Diplome;
  diplome: Diplome;

  modalDiplome: Diplome;
  formationModal: Formation;
  certificatModal: Certificat;

  releves: AnneeUniversitaire[];
  releveModal: AnneeUniversitaire;
  releverMessage: string = null;
  releveError: any;

  scrool: boolean = false;
  idBac: number;
  bacModal: Bac;
  distinctionModal: Distinction;
  stageExperienceModal: StageExperience;
  score: number;
  url: string;
  donnee: any;

  constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private diplomeService: DiplomeService,
    private formationService: FormationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bacService: BacService,
    private distinctionService: DistinctionService,
    private certificatService: CertificatService,
    private stageExperienceService: StageExperienceService,
    private mastereEtudiantService: MastereEtudiantService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    @Inject('baseURL') public baseURL
    ) {}

  ngOnInit() {

    console.log('Etudiant Id: ' + this.id);

    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe(data => {
          this.etudiant = data;
          console.log(this.etudiant);


          this.mastereEtudiantService
              .getMastereEtudiants()
              .subscribe( d => {
                 d.forEach( me => {
                  if ( me.id.etudiantId === data.id ) {
                    this.score = me.score;
                    console.log("==score: " + this.score);
                  }
                 } );
              }, error => console.error(error) );

        }, error => {console.log(error); });

    console.log("Etudiant: ", this.etudiant);
    this.anneeUniversitaireService
        .getAnneeUniversitaires()
        .subscribe( data => {
          this.releves = data;
        }, error => {
          console.error(error);
        });
  }

  onSelect(diplome: Diplome) {
    this.selectedDiplome = diplome;
  }

  openDialog(url: string): void {
    const dialogRef = this.dialog.open( VoirJustificatifComponent , {
      width: '50%',
      position: { left: '15%'  },
      data: { url: 'assets/uploads/' + url}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.url = result;
    });
  }

  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }

  getReleveModal(id: number) {
    this.releves.forEach((releve, index) => {
      if ( releve.id === id ) {
        this.releveModal = releve;
        console.log('dip: ', this.releveModal);
      }
    });
  }

  getFormationModal(idFormation: number) {
    /*this.etudiant.formations.forEach((form, index) => {
      if ( form.id === idFormation ) {
        this.formationModal = form;
        console.log('dip: ', this.formationModal);
      }
    });*/

   this.formationService
        .getFormationById(idFormation)
        .subscribe(data => this.formationModal = data, error => console.error(error));
  }

  getBacModal(idBac: number) {
     this.bacService
          .getBacById(idBac)
          .subscribe(data => this.bacModal = data, error => console.error(error));
  }

  getDistinctionModal(idDistinction: number) {
    this.distinctionService
         .getDistinctionById(idDistinction)
         .subscribe(data => this.distinctionModal = data, error => console.error(error));
   }

   getCertificatModal(idCertif: number) {
    this.certificatService
         .getCertificatById(idCertif)
         .subscribe(data => this.certificatModal = data, error => console.error(error));
   }

   getStageExperienceModal(idStage: number) {
    this.stageExperienceService
         .getStageExperienceById(idStage)
         .subscribe(data => this.stageExperienceModal = data, error => console.error(error));
   }

  deleteDiplome(idDiplome: number, etudiantId: string) {

    this.etudiant.diplomes.forEach((dip, index) => {
      if (dip.id === idDiplome) {
        this.modalDiplome = dip;
        console.log('dip: ', this.modalDiplome);
        this.diplomeService
                .deleteDiplome(dip.id, etudiantId)
                .subscribe(
                  data => { console.log(data); }
                );
      }

    });
  }
}
