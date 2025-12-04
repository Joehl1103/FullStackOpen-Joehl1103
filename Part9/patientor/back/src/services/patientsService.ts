import { NewPatientEntry, Patient, PatientWithoutSsn } from "../data/types";
import data from './../data/patients';
import { v1 as uuid } from 'uuid';

function getPatientsWithoutSsns(): PatientWithoutSsn[] {
  return data.map((patient: Patient) => {
    const { ssn, ...rest } = patient;
    return rest
  });
};

function getPatientById(id: string) {
  return data.filter((patient: Patient) => {
    return patient.id === id
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
  getPatientById,
  addPatient
}
