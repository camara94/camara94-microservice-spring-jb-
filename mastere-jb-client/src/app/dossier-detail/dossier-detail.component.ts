import { EnvoyerNoticationComponent } from './../envoyer-notication/envoyer-notication.component';
import { EtudiantService } from './../service/etudiant.service';
import { VoirJustificatifComponent } from './../voir-justificatif/voir-justificatif.component';
import { Etudiant } from './../shared/etudiant';
import { FileResponse } from './../shared/fileResponse';
import { FileService } from './../service/file.service';
import { baseURL } from './../shared/baseurl';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';


@Component({
  selector: 'app-dossier-detail',
  templateUrl: './dossier-detail.component.html',
  styleUrls: ['./dossier-detail.component.scss']
})
export class DossierDetailComponent implements OnInit {
  file: any;
  f: string;
  etudiant: Etudiant;
  url: string;
  constructor(
    public fileService: FileService,
    public dialog: MatDialog,
    private etudiantService: EtudiantService,
    public dialogRef: MatDialogRef<DossierDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    @Inject('baseURL') public baseURL) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  afficherImage(id: number) {
    //this.f = this.data.etudiant.formations[id].file;
  }

  getFile(fi: string): any {
    this.fileService
        .getFile(fi)
        .subscribe( data => { this.file = data; console.log('Data: ', data); }, error => console.error( error ) );
    return this.file;
  }

  openDialog(url: string): void {
    const dialogRef = this.dialog.open( VoirJustificatifComponent , {
      width: '90%',
      position: { left: '5%' },
      data: { url: 'assets/uploads/' + url}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.etudiant = result;
    });

    console.log('voir etudiant --- ', this.etudiant);
  }

  openDialogNotif( etudiant: Etudiant ): void {
    const dialogRef = this.dialog.open( EnvoyerNoticationComponent , {
      width: '60%',
      position: { left: '15%' },
      data: { etudiant: etudiant}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.etudiant = result;
    });

    console.log('voir etudiant --- ', this.etudiant);
  }

  getEtudiantById = ( id: string ): void =>  {
    this.etudiantService
        .getEtudiantById( id )
        .subscribe( etud => this.etudiant = etud, error => console.error( error ) );
  }

}
