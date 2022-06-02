import { Center } from "@chakra-ui/react";
import { Divider, FormGroup, FormLabel, Grid, Paper, RadioGroup, Stack, TextField, Typography } from "@mui/material";
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
import { Box } from "@mui/system";
import RadioWithLabel from "../../components/RadioWithLabel";
import BasicButton from "../../components/BasicButton";
import { Email, Telegram } from "@mui/icons-material";

function AddProject() {
    const { state } = useLocation();
    const parentId = state?.parentId;
    const parent = useSelector((state) => selectProjectById(state, parentId));

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
        {/* LocalizationProvider and dateAdapter necc. for date pickers to work */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BasicNavBar/>
            <Container className={styles.container} maxWidth="md">
                <Center>
                    <Typography variant='h5' sx={{fontWeight: "bold"}}>Add project</Typography>
                </Center>

                <Center>
                    <Typography sx={{mb:1}}variant='subtitle1'>
                        {parent ? `Parent project: ${parent.title}` : 'as root project'}
                    </Typography>
                </Center>


                <Paper className={styles.paper} elevation={3}>
                    <Center>
                        <Stack direction="row" sx={{mt:1, width: "80%"}}>
                            <BasicTextField
                            label="Title"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{mr:3, width: "50%"}}
                            />

                            <BasicTextField
                            label="Bio"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{width: "50%"}}
                            />      
                        </Stack>
                    </Center>
                    
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
                            label="Interests"
                            selectedTags={[]}
                            setSelectedTags={() => {}}
                            />    

                            <Checkmarks
                            newTags={["One", "Two", "Three"]}
                            label="Communities"
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
                            renderInput={(params) => <TextField {...params} size="small"/>}
                            />

                            <DatePicker
                            label="End date"
                            value={endDate}
                            onChange={(newValue) => {
                            setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} size="small"/>}
                            />
                        </Stack>
                    </Center>

                    <Center>
                        <Stack direction="row" sx={{mt:1, width: "70%"}}>
                            <BasicTextField
                            label="Telegram"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{mr:3, width: "50%"}}
                            icon={<Telegram />}
                            />

                            <BasicTextField
                            label="Email"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{width: "50%"}}
                            icon={<Email/>}
                            />      
                        </Stack>
                    </Center>

                    <Box sx={{display:"flex", flexDirection:"row", justifyContent: "space-between"}}>
                        <Box 
                            mt={2}
                            sx={{
                            flex:1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            ml:7
                            }}
                        >
                            <FormLabel>
                            <Typography variant="h6" color="black">
                                Telegram visibility:
                            </Typography>
                            </FormLabel>

                            <RadioGroup
                            //   row
                            //   value={contact.email_visibility}
                            //   onChange={radioChange}
                            //   name="email_visibility"
                            >
                            <RadioWithLabel value="afterlink" label="Only after linking" />
                            <RadioWithLabel value="everyone" label="Everyone" />
                            </RadioGroup>
                        </Box>

                        <Box
                            mt={2}
                            sx={{
                            flex:1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mr:7
                            }}
                        >
                            <FormLabel>
                            <Typography variant="h6" color="black">
                                Email visibility:
                            </Typography>
                            </FormLabel>

                            <RadioGroup
                            //   row
                            //   value={contact.email_visibility}
                            //   onChange={radioChange}
                            //   name="email_visibility"
                            >
                            <RadioWithLabel value="afterlink" label="Only after linking" />
                            <RadioWithLabel value="everyone" label="Everyone" />
                            </RadioGroup>
                        </Box>
                    </Box>
                    
                    <Center>
                        <BasicButton bg="primary" sx={{width:"40%", mt:2}}>Start Linking!</BasicButton>
                    </Center>
                </Paper>
            </Container>
        </LocalizationProvider>
        </>
    )
}

export default AddProject;