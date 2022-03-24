import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { Router } from '@angular/router';
import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { StageExperienceService } from './../service/stage-experience.service';
import { StageExperience } from './../shared/stageExperience';
import { Component, OnInit, Inject } from '@angular/core';
import { Etudiant } from '../shared/etudiant';

@Component({
  selector: 'app-stage-experience',
  templateUrl: './stage-experience.component.html',
  styleUrls: ['./stage-experience.component.scss']
})
export class StageExperienceComponent implements OnInit {
  username: string;
  etudiant: Etudiant;
  stageExperience: StageExperience;
  scrool: boolean = false;
  modalStageExperience: StageExperience;
  stageExperiencep: StageExperience;
  url: string;

  constructor(
    private stageExperienceService: StageExperienceService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    @Inject('baseURL') public baseURL
  ) { }

  ngOnInit() {

    this.username = this.authenticationService.getTokenParsed().preferred_username;

    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => this.etudiant = data, error => console.error( error ) );

    console.log( this.etudiant );
  }

  getStageExperienceModal(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.stageExperiences.forEach((se, index) => {
            if (se.id === id) {
              this.modalStageExperience = se;
              console.log('dip: ', this.modalStageExperience);
            }
        }, error => console.error( error ) );
      });
  }

  getStageExperiencePrint(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.stageExperiences.forEach((se, index) => {
            if (se.id === id) {
              this.stageExperiencep = se;
              console.log('dip: ', this.stageExperiencep);
            }
        }, error => console.error( error ) );
      });
  }

  deleteStageExperience(idStageExperience: number, idEtudiant: string) {
    console.log("idFormation: " + idStageExperience + " idEtudiant: " + idEtudiant);
    this.stageExperienceService
        .deleteStageExperience(idStageExperience, idEtudiant)
        .subscribe( data => console.log(data), error => console.error(error));

    setTimeout(() => {
      this.scrool = true;
    }, 3000);

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/stage-experience']);
    }, 4000);
    this.ngOnInit();
  }

  openDialog(url: string): void {
    const dialogRef = this.dialog.open( VoirJustificatifComponent , {
      width: '40%',
      position: { left: '15%' },
      data: { url: 'assets/uploads/' + url}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.url = result;
    });
    console.log('voir etudiant --- ', this.etudiant);
  }
}
