package com.societedecomptabilite.entity;

import jakarta.persistence.Entity;
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
@Table(name = "capital_structure_entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CapitalStructureEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomPrenom;
    private Double partsPourcentage; // optional

    @ManyToOne
    @JoinColumn(name = "company_profile_id")
    private CompanyProfile companyProfile;
}
