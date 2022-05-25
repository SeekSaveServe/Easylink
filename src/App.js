import React from "react";
import logo from "./logo.svg";
import SignIn from "./features/sign_in/SignIn";
import RegistrationTags from "./features/Registration_Tags/RegistrationTags";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Authenticated from "./components/Authenticated";
// import Feed from "./features/feed";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
	  setSession(supabase.auth.session());
    console.log("init session");
    console.log(session);

    // also updates when there's a change in user but still logged in e.g USER_UPDATED
	  supabase.auth.onAuthStateChange((_event, session) => {
		  setSession(session);
      console.log("Session change");
      console.log(session);
      console.log("User exists", session?.user != undefined);


      // if user exists (i.e a sign in or sign up is happening) then update redux store with user profile data
	  });
  }, []);

  return (
    <div>
      {!session ? <SignIn /> : <Authenticated session={session} /> }
    </div>
  );
}

export default App;
