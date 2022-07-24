// Presentational component to show posts given the data and filterIndex - to enable re-use in Feed / Profile / Posts page
import Scrollable from "../../components/Scrollable"
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import PostCard from "./PostCard";

// Posts: an array of { ...post, pid, username, avatar_url } - pid,username, avatar from the project that made the post
const filterMap = {
    0: datum => true,
    1: datum => !datum.isPoll,
    2: datum => datum.isPoll
}

export function PostsDisplay({ data, loading, filterIndex, gutterHeight }) {
    const posts = data;
    const postsDisplay = () => {
        if (loading) {
            return <CircularProgress />;
        }

        return posts.length == 0 ? <Typography variant="h6" color="gray" sx={{mt:1, fontWeight:"normal"}}>Nothing to show</Typography> : 
            posts.map((post, idx) => {
            return filterMap[filterIndex](post) ? <PostCard key={idx} data={post}/> : <></>;
        })
    }

    return (
        <Scrollable height={gutterHeight ? gutterHeight : "25vh" }>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",}}>
                { postsDisplay() }
            </div>
        </Scrollable>
    );
}