
import { supabase } from "../../../supabaseClient";
import { getAssociatedUser } from "../../Links/linksSlice";

// get all ESTABLISHED linked users for the user
// returns array of users / projects (augmented with link info)
export async function establishedLinksSource(user) {
    const isUser = "id" in user;
    const prefix = isUser ? "uid" : "pid";
    const selectId = isUser ? user.id : user.pid;

    try {
        // get all links with current uid/pid as sender or receiver - all relevant links
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .or(`${prefix}_sender.eq.${selectId},${prefix}_receiver.eq.${selectId}`)
        
        if (error) throw error;
        
        const linkedUsers = await Promise.all(data.map(link => getAssociatedUser(link, prefix, selectId)));
        return linkedUsers.filter(row => row.established);
    } catch (error) {
        console.log("linksSource err:", error);
    }
    
}