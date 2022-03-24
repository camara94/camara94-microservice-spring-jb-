import { Mastere } from './mastere';
import { Domaine } from './domaine';


export interface Mention {
  id: number;
  nom: string;
  domaine: Domaine;
}
