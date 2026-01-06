import { InputLabel, TextField } from '@mui/material';
import { BaseEntryFormTypes } from '../../../../types';

interface Props {
  baseEntryFormData: BaseEntryFormTypes,
  setBaseEntryFormData: React.Dispatch<React.SetStateAction<BaseEntryFormTypes>>
};

function BaseEntryForm({ baseEntryFormData, setBaseEntryFormData }: Props) {

  const baseEntryKeys: string[] = Object.keys(baseEntryFormData) as (keyof typeof baseEntryFormData)[];
  function handleBaseEntryFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setBaseEntryFormData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  };

  return (
    <div>
      {
        baseEntryKeys.map((k: string) => {
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
        })
      }
    </div>
  )
};

export default BaseEntryForm;

