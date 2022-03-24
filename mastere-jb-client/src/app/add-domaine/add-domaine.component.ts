import { DomaineService } from './../service/domaine.service';
import { Domaine } from './../shared/domaine';
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
  selector: 'app-add-domaine',
  templateUrl: './add-domaine.component.html',
  styleUrls: ['./add-domaine.component.scss']
})
export class AddDomaineComponent implements OnInit {

  scrool: boolean = false;
  remplirCursus: boolean = false;

  domaineForm: FormGroup;
  domaine: Domaine;
  domainetype1: Domaine;
  DomaineRegister: Domaine;
  @ViewChild('fform', {static: false}) domaineFormDirective;
  idAnneeUniversitaire: number;

  formErrors = {
    'libelle': ''
  };

  validationMessages = {
    'libelle': {
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
    private domaineService: DomaineService,
    private anneeUniversitaireService: AnneeUniversitaireService,
    private router: Router,
    private route: ActivatedRoute) {
      this.createForm();
     }


  ngOnInit() {
  }

  createForm() {
    this.domaineForm = this.formBuilder.group({
      libelle: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ]
    });
    this.domaineForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.domaineForm) { return; }
    const form = this.domaineForm;
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
    this.domaine = this.domaineForm.value;
    this.domaineForm.reset({
      libelle: ''
    });
    this.domaineFormDirective.resetForm();
  }


  addDomaines() {
    this.addDomaine(
                    {
                      'libelle': this.domaineForm.value.libelle as string
                      } as Domaine
                  );
    this.ngOnInit();
  }

  addDomaine(domaine: Domaine) {
    setTimeout(() => {
      this.scrool = true;
      this.domaineService
          .createDomaines(domaine)
          .subscribe(data => {
            this.domaine = data;
          }, error => {
            console.error(error);
          });
            }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/list-domaine']);
    }, 1000);
  }


}
