import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
import { supabase } from '../../supabaseClient';

// Use this slice for both storing Feed recommendations and for Links page
  // why: when in Feed and someone clicks one of the buttons it has to be removed, don't want to reload upon click
  // but same thing for Links page and its the same type of data (just different API call)
  // added benefit: load all links of the active user upon feed load, then to set email/tele visibility just use links sliice
    // no need to make N+1 queries for tele/email vis


// structure for one entity: { ...link } from links table
    // type Link = {
    //     s_n:bigint,
    //     uid_sender:uuid,
    //     uid_receiver:uuid,
    //     pid_sender:bigint,
    //     pid_receiver:bigint,
    //     accepted:Boolean,
    //     rejected:Boolean,
    //     created_at:timestamp
    // }

// Structure of entire slice:   
//   {
//       ids: [...],
//       entities: [link_id: {...}, link_id: {...}, ],
//       loading: 'idle' | 'pending' | 'fulfilled' | 'error'
//   }

const linksAdapter = createEntityAdapter({
    selectId: (link) => link.s_n,
    // bigger dates first -> most recent first
    // necessary because users and projects are queried separately
    sortComparer: (a,b) => new Date(b.created_at) - new Date(a.created_at)
});

// TODO: replace with call to Django API
export const getFeedLinks = createAsyncThunk('links/getFeedLinks', async() => {
    try {
        const { data:projects, error } = await supabase 
            .from('projects')
            .select(`
            *,
            user_skills (
                name
            ),
            user_interests(
                name
            ),
            user_communities!fk_pid(
                name
            )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const { data:users, error:userErr } = await supabase
                .from('users')
                .select(`
                *,
                user_skills (
                    name
                ),
                user_interests(
                    name
                ),
                user_communities(
                    name
                )
                `)
                .limit()
                .order('created_at', { ascending: false });

        if (error) throw error;

        return users.concat(projects);
                
    } catch (error) {
        console.log("Error in getFeedLinks", error);
    } 
});


// Create slice
const linksSlice = createSlice({
    name: 'links',
    initialState: linksAdapter.getInitialState({
        loading: 'idle'
    }),
    extraReducers: builder => {
        builder
        .addCase(getFeedLinks.pending, (state, action) => {
            state.loading = 'pending';
        })
        .addCase(getFeedLinks.rejected, (state, action) => {
            state.loading = 'error';
        })
        .addCase(getFeedLinks.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            linksAdapter.upsertMany(state, action.payload);
        })
    }

});

export default linksSlice.reducer;