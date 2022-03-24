import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { AnneeUniversitaireService } from './../service/annee-universitaire.service';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-annee-universitaire',
  templateUrl: './add-annee-universitaire.component.html',
  styleUrls: ['./add-annee-universitaire.component.css']
})
export class AddAnneeUniversitaireComponent implements OnInit {

  releveForm: FormGroup;
  releve: AnneeUniversitaire;
  @ViewChild('fform', {static: false}) releveFormDirective;

  formErrors = {
    'titre': '',
    'moyenne': 0,
    'annee': '',
    'universite': '',
  };

  validationMessages = {
    'titre': {
      'required':      'Le Titre est requis.',
      'minlength':     'Le Titre ne doit pas être moins que 4 caractères.',
      'maxlength':     'Le Titre ne doit pas être plus que 150 caractères.'
    },
    'moyenne': {
      'required':      'La moyenne est requis.',
      'min':           'La moyenne doit pas être supérieur à  Zéro (0) .',
      'max':     'La moyenne doit pas être inférieur ou égale a vingt (20) .'
    },
    'annee': {
      'required':      'L\'année est requis.',
      'minlength':     'L\'année ne doit pas être moins que 4 caractères.',
      'maxlength':     'Le login ne doit pas être plus que 15 caractères.'
    },
    'universite': {
      'required':      'Le nom deuniversité est requis.',
      'minlength':     'Le nom deuniversité  ne doit pas être moins que 4  caractères.',
      'maxlength':     'Le nom deuniversité  pas être plus que 100 caractères.'
    }
  };

  id: string

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.id = data.id, error => console.error(error) );
      this.createForm();
     }


  ngOnInit() {
  }

  createForm() {

    this.releveForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      moyenne: [0, [ Validators.required, Validators.min(1), Validators.max(20)] ],
      annee: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(15) ] ],
      universite: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(100)] ],
      url:''
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
      universite: '',
      url:''
    });
   this.releveFormDirective.resetForm();
  }


  /*ajouter() {
    console.log(
      ' taille dipômes: ' + this.releve);

    setTimeout(()=>{
      this.anneeUniversitaireService.createAnneeUniversitaires(this.releve)
          .subscribe(data=>{console.log("pourquoi ",data);
          //insert un diplôme
          this.etudiantService
              .ajouterAnneeUniversitairesAUnEtudiant(this.id, data.id)
              .subscribe(data=>{console.log(data)}, error=>console.error(error));
            },
              error=>console.error(error));
            }, 1000);

    setTimeout(()=>{
      this.router.navigate(['/profile'])
    }, 2000)

  }*/


}
