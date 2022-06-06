import { Button, Container, Paper } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import NavButtonGroup from "./NavButtonGroup";
import styles from './Projects.module.css';
import PostCard from "./PostCard";
import Scrollable from "../../components/Scrollable";

// Posts / polls

function Posts() {
    return (
        <Scrollable height="20vh">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",}}>
                <PostCard sx={{width: "80%", ml:1, mt:1}}/>
                <PostCard sx={{width: "80%", ml:1, mt:1}}/>
                <PostCard sx={{width: "80%", ml:1, mt:1}}/>
                <PostCard sx={{width: "80%", ml:1, mt:1}}/>
                <PostCard sx={{width: "80%", ml:1, mt:1}}/>
                <PostCard sx={{width: "80%", ml:1, mt:1}}/>

            </div>
        </Scrollable>
    )
}

export default Posts;