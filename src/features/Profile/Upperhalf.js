import { Center } from "@chakra-ui/react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import ClickableSetting from "../components/ClickableSetting";
import DisplayAvatar from "../components/DisplayAvatar/DisplayAvatar";
import { Stack, Typography } from "@mui/material";
import styles from './Upperhalf.module.css';
import Tag from "../../components/Tag/Tag";
import useProfileActions from "../../components/hooks/useProfileActions";
import { useState } from "react";
import TooltipIconButton from "../../components/TooltipIconButton";
import { Settings } from "@mui/icons-material";
import StatusTag from "../../components/StatusTag";
import { selectLinkById } from "../Links/linksSlice";

// everything until before tabs
export default function Upperhalf({ user, isPublic }) {
  const title = user.username;
  const subtitle = user.title;
  const isProject = "pid" in user;
  const [loading, setLoading] = useState(false);

  const { LinkButton, FollowButton, RejectButton } = useProfileActions(user, setLoading);
  const DefaultMsg = () => <Typography variant="subtitle1" color="gray" component="span">Nothing to show</Typography>;

  const linkinSlice = useSelector((state) =>
        selectLinkById(state, isProject ? user.pid : user.id)
    );
  
    console.log("user in proifile", user);
  console.log("link in slice in proifile", linkinSlice);

  const skills = () => {
    return user.user_skills.length == 0 ? <DefaultMsg/> :
      user.user_skills.map((val, idx) => {
      return <Tag color="var(--primary)" fontColor="white" key={idx}>{val}</Tag>
    })
  }

  const interests = () => {
    return user.user_interests.length == 0 ? <DefaultMsg/> : user.user_interests.map((val, idx) => {
      return <Tag color="var(--secondary)" fontColor="white" key={idx}>{val}</Tag>
    })
  }

  const communities = () => {
    return user.user_communities.length == 0 ? <DefaultMsg /> : user.user_communities.join(', ')
  }

  const tagDisplay = (header, tagFn) => {
    return (
      <Center style={{marginBottom:1}}>
        <Stack>
          <Stack direction="row" spacing={1}>
          <Typography variant="subtitle1">{header}</Typography>
            {tagFn()}
          </Stack>
        </Stack>
    </Center>
    );
  }

  return (
    <Box>
      { isPublic ? <></> : <ClickableSetting/> }
        <Stack spacing={0.8}> 
          <Center>
            <Stack spacing={0.5}>
                <Center><DisplayAvatar src={user?.avatar_url} sx={{ height: 70, width: 70, mt:-1}}/></Center>
                <Typography variant="h5" component="div" sx={{textAlign: "center"}}>
                    {title}
                </Typography>

                <Typography variant="subtitle1" component="div" sx={{textAlign:"center"}}>
                    {subtitle}
                </Typography>
            </Stack>
          </Center>
          {/* <div className={styles.box}>text</div> */}
          
          { tagDisplay(isProject ? "Skills wanted:" : "Skills:", skills) }
          { tagDisplay(isProject ? "Related interests:" : "Interests:", interests) }
          <Center>
            <Typography variant="subtitle1">
              Communities: <Typography component="span" color="gray">{user.user_communities.length == 0 ? <DefaultMsg/> : 
                user.user_communities.join(', ')}</Typography>
            </Typography> 
          </Center>

          { linkinSlice ? <Center><StatusTag linkinSlice={linkinSlice} sx={{ mt: 0, fontSize: "0.8rem"}}/></Center> : <></> }

          <Center>
            {isPublic ? <Stack direction="row">
                { LinkButton }
                { FollowButton }
                { RejectButton }
              </Stack> : <></> }
          </Center>

        </Stack>
            
    </Box>
  );
}
