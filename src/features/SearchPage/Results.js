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
import scroll from "../components/scroll/Scroll.module.css";

function RecommendationCard({ refresh, setRefresh }) {
  // console.log("i", users);
  // console.log(projects);
  return (
    <Card variant="outlined">
      <CardHeader title="USDevs" subheader="4 days ago" />

      <CardContent>
        <Typography variant="h4">Make laundry chill again</Typography>
        <Typography variant="body2">
          Hi! We are Project Laundrobot, a sub-project under USDevs working on a
          hardware-based laundry notification system. We are looking for
          Developers who knows Python, Raspberry Pi
        </Typography>
      </CardContent>
    </Card>
  );
}

function RecommendationsList({
  setLoading,
  refresh,
  setRefresh,
  users,
  projects,
}) {
  useEffect(() => {
    showRecommendations(10);
  }, [refresh]);

  const [recommendations, setRecommendations] = useState([]);
  const user = useSelector((state) => state.user);
  function showRecommendations(n) {
    let arr = [];
    setLoading(true);
    if (user.filter === "Show All") {
      for (let i = 0; i < n; i++) {
        arr.push(<RecommendationCard key={i} />);
      }
    } else if (user.filter === "Show Users") {
      for (let i = 0; i < n; i++) {
        arr.push(<RecommendationCard key={i} />);
      }
    } else {
      for (let i = 0; i < n; i++) {
        arr.push(<RecommendationCard key={i} />);
      }
    }

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
