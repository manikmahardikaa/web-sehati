import {
  ControllHistory,
  MedicationHistory,
  Patient,
  User,
} from "@prisma/client";

export interface HealthCheckMonitoringDataModel extends Patient {
  petugas_lapangan: User;
  medicationHistory: MedicationHistory[];
  controllHistory: ControllHistory[];
}
