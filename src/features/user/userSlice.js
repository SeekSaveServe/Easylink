import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';
import { userReq } from '../../components/constants/requestStrings';
import { formatProfileDatum } from '../../components/constants/formatProfileDatum';
import updateHelper from '../../components/constants/updateHelper';

// Async Thunks

export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async(uuid) => {
        const { data: userProfile, error } = await supabase
        .from('users')
        .select(userReq)
        .eq('id', uuid)
        .single();

        if (error) {
            throw error;
        } 
        return formatProfileDatum(userProfile);
    }
)

const initialState = {
    loading: 'idle',
    user_skills: [],
    user_interests: [],
    user_communities: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // action.payload should contain new values
        // update inserts new values from action.payload into user
        update: (state, action) => {
            for (const [key, val] of Object.entries(action.payload)) {
                state[key] = val
            }
        },

        // replace user with object from action.payload completely 
        // any keys in user not in object are deleted
        replace: (state, action) => {
            updateHelper(action.payload, state);
        },

        // action.payload: list of keys to delete
        // remove the keys entirely from user slice
        deleteKeys: (state, action) => {
            console.log("To del", action.payload);
            for (const key of action.payload) {
                delete state[key];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            //TODO: potential bug if user object has extra entries not in retrieved user
            // for (const [key, val] of Object.entries(action.payload)) {
            //     state[key] = val
            // }
            state.loading='f'
            updateHelper(action.payload, state);

        })
    }
})

export const { update, replace, deleteKeys } = userSlice.actions;

export const getUser = (state) => state.user;

export const userLoaded = (state) => "id" in state.user || "pid" in state.user;


export default userSlice.reducer;