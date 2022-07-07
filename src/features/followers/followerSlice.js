import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
import { supabase } from '../../supabaseClient';
import updateHelper from '../../components/constants/updateHelper';
import { projReq } from '../../components/constants/requestStrings';
// Use to store followed projects -> facilitate posts and card check

// store followers rows directly. only need access to followed_pid to get posts on feed page

// use uid/pid as id to store entities -> O(1) lookup
const followerAdapter = createEntityAdapter({
    selectId: entity => entity?.followed_pid || entity?.followed_uid
})

// get array of projects that the user is following
export const getFollowedProjectsForUser = async(isUser, selectId) => {
    const suffix = isUser ? "uid" : "pid";
    try {
        // include user_skills,ints, comms for each requested project using projReq
        const { data, error } = await supabase
            .from('followers')
            .select(`
            s_n,
            projects!followers_followed_pid_fkey(
               ${projReq}
            )
            `)
            .match({
                [`follower_${suffix}`]: selectId
            })
        
        if (error) throw error;
        
        // each member of data looks like { s_n, projects: {} }
        // convert to just projects objects
        let returnedData =  data.map(d => d.projects);
        console.log("Get followed succ", returnedData);
        return returnedData;

    } catch (error) {
        console.log("Get followed err", error);
    }

}

// isUser: true/false, selectId: either pid or uid
// function gets only the followers table rows, not the projects themselves
    // so that we can use this slice to check if a particular project is being followed, etc.
export const getFollowedForUser = async(isUser, selectId) => {
    const suffix = isUser ? "uid" : "pid";

    try {
        const { data, error } = await supabase
            .from('followers')
            .select('*')
            .match({
                [`follower_${suffix}`]: selectId
            })
        
        if (error) throw error;
        console.log("Get followed succ", data);

        return data;
    } catch (error) {
        console.log("Get followed err", error);
    }
}
// get projects being followed - so we can change the follow button as needed
export const getFollowed = createAsyncThunk('followers/getFollowed', async(idObj) => {
    const isUser = "uid" in idObj;
    const selectId = isUser ? idObj.uid : idObj.pid;
    return getFollowedForUser(isUser, selectId);
})


const followerSlice = createSlice({
    name: 'followed',
    initialState: followerAdapter.getInitialState({
        loading: 'idle'
    }),
    extraReducers: builder => {
        builder.addCase(getFollowed.pending, (state, action) => {
            state.loading = 'pending';
        })
        .addCase(getFollowed.rejected, (state, action) => {
            state.loading = 'error';
        })
        .addCase(getFollowed.fulfilled, (state, action) => {
            console.log("Get follow payload", action.payload);
            updateHelper({ ids: [], entities: {}, loading: 'fulfilled'}, state);
            followerAdapter.upsertMany(state, action.payload);
        })
    }

})

export default followerSlice.reducer;

export const {
    selectAll: selectAllFollowed,
    selectById: selectFollowedById
} = followerAdapter.getSelectors((state) => state.followers)

// if pid is 0, !pid is true (but pid should start at 1)
export function isFollowing(state, pid) {
    if (!pid) return false;
    return state?.followers?.entities[pid] != undefined;
}   