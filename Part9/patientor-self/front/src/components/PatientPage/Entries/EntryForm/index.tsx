import { Box, InputLabel, TextField, Typography, Checkbox, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from 'react';
import { EntryType, HealthCheckRating, BaseEntryFormTypes } from "../../../../types";
import EntryTypeSelect from "./EntryTypeSelect";
import Header from './Header.tsx';
import BaseEntryForm from "./BaseEntryForm.tsx";

type HealthCheckRatingKeys = keyof typeof HealthCheckRating;

function EntryForm({ setEntryFormVisible }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [baseEntryFormData, setBaseEntryFormData] = useState<BaseEntryFormTypes>({
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

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log('submitting');
  };

  function displayConditionalEntryTypes(entryType: EntryType) {
    switch (entryType) {
      case EntryType.HEALTHCHECK:
        return (
          <Box>
            <FormControl sx={{ marginTop: 2 }}>
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
            </FormControl>
          </Box>
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
