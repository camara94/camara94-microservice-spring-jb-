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
  selector: 'app-add-etablissement',
  templateUrl: './add-etablissement.component.html',
  styleUrls: ['./add-etablissement.component.scss']
})
export class AddEtablissementComponent implements OnInit {

  scrool: boolean = false;
  remplirCursus: boolean = false;

  etablissementForm: FormGroup;
  etablissement: Etablissement;
  etablissement1: Etablissement;
  etablissementRegister: Etablissement;
  @ViewChild('fform', {static: false}) etablissementFormDirective;
  idAnneeUniversitaire: number;

  formErrors = {
    'nom': ''
  };

  validationMessages = {
    'nom': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    }
  };



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
     }


  ngOnInit() {
  }

  createForm() {
    this.etablissementForm = this.formBuilder.group({
      nom: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ]
    });
    this.etablissementForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.etablissementForm) { return; }
    const form = this.etablissementForm;
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
    this.etablissement = this.etablissementForm.value;
    this.etablissementForm.reset({
      nom: ''
    });
    this.etablissementFormDirective.resetForm();
  }


  addEtablissements() {
    this.addEtablissement(
                          {
                            'nom': this.etablissementForm.value.nom as string
                          } as Etablissement
                        );
    this.ngOnInit();
  }

  addEtablissement(etablissement: Etablissement) {
    setTimeout(() => {
      this.scrool = true;
      this.etablissementService
          .createEtablissements(etablissement)
          .subscribe(data => {
            etablissement = data;
          }, error => {
            console.error(error);
          });
            }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/list-etablissement']);
    }, 1000);
  }


}
