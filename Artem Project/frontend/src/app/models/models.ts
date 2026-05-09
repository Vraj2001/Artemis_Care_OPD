export interface Patient {
  id?: number;
  name: string;
  gender: string;
  age: number;
  phoneNumber: string;
}

export interface Appointment {
  id?: number;
  patient: Patient;
  dateTime: string;
  doctor: string;
  status?: string;
}

export interface Consultation {
  id?: number;
  appointment: Appointment;
  vitals: string;
  notes: string;
}
