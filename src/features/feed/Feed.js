import BasicButton from "../../components/BasicButton";
import { supabase } from '../../supabaseClient';
import { useSelector } from 'react-redux';
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import styles from './Feed.module.css';
import RecommendationsList from "../recommendations";
import PostsList from "../posts";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";

function Feed() {
    const userProfile = useSelector(state => state.user);

    const signOut = async() => {
        await supabase.auth.signOut();
    }
    return (
        <>
            <BasicNavBar />
            <Box className={styles.parent}>
                <Typography variant="h4" sx={{margin: "0.5rem 0"}}> 
                    <span style={{color: "var(--primary)"}}>Welcome</span>, {" "}
                    <span style={{color: "var(--secondary)"}}>{userProfile.username}</span>
                </Typography>

                <Box className={styles.content}>
                    <RecommendationsList/>
                    <PostsList/>
                </Box>
            </Box>
        </>
    )
}

export default Feed;