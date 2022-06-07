import { Center } from "@chakra-ui/react";
import { useSelect } from "@mui/base";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import DisplayAvatar from "../../components/DisplayAvatar/DisplayAvatar";
import styles from "../Settings.module.css";
import UploadAvatar from "../../components/UploadAvatar";
import { BasicAlert } from "../../../components/Alert/Alert";
import SettingsAvatar from "../../components/SettingsAvatar";
export default function Left() {
  const user = useSelector((state) => state.user);
  const name = user.username;
  const title = user.title ? user.title : "No title";
  const [links, setLinks] = useState("loading");
  const [projects, setProjects] = useState("loading");
  const [following, setFollowing] = useState("loading");
  const [avatarUrl, set_AvatarUrl] = useState(user.avatar_url);

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
    <div className={styles.child2}>
      <Center>
        <SettingsAvatar
          size={150}
          url={avatarUrl}
          onUpload={(url) => {
            set_AvatarUrl(url);
          }}
        />
      </Center>
      <Center>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </Center>
      <Center>
        <Typography variant="body2">{title}</Typography>
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
    </div>
  );
}
