import { FileService } from './../service/file.service';
import { FormationService } from './../service/formation.service';
import { Formation } from './../shared/formation';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {

  formationForm: FormGroup;
  formation: Formation;
  id: string;

  selectedFile: File;
  idEtudiant: string;

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

  typeDurees: string[];

  constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private formationService: FormationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fileService: FileService) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username)
          .subscribe( data => this.id = data.id, error => console.error( error ) );
      this.createForm();
     }

  ngOnInit() {
    this.typeDurees = [ 'heures', 'jours', 'mois', 'années' ];
    this.idEtudiant = this.id;
  }

  createForm() {

    this.formationForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      plateforme: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      duree: [0, [ Validators.required, Validators.min(1)] ],
      dateDebut: '',
      dateFin: '',
      typeDuree: '',
      url: ''
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
    console.log(this.formation);
    this.formationForm.reset({
      titre: '',
      plateforme: '',
      duree: 0,
      dateDebut: '',
      dateFin: '',
      typeDuree: '',
      url: ''
    });
   this.formationFormDirective.resetForm();
  }

  ajouter() {
    console.log(
      ' taille dipômes: ' + this.formation);

      console.log(" diplome: " + this.idEtudiant);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(data => {

        setTimeout(() => {
          this.formationService.createFormations(
            {
              'typeDuree': this.formation.typeDuree,
              'titre': this.formation.titre,
              'plateforme': this.formation.plateforme,
              'dateDebut': this.formation.dateDebut,
              'dateFin': this.formation.dateFin,
              'duree': this.formation.duree,
              'file': data.name
            } as Formation
          )
              .subscribe( data => {console.log("pourquoi ", data);
              //insert un diplôme
              this.etudiantService
              .ajouterFormationsAUnEtudiant(this.id, data.id)
              .subscribe(data=>{console.log(data)}, error=>console.error(error));
            },
              error => console.error(error));
            }, 900);

        setTimeout(() => {
          this.ngOnInit();
          this.router.navigate(['/profile']);
        }, 1000);
  });

  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

}
