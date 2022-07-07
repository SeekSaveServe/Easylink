import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
import { supabase } from '../../supabaseClient';
import updateHelper from '../../components/constants/updateHelper';

// Use to store followed projects -> facilitate posts and card check

// store followers rows directly. only need access to followed_pid to get posts on feed page

// use uid/pid as id to store entities -> O(1) lookup
const followerAdapter = createEntityAdapter({
    selectId: entity => entity?.followed_pid || entity?.followed_uid
})

// get projects being followed - so we can change the follow button as needed
export const getFollowed = createAsyncThunk('followers/getFollowed', async(idObj) => {
    const isUser = "uid" in idObj;
    const suffix = isUser ? "uid" : "pid";
    const selectId = isUser ? idObj.uid : idObj.pid;

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