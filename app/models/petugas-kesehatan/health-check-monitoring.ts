import {
  ControllHistory,
  MedicationHistory,
  Patient,
  User,
} from "@prisma/client";

interface PetugasLapangan {
  name: string
  authority: User;
}

export interface HealthCheckMonitoringDataModel extends Patient {
  petugas_lapangan: PetugasLapangan;
  medicationHistory: MedicationHistory[];
  controllHistory: ControllHistory[];
}
