import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, Paper, Divider, setRef } from "@mui/material";
import styles from "./SearchPage.module.css";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import RecommendationsList from "./Results";
import RecommendedTags from "./RecommendedTags";
import { useEffect, useState } from "react";
import fetchData from "./FetchData";

export default function SearchPage() {
  // Cause the results to refresh
  const [refresh, setRefresh] = useState(true);
  const [refresh2, setRefresh2] = useState(true);
  const [fetch, setFetch] = useState(true);
  const [loading, setLoading] = useState(false);
  // Data retrieved from search
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.user);
  // console.log(users, projects, "hi");

  const search = useSelector((state) => state.search);
  // console.log("Search obj in SearchPage", search);

  useEffect(() => {
    console.log("Search page load");
  }, []);

  return (
    <>
      <BasicNavBar
        searchInput={search.search}
        setRefresh={setFetch}
        refresh={fetch}
      />

      <Box className={styles.content}>
        <RecommendationsList
          setRefresh={setRefresh}
          setLoading={setLoading}
          refresh={refresh}
          users={users}
          projects={projects}
        />
        <RecommendedTags
          fetch={fetch}
          setRefresh={[setRefresh, setRefresh2]}
          setLoading={setLoading}
          loading={loading}
          refresh={[refresh, refresh2]}
          setUsers={setUsers}
          setProjects={setProjects}
        />
      </Box>
    </>
  );
}
