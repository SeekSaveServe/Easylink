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
            console.log("Error from async");
            throw error;
        } else {
            console.log("User profile:", userProfile);
        }

        return userProfile;
    }
)

const initialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // action.payload should contain new values
        update: (state, action) => {
            for (const [key, val] of Object.entries(action.payload)) {
                state[key] = val
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            for (const [key, val] of Object.entries(action.payload)) {
                state[key] = val
            }

            console.log("User after fulfilled", state);
        })
    }
})

export const { update } = userSlice.actions;



export default userSlice.reducer;