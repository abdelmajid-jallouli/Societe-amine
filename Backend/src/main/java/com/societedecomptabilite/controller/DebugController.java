package com.societedecomptabilite.controller;

import com.societedecomptabilite.repository.CompanyProfileRepository;
import com.societedecomptabilite.repository.CapitalStructureEntryRepository;
import com.societedecomptabilite.repository.LegalDocumentRepository;
import com.societedecomptabilite.repository.SoftwareDepositRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    private final CompanyProfileRepository companyProfileRepository;
    private final CapitalStructureEntryRepository capitalRepo;
    private final LegalDocumentRepository legalRepo;
    private final SoftwareDepositRepository softwareRepo;

    public DebugController(CompanyProfileRepository companyProfileRepository,
                           CapitalStructureEntryRepository capitalRepo,
                           LegalDocumentRepository legalRepo,
                           SoftwareDepositRepository softwareRepo) {
        this.companyProfileRepository = companyProfileRepository;
        this.capitalRepo = capitalRepo;
        this.legalRepo = legalRepo;
        this.softwareRepo = softwareRepo;
    }

    @GetMapping("/counts")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Long> counts() {
        return Map.of(
                "company_profiles", companyProfileRepository.count(),
                "capital_structure_entries", capitalRepo.count(),
                "legal_documents", legalRepo.count(),
                "software_deposits", softwareRepo.count()
        );
    }
}
