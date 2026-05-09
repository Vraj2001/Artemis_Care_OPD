package com.opd.minimodule.model;

import jakarta.persistence.*;

@Entity
@Table(name = "consultations")
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    private String vitals; // e.g., "BP: 120/80, Temp: 98.6"
    private String notes;

    public Consultation() {}

    public Consultation(Appointment appointment, String vitals, String notes) {
        this.appointment = appointment;
        this.vitals = vitals;
        this.notes = notes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Appointment getAppointment() { return appointment; }
    public void setAppointment(Appointment appointment) { this.appointment = appointment; }
    public String getVitals() { return vitals; }
    public void setVitals(String vitals) { this.vitals = vitals; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
