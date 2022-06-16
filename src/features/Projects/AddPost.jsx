import { Center } from "@chakra-ui/react";
import { Divider, FormControlLabel, IconButton, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import RadioWithLabel from "../../components/RadioWithLabel";
import styles from './Projects.module.css';
import { useEffect, useState } from "react";
import { InputLabel, FormControl } from "@mui/material";
import BasicTextField from "../../components/Basic Textfield";
import BasicButton from "../../components/BasicButton";
import { AddCircleOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../components/Alert/AlertContext";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./projectsSlice";
import { selectAllProjects } from "./projectsSlice";
import { supabase } from "../../supabaseClient";

// TODO: add form validate at least 2 options, delete option, no duplicate options
function AddPost() {
    const dispatch = useDispatch();
    // load projects for selector to work - in case /addpost visited directly + keep up to date
    useEffect(() => {
        dispatch(getProjects());
    }, [])

    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [addOption, setAddOption] = useState("");
    const [pollOptions, setPollOptions] = useState([]);
    const [isPost, setIsPost] = useState(true);

    const projects = useSelector(selectAllProjects);
    // selectedProject pid
    const defaultId = useSelector(state => state.user?.pid);
    const defaultProject = defaultId ?? '';

    const [selectedProject, setSelectedProject] = useState(defaultProject); // for dropdown

    const showAlert = useAlert();
    
    const addOptionClick = () => {
        const toAdd = addOption.trim()
        if (toAdd == "") return;
        pollOptions.push(toAdd);
        setAddOption("");
    }

    const validForm = () => {
        let errorMsg = null;

        if (!selectedProject) {
            errorMsg = "Please select a project";
        }

        if (description.trim() == "") {
            errorMsg = "Please enter a description";
        } 

        else if (!isPost && pollOptions.length == 0) {
            errorMsg = "Please enter at least one poll option";
        }

        if (errorMsg) {
            showAlert(errorMsg, "error");
            return false;
        }

        return true;

    }

    const handleSubmit = async() => {
        // add to DB..etc
        if (!validForm()) return;

        // 1. Polls are subset of Post: make the post first
        const state = {
            pid: selectedProject,
            body: description,
            isPoll: !isPost
        };

        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    state
                ]);
            
            if (error) throw error;

            // s_n of post so we can add poll options
            const { s_n } = data[0];
        
            if (!isPost) {
                // 2. Poll: add the additional columns in poll_options
                const pollArray = pollOptions.map((option) => ({ post_id: s_n, option }));
                const { data, error } = await supabase
                    .from('poll_options')
                    .insert(pollArray);
                    
                if (error) throw error;
            } 

        } catch (error) {
            showAlert(error.error_decription || error.message, "error");
            return;
        }

        // if the user was already switched to a project, go to the posts page. else, go to projects page
        if (defaultId) {
            navigate("/projects", { state: {isProject: false} });
        } else {
            navigate("/projects", { state: {isProject: true} });
        }
        
        showAlert("Added post!", "success");
    }

    return (
        <>
        <BasicNavBar/>
        <Container className={styles.container} maxWidth="md">
            <Center style={{marginBottom:10}}>
                <Typography variant="h5" sx={{fontWeight: "bold", mr:2}}>Add {isPost ? "post" : "poll"}: </Typography>

                {/* Type dropdown */}
                <FormControl size="small">
                    <InputLabel id="select-type">Type</InputLabel>
                    <Select
                    id="select-type"
                    label="Type"
                    value={isPost}
                    onChange={(evt) => {setIsPost(evt.target.value) }}
                    >
                        <MenuItem value={true}>Post</MenuItem>
                        <MenuItem value={false}>Poll</MenuItem>
                    </Select>
                </FormControl>

                {/* Select project dropdown */}
                <FormControl size="small" sx={{ml:2, minWidth: "6rem"}}>
                    <InputLabel id="select-project">Project</InputLabel>
                    <Select
                    id="select-project"
                    label="Project"
                    value={selectedProject}
                    onChange={(evt) => {setSelectedProject(evt.target.value) }}
                    >

                        { projects.map((project, idx) => {
                            return <MenuItem value={project.pid} key={idx}>{project.username}</MenuItem>
                        }) }
                    </Select>
                </FormControl>
            </Center>
            
            <Paper elevation={3} className={styles.paper} sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
                <BasicTextField
                label="Description"
                size="small"
                sx={{width: "70%"}}
                multiline
                value={description}
                onChange={(evt) => setDescription(evt.target.value)}
                ></BasicTextField>

                {!isPost ? 
                    <>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <BasicTextField
                            label="Add option"
                            size="small"
                            value={addOption}
                            onChange={(evt) => setAddOption(evt.target.value)}
                        ></BasicTextField>
                        <IconButton color="primary" onClick={addOptionClick}>
                            <AddCircleOutlined/>
                        </IconButton>
                    </div>

                    <Divider flexItem/>

                    <div>
                        <Typography variant="h6">Preview:</Typography>
                        <RadioGroup column>
                            {pollOptions.map((option, idx) => <FormControlLabel control={<Radio/>} key={idx} value={idx} label={option}></FormControlLabel>)}
                        </RadioGroup>
                    </div></> : <></> }


                <BasicButton bg="primary" sx={{width: "20%"}} onClick={handleSubmit}>Add {isPost ? "post" : "poll"}</BasicButton>
            </Paper>
        </Container>
        </>
    )

}

export default AddPost;