import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
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
import GreyContainer from "../components/GreyContainer";
import { getFollowed } from "../followers/followerSlice";
import useIdObject from "../../components/hooks/useIdObject";

function Feed() {
  const userProfile = useSelector((state) => state.user);
  // to trigger recommendationlist to refresh
  const [fetch, setFetch] = useState(false);
  const [typeIndex, setTypeIndex] = useState(0); // 0 - Reccs, 1 - Posts

  const [filterIndex, setFilterIndex] = useState(0); // for FilterMenu
  const filterItems =
    typeIndex == 0
      ? ["Users and projects", "Users only", "Projects only"]
      : ["Posts and polls", "Posts only", "Polls only"];

  return (
    <>
      {/* <button onClick={throwKnownError}> hi </button> */}
      <BasicNavBar />
      <GreyContainer>
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
            color={typeIndex == 0 ? "var(--primary)" : "var(--secondary)"}
            sx={{ mr: 0.5 }}
          >
            {typeIndex == 0 ? "Recommendations" : "Posts"}
          </Typography>
          <FilterMenu
            title={"Toggle view"}
            icon={<Settings />}
            items={["Recommendations", "Posts"]}
            index={typeIndex}
            setIndex={setTypeIndex}
          />
          <FilterMenu
            title={"Filter profiles"}
            icon={<FilterList />}
            items={filterItems}
            index={filterIndex}
            setIndex={setFilterIndex}
          />
        </Center>

        {typeIndex === 0 ? (
          <RecommendationsList filterIndex={filterIndex} fetch={fetch} />
        ) : (
          <PostsList filterIndex={filterIndex} />
        )}
      </GreyContainer>
    </>
  );
}

export default Feed;
