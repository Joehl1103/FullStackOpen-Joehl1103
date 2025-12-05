export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = "male",
  Female = "female"
};

export interface Entry {

};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutSsn = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">

