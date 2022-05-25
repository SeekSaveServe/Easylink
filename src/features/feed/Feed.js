import { useEffect, useRef } from "react";
import BasicButton from "../../components/BasicButton";
import { supabase } from '../../supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from "../user/userSlice";

function Feed() {
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user);
    console.log("Userprofile", userProfile);

    useEffect(() => {
        console.log("Feed useEffect");
        const authUser = supabase.auth.user();
        console.log(authUser);
        dispatch(getUserProfile(authUser.id))
    }, [supabase.auth.user()]);

    

    const signOut = async() => {
        await supabase.auth.signOut();
    }
    return (
        <div>
            <h1>Welcome, {userProfile.username}</h1>
            <h2>Your telegram is: {userProfile.telegram}</h2>
            <div>This is just a test Feed</div>
            <BasicButton onClick={() => dispatch(getUserProfile("0f79239a-9d85-41c9-8fe0-b93e94f8df01"))} bg="secondary" sx={{width: "300px"}}>Fetch</BasicButton>
            <BasicButton onClick={signOut} bg="primary" sx={{width: "300px"}}>Sign Out</BasicButton>
        </div>
    )
}

export default Feed;