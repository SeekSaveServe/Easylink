import { Box, Typography, Card, CardContent, CardHeader, Stack } from "@mui/material";
import styles from './Recommendations.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import ProfileCardList from "../components/ProfileCardList";
import { fakeLinksData } from "../Links/Links";
import { Center } from "@chakra-ui/react";
import useProfileFilter from "../components/ProfileCardList/useProfileFilter";
import { CardList } from "../components/ProfileCardList/ProfileCardList";

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
    const { FilterButton, btnIndex } = useProfileFilter();
    return (
        // <Box className={styles.recc}>
        //     <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
        //     {showRecommendations(2)}
        // </Box>
        // className={`${className} ${styles.recc_box}`}
        // <Box className={scroll.scroll_parent}>
        //     <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
        //         <Box className={scroll.scroll_child}>
        //             <ProfileCardList data={fakeLinksData}/>
        //             {/* <Stack spacing={4}>
        //                 {showRecommendations(10)}
        //             </Stack> */}
        //         </Box>
        // </Box>

        <Box>
            <Center style={{marginBottom:6}}>
                <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
                <FilterButton bg="primary" sx={{margin:"0rem 2rem", width: "20%", display: "block", padding: "0.2rem"}}/>
            </Center>
            <CardList data={fakeLinksData} btnIndex={btnIndex} />
        </Box>
    )

}

export default RecommendationsList;