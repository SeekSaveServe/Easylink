import { Button, Container, Paper } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import NavButtonGroup from "./NavButtonGroup";
import styles from './Projects.module.css';
import PostCard from "./PostCard";

// Posts / polls

function Posts() {
    return (
        <div>
            <PostCard/>
        </div>
    )
}

export default Posts;