import { Card, CardHeader, CardContent, CardActions, Typography } from "@mui/material";
import LinkableAvatar from '../../components/LinkableAvatar.js';
import { Badge } from "@chakra-ui/react";

// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown
function PostCard(props) {
    function TextBadge({ text }) {
        return (
            <Badge variant="subtle" colorScheme="blue">
                { text }
            </Badge>
        )
    }
    return (
        <Card {...props}>
            <CardHeader avatar={<LinkableAvatar />} title="USDevs" subheader={<p style={{margin:0}}>7th May 2022 | 9:03pm <TextBadge text="Post"/></p>}>
            </CardHeader>

            <CardContent>
                <Typography variant="body1">Description</Typography>
                <TextBadge text="Post"/>
            </CardContent>

            <CardActions>

            </CardActions>
        </Card>
    )

}

export default PostCard;