import {
  Patient,
  User,
  Region,
  Subregion,
  ControllHistory,
  MedicationHistory,
} from "@prisma/client";

// Nested authority punya region, dan user punya subregion
export interface PatientDataModel extends Patient {
  petugas_lapangan: User & {
    authority?: User & {
      region?: Region;
      subregion?: Subregion;
    };
    region?: Region;
    subregion?: Subregion;
  };
  controllHistory: ControllHistory[];
  medicationHistory: MedicationHistory[];
}
