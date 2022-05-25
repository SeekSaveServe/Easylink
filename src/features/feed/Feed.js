import { useRef } from "react";
import BasicButton from "../../components/BasicButton";
import { supabase } from '../../supabaseClient';


function Feed() {
    const signOut = async() => {
        await supabase.auth.signOut();
    }
    return (
        <div>
            <div>This is just a test Feed</div>
            <BasicButton onClick={signOut} bg="primary" sx={{width: "300px"}}>Sign Out</BasicButton>
        </div>
    )
}

export default Feed;