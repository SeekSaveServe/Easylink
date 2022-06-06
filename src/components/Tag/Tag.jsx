import { Typography } from "@mui/material"


function Tag({ sx, children, color,...rest}) {
    const styleSx = {
        backgroundColor: color,
        borderRadius: "1rem",
        padding: "0.2rem 0.5rem",
        display: "inline-block",
        ...sx
    }
    return (
        <Typography sx={{styleSx}} {...rest}>
            { children }
        </Typography>
    )
}

export default Tag;