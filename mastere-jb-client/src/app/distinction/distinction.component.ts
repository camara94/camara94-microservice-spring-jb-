import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { Router } from '@angular/router';
import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { DistinctionService } from './../service/distinction.service';
import { Distinction } from './../shared/distinction';
import { Etudiant } from './../shared/etudiant';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-distinction',
  templateUrl: './distinction.component.html',
  styleUrls: ['./distinction.component.scss']
})
export class DistinctionComponent implements OnInit {

  username: string;
  etudiant: Etudiant;
  distinction: Distinction
  scrool: boolean = false;
  modaldistinction: Distinction;
  distinctionp: Distinction;

  url: string;

  constructor(
    private distinctionService: DistinctionService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private router: Router,
    public dialogRef: MatDialogRef<DistinctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }


  ngOnInit() {

    this.username = this.authenticationService.getTokenParsed().preferred_username;

    this.etudiantService
        .getEtudiantByUsername( this.username )
        .subscribe( data => this.etudiant = data, error => console.error( error ) );

    console.log( this.etudiant );
  }

  getDistinctionModal(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.distinctions.forEach((dist, index) => {
            if (dist.id === id) {
              this.modaldistinction = dist;
              console.log('dip: ', this.modaldistinction);
            }
        }, error => console.error( error ) );
      });
  }

  getDistinctionPrint(id: number) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {
          data.distinctions.forEach((dist, index) => {
            if (dist.id === id) {
              this.distinctionp = dist;
              console.log('dip: ', this.distinctionp);
            }
        }, error => console.error( error ) );
      });
  }

  deleteDistinction(idDistinction: number, idEtudiant: string) {
    this.distinctionService
        .deleteDistinction(idDistinction, idEtudiant)
        .subscribe( data => console.log(data), error => console.error(error));

    setTimeout(() => {
      this.scrool = true;
      this.ngOnInit();
    }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/distinction']);
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
