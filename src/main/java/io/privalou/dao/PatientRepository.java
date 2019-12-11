package io.privalou.dao;

import io.privalou.domain.Doctor;
import io.privalou.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}

