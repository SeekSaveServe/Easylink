import { Box, Typography, Card, CardHeader, CardContent, Stack } from "@mui/material";
import styles from './Posts.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import { Center, CircularProgress } from "@chakra-ui/react";
import Scrollable from "../../components/Scrollable";
import PostCard from "../Projects/PostCard";
import { fakePosts } from "../Projects/Posts";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

// For use specifically in feed: pull from followed projects
//  Todo: pass actual pids down to PostCard after populating projectsSlice with needed pids
function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // TODO: change to fetch posts from followed projects only
    const fetchPostsAndProjects = async() => {
        setLoading(true);
        // format of returned data:
        // array of { ...post, projects: { pid, title, avatar_url } }
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    projects (
                        pid,
                        title,
                        avatar_url
                    )
                `)
                .order('created_at', { ascending: false })
            
            if (error) {
                
                throw error;
            } 

            setPosts(data);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
 
}
    useEffect(() => {
        fetchPostsAndProjects();
    }, []);

    function showPosts() {
        if (loading) {
            return <CircularProgress />
        }
        
        if (posts.length == 0) {
            return <Typography variant="h6" color="gray" sx={{fontWeight:"normal", mt:1}}> No posts to show </Typography>
        }

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