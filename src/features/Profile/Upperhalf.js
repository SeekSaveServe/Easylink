import { Center } from "@chakra-ui/react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import ClickableSetting from "../components/ClickableSetting";
import DisplayAvatar from "../components/DisplayAvatar/DisplayAvatar";
import { Stack, Typography } from "@mui/material";
import styles from './Upperhalf.module.css';
import Tag from "../../components/Tag/Tag";
// everything until before tabs
export default function Upperhalf({ user, isPublic }) {
  // const user = useSelector(state => state.user);
  const title = user.username;
  const subtitle = user.title;
  const isProject = user?.isProject == true;
  const DefaultMsg = () => <Typography variant="subtitle1" color="gray">Nothing to show</Typography>;

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

  const tagDisplay = (header, tagFn) => {
    return (
      <Center style={{marginBottom:1}}>
        <Stack>
          {/* <Center><Typography variant="subtitle1">{header}</Typography></Center> */}
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
      { isPublic ? <></> : <ClickableSetting fontSize="large" /> }
        <Stack spacing={1.2}> 
          <Center>
          
          <Stack spacing={0.5}>
              <Center><DisplayAvatar sx={{ height: 70, width: 70, mt:-4}}/></Center>
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

        </Stack>
            
    </Box>
  );
}

// export default function Upperhalf() {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#93b7db",
//         "&:hover": {
//           backgroundColor: "#a6cff7",
//           opacity: [0.9, 0.8, 0.7],
//         },
//       }}
//     >
//       <ClickableSetting fontSize="large" />
//       <Center>
//         <DisplayAvatar sx={{ height: 70, width: 70 }} />
//       </Center>
//     </Box>
//   );
// }
