import { FileService } from './../service/file.service';
import { Formation } from './../shared/formation';
import { FormationService } from './../service/formation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { EtudiantService } from './../service/etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.css']
})
export class UpdateFormationComponent implements OnInit {

  formationForm: FormGroup;
  formation: Formation;
  id: string;
  idFormation: number;
  scrool: boolean = false;
  formation1: Formation;

  @ViewChild('fform', {static: false}) formationFormDirective;

  formErrors = {
    'titre': '',
    'plateforme': '',
    'duree': 0,
    'dateDebut': ''
  };

  validationMessages = {
    'titre': {
      'required':      'Le Titre est requis.',
      'minlength':     'Le Titre ne doit pas être moins que 4 caractères.',
      'maxlength':     'Le Titre ne doit pas être plus que 150 caractères.'
    },
    'plateforme': {
      'required':      'La Plateforme est requise.',
      'minlength':     'La Plateforme ne doit pas être moins que 4 caractères.',
      'maxlength':     'La Plateforme ne doit pas être plus que 150 caractères.'
    },
    'duree': {
      'required':      'La durée de la formation est requise.',
      'min':           'La durée de la formation pas être supérieur à zéro (0) .'
    }
  };

  selectedFile: File;

  typeDurees: string[];


  patterns: string = "^[0-9]{2}[\/\-]{1}[0-9]{2}[\/\-]{1}[0-9]{4}$";
  regex = new RegExp(this.patterns);

  constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private formationService: FormationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _adapter: DateAdapter<any>,
    private fileService: FileService
    ) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.id = data.id, error => console.error(error) );
      this.createForm();
     }

  ngOnInit() {
    this.typeDurees = [ 'heures', 'jours', 'mois', 'années' ];
    console.log('Rex: ' + this.regex.test("10/10/1994"));

    //Ici pour convertir la date en français avec datepicker de material
    this._adapter.setLocale('fr');

    this.idFormation = +this.route.snapshot.params['id'];
    this.formationService
        .getFormationById(this.idFormation)
        .subscribe(data => this.formation1 = data, error => console.error(error));
  }

  createForm() {

    this.formationForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      plateforme: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      duree: [0, [ Validators.required, Validators.min(1)] ],
      dateDebut: '',
      dateFin: '',
      typeDuree: '',
      file: ''
    });
    this.formationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.formationForm) { return; }
    const form = this.formationForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.formation = this.formationForm.value;
    this.formation.file = this.selectedFile.name;
    this.update( this.formation );
    console.log(this.formation);
    this.formationForm.reset({
      titre: '',
      plateforme: '',
      duree: '',
      date: 0,
      file: '',
      typeDuree: ''
    });
   this.formationFormDirective.resetForm();
  }

  update(formation: Formation) {
    console.log(
      'formation: ', formation);
    console.log('id: ' + this.idFormation);

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(fi => {

          this.formationService
              .updateFormation(
                                this.idFormation,
                                formation
                              )
              .subscribe( data => this.formation = data, error => console.error(error));
            },
            error => console.error( error ));

    setTimeout(() => {
      this.router.navigate(['/profile']);
      this.scrool = true;
    }, 1000);

  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
