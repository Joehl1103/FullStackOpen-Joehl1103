import { Box, InputLabel, TextField, Typography, Checkbox, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from 'react';
import { EntryType, HealthCheckRating } from "../../../types";
import { exhaustiveTypeGuard } from "../../../utilities";

type HealthCheckRatingKeys = keyof typeof HealthCheckRating;

function EntryForm({ setEntryFormVisible }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [baseEntryFormData, setBaseEntryFormData] = useState({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: ""
  })
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HEALTHCHECK)
  const [healthCheckRatingKey, setHealthCheckRatingKey] = useState<HealthCheckRatingKeys>('Healthy')
  const baseEntryKeys: string[] = Object.keys(baseEntryFormData) as (keyof typeof baseEntryFormData)[];



  function handleBaseEntryFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBaseEntryFormData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  function handleEntryTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    switch (event.target.value) {
      case "Healthcheck":
        setEntryType(EntryType.HEALTHCHECK);
        break;
      case "Occupational Healthcare":
        setEntryType(EntryType.OCCUPATIONAL);
        break;
      case "Hospital":
        setEntryType(EntryType.HOSPITAL);
        break;
      default:
        throw new Error(`${event.target.value} is not an entry type.`);
    }
  };

  function isHealthCheckRatingKey(value: any): value is HealthCheckRatingKeys {
    return value in HealthCheckRating && isNaN(Number(value));
  }

  function handleHealthCheckChange(event: SelectChangeEvent<string | null>) {
    console.log('event.target.value', event.target.value)
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
                    console.log('n', n)
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
      <div style={{
        display: "flex",
        flexDirection: 'row',
        gap: 5
      }}>
        <Typography variant='body1'>Add Entry</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant='body2'
            sx={{ marginLeft: 1, marginTop: 0.6 }}
          >close form</Typography>
          <Checkbox
            size="small"
            onChange={() => setEntryFormVisible(false)}
            sx={{ paddingTop: 0 }}
          />
        </Box>
      </div>
      <FormControl >
        <FormLabel sx={{ fontSize: 15 }}>Entry type</FormLabel>
        <RadioGroup
          defaultValue="Healthcheck"
          sx={{ display: "flex", flexDirection: 'row' }}
          onChange={handleEntryTypeChange}>
          {["Healthcheck", "Occupational Healthcare", "Hospital"].map(v => {
            return (
              <div key={v}>
                <FormControlLabel value={v} control={<Radio size="small" />} label={v} />
              </div>
            )
          })}
        </RadioGroup>
      </FormControl>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        {baseEntryKeys.map((k: string) => {
          return (
            <div key={k}>
              <InputLabel>{k}</InputLabel>
              <TextField
                name={k}
                value={baseEntryFormData[k as keyof typeof baseEntryFormData]}
                onChange={handleBaseEntryFormChange}
                size="small"
              />
              <br />
            </div>
          )
        })}
        {displayConditionalEntryTypes(entryType)}
      </Box>
    </div >
  )
}

export default EntryForm;
