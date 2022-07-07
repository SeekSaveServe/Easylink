
import { postsReqWithProject } from "../../../components/constants/requestStrings";
import { supabase } from "../../../supabaseClient";
import { getFollowedProjectsForUser, getFollowersForProject } from "../../followers/followerSlice";
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

// get all posts this project made - augment posts with needed project info
export async function postsSource(project) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select(postsReqWithProject)
            .match({ pid: project.pid })
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.log("Error fetching posts in Profile:", error);
    }
}

// get followers for the project: array of user / project objects
export async function followersSource(project) {
    return getFollowersForProject(project.pid);
}