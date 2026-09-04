package com.societedecomptabilite.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "legal_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LegalDocument {
    public enum DocType {
        STATUT, PATENTE, DECLARATION_EXISTENCE, REGISTRE_COMMERCE, JORT, JOURNAUX_QUOTIDIENS, AFFILIATION_CNSS, CONTRAT_LOCATION, REGISTRE_COMPTABLE, CIN_GERANT, AFFILIATION_CNSS_GERANT
    }

    public enum Status {
        MISSING, RECEIVED, PENDING
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocType type;

    @Enumerated(EnumType.STRING)
    private Status status = Status.MISSING;

    private String filePath;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "company_profile_id")
    private CompanyProfile companyProfile;
}
