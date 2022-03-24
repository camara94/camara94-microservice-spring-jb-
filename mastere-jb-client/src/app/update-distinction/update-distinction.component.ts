import { FileService } from './../service/file.service';
import { DistinctionService } from './../service/distinction.service';
import { Distinction } from './../shared/distinction';
import { FormationService } from './../service/formation.service';
import { Formation } from './../shared/formation';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-distinction',
  templateUrl: './update-distinction.component.html',
  styleUrls: ['./update-distinction.component.scss']
})
export class UpdateDistinctionComponent implements OnInit {

  distinctionForm: FormGroup;
  distinction: Distinction;
  distinction1: Distinction;
  id: string;
  scrool: boolean = false;
  distinctionId: number;

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

  selectedFile: File;

  constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private distinctionService: DistinctionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService
    ) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.id = data.id, error => console.error(error) );
      this.createForm();
     }

  ngOnInit() {
    this.distinctionId = +this.route.snapshot.params['id'];
    this.distinctionService
        .getDistinctionById(this.distinctionId)
        .subscribe(data => this.distinction1 = data, error => console.error(error));
  }

  createForm() {
    this.distinctionForm = this.formBuilder.group({
      context: [ '' ,  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      description: [ '',  [Validators.required, Validators.minLength(4), Validators.maxLength(250)] ],
      organisation: [ '',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      date: '',
      file: ''
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
      file: ''
    });
    this.distinctionFormDirective.resetForm();
  }

  udpate() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(fi => {
          this.distinctionService
              .updateDistinction(
                this.distinctionId,
                {
                  'context': this.distinctionForm.value.context as string,
                  'description': this.distinctionForm.value.description as string,
                  'organisation': this.distinctionForm.value.organisation as string,
                  'date': this.distinctionForm.value.date as string,
                  'file': this.selectedFile.name
                } as Distinction)
              .subscribe( error => {console.error(error);});
        },
          error => console.error( error ));
    this.scrool = true;
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 1000);
  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

}
