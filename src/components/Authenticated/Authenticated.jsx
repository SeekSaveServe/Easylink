import { useEffect } from "react";
import { supabase } from '../../supabaseClient';
import { useDispatch } from 'react-redux';
import Feed from "../../features/feed";
import { getUserProfile } from "../../features/user/userSlice";
import { Navigate } from "react-router-dom";


// Wrapper component around pages to show in Authenticated state to facilitate fetching common data
// so we don't have to repeat useEffect
    // e.g user profile, projects, links
function Authenticated({ session }) { 
    const dispatch = useDispatch();

    useEffect(() => {
        const authUser = supabase.auth.user(); // user definitely exists since logged in
        dispatch(getUserProfile(authUser.id));
    }, [dispatch, session])

    return (
        <>
            <Navigate to="/feed" replace={true}/>
        </>
    )
}

export default Authenticated;