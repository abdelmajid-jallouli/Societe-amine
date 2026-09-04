package com.societedecomptabilite.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CompanyProfileCoreRequest {
    @NotBlank
    public String raisonSociale;

    public String enseigne;

    @Email
    public String email;

    public String adresse;
    public String ville;
    public String telephoneFax;
    public String activite;
    public String observation;
}
