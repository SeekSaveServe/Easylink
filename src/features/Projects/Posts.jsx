import { Button, Container, Paper } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import NavButtonGroup from "./NavButtonGroup";
import styles from './Projects.module.css';
import PostCard from "./PostCard";
import Scrollable from "../../components/Scrollable";
import { Center } from "@chakra-ui/react";
import { AddCircleOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

// Posts / polls

function Posts() {
    const showPosts = (n) => {
        let posts = [];
        
        for (let i = 0; i < n; i++) {
            posts.push( <PostCard sx={{width: "90%", ml:1, mt:1}}/>)
        }

        return posts;
    }
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