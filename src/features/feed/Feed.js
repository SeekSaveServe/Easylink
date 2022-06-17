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
import FilterMenu from "./FilterMenu";

function Feed() {
  const userProfile = useSelector((state) => state.user);
  const [showPosts, setShowPosts] = useState(false);
  const [filterIndex, setFilterIndex] = useState(0); // for FilterMenu
  const filterItems = showPosts
    ? ["Posts and polls", "Posts only", "Polls only"]
    : ["Users and projects", "Users only", "Projects only"];

  return (
    <>
      {/* <button onClick={throwKnownError}> hi </button> */}
      <BasicNavBar />
      <Container
        className={styles.parent}
        maxWidth="lg"
        sx={{ padding: "1rem 6rem !important" }}
      >
        <Center>
          <Tag
            color="primary.light"
            fontColor="white"
            sx={{ fontSize: "1.1rem", mt: 1, mb: 1.5 }}
          >
            <span>Welcome</span>, <span>{userProfile.username}</span>
          </Tag>
        </Center>

        {/* Title and options  */}
        <Center style={{ marginBottom: 6 }}>
          <Typography
            variant="h4"
            color={showPosts ? "var(--secondary)" : "var(--primary)"}
          >
            {showPosts ? "Posts" : "Recommendations"}
          </Typography>
          <ListTypeMenu showPosts={showPosts} setShowPosts={setShowPosts} />
          <FilterMenu
            items={filterItems}
            index={filterIndex}
            setIndex={setFilterIndex}
          />
        </Center>

        {showPosts ? <PostsList /> : <RecommendationsList />}
      </Container>
    </>
  );
}

export default Feed;
