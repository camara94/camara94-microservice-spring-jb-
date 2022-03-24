import { DomaineService } from './../service/domaine.service';
import { Domaine } from './../shared/domaine';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.scss']
})
export class ListDomaineComponent implements OnInit {

  domaines: Domaine[];

  constructor(private domaineService: DomaineService) { }

  ngOnInit() {
    this.domaineService
        .getDomaines()
        .subscribe( data => this.domaines = data, error => console.error( error) );
  }

}
