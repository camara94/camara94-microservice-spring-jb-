import { MastereEtudiant } from './../shared/mastereEtudiant';
import { MastereEtudiantService } from './../service/mastere-etudiant.service';
import { MastereService } from './../service/mastere.service';
import { Mastere } from './../shared/mastere';
import { EtudiantService } from './../service/etudiant.service';
import { Etablissement } from './../shared/etablissement';
import { HttpClientService } from './../service/httpclient.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Etudiant } from '../shared/etudiant';



@Component({
  selector: 'app-verifier-inscrit-mastere',
  templateUrl: './verifier-inscrit-mastere.component.html',
  styleUrls: ['./verifier-inscrit-mastere.component.css']
})
export class VerifierInscritMastereComponent implements OnInit {
  etablissements: Etablissement[];
  etablissement: Etablissement=null;
  etabErrMess: string;

  mastereEtudiants: MastereEtudiant[];
  mastereEtudiantDistinct: MastereEtudiant[];
  mastereEtudiant: MastereEtudiant=null;
  masEtErrMess: string;


  message: string;
  etudError: string;
  idEt: string;
  etudiants: Etudiant[];
  masteres: Mastere[];
  dejaInscrit: boolean = false;
  inscritMsg: string = "";

  anneeU: any[];
  annees: string[];
  annee: string;
  mastereId: number;
  mastere: Mastere;

  constructor(
    private mastereService: MastereService,
    private httpClientService: HttpClientService,
    private authenticationService: AuthenticationService,
    private mastereEtudiantService: MastereEtudiantService,
    private etudiantService: EtudiantService
  ) {
    this.etudiantService
        .getEtudiantByUsername( this.authenticationService.getTokenParsed().preferred_username )
        .subscribe( data => {this.idEt = data.id}, error => console.error(error) );
   }

  ngOnInit() {

     this.httpClientService
          .getEtablissements()
          .subscribe(
                  response => this.handleSuccessfulResponse(response),
                  errmess => this.etabErrMess = <any>errmess
                 );

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
            console.log(data); },
            error => { console.error(error); }
          );

     this.mastereEtudiantService
        .getAnneeUniversitaire()
        .subscribe(
                data => { this.annees = data; console.log("AAA, ", this.annees); },
                error => { this.masEtErrMess = error; }
              );

     console.log(this.handleSuccessfulResponse);

    // let t = this.mastereEtudiants.filter(this.getUniqueValeur);
     //console.log('ttt ', t);



  }


  getUniqueValeur(value, index, self) {
    return self.indexOf(value) === index;
  }

  handleSuccessfulResponse(response)
  {
      this.etablissements = response;
  }

  getUnEtablissement(index: number) {
    this.etablissement = this.etablissements[index];
  }


  getMastereId(mastere: Mastere) {
    //console.log("mastere id: " + mastere.id);
    this.mastereId = mastere.id;
  }

  getAnnee(annee: string) {
    this.etudiants = [];
    this.mastere = null;
    console.log("mastere id: " + this.mastereId);
    console.log("année : " + annee);
    this.annee = annee;

    this.mastereEtudiantService
    .getMastereEtudiantByMastereIdAndAnneeUniversitaire(this.mastereId, this.annee)
    .subscribe(
      data => { this.mastereEtudiants = data; console.log("mastereEtudiants",  this.mastereEtudiants);

      if(this.mastereEtudiants != null) {
        this.mastereEtudiants.forEach((etudiant, index)=>{
          this.etudiantService
              .getEtudiantById(etudiant.id.etudiantId)
              .subscribe(
                data => { this.etudiants.push(data); console.log(this.etudiants)}
              )
        })


        this.mastereEtudiants.forEach((etudiant, index)=>{
          this.mastereService
          .getMastereById(etudiant.id.mastereId)
          .subscribe(
            data=>{this.mastere=data; console.log(this.mastere)}

          )
        })


      }

    },
      error => { console.error(error); }
    );


  }

  inscrireMastere(idMastere, idEtudiant) {

  }
}
