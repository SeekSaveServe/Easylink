import { Box, Typography, Card, CardHeader, CardContent, Stack } from "@mui/material";
import styles from './Posts.module.css';
import scroll from '../components/scroll/Scroll.module.css';


function PostCard() {
    return (
        <Card variant="outlined">
            <CardHeader title="USDevs" subheader="4 days ago"/>

            <CardContent>
                <Typography variant="h4">Workshop</Typography>
                <Typography variant="body2">
                Good day to all! This is to announce our workshop happening on 14th May. Please come if you want to learn about Node.js!
                </Typography>
            </CardContent>
        </Card>
    )
}
function PostsList({ className }) {
    function showPosts(n) {
        let arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(<PostCard/>);
        }
        return arr;
    }

    return (
        <Box className={`${scroll.scroll_parent}`}>
            <Typography variant="h4" color="var(--secondary)">Posts</Typography>
            {/* <Stack spacing={4} sx={{padding: "1rem"}}> */}
            <Box className={scroll.scroll_child}>
                { showPosts(10) }
            </Box>
            {/* </Stack> */}
        </Box>
    )
}

export default PostsList;