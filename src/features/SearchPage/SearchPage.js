import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import styles from "./SearchPage.module.css";
import RecommendationsList from "../recommendations";
import PostsList from "../posts";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Results from "./Results";
import RecommendedTags from "./RecommendedTags";

export default function SearchPage() {
  const userProfile = useSelector((state) => state.user);

  return (
    <>
      <BasicNavBar />

      <Box className={styles.content}>
        <Results />
        <RecommendedTags />
      </Box>
    </>
  );
}
