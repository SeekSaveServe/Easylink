import { Card, CardHeader, CardContent, Typography, Box, CardActions, Stack, CardMedia, Divider, ButtonGroup, Button } from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from './ProfileCard.module.css';
import { useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";
import BasicButton from "../../../components/BasicButton/BasicButton.js";

// info needed: username, title, bio, isProject, tags
const defaultInfo = {
    username: "Cat Lover",
    title: "Cat lover, professional photographer, expert coder",
    bio: "Hi! I love to document the cats of NUS and code!",
    // skills, interests, communities
    tags: [["Python", "Meowing", "Photography"], ["Nature", "Software Development", "Photography"], ["USP"]],
    dateRange: "Now to Dec 2022"

}

function CardButton({ children, sx ,...rest}) {
    return (
        <BasicButton sx={{...sx, fontSize: "0.1rem", padding: "0.2rem 0.8rem", display: "inline", width: "auto"}} {...rest}>{children}</BasicButton>
    )
}
function ProfileCard(props) {
    const user = useSelector(getUser);
    let { isProject, info } = props;
    isProject = isProject ?? false;
    info = info ?? defaultInfo;

    return (
        <Card className={styles.card}>
            <Box className={styles.card_content}>
                <Stack direction="row" alignContent="center">
                    <CardHeader title="USDevs" subheader="4 days ago" avatar={<div></div>} sx={{mt:0}} />
                    
                </Stack>

                    <CardContent sx={{mt:0}}>
                        <Typography variant="h5" sx={{fontSize: "1.4rem"}} gutterBottom> {info.title}</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{fontSize:"1rem"}}> {info.bio} {" "}
                        I am interested in {info.tags[1].join(", ")}. My skills are {info.tags[0].join(", ")}.</Typography>


                        <CardActions>
                            <Stack direction="row" spacing={2} sx={{ mt: 1, width: "100%"}}>
                                <Typography variant="subtitle1" className={styles.tag} sx={{backgroundColor: "var(--tag-grey)", display: "inline-block"}}>{isProject ? "Project" : "User"}</Typography>
                                { isProject ? <Typography variant="body" sx={{alignSelf: "center"}}> {info.dateRange} </Typography> : <></>}
                                { isProject ? <CardButton bg="secondary">Follow</CardButton> : <></> }

                                <CardButton bg="primary">Link</CardButton>
                                <CardButton bg="red" sx={{}}>Not for me</CardButton>
{/* 
                                <Stack direction="row" sx={{justifySelf: "end"}}>
                                    
                                </Stack> */}
                            </Stack>
                        </CardActions>
                    </CardContent>
            </Box>

            <Divider orientation="vertical" flexItem/>
            <LinkableAvatar sx={{ width: "17%", height: "auto" }} variant="square" src={user?.avatar_url} imgProps={{style: {objectFit: "contain"}}}/>

            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/340px-Cat_November_2010-1a.jpg"
                 width="100px"
                 className={styles.img}
                 style={{objectFit: "contain"}}

            /> */}
                    
        </Card>

        
    )
}

export default ProfileCard;