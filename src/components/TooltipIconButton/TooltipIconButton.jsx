import { Typography, IconButton, Tooltip } from "@mui/material"

function TooltipIconButton({ title, icon, ...rest}) {
    const TitleComponent = () => {
        return <Typography variant="body2">{title}</Typography>
    }
    return (
        <Tooltip title={<TitleComponent/>} sx={{fontSize:"10rem"}}>
            <IconButton {...rest}>
                { icon }
            </IconButton>
        </Tooltip>
    )
}

export default TooltipIconButton;