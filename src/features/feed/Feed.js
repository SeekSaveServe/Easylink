import BasicButton from "../../components/BasicButton";
import { supabase } from '../../supabaseClient';
import { useSelector } from 'react-redux';
import { Box, Container, Typography } from "@mui/material";
import styles from './Feed.module.css';
import RecommendationsList from "../recommendations";
import PostsList from "../posts";

function Feed() {
    const userProfile = useSelector(state => state.user);

    const signOut = async() => {
        await supabase.auth.signOut();
    }
    return (
        <Box className={styles.parent}>
            <Typography variant="h3">Text</Typography>
            <BasicButton onClick={signOut} bg="primary" sx={{width: "300px"}}>Sign Out</BasicButton>

            {/* {/* <h1>Welcome, {userProfile.username}</h1> */}
            {/* <h2>Your telegram is: {userProfile.telegram}</h2> */}

            <Box className={styles.content}>
                <RecommendationsList/>
                <PostsList/>
            </Box>
        </Box>
    )
}

export default Feed;