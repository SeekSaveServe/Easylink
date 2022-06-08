import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import styles from "./Feed.module.css";
import RecommendationsList from "../recommendations";
import PostsList from "../posts";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import { Center } from "@chakra-ui/react";

function Feed() {
  const userProfile = useSelector((state) => state.user);
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
            <span>
              {userProfile.username}
            </span>
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
