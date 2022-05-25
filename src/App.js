import React from "react";
import logo from "./logo.svg";
import SignIn from "./features/sign_in/SignIn";
import RegistrationTags from "./features/Registration_Tags/RegistrationTags";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Feed from "./features/feed";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
	  setSession(supabase.auth.session());

    // also updates when there's a change in user but still logged in e.g USER_UPDATED
	  supabase.auth.onAuthStateChange((_event, session) => {
		  setSession(session);
	  });
  }, []);

  return (
    <div>
      {!session ? <SignIn /> : <Feed /> }
    </div>
  );
}

export default App;
