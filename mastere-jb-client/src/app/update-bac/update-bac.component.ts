import { FileService } from './../service/file.service';
import { Etudiant } from './../shared/etudiant';
import { BacService } from './../service/bac.service';
import { Bac } from './../shared/bac';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { DiplomeService } from './../service/diplome.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-bac',
  templateUrl: './update-bac.component.html',
  styleUrls: ['./update-bac.component.scss']
})
export class UpdateBacComponent implements OnInit, AfterContentInit {

  bacForm: FormGroup;
  bac: Bac;
  bac1: Bac;
  bacEnregistrer: Bac;

  @ViewChild('fform', {static: false}) bacFormDirective;
  idAnneeUniversitaire: number;

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

  selectedFile: File;

  anneePattern: string = "^[0-9]{4}";

  scrool = false;
  remplirCursus: boolean;
  id: number;

  etabError: any;

  idBac: number;
  etudiant: Etudiant;

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
    this.idBac = +this.route.snapshot.params.id;
    this.bacService
        .getBacById(this.idBac)
        .subscribe( data => this.bac1 = data, error => console.error(error) );
    this.createForm();
  }

  ngAfterContentInit() {

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
    this.bacForm.valueChanges
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
    console.log(this.bac);
    this.bacForm.reset({
      titre: '',
      moyenne: 0,
      annee: '',
      file: ''
    });
    this.bacFormDirective.resetForm();
  }

  updateBac(idBac: number, bac: Bac, file: File) {
    setTimeout(() => {
      this.scrool = true;
      const formData = new FormData();
      formData.append('file', file);
      this.fileService
          .createfiles(formData)
          .subscribe(fi => {
              this.bacService
                  .updateBac(idBac, bac)
                  .subscribe(data => this.bac = data, error => console.error(error));
          }, error => console.error( error ));
    }, 1000);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.ngAfterContentInit();
      this.router.navigate(['/profile']);
    }, 3000);
  }

  update() {
    console.log(
      'formation: ', this.bacForm.value);
    console.log('id: ' + this.idBac);

    this.bac = this.bacForm.value as Bac;

    this.updateBac(
                    this.idBac,
                    {
                      'id': this.idBac,
                      'option': this.bacForm.value.option as string,
                      'moyenne': this.bacForm.value.moyenne as number,
                      'annee': this.bacForm.value.annee as string,
                      'ecole': this.bacForm.value.ecole as string,
                      'file': this.selectedFile.name
                    } as Bac, this.selectedFile
                  );


    setTimeout(() => {
      this.router.navigate(['/profile']);
      this.scrool = true;
    }, 2000);

    setTimeout(() => {
      this.scrool = false;
    }, 4000);

  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

}
