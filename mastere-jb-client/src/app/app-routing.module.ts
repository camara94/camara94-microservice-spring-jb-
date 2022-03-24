import { AddMastereInfoComponent } from './add-mastere-info/add-mastere-info.component';
import { SuiviComponent } from './suivi/suivi.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { VisualiserFormuleComponent } from './visualiser-formule/visualiser-formule.component';
import { EnvoyerNoticationComponent } from './envoyer-notication/envoyer-notication.component';
import { MgctComponent } from './mgct/mgct.component';
import { TicitComponent } from './ticit/ticit.component';
import { DemarcheComponent } from './demarche/demarche.component';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';
import { ListTypeComponent } from './list-type/list-type.component';
import { CertificationComponent } from './certification/certification.component';
import { DistinctionComponent } from './distinction/distinction.component';
import { FormationComponent } from './formation/formation.component';
import { DiplomeComponent } from './diplome/diplome.component';
import { BacComponent } from './bac/bac.component';
import { UpdateMentionComponent } from './update-mention/update-mention.component';
import { UpdateDomaineComponent } from './update-domaine/update-domaine.component';
import { ListMentionComponent } from './list-mention/list-mention.component';
import { ListDomaineComponent } from './list-domaine/list-domaine.component';
import { UpdateStageExperienceComponent } from './update-stage-experience/update-stage-experience.component';
import { UpdateCertificatComponent } from './update-certificat/update-certificat.component';
import { AddStageExperienceComponent } from './add-stage-experience/add-stage-experience.component';
import { AddCertificatComponent } from './add-certificat/add-certificat.component';
import { FormuleComponent } from './formule/formule.component';
import { ListAppelALaCandidatureComponent } from './list-appel-a-la-candidature/list-appel-a-la-candidature.component';
import { AppelALaCandidatureComponent } from './appel-a-la-candidature/appel-a-la-candidature.component';
import { ListEtablissementComponent } from './list-etablissement/list-etablissement.component';
import { UpdateDistinctionComponent } from './update-distinction/update-distinction.component';
import { AddDistinctionComponent } from './add-distinction/add-distinction.component';
import { FiltreComponent } from './filtre/filtre.component';
import { AddMentionComponent } from './add-mention/add-mention.component';
import { AddDomaineComponent } from './add-domaine/add-domaine.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { AddEtablissementPopupComponent } from './add-etablissement-popup/add-etablissement-popup.component';
import { AddBacComponent } from './add-bac/add-bac.component';
import { AddReleveNoteComponent } from './add-releve-note/add-releve-note.component';
import { UpdateReleveNoteComponent } from './update-releve-note/update-releve-note.component';
import { ListMastereComponent } from './list-mastere/list-mastere.component';
import { VerifierInscritMastereComponent } from './verifier-inscrit-mastere/verifier-inscrit-mastere.component';
import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { UpdateDiplomeComponent } from './update-diplome/update-diplome.component';
import { AddAnneeUniversitaireComponent } from './add-annee-universitaire/add-annee-universitaire.component';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { AddDiplomeComponent } from './add-diplome/add-diplome.component';
import { ProfileComponent } from './profile/profile.component';
import { FournirDossierComponent } from './fournir-dossier/fournir-dossier.component';
import { CandidatureComponent } from './candidature/candidature.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { AddMasterComponent } from './add-master/add-master.component';
import { DemandeComponent } from './demande/demande.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscrireComponent } from './inscrire/inscrire.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateBacComponent } from './update-bac/update-bac.component';
import { AddEtablissementComponent } from './add-etablissement/add-etablissement.component';
import { StageExperienceComponent } from './stage-experience/stage-experience.component';
import { ProcessusComponent } from './processus/processus.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'processus', component: ProcessusComponent, canActivate: [AuthGaurdService] },
  { path: 'candidature', component: CandidatureComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGaurdService]  },
  { path: 'inscrire', component: InscrireComponent, canActivate: [AuthGaurdService]  },
  { path: 'demande', component: DemandeComponent, canActivate: [AuthGaurdService]   },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-mastere', component: AddMasterComponent, canActivate: [AuthGaurdService]  },
  { path: 'confirm', component: ConfirmComponent, canActivate: [AuthGaurdService]  },
  { path: 'dossier', component: FournirDossierComponent, canActivate: [AuthGaurdService]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-diplome', component: AddDiplomeComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-formation', component: AddFormationComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-releve', component: AddAnneeUniversitaireComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-distinction', component: AddDistinctionComponent , canActivate: [AuthGaurdService] },
  { path: 'add-etablissement', component: AddEtablissementComponent , canActivate: [AuthGaurdService] },
  { path: 'add-type', component: AddTypeComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-domaine', component: AddDomaineComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-mention', component: AddMentionComponent , canActivate: [AuthGaurdService] },
  { path: 'add-releve/:id', component: AddReleveNoteComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-bac/:id', component: AddBacComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-certificat', component: AddCertificatComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-stage-experience', component: AddStageExperienceComponent },
  { path: 'verifier', component: VerifierInscritMastereComponent, canActivate: [AuthGaurdService]  },
  { path: 'update-bac/:id', component: UpdateBacComponent , canActivate: [AuthGaurdService] },
  { path: 'update-diplome/:id', component: UpdateDiplomeComponent , canActivate: [AuthGaurdService]  },
  { path: 'update-domaine/:id', component: UpdateDomaineComponent  , canActivate: [AuthGaurdService]  },
  { path: 'update-formation/:id', component: UpdateFormationComponent, canActivate: [AuthGaurdService]  },
  { path: 'udpate-mention/:id', component: UpdateMentionComponent  , canActivate: [AuthGaurdService] },
  { path: 'update-etudiant', component: UpdateEtudiantComponent , canActivate: [AuthGaurdService] },
  { path: 'filtre', component: FiltreComponent , canActivate: [AuthGaurdService] },
  { path: 'update-releve/:id', component: UpdateReleveNoteComponent },
  { path: 'update-distinction/:id', component: UpdateDistinctionComponent, canActivate: [AuthGaurdService]  },
  { path: 'update-certificat/:id', component: UpdateCertificatComponent , canActivate: [AuthGaurdService] },
  { path: 'update-stage-experience/:id', component: UpdateStageExperienceComponent , canActivate: [AuthGaurdService] },
  { path: 'list-domaine', component: ListDomaineComponent, canActivate: [AuthGaurdService]  },
  { path: 'list-mastere', component: ListMastereComponent, canActivate: [AuthGaurdService]  },
  { path: 'list-mention', component: ListMentionComponent, canActivate: [AuthGaurdService]  },
  { path: 'list-etablissement', component: ListEtablissementComponent, canActivate: [AuthGaurdService]  },
  { path: 'list-type', component: ListTypeComponent , canActivate: [AuthGaurdService] },
  { path: 'appel-a-la-candidature', component: AppelALaCandidatureComponent, canActivate: [AuthGaurdService]  },
  { path: 'appel', component: ListAppelALaCandidatureComponent , canActivate: [AuthGaurdService] },
  { path: 'formule', component: FormuleComponent, canActivate: [AuthGaurdService]  },
  { path: 'bac', component: BacComponent, canActivate: [AuthGaurdService]  },
  { path: 'diplome', component: DiplomeComponent, canActivate: [AuthGaurdService]  },
  { path: 'formation', component: FormationComponent , canActivate: [AuthGaurdService] },
  { path: 'distinction', component: DistinctionComponent, canActivate: [AuthGaurdService]  },
  { path: 'certification', component: CertificationComponent , canActivate: [AuthGaurdService] },
  { path: 'stage-experience', component: StageExperienceComponent, canActivate: [AuthGaurdService]  },
  { path: 'demarche', component: DemarcheComponent , canActivate: [AuthGaurdService] },
  { path: 'ticit', component: TicitComponent },
  { path: 'mgct', component: MgctComponent },
  { path: 'send-notification', component: EnvoyerNoticationComponent, canActivate: [AuthGaurdService]  },
  { path: 'voir-formule', component: VisualiserFormuleComponent },
  { path: 'suivi', component: SuiviComponent, canActivate: [AuthGaurdService]  },
  { path: 'add-mastere-info', component: AddMastereInfoComponent, canActivate: [ AuthGaurdService ] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
