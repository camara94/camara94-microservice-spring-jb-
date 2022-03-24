import { CertificatService } from './../service/certificat.service';
import { Certificat } from './../shared/certificat';
import { FileResponse } from './../shared/fileResponse';
import { FileService } from './../service/file.service';
import { Etudiant } from './../shared/etudiant';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-certificat',
  templateUrl: './add-certificat.component.html',
  styleUrls: ['./add-certificat.component.scss']
})
export class AddCertificatComponent implements OnInit {

  certificatForm: FormGroup;
  certificat: Certificat;
  certificat1: Certificat;
  certificatEnregistrer: Certificat;

  @ViewChild('fform', {static: false}) certificatFormDirective;

  fileResponse: FileResponse;

  formErrors = {
    'intitule': '',
    'organisme': ''
  };

  validationMessages = {
    'intitule': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    },
    'organisme': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    }
  };

  id: string;

  etabError: any;

  idEtudiant: string;
  etudiant: Etudiant;
  selectedFile: File;
  scrool: boolean = false;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private certificatService: CertificatService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService
    ) {
      this.createForm();
    }


  ngOnInit() {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => this.id = data.id, error => console.error(error) );
    this.createForm();
    console.log('Id Etudiant: ' + this.idEtudiant);
  }

  createForm() {
    this.certificatForm = this.formBuilder.group({
      intitule: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      organisme: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      date: null,
      file: ''
    });
    this.certificatForm
        .valueChanges
        .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.certificatForm) { return; }
    const form = this.certificatForm;
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
    this.certificat = this.certificatForm.value;
    console.log(this.certificat);
    this.addCertificat(this.id, this.certificat);
    this.certificatForm.reset({
      intitule: '',
      organisme: 0,
      date: null,
      file: ''
    });
    this.certificatFormDirective.resetForm();
  }


  addCertificat(id: string, certificat: Certificat) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(data => {
          console.log(certificat);
          console.log( this.selectedFile.name );
          this.addCertificatWithEtudiant(
            id,
            {
              'id': 0,
              'intitule': this.certificat.intitule as string,
              'organisme': this.certificat.organisme as string,
              'date': this.certificat.date as Date,
              'file': this.selectedFile.name
            } as Certificat
          );
        });
    this.ngOnInit();
  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

  addCertificatWithEtudiant(idEtudiant: string, certificat: Certificat) {
    setTimeout(() => {
      this.scrool = true;
      this.certificatService
          .createCertificat(certificat)
          .subscribe(data => {
            this.certificat = data;
            this.etudiantService
                .ajouterCertificatAUnEtudiant(idEtudiant, data.id)
                .subscribe(
                  data => { this.certificat = data; },
                  error => { console.error(error); }
                );

          }, error => {
            console.error(error);
          });
            }, 900);

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/profile']);
    }, 1000);
  }


}
