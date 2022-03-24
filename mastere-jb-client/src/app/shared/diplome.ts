import { AnneeUniversitaire } from './anneeUniversitaire';
export interface Diplome {
  id: number;
  titre: string;
  etablissement: number;
  annee: string;
  file: string;
  anneeUniversitaires: AnneeUniversitaire[];
  nombreAnneeUniversitaire: number;
}
