import { useState } from "react";

export default function Lowerhalf() {
  const [title, setTitle] = useState("No Title");
  const [bio, setBio] = useState("No Bio");
  const [links, setLinks] = useState(0);
  const [projects, setProjects] = useState(0);
  const [following, setFollowing] = useState(0);
}
