import { Card, CardHeader, CardContent, CardActions, Typography, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import LinkableAvatar from '../../components/LinkableAvatar.js';
import Tag from "../../components/Tag/Tag.jsx";
import Emoji from "../../components/Emoji/EmojiButton.jsx";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { supabase } from '../../supabaseClient';
import format from "date-fns/format";
import { useSelector } from "react-redux";
// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown

// TODO: add disable options/emojis if looking at own posts -> show results instead
    // compare projects.pid with pid in userSlice (if isProject is true)

// Structure of data prop: { ...post, projects: { ...dontcare, pid, username, avatar_url } } -> ensure data looks like this or there will be issues
    // projects : contains data for project that made the post/poll
    // post : structure follows DB schema
function PostCard({ sx, data, ...rest }) {    
    // if data has the projects field (due to join in feed) use that instead
    const project = data.projects;
    const userPid = useSelector(state => state.user?.pid); // can be undefined
    const projectPid = project.pid; // should have a int value


    const isPoll = data.isPoll;
    const title = project.username;
    
    const dateString = format(new Date(data.created_at), "do MMM y | h:mmaaa"); // https://date-fns.org/v2.28.0/docs/format
    const avatarUrl= project?.avatar_url ?? ""; // sometimes avatar_url is null
    const body = data.body;
    const [pollOptions, setPollOptions] = useState([]);

    // disabled only if user.pid exists and user.pid == project.pid
    const disabled = userPid == projectPid;
    const [submitted, setSubmitted] = useState(disabled);

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

            {/* project: show reactions. else, show poll. but if disabled, don't show submit button */ }
            <CardActions>
                {!isPoll ? 
                <Box sx={{display: "flex", mt:2, ml:1, mb:1, gap:"10px"}}>
                    <Emoji label="thumbs-up" symbol="👍" />
                    <Emoji label="thumbs-up" symbol="👎" />
                    <Emoji label="thumbs-up" symbol="🤩" />
                </Box>
                : disabled ? <></> : <LoadingButton variant="outlined" sx={{ ml:1,mb:1}} onClick={handleSubmit}>{submitted ? "Unsubmit" : "Submit"}</LoadingButton> 
                }
            </CardActions>
        </Card>
    )

}

export default PostCard;