import { Card, CardHeader, CardContent, CardActions, Typography, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import LinkableAvatar from '../../components/LinkableAvatar.js';
import { Badge } from "@chakra-ui/react";
import Tag from "../../components/Tag/Tag.jsx";
import Emoji from "../../components/Emoji/EmojiButton.jsx";
import { Box } from "@mui/system";
import BasicButton from "../../components/BasicButton/BasicButton.js";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProjectById } from "./projectsSlice.js";
import { supabase } from '../../supabaseClient';
import format from "date-fns/format";
// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown

// TODO: add disable options/emojis if looking at own posts -> show results instead

// Structure of data prop: { ...post, projects: { username, avatar_url } } -> ensure data looks like this or there will be issues
    // post : structure follows DB schema
function PostCard({ sx, data, ...rest }) {    
    // if data has the projects field (due to join in feed) use that instead
    const project = data.projects;

    const isPoll = data.isPoll;
    const title = project.username;
    // https://date-fns.org/v2.28.0/docs/format
    const dateString = format(new Date(data.created_at), "do MMM y | h:mmaaa");
    const avatarUrl= project?.avatar_url ?? ""; // sometimes avatar_url is null
    const body = data.body;

    const [pollOptions, setPollOptions] = useState([]);

    async function getPollOptions() {
        if (!isPoll) return;
        const { data: pollData, error } = await supabase
            .from('poll_options')
            .select('*')
            .match({ post_id: data.s_n })
        
        if (error) {
            return;
        } 

        setPollOptions(pollData.map(datum => datum.option));
        
    }

    useEffect(() => {
        getPollOptions();
    },[])

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