import { Box, Typography } from "@mui/material";
import styles from './Recommendations.module.css';

function RecommendationsList() {
    return (
        <Box className={styles.recc}>
            <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
        </Box>
    )

}

export default RecommendationsList;