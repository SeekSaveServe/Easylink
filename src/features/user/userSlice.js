import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // action.payload should contain new values
        update: (state, action) => {
            // state = {...state, ...action.payload};
            for (const [key, val] of Object.entries(action.payload)) {
                state[key] = val
            }
            // state['name'] = action.payload['name'];
            console.log(state);
        }
    }
})

export const { update } = userSlice.actions;

export default userSlice.reducer;