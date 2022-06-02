import { Center } from "@chakra-ui/react";
import { Divider, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BasicNavBar from "../../components/BasicNavBar/BasicNavBar";
import styles from './Projects.module.css';
import { selectProjectById } from "./projectsSlice";
import BasicTextField from "../../components/Basic Textfield";
import Checkmarks from "../../components/Checkmarks";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { useState } from "react";
import { Flex, Spacer } from "@chakra-ui/react";

function AddProject() {
    const { state } = useLocation();
    const parentId = state?.parentId;
    const parent = useSelector((state) => selectProjectById(state, parentId));

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    <Center>
                        <TextField label="Title" type="text" margin="normal" size="small" sx={{width:"80%"}}/>
                    </Center>

                    <Center>
                        <TextField label="Bio" type="text" margin="normal" size="small" sx={{width:"80%"}} multiline/>
                    </Center>
                    
                    <Divider />
                    
                    <Center>
                        <FormGroup sx={{width: "90%", mt:1}}>
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
                        </FormGroup>
                    </Center>

                    <Center>
                        <Stack direction="row" spacing={3} sx={{mt:1}}>
                            <DatePicker
                            label="Start date"
                            value={startDate}
                            onChange={(newValue) => {
                            setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            />

                            <DatePicker
                            label="End date"
                            value={endDate}
                            onChange={(newValue) => {
                            setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </Stack>
                    </Center>

                    <Center>
                        <Stack direction="row" sx={{mt:1, width: "70%"}}>
                            <BasicTextField
                            label="Telegram"
                            type="text"
                            margin="normal"
                            sx={{mr:3, width: "50%"}}
                            />

                            <BasicTextField
                            label="Email"
                            type="text"
                            margin="normal"
                            sx={{width: "50%"}}
                            />      
                        </Stack>
                    </Center>

                    
                  
                </Paper>
            </Container>
        </LocalizationProvider>
        </>
    )
}

export default AddProject;