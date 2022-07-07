import { ButtonGroup, Typography } from "@mui/material";
import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import CardListFromSource from "./CardListFromSource";
import { establishedLinksSource } from "./DataSources";
import useIdObject from "../../../components/hooks/useIdObject";
import { useDispatch } from "react-redux";
import { getLinks } from "../../Links/linksSlice";
import { getFollowed } from "../../followers/followerSlice";

// user: the user / project for this profile
function ProfileTabs({ user }) {
    const [selected, setSelected] = useState(0);
    const dispatch = useDispatch();
    const idObj = useIdObject();

    // Lazy evaluation for tabs
    const BioTab = () => {
        return <Center><Typography variant="h5">{user.bio}</Typography></Center>
    }

    const LinksTab = () => <CardListFromSource sourceFn={() => establishedLinksSource(user)}/>


    // get current links and projects followed so profile card can change accordingly
    useEffect(() => {
        dispatch(getLinks(idObj));
        dispatch(getFollowed(idObj));
    })

    const tags = {
        0: { name: "Bio", component: BioTab },
        1: { name: "Links", component: LinksTab },
        2: { name: "Posts", isProject: true, component: () => <Typography variant="h5">Posts {console.log("Posts show")}</Typography> },
        3: { name: "Followers",  isProject: true , component: () => <Typography variant="h5">Followers {console.log("Followers show")}</Typography>},
        4: { name: "Following", component: () => <Typography variant="h5">Following {console.log("Following show")}</Typography> },
    };

    function showTabs() {
        const isProject = "pid" in user;
        const arr = [];
        
        for (const [index, data] of Object.entries(tags)) {
            const hide = data?.isProject && !isProject; // hide if tag is for a project but profile is not a project
            hide ? void 0 : arr.push(<TabButton selected={selected} setSelected={setSelected} key={index} index={index}>{data.name}</TabButton>);
        }

        return arr;
    }
    return (
        <div>
        <Center style={{marginBottom:5}}>
            <ButtonGroup>
                { showTabs() }
            </ButtonGroup>
        </Center>
        
        {/* <Center> */}
        { tags[selected].component() }
        {/* </Center> */}
        </div>
    )
}

export default ProfileTabs;