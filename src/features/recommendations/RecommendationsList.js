import { Box, Typography, Card, CardContent, CardHeader, Stack } from "@mui/material";
import styles from './Recommendations.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import ProfileCardList from "../components/ProfileCardList";
import { fakeLinksData } from "../Links/Links";
import { Center } from "@chakra-ui/react";
import useProfileFilter from "../components/ProfileCardList/useProfileFilter";
import { CardList } from "../components/ProfileCardList/ProfileCardList";

// For use specifically in Feed: pull from recommender API
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