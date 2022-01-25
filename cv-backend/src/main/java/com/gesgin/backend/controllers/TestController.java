package com.gesgin.backend.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gesgin.backend.exception.ResourceNotFoundException;
import com.gesgin.backend.models.Resume;
import com.gesgin.backend.models.User;
import com.gesgin.backend.repository.ResumeRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test") 
public class TestController {

	@Autowired
	private ResumeRepository ResumeRepository;

	@GetMapping("/resume")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Resume> getAllEmployee() {
		return ResumeRepository.findAll();
	}
	
	
	@GetMapping("/detail/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Resume> getCVById(@PathVariable Long id) {
		Resume resume = ResumeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Resume not exist with id :" + id));
		return ResponseEntity.ok(resume);
	}
	
	@PostMapping("/create")
	@PreAuthorize("hasRole('USER')")
	public Resume create(@RequestBody Resume resume) {		
		Resume temp;
		if(ResumeRepository.getCVByUserId(resume.getUser_id())!=null) {
			temp=ResumeRepository.getCVByUserId(resume.getUser_id());
			ResumeRepository.delete(temp);
		}
		return ResumeRepository.save(resume);
	}
 
	@GetMapping("/detailByUserId/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Resume> getCVByUserId(@PathVariable Long id) {
		Resume resume = ResumeRepository.getCVByUserId(id);
		return ResponseEntity.ok(resume);
	}
	
	@PutMapping("/update/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Resume> update(@PathVariable Long id,@RequestBody Resume updateCV) {
		Resume resume = ResumeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CV not exist with id :" + id));

		resume.setName(updateCV.getName());
		resume.setSurname(updateCV.getSurname());
		resume.setEmail(updateCV.getEmail());
		resume.setPhone(updateCV.getPhone());
		resume.setEducation(updateCV.getEducation());
		resume.setSkill(updateCV.getSkill());
		resume.setUser_id(updateCV.getUser_id());
		resume.setExperience(updateCV.getExperience());
		resume.setWorkplace(updateCV.getWorkplace());
		resume.setDescription(updateCV.getDescription());
		
		Resume update= ResumeRepository.save(resume);
		return ResponseEntity.ok(update);
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) {
		Resume resume = ResumeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("CV not exist with id :" + id));

		ResumeRepository.delete(resume);
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
