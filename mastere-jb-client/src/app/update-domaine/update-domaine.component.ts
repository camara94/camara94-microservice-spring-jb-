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
  selector: 'app-update-domaine',
  templateUrl: './update-domaine.component.html',
  styleUrls: ['./update-domaine.component.scss']
})
export class UpdateDomaineComponent implements OnInit {

  scrool: boolean = false;
  remplirCursus: boolean = false;

  domaineForm: FormGroup;
  domaine: Domaine;
  domaine1: Domaine;
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

  idDomaine: number;

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
    this.idDomaine = +this.route.snapshot.params.id;
    this.domaineService
        .getDomaineById(this.idDomaine)
        .subscribe( data => this.domaine1 = data, error => console.error( error ) );
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


  updateDomaines() {
    this.updateDomaine(
                    this.domaine1.id,
                    {
                      'libelle': this.domaineForm.value.libelle as string
                      } as Domaine
                  );
  }

  updateDomaine(idDomaine: number, domaine: Domaine) {
    setTimeout(() => {
      this.scrool = true;
      this.domaineService
          .updateDomaines(idDomaine, domaine)
          .subscribe(data => {
            this.domaine = data;
          }, error => {
            console.error(error);
          });
            }, 1000);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/list-domaine']);
    }, 3000);
  }


}
