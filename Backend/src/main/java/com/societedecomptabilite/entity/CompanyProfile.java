package com.societedecomptabilite.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "company_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false)
    private User user;

    private String raisonSociale;
    private String enseigne;
    private String formeJuridique;
    private String regime;
    private String capitalSocial;
    private String email;
    private String adresse;
    private String ville;
    private String telephoneFax;
    private String activite;
    private String registreCommerce;
    private String matriculeFiscal;
    private String numEmployeurCnss;
    private java.time.LocalDate dateOuverture;
    private String publicationJort;
    private String codeDouane;
    private String activiteSecondaire;
    private java.time.LocalDate dateEffet;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "manager_id")
    private Manager manager;

    @OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CapitalStructureEntry> capitalStructure = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "tenant_id")
    private TenantInfo tenantInfo;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fees_id")
    private Fees fees;

    private String observation;

    @OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LegalDocument> legalDocuments = new ArrayList<>();

    @OneToMany(mappedBy = "companyProfile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SoftwareDeposit> softwareDeposits = new ArrayList<>();
}
