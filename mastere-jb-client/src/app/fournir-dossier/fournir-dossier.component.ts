import { KeycloakSecurityService } from './../service/keycloak-security.service';
import { FileService } from './../service/file.service';
import { EtablissementService } from './../service/etablissement.service';
import { Etablissement } from './../shared/etablissement';
import { AuthenticationService } from './../service/authentication.service';
import { EtudiantService } from './../service/etudiant.service';
import { AnneeUniversitaireService } from './../service/annee-universitaire.service';
import { DiplomeService } from './../service/diplome.service';
import { FormationService } from './../service/formation.service';
import { Formation } from './../shared/formation';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Diplome } from './../shared/diplome';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileValidator } from 'ngx-material-file-input';






@Component({
  selector: 'app-fournir-dossier',
  templateUrl: './fournir-dossier.component.html',
  styleUrls: ['./fournir-dossier.component.css']
})
export class FournirDossierComponent implements OnInit {

  diplomeForm: FormGroup;
  diplome: Diplome;
  diplome1: Diplome;
  diplomeEnregistrer: Diplome;


  anneeUniversitaires: FormArray;
  anneeUniversitaireArrays: AnneeUniversitaire[];
  tableauxReleve: AnneeUniversitaire[];
  nombreAnneeUniversitaire: Array<number>;

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
      'pattern':     'par exemple: 2020-2021',
    }
  };

  selectedFile: File;


  AnneeErrors = {
    'titre': '',
    'moyenne': 0,
    'annee': '',
    'url': ''
  };

  AnneeMessages = {
    'titre': {
      'required':  'est requis.',
      'minlength': 'être plus que 2 caractères.',
      'maxlength': 'doit pas être plus que 150 caractères.'
    },
    'moyenne': {
      'required':  'La moyenne est requise.',
      'min':       'La moyenne est  doit être supérieur ou égale à Zéro (0)',
      'max':       'La moyenne est  doit être inférieur ou égale à vingt (20)'
    },
    'annee': {
      'required':  'est requise.',
      'pattern': 'par exemple: 2020-2021',
    }
  };


  // initialiser le formulaire
  titre: string
  etablissement: string;
  nbreAnneeUniversitaire: number;
  annee: string;
  url: string;
  anneePattern: string = "^[1-2][0-9]{3}$";
  autre: string;


  scrool = false;
  remplirCursus: boolean;
  nombreDAnnee: number;
  id: string;
  nombreAnnee: number;

  etablissements: Etablissement[];
  etabError: any;

  etabExist: boolean;
  selectedFiles: File[] = [];

  etablissementId: number;
  sessions: Array<string>;


   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private router: Router,
    private fileService: FileService,
    ) {
      this.createForm();
      this.nombreAnneeUniversitaire = [1, 2, 3, 4, 5];
      this.sessions = ['Session Principle', 'Session Ratrapage'];
      this.nombreAnnee = 0;
      this.remplirCursus = false;
      this.etabExist = false;
     }


  ngOnInit() {

    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => this.id = data.id, error => console.error( error) );

    this.etablissementService
        .getEtablissements()
        .subscribe(
            data => this.etablissements = data,
            errmess => this.etabError = errmess
        );
    this.initialValue();
  }

  createForm() {

    this.diplomeForm = this.formBuilder.group({
      titre: [this.titre,  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      etablissement: 0,
      nbreAnneeUniversitaire: 0,
      annee: [this.annee, [ Validators.required, Validators.pattern(this.anneePattern) ] ],
      url: '',
      anneeUniversitaires: this.formBuilder.array([]),
      autre: this.autre
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
    this.anneeUniversitaireArrays = this.diplome.anneeUniversitaires;
    this.ajouter(this.anneeUniversitaireArrays);
    console.log(" ou ça: ", this.diplome.anneeUniversitaires);
    this.diplomeForm.reset({
      titre: '',
      etablissement: 0,
      nbreAnneeUniversitaire: 0,
      annee: '',
      file: '',
      AnneeUniversitaire: null,
      autre: ''
    });
    this.diplomeFormDirective.resetForm();
  }



  createAnneeUniversitaire(): FormGroup {
    return this.formBuilder.group({
        titre: '',
        moyenne: 0,
        annee: '',
        session: '',
        url: '',
        autre: ''
      });
  }

  addAnneeUniversitaire(): void {
    this.anneeUniversitaires = this.diplomeForm.get('anneeUniversitaires') as FormArray;
    this.anneeUniversitaires.push( this.createAnneeUniversitaire() );
  }


  nombreAnneeUniversite(index: number) {
    this.initialValue();
    this.createForm();
    console.log( 'url: ',  this.diplomeForm.value);
    this.anneeUniversitaires = this.diplomeForm.get( 'anneeUniversitaires' ) as FormArray;
   // this.anneeUniversitaires = this.formBuilder.array([]);
    /*for ( let i = 0; i < this.anneeUniversitaires.length; i++ ) {
      this.removeAnneeUniversitaire( i );
      // this.anneeUniversitaires.removeAt(i);
    }*/


    for ( let j = 0; j < index; j++ ) {
     // this.anneeUniversitaires.push(this.createAnneeUniversitaire());
      this.addAnneeUniversitaire();
    }

    this.nombreAnnee = index;
  }



  removeAnneeUniversitaire(index: number): void {
    this.anneeUniversitaires = this.diplomeForm.get('anneeUniversitaires') as FormArray;
    this.anneeUniversitaires.removeAt(index);
    this.nombreAnnee = this.anneeUniversitaires.length;
  }

  initialValue() {
    this.titre = this.diplomeForm.value.titre;
    if (this.diplomeForm.value.etablissement > 0) {
      this.etablissement = this.diplomeForm.value.etablissement;
    } else {
      this.autre = this.diplomeForm.value.autre;
    }
    this.nbreAnneeUniversitaire = this.nombreAnnee;
    this.annee = this.diplomeForm.value.annee;
    this.url = this.diplomeForm.value.url._fileNames;
  }

  addMoyenneToDiplome(idDiplome: number, anneeUniversitaire: AnneeUniversitaire, file: File) {
    let formData = new FormData();
    formData.append( 'file', file);
    this.fileService
        .createfiles(formData)
        .subscribe( fi => {
          this.anneeUniversitaireService
              .createAnneeUniversitaires(anneeUniversitaire)
              .subscribe(data => {
                this.diplomeService
                    .ajouterAnneeUniversitairesAUnDiplome(+idDiplome, +data.id)
                    .subscribe(reponse => {
                      console.log(reponse);
                    },
                    error => {
                      console.error(error);
                    });
        });
        }, error => console.error(error) );
  }


  addDiplomeWithEtudiant(idEtudiant: string, diplome: Diplome, arrays: AnneeUniversitaire[], files: File[]) {
    setTimeout(() => {
      this.scrool = true;
      this.anneeUniversitaireArrays = diplome.anneeUniversitaires;

      let formData = new FormData();
      formData.append( 'file', files[0] );
      this.fileService
          .createfiles(formData)
          .subscribe( fi => {
            this.diplomeService
                .createDiplomes(idEtudiant, diplome)
                .subscribe(data => {
                  this.diplomeEnregistrer = diplome;
                  //insert un diplôme
                  this.etudiantService
                      .ajouterDiplomesAUnEtudiant(idEtudiant, data.id)
                      .subscribe( diplome => {
                          //Pour parcourir le tableau des rélévés de note et ajouter au diplome
                          arrays.forEach( (releve, index) => {
                               this.addMoyenneToDiplome(diplome.id, releve, this.selectedFiles[(index + 1)]);
                            });
                         /* for ( let i = 0; i <= arrays.length; i++ ) {
                            this.addMoyenneToDiplome(diplome.id, arrays[i], this.selectedFiles[(i + 1)]);
                          }*/

                          },
                        error => console.error(error));
                    },
                      error => console.error(error));
          } );
    }, 1000);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/profile']);
    }, 3500);

    //this.anneeUniversitaires = this.diplomeForm.value.anneeUniversitaires;
    this.anneeUniversitaireArrays = diplome.anneeUniversitaires;
    console.log("Je suis : ", this.diplome);
  }



  ajouter(arrays: AnneeUniversitaire[]) {

    let i = 0;

    let formData = new FormData();
    formData.append('file', this.selectedFiles[0]);

    let formaDatas: FormData[] = [];
    this.selectedFiles
        .forEach( ( f, index ) => {
            let formData = new FormData();
            formData.append('file', f);
            formaDatas.push( formData );

            if ( index >= 1 ) {
              arrays[i].file = f.name;
              i++;
            }
        } );

    console.log(
      ' taille dipômes: ' + this.diplomeForm.value.autre + " boolean: " + this.etabExist);
    this.diplome1 = {
      'titre': this.diplomeForm.value.titre as string,
      'annee': this.diplomeForm.value.annee as string,
      'file': '',
      'anneeUniversitaires': this.diplomeForm.value.AnneeUniversitaire
    } as Diplome;
    if (this.etabExist === false) {
      this.addDiplomeWithEtudiant(
        this.id,
        {
          'titre': this.diplomeForm.value.titre as string,
          'annee': this.diplomeForm.value.annee as string,
          'file': this.selectedFiles[0].name,
        } as Diplome,
        arrays,
        this.selectedFiles
      );
    }

    if (this.etabExist === true) {
      console.log(
        ' taille dipômes 2: ', this.diplomeForm.value);

      this.etablissementService
          .createEtablissements({'nom': this.diplomeForm.value.autre as string } as Etablissement)
          .subscribe(data => {
            this.etablissementId = data.id;
           },
           error => console.error(error));

      setTimeout(() => {
            this.addDiplomeWithEtudiant(this.id, this.diplome1, arrays, this.selectedFiles);
          }, 1500);
    }
  }


  activeEtabExist() {
    this.etabExist = true;
    console.log("boolean: " + this.etabExist);
  }


  fileChanged(event) {
   // this.selectedFiles = [];
    this.selectedFiles.push(event.target.files[0]);
    console.log("Tableau des fichiers: ", this.selectedFiles);
  }
}
