package com.opd.minimodule.controller;

import com.opd.minimodule.model.Appointment;
import com.opd.minimodule.model.Consultation;
import com.opd.minimodule.repository.AppointmentRepository;
import com.opd.minimodule.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultations")
@CrossOrigin(origins = "http://localhost:4200")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping
    public Consultation saveConsultation(@RequestBody Consultation consultation) {
        Appointment appointment = appointmentRepository.findById(consultation.getAppointment().getId()).orElseThrow();
        appointment.setStatus("COMPLETED");
        appointmentRepository.save(appointment);
        return consultationRepository.save(consultation);
    }

    @GetMapping("/patient/{patientId}")
    public List<Consultation> getPatientConsultations(@PathVariable Long patientId) {
        return consultationRepository.findByAppointmentPatientId(patientId);
    }
}
