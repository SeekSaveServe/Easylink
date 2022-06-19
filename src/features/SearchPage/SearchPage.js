import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import styles from "./SearchPage.module.css";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import RecommendationsList from "./Results";
import RecommendedTags from "./RecommendedTags";
import { useEffect, useState } from "react";

export default function SearchPage() {
  // Cause the results to refresh
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  // Data retrieved from search
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  // console.log("sp", users);
  return (
    <>
      <BasicNavBar />

      <Box className={styles.content}>
        <RecommendationsList
          setRefresh={setRefresh}
          setLoading={setLoading}
          refresh={refresh}
          users={users}
          projects={projects}
        />
        <RecommendedTags
          setRefresh={setRefresh}
          setLoading={setLoading}
          loading={loading}
          refresh={refresh}
          setUsers={setUsers}
          setProjects={setProjects}
        />
      </Box>
    </>
  );
}
