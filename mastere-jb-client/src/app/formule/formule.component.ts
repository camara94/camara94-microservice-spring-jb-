import { VisualiserFormuleComponent } from './../visualiser-formule/visualiser-formule.component';
import { EtudiantService } from './../service/etudiant.service';
import { MastereService } from './../service/mastere.service';
import { ChampFormuleService } from './../service/champ-formule.service';
import { ChampFormule } from './../shared/champFormule';
import { AuthenticationService } from './../service/authentication.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Formule } from '../shared/formule';
import { Mastere } from '../shared/mastere';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent implements OnInit {

  formuleForm: FormGroup;
  nomForm: FormGroup;
  formule: ChampFormule;
  formule1: Formule;
  formuleEnregistrer: Formule;
  masteres: Mastere[];
  mastere: Mastere;
  mastereSansFormules: Mastere[] = [];
  mastereAvecFormules: Mastere[] = [];

  mastereDiage: Mastere;


  formules: FormArray;
  formuleArrays = [];
  formuleArrays2: ChampFormule[] = [];
  champFormules: ChampFormule[] = [];
  tableauxFormule: Formule[] = [];
  tableauxParcours: Formule[] = [];
  j: number = 1;
  mastereSelectedId: number;
  champFormule: ChampFormule;

  form: ChampFormule;

  sommeCoef: number = 0;
  action: string = 'nothing';
  @ViewChild('fform', {static: false}) formuleFormDirective;
  id: string;
   constructor(
    public dialog: MatDialog,
    public dialModRef: MatDialogRef<any>,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private champFormuleService: ChampFormuleService,
    private mastereService: MastereService,
    private router: Router,
    private etudiantService: EtudiantService,
    ) {
      this.createForm();
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.id = data.id, data => error => console.error(  error ) );
     }

  /*getMastere(): Mastere {
    this.mastereService
          .getMastereById(this.mastere.id)
          .subscribe( data => {this.mastere = data;
        } , error => console.error );
    return this.mastere;
  }*/

  ngOnInit() {
    //this.getMastere();
    this.mastereService
        .getMasteres()
        .subscribe( data => {
          this.masteres = data;
          console.log( this.masteres );
          this.masteres
              .forEach( ( mast, index) => {
                if ( mast.champFormule == null ) {
                  this.mastereSansFormules.push(mast);
                  /*console.log('ddsfd: ', mast.champFormule );*/
                } else {
                  this.mastereAvecFormules.push(mast);
                }
           } );
        }, error => console.error(error) );

    /*this.masteres
        .forEach( ( mast, index) => {
           if ( mast.champFormule === null ) {
             this.mastereSansFormules.push(mast);
           }
        } );*/

    this.mastereService
        .getMastereById(8)
        .subscribe( data => {this.mastere = data; /*console.log('Constructor: ', this.mastere);*/
      } , error => console.error );
  }


  createForm() {
      this.formuleForm = this.formBuilder.group({
        id: 0,
        coefficientBac: -1,
        mentionBac: -1,
        coefficientAnneeUniversitaire: -1,
        coefficientMentionABien: -1,
        coefficientMentionBien: -1,
        coefficientMentionTBien: -1,
        coefficientSessionPrincipale: -1,
        coefficientRedouble: -1,
        coefficientFormation: -1,
        coefficientStage: -1,
        coefficientExperience: -1,
        coefficientCertificat: -1,
        coefficientDistinction: -1,
        coefficientAnneeSupplementaire: -1,
        nombreLimiteDeCertificat: -1,
	      nombreLimiteDeFormation: -1,
	      nombreLimiteDeStage: -1,
        nombreLimiteDExperience: -1,
        nombreDeRedoublementMax: -1
    });
}

  onSubmit() {
    this.formule = this.formuleForm.value;
    console.log(" ou ça: ",  this.formuleForm.value);
    console.log('dfdgsgdfg: ', this.formuleForm.value );
    this.formuleForm.reset({
      id: 0,
        coefficientBac: -1,
        mentionBac: -1,
        coefficientAnneeUniversitaire: -1,
        coefficientMentionABien: -1,
        coefficientMentionBien: -1,
        coefficientMentionTBien: -1,
        coefficientSessionPrincipale: -1,
        coefficientRedouble: -1,
        coefficientFormation: -1,
        coefficientDistinction: -1,
        coefficientStage: -1,
        coefficientExperience: -1,
        coefficientCertificat: -1,
        coefficientAnneeSupplementaire: -1,
        nombreLimiteDeCertificat: -1,
	      nombreLimiteDeFormation: -1,
	      nombreLimiteDeStage: -1,
        nombreLimiteDExperience: -1,
        nombreDeRedoublementMax: -1
    });
    this.formuleFormDirective.resetForm();
  }



  createFormule(formule?: ChampFormule): FormGroup {
    return this.formBuilder.group({
      id: 0,
        coefficientBac: this.form.coefficientBac,
        mentionBac: this.form.mentionBac,
        coefficientAnneeUniversitaire: this.form.coefficientAnneeUniversitaire,
        coefficientMentionABien: this.form.coefficientMentionABien,
        coefficientMentionBien: this.form.coefficientMentionABien,
        coefficientMentionTBien: this.form.coefficientMentionABien,
        coefficientDistinction: this.form.coefficientDistinction,
        coefficientSessionPrincipale: this.form.coefficientSessionPrincipale,
        coefficientRedouble: this.form.coefficientRedouble,
        coefficientFormation: this.form.coefficientFormation,
        coefficientStage: this.form.coefficientStage,
        coefficientExperience: this.form.coefficientExperience,
        coefficientCertificat: this.form.coefficientCertificat,
        coefficientAnneeSupplementaire: this.form.coefficientAnneeSupplementaire,
        nombreLimiteDeCertificat: this.form.nombreLimiteDeCertificat,
	      nombreLimiteDeFormation: this.form.nombreLimiteDeFormation,
	      nombreLimiteDeStage: this.form.nombreLimiteDeStage,
        nombreLimiteDExperience: this.form.nombreLimiteDExperience,
        nombreDeRedoublementMax: this.form.nombreDeRedoublementMax
    });
  }

  selectedMastere(mastere: Mastere) {
    this.mastere = mastere;
    console.log(this.mastere);
    //this.action = 'update';
  }

  ajouterUneFormule() {
    console.log('Mastere id: ' + this.mastere.id);
    this.formule = {
      'id': 0,
      'coefficientAnneeSupplementaire': 1,
      'coefficientAnneeUniversitaire': 1,
      'coefficientBac': 1,
      'coefficientCertificat': 2,
      'coefficientExperience': 1,
      'coefficientFormation': 1,
      'coefficientMentionABien': 0.5,
      'coefficientMentionBien': 1,
      'coefficientMentionTBien': 2,
      'coefficientDistinction': 0.5,
      'coefficientRedouble': 2,
      'coefficientSessionPrincipale': 2,
      'coefficientStage': 1,
      'mentionBac': 2,
      'nombreLimiteDeCertificat': 3,
	    'nombreLimiteDeFormation': 3,
	    'nombreLimiteDeStage': 3,
      'nombreLimiteDExperience': 3,
      'nombreDeRedoublementMax': 2
    } as ChampFormule;

    /*this.champFormuleService
        .createChampFormule(this.formule)
        .subscribe( data => {
          this.mastereService
              .ajouterChampFormuleAUnMastere(this.mastere.id, data.id)
              .subscribe( donnee => console.log(donnee), error => console.error( error ) );
        }, error => console.error( error ) );

    this.gestionDesFormules('update');*/
    //this.ngOnInit();

    if ( this.mastere.champFormule == null) {
      this.mastereService
          .ajouterChampFormulesAUnMastere(this.mastere.id, this.formule)
          .subscribe( donnee => console.log(donnee), error => console.error( error ) );
    }
    this.gestionDesFormules('update');
  }


  updateUneFormule(id: number) {
    console.log('The mastere: ', this.formuleForm.value);
    this.champFormuleService
        .updateChampFormule(id, this.formuleForm.value as ChampFormule)
        .subscribe( data => this.form = data, error => console.error( error ) );
    this.ngOnInit();
    this.gestionDesFormules('update');

   /* this.mastereService
        .updateChampFormuleAUnMastere(idMastere)
        .subscribe( donnee => this.champFormules = donnee, error => console.error( error ) );
    console.log('dfdgsgdfg: ', this.formuleForm.value );
    this.gestionDesFormules('update');
    this.ngOnInit();*/
  }



  gestionDesFormules(action: string) {
    switch (action) {
      case 'add': { this.action = action; }  break;
      case 'update': { this.action = action; }  break;
      case 'print': { this.action = action; } break;
    }
  }


  openDialog(master: Mastere): void {
    const dialogRef = this.dialog.open( VisualiserFormuleComponent , {
      width: '95%',
      height: '100%',
      position: { left: '5%' },
      data: { mastere: master }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.mastere = result;
      this.ngOnInit();
    });
    console.log('voir etudiant --- ', this.mastere);
  }


}
