// for search related data
// search, searchFilter, skills, interests, communities
    // skills, ints, communities to be loaded for relevant pages (Feed and Search)
    // try to wait until loaded
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabaseClient';

const initialState = {
    search: '', // search input
    searchFilter:  '',    // 'Show All' || 'Show Projects' || 'Show Users' || ('Show All'/ anything else),
    unique_skills: null,
    unique_interests: null,
    unique_communities: null, // null: not loaded
    loading: 'idle' // 'idle' | 'pending' | 'fulfilled' | 'error'
}


async function obtainTags(tag) {
    const { data, error } = await supabase
      .from(tag)
      .select("name")
      .is("in_login", true);
    return data;
  }


export const getUniqueTags = createAsyncThunk('search/getUniqueTags', async() => {
    const unique_skills = (await obtainTags("unique_skills")).map(d => d.name);
    const unique_interests = (await obtainTags("unique_interests")).map(d => d.name);
    const unique_communities = (await obtainTags("unique_communities")).map(d => d.name);
    return { unique_skills, unique_interests, unique_communities }
      
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        // copy action.payload keys into slice
        // assume it has search, searchFilter or both
        update: (state, action) => {
            for (const [key,val] of Object.entries(action.payload)) {
                state[key] = val;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUniqueTags.pending, (state, _) => {
            state.loading = 'pending';
        })
        .addCase(getUniqueTags.rejected, (state, _) => {
            state.loading = 'error';
        })
        .addCase(getUniqueTags.fulfilled, (state, action) => {
            state.fulfilled = 'fulfilled';
            console.log("Unique tags", action.payload);
            for (const [key,val] of Object.entries(action.payload)) {
                state[key] = val;
            }
        })
    }
})

export default searchSlice.reducer;