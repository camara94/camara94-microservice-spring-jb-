import { StageExperienceService } from './../service/stage-experience.service';
import { StageExperience } from './../shared/stageExperience';
import { Etudiant } from './../shared/etudiant';
import { FileService } from './../service/file.service';
import { EtudiantService } from './../service/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-stage-experience',
  templateUrl: './update-stage-experience.component.html',
  styleUrls: ['./update-stage-experience.component.scss']
})
export class UpdateStageExperienceComponent implements OnInit {

  stageExperienceForm: FormGroup;
  stageExperience: StageExperience;
  stageExperience1: StageExperience;
  stageExperienceEnregistrer: StageExperience;

  @ViewChild('fform', {static: false}) stageExperienceFormDirective;
  idAnneeUniversitaire: number;

  formErrors = {
    'titre': '',
    'organisme': '',
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
    },

  };
  natures: Array<string>;

  selectedFile: File;

  scrool = false;
  id: number;

  etabError: any;

  idBac: number;
  etudiant: Etudiant;
  idStageExperienceService: number;

   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private formBuilder: FormBuilder,
    private stageExperienceService: StageExperienceService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService
    ) {
      this.natures = ['Stage', 'Expérience professionnelle'];
     }


  ngOnInit() {
    this.idStageExperienceService = +this.route.snapshot.params.id;
    this.stageExperienceService
        .getStageExperienceById(this.idStageExperienceService)
        .subscribe( data => this.stageExperience1 = data, error => console.error(error) );
    this.createForm();
  }

  createForm() {
    console.log("Stage : ", this.stageExperience1);
    this.stageExperienceForm = this.formBuilder.group({
        titre: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
        organisme: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
        duree: '',
        file: ''
    });
    this.stageExperienceForm.valueChanges
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
    console.log(this.stageExperienceForm);
    this.updateStageExperience(this.idStageExperienceService, this.stageExperience, this.selectedFile);
    this.stageExperienceForm.reset({
      intitule: '',
      organisme: '',
      date: null,
      file: ''
    });
    this.stageExperienceFormDirective.resetForm();
  }

  updateStageExperience(idStageExperience: number, stageExperience: StageExperience, file: File) {
    console.log('++', stageExperience);
    this.scrool = true;
    stageExperience.file = file.name;
    const formData = new FormData();
    formData.append('file', file);
    this.fileService
        .createfiles(formData)
        .subscribe(fi => {
            this.stageExperienceService
                .updateStageExperience(idStageExperience, this.stageExperience)
                .subscribe(data => this.stageExperience = data, error => console.error(error));
          }, error => console.error( error ));

    setTimeout(() => {
      this.scrool = false;
      this.router.navigate(['/profile']);
    }, 1000);
  }

  update() {
    console.log(
      'formation: ', this.stageExperienceForm.value);
    this.stageExperience = this.stageExperienceForm.value as StageExperience;
    console.log('id bb: ' + this.stageExperience);
    this.updateStageExperience(
                    +this.idStageExperienceService,
                    this.stageExperienceForm.value as StageExperience,
                    this.selectedFile
                  );
  }

  fileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

  }

}
