import { Etablissement } from './../shared/etablissement';
import { EtablissementService } from './../service/etablissement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-etablissement',
  templateUrl: './list-etablissement.component.html',
  styleUrls: ['./list-etablissement.component.scss']
})
export class ListEtablissementComponent implements OnInit {

  etablissements: Etablissement[];
  constructor(
    private etablissementService: EtablissementService
  ) { }

  ngOnInit() {
    this.etablissementService
        .getEtablissements()
        .subscribe(data => this.etablissements = data, error => console.error(error));

        setTimeout(() => {
          this.etablissements.forEach(etab => {
            console.log(etab.masteres)
          })
        }, 2000);
  }

}
