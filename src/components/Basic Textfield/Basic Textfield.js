import { TextField, InputAdornment } from "@mui/material";

// refer to https://mui.com/material-ui/api/text-field/ and https://mui.com/material-ui/react-text-field/
const bgOptions = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
};

// provide custom sx to override
function BasicTextfield(props) {
  const { icon, variant = "outlined", ...rest } = props;
  const label = rest.label.replace(" ", "");
  // bg is either in {primary, secondary} or a valid color

  return ( 
    <TextField 
      variant={props.variant} 
      inputProps={{
        'data-label': label
      }}
      InputProps={icon ? {
       startAdornment: (
         <InputAdornment position="start">
          { icon }
         </InputAdornment>
       )
     } : {}}
      {...rest}
    ></TextField> 
  );
}

export default BasicTextfield;
