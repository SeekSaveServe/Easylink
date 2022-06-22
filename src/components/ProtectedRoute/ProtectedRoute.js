import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, replace } from "../../features/user/userSlice";
import { projReq } from "../constants/requestStrings";
import { formatProfileDatum } from "../constants/formatProfileDatum";
// Redirects to sign in page if the user is not logged in
// https://www.robinwieruch.de/react-router-private-routes/
const ProtectedRoute = ({ children, redirectRoute = "/", active }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [session, setSession] = useState(null);

  const projects = useSelector(state => state.projects);

  // return true if project was loaded else false
  const getProjectProfile = async() => {
    const currProject = sessionStorage.getItem("currProject");
    if (!currProject) { 
      return false; // no curr project cached
    }

    // there is a pid - check if it exists in projects.entities (e.g after delete of the proj or ancestor and its gone)
    const { pid } = JSON.parse(currProject);
    const exists = pid in projects.entities;
    let cachedProject = null;

    if (exists) {
      cachedProject = projects.entities[pid]
    }

    else {
      // if not in projects slice, check the DB
        // when projects has not been loaded -> avoid loading all projects just to check e.g when /feed
        // must check since proj could have been deleted
      
      let { data, error } = await supabase
        .from('projects')
        .select(projReq)
        .match({ pid: pid })
        .limit(1)
        .maybeSingle()
      
      data = formatProfileDatum(data);
      
      if (error) {
        throw error;
      }
      
      // if data exists -> cachedProject = data, etc.
      // doesn't exist -> clear sessionStorage, return false
      if (!data) {
        sessionStorage.removeItem("currProject");
        return false;

      } else {
          cachedProject = data;
          console.log("")
      }
    }

    // there is a pid and it exists - replace userSlice with project data
    dispatch(
      replace({...cachedProject, isProject: true})
    )

    return true;

  }

  // function to handle loading: either loads user profile or project profile
  const loadProfile = async() => {
    const projectLoaded = await getProjectProfile();
    if (!projectLoaded) {
      dispatch(getUserProfile(supabase.auth.user().id))
    }
  }

  useEffect(() => {
    setSession(supabase.auth.session());

    // also updates when there's a change in user but still logged in e.g USER_UPDATED
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // if user exists (i.e a sign in or sign up is happening) then update redux store with user profile data
    });

    if (supabase.auth.session()?.user) {
      // const projectLoaded = await getProjectProfile();
      // console.log(projectLoaded);
      // if (!projectLoaded) {
      //   dispatch(getUserProfile(supabase.auth.user().id))
      // }
      loadProfile();
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
