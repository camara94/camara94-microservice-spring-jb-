import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demarche',
  templateUrl: './demarche.component.html',
  styleUrls: ['./demarche.component.scss']
})
export class DemarcheComponent implements OnInit {
  id: number;
  url: string;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    switch ( this.id ) {
      case 1: this.url = '../../assets/img/brochure-mastere-mieh-2015-p1.jpg'; break;
      case 2: this.url = null; break;
      case 2: this.url = null; break;
    }

  }

}
