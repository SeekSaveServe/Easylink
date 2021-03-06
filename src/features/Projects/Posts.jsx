import { Button, Container, Paper, Typography } from "@mui/material";
import PostCard from "../posts/PostCard";
import Scrollable from "../../components/Scrollable";
import { Center, CircularProgress } from "@chakra-ui/react";
import { AddCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAlert } from "../../components/Alert/AlertContext";
import { useSelector } from "react-redux";
import { selectProjectById } from "./projectsSlice";
import { PostsDisplay } from "../posts/PostsDisplay";

// For the Posts tab under Projects. Show posts and polls made by the switched project
// export const fakePosts = [
//     {   
//         isPoll: false,
//         title: "USDevs",
//         avatarUrl: "",
//         dateString: "7th May 2022 | 9:03pm", // TODO: format date string based on created_at ISO Date str from DB
//         body: "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js",
//     },
//     {   
//         isPoll: true,
//         title: "USDevs",
//         avatarUrl: "",
//         dateString: "7th May 2022 | 9:33pm", 
//         body: "Are you coming for the workshop on the 14th?",
//         pollOptions: ["Yes", "No"]
//     },
//     {   
//         isPoll: false,
//         title: "USDevs",
//         avatarUrl: "",
//         dateString: "7th May 2022 | 9:03pm",
//         body: "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js",
//     },
//     {   
//         isPoll: true,
//         title: "USDevs",
//         avatarUrl: "",
//         dateString: "7th May 2022 | 9:33pm", 
//         body: "Are you coming for the workshop on the 14th?",
//         pollOptions: ["Yes", "No"]
//     },
//     {   
//         isPoll: true,
//         title: "USDevs",
//         avatarUrl: "",
//         dateString: "7th May 2022 | 9:33pm", 
//         body: "Are you coming for the workshop on the 14th?",
//         pollOptions: ["Yes", "No"]
//     },
//     {   
//         isPoll: false,
//         title: "USDevs",
//         avatarUrl: "",
//         dateString: "7th May 2022 | 9:03pm",
//         body: "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js",
//     }

// ]

// Posts / polls that are made by the switched project (owned)
function Posts() {    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const pid = useSelector(state => state.user.pid); // if I'm seeing Posts, I should be in Project mode -> pid exists
    const project = useSelector(state => selectProjectById(state, pid));
    const showAlert = useAlert();

    async function getPosts() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .match({ pid: pid})
                // sort posts so most recent at top
                .order('created_at', { ascending: false })
            
            if (error) throw error;
            const dataWithProject = data.map((post, idx) => {
                post = {
                    ...post,
                    projects: project
                }
                return post;
            });
            setPosts(dataWithProject);
            

        } catch (error) {
            showAlert(error.error_description || error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
        <Center style={{marginBottom:2}}>
            <Link to="/addpost">
                <Button 
                variant="outlined" 
                startIcon={<AddCircleOutlined/>} 
                size="normal"
                sx={{textTransform: "none"}}
                data-testid="add-announcement"
                > Add announcement</Button>
            </Link>
        </Center>

        <Center sx={{mt:10}}>
            <Typography variant="h6">Announcements by {project.username}</Typography>
        </Center>

        <PostsDisplay data={posts} loading={loading} filterIndex={0} gutterHeight="35vh"/>
        </>
    )
}

export default Posts;