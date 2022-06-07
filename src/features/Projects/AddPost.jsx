import { Center } from "@chakra-ui/react";
import { Divider, FormControlLabel, IconButton, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import RadioWithLabel from "../../components/RadioWithLabel";
import styles from './Projects.module.css';
import { useState } from "react";
import { InputLabel, FormControl } from "@mui/material";
import BasicTextField from "../../components/Basic Textfield";
import BasicButton from "../../components/BasicButton";
import { AddCircleOutlined } from "@mui/icons-material";
import useBasicAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";

// TODO: add form validate at least 2 options, delete option, no duplicate options
function AddPost() {
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [addOption, setAddOption] = useState("");
    const [pollOptions, setPollOptions] = useState([]);
    const [isPost, setIsPost] = useState(true);
    const { BasicAlert, showAlert } = useBasicAlert();
    
    const addOptionClick = () => {
        const toAdd = addOption.trim()
        if (toAdd == "") return;
        pollOptions.push(toAdd);
        setAddOption("");
    }

    const handleSubmit = async() => {
        // add to DB..etc

        navigate("/projects", { state: {isProject: false} })
    }

    return (
        <>
        <BasicNavBar/>
        <Container className={styles.container} maxWidth="md">
            <Center style={{marginBottom:10}}>
                <Typography variant="h5" sx={{fontWeight: "bold", mr:2}}>Add {isPost ? "post" : "poll"}: </Typography>

                <FormControl size="small">
                    <InputLabel id="select-type">Type</InputLabel>
                    <Select
                    id="select-type"
                    label="Type"
                    value={isPost}
                    onChange={(evt) => {console.log("ran"); setIsPost(evt.target.value) }}
                    >
                        <MenuItem value={true}>Post</MenuItem>
                        <MenuItem value={false}>Poll</MenuItem>
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
                            {pollOptions.map((option, idx) => <FormControlLabel control={<Radio/>} key={idx} value={option} label={option}></FormControlLabel>)}
                        </RadioGroup>
                    </div></> : <></> }


                <BasicButton bg="primary" sx={{width: "20%"}} onClick={handleSubmit}>Add {isPost ? "post" : "poll"}</BasicButton>
            </Paper>
        </Container>
        </>
    )

}

export default AddPost;