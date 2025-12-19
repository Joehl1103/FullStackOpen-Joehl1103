import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from 'react';

function EntryForm() {
  const [baseEntryformData, setBaseEntryFormData] = useState({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: ""
  })
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
  return (
    <div>
      <Typography>Add Entry</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
      >
        {/* lay out types of entries and conditionally display the form fields */}
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
      </Box>
    </div >
  )
}

export default EntryForm;
