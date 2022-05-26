import { Box, Typography } from "@mui/material";
import styles from './Posts.module.css';

function PostsList() {
    return (
        <Box className={styles.posts}>
            <Typography variant="h4" color="var(--secondary)">Posts</Typography>
        </Box>
    )
}

export default PostsList;