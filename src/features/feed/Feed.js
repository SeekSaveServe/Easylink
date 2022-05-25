import BasicButton from "../../components/BasicButton";
import { supabase } from '../../supabaseClient';
import { useSelector } from 'react-redux';

function Feed() {
    const userProfile = useSelector(state => state.user);

    const signOut = async() => {
        await supabase.auth.signOut();
    }
    return (
        <div>
            <h1>Welcome, {userProfile.username}</h1>
            <h2>Your telegram is: {userProfile.telegram}</h2>
            <div>This is just a test Feed</div>
            <BasicButton onClick={signOut} bg="primary" sx={{width: "300px"}}>Sign Out</BasicButton>
        </div>
    )
}

export default Feed;