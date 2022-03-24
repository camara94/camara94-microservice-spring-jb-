import { VariablesGlobales } from './shared/variableGlobale';
import { KatexModule } from 'ng-katex';
import { MathModule } from './math/math.module';
import { KeycloakHttpInterceptorService } from './service/keycloak-http-interceptor.service';
import { KeycloakSecurityService } from './service/keycloak-security.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';


import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import 'hammerjs';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';


import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { LogoutComponent } from './logout/logout.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { DemandeComponent } from './demande/demande.component';
import { UserConfirmationComponent } from './user-confirmation/user-confirmation.component';
import { ProcessHTTPMsgService } from './service/process-httpmsg.service';
import { AddMasterComponent } from './add-master/add-master.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { FournirDossierComponent } from './fournir-dossier/fournir-dossier.component';
import { ProfileComponent } from './profile/profile.component';
import { AddDiplomeComponent } from './add-diplome/add-diplome.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { AddAnneeUniversitaireComponent } from './add-annee-universitaire/add-annee-universitaire.component';
import { UpdateDiplomeComponent } from './update-diplome/update-diplome.component';
import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { VerifierInscritMastereComponent } from './verifier-inscrit-mastere/verifier-inscrit-mastere.component';
import { AddEtablissementPopupComponent } from './add-etablissement-popup/add-etablissement-popup.component';
import { ListMastereComponent } from './list-mastere/list-mastere.component';
import { UpdateReleveNoteComponent } from './update-releve-note/update-releve-note.component';
import { AddReleveNoteComponent } from './add-releve-note/add-releve-note.component';

import { MatDatepickerModule, MatNativeDateModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddBacComponent } from './add-bac/add-bac.component';
import { UpdateBacComponent } from './update-bac/update-bac.component';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { AddDomaineComponent } from './add-domaine/add-domaine.component';
import { AddMentionComponent } from './add-mention/add-mention.component';
import { FiltreComponent } from './filtre/filtre.component';
import { AddDistinctionComponent } from './add-distinction/add-distinction.component';
import { UpdateDistinctionComponent } from './update-distinction/update-distinction.component';
import { ListEtablissementComponent } from './list-etablissement/list-etablissement.component';
import { AppelALaCandidatureComponent } from './appel-a-la-candidature/appel-a-la-candidature.component';
import { ListAppelALaCandidatureComponent } from './list-appel-a-la-candidature/list-appel-a-la-candidature.component';
import { DossierDetailComponent } from './dossier-detail/dossier-detail.component';
import { FormuleComponent } from './formule/formule.component';
import { AddCertificatComponent } from './add-certificat/add-certificat.component';
import { AddStageExperienceComponent } from './add-stage-experience/add-stage-experience.component';
import { UpdateCertificatComponent } from './update-certificat/update-certificat.component';
import { UpdateStageExperienceComponent } from './update-stage-experience/update-stage-experience.component';
import { ListDomaineComponent } from './list-domaine/list-domaine.component';
import { ListMentionComponent } from './list-mention/list-mention.component';
import { UpdateDomaineComponent } from './update-domaine/update-domaine.component';
import { UpdateMentionComponent } from './update-mention/update-mention.component';
import { BacPipe } from './bac.pipe';
import { BacComponent } from './bac/bac.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { FormationComponent } from './formation/formation.component';
import { DistinctionComponent } from './distinction/distinction.component';
import { CertificationComponent } from './certification/certification.component';
import { StageExperienceComponent } from './stage-experience/stage-experience.component';
import { ListTypeComponent } from './list-type/list-type.component';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';
import { DemarcheComponent } from './demarche/demarche.component';
import { ProcessusComponent } from './processus/processus.component';
import { TicitComponent } from './ticit/ticit.component';
import { MgctComponent } from './mgct/mgct.component';
import { VoirJustificatifComponent } from './voir-justificatif/voir-justificatif.component';
import { EnvoyerNoticationComponent } from './envoyer-notication/envoyer-notication.component';
import { VisualiserFormuleComponent } from './visualiser-formule/visualiser-formule.component';
import { MathDirectiveDirective } from './math-directive.directive';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { InscriptionModalComponent } from './inscription-modal/inscription-modal.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SuiviComponent } from './suivi/suivi.component';
import { AddMastereInfoComponent } from './add-mastere-info/add-mastere-info.component';


export function kcFactory(kcSecurity: KeycloakSecurityService) {
  return () => kcSecurity.init();
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    InscrireComponent,
    LogoutComponent,
    DemandeComponent,
    UserConfirmationComponent,
    AddMasterComponent,
    ConfirmComponent,
    CandidatureComponent,
    FournirDossierComponent,
    ProfileComponent,
    AddDiplomeComponent,
    AddFormationComponent,
    AddAnneeUniversitaireComponent,
    UpdateDiplomeComponent,
    UpdateFormationComponent,
    VerifierInscritMastereComponent,
    AddEtablissementPopupComponent,
    ListMastereComponent,
    UpdateReleveNoteComponent,
    AddReleveNoteComponent,
    AddBacComponent,
    UpdateBacComponent,
    AddEtablissementComponent,
    AddTypeComponent,
    AddDomaineComponent,
    AddMentionComponent,
    FiltreComponent,
    AddDistinctionComponent,
    UpdateDistinctionComponent,
    ListEtablissementComponent,
    AppelALaCandidatureComponent,
    ListAppelALaCandidatureComponent,
    DossierDetailComponent,
    FormuleComponent,
    AddCertificatComponent,
    AddStageExperienceComponent,
    UpdateCertificatComponent,
    UpdateStageExperienceComponent,
    ListDomaineComponent,
    ListMentionComponent,
    UpdateDomaineComponent,
    UpdateMentionComponent,
    BacPipe,
    BacComponent,
    DiplomeComponent,
    FormationComponent,
    DistinctionComponent,
    CertificationComponent,
    StageExperienceComponent,
    ListTypeComponent,
    UpdateEtudiantComponent,
    DemarcheComponent,
    ProcessusComponent,
    TicitComponent,
    MgctComponent,
    VoirJustificatifComponent,
    EnvoyerNoticationComponent,
    VisualiserFormuleComponent,
    MathDirectiveDirective,
    MathjaxComponent,
    InscriptionModalComponent,
    ProfileModalComponent,
    PageNotFoundComponent,
    SuiviComponent,
    AddMastereInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialFileInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    KatexModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],

  providers: [
    { provide: APP_INITIALIZER, deps: [KeycloakSecurityService], useFactory: kcFactory, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: KeycloakHttpInterceptorService, multi: true },
    {provide: 'baseURL', useValue: baseURL},
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    ProcessHTTPMsgService,
    VariablesGlobales

  ],
  entryComponents: [
    UserConfirmationComponent,
    ConfirmComponent,
    AddEtablissementPopupComponent,
    DossierDetailComponent,
    VoirJustificatifComponent,
    EnvoyerNoticationComponent,
    VisualiserFormuleComponent,
    InscriptionModalComponent,
    ProfileModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
