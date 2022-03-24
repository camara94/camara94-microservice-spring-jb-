import { MastereEtudiantService } from './../service/mastere-etudiant.service';
import { AuthenticationService } from './../service/authentication.service';
import { DossierDetailComponent } from './../dossier-detail/dossier-detail.component';
import { MastereEtudiantId } from './../shared/mastereEtudiantId';
import { MastereEtudiant } from './../shared/mastereEtudiant';
import { AnneeUniversitaire } from './../shared/anneeUniversitaire';
import { EtablissementService } from './../service/etablissement.service';
import { MastereService } from './../service/mastere.service';
import { Mastere } from './../shared/mastere';
import { EtudiantService } from './../service/etudiant.service';
import { Etablissement } from './../shared/etablissement';
import { HttpClientService } from './../service/httpclient.service';
import { Component, OnInit, ViewChild,  ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Etudiant } from '../shared/etudiant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {

  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

  etablissements: Etablissement[];
  etablissement: Etablissement = null;
  etabErrMess: string;

  message: string;
  etudError: string;
  idEt: string;
  etudiants: Etudiant[];
  masteres: Mastere[];
  mu: Mastere[] = [];
  dejaInscrit: boolean = false;
  inscritMsg: string = "";

  annees = new Set();
  diplayMastere: boolean = false;
  filterListeCandidat: boolean = false;
  etudiant: Etudiant;
  chaine: string;
  mastereEtudiant: MastereEtudiant;
  mastereEtudiants: MastereEtudiant[];
  mastereSelected: Mastere;
  nombreDEtudiantInscris: number = 0;

  constructor(
    private mastereService: MastereService,
    private mastereEtudiantService: MastereEtudiantService,
    private httpClientService: HttpClientService,
    private authenticationService: AuthenticationService,
    private etudiantService: EtudiantService,
    private etablissementService: EtablissementService,
    public dialog: MatDialog
  ) {
      this.etudiantService
          .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
          .subscribe( data => this.idEt = data.id, error => console.error( error ) );
   }

  ngOnInit() {

    this.mastereEtudiantService
        .getMastereEtudiants()
        .subscribe( data => this.mastereEtudiants = data, error => console.error( error ) );

    this.etablissementService
        .getEtablissements()
        .subscribe( data => {
          this.etablissements = data;
        }, error => console.error(error) );

    this.mastereService
          .getMasteres()
          .subscribe(
            data => {
            data.forEach((mastere, index) => {
              mastere.etudiants.forEach((e, i) => {
                if ( e.id.etudiantId === this.idEt ) {
                  this.inscritMsg = "Vous êtes déjà inscrit au mastère: " + mastere.libele;
                  this.dejaInscrit = true;
                }
              });
            });
            console.log(data);
          },
            error => { console.error(error); }
          );

   /* this.etudiantService
        .getEtudiants()
        .subscribe( data => this.etudiants = data, error => console.error(error) );*/
  }

  getUnEtablissement(index: number) {
    this.etablissement = this.etablissements[index];
    this.getAnneeByEtablissement( this.etablissement.id );
  }

  inscrireMastere(idMastere, idEtudiant) {
    this.httpClientService
        .inscrireUnEtudiantAUnMastere(idMastere, idEtudiant)
        .subscribe(
          msg => {this.message = msg; },
          error => { this.etudError = error; }
        );
  }

  getMastereByAnnee( annee: string) {
    let mastereIds: MastereEtudiant[] = [];
    this.masteres = [];
    this.etablissement
        .masteres
        .forEach( mastere => {
            mastereIds = mastere.etudiants.filter( (me, index ) => me.anneeUniversitaire === annee );
            mastereIds.forEach( (mastereId, i) => {
               this.mastereService
                   .getMasteres()
                   .subscribe( mm => {
                      if (mm[i].id === mastereId.id.mastereId && mastereId.anneeUniversitaire === annee
                                  && !this.uniqueMastere(mm[i].id, this.masteres) && mm[i].etudiants.length > 0  ) {
                        this.mastereService
                            .getMastereById(mastereId.id.mastereId)
                            .subscribe( data => { this.masteres.push(mm[i]); console.log("mastere: ", data); }, error => console.error(error) );
                      }
                   }, error => console.error( error ) );
                   //console.log(this.uniqueMastere(this.masteres));
            } );
        } );


    this.afficherMastere();
  }

  afficherMastere() {
    this.diplayMastere = true;
  }


  getAnneeByEtablissement(id: number) {
    this.annees.clear();
    let an = [];
    this.etablissement = this.etablissements.filter( ( et, index ) => et.id === id )[0];
    console.log('Etablissement: ', this.etablissement);
    this.etablissement.masteres.forEach( mastere => {
        mastere.etudiants.forEach( etudiant => {
          an.push(etudiant.anneeUniversitaire);
            } );
        } );
    this.annees = new Set(an);
  }

  getEtudiantsByMastere( mastere: Mastere ) {
    console.log("Premier mastere: ", mastere);
    this.etudiants = [];
    mastere.etudiants
          .forEach( etudiant => {
              this.etudiantService
                  .getEtudiantById( etudiant.id.etudiantId )
                  .subscribe( data => {
                       if ( data.validerDossier === true) {
                         this.etudiants.push(data);
                       }
                     }, error => console.error(error) );
          } );

      this.mastereSelected = mastere;

    console.log("Etudiants: ", this.etudiants);
    this.getNombreDEtudiantInscris();
    console.log('nombre d\'inscris est: ' + this.nombreDEtudiantInscris);
  }

  appliquerFilter() {
    this.filterListeCandidat = !this.filterListeCandidat;
    this.ngOnInit();
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open( DossierDetailComponent , {
      width: '90%',
      position: { left: '5%' },
      data: { etudiant: this.getEtudiantById(id)}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.etudiant = result;
    });
  }

  getEtudiantById = ( id: string ) => this.etudiants.filter( etud => etud.id === id )[0];

  openPDF(): void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p', 'pt', [1360, 1350]); //new jsPDF('p', 'px', 'a4');
    doc.fromHTML(DATA.innerHTML, 14, 14, {
      'width': '100%',
    });
    doc.output('dataurlnewwindow');
  }


  downloadPDF(): void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p', 'pt', [1360, 1350]); //new jsPDF('p', 'px', 'a4');

    let handleElement = {
      '#editor':function(element, renderer) {
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 50, 40, {
      'width': 900,
      'elementHandlers': handleElement
    });

    doc.save('listeDesEtudiants.pdf');
  }

  uniqueMastere = ( id: number, arrays ) => arrays.some( (item, index) => item.id === id );

  getScoreByEtudiant = ( mastereId: number, etudiantId: string ): MastereEtudiant => this.mastereEtudiants.filter( (item, i) => (item.id.mastereId === mastereId && item.id.etudiantId === etudiantId ))[0]

  getNombreDEtudiantInscris() {
    this.etudiants
        .forEach( e => {
          if (e.validerDossier === true) {
            this.nombreDEtudiantInscris++;
          }
        } )
  }
}
