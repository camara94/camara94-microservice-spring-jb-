package com.stardevcgroup.iset.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class MastereEtudiantId implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "mastere_id")
    private Long mastereId;
 
    @Column(name = "etudiant_id")
    private Long etudiantId;
 
    private MastereEtudiantId() {}
 
    public MastereEtudiantId(
        Long mastereId,
        Long etudiantId) {
        this.mastereId = mastereId;
        this.etudiantId = etudiantId;
    }
 
    //Getters omitted for brevity
 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        MastereEtudiantId that = (MastereEtudiantId) o;
        return Objects.equals(mastereId, that.mastereId) &&
               Objects.equals(etudiantId, that.etudiantId);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(mastereId, etudiantId);
    }

	public Long getMastereId() {
		return mastereId;
	}

	public void setMastereId(Long mastereId) {
		this.mastereId = mastereId;
	}

	public Long getEtudiantId() {
		return etudiantId;
	}

	public void setEtudiantId(Long etudiantId) {
		this.etudiantId = etudiantId;
	}
    
    

}
