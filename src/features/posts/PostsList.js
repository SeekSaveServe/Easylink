import { Box, Typography, Card, CardHeader, CardContent, Stack } from "@mui/material";
import styles from './Posts.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import { Center } from "@chakra-ui/react";
import Scrollable from "../../components/Scrollable";
import PostCard from "../Projects/PostCard";
import { fakePosts } from "../Projects/Posts";

// For use specifically in feed: pull from followed projects
//  Todo: pass actual pids down to PostCard after populating projectsSlice with needed pids
function PostsList() {
    const posts = fakePosts; // replace with actual data
    function showPosts() {
        return posts.map((post, idx) => {
            return <PostCard key={idx} data={post}/>
        });
    }

    return (
        <div>
            <Center style={{marginBottom:6}}>
                <Typography variant="h4" color="var(--secondary)">Posts</Typography>
            </Center>
            <Scrollable height="25vh">
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",}}>
                    { showPosts() }
                </div>
            </Scrollable>
        </div>
        // <Box className={`${scroll.scroll_parent}`}>
            // <Center>
            //     <Typography variant="h4" color="var(--secondary)">Posts</Typography>
            // </Center>
        //     <Box className={scroll.scroll_child}>
        //         <Stack spacing={4}>
        //         { showPosts(10) }
        //         </Stack>
        //     </Box>
        // </Box>
    )
}

export default PostsList;