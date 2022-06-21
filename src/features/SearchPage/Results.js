import { CircleOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import scroll from "../components/scroll/Scroll.module.css";

function RecommendationsList({
  setLoading,
  refresh,
  setRefresh,
  users,
  projects,
}) {
  // Triggers when users, refresh and projects have been updated
  useEffect(() => {
    showRecommendations();
  }, [refresh]);

  const [recommendations, setRecommendations] = useState([]);
  const user = useSelector((state) => state.user);
  function showRecommendations() {
    // console.log("Refreshing");
    let arr = [];
    setLoading(true);
    // console.log("filter: ", user.searchFilter);
    if (user.searchFilter === "Show Projects") {
      for (let i = 0; i < projects.length; i++) {
        arr.push(<ProfileCard info={projects[i]} />);
      }
    } else if (user.searchFilter === "Show Users") {
      for (let i = 0; i < users.length; i++) {
        arr.push(<ProfileCard info={users[i]} />);
      }
    } else {
      // console.log("IAM HERE ");
      const len = Math.max(users.length, projects.length);
      //  Alternates between user and project
      for (let i = 0; i < len; i++) {
        if (i < users.length) {
          // console.log(users[i]);
          arr.push(<ProfileCard info={users[i]} />);
        }
        if (i < projects.length) {
          arr.push(<ProfileCard info={projects[i]} />);
        }
      }
    }
    // TODO: Display a default no result page
    // if (arr.length === 0) {

    // }
    // console.log(arr);
    setLoading(false);
    setRecommendations(arr);
  }

  return (
    <Box className={scroll.scroll_parent}>
      <Typography variant="h6" color="292929">
        Search Results
      </Typography>

      <Box className={scroll.scroll_child}>
        <Stack spacing={4}>{recommendations}</Stack>
      </Box>
    </Box>
  );
}

export default RecommendationsList;
