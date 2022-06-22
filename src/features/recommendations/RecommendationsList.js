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
function RecommendationsList({ filterIndex }) {
  // const { FilterButton, btnIndex } = useProfileFilter();

  const idObj = useIdObject();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [refresh2, setRefresh2] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const user = useSelector((state) => state.user);
  
  // eventually replace with generated from API - ensure isProject field is available or computable (pid?)
  // for now, get all projects + users and preprocess by adding isProject field
  async function getRecommendations() {
    setLoading(true);
    try {
      // Fetch data
      fetchData(setUsers, "user", user, user., user., user.);
      fetchData(setProjects, "project", user, user., user., user.);

      const valid = (datum) => {
        return datum.user_skills.length > 0 && datum.user_interests.length > 0;
      };

      setRecommendations(
        users
          .concat(projects)
          .filter(valid)
          .sort((i1, i2) => new Date(i2.created_at) - new Date(i1.created_at))
      );
    } catch (error) {
      console.log("reccs err", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecommendations();
  }, []);

  useEffect(() => {
    dispatch(getLinks(idObj));
  }, []);

  function displayRecommendations() {
    if (loading) {
      return (
        <Center>
          <CircularProgress size={40} sx={{ mt: 2 }} />
        </Center>
      );
    }

    if (recommendations.length === 0) {
      return (
        <Center>
          <Typography
            color="gray"
            variant="h6"
            sx={{ fontWeight: "normal", mt: 1 }}
          >
            {" "}
            Nothing to show{" "}
          </Typography>
        </Center>
      );
    }

    return (
      <CardList data={recommendations} btnIndex={filterIndex} isJoin={true} />
    );
  }

  return <Box>{displayRecommendations()}</Box>;
}

export default RecommendationsList;
