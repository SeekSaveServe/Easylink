import { Box, Typography, Card, CardHeader, CardContent, Stack } from "@mui/material";
import styles from './Posts.module.css';
import scroll from '../components/scroll/Scroll.module.css';
import { Center } from "@chakra-ui/react";


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
            arr.push(<PostCard key={i}/>);
        }
        return arr;
    }

    return (
        <Box className={`${scroll.scroll_parent}`}>
            <Center>
                <Typography variant="h4" color="var(--secondary)">Posts</Typography>
            </Center>
            <Box className={scroll.scroll_child}>
                <Stack spacing={4}>
                { showPosts(10) }
                </Stack>
            </Box>
        </Box>
    )
}

export default PostsList;