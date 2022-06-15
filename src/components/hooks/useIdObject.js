// convenience hook to return object with { pid } or { uid } depending on user slice
import { useSelector } from 'react-redux';
import { supabase } from '../../supabaseClient';

function useIdObject() {
    const user = useSelector(state => state.user);
    return user?.isProject ? { pid:  user.pid } : { uid: supabase.auth.user().id };
}  

export default useIdObject;