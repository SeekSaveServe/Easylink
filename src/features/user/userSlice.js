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
            //TODO: potential bug if user object has extra entries not in retrieved user
            for (const [key, val] of Object.entries(action.payload)) {
                state[key] = val
            }

        })
    }
})

export const { update } = userSlice.actions;



export default userSlice.reducer;