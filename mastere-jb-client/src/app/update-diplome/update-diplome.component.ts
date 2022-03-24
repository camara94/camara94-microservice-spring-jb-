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
import { Router, ActivatedRoute } from '@angular/router';
import { FileValidator } from 'ngx-material-file-input';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-update-diplome',
  templateUrl: './update-diplome.component.html',
  styleUrls: ['./update-diplome.component.css']
})
export class UpdateDiplomeComponent implements OnInit {

  diplomeForm: FormGroup;
  diplome: Diplome;
  diplome1: Diplome;
  diplomeEnregistrer: Diplome;


  anneeUniversitaires: FormArray;
  anneeUniversitaireArrays: AnneeUniversitaire[];
  tableauxReleve: AnneeUniversitaire[];
  nombreAnneeUniversitaires: Array<number>;

  @ViewChild('fform', {static: false}) diplomeFormDirective;


  formErrors = {
    'titre': '',
    'etablissement': 0,
    'nombreAnneeUniversitaire': 0,
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
    'nombreAnneeUniversitaire': {
      'required':      'est requis.',
      'min':           'supérieur ou égal à  Zéro (2) .',
      'max':           'inférieur ou égale à cing (5) .'
    },
    'annee': {
      'required':      'est requise.',
      'pattern':     'par exemple: 2020',
    }
  };


  AnneeErrors = {
    'titre': '',
    'moyenne': 0,
    'annee': ''
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

  selectedFiles: File[] = [];


  //initialiser le formulaire
  titre: string
  etablissement: string;
  nbreAnneeUniversitaire: number;
  annee: string;
  file: string;
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


  etablissementId: number;

  idDiplome: number;
  sessions: Array<string>;
  diplomeCourant: Diplome;


   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.id = data.id, error => console.error( error ) );

      this.nombreAnneeUniversitaires = [1, 2, 3, 4, 5];
      this.nombreAnnee = 0;
      this.remplirCursus = false;
      this.etabExist = false;

      this.idDiplome = +this.route.snapshot.params.id;
      console.log('id : ' + this.idDiplome);
      this.sessions = ['Session Principle', 'Session Ratrapage'];

      this.diplomeService
      .getDiplomeById(this.idDiplome)
      .subscribe(
        data => {
          this.diplome1 = data;
          this.nombreAnneeUniversite( data.anneeUniversitaires.length, data.anneeUniversitaires ); },
        error => { console.error(error); }
      );
      this.createForm();
     }


  ngOnInit() {
    this.idDiplome = +this.route.snapshot.params.id;
    this.diplomeService
        .getDiplomeById(this.idDiplome)
        .subscribe( data => this.diplomeCourant = data, error => console.error(error) );
    this.etablissementService
        .getEtablissements()
        .subscribe(
            data => {this.etablissements = data; },
            errmess => this.etabError = <any>errmess
        );
    this.initialValue();

    //this.diplome1.anneeUniversitaires.forEach( note => this.addAnneeUniversitaire());
    //this.nombreAnneeUniversite( this.diplome1.anneeUniversitaires.length );

  }

  createForm() {

    this.diplomeForm = this.formBuilder.group({
      titre: [this.titre,  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      etablissement: 0,
      annee: [this.annee, [ Validators.required, Validators.pattern(this.anneePattern) ] ],
      file: '',
      anneeUniversitaires: this.formBuilder.array([]),
      autre: this.autre,
      nombreAnneeUniversitaire: 0
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
    this.updateDiplome(this.anneeUniversitaireArrays);
    console.log(" ou ça: ", this.diplome.anneeUniversitaires);
    this.diplomeForm.reset({
      titre: '',
      etablissement: 0,
      annee: '',
      file: '',
      AnneeUniversitaire: null,
      autre: '',
      nombreAnneeUniversitaire: 0
    });
    this.diplomeFormDirective.resetForm();
  }



  createAnneeUniversitaire(anneeUniversitaire?: AnneeUniversitaire): FormGroup {
    if ( anneeUniversitaire != null ) {
      return this.formBuilder.group({
        id: anneeUniversitaire.id,
        titre: anneeUniversitaire.titre,
        moyenne: anneeUniversitaire.moyenne,
        annee: anneeUniversitaire.annee,
        file: anneeUniversitaire.file,
        session: anneeUniversitaire.session,
        autre: ''
      });
    } else {
      return this.formBuilder.group({
        id: 0,
        titre: '',
        moyenne: 0,
        annee: '',
        file: '',
        autre: ''
      });
    }
  }

  addAnneeUniversitaire(anneeUniversitaire?: AnneeUniversitaire): void {
    this.anneeUniversitaires = this.diplomeForm.get('anneeUniversitaires') as FormArray;
    this.anneeUniversitaires.push( this.createAnneeUniversitaire(anneeUniversitaire) );
  }

  addReleve(anneeUniversitaire?: AnneeUniversitaire): void {
    this.anneeUniversitaires.push( this.createAnneeUniversitaire() );
  }


  nombreAnneeUniversite(index: number, anneeUniversitaire?: AnneeUniversitaire[]) {
    this.initialValue();
    this.createForm();
    console.log("url: ",  this.diplomeForm.value);
    this.anneeUniversitaires = this.diplomeForm.get( 'anneeUniversitaires' ) as FormArray;
   // this.anneeUniversitaires = this.formBuilder.array([]);
    for ( let i = 0; i < this.anneeUniversitaires.length; i++ ) {
     // this.removeAnneeUniversitaire( i );
      //this.anneeUniversitaires.removeAt(i);
    }


    for ( let j = 0; j < index; j++ ) {
     // this.anneeUniversitaires.push(this.createAnneeUniversitaire());
      if (j < anneeUniversitaire.length) {
        this.addAnneeUniversitaire(anneeUniversitaire[j]);
      } else {
        this.addAnneeUniversitaire();
      }
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
    this.file = this.diplomeForm.value.file;
  }

  addMoyenneToDiplome(idDiplome: number, anneeUniversitaire: AnneeUniversitaire, file: File) {
    let formData = new FormData();
    formData.append( 'file', file);
    if ( anneeUniversitaire.id === 0) {
      this.fileService
          .createfiles(formData)
          .subscribe( fi => {
            this.anneeUniversitaireService
                .createAnneeUniversitaires(anneeUniversitaire)
                .subscribe(data => {
                  this.diplomeService
                      .ajouterAnneeUniversitairesAUnDiplome(idDiplome, data.id)
                      .subscribe(reponse => {
                        console.log(reponse);
                      },
                      error => {
                    console.error(error);
                    });
                });
            }, error => console.error(error) );
        } else {
          this.fileService
          .createfiles(formData)
          .subscribe( fi => {
            this.anneeUniversitaireService
                .updateAnneeUniversitaires(anneeUniversitaire.id, anneeUniversitaire)
                .subscribe( data => console.log(data), error => console.error(error) );
            }, error => console.error(error) );
        }

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
                      .ajouterDiplomesAUnEtudiant(this.id, data.id)
                      .subscribe( diplome => {
                          //Pour parcourir le tableau des rélévés de note et ajouter au diplome
                          arrays
                          .forEach( (releve, index) => {
                             this.addMoyenneToDiplome(diplome.id, releve, this.selectedFiles[(index + 1)]);
                          });
                         },
                        error => console.error(error));
                    },
                      error => console.error(error));
              },
              error => console.error(error));
            }, 1000);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true
      this.router.navigate(['/profile']);
    }, 3500);

    //this.anneeUniversitaires = this.diplomeForm.value.anneeUniversitaires;
    this.anneeUniversitaireArrays = diplome.anneeUniversitaires;
  }



updateDiplome(arrays: AnneeUniversitaire[]) {
    console.log(
      ' taille dipômes: ' + this.diplome1.id);

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

    this.updateDiplomeWithEtudiant(
                                    this.diplome1.id,
                                    this.diplomeForm.value.etablissement,
                                    {
                                      'titre': this.diplomeForm.value.titre as string,
                                      'annee': this.diplomeForm.value.annee as string,
                                      'nombreAnneeUniversitaire': arrays.length,
                                      'file': this.selectedFiles[0].name,
                                    } as Diplome, arrays, this.selectedFiles
                                  );
  }

  updateDiplomeWithEtudiant(idDip: number, idEtablissement: number, diplome: Diplome, arrays: AnneeUniversitaire[], files: File[]) {
    console.log('Tableau: ', arrays);
    setTimeout(() => {
      this.scrool = true;
      let formData = new FormData();
      formData.append( 'file', files[0] );
      diplome.file = files[0].name;
      this.fileService
          .createfiles(formData)
          .subscribe( fi => {
              this.diplomeService
                  .updateDiplome(idDip, idEtablissement, diplome)
                  .subscribe(data => {
                    this.diplome = data;
                    arrays.forEach( (note, index) => {
                      this.addMoyenneToDiplome(this.diplome.id, note, this.selectedFiles[ (index + 1 ) ] );
                    });
                  }, error => {
                    console.error(error);
                  });
                },
                error => console.error(error));
            }, 1000);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/profile']);
    }, 3000);

  }


  activeEtabExist() {
    this.etabExist = true;
    console.log("boolean: " + this.etabExist);
  }


  deleteReleve(idReleve: number, idDiplome: number) {
    this.anneeUniversitaireService
        .deleteAllAnneeUniversitaire(idReleve, idDiplome)
        .subscribe(
            data => { console.log(data); this.scrool = false; },
            error => {console.error(error); }
    );

    setTimeout(() => {
      this.scrool = true;
    }, 3000);

    setTimeout(() => {
      this.scrool = false;
    }, 4000);
  }

  fileChanged(event) {
    this.selectedFiles.push(event.target.files[0]);
    console.log("Tableau des fichiers: ", this.selectedFiles);
  }

}
