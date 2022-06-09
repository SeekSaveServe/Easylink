import { Button, Container, Paper } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import NavButtonGroup from "./NavButtonGroup";
import styles from './Projects.module.css';
import PostCard from "./PostCard";
import Scrollable from "../../components/Scrollable";
import { Center } from "@chakra-ui/react";
import { AddCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAlert } from "../../components/Alert/AlertContext";

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
    const showPosts = (n) => {
        let posts = [];
        
        for (let i = 0; i < n; i++) {
            posts.push( <PostCard sx={{width: "90%", ml:1, mt:1}} data={fakePosts[i % fakePosts.length]}/>)
        }

        return posts;
    }
    
    const [posts, setPosts] = useState([]);
    const showAlert = useAlert();

    async function getPosts() {
        try {
        const { data, error } = await supabase
            .from('posts')
            .select('*');

        } catch (error) {
            showAlert(error.error_description || error.message, "error");
        }
    }

    useEffect(() => {

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
                { showPosts(6) }
            </div>
        </Scrollable>
        </>
    )
}

export default Posts;