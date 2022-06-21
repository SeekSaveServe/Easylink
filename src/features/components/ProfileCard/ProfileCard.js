import { Card, CardHeader, CardContent, Typography, Box, CardActions, Stack, CardMedia, Divider, ButtonGroup, Button, CircularProgress } from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from './ProfileCard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";
import BasicButton from "../../../components/BasicButton/BasicButton.js";
import Tag from "../../../components/Tag/Tag.jsx";
import { AddLinkOutlined, RssFeedOutlined, CancelOutlined, Email, Telegram, DeleteOutlined, FamilyRestroomRounded, LeakRemoveOutlined} from "@mui/icons-material";
import { format, formatDistance } from "date-fns";
import TooltipIconButton from "../../../components/TooltipIconButton/TooltipIconButton.jsx";
import useIdObject from '../../../components/hooks/useIdObject';
import { supabase } from "../../../supabaseClient.js";
import { useState } from "react";
import { selectLinkById } from "../../Links/linksSlice.js";
import { getLinks } from "../../Links/linksSlice.js";
import { getFollowed, isFollowing, selectFollowedById } from "../../followers/followerSlice.js";

// assumption: passed in data has structure
    // isJoin == true: { ...user/project, user_skills:[Tag], user_communities:[Tag], user_interests: [Tag] }
        // 2nd assumption: projects have field pid, user has no pid
        // where Tag has structure { name: xxx } -> e.g user_skills: [ { name: 'JS'}, { name: 'Acting' } ]
        // skills, comm, interests can be retrieved in same query through join
    
    // isJoin == false: { ...user/project, user_skills:"...", user_communities:"...", user_interests: "..."}
        // where "..." is null, "", "singleton" or comma separated string

    // when inside Links page: it also has additional fields of { pending:Bool, established:Bool, rejected:Bool, s_n: int8}
        // where s_n is the link.s_n primary key
        // can check if s_n is inside to know if i am inside links page

    
function ProfileCard({ info, isJoin }) {
    const dispatch = useDispatch();

    const isProject = "pid" in info;
    // get link in slice if present
    const linkinSlice = useSelector(state => selectLinkById(state, isProject ? info.pid : info.id));
    const isLink = linkinSlice != undefined;

    const email = info.email;
    const telegram = info.telegram;

    const idObj = useIdObject();

    // for card actions
    const [loading, setLoading] = useState(false);

    // TODO: email/tele vis: "afterlink" || "everyone" -> calculate based on if viewing user has linked
    const showEmail = Boolean(info.email);
    const showTele = Boolean(info.telegram);

    const mapName = (d) => d.name; // for join query in links

    // comma sep string to array - for isJoin false
    const stringToArray = (string) => {
        string = string.trim();
        if (!Boolean(string)) return []; // covers null,undefined, ""

        return string.split(',');

    }

    const user_skills = isJoin ? info.user_skills.map(mapName) : stringToArray(info.user_skills);
    const user_interests = isJoin ? info.user_interests.map(mapName) : stringToArray(info.user_interests);
    const user_communities = isJoin ? info.user_communities.map(mapName) : stringToArray(info.user_communities);

    const calculateHide = () => {
        // whether current profile is project 
        const currIsProject = "pid" in idObj;

        return (isProject && currIsProject && idObj.pid == info.pid) || (!isProject && !currIsProject && idObj.uid == info.id)
            || (linkinSlice?.rejected && linkinSlice?.outgoing); // hide all buttons if rejected,outgoing

    }

    const [hideButtons, setHideButtons] = useState(calculateHide());

    let [showLink, setShowLink] = useState(true);
    let [showFollow, setShowFollow] = useState(true);
    let [showReject, setShowReject] = useState(true);
    // pending, outgoing links: change not for me to a delete button
    const showDelete = isLink && linkinSlice.pending && !linkinSlice.incoming

    // rejected, outgoing (I sent, and got rejected) -> don't show link and reject btns
    showLink = showLink && !isLink || (!(linkinSlice?.rejected && !linkinSlice?.incoming) && !linkinSlice?.established);
    showReject = showReject && (!isLink) || linkinSlice?.pending; // only show reject for pending

    const isFollow = useSelector(state => isFollowing(state, info?.pid));
    // showFollow = showFollow && !isFollow // hide if following this profile

    // check if curr user is following this profile
    

    // Utility functions

    const wordsToTags = (tagStrings, bgColor, fontColor) => {

        return (
            <div style={{display: "inline-flex", gap:"3px"}}>
            { tagStrings.map((str, idx) => {
                return <Tag key={idx} color={bgColor} fontColor={fontColor}>{str}</Tag>
            }) }
            </div>
        )
    }

    const skills = () => {
        const prefix = isProject ? "Looking for people who know " :  "My skills are "
        return (
            <>
                {prefix} { wordsToTags(user_skills, "var(--primary)", "white") }
            </>
        )
    }

    const interests = () => {
        const prefix = isProject ? "Our interests are " : "I am interested in "
        return (
            <>
                {prefix} { wordsToTags(user_interests, "var(--secondary)", "white") }
            </>
        )
    }

    const communities = () => {
        return user_communities.join(", ")
    }

    const emailDisplay = () => {
        return showEmail ? ( 
            <Typography 
            variant="body1" 
            sx={{display:"inline-flex", flexDirection: "row", alignItems: "center", mr:1}}>
                <Email sx={{mr:0.7}}/> {email}
            </Typography> 
        ) : <></>;
    }

    const teleDisplay = () => {
        return showTele ? (
            <Typography 
                variant="body1" 
                sx={{display:"inline-flex", flexDirection: "row", alignItems: "center", mr:0}}
            >
                <Telegram sx={{mr:0.5}}/> {telegram}
            </Typography>
        ) : <></>;
    }

    const Bio = () => {
        if (!info.bio) return "";
        return <>
            {info.bio} <br></br>
        </>
    }

    // calculate dateRange string given start/end date “MMM d Y to MMM d Y”,  call only if isProject
    const dateRange = () => {
        const dateString = (date) => format(new Date(date), "MMM d Y");
        
        if (!info.start_date && !info.end_date) return "";

        // show only one of the dates if the other is null
        if (!info.start_date) {
            return "End: " + dateString(info.end_date);
        } else if (!info.end_date) {
            return "Start: " + dateString(info.start_date);
        }

        return `${dateString(info.start_date)} to ${dateString(info.end_date)}`
    }

    // for the e.g '4 days ago' subheader based on created_at
    const timeAgo = () => {
        if (!info.created_at) return "";
        return formatDistance(new Date(info.created_at), new Date()) + " ago";
    }  
    
    // Button functions// to insert right fields based on sender / receiver

    // to insert right fields based on sender / receiver
    const matchObj = {
        ["uid" in idObj ? "uid_sender" : "pid_sender"] : "uid" in idObj ? idObj.uid : idObj.pid,
        [isProject ? "pid_receiver" : "uid_receiver"] : isProject ? info.pid : info.id,
        ["uid" in idObj ? "pid_sender" : "uid_sender"] : null,
        [isProject ? "uid_receiver" : "pid_receiver"] : null
    }

    const outgoingObj = matchObj; // sender = me, receiver = other party

    // incoming: set uid_sender/pid_sender to null 
    const incomingObj = {
        [isProject ? "pid_sender" : "uid_sender"] : isProject ? info.pid : info.id,
        ["uid" in idObj ? "uid_receiver" : "pid_receiver"] :  "uid" in idObj ? idObj.uid : idObj.pid,
        [isProject ? "uid_sender" : "pid_sender"] : null,
        ["uid" in idObj ? "pid_receiver" : "uid_receiver"] : null


    } // sender = other, receiver = me



    const addLink = async() => {
        try {
            setLoading(true);
            // cases: exists inside links (e.g rejected) vs doesn't exist inside links


            // do insert
            if (!isLink) {
                const { data, error } = await supabase
                    .from('links')
                    .insert([
                        {
                        ...matchObj,
                        accepted: false,
                        rejected: false
                        }
                    ])
                
                if (error) throw error;
                // console.log("Link succ", data);

            } else {
                // if rejected, incoming -> change to pending, outgoing
                    // because rejected, incoming could be either: they sent a req, I rejected OR I rejected without any pending
                    // so easier to default to pending, outgoing
                if (linkinSlice.rejected && linkinSlice.incoming) {
                    const { data: updateData, error:updateErr } = await supabase
                    .from('links')
                    .update({ accepted: false, rejected: false, ...outgoingObj })
                    .match({ s_n: linkinSlice.s_n })

                    if (updateErr) throw updateErr;
                    console.log("Link update succ (rejected, incoming", updateData);
;
                } else {
                    // is definitely pending, incoming: hide link for pendig, outgoing + established + rejected, outgoing
                    const { data: updateData, error:updateErr } = await supabase
                        .from('links')
                        .update({ accepted: true, rejected: false })
                        .match({ s_n: linkinSlice.s_n })
                    
                    if (updateErr) throw updateErr;
                    console.log("Link update succ", updateData);

                }
                

            }

            dispatch(getLinks(idObj));
        } catch (error) {
            console.log("Link err", error);
        } finally {
            setLoading(false);
        }
    }

    // for reject/delete
        // not in links:
        // - insert row with accepted=false, rej = true, dispatch getLinks 
        // inside links:
        // - pending, incoming: update row to acc=false, rej=true, dispatch getLinks 
        // - pending, outgoing: delete the row from links table completely (cancel the link req)

    const rejectLink = async() => {
        try {
            setLoading(true);
            // I reject off the bat: rejected, incoming
            if (!isLink) {
                const { data:insData, error: insError} = await supabase 
                    .from('links')
                    .insert([
                        {  
                            ...incomingObj,
                            accepted: false,
                            rejected:true
                        }
                    ])
                
                if (insError) throw insError;
                console.log("Reject succ (ins):", insData);

                // setShowLink(false);
                // setShowReject(false);
            } else {
                // // only show for rejected incoming: change to pendig, outgoing
                // if (linkinSlice.rejected) {
                //     const { data: updateData, error:updateErr } = await supabase
                //     .from('links')
                //     .update({ accepted: false, rejected: false })
                //     .match({ s_n: linkinSlice.s_n, ...outgoingObj })

                //     if (updateErr) throw updateErr;
                //     console.log("Update rej succ", updateData);
                // }

                // definitely pending: pending, incoming -> rejected, incoming
                if (linkinSlice.incoming) {
                    const { data: updateData, error:updateErr } = await supabase
                    .from('links')
                    .update({ accepted: false, rejected: true })
                    .match({ s_n: linkinSlice.s_n })

                    if (updateErr) throw updateErr;
                    console.log("Update rej succ", updateData);

                 } else {
                    // delete the link (pending, outgoing)
                    const { data:delData, error: delErr } = await supabase 
                        .from('links')
                        .delete()
                        .match({ s_n: linkinSlice.s_n })
                    
                    if (delErr) throw delErr;
                    console.log("Del after rej succ", delData);
                 }
            }

            dispatch(getLinks(idObj));
        } catch (error) {
            console.log("Reject err:", error);
        } finally {
            setLoading(false);
        }
    }

    // assumption: only projects can be followed. change this fn if user follow is added
    const followedObj = useSelector(state => selectFollowedById(state, info?.pid))
    const follow = async() => {
        try {
            if (isFollow) {
                const { data, error } = await supabase
                    .from('followers')
                    .delete()
                    .match({
                        s_n: followedObj.s_n
                    })
                
                if (error) throw error;
            } else {
                setLoading(true);
                const { data, error } = await supabase
                    .from('followers')
                    .insert([
                        {
                            ["uid" in idObj ? "follower_uid" : "follower_pid"]: "uid" in idObj ? idObj.uid : idObj.pid,
                            followed_pid: info.pid

                        }
                    ])
                
                if (error) throw error;
            }

            dispatch(getFollowed(idObj));
        
        } catch (error) {
            console.log("Follow err", error);
        } finally {
            setLoading(false);
        }
    }

    // Incoming/Outgoing/You rejected/ They rejected
    function StatusTag() {
        if (!isLink) return <></>
        if (linkinSlice.established) {
            return <Tag color="var(--primary)" 
            fontColor={"white"} sx={{fontSize: "0.7rem", alignSelf: "flex-start", mt:3}}>Established</Tag>
        }

        if (linkinSlice.pending) {
            return <Tag color={linkinSlice.incoming ? "var(--secondary)" : "var(--primary)"} fontColor={"white"} sx={{fontSize: "0.7rem", alignSelf: "flex-start", mt:3}}>{linkinSlice.incoming ? "Incoming" : "Outgoing"}</Tag>
        }

        if (linkinSlice.rejected) {
            return <Tag color={"error.main"} fontColor={"white"} sx={{fontSize: "0.7rem", alignSelf: "flex-start", mt:3}}>{linkinSlice.incoming ? "You rejected" : "They rejected"}</Tag>
        }

        return <></>
    }

    return (
        <Card className={styles.card}>
            <Box className={styles.card_content}>
                <Stack direction="row" alignContent="center">
                    {/* TODO: replace subheader with calc based on created_at  */}
                    <CardHeader 
                        title={info.username} 
                        subheader={timeAgo()} 
                        avatar={<LinkableAvatar src={info.avatar_url} imgProps={{style: {objectFit: "stretch"}}}/>  } 
                        sx={{ml:0}} 
                    />

                    <StatusTag/>

                    
                </Stack>

                    <CardContent sx={{mt:0, width:"100%"}}>
                       {info.title ? <Typography variant="h5" sx={{fontSize: "1.4rem"}} gutterBottom> {info.title}</Typography> : <></> }
                        <Typography variant="body1" color="text.secondary" sx={{fontSize:"1rem", width:"100%"}}> 
                        <Bio/>
                        { interests() } {" "} { skills() }  </Typography>

                        { info.user_communities.length > 0 ? <Typography variant="body1" color="text.secondary" sx={{mt:2}}>Communities: {communities()} </Typography> : <></> }


                        <CardActions>
                            {/* hide buttons if card is self, or if link is established */}

                            <Stack direction="row" spacing={2} 
                                sx={{ ml:-1, mt: 1, width: "100%", alignItems: "center", }}>
                                <Typography 
                                    variant="subtitle1" 
                                    className={styles.tag} 
                                    sx={{backgroundColor: "var(--tag-grey)", }}>{isProject ? "Project" : "User"}</Typography>

                                    { isProject ? <Typography variant="body" sx={{alignSelf: "center"}}> {dateRange()} </Typography> : <></>}

                                {/* Icon Buttons */}

                                {!loading ? <div style={{display: "inline-flex", gap:"0.4rem", display: (hideButtons) ? 'none' : ''}}>
                                    { showLink && !showDelete? <TooltipIconButton icon={<AddLinkOutlined color="primary" sx={{fontSize:30}}/>} title="Link" onClick={addLink} /> : <></> }
                                    { isProject && showFollow ? <TooltipIconButton icon={isFollow ? <LeakRemoveOutlined sx={{ color: "var(--secondary)", fontSize:30 }}/> 
                                        : <RssFeedOutlined sx={{ color: "var(--secondary)", fontSize:30 }} />} title={isFollow ? "Unfollow" : "Follow"} onClick={follow}/> : <></> }
                                    { showReject ? <TooltipIconButton 
                                        icon={showDelete ? <DeleteOutlined sx={{fontSize:30, color: "error.main"}}/> : <CancelOutlined sx={{fontSize:30, color: "error.main"}}/>} 
                                        title={showDelete ? "Delete" : "Not for me"} onClick={rejectLink}/> : <></> }
                                </div>
                             : <CircularProgress size={30} /> }

                             </Stack>
                            
                            {/* rejected, incoming (someone else sent, you rejected) -> show rejected text */}
                            {/* { (linkinSlice?.rejected && linkinSlice?.incoming) ?  <Tag color="error.main" fontColor="white" sx={{mr:4, mb:0.5}}>Rejected</Tag> : <></> } */}
                            {/* Email, Tele */}
                            <div style={{marginLeft: "-8px"}}>
                                { emailDisplay() }
                                { teleDisplay() }
                            </div>

                        </CardActions>
                    </CardContent>
            </Box>

            <Divider orientation="vertical" flexItem/>
            {/* <LinkableAvatar sx={{ width: "10%", height: "auto" }} variant="square" src={info.avatar_url} imgProps={{style: {objectFit: "contain"}}}/>        */}
        </Card>
    )
}

export default ProfileCard;