import { MathModule } from './../math/math.module';
import { MathContent } from './../shared/MathContent';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { KatexOptions } from 'ng-katex';
import { Mastere } from '../shared/mastere';

@Component({
  selector: 'app-visualiser-formule',
  templateUrl: './visualiser-formule.component.html',
  styleUrls: ['./visualiser-formule.component.scss']
})
export class VisualiserFormuleComponent implements OnInit {

  mathLatex: MathContent = {
    latex: 'When $a \\ne 0$, there are two solutions to $\\frac{5}{9}$'
  };

  scoreDossier = 'ScoreDossier = CB * MBac + ';
  sommeDesCoeficientAnneeUniversitaire = '\\sum_{i=1}^{nombre\\_annee\\_universitaire} (CoefMAU{i})';
  bonificationParcours = ' bonificationParcours = ';

  scoreDossierVisualer = '';
  sommeDesCoeficientAnneeUniversitaireVal = '';

  mathMl: MathContent = {
    mathml: `

    <math xmlns = "http://www.w3.org/1998/Math/MathML">
    </math>`};

  constructor(
    public dialogRef: MatDialogRef<VisualiserFormuleComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit() {
    this.voir(this.data.mastere);
    this.scoreDossier +=
                        '$\\frac{CoefMAU * MAU1 + CoefMAU2 * MAU2 + ... }{'
                         + this.sommeDesCoeficientAnneeUniversitaire
                          + '}$'  + ' + bonificationParcours';

    this.bonificationParcours += '$\\sum_{i=1}^{max\\_a} (mentionAU{i})$ ';
    this.bonificationParcours += ' + $\\sum_{i=1}^{max\\_f} (bF{i})$';
    this.bonificationParcours += ' + $\\sum_{i=1}^{max\\_c} (bc{i})$';
    this.bonificationParcours += ' + $\\sum_{i=1}^{max\\_d} (bd{i})$';
    this.bonificationParcours += ' + $\\sum_{i=1}^{max\\_se} (bse{i})$';
    this.bonificationParcours += ' + $\\sum_{i=1}^{max\\_sp} (bsp{i})$';
    this.bonificationParcours += ' - $\\sum_{i=1}^{max\\_r} (mr{i})$'
    this.bonificationParcours += ' + $\\sum_{i=1}^{nbr\\_sup} (an\\_sup{i})$';
    this.bonificationParcours += ' + coefBac * mBac';

  }

  voir(mastere: Mastere) {

    this.sommeDesCoeficientAnneeUniversitaireVal += '$\\sum_{i=1}^{2} (mentionAU{i})$ '
                                                    +  ' + $\\sum_{i=1}^{' +  mastere.champFormule.nombreLimiteDeFormation + ' } ('
                                                    +  mastere.champFormule.coefficientFormation
                                                    + ')$'
                                                    +  ' + $\\sum_{i=1}^{ ' + mastere.champFormule.nombreLimiteDeCertificat + '} (' +
                                                    mastere.champFormule.coefficientCertificat
                                                    + ')$'
                                                    + ' + $\\sum_{i=1}^{' + 2 + '} (' +
                                                      mastere.champFormule.coefficientDistinction
                                                    + ')$'
                                                    + ' + $\\sum_{i=1}^{' + mastere.champFormule.nombreLimiteDExperience +  '} (' +
                                                    mastere.champFormule.coefficientExperience
                                                    + ')$'
                                                    + ' + $\\sum_{i=1}^{2} ('
                                                    +
                                                    mastere.champFormule.coefficientSessionPrincipale
                                                    + ')$'
                                                    + ' - $\\sum_{i=1}^{n} (' +
                                                     mastere.champFormule.coefficientRedouble
                                                    + ')$'
                                                    + ' + $\\sum_{i=1}^{an\\_s} (' +
                                                    mastere.champFormule.coefficientAnneeSupplementaire
                                                    + ')$ + '
                                                    +
                                                    mastere.champFormule.mentionBac
                                                    + ' * MentionBac';

    this.scoreDossierVisualer = mastere.champFormule.coefficientBac + ' * MBac + $\\frac{'
                                        + mastere.champFormule.coefficientAnneeUniversitaire
                                        + '* MAU1 + '
                                        + mastere.champFormule.coefficientAnneeUniversitaire
                                        + ' * MAU2 + ... }{' + this.sommeDesCoeficientAnneeUniversitaire
                                        + '}$'
                                        + ' + ' + this.sommeDesCoeficientAnneeUniversitaireVal;
  }

  aff(m: Mastere) {
    console.log('Laby Damaro: ', m);
  }

}
