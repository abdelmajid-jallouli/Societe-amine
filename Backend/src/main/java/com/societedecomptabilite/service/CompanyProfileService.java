package com.societedecomptabilite.service;

import com.societedecomptabilite.dto.CompanyProfileRequest;
import com.societedecomptabilite.dto.CompanyProfileResponse;
import com.societedecomptabilite.entity.*;
import com.societedecomptabilite.repository.CompanyProfileRepository;
import com.societedecomptabilite.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyProfileService {

    private final CompanyProfileRepository profileRepository;
    private final UserRepository userRepository;

    public CompanyProfileService(CompanyProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CompanyProfileResponse createOrUpdate(String requesterEmail, CompanyProfileRequest req) {
        // determine user by requesterEmail
        User user = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        CompanyProfile profile = profileRepository.findByUser(user).orElseGet(() -> {
            CompanyProfile p = new CompanyProfile();
            p.setUser(user);
            return p;
        });

        // map simple fields
        profile.setRaisonSociale(req.raisonSociale);
        profile.setEnseigne(req.enseigne);
        profile.setFormeJuridique(req.formeJuridique);
        profile.setRegime(req.regime);
        profile.setCapitalSocial(req.capitalSocial);
        profile.setEmail(req.email);
        profile.setAdresse(req.adresse);
        profile.setVille(req.ville);
        profile.setTelephoneFax(req.telephoneFax);
        profile.setActivite(req.activite);
        profile.setRegistreCommerce(req.registreCommerce);
        profile.setMatriculeFiscal(req.matriculeFiscal);
        profile.setNumEmployeurCnss(req.numEmployeurCnss);
        profile.setDateOuverture(req.dateOuverture);
        profile.setPublicationJort(req.publicationJort);
        profile.setCodeDouane(req.codeDouane);
        profile.setActiviteSecondaire(req.activiteSecondaire);
        profile.setDateEffet(req.dateEffet);
        profile.setObservation(req.observation);

        // manager
        if (req.manager != null) {
            Manager m = profile.getManager() == null ? new Manager() : profile.getManager();
            m.setNomPrenom(req.manager.nomPrenom);
            m.setDateLieuNaissance(req.manager.dateLieuNaissance);
            m.setNationalite(req.manager.nationalite);
            m.setAdresse(req.manager.adresse);
            m.setSituationFamiliale(req.manager.situationFamiliale);
            m.setPassCin(req.manager.passCin);
            m.setNumCnss(req.manager.numCnss);
            profile.setManager(m);
        } else {
            profile.setManager(null);
        }

        // capital structure
        profile.getCapitalStructure().clear();
        if (req.capitalStructure != null) {
            for (CompanyProfileRequest.CapitalStructureDto dto : req.capitalStructure) {
                CapitalStructureEntry e = new CapitalStructureEntry();
                e.setNomPrenom(dto.nomPrenom);
                e.setPartsPourcentage(dto.partsPourcentage);
                e.setCompanyProfile(profile);
                profile.getCapitalStructure().add(e);
            }
        }

        // tenant
        if (req.tenantInfo != null) {
            TenantInfo t = profile.getTenantInfo() == null ? new TenantInfo() : profile.getTenantInfo();
            t.setNomPrenom(req.tenantInfo.nomPrenom);
            t.setDateLieuNaissance(req.tenantInfo.dateLieuNaissance);
            t.setNationalite(req.tenantInfo.nationalite);
            t.setAdresse(req.tenantInfo.adresse);
            t.setPassCin(req.tenantInfo.passCin);
            t.setDebutContrat(req.tenantInfo.debutContrat);
            t.setMontantLoyer(req.tenantInfo.montantLoyer);
            t.setObservationsAugmentation(req.tenantInfo.observationsAugmentation);
            profile.setTenantInfo(t);
        } else {
            profile.setTenantInfo(null);
        }

        // fees
        if (req.fees != null) {
            Fees f = profile.getFees() == null ? new Fees() : profile.getFees();
            f.setResponsableDossier(req.fees.responsableDossier);
            f.setDateEffet(req.fees.dateEffet);
            f.setMontantHonoraires(req.fees.montantHonoraires);
            f.setObservationsAugmentation(req.fees.observationsAugmentation);
            profile.setFees(f);
        } else {
            profile.setFees(null);
        }

        // legal documents
        profile.getLegalDocuments().clear();
        if (req.legalDocuments != null) {
            for (CompanyProfileRequest.LegalDocumentDto dto : req.legalDocuments) {
                LegalDocument ld = new LegalDocument();
                try {
                    ld.setType(LegalDocument.DocType.valueOf(dto.type));
                } catch (Exception ex) {
                    // ignore invalid
                }
                try {
                    if (dto.status != null) ld.setStatus(LegalDocument.Status.valueOf(dto.status));
                } catch (Exception ex) {
                }
                ld.setFilePath(dto.filePath);
                ld.setNotes(dto.notes);
                ld.setCompanyProfile(profile);
                profile.getLegalDocuments().add(ld);
            }
        }

        // software deposits
        profile.getSoftwareDeposits().clear();
        if (req.softwareDeposits != null) {
            for (CompanyProfileRequest.SoftwareDepositDto dto : req.softwareDeposits) {
                SoftwareDeposit s = new SoftwareDeposit();
                s.setLabel(dto.label);
                s.setDate(dto.date);
                s.setNotes(dto.notes);
                s.setCompanyProfile(profile);
                profile.getSoftwareDeposits().add(s);
            }
        }

        CompanyProfile saved = profileRepository.save(profile);
        return toResponse(saved);
    }

    public Optional<CompanyProfileResponse> getByClientEmail(String requesterEmail, Long targetClientId, boolean adminRequest) {
        // adminRequest indicates whether authorized admin called; if adminRequest and targetClientId provided, load that user
        if (adminRequest && targetClientId != null) {
            User user = userRepository.findById(targetClientId).orElse(null);
            if (user == null) return Optional.empty();
            return profileRepository.findByUser(user).map(this::toResponse);
        }

        // otherwise derive from requesterEmail
        User user = userRepository.findByEmail(requesterEmail).orElse(null);
        if (user == null) return Optional.empty();
        return profileRepository.findByUser(user).map(this::toResponse);
    }

    @Transactional
    public CompanyProfileResponse saveCore(String requesterEmail, com.societedecomptabilite.dto.CompanyProfileCoreRequest core) {
        User user = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        CompanyProfile profile = profileRepository.findByUser(user).orElseGet(() -> {
            CompanyProfile p = new CompanyProfile();
            p.setUser(user);
            return p;
        });

        profile.setRaisonSociale(core.raisonSociale);
        profile.setEnseigne(core.enseigne);
        profile.setEmail(core.email);
        profile.setAdresse(core.adresse);
        profile.setVille(core.ville);
        profile.setTelephoneFax(core.telephoneFax);
        profile.setActivite(core.activite);
        profile.setObservation(core.observation);

        CompanyProfile saved = profileRepository.save(profile);
        return toResponse(saved);
    }

    @Transactional
    public CompanyProfileResponse saveManager(String requesterEmail, CompanyProfileRequest.ManagerDto dto) {
        User user = userRepository.findByEmail(requesterEmail).orElseThrow(() -> new IllegalArgumentException("User not found"));
        CompanyProfile profile = profileRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("Profile not found"));

        Manager m = profile.getManager() == null ? new Manager() : profile.getManager();
        m.setNomPrenom(dto.nomPrenom);
        m.setDateLieuNaissance(dto.dateLieuNaissance);
        m.setNationalite(dto.nationalite);
        m.setAdresse(dto.adresse);
        m.setSituationFamiliale(dto.situationFamiliale);
        m.setPassCin(dto.passCin);
        m.setNumCnss(dto.numCnss);
        profile.setManager(m);

        CompanyProfile saved = profileRepository.save(profile);
        return toResponse(saved);
    }

    @Transactional
    public CompanyProfileResponse saveCapitalStructure(String requesterEmail, java.util.List<CompanyProfileRequest.CapitalStructureDto> list) {
        User user = userRepository.findByEmail(requesterEmail).orElseThrow(() -> new IllegalArgumentException("User not found"));
        CompanyProfile profile = profileRepository.findByUser(user).orElseThrow(() -> new IllegalArgumentException("Profile not found"));

        profile.getCapitalStructure().clear();
        if (list != null) {
            for (CompanyProfileRequest.CapitalStructureDto dto : list) {
                CapitalStructureEntry e = new CapitalStructureEntry();
                e.setNomPrenom(dto.nomPrenom);
                e.setPartsPourcentage(dto.partsPourcentage);
                e.setCompanyProfile(profile);
                profile.getCapitalStructure().add(e);
            }
        }

        CompanyProfile saved = profileRepository.save(profile);
        return toResponse(saved);
    }

    private CompanyProfileResponse toResponse(CompanyProfile p) {
        CompanyProfileResponse r = new CompanyProfileResponse();
        r.id = p.getId();
        r.userId = p.getUser() != null ? p.getUser().getId() : null;
        r.raisonSociale = p.getRaisonSociale();
        r.enseigne = p.getEnseigne();
        r.formeJuridique = p.getFormeJuridique();
        r.regime = p.getRegime();
        r.capitalSocial = p.getCapitalSocial();
        r.email = p.getEmail();
        r.adresse = p.getAdresse();
        r.ville = p.getVille();
        r.telephoneFax = p.getTelephoneFax();
        r.activite = p.getActivite();
        r.registreCommerce = p.getRegistreCommerce();
        r.matriculeFiscal = p.getMatriculeFiscal();
        r.numEmployeurCnss = p.getNumEmployeurCnss();
        r.dateOuverture = p.getDateOuverture();
        r.publicationJort = p.getPublicationJort();
        r.codeDouane = p.getCodeDouane();
        r.activiteSecondaire = p.getActiviteSecondaire();
        r.dateEffet = p.getDateEffet();
        r.observation = p.getObservation();

        if (p.getManager() != null) {
            CompanyProfileResponse.ManagerDto m = new CompanyProfileResponse.ManagerDto();
            m.nomPrenom = p.getManager().getNomPrenom();
            m.dateLieuNaissance = p.getManager().getDateLieuNaissance();
            m.nationalite = p.getManager().getNationalite();
            m.adresse = p.getManager().getAdresse();
            m.situationFamiliale = p.getManager().getSituationFamiliale();
            m.passCin = p.getManager().getPassCin();
            m.numCnss = p.getManager().getNumCnss();
            r.manager = m;
        }

        // capital
        r.capitalStructure = p.getCapitalStructure().stream().map(e -> {
            CompanyProfileResponse.CapitalStructureDto dto = new CompanyProfileResponse.CapitalStructureDto();
            dto.id = e.getId();
            dto.nomPrenom = e.getNomPrenom();
            dto.partsPourcentage = e.getPartsPourcentage();
            return dto;
        }).toList();

        if (p.getTenantInfo() != null) {
            CompanyProfileResponse.TenantDto t = new CompanyProfileResponse.TenantDto();
            t.nomPrenom = p.getTenantInfo().getNomPrenom();
            t.dateLieuNaissance = p.getTenantInfo().getDateLieuNaissance();
            t.nationalite = p.getTenantInfo().getNationalite();
            t.adresse = p.getTenantInfo().getAdresse();
            t.passCin = p.getTenantInfo().getPassCin();
            t.debutContrat = p.getTenantInfo().getDebutContrat();
            t.montantLoyer = p.getTenantInfo().getMontantLoyer();
            t.observationsAugmentation = p.getTenantInfo().getObservationsAugmentation();
            r.tenantInfo = t;
        }

        if (p.getFees() != null) {
            CompanyProfileResponse.FeesDto f = new CompanyProfileResponse.FeesDto();
            f.responsableDossier = p.getFees().getResponsableDossier();
            f.dateEffet = p.getFees().getDateEffet();
            f.montantHonoraires = p.getFees().getMontantHonoraires();
            f.observationsAugmentation = p.getFees().getObservationsAugmentation();
            r.fees = f;
        }

        r.legalDocuments = p.getLegalDocuments().stream().map(ld -> {
            CompanyProfileResponse.LegalDocumentDto dto = new CompanyProfileResponse.LegalDocumentDto();
            dto.id = ld.getId();
            dto.type = ld.getType() != null ? ld.getType().name() : null;
            dto.status = ld.getStatus() != null ? ld.getStatus().name() : null;
            dto.filePath = ld.getFilePath();
            dto.notes = ld.getNotes();
            return dto;
        }).toList();

        r.softwareDeposits = p.getSoftwareDeposits().stream().map(sd -> {
            CompanyProfileResponse.SoftwareDepositDto dto = new CompanyProfileResponse.SoftwareDepositDto();
            dto.id = sd.getId();
            dto.label = sd.getLabel();
            dto.date = sd.getDate();
            dto.notes = sd.getNotes();
            return dto;
        }).toList();

        return r;
    }
}
