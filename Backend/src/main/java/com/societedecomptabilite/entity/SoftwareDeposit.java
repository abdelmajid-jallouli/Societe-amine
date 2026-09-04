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
@Table(name = "software_deposits")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SoftwareDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private java.time.LocalDate date;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "company_profile_id")
    private CompanyProfile companyProfile;
}
