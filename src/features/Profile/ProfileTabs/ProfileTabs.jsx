import { ButtonGroup, Typography } from "@mui/material";
import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { CardListFromSource, PostListFromSource } from "./ListFromSource";
import { establishedLinksSource, followersSource, followingSource, postsSource } from "./DataSources";
import useIdObject from "../../../components/hooks/useIdObject";
import { useDispatch } from "react-redux";
import { getLinks } from "../../Links/linksSlice";
import { getFollowed } from "../../followers/followerSlice";
import { CardList } from "../../components/ProfileCardList/ProfileCardList";
import { Email, Telegram } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectLinkById } from "../../Links/linksSlice";
import contactVisibility from "../../../components/constants/contactVisibility";
import StatusTag from "../../../components/StatusTag";

// user: the user / project for this profile
function ProfileTabs({ user, isPublic }) {
    const [selected, setSelected] = useState(0);
    useEffect(() => {
        setSelected(0);
    }, [user])
    const dispatch = useDispatch();
    const idObj = useIdObject();

    const isProject = "pid" in user;
        // get link in slice if present
    const linkinSlice = useSelector((state) =>
        selectLinkById(state, isProject ? user.pid : user.id)
    );

    let { showEmail, showTele } = contactVisibility(user, linkinSlice);
    showEmail = showEmail || !isPublic; // if own profile just show
    showTele = showTele || !isPublic; 

    // Lazy evaluation for tabs
    const BioTab = () => {
        return (
        <>
            <Center style={{marginTop:2, marginBottom: 5}}>
                <Typography variant="h5">{user.bio}</Typography>
            </Center>
            
            
            { showEmail ? <Center style={{marginTop:2}}>
                <Email sx={{mr: 1}}/>
                <Typography variant="subtitle1">{user.email}</Typography>
            </Center> : <></> }

            { showTele ? <Center style={{marginTop:2}}>
                <Telegram sx={{mr:1}}/>
                <Typography variant="subtitle1">{user.telegram}</Typography>
            </Center> : <></> }

            
        </>
        )
    }
    const LinksTab = () => <CardListFromSource sourceFn={() => establishedLinksSource(user)}/>;
    const FollowingTab = () => <CardListFromSource sourceFn={() => followingSource(user)} />;
    const PostsTab = () => <PostListFromSource sourceFn={() => postsSource(user)}/>;
    const FollowersTab = () => <CardListFromSource sourceFn={() => followersSource(user)}/>

    // get current links and projects followed so profile card can change accordingly
    useEffect(() => {
        dispatch(getLinks(idObj));
        dispatch(getFollowed(idObj));
    }, [])

    const tags = {
        0: { name: "Bio", component: BioTab },
        1: { name: "Links", component: LinksTab },
        2: { name: "Posts", isProject: true, component: PostsTab },
        3: { name: "Followers",  isProject: true , component: FollowersTab},
        4: { name: "Following", component: FollowingTab } 
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
        
        { tags[selected].component() }
        </div>
    )
}

export default ProfileTabs;