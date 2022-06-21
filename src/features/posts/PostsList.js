import { Box, Typography, Card, CardHeader, CardContent, Stack } from "@mui/material";
import styles from './Posts.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import { Center, CircularProgress } from "@chakra-ui/react";
import Scrollable from "../../components/Scrollable";
import PostCard from "../Projects/PostCard";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useSelector } from 'react-redux';
import { selectAllFollowed } from '../followers/followerSlice';

// For use specifically in feed: pull from followed projects

// filterIndex: 0 = both, 1 = posts only, 2 = polls only
const filterMap = {
    0: datum => true,
    1: datum => !datum.isPoll,
    2: datum => datum.isPoll
}

function PostsList({ filterIndex }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const followedIds = useSelector(selectAllFollowed)?.map(row => row.followed_pid);
    console.log("Followed ids", followedIds);

    // TODO: change to fetch posts from followed projects only
    const fetchPostsAndProjects = async() => {
        setLoading(true);
        // format of returned data:
        // array of { ...post, projects: { pid, title, avatar_url } }

        // need to specify posts.pid f_key because of reactions
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    projects!posts_pid_fkey (
                        pid,
                        username,
                        avatar_url
                    )
                `)
                .in('pid', followedIds)
                .order('created_at', { ascending: false })
            
            if (error) {
                
                throw error;
            } 

            // console.log("Posts feed", data);
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
            return filterMap[filterIndex](post) ? <PostCard key={idx} data={post}/> : <></>;
        });
    }

    return (
        <div>
            <Scrollable height="25vh">
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",}}>
                    { showPosts() }
                </div>
            </Scrollable>
        </div>
    )
}

export default PostsList;