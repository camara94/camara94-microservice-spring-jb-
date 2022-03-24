import { Router } from '@angular/router';
import { Etudiant } from './../shared/etudiant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: any;
  constructor(
    public httpClient: HttpClient,
    private router: Router
    ) { }

    login(compte: any): Observable<any> {
      return this.httpClient.post<any>(baseURL + 'authentification', compte);
    }

    createCompte(compte: Etudiant): Observable<Etudiant> {
      return this.httpClient.post<Etudiant>(baseURL + 'signup', compte);
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user = null;
      this.router.navigateByUrl('/login');
    }

   

}
