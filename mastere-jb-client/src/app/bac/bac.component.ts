import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Etudiant } from './../shared/etudiant';
import { Router } from '@angular/router';
import { BacService } from './../service/bac.service';
import { AuthenticationService } from './../service/authentication.service';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-bac',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.scss']
})
export class BacComponent implements OnInit {
  public etudiant: Etudiant;
  public et: Etudiant;
  username: string;
  scrool: boolean = false;
  url: string;
  constructor(
    private etudiantService: EtudiantService,
    private authenticationService: AuthenticationService,
    private bacService: BacService,
    private router: Router,
    public dialogRef: MatDialogRef<BacComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    @Inject('baseURL') public baseURL
  ) { }

  ngOnInit() {
    this.username = this.authenticationService.getTokenParsed().preferred_username;
    //console.log(this.username);
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {this.etudiant = data; console.log(this.etudiant)}, error => console.error( error ) );

    console.log( this.etudiant );

  }

  deleteBac(idBac: number, idEtudiant: string) {
    console.log("idBac: " + idBac + " idEtudiant: " + idEtudiant);
    this.bacService
        .deleteBac(idBac, idEtudiant)
        .subscribe( data => console.log(data), error => console.error(error));

    setTimeout(() => {
      this.scrool = true;
    }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.ngOnInit();
      this.router.navigate(['/bac']);
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
