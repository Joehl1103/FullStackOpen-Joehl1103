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
  const newPatient: Patient = {
    id: uuid(),
    ...newPatientEntry
  }
  return newPatient;
}

export default {
  getPatientsWithoutSsns,
  addPatient
}
