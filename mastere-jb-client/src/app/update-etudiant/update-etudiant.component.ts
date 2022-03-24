import { Router } from '@angular/router';
import { AuthenticationService } from './../service/authentication.service';
import { EtudiantService } from './../service/etudiant.service';
import { HttpClientService } from './../service/httpclient.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Etudiant } from './../shared/etudiant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';



@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.scss']
})
export class UpdateEtudiantComponent implements OnInit {
  etudiantForm: FormGroup;
  etudiant: Etudiant;
  @ViewChild('fform', {static: false}) etudiantFormDirective;
  errMess: string;


  formErrors = {
    'firstname': '',
    'lastname': '',
    'cin': '',
    'email': '',
    'telephone':''
  };

  validationMessages = {
    'firstname': {
      'required':      'Le prénom est requis.',
      'minlength':     'Le prénom ne doit pas être moins que 2 caractères.',
      'maxlength':     'Le prénom ne doit pas être plus que 25 caractères.'
    },
    'lastname': {
      'required':      'Le nom est requis.',
      'minlength':     'Le nom ne doit pas être moins que 2  caractères.',
      'maxlength':     'Le nom ne doit pas être plus que 25 caractères.'
    },
    'cin': {
      'required':      'Le CIN est requis.',
      'minlength':     'Le CIN ne doit pas être moins que 2 caractères.',
      'maxlength':     'Le CIN ne doit pas être plus que 25 caractères.'
    },
    'email': {
      'required':      'L\'é-mail est requis.',
      'email':         'L\'é-mail n\'est pas au format valide.'
    },
    'telephone': {
      'required':      'Le Numéro de téléphone est requis.',
      'minlength':     'Le Numéro de téléphone  ne doit pas être moins que 6 caractères.',
      'maxlength':     'Le Numéro de téléphone  ne doit pas être plus que 20 caractères.'
    }
  };

  id: string;

  user: Etudiant;

  remember:boolean;
  constructor( public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private authenticationService: AuthenticationService,
    private router: Router ) {
    this.createForm();
   }

  ngOnInit() {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username)
        .subscribe( data =>{ this.id = data.id; this.user = data; }, error => console.error(error) );
  }

  createForm() {

    this.etudiantForm = this.formBuilder.group({
      firstname: ['',  [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      cin: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [ Validators.required, Validators.email ] ],
      telephone: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ] ]
    });
    this.etudiantForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit() {
    this.etudiant = this.etudiantForm.value;
    console.log('verife: ', this.etudiant);
    this.inscription(this.id, this.etudiantForm.value as Etudiant);
    /*console.log(this.etudiant);
    this.etudiantForm.reset({
      FIRST_NAME: '',
      LAST_NAME: '',
      CIN: '',
      EMAIL: '',
      USERNAME: '',
      telephone: ''
    });*/
    this.etudiantFormDirective.resetForm();
  }


  onValueChanged(data?: any) {
    if (!this.etudiantForm) { return; }
    const form = this.etudiantForm;
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

  inscription(id: string, etudiant: Etudiant) {
    console.log(this.etudiantForm.value);
    this.etudiantService
        .updateEtudiant( id, etudiant )
        .subscribe( data => console.log(etudiant), error => console.error( error ) );

    setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 2000);
        this.ngOnInit();
  }


}
