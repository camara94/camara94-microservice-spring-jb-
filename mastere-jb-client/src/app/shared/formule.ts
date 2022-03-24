export class Formule {
  active: boolean;
  critere: string;
  coefficient: number;
  constructor(active: boolean, critere: string, coefficient: number){
    this.active = active;
    this.critere = critere;
    this.coefficient = coefficient;
  }
}
