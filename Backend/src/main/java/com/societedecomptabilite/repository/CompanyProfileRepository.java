package com.societedecomptabilite.repository;

import com.societedecomptabilite.entity.CompanyProfile;
import com.societedecomptabilite.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {
    Optional<CompanyProfile> findByUser(User user);
}
