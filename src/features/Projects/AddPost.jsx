import { Center } from "@chakra-ui/react";
import { MenuItem, Paper, RadioGroup, Select, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import RadioWithLabel from "../../components/RadioWithLabel";
import styles from './Projects.module.css';
import { useState } from "react";
import { InputLabel, FormControl } from "@mui/material";

function AddPost() {
    const [isPost, setIsPost] = useState(true);
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
            
            <Paper elevation={3} className={styles.paper}>
                lol
            </Paper>
        </Container>
        </>
    )

}

export default AddPost;