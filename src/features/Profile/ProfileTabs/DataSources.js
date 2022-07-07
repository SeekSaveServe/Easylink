
import { supabase } from "../../../supabaseClient";
import { getFollowedProjectsForUser } from "../../followers/followerSlice";
import { getAssociatedUser } from "../../Links/linksSlice";
const isUserFn = (user) => "id" in user;
const selectIdFn = (user) => isUserFn(user) ? user.id : user.pid;

// get all ESTABLISHED linked users for the user
// returns array of users / projects (augmented with link info)
export async function establishedLinksSource(user) {
    const isUser = isUserFn(user);
    const prefix = isUser ? "uid" : "pid";
    const selectId = selectIdFn(user);

    try {
        // get all links with current uid/pid as sender or receiver - all relevant links
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .or(`${prefix}_sender.eq.${selectId},${prefix}_receiver.eq.${selectId}`)
            .is('accepted', true)
        
        if (error) throw error;
        
        const linkedUsers = await Promise.all(data.map(link => getAssociatedUser(link, prefix, selectId)));
        return linkedUsers;
    } catch (error) {
        console.log("linksSource err:", error);
    }
    
}

// get all projects that this user is following: Promise<[super Project]>
export async function followingSource(user) {
    return getFollowedProjectsForUser(isUserFn(user), selectIdFn(user));
}

// get all posts this project made
export async function postsSource(project) {
    
}