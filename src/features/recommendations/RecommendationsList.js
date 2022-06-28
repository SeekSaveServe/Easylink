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
import { deleteKeys, userLoaded } from "../user/userSlice";
import { Loading } from "../../components/constants/loading";
import { searchLoaded, selectUniqueTags } from "../SearchPage/searchSlice";

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
  const search = useSelector(state => state.search);

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
  // async function getRecommendations() {
  //   setLoading(true);
  //   try {
  //     const { unique_skills, unique_interests, unique_communities } = await getTags();
  //     // await Promise.all([fetchData(
  //     //   setUsers,
  //     //   "user",
  //     //   user,
  //     //   !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
  //     //   !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
  //     //   !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
  //     //   refresh1,
  //     //   setRefresh
  //     // ), fetchData(
  //     //   setProjects,
  //     //   "project",
  //     //   user,
  //     //   !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
  //     //   !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
  //     //   !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
  //     //   refresh2,
  //     //   setRefresh
  //     // )])

  //     // Fetch data
  //     await fetchData(
  //       setUsers,
  //       "userRecommendation",
  //       user,
  //       !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
  //       !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
  //       !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
  //       refresh1,
  //       setRefresh
  //     );
  //    await fetchData(
  //       setProjects,
  //       "projectRecommendation",
  //       user,
  //       !user.user_communities || (user.user_communities.length === 0) ? unique_communities : user.user_communities,
  //       !user.user_skills || (user.user_skills.length === 0)? unique_skills : user.user_skills,
  //       !user.user_interests || (user.user_interests.length === 0) ? unique_interests : user.user_interests,
  //       refresh2,
  //       setRefresh2
  //     );


  //     const valid = (datum) => {
  //       return datum.user_skills.length > 0 && datum.user_interests.length > 0;
  //     };

      
  //   } catch (error) {
  //     console.log("reccs err", error);
  //   } finally {
  //     setLoading(false);
  //   }

  // }

  // useEffect(() => {
  //   dispatch(deleteKeys(["search", "searchFilter"]));
  //   console.log("recc use eff", user?.search);
  //   getRecommendations();
  // }, [fetch, user]);
  function interleave(users, projects) {
    const arr = [];
    const len = Math.max(users.length, projects.length);
      //  Alternates between user and project
      for (let i = 0; i < len; i++) {
        if (i < users.length) {
          // console.log(users[i]);
          arr.push(users[i]);
        }
        if (i < projects.length) {
          arr.push(projects[i]);
        }
      }
    
    return arr;
  }


  const isUserLoaded = useSelector(userLoaded);
  const isSearchLoaded = useSelector(searchLoaded);
  const uniqueTags = useSelector(selectUniqueTags);

  const pickArray = (first, second) => first.length == 0 ? second : first;
  async function getRecommendations() {
    // console.log("userloaded, searchloaded", userLoaded, isSearchLoaded);
    //if (!(userLoaded && isSearchLoaded)) return;

    // console.log("Unique tags from rec", uniqueTags);

    const { user_skills, user_interests, user_communities } = user;
    const { unique_communities, unique_interests, unique_skills } = uniqueTags;

    // console.log("User skills, ints, comms", user_skills, user_interests, user_communities);
    // console.log("Unique SIC:", unique_skills, unique_interests, unique_communities);

    const fetchSkills = pickArray(user_skills, unique_skills);
    const fetchInterests = pickArray(user_interests, unique_interests);
    const fetchCommunities = pickArray(user_communities, unique_communities);

    // console.log("Fetch SIC", fetchSkills, fetchInterests, fetchCommunities);

    
    try {
      setLoading(true);
      const users = await fetchData("userRecommendation", "", fetchCommunities, fetchSkills, fetchCommunities);
      // console.log("Users from fetchData", users);
      const projects = await fetchData("projectRecommendation", "", fetchCommunities, fetchSkills, fetchCommunities);
      // console.log("Projects from fetchData", projects);

      setRecommendations(interleave(users, projects));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
    

    // const users = await fetchData("userRecommendation", "", )
    
  }

  useEffect(() => {
    if (!(isUserLoaded && isSearchLoaded)) return;
    dispatch(getLinks(idObj));
    getRecommendations();
  }, [user, search]);



  

  // useEffect(() => {
  //   // displayRecommendations();
    
  //   setRecommendations(interleave(users, projects))
    
  // }, [refresh1, refresh2]);

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
