import React from "react";
import logo from "./logo.svg";
import SignIn from "./features/sign_in/SignIn";
import RegistrationTags from "./features/Registration_Tags/RegistrationTags";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Authenticated from "./components/Authenticated";
import * as Sentry from "@sentry/react";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    // also updates when there's a change in user but still logged in e.g USER_UPDATED
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // if user exists (i.e a sign in or sign up is happening) then update redux store with user profile data
    });
  }, []);

  return (
    <div>{!session ? <SignIn /> : <Authenticated session={session} />}</div>
  );
}

// DISABLE ADBLOCKER FOR SENTRY TO WORK
export default Sentry.withProfiler(App);
