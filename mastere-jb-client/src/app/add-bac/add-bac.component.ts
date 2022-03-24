import { FileResponse } from './../shared/fileResponse';
import { FileService } from './../service/file.service';
import { Etudiant } from './../shared/etudiant';
import { BacService } from './../service/bac.service';
import { Bac } from './../shared/bac';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { DiplomeService } from './../service/diplome.service';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-bac',
  templateUrl: './add-bac.component.html',
  styleUrls: ['./add-bac.component.scss']
})
export class AddBacComponent implements OnInit {

  bacForm: FormGroup;
  bac: Bac;
  bac1: Bac;
  bacEnregistrer: Bac;

  @ViewChild('fform', {static: false}) bacFormDirective;
  idAnneeUniversitaire: number;

  fileResponse: FileResponse;

  formErrors = {
    'option': '',
    'moyenne': 0,
    'annee': '',
    'ecole':''
  };

  validationMessages = {
    'option': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    },
    'moyenne': {
      'required':      'La moyenne est requis.',
      'min':     'La moyenne  doit être supérieur ou égale à Zéro (0)',
      'max':     'La moyenne  doit être inférieur ou égale à Zéro (20)',
    },
    'annee': {
      'required':      'est requise.',
      'pattern':     'par exemple: 2020'
    },
    'ecole': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    },
  };

  anneePattern: string = "^[0-9]{4}$";

  scrool = false;
  remplirCursus: boolean;
  id: number;

  etabError: any;

  idEtudiant: string;
  etudiant: Etudiant;
  selectedFile: File;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private bacService: BacService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService
    ) {
      this.createForm();
      this.remplirCursus = false;
     }


  ngOnInit() {
    this.idEtudiant = this.route.snapshot.params.id;
    this.createForm();
  }

  createForm() {
    console.log("Diplome bac: ", this.bac1);
    this.bacForm = this.formBuilder.group({
      option: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      moyenne: [0, [ Validators.required, Validators.min(0), Validators.max(20)] ],
      annee: ['', [ Validators.required, Validators.pattern(this.anneePattern) ] ],
      ecole: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      file: ''
    });
    this.bacForm
        .valueChanges
        .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.bacForm) { return; }
    const form = this.bacForm;
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
    this.bac = this.bacForm.value;
    this.addBac(this.idEtudiant, this.bac);
    console.log(this.bac);
    this.bacForm.reset({
      titre: '',
      moyenne: 0,
      annee: '',
      file: ''
    });
    this.bacFormDirective.resetForm();
  }


  addBac(id: string, bac: Bac) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(data => {
          console.log(bac);
          console.log( this.selectedFile.name );
          this.addBacWithEtudiant(
            id,
            {
              'option': this.bac.option,
              'moyenne': this.bac.moyenne,
              'annee': this.bac.annee,
              'ecole': this.bac.ecole,
              'file': this.selectedFile.name
            } as Bac
          );
        });
  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

  addBacWithEtudiant(id: string, bac: Bac) {
    setTimeout(() => {
      this.scrool = true;
      this.bacService
          .createbac(bac)
          .subscribe(data => {
            this.bac = data;
            this.etudiantService
                .ajouterBacAUnEtudiant(id, data.id)
                .subscribe(
                  data => { this.bac = data; },
                  error => { console.log(error); }
                );

          }, error => {
            console.error(error);
          });
            }, 800);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.onValueChanged();
      this.router.navigate(['/profile']);
    }, 1000);
  }


}
