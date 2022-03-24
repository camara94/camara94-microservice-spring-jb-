import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { EtudiantService } from './../service/etudiant.service';
import { MastereInfoService } from './../service/mastere-info.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MastereInfo } from './../shared/mastereInfo';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-mastere-info',
  templateUrl: './add-mastere-info.component.html',
  styleUrls: ['./add-mastere-info.component.scss']
})
export class AddMastereInfoComponent implements OnInit {
  mastereInfoForm: FormGroup;
  mastereInfo: MastereInfo;
  mastereInfo1: MastereInfo;
  mastereInfoEnregistrer: MastereInfo;


  @ViewChild('fform', {static: false}) mastereInfoFormDirective;
  idAnneeUniversitaire: number;


  formErrors = {
    'titre': '',
    'description': '',
    'publicCible': '',
    'objectif': '',
    'secteur': '',
    'metier': '',
    'modalite': ''
  };

  validationMessages = {
    'titre': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    },
    'description': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    },
    'publicCible': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    },
    'objectif': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    },
    'secteur': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    },
    'metier': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    },
    'modalite': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.'
    }
  };

  anneePattern: string = "^[0-9]{4}$";

  scrool = false;
  remplirCursus: boolean;
  id: number;

  idEtudiant: number;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private mastereInfoService: MastereInfoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.createForm();
      this.remplirCursus = false;
     }

  ngOnInit() {
    this.idEtudiant = this.route.snapshot.params.id;
    this.createForm();
  }

  createForm() {
    this.mastereInfoForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4)] ],
      description: ['',  [Validators.required, Validators.minLength(4)] ],
      publicCible: ['',  [Validators.required, Validators.minLength(4)] ],
      objectif: ['',  [Validators.required, Validators.minLength(4)] ],
      metier: ['',  [Validators.required, Validators.minLength(4)] ],
      secteur: ['',  [Validators.required, Validators.minLength(4)] ],
      modalite: ['',  [Validators.required, Validators.minLength(4)] ],
    });
    this.mastereInfoForm
        .valueChanges
        .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.mastereInfoForm) { return; }
    const form = this.mastereInfoForm;
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
    this.mastereInfo = this.mastereInfoForm.value;
    this.addMastereInfo(this.mastereInfo);
    this.mastereInfoForm.reset({
      titre: '',
      description: '',
      publicCible: '',
      objectif: '',
      secteur: '',
      metier: '',
      modalite: ''
    });
    this.mastereInfoFormDirective.resetForm();
  }


  addMastereInfo( mastereInfo: MastereInfo) {
    this.mastereInfoService
        .createMastereInfos( mastereInfo )
        .subscribe( data => console.log(data), error => console.error( error ) );

    setTimeout(() => {
          this.scrool = false;
          this.remplirCursus = true;
          this.onValueChanged();
          this.router.navigate(['/profile']);
        }, 1000);
  }
}
