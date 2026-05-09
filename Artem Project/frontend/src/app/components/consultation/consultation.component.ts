import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Appointment, Consultation, Patient } from '../../models/models';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  vitals: string = '';
  notes: string = '';
  patientConsultations: Consultation[] = [];
  patients: Patient[] = [];
  selectedPatientId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTodayScheduledAppointments();
    this.loadPatients();
  }

  loadTodayScheduledAppointments(): void {
    this.apiService.getTodayAppointments().subscribe(data => {
      this.appointments = data.filter(a => a.status === 'SCHEDULED');
    });
  }

  loadPatients(): void {
    this.apiService.getPatients().subscribe(data => this.patients = data);
  }

  saveConsultation(): void {
    if (this.selectedAppointment && this.vitals && this.notes) {
      const consultation: Consultation = {
        appointment: this.selectedAppointment,
        vitals: this.vitals,
        notes: this.notes
      };
      this.apiService.saveConsultation(consultation).subscribe(() => {
        this.loadTodayScheduledAppointments();
        this.selectedAppointment = null;
        this.vitals = '';
        this.notes = '';
      });
    }
  }

  viewHistory(): void {
    if (this.selectedPatientId) {
      this.apiService.getPatientConsultations(this.selectedPatientId).subscribe(data => {
        this.patientConsultations = data;
      });
    }
  }
}
