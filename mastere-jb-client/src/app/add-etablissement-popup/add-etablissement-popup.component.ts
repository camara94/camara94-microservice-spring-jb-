import { Etablissement } from './../shared/etablissement';
import { EtablissementService } from './../service/etablissement.service';
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-etablissement-popup',
  templateUrl: './add-etablissement-popup.component.html',
  styleUrls: ['./add-etablissement-popup.component.css']
})
export class AddEtablissementPopupComponent implements OnInit {

  etablissement = {nom: ''};
  errMess: string;

  constructor(public dialogRef: MatDialogRef<AddEtablissementPopupComponent>,
    private etablissementService: EtablissementService) { }

  ngOnInit() {
  }


  onSubmit() {
    console.log('Etablissement: ', this.etablissement.nom);
    this.etablissementService.createEtablissements({'nom': this.etablissement.nom as string, 'masteres': null, 'id':0} as Etablissement)
      .subscribe(res => {
        /*if (res.success) {
          this.dialogRef.close(res.success);
        } else {
          console.log(res);
        }*/
      },
      error => {
        console.log(error);
        this.errMess = error;
      });
  }


}
