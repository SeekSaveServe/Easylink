import { Button, Typography } from '@mui/material';

const bgOptions = {
    "primary": "var(--primary)",
    "secondary": "var(--secondary)"
}

// provide custom sx to override
function BasicButton(props) {
    const { children, sx, bg, ...rest } = props;
    // bg is either in {primary, secondary} or a valid color
    const bgColor = (bg in bgOptions) ? bgOptions[bg] : bg;

    const styleSx = {
        textTransform: "none", 
        fontSize: "1.2rem", 
        backgroundColor: bgColor,
        padding: "0.5rem",
        ...sx
    }
    
    return (
        <Button 
        variant="contained" 
        sx={{...styleSx, '&:hover': { filter: "brightness(90%)", backgroundColor: bgColor}}} 
        {...rest}
        >
            <Typography variant="h6">
                {children}
            </Typography>
        </Button>
    )
}

export default BasicButton;