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
import UploadAvatar from "../components/UploadAvatar";
import BasicLoadingButton from "../../components/BasicLoadingButton/BasicLoadingButton";
import { supabase } from "../../supabaseClient";

function AddProject() {
    const { state } = useLocation();
    const parentId = state?.parentId;
    const parent = useSelector((state) => selectProjectById(state, parentId));
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [selectedCommunities, setSelectedCommunities] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [telegram, setTelegram] = useState("");
    const [email, setEmail] = useState("");
    const [teleVisibility, setTeleVisibility] = useState("afterlink");
    const [emailVisibility, setEmailVisibility] = useState("afterlink");

    const onClick = () => {
        // only username missing
        const state = {
            parent_id: parentId ? parseInt(parentId): null,
            uid: supabase.auth.user().id,
            avatar_url: avatarUrl,
            title,
            bio,
            selectedSkills,
            selectedInterests,
            selectedCommunities,
            start_date: startDate,
            end_date: endDate,
            telegram,
            email,
            telegram_visibility: teleVisibility,
            email_visibiliity: emailVisibility,

        }
        console.log(state);
    }

    return (
        <>
        {/* LocalizationProvider and dateAdapter necc. for date pickers to work */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BasicNavBar/>
            <Container className={styles.container} maxWidth="md">
                <Center style={{marginBottom: 5}}>
                    <Typography variant='h5' sx={{fontWeight: "bold", mr: 2}}>Add project: </Typography>
                    <Typography variant='subtitle1'>
                        {parent ? `Parent project - ${parent.title}` : 'as root project'}
                    </Typography>
                </Center>

                <Paper className={styles.paper} elevation={3}>
                    <Center>
                        <UploadAvatar
                            size={70}
                            url={avatarUrl}
                            onUpload={
                                (url) => setAvatarUrl(url)
                            }
                            ButtonProps={{
                                sx:{padding: "0.3rem", marginTop: "0.2rem"},
                            }}
                        />
                    </Center>

                    <Center>
                        <Stack direction="row" sx={{mt:1, width: "80%"}}>
                            <BasicTextField
                            label="Title"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{mr:3, width: "50%"}}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />

                            <BasicTextField
                            label="Bio"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{width: "50%"}}
                            onChange={(e) => setBio(e.target.value)}
                            />      
                        </Stack>
                    </Center>
                    
                    <Center>
                        <FormGroup sx={{width: "90%", mt:1}}>
                            <Checkmarks
                            newTags={["One", "Two", "Three"]}
                            label="Skills"
                            selectedTags={selectedSkills}
                            setSelectedTags={setSelectedSkills}
                            />  

                            <Checkmarks
                            newTags={["One", "Two", "Three"]}
                            label="Interests"
                            selectedTags={selectedInterests}
                            setSelectedTags={setSelectedInterests}
                            />    

                            <Checkmarks
                            newTags={["One", "Two", "Three"]}
                            label="Communities"
                            selectedTags={selectedCommunities}
                            setSelectedTags={setSelectedCommunities}
                            />        
                        </FormGroup>
                    </Center>

                    <Center className={styles.date_center}>
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
                            value={telegram}
                            onChange={(evt) => setTelegram(evt.target.value)}
                            />

                            <BasicTextField
                            label="Email"
                            type="text"
                            margin="normal"
                            size="small"
                            sx={{width: "50%"}}
                            icon={<Email/>}
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            />      
                        </Stack>
                    </Center>

                    <Box sx={{display:"flex", flexDirection:"column", justifyContent: "center"}}>
                        <Box 
                            mt={1}
                            sx={{
                            flex:1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            }}
                        >
                            <FormLabel>
                                <Typography variant="h6" color="black" sx={{mr: 2}}>
                                    Telegram visibility:
                                </Typography>
                            </FormLabel>

                            <RadioGroup
                              row
                              value={teleVisibility}
                              onChange={(evt) => setTeleVisibility(evt.target.value)}
                            >
                            <RadioWithLabel value="afterlink" label="Only after linking" />
                            <RadioWithLabel value="everyone" label="Everyone" />
                            </RadioGroup>
                        </Box>

                        <Box 
                            mt={0}
                            sx={{
                            flex:1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            }}
                        >
                            <FormLabel>
                                <Typography variant="h6" color="black" sx={{mr: 2}}>
                                    Email visibility:
                                </Typography>
                            </FormLabel>

                            <RadioGroup
                              row
                              value={emailVisibility}
                              onChange={(evt) => setEmailVisibility(evt.target.value)}
                            >
                            <RadioWithLabel value="afterlink" label="Only after linking" />
                            <RadioWithLabel value="everyone" label="Everyone" />
                            </RadioGroup>
                        </Box>

                    
                    </Box>
                    
                    <Center>
                        <BasicLoadingButton bg="primary" sx={{width:"40%", mt:1}} onClick={onClick} loading={loading}>Start Linking!</BasicLoadingButton>
                    </Center>
                </Paper>
            </Container>
        </LocalizationProvider>
        </>
    )
}

export default AddProject;