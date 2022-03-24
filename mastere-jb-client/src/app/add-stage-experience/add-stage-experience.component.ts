import { StageExperienceService } from './../service/stage-experience.service';
import { StageExperience } from './../shared/stageExperience';
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
  selector: 'app-add-stage-experience',
  templateUrl: './add-stage-experience.component.html',
  styleUrls: ['./add-stage-experience.component.scss']
})
export class AddStageExperienceComponent implements OnInit {


  stageExperienceForm: FormGroup;
  stageExperience: StageExperience;
  stageExperience1: StageExperience;
  StageExperienceEnregistrer: StageExperience;

  @ViewChild('fform', {static: false}) stageExperienceFormDirective;

  fileResponse: FileResponse;

  formErrors = {
    'titre': '',
    'organisme': ''
  };

  validationMessages = {
    'titre': {
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

  natures: Array<string>;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private stageExperienceService: StageExperienceService,
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
    this.natures = ['Stage', 'Expérience professionnelle'];
  }

  createForm() {
    this.stageExperienceForm = this.formBuilder.group({
      titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      organisme: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      duree: '',
      nature: '',
      remarque: '',
      file: ''
    });
    this.stageExperienceForm
        .valueChanges
        .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.stageExperienceForm) { return; }
    const form = this.stageExperienceForm;
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
    this.stageExperience = this.stageExperienceForm.value;
    console.log("id: " + this.id);
    this.addStageExperience(this.id, this.stageExperience);
    console.log(this.stageExperience);
    this.stageExperienceForm.reset({
      titre: '',
      organisme: '',
      duree: '',
      nature: '',
      remarque: '',
      file: ''
    });
    this.stageExperienceFormDirective.resetForm();
  }


  addStageExperience(id: string, stageExperience: StageExperience) {
    this.stageExperience = this.stageExperienceForm.value as StageExperience;
    console.log('llllllll: ' + this.stageExperience);
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.fileService
        .createfiles(formData)
        .subscribe(data => {
          console.log(stageExperience);
          console.log( this.selectedFile.name );
          this.addStageExperienceWithEtudiant(
            id,
            {
              'id': 0,
              'titre': this.stageExperience.titre as string,
              'organisme': this.stageExperience.organisme as string,
              'duree': this.stageExperience.duree as string,
              'nature': this.stageExperience.nature as string,
              'remarque': this.stageExperience.remarque as string,
              'file': this.selectedFile.name
            } as StageExperience
          );
        });
    this.ngOnInit();
  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

  addStageExperienceWithEtudiant(idEtudiant: string, stageExperience: StageExperience) {
    setTimeout(() => {
      this.scrool = true;
      this.stageExperienceService
          .createStageExperience(stageExperience)
          .subscribe(data => {
            this.stageExperience = data;
            this.etudiantService
                .ajouterStageExperienceAUnEtudiant(idEtudiant, data.id)
                .subscribe(
                  data => { this.stageExperience = data; },
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
