import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { update } from "../user/userSlice";
import Checkmarks from "../../components/Checkmarks";
import BasicButton from "../../components/BasicButton";
import BasicLoadingButton from "../../components/BasicLoadingButton/BasicLoadingButton";
import RadioWithLabel from "../../components/RadioWithLabel";
import fetchData from "./FetchData";
function RecommendedTags({
  refresh,
  setRefresh,
  loading,
  setUsers,
  setProjects,
  fetch,
}) {
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

  // for radial buttons
  const [filter, setFilter] = useState("Show All");

  // update field with key = name attribute, to value = value attribute
  const radioChange = (evt) => {
    setFilter(evt.target.value);
  };

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

  useEffect(() => {
    const comm = !selectedCommunities.length
      ? communities
      : selectedCommunities;
    const skil = !selectedSkills.length ? skills : selectedSkills;
    const int = !selectedInterests.length ? interests : selectedInterests;

    fetchData(setUsers, "user", user, comm, skil, int);
    fetchData(setProjects, "project", user, comm, skil, int);
    setRefresh(!refresh); // triggers a refresh
  }, [communities, fetch]);

  const updateFormState = () => {
    dispatch(
      update({
        tags: [selectedSkills, selectedInterests, selectedCommunities],
        searchFilter: filter,
      })
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    updateFormState();
    const comm = !selectedCommunities.length
      ? communities
      : selectedCommunities;
    const skil = !selectedSkills.length ? skills : selectedSkills;
    const int = !selectedInterests.length ? interests : selectedInterests;

    fetchData(setUsers, "user", user, comm, skil, int);
    fetchData(setProjects, "project", user, comm, skil, int);
    setRefresh(!refresh); // triggers a refresh
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
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={radioChange}
        >
          <RadioWithLabel value="Show Projects" label="Show Projects" />
          <RadioWithLabel value="Show Users" label="Show Users" />
          <RadioWithLabel value="Show All" label="Show All" />
        </RadioGroup>
        <BasicLoadingButton
          bg="#000000"
          onClick={handleSubmit}
          loading={loading}
        >
          {" "}
          Apply Filter{" "}
        </BasicLoadingButton>
      </Box>
    </Box>
  );
}

export default RecommendedTags;
