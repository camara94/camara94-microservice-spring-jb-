import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { Formation } from './../shared/formation';
import { Etudiant } from './../shared/etudiant';
import { Router } from '@angular/router';
import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { FormationService } from './../service/formation.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  username: string;
  etudiant: Etudiant;
  formation: Formation;
  scrool: boolean = false;
  modalFormation: Formation;
  formationp: Formation;
  url: string;

  constructor(
    private formationService: FormationService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.username = this.authenticationService.getTokenParsed().preferred_username;
    console.log(this.username);
    this.etudiantService
        .getEtudiantByUsername( this.username )
        .subscribe( data => {this.etudiant = data; console.log(this.etudiant); }, error => console.error( error ) );

    console.log( this.etudiant );

  }

  getFormationModal(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.formations.forEach((forma, index) => {
            if (forma.id === id) {
              this.modalFormation = forma;
              console.log('dip: ', this.modalFormation);
            }
        }, error => console.error( error ) );
      });
  }

  getFormationPrint(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.formations.forEach((formation, index) => {
            if (formation.id === id) {
              this.formationp = formation;
              console.log('dip: ', this.formationp);
            }
        }, error => console.error( error ) );
      });
  }

  deleteFormation(idFormation: number, idEtudiant: string) {
    console.log("idFormation: " + idFormation + " idEtudiant: " + idEtudiant);
    this.formationService
        .deleteFormation(idFormation, idEtudiant)
        .subscribe( data => console.log(data), error => console.error(error));

    setTimeout(() => {
      this.scrool = true;
      this.ngOnInit();
    }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/formation']);
    }, 1000);
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
  }


}
