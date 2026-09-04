package com.societedecomptabilite.controller;

import com.societedecomptabilite.dto.CompanyProfileRequest;
import com.societedecomptabilite.dto.CompanyProfileResponse;
import com.societedecomptabilite.service.CompanyProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class CompanyProfileController {

    private final CompanyProfileService service;

    public CompanyProfileController(CompanyProfileService service) {
        this.service = service;
    }

    @PostMapping("/clients/me/company-profile")
    public ResponseEntity<CompanyProfileResponse> createOrUpdateMyProfile(Authentication auth, @Valid @RequestBody CompanyProfileRequest req) {
        String email = auth.getName();
        CompanyProfileResponse resp = service.createOrUpdate(email, req);
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/clients/me/company-profile/core")
    public ResponseEntity<CompanyProfileResponse> saveCore(Authentication auth, @Valid @RequestBody com.societedecomptabilite.dto.CompanyProfileCoreRequest req) {
        String email = auth.getName();
        CompanyProfileResponse resp = service.saveCore(email, req);
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/clients/me/company-profile/manager")
    public ResponseEntity<CompanyProfileResponse> saveManager(Authentication auth, @Valid @RequestBody com.societedecomptabilite.dto.CompanyProfileRequest.ManagerDto dto) {
        String email = auth.getName();
        CompanyProfileResponse resp = service.saveManager(email, dto);
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/clients/me/company-profile/capital-structure")
    public ResponseEntity<CompanyProfileResponse> saveCapitalStructure(Authentication auth, @RequestBody java.util.List<com.societedecomptabilite.dto.CompanyProfileRequest.CapitalStructureDto> list) {
        String email = auth.getName();
        CompanyProfileResponse resp = service.saveCapitalStructure(email, list);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/clients/me/company-profile")
    public ResponseEntity<CompanyProfileResponse> getMyProfile(Authentication auth) {
        String email = auth.getName();
        return service.getByClientEmail(email, null, false)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/admin/clients/{clientId}/company-profile")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CompanyProfileResponse> getAnyClientProfile(@PathVariable Long clientId, Authentication auth) {
        // admin only
        return service.getByClientEmail(auth.getName(), clientId, true)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
