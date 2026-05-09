import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Appointment, Patient } from '../../models/models';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];
  allAppointments: Appointment[] = [];
  patients: Patient[] = [];
  selectedPatientId: number | null = null;
  appointmentDateTime: string = '';
  doctor: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTodayAppointments();
    this.loadAllAppointments();
    this.loadPatients();
  }

  loadTodayAppointments(): void {
    this.apiService.getTodayAppointments().subscribe(data => this.appointments = data);
  }

  loadAllAppointments(): void {
    this.apiService.getAllAppointments().subscribe(data => this.allAppointments = data);
  }

  loadPatients(): void {
    this.apiService.getPatients().subscribe(data => this.patients = data);
  }

  deleteAppointment(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this appointment?')) {
      this.apiService.deleteAppointment(id).subscribe(() => {
        this.loadTodayAppointments();
        this.loadAllAppointments();
      });
    }
  }

  bookAppointment(): void {
    if (this.selectedPatientId && this.appointmentDateTime && this.doctor) {
      const patient = this.patients.find(p => p.id === +this.selectedPatientId!);
      if (patient) {
        const newAppt: Appointment = {
          patient: patient,
          dateTime: this.appointmentDateTime,
          doctor: this.doctor
        };
        this.apiService.bookAppointment(newAppt).subscribe(() => {
          this.loadTodayAppointments();
          this.loadAllAppointments();
          this.selectedPatientId = null;
          this.appointmentDateTime = '';
          this.doctor = '';
        });
      }
    }
  }
}
