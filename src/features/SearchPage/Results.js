import { CircleOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import scroll from "../components/scroll/Scroll.module.css";
import { CardList } from '../components/ProfileCardList/ProfileCardList';
import { userLoaded } from "../user/userSlice";
import { searchLoaded, selectSelectedTags } from "./searchSlice";
import { selectUniqueTags } from "./searchSlice";
import fetchData from "./FetchData";
import interleave from "../../components/constants/interleave";
import useIdObject from "../../components/hooks/useIdObject";
import { getLinks } from "../Links/linksSlice";
import { getFollowed } from "../followers/followerSlice";
import { shallowEqual, useStore } from "react-redux";

function RecommendationsList() {
  // Triggers when users, refresh and projects have been updated
  // useEffect(() => {
  //   showRecommendations();
  // }, [refresh]);

  const [recommendations, setRecommendations] = useState([]);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const idObj = useIdObject();

  const [loading, setLoading] = useState(false);

  // const search = useSelector(state => state.search);
  const isUserLoaded = useSelector(userLoaded);
  const isSearchLoaded = useSelector(searchLoaded);
  const uniqueTags = useSelector(selectUniqueTags, shallowEqual); // shallowEqual to re-render ONLY when the particular selector changes regardless of rest
  const selectedTags = useSelector(selectSelectedTags, shallowEqual);
  const searchFilter = useSelector(state => state.search.searchFilter);

  const store = useStore();
  const pickArray = (first, second) => first.length == 0 ? second : first;

  // console.log("Results render;")

  async function getRecommendations() {
    // console.log("is loaded from res", isUserLoaded, isSearchLoaded);
    
    // const { search: searchInput, searchFilter, selectedSkills, selectedInterests, selectedCommunities } = search;
    const { selectedSkills, selectedInterests, selectedCommunities } = selectedTags;

    // Problem: search input is updated everytime changed, causing re-render here which is undesirable (only want re-render on apply filter or enter)
      // this caused search bar to lag heavily
    // Solution: useStore hook -> does not re-render the component. can access store on demand when needed
      // I only need searchInput when getReccs fires, not every single time it changes
    const searchInput = store.getState().search.search;
    const { unique_communities, unique_interests, unique_skills } = uniqueTags;

    // console.log("Selected SIC", selectedSkills, selectedInterests, selectedCommunities, searchInput, searchFilter);
    // console.log("Unique SIC", unique_communities, unique_interests, unique_skills);

    // if selected is empty for some tag, only then pick from unique (the whole list)
    const fetchSkills = pickArray(selectedSkills, unique_skills)
    const fetchInterests = pickArray(selectedInterests, unique_interests);
    const fetchCommunities = pickArray(selectedCommunities, unique_communities);

    // console.log("Fetch SIC", fetchSkills, fetchInterests, fetchCommunities);

    const getResource = (route) => async() => fetchData(route, searchInput, fetchCommunities, fetchSkills, fetchInterests);
    const getUsers = getResource("user");
    const getProjects = getResource("project");

    try {
      setLoading(true);
      let data = [];

      if (searchFilter == "Show Projects") {
        data = await getProjects();
        // console.log("proj only", data);
      } else if (searchFilter == "Show Users") {
        data = await getUsers();
        // console.log("users only", data);
      } else {
        const users = await getUsers();
        const projects = await getProjects();
        data = interleave(users, projects);
        // console.log("users and proj", data);
      }

      setRecommendations(data);
      setLoading(false);

    } catch (err) {

    }


  
  }

  const refresh = useSelector(state => state.search.refresh);
  useEffect(() => {
    console.log("user search load", isUserLoaded, isSearchLoaded);
    if (!(isUserLoaded && isSearchLoaded)) return;
    getRecommendations();
    dispatch(getLinks(idObj));
    dispatch(getFollowed(idObj));
  }, [refresh])


  // function showRecommendations() {
  //   // console.log("Refreshing");
  //   let arr = [];
  //   setLoading(true);
  //   // console.log("filter: ", user.searchFilter);
  //   if (user.searchFilter === "Show Projects") {
  //     for (let i = 0; i < projects.length; i++) {
  //       arr.push(projects[i]);
  //     }
  //   } else if (user.searchFilter === "Show Users") {
  //     for (let i = 0; i < users.length; i++) {
  //       arr.push(users[i]);
  //     }
  //   } else {
  //     // console.log("IAM HERE ");
  //     const len = Math.max(users.length, projects.length);
  //     //  Alternates between user and project
  //     for (let i = 0; i < len; i++) {
  //       if (i < users.length) {
  //         // console.log(users[i]);
  //         arr.push(users[i]);
  //       }
  //       if (i < projects.length) {
  //         arr.push(projects[i]);
  //       }
  //     }
  //   }
  //   // TODO: Display a default no result page
  //   // if (arr.length === 0) {

  //   // }
  //   // console.log(arr);
  //   setLoading(false);
  //   setRecommendations(arr);
  //   console.log("data", arr);
  // }

  function displayResults() {
    if (loading) {
      return <CircularProgress size={50} sx={{ml:5}}/>;
    }

    return recommendations.length == 0 ? 
      <Typography color="gray" variant="h6" sx={{fontWeight: "normal", mt:1}}>Nothing to show</Typography> :
      <CardList data={recommendations} btnIndex={0} isJoin={false}/>

  }

  return (
    <Box className={scroll.scroll_parent}>
      <Typography variant="h6" color="292929">
        {recommendations.length} Search Results
      </Typography>

      <Box className={scroll.scroll_child}>
        {/* <Stack spacing={4}>{recommendations}</Stack> */}
        {displayResults()}
      </Box>
    </Box>
  );
}

export default RecommendationsList;
