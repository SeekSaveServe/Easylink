import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import styles from "./Feed.module.css";
import RecommendationsList from "../recommendations";
import PostsList from "../posts";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Tag from "../../components/Tag/Tag";
import ListTypeMenu from "./ListTypeMenu";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { FilterList, Settings } from "@mui/icons-material";

function Feed() {
  const userProfile = useSelector((state) => state.user);
  
  const [typeIndex, setTypeIndex] = useState(0); // 0 - Reccs, 1 - Posts

  const [filterIndex, setFilterIndex] = useState(0); // for FilterMenu
  const filterItems = typeIndex == 0 ? ["Users and projects", "Users only", "Projects only"] : ["Posts and polls", "Posts only", "Polls only"];

  useEffect(() => {
    setFilterIndex(0);
  }, [typeIndex])
  
  //  Testing Django API
  const [res, setRes] = useState("not set");
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 1000,
    headers: {
      Authorization: "Token 4e9f4c0735a434e094da78c61faa290881016460",
    },
  });
  async function test() {
    try {
      await fetch("http://127.0.0.1:8000/api/user/?format=json&username=123")
        .then((a) => a.json())
        .then((data) => setRes(data[0]));
    } catch (e) {
      console.log(e);
    } finally {
      console.log("done!");
    }
  }
  useEffect(() => {
    test();
  });
  console.log(res);

  const throwKnownError = () => {
    throw new Error("testing Sentry");
  };

  return (
    <>
      {/* <button onClick={throwKnownError}> hi </button> */}
      <BasicNavBar />
      <Container className={styles.parent} maxWidth="lg" sx={{padding:"1rem 6rem !important"}}>
        <Center>
          <Tag color="primary.light" fontColor="white" sx={{fontSize:"1.1rem", mt:1, mb:1.5}}>
            <span>Welcome</span>,{" "}
            <span>{userProfile.username}</span>
          </Tag>
        </Center>

        {/* Title and options  */}
        <Center style={{marginBottom:6}}>
          <Typography variant="h4" color={typeIndex == 0 ? "var(--primary)" : "var(--secondary)"} sx={{mr:0.5}}>{ typeIndex == 0 ? "Recommendations" : "Posts"}</Typography>
          <FilterMenu title={"Toggle view"} icon={<Settings/>} items={["Recommendations", "Posts"]} index={typeIndex} setIndex={setTypeIndex} />
          <FilterMenu title={"Filter settings"} icon={<FilterList/>} items={filterItems} index={filterIndex} setIndex={setFilterIndex} />
        </Center>

          { typeIndex == 0 ? <RecommendationsList filterIndex={filterIndex} /> : <PostsList filterIndex={filterIndex} /> }
      </Container>
    </>
  );
}

export default Feed;
