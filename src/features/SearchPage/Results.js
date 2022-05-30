import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";
import scroll from "../components/scroll/Scroll.module.css";

function RecommendationCard({ refresh, setRefresh }) {
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

function RecommendationsList({ setLoading, refresh, setRefresh }) {
  function showRecommendations(n) {
    let arr = [];
    setLoading(true);
    for (let i = 0; i < n; i++) {
      // simulate backend
      console.log(i);
      arr.push(<RecommendationCard key={i} />);
    }
    setLoading(false);
    return arr;
  }

  return (
    <Box className={scroll.scroll_parent}>
      <Typography variant="h6" color="292929">
        Search Results
      </Typography>

      <Box className={scroll.scroll_child}>
        <Stack spacing={4}>{showRecommendations(10)}</Stack>
      </Box>
    </Box>
  );
}

export default RecommendationsList;
