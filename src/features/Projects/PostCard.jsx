import { Card, CardHeader, CardContent, CardActions, Typography } from "@mui/material";
import LinkableAvatar from '../../components/LinkableAvatar.js';
import { Badge } from "@chakra-ui/react";
import Tag from "../../components/Tag/Tag.jsx";
import Emoji from "../../components/Emoji/EmojiButton.jsx";
import { Box } from "@mui/system";

// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown
function PostCard(props) {
    const isPost = true;
    const title = "USDevs";
    const dateString = "7th May 2022 | 9:03pm";
    const avatatUrl="";
    const description = "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js";
    function TextBadge({ text }) {
        return (
            <Badge variant="subtle" colorScheme="blue">
                { text }
            </Badge>
        )
    }
    return (
        <Card {...props}>
            
            <CardHeader avatar={<LinkableAvatar />} title={title} subheader={<p style={{margin:0}}>{dateString}</p>}>
            </CardHeader>

            <CardContent sx={{paddingTop:0}}>
                <Tag color="var(--tag-grey)" variant="body2" sx={{marginBottom:3}}>{isPost ? "Post" : "Poll"}</Tag>
                <Typography variant="body1">{description}</Typography>
                
            </CardContent>

            <CardActions sx={{ml:1,mb:1, gap:"10px"}}>
                <Emoji label="thumbs-up" symbol="👍" />
                <Emoji label="thumbs-up" symbol="👎" />
                <Emoji label="thumbs-up" symbol="🤩" />
            </CardActions>
        </Card>
    )

}

export default PostCard;