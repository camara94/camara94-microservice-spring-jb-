import { MastereService } from './../service/mastere.service';
import { MentionService } from './../service/mention.service';
import { TypeService } from './../service/type.service';
import { EtablissementService } from './../service/etablissement.service';
import { AddEtablissementPopupComponent } from './../add-etablissement-popup/add-etablissement-popup.component';
import { Type } from './../shared/type';
import { ConfirmComponent } from './../confirm/confirm.component';
import { Mastere } from './../shared/mastere';
import { Component, OnInit} from '@angular/core';
import { HttpClientService } from './../service/httpclient.service';
import { Etablissement } from './../shared/etablissement';
import { Domaine } from './../shared/domaine';
import { Mention } from './../shared/mention';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.css']
})
export class AddMasterComponent implements OnInit {

  mastereForm: FormGroup;
  etablissements: Etablissement[];
  //etablissement: Etablissement;
  etabErrMess: string;

  masteres: Mastere[];

  domaines: Domaine[];
  //domaine: Domaine;
  domErrMess: string;

  mastere: Mastere;
  maErrMess: string;
  ma: Mastere;
  mentions: Mention[];
  //mention: Mention;
  menErrMess: string;

  etabId: number;
  domId: number;
  menId: number;
  m: any;
  data: Mastere;

  etablissementNExistePas = false;
  mentionNExistePas = false;
  typeNExistePas = false;


  types: Type[];
  tyErrMess: string;
  etab: Etablissement;
  men: Mention;
  mast: Mastere;
  ty: Type;
  errMess: any;

  chargement = false;

  t={'libele':'', 'mention':0,'nomMention': '', 'type':0, 'nomType': '', 'etablissement':0, 'nomEtablissement':''};

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private etablissementService: EtablissementService,
    private typeService: TypeService,
    private mentionService: MentionService,
    private mastereService: MastereService
  ) {
    this.createForm();
  }

  ngOnInit() {


    console.log("AVANT: " + this.etablissementNExistePas);
    this.httpClientService
        .getEtablissements()
        .subscribe(
          response =>this.handleSuccessfulResponse(response),
          errmess => this.etabErrMess = <any>errmess
        );

    this.httpClientService
        .getDomaines()
        .subscribe(
          response => {this.domaines = response; },
          errmess => {this.domErrMess = <any>errmess; }
        );

    this.httpClientService
        .getMentions()
        .subscribe( response => this.mentions = response, errmess => this.menErrMess = <any>errmess);

    this.typeService
        .getTypes()
        .subscribe( response => this.types = response, errmess => this.tyErrMess = <any>errmess );
  }


  handleSuccessfulResponse(response) {
      this.etablissements = response;
      console.log(this.etablissements);
  }

  createForm() {
    this.mastereForm = this.fb.group(this.t);
  }

  onSubmit() {

    setTimeout(() => {
      this.httpClientService
          .getMasteres()
        .subscribe(
          response => {this.masteres = response},
          errmess => { console.log(errmess)}
     );
    }, 2000);
   }


   addMastere() {
     //Création du mastère
      this.mastereService
      .createMastere({ "libele" : this.mastereForm.value.libele as string} as Mastere)
      .subscribe(data => { this.mast = data; }, error => { console.error(error); });

     //Au cas oû l'établissement, la mention et le type n'existent pas dans la base
      if (this.etablissementNExistePas && this.mentionNExistePas && this.typeNExistePas) {
        this.etablissementService.createEtablissements({'nom': this.mastereForm.value.nomEtablissement} as Etablissement)
            .subscribe(data => this.etab = data, error => this.errMess = error);

        this.mentionService
            .createMentions({'nom': this.mastereForm.value.nomMention as string} as Mention)
            .subscribe( data => this.men = data, error => console.error(error) );

        this.typeService
            .createTypes({'nom': this.mastereForm.value.nomType as string} as Type)
            .subscribe(data => this.ty = data, error =>  console.error(error) );

        setTimeout(() => {
            console.log('les ids: ' + this.men.id + ', ' + this.ty.id + ', ' + this.etab.id);
            this.addSelonEtablissementTypeMentionExiste(
                  this.men.id,
                  this.ty.id,
                  this.etab.id,
                  this.mast.id
               );
          }, 4000);

      }

      //Au cas oû l'établissement, la mention  n'existent pas dans la base
      if (this.etablissementNExistePas && this.mentionNExistePas && !this.typeNExistePas) {
        this.etablissementService.createEtablissements({"nom": this.mastereForm.value.nomEtablissement} as Etablissement)
        .subscribe(data => this.etab = data, error => this.errMess = error );

        this.mentionService
            .createMentions({'nom': this.mastereForm.value.nomMention as string} as Mention)
            .subscribe( data => this.men = data, error => console.error(error) );


        setTimeout(() => {
                console.log('les ids: ' + this.men.id + ', ' + this.ty.id + ', ' + this.etab.id);
                this.addSelonEtablissementTypeMentionExiste(
                  this.men.id,
                  this.mastereForm.value.type,
                  this.etab.id,
                  this.mast.id
               );
            }, 4000);

      }


       //Au cas oû l'établissement, et le type  n'existent pas dans la base
      if ( this.etablissementNExistePas && !this.mentionNExistePas && this.typeNExistePas ) {
        this.etablissementService.createEtablissements({'nom': this.mastereForm.value.nomEtablissement} as Etablissement)
                                 .subscribe(data => this.etab = data, error => this.errMess = error );

        this.typeService
            .createTypes({'nom': this.mastereForm.value.nomType as string} as Type)
            .subscribe(data => this.ty = data, error => console.error(error) );


        setTimeout(() => {
                console.log('les ids: ' + this.men.id + ', ' + this.ty.id + ', ' + this.etab.id);
                this.addSelonEtablissementTypeMentionExiste(
                  this.mastereForm.value.mention,
                  this.ty.id,
                  this.etab.id,
                  this.mast.id
               );
            }, 4000);

      }



      //Au cas la mention et le type n'existent pas dans la base
      if (!this.etablissementNExistePas && this.mentionNExistePas && this.typeNExistePas) {
        this.mentionService
            .createMentions({'nom': this.mastereForm.value.nomMention as string} as Mention)
            .subscribe( data => this.men = data, error => console.error(error) );

        this.typeService
            .createTypes({'nom': this.mastereForm.value.nomType as string} as Type)
            .subscribe(data => this.ty = data, error => console.error(error) );

        setTimeout( () => {
                console.log('les ids: ' + this.men.id + ', ' + this.ty.id + ', ' + this.etab.id);
                this.addSelonEtablissementTypeMentionExiste(
                  this.men.id,
                  this.ty.id,
                  this.mastereForm.value.etablissement,
                  this.mast.id
               );
            }, 4000);

      }

      //Au cas oû la mention n'existe pas dans la base
      if (!this.etablissementNExistePas && this.mentionNExistePas && !this.typeNExistePas) {
        this.mentionService
            .createMentions({'nom': this.mastereForm.value.nomMention as string} as Mention)
            .subscribe( data => this.men = data, error => console.error(error) );

        setTimeout( ( ) => {
                this.addSelonEtablissementTypeMentionExiste(
                  this.men.id,
                  this.mastereForm.value.type,
                  this.mastereForm.value.etablissement,
                  this.mast.id
               );
            }, 4000);

      }

      //Au cas oû l'établissement n'existe pas dans la base
      if ( this.etablissementNExistePas && !this.mentionNExistePas && !this.typeNExistePas ) {
        this.etablissementService
            .createEtablissements({'nom': this.mastereForm.value.nomEtablissement} as Etablissement)
            .subscribe( data => this.etab = data, error => this.errMess = error );


        setTimeout( () => {
                this.addSelonEtablissementTypeMentionExiste(
                  this.mastereForm.value.mention,
                  this.mastereForm.value.type,
                  this.etab.id,
                  this.mast.id
               );
            }, 4000);

      }

      //Au cas oû le type n'existe pas dans la base
      if ( !this.etablissementNExistePas && !this.mentionNExistePas && this.typeNExistePas ) {
        this.typeService
            .createTypes({'nom': this.mastereForm.value.nomType as string} as Type)
            .subscribe(data => this.ty = data, error => console.error(error) );


        setTimeout( () => {
                this.addSelonEtablissementTypeMentionExiste(
                  this.mastereForm.value.mention,
                  this.ty.id,
                  this.mastereForm.value.etablissement,
                  this.mast.id
               );
            }, 4000);

      }


     //Au cas oû l'établissement, la mention et le type existent dans la base
      if ( !this.etablissementNExistePas && !this.mentionNExistePas && !this.typeNExistePas ) {
       setTimeout( () => {
        this.addSelonEtablissementTypeMentionExiste(
          this.mastereForm.value.mention,
          this.mastereForm.value.type,
          this.mastereForm.value.etablissement,
          this.mast.id
        );
       }, 2000);

      }

      setTimeout( () => {
        this.ngOnInit();
        this.router.navigate(['/list-mastere']);
      }, 4000);

      this.chargement = true;

   }


   convertMastere() {
      return ({
        "libele": this.data.libele,
        "mention": {
            "id": this.data.mention.id,
            "nom": this.data.mention.nom,
            "domaine": {
                "id": this.data.mention.domaine.id,
                "libelle": this.data.mention.domaine.libelle
            }
        }
    });
   }


   addEtablissementIfNotExist() {

      const loginRef = this.dialog.open( AddEtablissementPopupComponent , {width: '550px', height: '250px'});
      loginRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });

  }

  activeAutreEtablissement() {
    this.etablissementNExistePas = true;
  }

  activeAutreMention() {
    this.mentionNExistePas = true;
  }

  activeAutreType() {
    this.typeNExistePas = true;
  }

  addSelonEtablissementTypeMentionExiste(idMention: number, idType: number, idEtablissement: number, mastereId: number) {
    this.mastereService
    .updateMasteres(
      mastereId,
      idMention,
      idType
      )
    .subscribe(
      data => { this.mastere = data;
                setTimeout(() => {
                  this.etablissementService
                      .ajouterUnMastereAUnEtablissement(
                        idEtablissement,
                        mastereId
                        )
                          .subscribe(
                            m => {console.log(m)},
                            error => console.log(error)
                          );
                    }, 900);
            },
            error => {
              console.log(error); this.maErrMess = error;
            }
      );
    this.chargement = true;
  }


}
