import { FormationComponent } from './../formation/formation.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { Router } from '@angular/router';
import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Etudiant } from '../shared/etudiant';
import { Certificat } from '../shared/certificat';
import { CertificatService } from '../service/certificat.service';


@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  username: string;
  etudiant: Etudiant;
  certification: Certificat;
  scrool: boolean = false;
  modalCertification: Certificat;
  certificationp: Certificat;
  url: string;

  constructor(
    private certificatService: CertificatService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private router: Router,
    public dialogRef: MatDialogRef<FormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    @Inject('baseURL') public baseURL
  ) { }
  ngOnInit() {

    this.username = this.authenticationService.getTokenParsed().preferred_username

    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => this.etudiant = data, error => console.error( error ) );

    console.log( this.etudiant );
  }

  getCertificationModal(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.certificats.forEach((certif, index) => {
            if (certif.id === id) {
              this.modalCertification = certif;
              console.log('dip: ', this.modalCertification);
            }
        }, error => console.error( error ) );
      });
  }

  getCertificationPrint(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.certificats.forEach((certif, index) => {
            if (certif.id === id) {
              this.certificationp = certif;
              console.log('dip: ', this.certificationp);
            }
        }, error => console.error( error ) );
      });
  }

  deleteCertification(idCertification: number, idEtudiant: string) {
    console.log("idFormation: " + idCertification + " idEtudiant: " + idEtudiant);
    this.certificatService
        .deleteCertificat(idCertification, idEtudiant)
        .subscribe( data => console.log(data), error => console.error(error));

    setTimeout(() => {
      this.scrool = true;
      this.ngOnInit();
    }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/certification']);
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
    console.log('voir etudiant --- ', this.etudiant);
  }


}
