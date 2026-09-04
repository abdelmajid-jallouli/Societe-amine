package com.societedecomptabilite.repository;

import com.societedecomptabilite.entity.LegalDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LegalDocumentRepository extends JpaRepository<LegalDocument, Long> {
}
