import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
import { supabase } from '../../supabaseClient';
// Faciliates CRUD on normalised objects
// structure for one entity:
    //   {
    //       pid,
    //       parent_id,
    //       uid,
    //       childrenIds: [], - calculated during preprocess
    //       ...rest
    //   }

// Structure of entire slice:   
//   {
//       ids: [...],
//       entities: [pid: {...}, pid: {...}, ],
//       rootIds: [...] - calculated during preprocess,
//       loading: 'idle' | 'pending' | 'fulfilled' | 'error'
//   }

import { projReq } from '../../components/constants/requestStrings';
import { formatProfileDatum } from '../../components/constants/formatProfileDatum';

const projectsAdapter = createEntityAdapter({
    selectId: (project) => project.pid
});

// data: [Project] where Project at least contains: { pid: uuid/int, title: string, parent_id: FK to pid}
// output: {mapping from pid to data}, [rootIds]
// O(n) space and time where n = data.length
    // input data from API => output data for slice
function preprocess(data) {
    const idMapping = {};
    const rootIds = [];
  
    // add entries for each pid first
    for (const project of data) {
      if (!(project.pid in idMapping)) {
        idMapping[project.pid] = {...project, childrenIds: [] };
      }
    }
  
  
    for (const project of data) {
      if (project.parent_id == null) {
        rootIds.push(project.pid);
        continue;
      }
  
      idMapping[project.parent_id].childrenIds.push(project.pid);
    }
  
    return { idMapping, rootIds };
  }

  async function getData() {
    // simulation of actual data from DB: e.g select * where projects.uid = user.id;
    const data = [
      {
        pid: 0,
        title: 'USDevs',
        parent_id: null,
      },
      {
        pid: 1,
        title: 'Laundrobot',
        parent_id: 0,
      },
      {
        pid: 2,
        title: 'Cinnabot',
        parent_id: 0,
      },
      {
        pid: 3,
        title: 'USC Website',
        parent_id: 0,
      },
      {
        pid: 4,
        title: 'Booking system',
        parent_id: 3,
      },
      {
        pid: 5,
        title: 'Laundry Hardware',
        parent_id: 1,
      },
      {
        pid:10,
        title: 'USTech',
        parent_id: null
      },
      {
        pid:11,
        title: 'Add',
        parent_id: null
      },
      {
        pid:12,
        title: 'Add two',
        parent_id: null
      },
      {
        pid:13,
        title: 'Add three',
        parent_id: null
      },
      {
        pid:14,
        title: 'Add four',
        parent_id: null
      }
    ];
  
    return {
      data,
      error: null
    }
  };

// to test loading
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Async Thunks
export const getProjects = createAsyncThunk('projects/getProjects', async() => {
    const { data, error } = await supabase.from('projects')
    .select(projReq)
    .match({ uid: supabase.auth.user().id })


    // const { data, error } = await getData();

    if (error) throw error;
    return data.map(formatProfileDatum);
});

// Create Slice
const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({
        loading: 'idle',
        rootIds: []
    }),
    extraReducers: builder => {
        builder
        .addCase(getProjects.pending, (state, action) => {
            state.loading = 'pending';
        })
        .addCase(getProjects.rejected, (state, action) => {
            state.loading = 'error';
        })
        .addCase(getProjects.fulfilled, (state, action) => {
            state.loading = 'fulfilled';
            const data = preprocess(action.payload);
            
            // upsert does shallow copy for existing data
            projectsAdapter.upsertMany(state, data.idMapping);
            state.rootIds = data.rootIds;
        })
    }
})

export default projectsSlice.reducer;

export const { 
    selectById: selectProjectById,
    selectAll: selectAllProjects,
 } = projectsAdapter.getSelectors((state) => state.projects);