// Presentational component to show posts given the data and filterIndex - to enable re-use in Feed / Profile / Posts page
import Scrollable from "../../components/Scrollable"
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import PostCard from "../Projects/PostCard";

// Posts: an array of { ...post, pid, username, avatar_url } - pid,username, avatar from the project that made the post
const filterMap = {
    0: datum => true,
    1: datum => !datum.isPoll,
    2: datum => datum.isPoll
}

export function PostsDisplay({ posts, loading, filterIndex }) {
    const postsDisplay = () => {
        if (loading) {
            return <CircularProgress />;
        }

        return posts.length == 0 ? <Typography variant="h6" color="gray" sx={{mt:1, fontWeight:"normal"}}>Nothing to show</Typography> : 
            posts.map((post, idx) => {
            // const data = {
            //     ...post,
            //     projects: { post.pid, username: project.username, avatar_url: project.avatar_url }
            // }
            return filterMap[filterIndex](post) ? <PostCard key={idx} data={post}/> : <></>;
            // return <PostCard sx={{width: "90%", ml:1, mt:1}} data={data} key={idx}/>
        })
    }

    return (
        <Scrollable height="25vh">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",}}>
                { postsDisplay() }
            </div>
        </Scrollable>
    );
}