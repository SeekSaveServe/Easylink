import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useDispatch } from 'react-redux';
import { getUserProfile } from "../../features/user/userSlice";


// Redirects to sign in page if the user is not logged in
// https://www.robinwieruch.de/react-router-private-routes/
const ProtectedRoute = ({ children, redirectRoute = "/" }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    // also updates when there's a change in user but still logged in e.g USER_UPDATED
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // if user exists (i.e a sign in or sign up is happening) then update redux store with user profile data
    });

    if (supabase.auth.session()?.user) {
      dispatch(getUserProfile(supabase.auth.user().id))
    }
    
  }, []);

  if (!session) {
    // TODO: Navigate component causes recursion issue, but below goes to blank page instead of redirect
    navigate(redirectRoute, { replace: true});
    return;
  }

  return children;
};
export default ProtectedRoute;
