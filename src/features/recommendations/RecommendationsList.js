import { Box, Typography, Card, CardContent, CardHeader, Stack } from "@mui/material";
import styles from './Recommendations.module.css';
import scroll from '../components/scroll/Scroll.module.css';

function RecommendationCard() {
    return (
        <Card variant="outlined">
            <CardHeader title="USDevs" subheader="4 days ago"/>

            <CardContent>
                <Typography variant="h4">Make laundry chill again</Typography>
                <Typography variant="body2">
                Hi! We are Project Laundrobot, a sub-project under USDevs working on a hardware-based laundry notification system. We are looking for  
                Developers who knows Python, Raspberry Pi
                </Typography>
            </CardContent>
        </Card>
    )
}

function RecommendationsList({ className }) {
    function showRecommendations(n) {
        let arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(<RecommendationCard key={i}/>);
        }
        return arr;
    }

    return (
        // <Box className={styles.recc}>
        //     <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
        //     {showRecommendations(2)}
        // </Box>
        // className={`${className} ${styles.recc_box}`}
        <Box className={scroll.scroll_parent}>
            <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
                <Box className={scroll.scroll_child}>
                    <Stack spacing={4}>
                        {showRecommendations(10)}
                    </Stack>
                </Box>
        </Box>
    )

}

export default RecommendationsList;