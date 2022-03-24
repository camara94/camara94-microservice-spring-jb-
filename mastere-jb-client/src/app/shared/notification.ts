import { Etudiant } from './etudiant';
export class Notification {
  id: number;
  message: string;
  etudiant: Etudiant;
  etat: boolean;
}
