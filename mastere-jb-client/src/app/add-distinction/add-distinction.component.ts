import { FileService } from './../service/file.service';
import { DistinctionService } from './../service/distinction.service';
import { Distinction } from './../shared/distinction';
import { FormationService } from './../service/formation.service';
import { Formation } from './../shared/formation';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-distinction',
  templateUrl: './add-distinction.component.html',
  styleUrls: ['./add-distinction.component.scss']
})
export class AddDistinctionComponent implements OnInit {

  distinctionForm: FormGroup;
  distinction: Distinction;
  id: string;
  scrool: boolean = false;

  selectedFile: File;

  @ViewChild('fform', {static: false}) distinctionFormDirective;

  formErrors = {
    'context': '',
    'description': '',
    'organisation': ''
  };

  validationMessages = {
    'context': {
      'required':      'Le Titre est requis.',
      'minlength':     'Le Titre ne doit pas être moins que 4 caractères.',
      'maxlength':     'Le Titre ne doit pas être plus que 150 caractères.'
    },
    'description': {
      'required':      'La description est requise.',
      'minlength':     'La description ne doit pas être moins que 4 caractères.',
      'maxlength':     'La description ne doit pas être plus que 250 caractères.'
    },
    'organisation': {
      'required':      'L\'organisation est requise.',
      'minlength':     'L\'organisation ne doit pas être moins que 4 caractères.',
      'maxlength':     'L\'organisation ne doit pas être plus que 100 caractères.'
    }
  };

  constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private distinctionService: DistinctionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private fileService: FileService) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username)
          .subscribe( data => this.id = data.id, error => console.error );
      console.log('id: ' + this.id);
      this.createForm();
     }

  ngOnInit() {
  }

  createForm() {

    this.distinctionForm = this.formBuilder.group({
      context: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      description: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(250)] ],
      organisation: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      date: '',
      url: ''
    });
    this.distinctionForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.distinctionForm) { return; }
    const form = this.distinctionForm;
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
    this.distinction = this.distinctionForm.value;
    console.log(this.distinction);
    this.distinctionForm.reset({
      context: '',
      description: '',
      organisation: '',
      date: '',
      url: ''
    });
   this.distinctionFormDirective.resetForm();
  }

  ajouter() {
    console.log('id encore: ' + this.id);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(data => {

      setTimeout(() => {
          this.distinctionService
              .createDistinctions(
                {
                  'context': this.distinction.context,
                  'description': this.distinction.description,
                  'date': this.distinction.date,
                  'organisation': this.distinction.organisation,
                  'file': data.name
                } as Distinction
              )
              .subscribe( data => {
                console.log("pourquoi ", data);
                //insert un diplôme
                this.distinctionService
                    .ajouterDistinctionAUnEtudiant(this.id, data.id)
                    .subscribe( data => {console.log(data); }, error => console.error(error));
                  },
                error => console.error(error));
            }, 900);

      setTimeout(() => {
          this.router.navigate(['/profile']);
          this.scrool = false;
        }, 1000);
    });
    this.ngOnInit();
  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

}
