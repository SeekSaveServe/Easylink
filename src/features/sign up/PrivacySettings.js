import { Paper, Typography, Checkbox, FormControlLabel, 
    FormControl, FormLabel, FormGroup } from "@mui/material";
import logo from "../../Assets/Easylink Logo Full.png";

// rest is props for Checkbox, not FCL
function CheckboxWithLabel({ label, ...rest }) {
    return (
        <FormControlLabel 
          label={label} 
          control={<Checkbox {...rest} />}>
        </FormControlLabel>
    )
}

function PrivacySettings() {
    return (
        <>
        <img src={logo} alt="Logo" style={{width: "250px"}} />
        <Paper>
            <Typography variant="h5">How would you like to be contacted by linked users?</Typography>
            
            <FormControl>
                <FormLabel>
                    <Typography variant="h5">Contact details visibility:</Typography>
                </FormLabel>

                <FormGroup row>
                    <CheckboxWithLabel label="Telegram" />
                    <CheckboxWithLabel label="Email" />
                </FormGroup>
            </FormControl>

            
        </Paper>
        </>
    )
}

export default PrivacySettings;