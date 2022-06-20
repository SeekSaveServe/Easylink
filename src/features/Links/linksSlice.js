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


// structure for one entity: { ...user/project, s_n: link.s_n, pending: Bool, established: Bool, rejected: Bool, incoming: Bool} from links table
  // store link.s_n for the corresponding link to enable easy generation
// Structure of entire slice:   
//   {
//       ids: [...],
//       entities: [ id/pid: {...}, id/pid: {...}, ],
//       loading: 'idle' | 'pending' | 'fulfilled' | 'error'
//   }

const linksAdapter = createEntityAdapter({
    // use id if user, else use pid
    selectId: (entity) => entity?.id ? entity.id : entity.pid,
});

// function : Link -> Promise<Augmented user/project object to insert into slice>, possibly {} 

// Assumption: links must have either <prefix>_sender or <prefix>_receiever as current ID
    // computed in getLinks already, pass down:
        // prefix: "uid"/"pid"
        // selectId: idObj.uid or idObj.pid 

// Assumption: pending and rejected can't be True at same time
// get object with user/project data of link + meta data of pending/established/rejected booleans
    
// projReq needs !fk_pid
const projReq = `
*,
user_skills (
    name
),
user_interests(
    name
),
user_communities!fk_pid(
    name
)`;

const userReq = `
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
`;

async function getAssociatedUser(link, prefix, selectId) {
    const { accepted:linkAccepted, rejected: linkRejected } = link;

    let pending = false; 
    let rejected = false;
    let established = false;
    let incoming = false;
    let reqObj = {}; // { id: xxx } or { pid: xxx } - to request linked user/proj from respective tables

    // if I am receiever
    if (link[`${prefix}_receiver`] == selectId) {
        if (!linkAccepted && !linkRejected) pending = true;  // incoming, pending
        else if (linkRejected) rejected=true; // incoming, rejected - don't show the card
        else if (linkAccepted) established = true; // incoming, established
        
        // only one can be non-null
        reqObj = link["uid_sender"] ? { id: link["uid_sender"] } : { pid: link["pid_sender"] };
        incoming = true;
    }

    // I am sender
    else {
        if (!linkAccepted && !linkRejected) pending = true; // pending outgoing
        else if (linkAccepted) established = true; // established outgoing
        else if (linkRejected) rejected = true; // rejected outgoing

        reqObj = link["uid_receiver"] ? { id: link["uid_receiver"] } : { pid: link["pid_receiver"] };
    }

    // console.log("link", link);
    // console.log("Req obj in Links", reqObj);
    // console.log("P/E/R", { pending, established, rejected });
    // console.log("---------------")

    // request for the relevant user/proj and return that promise
    return supabase
        .from("id" in reqObj ? "users" : "projects")
        .select("id" in reqObj ? userReq : projReq)
        .match(reqObj)
        .maybeSingle()
        .then((res) => { return { ...res.data, pending, established, rejected, s_n: link.s_n, incoming };});
    
}

// idObj: { pid: ... } or { uid:...}
export const getLinks = createAsyncThunk('links/getLinks', async(idObj) => {

    try {
        const isUser = "uid" in idObj;
        const prefix = isUser ? "uid" : "pid";
        const selectId = isUser ? idObj.uid : idObj.pid;

        // get all links with current uid/pid as sender or receiver - all relevant links
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .or(`${prefix}_sender.eq.${selectId},${prefix}_receiver.eq.${selectId}`)

        
        if (error) throw error;

        // get promises for all the links
        const profilePromises = data.map((link) => getAssociatedUser(link, prefix, selectId));
        // const values = Promise.all(profilePromises).then(values => { 
        //     values = values.filter(x => x != null);
        //     console.log("Promise vals", values);

        //     return values;
        // });

        const linkedProfiles = await Promise.all(profilePromises);
        return linkedProfiles.filter(x => x != null);

    } catch (error) {
        console.log("getLinks Err", error);
    }

});


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

// Create slice
const linksSlice = createSlice({
    name: 'links',
    initialState: linksAdapter.getInitialState({
        loading: 'idle'
    }),
    reducers: {
        clearLinks: (state, action) => {
            updateHelper({}, state);
            console.log("clear");
        }
    },
    extraReducers: builder => {
        builder.addCase(getLinks.pending, (state, action) => {
            state.loading =  'pending'
        })
        .addCase(getLinks.rejected, (state, action) => {
            state.loading = 'error'
        })
        .addCase(getLinks.fulfilled, (state, action) => {
            console.log("Links fulfilled payload:", action.payload);
            // clear the links to empty before to prevent old state from corrupting: e.g if the new one
            // has zero links, none of the old links from (prev project, previous user, etc) should show up
            updateHelper({ ids: [], entities: {}, loading: 'fulfilled'}, state);
            linksAdapter.upsertMany(state, action.payload)
        })
    }

});

export default linksSlice.reducer;

export const { clearLinks } = linksSlice.actions;

export const { 
    selectById: selectLinkById,
    selectAll: selectAllLinks,
 } = linksAdapter.getSelectors((state) => state.links);







// TODO: replace with call to Django API
// export const getFeedLinks = createAsyncThunk('links/getFeedLinks', async() => {
//     try {
//         const { data:projects, error } = await supabase 
//             .from('projects')
//             .select(`
//             *,
//             user_skills (
//                 name
//             ),
//             user_interests(
//                 name
//             ),
//             user_communities!fk_pid(
//                 name
//             )
//             `)
//             .order('created_at', { ascending: false });

//         if (error) throw error;

//         const { data:users, error:userErr } = await supabase
//                 .from('users')
//                 .select(`
//                 *,
//                 user_skills (
//                     name
//                 ),
//                 user_interests(
//                     name
//                 ),
//                 user_communities(
//                     name
//                 )
//                 `)
//                 .limit()
//                 .order('created_at', { ascending: false });

//         if (error) throw error;

//         return users.concat(projects);
                
//     } catch (error) {
//         console.log("Error in getFeedLinks", error);
//     } 
// });