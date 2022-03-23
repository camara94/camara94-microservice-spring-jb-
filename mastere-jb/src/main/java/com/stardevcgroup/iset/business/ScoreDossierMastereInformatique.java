package com.stardevcgroup.iset.business;

import java.util.List;

import com.stardevcgroup.iset.models.AnneeUniversitaire;
import com.stardevcgroup.iset.models.Diplome;
import com.stardevcgroup.iset.models.Etudiant;
import com.stardevcgroup.iset.models.Mastere;




public class ScoreDossierMastereInformatique {
	
	/*
	 * moyenneBaccalaureat est la moyenne obtenu au Baccalauréat
	 */
	private Double moyenneBaccalaureat = 0.0D; 
	
	/*
	 * moyenneBaccalaureat est calculée sur la base de : 
	 *	. une bonification de 1.5 points répartis sur le nombre d'années du cursus 
	 *	    universitaire réussies en session principale (0.5 points pour chaque année)
	 *	. une sanction de 2 points pour le redoublement. 
	 *	. Une bonification de 1 point pour chaque année réussie dépassant 
	 *	  3 années universitaires.  
	 */
	private Double bonificationParcours = 0.0D; 
	
	/*
	 * moyenneAnneeUniversitaire est la moyenne des notes des années universitaires
	 */
	private double moyenneAnneeUniversitaire = 0.0D; 
	
	/*
	 * bonificationParcours est calculée sur la base de : 
	 *	. Une bonification de 2 points pour chaque diplôme (attestation ou certification obtenue)
	 *	  ou formation suivie en relation avec les TIC ou le domaine du tourisme. 
	 *	. Une bonification de 2 points pour chaque expérience professionnelle 
	 *	  ou stage effectué en relation avec les TIC ou le domaine du tourisme. 
	 */
	private Double bonificationDeTousLesDiplomes = 0.5D;
	
	/*
	 * scoreDossier est calculé de la manière suivante : 
	 *    . moyenneBaccalaureat + moyenneAnneeUniversitaire + bonificationParcours
	 */
	private Double scoreDossier = 0.0D; 
	
	private Etudiant etudiant;
	private Mastere mastere;
	
	public ScoreDossierMastereInformatique() {
		this.setBonificationParcours(bonificationParcours);
		this.setMoyenneAnneeUniversitaire();
		this.setMoyenneBaccalaureat();
	}
	
	public ScoreDossierMastereInformatique( Etudiant etudiant, Mastere mastere) {
		this.etudiant = etudiant;
		this.mastere = mastere;
		//this.setMoyenneAnneeUniversitaire(moyenneAnneeUniversitaire);
		this.setBonificationParcours(bonificationParcours);
		this.setMoyenneAnneeUniversitaire();
		//this.setBonificationParcours( this.bonificationDeTousLesDiplomes );
		this.setMoyenneBaccalaureat();
	}

	public Double getMoyenneBaccalaureat() {
		return this.moyenneBaccalaureat;
	}

	public void setMoyenneBaccalaureat() {
		if ( this.mastere.getChampFormule() != null && this.etudiant.getBac() != null ) {
			this.moyenneBaccalaureat = this.mastere.getChampFormule().getCoefficientBac() * this.etudiant.getBac().getMoyenne();
		}
	}

	public Double getBonificationParcours() {
		return bonificationParcours;
	}

	public void setBonificationParcours(Double bonificationParcours) {
		List<Diplome> diplomes = this.etudiant.getDiplomes();
		int redouble = 0;
		//double sessionPrincipale = 1.5;
		double mentionAnneeUniversitaire = 0;
		int nombreDeRedoublementDuCycleUniversitaire = 0;
		for( Diplome d: diplomes ) {
			
			for( AnneeUniversitaire a: d.getAnneeUniversitaires() ) {
				
				if ( a.getTitre().indexOf("1") >= 0 ) {
					nombreDeRedoublementDuCycleUniversitaire = Math.abs(Integer.valueOf(a.getAnnee().substring(0, 4)).intValue() - Integer.valueOf(d.getAnnee()).intValue());
					System.out.println( "Laby: " + nombreDeRedoublementDuCycleUniversitaire );
				}
			}
		}
		
		double mentionDuBac = 0;
		
		if( this.etudiant.getBac() != null  ) {
			
			if( this.etudiant.getBac().getMoyenne() >= 12 && this.etudiant.getBac().getMoyenne() < 14 ) {
				if ( this.mastere.getChampFormule() != null )
				{
					mentionDuBac = this.mastere.getChampFormule().getMentionBac() * this.mastere.getChampFormule().getCoefficientMentionABien();
				}
			} else if(  this.etudiant.getBac().getMoyenne() >= 14 && this.etudiant.getBac().getMoyenne() < 16 ) {
				if ( this.mastere.getChampFormule() != null )
				{
					mentionDuBac = this.mastere.getChampFormule().getMentionBac() * this.mastere.getChampFormule().getCoefficientMentionBien();
				}
			} else if( this.etudiant.getBac().getMoyenne() >= 16 ) {
				if ( this.mastere.getChampFormule() != null )
				{
					mentionDuBac = this.mastere.getChampFormule().getMentionBac() * this.mastere.getChampFormule().getCoefficientMentionTBien();
				}
			}
			
		}
		
		
		if(diplomes.size() > 0) {
			switch( nombreDeRedoublementDuCycleUniversitaire ) {
				case 3: { redouble = 0; } break;
				case 4: { redouble = -2; }; break;
				case 5: { redouble = -4; }; break;
				case 6: { redouble = -6; }; break;
				case 7: { redouble = -8; }; break;
				case 8: { redouble = -10; }; break;
				case 9: { redouble = -12; }; break;
			}
		}
		
		double scoreSessionPrincipal = 0;
		
		for( Diplome diplome: diplomes ) {
			if( diplome.getAnneeUniversitaires().size() > 0 ) {
				for( AnneeUniversitaire anneeUniversitaire: diplome.getAnneeUniversitaires() ) {
					
					if (anneeUniversitaire.getSession().indexOf("Session Principle")>=0) {
						if ( this.mastere.getChampFormule() != null )
						{
							scoreSessionPrincipal += this.mastere.getChampFormule().getCoefficientSessionPrincipale();
						}
						
					}
						
					if( anneeUniversitaire.getMoyenne()>= 12 && anneeUniversitaire.getMoyenne() < 14 ) {
						if ( this.mastere.getChampFormule() != null )
						{
							mentionAnneeUniversitaire += this.mastere.getChampFormule().getCoefficientMentionABien();
						}
					} else if( anneeUniversitaire.getMoyenne()>= 14 && anneeUniversitaire.getMoyenne() < 16 ) {
						if ( this.mastere.getChampFormule() != null )
						{
							mentionAnneeUniversitaire += this.mastere.getChampFormule().getCoefficientMentionBien();
						}
					} else if( anneeUniversitaire.getMoyenne()>= 16 ) {
						if ( this.mastere.getChampFormule() != null )
						{
							mentionAnneeUniversitaire += this.mastere.getChampFormule().getCoefficientMentionTBien();
						}
					}
				}
			}
		}
		
		double bonificationCertificat = 0;
		if(this.etudiant.getCertificats().size() > 0) {
			for( int i = 0; i < this.etudiant.getCertificats().size(); i++  ) {
				if ( this.mastere.getChampFormule() != null ) {
					if( i < this.mastere.getChampFormule().getNombreLimiteDeCertificat() ) {
						bonificationCertificat += this.mastere.getChampFormule().getCoefficientCertificat();
					}
				}
			}
		}
		
		double bonificationFormation = 0;
		for( int i = 0; i < this.etudiant.getFormations().size(); i++  ) {
			if ( this.mastere.getChampFormule() != null ) {
				if ( i < this.mastere.getChampFormule().getNombreLimiteDeFormation() ) {
					bonificationFormation += this.mastere.getChampFormule().getCoefficientCertificat();
				}
			}
		}
		
		double bonificationStageEtExperience = 0;
		
		for( int i = 0; i < this.etudiant.getStageExperiences().size(); i++  ) {
			if ( this.mastere.getChampFormule() != null ) {
				if ( this.etudiant.getStageExperiences().get(i).getNature().toLowerCase().indexOf("stage") >= 0 ) {
					bonificationFormation += this.mastere.getChampFormule().getCoefficientStage();
				} else {
					bonificationFormation += this.mastere.getChampFormule().getCoefficientExperience();
				}
			}
		}
		
		
		double formationCertificatBonus = bonificationFormation + bonificationCertificat;
		
		System.out.println( "Bonus mention: " + mentionAnneeUniversitaire );
		System.out.println( "Bonus Formation Certificat: " + formationCertificatBonus );
		
		
		double distinctionBonus = 0;
		
		for( int i = 0; i < this.etudiant.getDistinctions().size(); i++ ) {
			if ( this.mastere.getChampFormule() != null ) {
				distinctionBonus += this.mastere.getChampFormule().getCoefficientDistinction();
			}
		}
		
		
		bonificationParcours = 
								mentionAnneeUniversitaire 
								+ formationCertificatBonus 
								- redouble 
								+ bonificationStageEtExperience 
								+ scoreSessionPrincipal
								+ mentionDuBac
								+ distinctionBonus;
		
		System.out.println( "Bonnification Parcours: " +  bonificationParcours );
				
		
		this.bonificationParcours = bonificationParcours;
	}

	public double getMoyenneAnneeUniversitaire() {
		return this.moyenneAnneeUniversitaire;
	}

	private void setMoyenneAnneeUniversitaire() {
		double moyenneAnneeUniversitaire = 0;
		List<Diplome> diplomes = this.etudiant.getDiplomes();
		double sommeMoyenneAnneeUniversitaire = 0;
		double nombreAnneeUniversitaire = 0;
		
		for( Diplome diplome: diplomes ) {
			for( AnneeUniversitaire anneeUniversitaire: diplome.getAnneeUniversitaires() ) {
				if ( this.mastere.getChampFormule() != null ) {
					sommeMoyenneAnneeUniversitaire += this.mastere.getChampFormule().getCoefficientAnneeUniversitaire() * anneeUniversitaire.getMoyenne();
					nombreAnneeUniversitaire += this.mastere.getChampFormule().getCoefficientAnneeUniversitaire();
					System.out.println("fddfd: " + sommeMoyenneAnneeUniversitaire);	
				}
			}
		}
		
		if(nombreAnneeUniversitaire == 0) 
			nombreAnneeUniversitaire=1;
		
		moyenneAnneeUniversitaire = sommeMoyenneAnneeUniversitaire/nombreAnneeUniversitaire;
		
		this.moyenneAnneeUniversitaire = moyenneAnneeUniversitaire;

	}

	public Double getBonificationDeTousLesDiplomes() {
		return bonificationDeTousLesDiplomes;
	}

	public void setBonificationDeTousLesDiplomes( Double bonificationDeTousLesDiplomes ) {
		this.bonificationDeTousLesDiplomes = bonificationDeTousLesDiplomes;
	}

	public Double getScoreDossier() {
		return scoreDossier;
	}

	public void setScoreDossier(Double scoreDossier) {
		this.scoreDossier = scoreDossier;//this.moyenneBaccalaureat + this.moyenneAnneeUniversitaire + this.bonificationParcours;
	}

	public Etudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}
	
	
	
	
}
