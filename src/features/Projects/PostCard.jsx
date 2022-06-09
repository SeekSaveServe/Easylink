import { Card, CardHeader, CardContent, CardActions, Typography, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import LinkableAvatar from '../../components/LinkableAvatar.js';
import { Badge } from "@chakra-ui/react";
import Tag from "../../components/Tag/Tag.jsx";
import Emoji from "../../components/Emoji/EmojiButton.jsx";
import { Box } from "@mui/system";
import BasicButton from "../../components/BasicButton/BasicButton.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProjectById } from "./projectsSlice.js";

// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown

// TODO: add disable options/emojis if looking at own posts -> show results instead

// To fill with project details:
    // Current idea: pass down pid, assume that projects are in projectsSlice
    // Why?: e.g 100 posts by 10 projects -> when fetching feed posts, collect unique project ids -> only need to query 10 more times
    // instead of querying for every post 
    // own posts: the project will definitely be in the slice anyway - waste to query again
function PostCard({ pid, sx, data, ...rest }) {

    const project = useSelector(state => selectProjectById(state, pid));
    const isPoll = data.isPoll ?? false;
    const title = project?.title ?? "USDevs";
    const dateString = data.dateString ?? "7th May 2022 | 9:03pm";
    const avatarUrl= project?.avatar_url ?? "";
    const body = data.body ?? "Good day to all! This is to announce our workshop happening on May 14th. Please come if you want to learn Node.js";

    const pollOptions = data?.pollOptions ?? null; // e.g ["Yes", "No"]

    // disabled/submitted state
    const [submitted, setSubmitted] = useState(false);

    const showPollOptions = () => {
        if(!pollOptions) return [];

        return (
            <RadioGroup column sx={{mb:-1}}>
             {pollOptions.map((option, idx) => <FormControlLabel disabled={submitted} control={<Radio/>} key={idx} value={option} label={option}></FormControlLabel>)}
            </RadioGroup>
        )
    }

    // for poll submit
    const handleSubmit = () => {
        setSubmitted(!submitted);
    }

    function TextBadge({ text }) {
        return (
            <Badge variant="subtle" colorScheme="blue">
                { text }
            </Badge>
        )
    }
    return (
        <Card {...rest} sx={{width:"100%", ...sx}}>
            
            <CardHeader avatar={<LinkableAvatar src={avatarUrl}/>} title={title} subheader={<p style={{margin:0}}>{dateString}</p>}>
            </CardHeader>

            <CardContent sx={{paddingTop:0, paddingBottom:0}}>
                <Tag color="var(--tag-grey)" variant="body2" sx={{marginBottom:3}}>{isPoll ? "Poll" : "Post"}</Tag>
                <Typography variant="body1">{body}</Typography>

                {isPoll ?
                    <div style={{marginLeft: 3, marginTop:3, marginBottom:0}}>
                        { showPollOptions() }
                    </div> : <></> }
                
            </CardContent>

            {/*  submit with diff. color: */}
            {/* <Button variant="outlined" sx={{color: "var(--primary)", borderColor: "var(--primary)", ml:1,mb:1}}>Submit</Button>  */}
            <CardActions>
                {!isPoll ? 
                <Box sx={{display: "flex", mt:2, ml:1, mb:1, gap:"10px"}}>
                    <Emoji label="thumbs-up" symbol="👍" />
                    <Emoji label="thumbs-up" symbol="👎" />
                    <Emoji label="thumbs-up" symbol="🤩" />
                </Box>
                : <LoadingButton variant="outlined" sx={{ ml:1,mb:1}} onClick={handleSubmit}>{submitted ? "Unsubmit" : "Submit"}</LoadingButton> }
            </CardActions>
        </Card>
    )

}

export default PostCard;