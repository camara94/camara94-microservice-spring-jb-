import { TypeService } from './../service/type.service';
import { Type } from './../shared/type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {

  types: Type[];

  constructor(private typeService: TypeService) { }

  ngOnInit() {
    this.typeService
        .getTypes()
        .subscribe( data => this.types = data, error => console.error( error) );
  }

}
