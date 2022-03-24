import { ActivatedRoute, Router } from '@angular/router';
import { AppelALaCandidatureService } from './../service/appel-a-la-candidature.service';
import { MastereService } from './../service/mastere.service';
import { EtablissementService } from './../service/etablissement.service';
import { Mastere } from './../shared/mastere';
import { AppelALaCandidature } from './../shared/appelALaCandidature';
import { Component, OnInit} from '@angular/core';
import { Etablissement } from './../shared/etablissement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-appel-a-la-candidature',
  templateUrl: './appel-a-la-candidature.component.html',
  styleUrls: ['./appel-a-la-candidature.component.scss']
})
export class AppelALaCandidatureComponent implements OnInit {

  appelForm: FormGroup;
  etablissements: Etablissement[];
  etablissement: Etablissement = null;
  masteres: Mastere[];
  chargement: boolean = false;
  appelALaCandidature: AppelALaCandidature;
  constructor(
              private etablissementService: EtablissementService,
              private mastereService: MastereService,
              private fb: FormBuilder,
              private appelALaCandidatureService: AppelALaCandidatureService,
              private router: Router
  ) {
    this.createForm();
   }

  ngOnInit() {
    this.etablissementService
        .getEtablissements()
        .subscribe( data => this.etablissements = data, error => console.error( error ) );

    this.mastereService
        .getMasteres()
        .subscribe( data => this.masteres = data, error => console.error( error ) );
  }

  createForm() {
    this.appelForm = this.fb.group(
      {
        'etablissementId': 0,
        'mastereId': 0,
        'anneeUniversitaire': ''
    });
  }

  onSubmit() {

    let appel: AppelALaCandidature;
    appel = this.appelForm.value;
    if ( appel.etablissementId !== 0 && appel.mastereId !== 0 && appel.anneeUniversitaire !== null ) {
      console.log( this.appelForm.value );
      this.createAppelALaCandidature( this.appelForm.value as AppelALaCandidature );
    }
  }

  selectedEtablissement( id: number ): void {
    this.etablissements
        .forEach( etab => {
          if ( etab.id === id ) {
            this.etablissement = etab;
          }
        } );
  }

  createAppelALaCandidature( appelALaCandidature: AppelALaCandidature ) {
    this.appelALaCandidatureService
        .createAppelALaCandidature( appelALaCandidature )
        .subscribe( data => this.appelALaCandidature = data, error => console.error(error) );
    this.chargement = true;
    setTimeout( () => {
      this.ngOnInit();
      this.router.navigate(['/appel']);
        }, 1000);
  }

}
