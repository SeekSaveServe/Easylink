import { Button, Container, Paper, Typography } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import NavButtonGroup from "./NavButtonGroup";
import styles from './Projects.module.css';
import PostCard from "./PostCard";
import Scrollable from "../../components/Scrollable";
import { Center, CircularProgress } from "@chakra-ui/react";
import { AddCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAlert } from "../../components/Alert/AlertContext";
import { useSelector } from "react-redux";

// For the Posts tab under Projects. Show posts and polls made by the switched project
export const fakePosts = [
    {   
        isPoll: false,
        title: "USDevs",
        avatarUrl: "",
        dateString: "7th May 2022 | 9:03pm", // TODO: format date string based on created_at ISO Date str from DB
        body: "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js",
    },
    {   
        isPoll: true,
        title: "USDevs",
        avatarUrl: "",
        dateString: "7th May 2022 | 9:33pm", 
        body: "Are you coming for the workshop on the 14th?",
        pollOptions: ["Yes", "No"]
    },
    {   
        isPoll: false,
        title: "USDevs",
        avatarUrl: "",
        dateString: "7th May 2022 | 9:03pm",
        body: "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js",
    },
    {   
        isPoll: true,
        title: "USDevs",
        avatarUrl: "",
        dateString: "7th May 2022 | 9:33pm", 
        body: "Are you coming for the workshop on the 14th?",
        pollOptions: ["Yes", "No"]
    },
    {   
        isPoll: true,
        title: "USDevs",
        avatarUrl: "",
        dateString: "7th May 2022 | 9:33pm", 
        body: "Are you coming for the workshop on the 14th?",
        pollOptions: ["Yes", "No"]
    },
    {   
        isPoll: false,
        title: "USDevs",
        avatarUrl: "",
        dateString: "7th May 2022 | 9:03pm",
        body: "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js",
    }

    
]

// Posts / polls that are made by the switched project (owned)
function Posts() {
    // const showPosts = (n) => {
    //     let posts = [];
        
    //     for (let i = 0; i < n; i++) {
    //         posts.push( <PostCard sx={{width: "90%", ml:1, mt:1}} data={fakePosts[i % fakePosts.length]}/>)
    //     }

    //     return posts;
    // }
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const pid = useSelector(state => state.user.pid); // if I'm seeing Posts, I should be in Project mode -> pid exists
    const showAlert = useAlert();

    async function getPosts() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .match({ pid: pid})
            
            if (error) throw error;
            setPosts(data);

        } catch (error) {
            showAlert(error.error_description || error.message, "error");
        } finally {
            setLoading(false);
        }
    }

    const postsDisplay = () => {
        if (loading) {
            return <CircularProgress />;
        }

        return posts.length == 0 ? <Typography variant="h6" color="gray" sx={{mt:1, fontWeight:"normal"}}>Nothing to show</Typography> : 
            posts.map((post, idx) => {
            return <PostCard sx={{width: "90%", ml:1, mt:1}} data={post} key={idx}/>
        })
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
                > Add announcement</Button>
            </Link>
        </Center>

        <Scrollable height="25vh">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",}}>
                { postsDisplay() }
            </div>
        </Scrollable>
        </>
    )
}

export default Posts;