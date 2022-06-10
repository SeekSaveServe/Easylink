import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, replace } from "../../features/user/userSlice";

// Redirects to sign in page if the user is not logged in
// https://www.robinwieruch.de/react-router-private-routes/
const ProtectedRoute = ({ children, redirectRoute = "/", active }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);

  const projects = useSelector(state => state.projects);

  // return true if project was loaded else false
  const getProjectProfile = () => {
    const currProject = sessionStorage.getItem("currProject");
    if (!currProject) return false; // no curr project cached

    // there is a pid - check if it exists in projects.entities (e.g after delete of the proj or ancestor and its gone)
    const { pid } = JSON.parse(currProject);
    const exists = pid in projects.entities;
    if (!exists) return false;

    // there is a pid and it exists - replace userSlice with project data
    const cachedProject = projects.entities[pid]

    dispatch(
      replace({...cachedProject, isProject: true})
    )

    return true;

  }

  useEffect(() => {
    setSession(supabase.auth.session());

    // also updates when there's a change in user but still logged in e.g USER_UPDATED
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // if user exists (i.e a sign in or sign up is happening) then update redux store with user profile data
    });

    if (supabase.auth.session()?.user) {
      const projectLoaded = getProjectProfile();
      if (!projectLoaded) {
        dispatch(getUserProfile(supabase.auth.user().id))
      }
    }
    
  }, [projects]);

  if (!session) {
    // TODO: Navigate component causes recursion issue, but below goes to blank page instead of redirect
    navigate(redirectRoute, { replace: true});
    return;
  }

  return children;
};
export default ProtectedRoute;
