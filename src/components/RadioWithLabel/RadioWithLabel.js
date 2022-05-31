import { FormControlLabel, Radio } from "@mui/material";

export default function RadioWithLabel({ value, label, ...rest }) {
  return (
    <FormControlLabel
      label={label}
      value={value}
      control={<Radio {...rest} />}
    />
  );
}
