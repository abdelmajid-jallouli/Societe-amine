package com.societedecomptabilite.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tenant_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TenantInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomPrenom;
    private String dateLieuNaissance;
    private String nationalite;
    private String adresse;
    private String passCin;
    private java.time.LocalDate debutContrat;
    private String montantLoyer;
    private String observationsAugmentation;
}
