import { Card, CardHeader, CardContent, Typography, Box, Stack, CardMedia } from "@mui/material";
import LinkableAvatar from "../../../components/LinkableAvatar.js";
import styles from './ProfileCard.module.css';
import { useSelector } from "react-redux";
import { getUser } from "../../user/userSlice.js";

function ProfileCard(props) {
    const user = useSelector(getUser);

    return (
        <Card className={styles.card}>
            <Box className={styles.card_content}>
                <CardHeader title="USDevs" subheader="4 days ago" avatar={<div></div>} sx={{mt:0}} />

                    <CardContent sx={{mt:0}}>
                        <Typography variant="h5" sx={{fontSize: "1.4rem"}} gutterBottom> Hello, World </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{fontSize:"1rem"}}>Hi! I love to document the cats of NUS and code! 
                        I am interested in Nature, Software-Development, Photography. My skills are Python, Meowing, Photography</Typography>



                    </CardContent>
            </Box>

            <LinkableAvatar sx={{width: "20%", height: "auto",  borderLeft: "1px solid black" }} variant="square" src={user?.avatar_url} imgProps={{style: {objectFit: "contain"}}}/>

            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/340px-Cat_November_2010-1a.jpg"
                 width="100px"
                 className={styles.img}
                 style={{objectFit: "contain"}}

            /> */}
                    
        </Card>

        
    )
}

export default ProfileCard;