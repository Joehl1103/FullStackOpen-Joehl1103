import { useState, useEffect } from 'react';
import { Patient, Entry } from "../../types.ts";
import { useParams } from "react-router-dom";
import * as z from 'zod';
import services from '../../services/patients';
import { Typography, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { IconProps } from '@mui/material';
import EntryDisplay from './Entries/EntryDisplay.tsx';
import EntryForm from './Entries/EntryForm.tsx';

interface IParams {
  id: string;
}

const paramsSchema = z.object({
  id: z.string()
})

function RowAndCell({ left, right }: { left: string, right: string }) {

  return (
    <TableRow style={{ width: 200 }} hover={true}>
      <TableCell align='left' style={{ fontWeight: 'bold', width: 100 }} >{left}</TableCell>
      <TableCell align='left'>{right}</TableCell>
    </TableRow>
  )
}

function PatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries] = useState<Entry[]>();
  const params: IParams = paramsSchema.parse(useParams());
  useEffect(() => {
    services.getById(params.id)
      .then(patient => {
        setPatient(patient);
        const entries: Entry[] = patient.entries;
        setEntries(entries);
      });
  }, []);

  if (!patient || Object.length === 0) {
    return <div>No patient to display...</div>
  }
  const iconSize: IconProps['fontSize'] = 'large';
  return (
    <div>
      <Typography variant='h4'>
        {patient.name}{' '}{patient.gender === 'male' ? <MaleIcon fontSize={iconSize} /> : <FemaleIcon fontSize={iconSize} />}
      </Typography>
      <div>
        <TableContainer style={{ marginTop: 40, marginBottom: 20, width: 300 }}>
          <Table size='small' >
            <TableBody>
              <RowAndCell left={'Date of Birth:'} right={patient.dateOfBirth} />
              <RowAndCell left={'Occupation:'} right={patient.occupation} />
              <RowAndCell left={'SSN:'} right={patient.ssn} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Typography variant='h5' sx={{ marginBottom: 5 }}>Entries</Typography>
        <EntryForm />
        {entries && entries.length > 0
          ? entries.map(e => {
            return (
              <div key={e.id}>
                <EntryDisplay entry={e} />
              </div>
            )
          })
          : <div>No entries to display...</div>}
      </div>
    </div >
  )
};

export default PatientPage;

