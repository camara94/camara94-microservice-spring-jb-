import { TypeService } from './../service/type.service';
import { Type } from './../shared/type';
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
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {
  scrool: boolean = false;
  remplirCursus: boolean = false;

  typeForm: FormGroup;
  type: Type;
  type1: Type;
  typeRegister: Type;
  @ViewChild('fform', {static: false}) typeFormDirective;
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
    private typeService: TypeService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private router: Router,
    private route: ActivatedRoute) {
      this.createForm();
     }


  ngOnInit() {
  }

  createForm() {
    this.typeForm = this.formBuilder.group({
      nom: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ]
    });
    this.typeForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.typeForm) { return; }
    const form = this.typeForm;
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
    this.type = this.typeForm.value;
    this.typeForm.reset({
      nom: ''
    });
    this.typeFormDirective.resetForm();
  }


  addTypes() {
    this.addType(
                  {
                    'nom': this.typeForm.value.nom as string
                  } as Type
                );
    this.ngOnInit();
  }

  addType(type: Type) {
    setTimeout(() => {
      this.scrool = true;
      this.typeService
          .createTypes(type)
          .subscribe(data => {
            this.type = data;
          }, error => {
            console.error(error);
          });
            }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/list-type']);
    }, 1000);
  }


}
