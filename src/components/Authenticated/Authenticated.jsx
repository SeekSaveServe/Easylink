import { useEffect } from "react";
import { supabase } from '../../supabaseClient';
import { useDispatch } from 'react-redux';
import Feed from "../../features/feed";
import { getUserProfile } from "../../features/user/userSlice";
import { Navigate } from "react-router-dom";


// change landing page if necc.
function Authenticated({ session }) { 
    return (
        <>
            <Navigate to="/feed" replace={true}/>
        </>
    )
}

export default Authenticated;