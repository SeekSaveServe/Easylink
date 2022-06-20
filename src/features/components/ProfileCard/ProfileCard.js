import { Card, CardHeader, CardContent, Typography, Box, CardActions, Stack, CardMedia, Divider, ButtonGroup, Button } from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from './ProfileCard.module.css';
import { useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";
import BasicButton from "../../../components/BasicButton/BasicButton.js";
import Tag from "../../../components/Tag/Tag.jsx";
import { AddLinkOutlined, RssFeedOutlined, CancelOutlined, Email, Telegram} from "@mui/icons-material";
import { format, formatDistance } from "date-fns";
import TooltipIconButton from "../../../components/TooltipIconButton/TooltipIconButton.jsx";
import useIdObject from '../../../components/hooks/useIdObject';
import { supabase } from "../../../supabaseClient.js";
import { useState } from "react";
import { selectLinkById } from "../../Links/linksSlice.js";
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
    // let { isProject, info } = props;

    const isProject = "pid" in info;
    // get link in slice if present
    const linkinSlice = useSelector(state => selectLinkById(state, isProject ? info.pid : info.id));
    const isLink = linkinSlice != undefined;
    
    const email = info.email;
    const telegram = info.telegram;

    const idObj = useIdObject();


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

    }

    const [hideButtons, setHideButtons] = useState(calculateHide());



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

    // Button functions

    // what happens if u1 -> u2, then u1 hasn't accepted and u2 -> u1 : must check for this case somewhere
    const addLink = async() => {
        try {
            // cases: exists inside links (e.g rejected) vs doesn't exist inside links
            const insideLinks = false;  // todo: replace with links slice check

            // to insert right fields based on sender / receiver
            const matchObj = {
                ["uid" in idObj ? "uid_sender" : "pid_sender"] : "uid" in idObj ? idObj.uid : idObj.pid,
                [isProject ? "pid_receiver" : "uid_receiver"] : isProject ? info.pid : info.id
            }

            // console.log(matchObj);

            // do insert
            if (!insideLinks) {
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
            }
        } catch (error) {
            console.log("Link err", error);
        }
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

                    { isLink ? 
                        <Tag color={"var(--primary)"} fontColor={"white"} sx={{fontSize: "0.7rem", alignSelf: "flex-start", mt:3}}>{linkinSlice.incoming ? "Incoming" : "Outgoing"}</Tag>
                        : <></> }

                    
                </Stack>

                    <CardContent sx={{mt:0, width:"100%"}}>
                       {info.title ? <Typography variant="h5" sx={{fontSize: "1.4rem"}} gutterBottom> {info.title}</Typography> : <></> }
                        <Typography variant="body1" color="text.secondary" sx={{fontSize:"1rem", width:"100%"}}> 
                        <Bio/>
                        { interests() } {" "} { skills() }  </Typography>

                        { info.user_communities.length > 0 ? <Typography variant="body1" color="text.secondary" sx={{mt:2}}>Communities: {communities()} </Typography> : <></> }


                        <CardActions>
                            <Stack direction="row" spacing={2} sx={{ ml:-1, mt: 1, width: "100%", alignItems: "center", display: hideButtons ? 'none' : ''}}>
                                <Typography 
                                    variant="subtitle1" 
                                    className={styles.tag} 
                                    sx={{backgroundColor: "var(--tag-grey)", }}>{isProject ? "Project" : "User"}</Typography>

                                    { isProject ? <Typography variant="body" sx={{alignSelf: "center"}}> {dateRange()} </Typography> : <></>}

                                {/* Icon Buttons */}

                                <div style={{display: "inline-flex", gap:"0.4rem"}}>
                                    <TooltipIconButton icon={<AddLinkOutlined color="primary" sx={{fontSize:30}}/>} title="Link" onClick={addLink} />
                                    { isProject ? <TooltipIconButton icon={<RssFeedOutlined sx={{ color: "var(--secondary)", fontSize:30 }} />} title={"Follow"} /> : <></> }
                                    <TooltipIconButton icon={<CancelOutlined sx={{fontSize:30, color: "error.main"}}/>} title="Not for me" />
                                </div>
                            </Stack>

                            {/* Email, Tele */}
                            <div>
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