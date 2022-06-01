import { Center } from "@chakra-ui/react";
import { useSelect } from "@mui/base";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";

export default function Lowerhalf() {
  const user = useSelector((state) => state.user);
  const title = user.username;
  const bio = user.bio ? user.bio : "No Bio";
  const [links, setLinks] = useState(0);
  const [projects, setProjects] = useState(0);
  const [following, setFollowing] = useState(0);
  // NOTE: Some of the functions need to be rewritten to accommodate projects
  // The current version is written for users only
  async function obtainData(tag) {
    const { data, error, count } = await supabase
      .from(tag)
      .select("link_id", { count: "exact", head: true })
      .eq("uid_receiver", user.id)
      .is("accepted", true);
    return count;
  }

  async function obtainCountProjects(tag) {
    const { data, error, count } = await supabase
      .from(tag)
      .select("link_id", { count: "exact", head: true })
      .eq("uid_receiver", user.id)
      .is("accepted", true);
    return count;
  }

  useEffect(() => {
    obtainData("links").then((res) =>
      res ? setLinks(res) : console.log("hey")
    );
    //   obtainData("unique_communities").then((res) =>
    //     setProjects([res.map((obj) => obj.name)][0])
    //   );
    //   obtainData("unique_communities").then((res) =>
    //     setFollowing([res.map((obj) => obj.name)][0])
    //   );
  }, []);
  return (
    <>
      <Center>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </Center>
      <Center>
        <Typography variant="body2">{bio}</Typography>
      </Center>
      <Center>
        <Card>
          <CardContent> {links} links </CardContent>
        </Card>
        <Card>
          <CardContent> {projects} Projects </CardContent>
        </Card>
        <Card>
          <CardContent> {following} Followers </CardContent>
        </Card>
      </Center>
    </>
  );
}
