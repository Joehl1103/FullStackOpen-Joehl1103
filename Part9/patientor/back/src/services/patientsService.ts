import { PatientWithoutSsn } from "../data/types";
import data from './../data/patients';

function getPatientsWithoutSsns(): PatientWithoutSsn[] {
  return data.map(patient => {
    const { ssn, ...rest } = patient;
    return rest
  });
};

export default {
  getPatientsWithoutSsns
}
