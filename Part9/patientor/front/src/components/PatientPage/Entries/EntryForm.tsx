import { Box, InputLabel, TextField, Typography, Checkbox, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from 'react';
import { EntryType, HealthCheckRating } from "../../../types";

function EntryForm({ setEntryFormVisible }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [baseEntryformData, setBaseEntryFormData] = useState({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: ""
  })
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HEALTHCHECK)
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | null>(null)
  const baseEntryKeys: string[] = Object.keys(baseEntryformData) as (keyof typeof baseEntryformData)[];
  function handleSubmit() {

  }

  function handleBaseEntryFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBaseEntryFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
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

  function handleHealthCheckChange(event: SelectChangeEvent<string | null>) {
    try {
      if (!event.target.value) {
        throw new Error('value for Healthcheckrating is null or undefined.');
      }
      const num = Number(event.target.value);
      if (num > 3 || num < 0) {
        throw new Error(`entry for healthcheckrating is incorrect: ${num}`);
      }
      setHealthCheckRating(num);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
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
                onChange={handleHealthCheckChange}>
                {[0, 1, 2, 3].map(n => <div key={n}><MenuItem dense={true} value={n}>{n}</MenuItem></div>)}
              </Select>
            </FormControl>
          </Box>
        )
      case EntryType.OCCUPATIONAL:
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
                value={baseEntryformData[k as keyof typeof baseEntryformData]}
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
