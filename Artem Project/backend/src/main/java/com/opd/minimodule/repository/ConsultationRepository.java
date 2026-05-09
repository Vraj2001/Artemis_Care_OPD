package com.opd.minimodule.repository;

import com.opd.minimodule.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByAppointmentPatientId(Long patientId);
}
