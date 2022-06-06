import { Card, CardHeader, CardContent, CardActions, Typography } from "@mui/material";
import LinkableAvatar from '../../components/LinkableAvatar.js';

// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown
function PostCard() {
    return (
        <Card sx={{width: "70%"}}>
            <CardHeader avatar={<LinkableAvatar />} title="USDevs" subheader="7th May 2022 | 9:03pm">
            </CardHeader>

            <CardContent>
                <Typography variant="body1">Description</Typography>
            </CardContent>
        </Card>
    )

}

export default PostCard;