package com.societedecomptabilite.repository;

import com.societedecomptabilite.entity.TenantInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantInfoRepository extends JpaRepository<TenantInfo, Long> {
}
