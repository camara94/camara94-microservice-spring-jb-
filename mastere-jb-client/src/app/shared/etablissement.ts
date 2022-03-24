import { MastereEtudiant } from './mastereEtudiant';
import { Mastere } from './mastere';

export interface Etablissement {
  id: number;
  nom: string;
  masteres: Mastere[];
  etudiants: MastereEtudiant[];
}
