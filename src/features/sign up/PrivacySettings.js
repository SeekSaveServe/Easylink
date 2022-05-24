import { Person } from "@mui/icons-material";
import { Paper, Typography, Checkbox, FormControlLabel, 
    FormControl, FormLabel, FormGroup, Radio, RadioGroup, Box, Container } from "@mui/material";
import { useState } from "react";
import logo from "../../Assets/Easylink Logo Full.png";
import BasicButton from "../../components/BasicButton";

// rest is props for Checkbox, not FCL
function CheckboxWithLabel({ label, ...rest }) {
    return (
        <FormControlLabel 
          label={label} 
          control={<Checkbox {...rest} />}
        />
    );
}

function RadioWithLabel({ label, ...rest}) {
    return (
        <FormControlLabel
          label={label}
          value={label}
          control={<Radio {...rest}/>}
        />
    )
}
function PrivacySettings() {
    const [contact, setContact] = useState("Only after linking");
    const radioChange = (evt) => setContact(evt.target.value);

    const [visibility, setVisibility] = useState({
        telegram: false,
        email: false
    });

    const visChange = (evt) => setVisibility({...visibility, [evt.target.name]: evt.target.checked})

    

    

    return (
        <Container sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4}}>
            <Box sx={{display: "flex", width: "100%"}}>
                <div style={{flex: 1}}><Person fontSize="large"/> </div>
                <img src={logo} alt="Logo" style={{width: "200px"}} />
                {/*  https://stackoverflow.com/questions/38948102/center-one-and-right-left-align-other-flexbox-element*/}
                <div style={{flex: 1}}> </div>
            </Box>
            
            <Paper 
                elevation={4} 
                sx={{width: "70%", display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem", marginTop:2}}>
                
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <FormLabel>
                        <Typography variant="h5" color="black">How would you like to be contacted by linked users?</Typography>
                    </FormLabel>

                    <RadioGroup row value={contact} onChange={radioChange}>    
                        <RadioWithLabel label="Only after linking"/>
                        <RadioWithLabel label="Everyone"/>
                    </RadioGroup>
                </Box>
                
                <Box mt={6} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <FormLabel>
                        <Typography variant="h5" color="black">Contact details visibility:</Typography>
                    </FormLabel>

                    <FormGroup row>
                        <CheckboxWithLabel label="Telegram" name="telegram" value={visibility.telegram} onChange={visChange}/>
                        <CheckboxWithLabel label="Email" name="email" value={visibility.email} onChange={visChange}/>
                    </FormGroup>
                </Box>

                <BasicButton bg="primary" sx={{width: "50%", mt: 2}} >Start Linking!</BasicButton>
            </Paper>
        </Container>    
    )
}

export default PrivacySettings;