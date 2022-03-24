import { AppelALaCandidatureService } from './../service/appel-a-la-candidature.service';
import { MastereService } from './../service/mastere.service';
import { EtablissementService } from './../service/etablissement.service';
import { AppelALaCandidature } from './../shared/appelALaCandidature';
import { Etablissement } from './../shared/etablissement';
import { Component, OnInit } from '@angular/core';
import { Mastere } from '../shared/mastere';

@Component({
  selector: 'app-list-appel-a-la-candidature',
  templateUrl: './list-appel-a-la-candidature.component.html',
  styleUrls: ['./list-appel-a-la-candidature.component.scss']
})
export class ListAppelALaCandidatureComponent implements OnInit {

  etablissements: Etablissement[];
  etablissementAppel: Etablissement[];
  masteres: Mastere[];
  masteresAppel: Mastere[];
  appelALaCandidatures: AppelALaCandidature[];
  chargement: boolean = true;
  disponible: number = 1;

  constructor(
    private etablissementService: EtablissementService,
    private mastereService: MastereService,
    private appelALaCandidatureService: AppelALaCandidatureService
  ) {
    setTimeout( () => { this.chargement = false }, 3000 );
  }

  ngOnInit() {
    this.appelALaCandidatureService
        .getAppelALaCandidatures()
        .subscribe( data => this.appelALaCandidatures = data, error => console.error(error) );
    this.etablissementService
        .getEtablissements()
        .subscribe( data => this.etablissements = data, error => console.error( error ) );
    this.mastereService
        .getMasteres()
        .subscribe( data => this.masteres = data, error => console.error( error ) );
    setTimeout( () => {
      if ( this.appelALaCandidatures !== null ) {
          this.etablissementAppel = [];
          this.etablissements
              .forEach( ( etab, index ) => {
                  this.appelALaCandidatures
                      .forEach( (appel, i) => {
                        if ( appel.etablissementId === etab.id ) {
                          this.etablissementAppel.push(etab);
                        }
                  } );
          } );
      }
    }, 2000);
  }

  lancerAppel(idMastere: number) {
    //this.disponible = ( this.disponible === 1 ) ? 0 : 1;
    let mastere: Mastere;
    this.masteres
        .forEach( mas => {
          if ( mas.id === idMastere ) {
            mastere = mas;
          }
        } );

    mastere.disponible = ( mastere.disponible === 1 ) ? 0 : 1;

    this.mastereService
        .updateMastereDisponible( idMastere, mastere.disponible )
        .subscribe ( data => console.log(data), error => console.error( error ) );
  }

  getEtablissementById = ( id: number ) => this.etablissements.filter( etab => etab.id === id )[0];
  getMastereById = ( id: number ) => this.masteres.filter( ma => ma.id === id )[0];
}
