import { AnneeUniversitaireService } from './../service/annee-universitaire.service';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Etablissement } from './../shared/etablissement';
import { EtablissementService } from './../service/etablissement.service';
import { EtudiantService } from './../service/etudiant.service';
import { Diplome } from './../shared/diplome';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { DiplomeService } from './../service/diplome.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-diplome',
  templateUrl: './add-diplome.component.html',
  styleUrls: ['./add-diplome.component.css']
})
export class AddDiplomeComponent implements OnInit {

  diplomeForm: FormGroup;
  diplome: Diplome;
  diplomeEnregistrer: Diplome;
  @ViewChild('fform', {static: false}) diplomeFormDirective;


  formErrors = {
    'titre': '',
    'etablissement': 0,
    'nbreAnneeUniversitaire': 0,
    'annee': ''
  };

  validationMessages = {
    'titre': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    },
    'etablissement': {
      'required':      'L\'id de l\'établissement est requis.',
      'minlength':     'L\'id de l\'établissement  doit être supérieur à  Zéro (0)'
    },
    'nbreAnneeUniversitaire': {
      'required':      'est requis.',
      'min':           'supérieur ou égal à  Zéro (2) .',
      'max':           'inférieur ou égale à cing (5) .'
    },
    'annee': {
      'required':      'est requise.',
      'pattern':     'par exemple: 2020'
    }
  };

  anneePattern: string = "^[0-9]{4}$";

  scrool = false;
  remplirCursus: boolean;
  nombreDAnnee: number;
  id: string;

  etablissements: Etablissement[];
  etabError: any;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private router: Router) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.id = data.id, error => console.error(error) );
      this.createForm();
      this.nombreDAnnee = 0;
      this.remplirCursus = false;
     }

  ngOnInit() {
     this.etablissementService
         .getEtablissements()
         .subscribe(
            data => this.etablissements = data,
            errmess => this.etabError = <any>errmess
           );
  }

  createForm() {

    this.diplomeForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      etablissement: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(100)] ],
      nbreAnneeUniversitaire: [0, [ Validators.required, Validators.min(2), Validators.max(5)] ],
      annee: ['', [ Validators.required, Validators.pattern(this.anneePattern) ] ],
      url: ''
    });
    this.diplomeForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.diplomeForm) { return; }
    const form = this.diplomeForm;
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
    this.diplome = this.diplomeForm.value;
    console.log(this.diplome);
    this.diplomeForm.reset({
      titre: '',
      etablissement: 0,
      nbreAnneeUniversitaire: 0,
      annee: '',
      url: ''
    });
    this.diplomeFormDirective.resetForm();
  }

  ajouter() {
    console.log(
      ' taille dipômes: ' + this.diplome);

    this.addDiplomeWithEtudiant(
                                this.diplomeForm.value.etablissement,
                                {
                                  id: 0 as number,
                                  'titre': this.diplomeForm.value.titre as string,
                                  'annee': this.diplomeForm.value.annee as string,
                                  'file': '',
                                  'anneeUniversitaires': null
                                } as Diplome);
    this.ngOnInit();
  }

  addDiplomeWithEtudiant(idEtudiant: string, diplome: Diplome) {
    setTimeout(() => {
      this.scrool = true;
      this.diplomeService
          .createDiplomes(idEtudiant, diplome)
          .subscribe(data => {
            console.log( "pourquoi ", data);
            //insert un diplôme
            this.etudiantService
              .ajouterDiplomesAUnEtudiant(this.id, data.id)
              .subscribe( diplome => {
                this.diplomeEnregistrer = diplome;
                console.log(diplome); },
                error => console.error(error));
            },
              error => console.error(error));
            }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true
    }, 1000);
  }

  addMoyenneToDiplome(idDiplome: number, anneeUniversitaire: AnneeUniversitaire) {
    this.anneeUniversitaireService
        .createAnneeUniversitaires(anneeUniversitaire)
        .subscribe(data => {
          this.diplomeService
              .ajouterAnneeUniversitairesAUnDiplome(idDiplome, anneeUniversitaire.id)
              .subscribe(data => {
                console.log(data);
              },
              error => {
                console.error(error);
              });
        });
  }


}
