import axios from 'axios';
import { Diagnosis } from '../types';

import { apiBaseUrl } from '../constants';

async function getDiagnosisByCode(code: string): Promise<Diagnosis> {
  const res = await axios.get(`${apiBaseUrl}/diagnoses`)
  const diagnosis = res.data.filter((i: Diagnosis) => i.code === code)
  const numElements: number = diagnosis.length;
  if (numElements > 1) {
    throw new Error(`There are ${numElements} that corresponde to code: ${code}.`);
  }
  return diagnosis[0];
}

export default {
  getDiagnosisByCode
}
