import { MentionService } from './../service/mention.service';
import { Mention } from './../shared/mention';
import { DomaineService } from './../service/domaine.service';
import { Domaine } from './../shared/domaine';
import { TypeService } from './../service/type.service';
import { Type } from './../shared/type';
import { AnneeUniversitaireService } from './../service/annee-universitaire.service';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { Etablissement } from './../shared/etablissement';
import { EtablissementService } from './../service/etablissement.service';
import { EtudiantService } from './../service/etudiant.service';
import { Diplome } from './../shared/diplome';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../service/authentication.service';
import { DiplomeService } from './../service/diplome.service';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-mention',
  templateUrl: './update-mention.component.html',
  styleUrls: ['./update-mention.component.scss']
})
export class UpdateMentionComponent implements OnInit {
  idMention: number;
  scrool: boolean = false;
  remplirCursus: boolean = false;

  mentionForm: FormGroup;
  mention: Mention;
  mention1: Mention;
  mentionRegister: Mention;
  @ViewChild('fform', {static: false}) mentionFormDirective;
  idAnneeUniversitaire: number;

  domaines: Domaine[];

  formErrors = {
    'nom': '',
    'domaine': 0
  };

  validationMessages = {
    'libelle': {
      'required':      'est requis.',
      'minlength':     'être plus que 4 caractères.',
      'maxlength':     'doit pas être plus que 150 caractères.'
    },
    'domaine': {
      'required':      'est requis.',
      'min':     'être supérieur à zéro (0)'
    }
  };



   constructor(
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private diplomeService: DiplomeService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private domaineService: DomaineService,
    private mentionService: MentionService,
    private router: Router,
    private route: ActivatedRoute) {
      this.createForm();
     }


  ngOnInit() {
    this.idMention = +this.route.snapshot.params.id;
    this.mentionService
        .getMentionById(this.idMention)
        .subscribe( data => this.mention1 = data, error => console.error( error ) );
    this.domaineService
        .getDomaines()
        .subscribe(data => this.domaines = data, error => console.error(error));
  }

  createForm() {
    this.mentionForm = this.formBuilder.group({
      nom: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(150)] ],
      domaine: [0 ,  [Validators.required, Validators.min(1)] ]
    });
    this.mentionForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.mentionForm) { return; }
    const form = this.mentionForm;
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
    this.mention = this.mentionForm.value;
    this.mentionForm.reset({
      nom: '',
      domaine: 0
    });
    this.mentionFormDirective.resetForm();
  }


  updateMentions() {
    this.updateMention(
                    this.mention1.id,
                    this.mentionForm.value.domaine as number,
                    {
                      'nom': this.mentionForm.value.nom as string
                    } as Mention
                  );
  }

  updateMention(idM: number, domaineId: number, mention: Mention) {
    setTimeout(() => {
        this.scrool = true;
        this.mentionService
            .updateMentions(idM, domaineId, mention)
            .subscribe( data => this.mention = data, error => console.error( error ) );
      }, 1000);

    setTimeout(() => {
      this.scrool = false;
      this.remplirCursus = true;
      this.router.navigate(['/list-mention']);
    }, 3000);
  }


}
