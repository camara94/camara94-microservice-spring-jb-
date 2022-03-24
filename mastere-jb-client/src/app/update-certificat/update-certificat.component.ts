import { CertificatService } from './../service/certificat.service';
import { Etudiant } from './../shared/etudiant';
import { Certificat } from './../shared/certificat';
import { FileService } from './../service/file.service';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { DiplomeService } from './../service/diplome.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-certificat',
  templateUrl: './update-certificat.component.html',
  styleUrls: ['./update-certificat.component.scss']
})
export class UpdateCertificatComponent implements OnInit {

  certificatForm: FormGroup;
  certificat: Certificat;
  certificat1: Certificat;
  certificat1Enregistrer: Certificat;

  @ViewChild('fform', {static: false}) certificatFormDirective;
  idAnneeUniversitaire: number;

  formErrors = {
    'intitule': '',
    'organisme': 0,
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
    },

  };

  selectedFile: File;

  scrool = false;
  id: number;

  etabError: any;

  idBac: number;
  etudiant: Etudiant;
  idCertificat: number;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private certificatService: CertificatService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService
    ) {
      this.createForm();
     }


  ngOnInit() {
    this.idCertificat = +this.route.snapshot.params.id;
    this.certificatService
        .getCertificatById(this.idCertificat)
        .subscribe( data => this.certificat1 = data, error => console.error(error) );
    this.createForm();
  }

  ngAfterContentInit() {

  }

  createForm() {
    console.log("Certificat : ", this.certificat1);
    if (this.certificat1 != null) {
      this.certificatForm = this.formBuilder.group({
        intitule: [this.certificat1.intitule,  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
        organisme: [this.certificat1.organisme,  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
        date: this.certificat1.date,
        file: this.certificat1.file
      });
    } else {
      this.certificatForm = this.formBuilder.group({
        intitule: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
        organisme: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
        date: '',
        file: ''
      });
    }
    this.certificatForm.valueChanges
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
    this.updateCertificat(this.idCertificat, this.certificat, this.selectedFile);
    this.certificatForm.reset({
      intitule: '',
      organisme: '',
      date: null,
      file: ''
    });
    this.certificatFormDirective.resetForm();
  }

  updateCertificat(idCertificat: number, certif: Certificat, file: File) {
    console.log('++', certif);
    this.scrool = true;
    certif.file = file.name;
    const formData = new FormData();
    formData.append('file', file);
    this.fileService
        .createfiles(formData)
        .subscribe(fi => {
            this.certificatService
                .updateCertificat(idCertificat, certif)
                .subscribe(data => this.certificat = data, error => console.error(error));
          }, error => console.error( error ));
  }

  update() {
    console.log('formation: ', this.certificatForm.value);
    this.certificat = this.certificatForm.value as Certificat;
    console.log('id bb: ' + this.idCertificat);
    this.updateCertificat(
                    +this.idCertificat,
                    this.certificatForm.value as Certificat,
                    this.selectedFile
                  );
    setTimeout(() => {
      this.router.navigate(['/profile']);
      this.scrool = true;
    }, 1000);
  }


  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

}
