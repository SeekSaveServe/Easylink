import {
    createEntityAdapter,
    createSlice,
    configureStore,
  } from '@reduxjs/toolkit'

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
//       entities: [{...}, {...}, ],
//       rootIds: [...] - calculated during preprcoess
//   }

const projectsAdapter = createEntityAdapter({
    selectId: (project) => project.pid
})

const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({
        loading: 'idle',
        rootIds: []
    })
})

export default projectsSlice.reducer;