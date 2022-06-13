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

function Feed() {
  const userProfile = useSelector((state) => state.user);
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
      <Box className={styles.parent}>
        <Center>
          <Typography variant="h4" sx={{ margin: "0.5rem 0" }}>
            <span>Welcome</span>,{" "}
            <span>{userProfile.username || userProfile.title}</span>
          </Typography>
        </Center>

        <Box className={styles.content}>
          <RecommendationsList />
          <PostsList />
        </Box>
      </Box>
    </>
  );
}

export default Feed;
