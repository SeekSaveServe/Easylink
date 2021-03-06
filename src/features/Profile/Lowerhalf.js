import { Center } from "@chakra-ui/react";
import { useSelect } from "@mui/base";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasicButton from "../../components/BasicButton";
import { supabase } from "../../supabaseClient";
import ProfileTabs from "./ProfileTabs";

export default function Lowerhalf({ user, isPublic }) {
  // const user = useSelector((state) => state.user);
  const title = user.username;
  const bio = user.bio ? user.bio : "No Bio";
  const [links, setLinks] = useState("loading");
  const [projects, setProjects] = useState("loading");
  const [following, setFollowing] = useState("loading");
  // console.log(user.id);
  // NOTE: Some of the functions need to be rewritten to accommodate projects
  // The current version is written for users only
  // Count returns null instead of 0 when nothing is found; very weird

  async function obtainData(tag) {
    const { data, error, count } = await supabase
      .from(tag)
      .select("link_id", { count: "exact", head: true })
      .eq("uid_receiver", supabase.auth.user().id)
      .is("accepted", true); // MUST USE SUPABASE.AUTH.USER() with head
    return count;
  }

  async function obtainCountFollowers(tag) {
    const { data, error, count } = await supabase
      .from(tag)
      .select("created_at", { count: "exact", head: true })
      .eq("followed_uid", supabase.auth.user().id);
    return count;
  }

  async function obtainCountProjects(tag) {
    const { data, error, count } = await supabase
      .from(tag)
      .select("pid", { count: "exact", head: true })
      .eq("uid", supabase.auth.user().id);
    return count;
  }

  useEffect(() => {
    obtainData("links").then((res) => (res ? setLinks(res) : setLinks(0)));
    obtainCountFollowers("followers").then((res) =>
      res ? setFollowing(res) : setFollowing(0)
    );
    obtainCountProjects("projects").then((res) =>
      res ? setProjects(res) : setProjects(0)
    );
  }, []);
  return (
    <ProfileTabs user={user} isPublic={isPublic}/>
  );
}
