import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit() {}

}
