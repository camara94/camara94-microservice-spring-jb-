import { Notification } from './notification';
import { StageExperience } from './stageExperience';
import { Certificat } from './certificat';
import { MastereEtudiant } from './mastereEtudiant';
import { Formation } from './formation';
import { Diplome } from './diplome';
import { Bac } from './bac';
import { Distinction } from './distinction';
export interface Etudiant {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cin: string;
  telephone: string;
  diplomes: Diplome[];
  formations: Formation[];
  distinctions: Distinction[];
  bac: Bac;
  moyenneNoteAnneeUniversitaire: number;
  masteres: MastereEtudiant[];
  certificats: Certificat[];
  stageExperiences: StageExperience[];
  notifications: Notification[];
  validerDossier: boolean;
  scoreOral: number;
}
