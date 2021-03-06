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
import { searchLoaded } from "./searchSlice";
import { selectUniqueTags } from "./searchSlice";
import fetchData from "./FetchData";
import interleave from "../../components/constants/interleave";
import useIdObject from "../../components/hooks/useIdObject";
import { getLinks } from "../Links/linksSlice";
import { getFollowed } from "../followers/followerSlice";

function RecommendationsList() {
  // Triggers when users, refresh and projects have been updated
  // useEffect(() => {
  //   showRecommendations();
  // }, [refresh]);
  console.log("Search results render");
  const [recommendations, setRecommendations] = useState([]);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const idObj = useIdObject();

  const [loading, setLoading] = useState(false);

  const search = useSelector(state => state.search);
  const isUserLoaded = useSelector(userLoaded);
  const isSearchLoaded = useSelector(searchLoaded);
  const uniqueTags = useSelector(selectUniqueTags);
  const pickArray = (first, second) => first.length == 0 ? second : first;

  async function getRecommendations() {
    // console.log("is loaded from res", isUserLoaded, isSearchLoaded);
    
    const { search: searchInput, searchFilter, selectedSkills, selectedInterests, selectedCommunities } = search;
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

  useEffect(() => {
    if (!(isUserLoaded && isSearchLoaded)) return;
    dispatch(getLinks(idObj));
    dispatch(getFollowed(idObj));
    getRecommendations();
  }, [search])


  function displayResults() {
    if (loading) {
      return <CircularProgress data-testid="loading" size={50} sx={{ml:5}}/>;
    }

    return recommendations.length == 0 ? 
      <Typography color="gray" variant="h6" sx={{fontWeight: "normal", mt:1}}>Nothing to show</Typography> :
      <CardList data={recommendations} btnIndex={0} isJoin={false}/>

  }

  const resultsIndicator = () => {
    if (loading) return "Loading...";
    return `${recommendations.length} Search Results`;
  }

  return (
    <Box className={scroll.scroll_parent}>
      <Typography variant="h6" color="292929">
        { resultsIndicator() }
      </Typography>

      <Box className={scroll.scroll_child}>
        {/* <Stack spacing={4}>{recommendations}</Stack> */}
        {displayResults()}
      </Box>
    </Box>
  );
}

export default RecommendationsList;
