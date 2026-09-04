package com.societedecomptabilite.repository;

import com.societedecomptabilite.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
