import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import styles from "./SearchPage.module.css";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import Results from "./Results";
import RecommendedTags from "./RecommendedTags";
import { useEffect, useState } from "react";

export default function SearchPage() {
  // Cause the results to refresh
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  // Data retrieved from search
  const [projects, setProjects] = useState("Not set");
  const [users, setUsers] = useState("Not set");

  return (
    <>
      <BasicNavBar />

      <Box className={styles.content}>
        <Results
          setRefresh={setRefresh}
          setLoading={setLoading}
          refresh={refresh}
          users={users}
          projecs={projects}
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
