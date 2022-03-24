import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Router } from '@angular/router';
import { Diplome } from './../shared/diplome';
import { Etudiant } from './../shared/etudiant';
import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { DiplomeService } from './../service/diplome.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrls: ['./diplome.component.scss']
})
export class DiplomeComponent implements OnInit {

  username: string;
  scrool: boolean = false;
  etudiant: Etudiant;
  Diplome: Diplome;
  modalDiplome: Diplome;
  notes: AnneeUniversitaire[];
  diplomep: Diplome;
  url: string;

  constructor(
    private diplomeService: DiplomeService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.username = this.authenticationService.getTokenParsed().preferred_username;
    console.log(this.username);
    this.etudiantService
        .getEtudiantByUsername( this.username )
        .subscribe( data => { this.etudiant = data; console.log(this.etudiant); }, error => console.error( error ) );
    console.log( this.etudiant );
  }

  getDiplomeModal(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.diplomes.forEach((dip, index) => {
            if (dip.id === id) {
              this.modalDiplome = dip;
              console.log('dip: ', this.modalDiplome);
            }
        }, error => console.error( error ) );
      });
  }

  getDiplomeModalPrint(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.diplomes.forEach((dip, index) => {
            if (dip.id === id) {
              this.diplomep = dip;
              console.log('dip: ', this.modalDiplome);
            }
        }, error => console.error( error ) );
      });
  }

  deleteDiplome(idDiplome: number, idEtudiant: string) {
    console.log("idDiplôme: " + idDiplome + " idEtudiant: " + idEtudiant);
    this.diplomeService
        .deleteDiplome(idDiplome, idEtudiant)
        .subscribe( data => console.log(data), error => console.error(error));

    setTimeout(() => {
      this.scrool = true;
      this.ngOnInit();
    }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/diplome']);
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
