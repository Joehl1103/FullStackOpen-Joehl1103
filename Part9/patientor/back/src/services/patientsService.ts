import { NewPatientEntry, Patient, PatientWithoutSsn } from "../data/types";
import data from './../data/patients';
import { v1 as uuid } from 'uuid';

function getPatientsWithoutSsns(): PatientWithoutSsn[] {
  return data.map(patient => {
    const { ssn, ...rest } = patient;
    return rest
  });
};

function addPatient(newPatientEntry: NewPatientEntry): Patient {
  if (newPatientEntry.name && newPatientEntry.dateOfBirth && newPatientEntry.ssn && newPatientEntry.gender && newPatientEntry.occupation) {
    const newPatient: Patient = {
      id: uuid(),
      name: newPatientEntry.name,
      dateOfBirth: newPatientEntry.dateOfBirth,
      ssn: newPatientEntry.ssn,
      gender: newPatientEntry.gender,
      occupation: newPatientEntry.occupation
    }
    return newPatient;
  }
  throw new Error('Some data is missing.');
}

export default {
  getPatientsWithoutSsns,
  addPatient
}
