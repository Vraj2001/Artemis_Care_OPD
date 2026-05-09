import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Patient } from '../../models/models';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  newPatient: Patient = { name: '', gender: 'Male', age: 0, phoneNumber: '' };
  searchQuery: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.apiService.getPatients().subscribe(data => this.patients = data);
  }

  addPatient(): void {
    if (this.newPatient.name && this.newPatient.phoneNumber) {
      this.apiService.addPatient(this.newPatient).subscribe(() => {
        this.loadPatients();
        this.newPatient = { name: '', gender: 'Male', age: 0, phoneNumber: '' };
      });
    }
  }

  search(): void {
    if (this.searchQuery) {
      this.apiService.searchPatients(this.searchQuery).subscribe(data => this.patients = data);
    } else {
      this.loadPatients();
    }
  }

  deletePatient(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this patient?')) {
      this.apiService.deletePatient(id).subscribe(() => this.loadPatients());
    }
  }
}
