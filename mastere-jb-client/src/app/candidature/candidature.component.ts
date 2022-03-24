import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {

  nb: number=0;
  tailleUrl: number;
  username = '';
  password = '';
  invalidLogin = false;
  errMess: string;

  user = { username: '', password: ''};

  anneeUniversitaire: string;

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit() {
    this.tailleUrl = baseURL.length;
    this.anneeUniversitaire = ( new Date().getFullYear()-1 ) + '/' + (new Date().getFullYear());
  }

}
