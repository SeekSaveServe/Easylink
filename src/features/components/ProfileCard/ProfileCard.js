import { Card, CardHeader, CardContent, Typography, Box, CardActions, Stack, CardMedia, Divider, ButtonGroup, Button } from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from './ProfileCard.module.css';
import { useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";
import BasicButton from "../../../components/BasicButton/BasicButton.js";
import Tag from "../../../components/Tag/Tag.jsx";
import { AddLinkOutlined, RssFeedOutlined, CancelOutlined, Email, Telegram} from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
// info needed: username, title, bio, isProject, tags
const defaultInfo = {
    username: "Cat Lover",
    title: "Cat lover, professional photographer, expert coder",
    bio: "Hi! I love to document the cats of NUS and code!",
    // skills, interests, communities
    tags: [["Python", "Meowing", "Photography"], ["Nature", "Software Development", "Photography"], ["USP"]],
    dateRange: "Now to Dec 2022",
    email: "defaultemail@gmail.com",
    telegram: "@telegram_user"

}

function CardButton({ children, sx ,...rest}) {
    return (
        <BasicButton sx={{...sx, fontSize: "0.1rem", padding: "0.2rem 0.8rem", display: "inline", width: "auto"}} {...rest}>{children}</BasicButton>
    )
}

function TooltipIconButton({ title, icon, ...rest}) {
    const TitleComponent = () => {
        return <Typography variant="body2">{title}</Typography>
    }
    return (
        <Tooltip title={<TitleComponent/>} sx={{fontSize:"10rem"}}>
            <IconButton {...rest}>
                { icon }
            </IconButton>
        </Tooltip>
    )
}

const colors = ["#FFE977", "#77FFCE", "#77EFFF"];

function ProfileCard(props) {
    const user = useSelector(getUser);
    let { isProject, info } = props;

    isProject = isProject ?? false;
    info = info ?? defaultInfo;

    const email = info.email ?? defaultInfo.email;
    const telegram = info.telegram ?? defaultInfo.telegram;

    const showEmail = info.showEmail ?? false;
    const showTele = info.showTele ?? false;

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
                {prefix} { wordsToTags(info.tags[0], "var(--primary)", "white") }
            </>
        )
    }

    const interests = () => {
        const prefix = isProject ? "Our interests are " : "I am interested in "
        return (
            <>
                {prefix} { wordsToTags(info.tags[1], "var(--secondary)", "white") }
            </>
        )
    }

    const communities = () => {
        return info.tags[2].join(", ")
    }

    const emailDisplay = () => {
        return showEmail ? ( 
            <Typography 
            variant="body1" 
            sx={{display:"inline-flex", flexDirection: "row", alignItems: "center", mr:1}}>
                <Email sx={{mr:0.5}}/> {email}
            </Typography> 
        ) : <></>;
    }

    const teleDisplay = () => {
        return showTele ? (
            <Typography 
                variant="body1" 
                sx={{display:"inline-flex", flexDirection: "row", alignItems: "center", mr:2}}
            >
                <Telegram/> {telegram}
            </Typography>
        ) : <></>;
    }


    return (
        <Card className={styles.card}>
            <Box className={styles.card_content}>
                <Stack direction="row" alignContent="center">
                    {/* TODO: replace subheader with calc based on created_at  */}
                    <CardHeader title="USDevs" subheader="4 days ago" avatar={<div></div>} sx={{mt:0}} />
                    
                </Stack>

                    <CardContent sx={{mt:0}}>
                        <Typography variant="h5" sx={{fontSize: "1.4rem"}} gutterBottom> {info.title}</Typography>

                        <Typography variant="body1" color="text.secondary" sx={{fontSize:"1rem", width:"100%"}}> {info.bio} {" "}
                        { interests() } {" "} { skills() } </Typography>

                        { info.tags[2] ? <Typography variant="body1" color="text.secondary" sx={{mt:2}}>Communities: {communities()} </Typography> : <></> }


                        <CardActions>
                            <Stack direction="row" spacing={2} sx={{ ml:-1, mt: 1, width: "100%", alignItems: "center"}}>
                                <Typography 
                                    variant="subtitle1" 
                                    className={styles.tag} 
                                    sx={{backgroundColor: "var(--tag-grey)" }}>{isProject ? "Project" : "User"}</Typography>

                                    { isProject ? <Typography variant="body" sx={{alignSelf: "center"}}> {info.dateRange} </Typography> : <></>}

                                {/* Icon Buttons */}

                                <div style={{display: "inline-flex", gap:"0.4rem"}}>
                                    <TooltipIconButton icon={<AddLinkOutlined color="primary" sx={{fontSize:30}}/>} title="Link" />
                                    { isProject ? <TooltipIconButton icon={<RssFeedOutlined sx={{ color: "var(--secondary)", fontSize:30 }} />} title={"Follow"} /> : <></> }
                                    <TooltipIconButton icon={<CancelOutlined sx={{fontSize:30, color: "error.main"}}/>} title="Not for me" />
                                </div>
                            </Stack>

                            {/* Email, Tele */}
                            { emailDisplay() }
                            { teleDisplay() }

                        </CardActions>
                    </CardContent>
            </Box>

            <Divider orientation="vertical" flexItem/>
            <LinkableAvatar sx={{ width: "10%", height: "auto" }} variant="square" src={user?.avatar_url} imgProps={{style: {objectFit: "contain"}}}/>       
        </Card>
    )
}

export default ProfileCard;