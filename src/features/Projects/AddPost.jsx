import { Center } from "@chakra-ui/react";
import { MenuItem, Paper, RadioGroup, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import RadioWithLabel from "../../components/RadioWithLabel";
import styles from './Projects.module.css';
import { useState } from "react";
import { InputLabel, FormControl } from "@mui/material";
import BasicTextField from "../../components/Basic Textfield";
import BasicButton from "../../components/BasicButton";

function AddPost() {
    const [isPost, setIsPost] = useState(true);
    const [description, setDescription] = useState("");

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

                <BasicButton bg="primary" sx={{width: "20%"}}>Add {isPost ? "post" : "poll"}</BasicButton>
            </Paper>
        </Container>
        </>
    )

}

export default AddPost;