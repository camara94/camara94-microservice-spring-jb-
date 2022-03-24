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
import { Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-releve-note',
  templateUrl: './add-releve-note.component.html',
  styleUrls: ['./add-releve-note.component.css']
})
export class AddReleveNoteComponent implements OnInit {


  releveForm: FormGroup;
  releve: AnneeUniversitaire;
  releve1: AnneeUniversitaire;
  releveEnregistrer: AnneeUniversitaire;

  @ViewChild('fform', {static: false}) releveFormDirective;
  idAnneeUniversitaire: number;

  formErrors = {
    'titre': '',
    'moyenne': 0,
    'annee': ''
  };

  validationMessages = {
    'titre': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    },
    'moyenne': {
      'required':      'La moyenne est requis.',
      'min':     'La moyenne  doit être supérieur ou égale à Zéro (0)',
      'max':     'La moyenne  doit être inférieur ou égale à Zéro (20)',
    },
    'annee': {
      'required':      'est requise.',
      'pattern':     'par exemple: 2020-2021'
    }
  };

  anneePattern: string = "^[0-9]{4}-[0-9]{4}$";

  scrool = false;
  remplirCursus: boolean;
  nombreDAnnee: number;
  id: number;

  etablissements: Etablissement[];
  etabError: any;

  idDiplome: number;
  diplome: Diplome;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private router: Router,
    private route: ActivatedRoute) {
      this.createForm();
      this.nombreDAnnee = 0;
      this.remplirCursus = false;
     }


  ngOnInit() {
    this.idDiplome = +this.route.snapshot.params.id;
    this.diplomeService
        .getDiplomeById(this.idDiplome)
        .subscribe(
          data => { this.diplome = data;   },
          error => { console.error(error); }
        );
    this.createForm();
  }

  createForm() {
    console.log("Diplome courant: ", this.releve1);
    this.releveForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      moyenne: [0, [ Validators.required, Validators.min(0), Validators.max(20)] ],
      annee: ['', [ Validators.required, Validators.pattern(this.anneePattern) ] ],
      url: ''
    });
    this.releveForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.releveForm) { return; }
    const form = this.releveForm;
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
    this.releve = this.releveForm.value;
    console.log(this.releve);
    this.releveForm.reset({
      titre: '',
      moyenne: 0,
      annee: '',
      file: ''
    });
    this.releveFormDirective.resetForm();
  }


  addReleve() {
    console.log(" diplome: " + this.idDiplome);
    this.addReleveWithDiplome(
                                this.idDiplome,
                                {
                                  'titre': this.releveForm.value.titre as string,
                                  'moyenne': this.releveForm.value.moyenne as number,
                                  'annee': this.releveForm.value.annee as string,
                                  'file': ''
                                } as AnneeUniversitaire
                              );
  }

  addReleveWithDiplome(idDiplome: number, releve: AnneeUniversitaire) {
    setTimeout(() => {
      this.scrool = true;
      this.anneeUniversitaireService
          .createAnneeUniversitaires(releve)
          .subscribe(data => {
            this.releve = data;
            this.diplomeService
                .ajouterAnneeUniversitairesAUnDiplome(
                                                      idDiplome,
                                                      data.id
                                                      )
                .subscribe(
                  data => { this.releve = data; },
                  error => { console.error(error); }
                );

          }, error => {
            console.error(error);
          });
            }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/profile']);
    }, 1000);
  }


}
