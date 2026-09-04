package com.societedecomptabilite.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

public class CompanyProfileRequest {
    @NotBlank
    public String raisonSociale;

    public String enseigne;
    public String formeJuridique;
    public String regime;
    public String capitalSocial;

    @Email
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

    @Valid
    public ManagerDto manager;

    @Valid
    public List<CapitalStructureDto> capitalStructure;

    @Valid
    public TenantDto tenantInfo;

    @Valid
    public FeesDto fees;

    public String observation;

    @Valid
    public List<LegalDocumentDto> legalDocuments;

    @Valid
    public List<SoftwareDepositDto> softwareDeposits;

    public static class ManagerDto {
        @NotBlank
        public String nomPrenom;
        public String dateLieuNaissance;
        public String nationalite;
        public String adresse;
        public String situationFamiliale;
        public String passCin;
        public String numCnss;
    }

    public static class CapitalStructureDto {
        @NotBlank
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
        public String type;
        public String status;
        public String filePath;
        public String notes;
    }

    public static class SoftwareDepositDto {
        public String label;
        public LocalDate date;
        public String notes;
    }
}
