import { Typography } from "@mui/material"
import styles from './Tag.module.css';

function Tag({ sx, children, color, fontColor, ...rest}) {
    const styleSx = {
        backgroundColor: color,
        color: fontColor,
        ...sx
    }
    return (
        <Typography variant="body1" sx={{...styleSx}} className={styles.tag} {...rest}>
            { children }
        </Typography>
    )
}

export default Tag;