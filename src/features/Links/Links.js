import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Stack, Paper, Divider, Tabs, Tab, Container, CircularProgress } from "@mui/material";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import scroll from '../components/scroll/Scroll.module.css';
import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import GreyContainer from "../components/GreyContainer";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { FilterList, Settings } from "@mui/icons-material";
import useIdObject from "../../components/hooks/useIdObject";
import { CardList } from "../components/ProfileCardList/ProfileCardList";
import { selectAllLinks } from "./linksSlice";
import { getLinks } from "./linksSlice";
import useUpdateEffect from "../../components/hooks/useUpdateEffect";

export const fakeLinksData = [
  {
    username: "Cat Lover",
    title: "Cat lover, professional photographer, expert coder",
    bio: "Hi! I love to document the cats of NUS and code!",
    // skills, interests, communities
    tags: [["Python", "Meowing", "Photography"], ["Nature", "Software Development", "Photography"], ["USP", "NUS"]],
    dateRange: "Now to Dec 2022",
    isProject: false,
    email: "catlover@gmail.com",
    telegram:"@CatLover",
    // TODO: just for testing, replace with calculated 
    showEmail: true,
    showTele: true
  },
  {
    username: "USDevs",
    title: "Make laundry chill",
    bio: "Hi! We are Project Laundrobot, a subproject under USDevs working on a hardware based laundry notification system.",
    // skills, interests, communities
    tags: [["Python", "Software Development", "Raspberry Pi"], ["Developers"], ["USP"]],
    dateRange: "Now to Dec 2022",
    isProject: true,
    email: "usdevs@gmail.com",
    telegram: "@USDevs",
    
    showEmail: true,
    showTele: false
  },
  {
    username: "Web_Lover",
    title: "Web Lover, expert coder",
    bio: "Hi! I love to make websites.",
    // skills, interests, communities
    tags: [["Python", "JavaScript"], ["Web development", "UI/UX"], ["USP"]],
    dateRange: "Now to Dec 2022",
    isProject: false,
    email: "weblover@gmail.com",
    telegram: "@WebLover",

    showEmail: false,
    showTele: true
  },
  {
    username: "Livecore",
    title: "Looking for live performers",
    bio: "Looking for performers to play in a show.",
    // skills, interests, communities
    tags: [["Drumming", "Guitar", "Singing"], ["Performers"], ["USP"]],
    dateRange: "Now to Dec 2022",
    isProject: true,
    email: "livecore@gmail.com",
    telegram: "@livecore",

    showEmail: false,
    showTele: false
  }
  
]


function Projects() {
  const [typeIndex, setTypeIndex] = useState(0); // 0: Pending, 1: Established, 2: Rejected
  const typeItems = ["Pending", "Established", "Rejected"];
  const [filterIndex, setFilterIndex] = useState(0); // 0: Users and projects, 1: Users only, 2: Projects only

  const dispatch = useDispatch();
  const idObj = useIdObject();

  useUpdateEffect(() => {
    console.log("Runn use eff");
    dispatch(getLinks(idObj));
  }, [])

  const links = useSelector(selectAllLinks);
  const loading = useSelector(state => state.links.loading);
  console.log("Links", links);

  const showLinks = () => {
    switch (loading) {
      case 'pending':
        return <Center><CircularProgress size={40} sx={{mt:2}}/></Center>;
      case "fulfilled":
        return links.length == 0 ? <Center><Typography variant="h5" color="gray" sx={{mt:2}}>Nothing to show</Typography> </Center>
          : <CardList data={links} isJoin={true} btnIndex={filterIndex}/>
      default:
        <Typography variant="h4" color="gray">Idle/Error</Typography> 
      
    }
  }


  
  return (
    <>
      <BasicNavBar />
      <GreyContainer>
        <Center style={{marginBottom: 10}}>
          <Typography variant="h4">{typeItems[typeIndex]} Links</Typography>
          <FilterMenu title={"Toggle links"} icon={<Settings/>} items={typeItems} 
          index={typeIndex} setIndex={setTypeIndex}/>
          <FilterMenu title={"Filter profiles"} icon={<FilterList/>} items={["Users and projects", "Users only", "Projects only"]}
            index={filterIndex} setIndex={setFilterIndex}
          />
        </Center>
        { showLinks() }

        {/* <CardList data={links} isJoin={true} btnIndex={filterIndex}/> */}

      </GreyContainer>
    </>
  );
}

export default Projects;
