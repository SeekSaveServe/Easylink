import { Center } from "@chakra-ui/react";
import { Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { selectProjectById } from "./projectsSlice";
import BasicTextField from "../../components/Basic Textfield";
import Checkmarks from "../../components/Checkmarks";

function AddProject() {
    const { state } = useLocation();
    const parentId = state?.parentId;
    const parent = useSelector((state) => selectProjectById(state, parentId));

    return (
        <>
        <BasicNavBar/>
        <Container className={styles.container} maxWidth="md">
            <Center>
                <Typography variant='h5' sx={{fontWeight: "bold"}}>Add project</Typography>
            </Center>

            <Center>
                <Typography sx={{mb:2}}variant='subtitle1'>
                    {parent ? `Parent project: ${parent.title}` : 'as root project'}
                </Typography>
            </Center>


            <Paper className={styles.paper} elevation={3}>
                <BasicTextField
                label="Title"
                type="text"
                margin="normal"
                />

                <BasicTextField
                label="Bio"
                type="text"
                margin="normal"
                />

                <Checkmarks
                newTags={["One", "Two", "Three"]}
                label="Skills"
                selectedTags={[]}
                setSelectedTags={() => {}}
                />  

                <Checkmarks
                newTags={["One", "Two", "Three"]}
                label="Skills"
                selectedTags={[]}
                setSelectedTags={() => {}}
                />    

                <Checkmarks
                newTags={["One", "Two", "Three"]}
                label="Skills"
                selectedTags={[]}
                setSelectedTags={() => {}}
                />        

            </Paper>
        </Container>
        </>
    )
}

export default AddProject;