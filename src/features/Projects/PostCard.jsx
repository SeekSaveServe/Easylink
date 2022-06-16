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
import useIdObject from '../../components/hooks/useIdObject';

// To display one Poll radio button with 
// submitted:Boolean, option : { options_id:uuid , post_id:uuid, option:String }, idx:Int from array.map
function PollRadio({ submitted, optionDatum, idx }) {
    const { options_id, post_id, option } = optionDatum;
    const [count, setCount] = useState(0);

    // TODO: change fetchcount to be fetched along with poll options through join
    async function fetchCount() {
        // if submitted = false, we are showing options without count
        if (!submitted) return;
        
        // console.log("Options id", options_id);
        const { error, count } = await supabase
            .from('poll_results')
            .select('*', { count: 'exact', head: true })
            .match({ options_id: options_id})
        
        if (error) throw error;
        setCount(count);
        // console.log("Count data", count);
    }

    useEffect(() => {
        fetchCount();
    }, [submitted]);

    const LabelText = () => {
        // if submitted, show count too, else just show option label as is
        return (
            <span>{option}{ submitted ? ` : ${count}` : ""}</span>
        )
    }

    return (
        <div>
            <FormControlLabel disabled={submitted} control={<Radio/>} value={options_id} label={<LabelText/>}></FormControlLabel>
        </div>
    )
}

// Common: Avatar, Title of project, created_at datetime, description
// Post: show react emoji dropdown, Poll: show poll options
// Looking at own posts: disable poll options, don't show react dropdown

// TODO: add disable options/emojis if looking at own posts -> show results instead
    // compare projects.pid with pid in userSlice (if isProject is true)

// Structure of data prop: { ...post, projects: { ...dontcare, pid, username, avatar_url } } -> ensure data looks like this or there will be issues
    // projects : contains data for project that made the post/poll
    // post : structure follows DB schema
function PostCard({ sx, data, ...rest }) {  
    const idObj = useIdObject();

    // if data has the projects field (due to join in feed) use that instead
    const project = data.projects;
    const user = useSelector(state => state.user); // can be undefined
    const projectPid = project.pid; // should have a int value


    const isPoll = data.isPoll;
    const title = project.username;
    
    const dateString = format(new Date(data.created_at), "do MMM y | h:mmaaa"); // https://date-fns.org/v2.28.0/docs/format
    const avatarUrl= project?.avatar_url ?? ""; // sometimes avatar_url is null
    const body = data.body;

    // Poll state
    const [pollOptions, setPollOptions] = useState([]);
    const [selectedOptionId, setSelectedOptionId] = useState("");
    // disable poll submit / emoji click only if user.pid exists and user.pid == project.pid
    const disabled = user?.pid == projectPid;
    const [submitted, setSubmitted] = useState(disabled);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Initial reactions state
    const [reaction1, setReaction1] = useState(false);
    const [reaction2, setReaction2] = useState(false);
    const [reaction3, setReaction3] = useState(false);

    // check if they have reacted and set the initial reaction state
    // async function fetchReactionStatus() {
    //     if (isPoll || disabled) return; // don't fetch if poll or project owner

    //     // index by pid/uid of current user + posot_id
    //     const { data: reactionsData, error } = await supabase
    //         .from('post_reactions')
    //         .select('*')
    //         .match({
    //             ...idObj,
    //             post_id: data.s_n
    //         })
    //         .maybeSingle();
        
    //     if (error) console.log(error.error_description || error.message);
    //     if (!reactionsData) return; // haven't reacted -> maybeSingle returs nnull

    //     console.log('reactions', reactionsData);

    //     setReaction1(reactionsData.reaction1);
    //     setReaction2(reactionsData.reaction2);
    //     setReaction3(reactionsData.reaction3);
    // }

    async function getPollOptions() {
        if (!isPoll) return;
        const { data: pollData, error } = await supabase
            .from('poll_options')
            .select('*')
            .match({ post_id: data.s_n })
        
        if (error) {
            return;
        } 
        
        // console.log("Poll data", pollData);
        setPollOptions(pollData);

        if (disabled) return; // if own project, no need check for currently sel option etc.

        // run query to get currently selected option if it is there
            // query poll results with all option ids and user's pid/uid -> to see if user has responded to this poll
        const optionIds = pollData.map((datum) => datum.options_id);

        const { data: resData, error: resError } = await supabase
            .from('poll_results')
            .select('options_id')
            .order('created_at', { ascending: false })
            .match(idObj)
            .in('options_id', optionIds)
        
        if (resError) throw resError;

        // if no resData => no currently sel option (haven't responded)
        // have: the options_id of the first element is the currently sel option -> we already have the array (query again vs small filter in mem)
            // set sel option id, set submitted to true
        
        if (resData.length == 0) return;
        setSelectedOptionId(resData[0].options_id);
        setSubmitted(true);
    }

    useEffect(() => {
        //fetchReactionStatus();
        getPollOptions();
    },[])

    
    const showPollOptions = () => {
        if(!pollOptions) return [];

        return (
            <RadioGroup column sx={{mb:-1}} value={selectedOptionId} onChange={(evt) => setSelectedOptionId(evt.target.value)}>
             {pollOptions.map((option, idx) => <PollRadio key={idx} submitted={submitted} optionDatum={option} idx={idx}/>)}
            </RadioGroup>
        )
    }

    // for poll submit
    const handleSubmit = async() => {
        if (!selectedOptionId) return; // nothing selected just don't do anything. I think there's no need for an alert here

        setSubmitLoading(true);


        // not submitted: create row in poll_results with selected option id, pid or uid
        if (!submitted) {
            const { data, error } = await supabase
                .from('poll_results')
                .insert([
                    { 
                        options_id: selectedOptionId,
                        pid: user?.isProject ? user.pid : null, // isProject: set the pid, else null
                        uid: user?.isProject ? null : supabase.auth.user().id // isProject: no uid, else put user id
                    }
                ]);
            
            if (error) throw error;
                
        } 

        // submitted: process unsubmit -> delete currently sel option, where pid/uid is equal to curr user's pid/uid
        else {
            const { data, error } = await supabase
                .from('poll_results')
                .delete()
                .match({
                    options_id: selectedOptionId,
                    ...idObj
                })
            if (error) throw error;
            console.log("Deleted", data);
        }

        setSubmitted(!submitted);
        setSubmitLoading(false);
    }


    async function rpcTest() {
        console.log("rpctest");
        const { data: rpcData, error } = await supabase
            .rpc('dec_reaction', { col_name: 'reaction1', post_id: data.s_n});
        if (error) {
            console.log("rpc err");
            console.log(error);
        }

        console.log("rpc succ", rpcData);
    }

    return (
        <Card {...rest} sx={{width:"100%", ...sx}}>
            <CardHeader avatar={<LinkableAvatar src={avatarUrl}/>} title={title} subheader={<p style={{margin:0}}>{dateString}</p>}>
            </CardHeader>

            {/* <LoadingButton onClick={rpcTest}>rpc</LoadingButton> */}

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
                    <Emoji postId={data.s_n} label="thumbs-up" symbol="👍" disabled={disabled} name="reaction1" startNumber={data.reaction1} startSelected={reaction1}/>
                    <Emoji postId={data.s_n} label="thumbs-up" symbol="👎" disabled={disabled} name="reaction2" startNumber={data.reaction2} startSelected={reaction2}/>
                    <Emoji postId={data.s_n} label="thumbs-up" symbol="🤩" disabled={disabled} name="reaction3" startNumber={data.reaction3} startSelected={reaction3}/>
                </Box>
                : disabled ? <></> : <LoadingButton loading={submitLoading} variant="outlined" sx={{ ml:1,mb:1}} onClick={handleSubmit}>{submitted ? "Unsubmit" : "Submit"}</LoadingButton> 
                }
            </CardActions>
        </Card>
    )

}

export default PostCard;