import { Box, InputLabel, TextField, Typography, Checkbox } from "@mui/material";
import { useState } from 'react';

function EntryForm({ setEntryFormVisible }: { setEntryFormVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
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
      <div style={{
        display: "flex",
        flexDirection: 'row',
        gap: 5
      }}>
        <Typography variant='body1'>Add Entry</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            variant='body2'
            sx={{ marginLeft: 1, marginTop: 0.4 }}
          >close form</Typography>
          <Checkbox
            size="small"
            onChange={() => setEntryFormVisible(false)}
            sx={{ paddingTop: 0 }}
          />
        </Box>
      </div>
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
