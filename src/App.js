import React from "react";
import logo from "./logo.svg";
import SignIn from "./features/sign_in/SignIn";
import RegistrationTags from "./features/Registration_Tags/RegistrationTags";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
	  setSession(supabase.auth.session());

	  supabase.auth.onAuthStateChange((_event, session) => {
		  setSession(session);
	  });
  }, []);

  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;
