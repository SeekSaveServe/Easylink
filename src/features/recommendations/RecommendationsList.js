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
import fetchData, { fetchRecommendations } from "../SearchPage/FetchData";
import { deleteKeys, userLoaded } from "../user/userSlice";
import { Loading } from "../../components/constants/loading";
import { searchLoaded, selectUniqueTags } from "../SearchPage/searchSlice";
import interleave from "../../components/constants/interleave";
// For use specifically in Feed: pull from recommender API
function RecommendationsList({ filterIndex, fetch }) {
  // const { FilterButton, btnIndex } = useProfileFilter();

  const idObj = useIdObject();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("Loading from recclist", loading);
  const dispatch = useDispatch();
  const [refresh1, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const user = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);

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
    const unique_skills = (await obtainTags("unique_skills")).map(
      (d) => d.name
    );
    const unique_interests = (await obtainTags("unique_interests")).map(
      (d) => d.name
    );
    const unique_communities = (await obtainTags("unique_communities")).map(
      (d) => d.name
    );
    return { unique_skills, unique_interests, unique_communities };
  }


  const isUserLoaded = useSelector(userLoaded);
  const isSearchLoaded = useSelector(searchLoaded);
  const uniqueTags = useSelector(selectUniqueTags);

  const pickArray = (first, second) => (first.length == 0 ? second : first);
  async function getRecommendations() {
    
    const { user_skills, user_interests, user_communities } = user;
    const { unique_communities, unique_interests, unique_skills } = uniqueTags;

    const fetchSkills = pickArray(user_skills, unique_skills);
    const fetchInterests = pickArray(user_interests, unique_interests);
    const fetchCommunities = pickArray(user_communities, unique_communities);

    console.log("Fetch SIC", fetchSkills, fetchInterests, fetchCommunities);

    try {
      setLoading(true);

      Promise.all(
        [fetchRecommendations(true, ["Programming", "Service", "USP"]),
        fetchRecommendations(false, ["Programming", "Service", "USP"])]
      ).then(values => {
         setRecommendations(interleave(values[0], values[1]));
         setLoading(false);
      });

      // const users = await fetchData(
      //   "userRecommendation",
      //   "",
      //   fetchCommunities,
      //   fetchSkills,
      //   fetchInterests
      // );
      // // console.log("Users from fetchData", users);
      // const projects = await fetchData(
      //   "projectRecommendation",
      //   "",
      //   fetchCommunities,
      //   fetchSkills,
      //   fetchInterests
      // );
      // console.log("Projects from fetchData", projects);

      // setRecommendations(interleave(users, projects));
    } catch (error) {
      throw error;
    } finally {
      //setLoading(false);
    }
  }

  useEffect(() => {
    console.log("Recc list use eff")
    if (!(isUserLoaded && isSearchLoaded)) return;
    dispatch(getLinks(idObj));
    getRecommendations();
  }, [user, search]);


  function displayRecommendations() {
    console.log("Display reccs run");
    if (loading) {
      console.log("--SHOW LOADING---");
      return (
        <Center>
          <CircularProgress size={40} sx={{ mt: 2 }} />
        </Center>
      );
    }


    return (
      <CardList data={recommendations} btnIndex={filterIndex} isJoin={false} />
    );
  }

  return <Box>{displayRecommendations()}</Box>;
}

export default RecommendationsList;
