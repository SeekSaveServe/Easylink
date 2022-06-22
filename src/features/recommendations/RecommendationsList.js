import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import styles from "./Recommendations.module.css";
import scroll from "../components/scroll/Scroll.module.css";
import ProfileCardList from "../components/ProfileCardList";
import { fakeLinksData } from "../Links/Links";
import { Center } from "@chakra-ui/react";
import useProfileFilter from "../components/ProfileCardList/useProfileFilter";
import { CardList } from "../components/ProfileCardList/ProfileCardList";
import { supabase } from "../../supabaseClient";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFeedLinks } from "../Links/linksSlice";
import { getLinks } from "../Links/linksSlice";
import useIdObject from "../../components/hooks/useIdObject";
import fetchData from "../SearchPage/FetchData";

// For use specifically in Feed: pull from recommender API
function RecommendationsList({ filterIndex, fetch }) {
  // const { FilterButton, btnIndex } = useProfileFilter();

  const idObj = useIdObject();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Loading", loading);
  const dispatch = useDispatch();
  const [refresh1, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const user = useSelector((state) => state.user);

  // obtain all unique interests and tags
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [communities, setCommunities] = useState([]);

  async function obtainTags(tag) {
    const { data, error } = await supabase
      .from(tag)
      .select("name")
      .is("in_login", true);
    return data;
  }

  async function getTags() {
    const unique_skills = (await obtainTags("unique_skills")).map(d => d.name);
    const unique_interests = (await obtainTags("unique_interests")).map(d => d.name);
    const unique_communities = (await obtainTags("unique_communities")).map(d => d.name);
    return { unique_skills, unique_interests, unique_communities }
  }

  // useEffect(() => {
  //   obtainTags("unique_skills").then((res) =>
  //     setSkills([res.map((obj) => obj.name)][0])
  //   );


  // eventually replace with generated from API - ensure isProject field is available or computable (pid?)
  // for now, get all projects + users and preprocess by adding isProject field
  async function getRecommendations() {
    setLoading(true);
    try {
      const { unique_skills, unique_interests, unique_communities } = await getTags();
      // await Promise.all([fetchData(
      //   setUsers,
      //   "user",
      //   user,
      //   !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
      //   !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
      //   !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
      //   refresh1,
      //   setRefresh
      // ), fetchData(
      //   setProjects,
      //   "project",
      //   user,
      //   !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
      //   !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
      //   !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
      //   refresh2,
      //   setRefresh
      // )])

      // Fetch data
      await fetchData(
        setUsers,
        "user",
        user,
        !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
        !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
        !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
        refresh1,
        setRefresh
      );
     await fetchData(
        setProjects,
        "project",
        user,
        !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
        !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
        !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
        refresh2,
        setRefresh2
      );


      const valid = (datum) => {
        return datum.user_skills.length > 0 && datum.user_interests.length > 0;
      };

      
    } catch (error) {
      console.log("reccs err", error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getRecommendations();
  }, [fetch]);

  useEffect(() => {
    dispatch(getLinks(idObj));
  }, []);

  useEffect(() => {
    // displayRecommendations();
    setRecommendations(
      users
        .concat(projects)
        .sort((i1, i2) => new Date(i2.created_at) - new Date(i1.created_at))
    );
  }, [refresh1, refresh2]);

  function displayRecommendations() {
    if (loading) {
      return (
        <Center>
          <CircularProgress size={40} sx={{ mt: 2 }} />
        </Center>
      );
    }

    // if (recommendations.length === 0) {
    //   return (
    //     <Center>
    //       <Typography
    //         color="gray"
    //         variant="h6"
    //         sx={{ fontWeight: "normal", mt: 1 }}
    //       >
    //         {" "}
    //         Nothing to show{" "}
    //       </Typography>
    //     </Center>
    //   );
    // }

    return (
      <CardList data={recommendations} btnIndex={filterIndex} isJoin={false} />
    );
  }

  return <Box>{displayRecommendations()}</Box>;
}

export default RecommendationsList;
