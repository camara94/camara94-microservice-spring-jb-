import { EtablissementService } from './../service/etablissement.service';
import { MastereService } from './../service/mastere.service';
import { Mastere } from './../shared/mastere';
import { Component, OnInit } from '@angular/core';
import { Etablissement } from '../shared/etablissement';

@Component({
  selector: 'app-list-mastere',
  templateUrl: './list-mastere.component.html',
  styleUrls: ['./list-mastere.component.css']
})
export class ListMastereComponent implements OnInit {

  masteres: Mastere[];
  etablissements: Etablissement[];
  constructor(
    private mastereService: MastereService,
    private etablissementService: EtablissementService
  ) { }

  ngOnInit() {
    this.mastereService
        .getMasteres()
        .subscribe(data => this.masteres = data, error => console.log(error) );

    this.etablissementService
        .getEtablissements()
        .subscribe(data => {this.etablissements = data; }, error => console.error(error));
  }

}
