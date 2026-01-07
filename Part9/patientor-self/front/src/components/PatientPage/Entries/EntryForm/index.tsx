import { Box, InputLabel, TextField, Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from 'react';
import { EntryType, HealthCheckRating, BaseEntryFormTypes } from "../../../../types";
import EntryTypeSelect from "./EntryTypeSelect";
import Header from './Header.tsx';
import BaseEntryForm from "./BaseEntryForm.tsx";
import entryService from '../../../../services/entries.ts';
import { exhaustiveTypeGuard } from "../../../../utilities.ts";
import { entryTypeValidator } from "../../../../utilities.ts";
import * as z from 'zod';

type HealthCheckRatingKeys = keyof typeof HealthCheckRating;

function EntryForm({ setEntryFormVisible, patientId }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>>, patientId: string }) {

  const [baseEntryFormData, setBaseEntryFormData] = useState<BaseEntryFormTypes>({
    type: "",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: ""
  });

  const [entryType, setEntryType] = useState<EntryType>(EntryType.HEALTHCHECK);
  const [healthCheckRatingKey, setHealthCheckRatingKey] = useState<HealthCheckRatingKeys>('Healthy');

  function isHealthCheckRatingKey(value: any): value is HealthCheckRatingKeys {
    return value in HealthCheckRating && isNaN(Number(value));
  };

  function handleHealthCheckChange(event: SelectChangeEvent<string | null>) {
    if (!event.target.value) {
      throw new Error('Healthcheck rating is null.');
    }
    if (isHealthCheckRatingKey(event.target.value)) {
      setHealthCheckRatingKey(event.target.value);
    }
  };

  function getHealthCheckRating(healthCheckRatingKey: HealthCheckRatingKeys): HealthCheckRating {
    switch (healthCheckRatingKey) {
      case "Healthy":
        return 0;
      case "LowRisk":
        return 1;
      case "HighRisk":
        return 2;
      case "CriticalRisk":
        return 3;
      default:
        exhaustiveTypeGuard(healthCheckRatingKey)
    }
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let entryOfUnknownType: unknown = {};
    const type = baseEntryFormData.type;
    switch (type) {
      case EntryType.HEALTHCHECK:
        entryOfUnknownType = {
          ...baseEntryFormData,
          healthCheckRating: getHealthCheckRating(healthCheckRatingKey)
        }
        break;
      case EntryType.HOSPITAL:
        break;
      case EntryType.OCCUPATIONAL:
        break;
      case "":
        return;
      default:
        exhaustiveTypeGuard(type);
    }
    try {
      const validatedEntry = entryTypeValidator(entryOfUnknownType);
      entryService.addEntry(validatedEntry, patientId);
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        throw new Error(`${e.issues}`);
      }
    }
  };

  function displayConditionalEntryTypes(entryType: EntryType) {
    switch (entryType) {
      case EntryType.HEALTHCHECK:
        return (
          <Box sx={{ marginTop: 2 }}>
            <InputLabel>Healthcheck rating:</InputLabel>
            <Select
              sx={{ width: 200 }}
              label="Healthcheck rating"
              value={healthCheckRatingKey}
              onChange={handleHealthCheckChange}>
              {Object.keys(HealthCheckRating)
                .filter(key => isNaN(Number(key)))
                .map((n: string) => {
                  return (
                    <MenuItem key={n} dense={true} value={n}>{n}</MenuItem>
                  )
                })}
            </Select>
            <br />
            <Button type="submit" variant="contained">Submit</Button>
          </Box >
        );
      case EntryType.OCCUPATIONAL:
        return (
          <Box>
            <InputLabel>Employer name:</InputLabel>
            <TextField size="small" />
          </Box>
        );
      case EntryType.HOSPITAL:
    }
  };

  return (
    <div>
      <Header setEntryFormVisible={setEntryFormVisible} />
      <EntryTypeSelect setEntryType={setEntryType} />
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        <BaseEntryForm
          baseEntryFormData={baseEntryFormData}
          setBaseEntryFormData={setBaseEntryFormData}
        />
        {displayConditionalEntryTypes(entryType)}
      </Box>
    </div >
  )
};

export default EntryForm;
