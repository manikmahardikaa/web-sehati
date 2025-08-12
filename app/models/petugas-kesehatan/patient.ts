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
  petugas_lapangan:
    | (User & {
        authority?:
          | (User & {
              region?: Region | null;
              subregion?: Subregion | null;
            })
          | null;
        region?: Region | null;
        subregion?: Subregion | null;
      })
    | null; // ← penting: boleh null
  controllHistory: ControllHistory[]; // kalau bisa null dari DB, jadikan ControllHistory[] | null dan distandarkan saat pakai
  medicationHistory: MedicationHistory[]; // idem
}
