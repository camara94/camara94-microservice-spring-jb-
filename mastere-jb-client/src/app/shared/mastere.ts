import { MastereEtudiant } from './mastereEtudiant';
import { Type } from './type';
import { Mention } from './mention';
import { ChampFormule } from './champFormule';


export interface Mastere {
  id: number;
  libele: string;
  mention: Mention;
  type: Type;
  etudiants: MastereEtudiant[];
  disponible: number;
  champFormule: ChampFormule;
}
