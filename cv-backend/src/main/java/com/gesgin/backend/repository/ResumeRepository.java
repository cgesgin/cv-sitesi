package com.gesgin.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import  com.gesgin.backend.models.Resume;

public interface ResumeRepository extends JpaRepository<Resume,Long>{

	@Query(value = "SELECT * FROM resume u WHERE u.user_id = ?1",nativeQuery = true)
	public Resume getCVByUserId(Long id) ;
}
