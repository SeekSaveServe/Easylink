import { Center } from "@chakra-ui/react";
import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';

function AddProject() {
    const { state } = useLocation();
    const parent = state?.project;
    
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
                Lol
            </Paper>
        </Container>
        </>
    )
}

export default AddProject;