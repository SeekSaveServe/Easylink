import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { update } from "../user/userSlice";
import Checkmarks from "../../components/Checkmarks";
import BasicButton from "../../components/BasicButton";

function RecommendedTags({ refresh, setRefresh }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // State of selected tags
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  // display skills
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [communities, setCommunities] = useState([]);

  // Placeholder tags for now
  async function obtainTags(tag) {
    const { data, error } = await supabase
      .from(tag)
      .select("name")
      .is("in_login", true);
    return data;
  }

  useEffect(() => {
    obtainTags("unique_skills").then((res) =>
      setSkills([res.map((obj) => obj.name)][0])
    );

    obtainTags("unique_interests").then((res) =>
      setInterests([res.map((obj) => obj.name)][0])
    );

    obtainTags("unique_communities").then((res) =>
      setCommunities([res.map((obj) => obj.name)][0])
    );

    if (user?.searchTags) {
      const tags = user.tsearchTags;
      setSelectedSkills(tags[0]);
      setSelectedInterests(tags[1]);
      setSelectedCommunities(tags[2]);
    }
  }, []);

  const updateFormState = () => {
    dispatch(
      update({
        tags: [selectedSkills, selectedInterests, selectedCommunities],
      })
    );
  };

  //   const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setRefresh(true); // triggers a refresh
    updateFormState();
  }

  return (
    <Box>
      <Typography variant="h6" color="292929">
        Filter Your Search
      </Typography>
      <Box>
        <Checkmarks
          newTags={skills}
          label="Skills"
          selectedTags={selectedSkills}
          setSelectedTags={setSelectedSkills}
        />
        <Checkmarks
          newTags={interests}
          label="Interests"
          selectedTags={selectedInterests}
          setSelectedTags={setSelectedInterests}
        />{" "}
        <Checkmarks
          required={true}
          newTags={communities}
          label="Communities"
          selectedTags={selectedCommunities}
          setSelectedTags={setSelectedCommunities}
        />{" "}
        <BasicButton bg="#000000" onClick={handleSubmit}>
          {" "}
          Apply Filter{" "}
        </BasicButton>
      </Box>
    </Box>
  );
}

export default RecommendedTags;
