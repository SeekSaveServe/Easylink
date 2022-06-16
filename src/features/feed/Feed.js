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

function Feed() {
  const userProfile = useSelector((state) => state.user);
  const [showPosts, setShowPosts] = useState(false);
  
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
      <Container className={styles.parent} maxWidth="lg">
        <Center>
          {/* <Typography variant="h5" sx={{ margin: "0.5rem 0", fontWeight: "normal" }}>
            <span>Welcome</span>,{" "}
            <span>{userProfile.username}</span>
          </Typography> */}

          <Tag color="primary.light" fontColor="white" sx={{fontSize:"1.1rem", mt:1, mb:1.5}}>
            <span>Welcome</span>,{" "}
            <span>{userProfile.username}</span>
          </Tag>


        </Center>

        <Center style={{marginBottom:6}}>
          <Typography variant="h4" color="var(--primary)">Recommendations</Typography>
        </Center>

          <RecommendationsList />
      </Container>
    </>
  );
}

export default Feed;
