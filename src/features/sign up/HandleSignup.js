import { supabase } from "../../supabaseClient";

export function HandleSignup({ email, password, setLoading }) {
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;
      // console.log(user);
      alert("Success!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };
}
