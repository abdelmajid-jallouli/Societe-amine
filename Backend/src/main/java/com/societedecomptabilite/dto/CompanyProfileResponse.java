package com.societedecomptabilite.dto;

import java.time.LocalDate;
import java.util.List;

public class CompanyProfileResponse {
    public Long id;
    public Long userId;
    public String raisonSociale;
    public String enseigne;
    public String formeJuridique;
    public String regime;
    public String capitalSocial;
    public String email;
    public String adresse;
    public String ville;
    public String telephoneFax;
    public String activite;
    public String registreCommerce;
    public String matriculeFiscal;
    public String numEmployeurCnss;
    public LocalDate dateOuverture;
    public String publicationJort;
    public String codeDouane;
    public String activiteSecondaire;
    public LocalDate dateEffet;

    public ManagerDto manager;
    public List<CapitalStructureDto> capitalStructure;
    public TenantDto tenantInfo;
    public FeesDto fees;
    public String observation;
    public List<LegalDocumentDto> legalDocuments;
    public List<SoftwareDepositDto> softwareDeposits;

    public static class ManagerDto {
        public String nomPrenom;
        public String dateLieuNaissance;
        public String nationalite;
        public String adresse;
        public String situationFamiliale;
        public String passCin;
        public String numCnss;
    }

    public static class CapitalStructureDto {
        public Long id;
        public String nomPrenom;
        public Double partsPourcentage;
    }

    public static class TenantDto {
        public String nomPrenom;
        public String dateLieuNaissance;
        public String nationalite;
        public String adresse;
        public String passCin;
        public LocalDate debutContrat;
        public String montantLoyer;
        public String observationsAugmentation;
    }

    public static class FeesDto {
        public String responsableDossier;
        public LocalDate dateEffet;
        public String montantHonoraires;
        public String observationsAugmentation;
    }

    public static class LegalDocumentDto {
        public Long id;
        public String type;
        public String status;
        public String filePath;
        public String notes;
    }

    public static class SoftwareDepositDto {
        public Long id;
        public String label;
        public LocalDate date;
        public String notes;
    }
}
