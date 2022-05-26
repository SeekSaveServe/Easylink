import BasicButton from "../../components/BasicButton";
import { supabase } from '../../supabaseClient';
import { useSelector } from 'react-redux';
import { Box, Typography, Stack, Paper } from "@mui/material";
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
            <Paper elevation={2} sx={{padding: "1rem", backgroundColor: "inherit"}}>
                <Stack direction="row" justifyContent="center">
                    <Typography variant="h4">
                        <span style={{color: "var(--primary)"}}>Welcome</span>, {" "}
                        <span style={{color: "var(--secondary)"}}>{userProfile.username}</span>
                    </Typography>
                </Stack>
            </Paper>

            <Box className={styles.content}>
                <RecommendationsList/>
                <PostsList/>
            </Box>
        </Box>
    )
}

export default Feed;