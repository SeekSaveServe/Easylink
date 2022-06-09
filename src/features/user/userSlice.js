import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

// Async Thunks
export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async(uuid) => {
        const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', uuid)
        .single();

        if (error) {
            throw error;
        } 
        return userProfile;
    }
)

const initialState = {};

// after: dest updated to match source exactly
// can't just assign inside redux
function updateHelper(source, dest) {
    for (const [key,val] of Object.entries(source)) {
        dest[key] = val;
    }

    // delete keys in original dest that are not in source
    for (const key of Object.keys(dest)) {
        if (!(key in source)) {
            delete dest[key];
        }
    }
}

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
            console.log("Payload", action.payload);
            console.log("State", state);
            updateHelper(action.payload, state);
        },

        testDelete:(state) => {
            console.log("Test del");
            // delete state['profile_visibility'];
            state = {
                'id': 1,
                'pid':2
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            //TODO: potential bug if user object has extra entries not in retrieved user
            // for (const [key, val] of Object.entries(action.payload)) {
            //     state[key] = val
            // }
            updateHelper(action.payload, state);

        })
    }
})

export const { update, testDelete, replace } = userSlice.actions;

export const getUser = (state) => state.user;


export default userSlice.reducer;