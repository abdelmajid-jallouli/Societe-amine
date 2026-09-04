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
@Table(name = "managers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomPrenom;
    private String dateLieuNaissance;
    private String nationalite;
    private String adresse;
    private String situationFamiliale;
    private String passCin;
    private String numCnss;
}
