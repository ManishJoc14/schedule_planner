// notesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { addNoteAsync, viewNoteAsync } from "./thunk";

const notesSlice = createSlice({
  name: "notesManager",
  initialState: {
    notes: [], //array of notes object
    status: "idle",
    error: null,
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    
    //addNoteAsync
    builder
      .addCase(addNoteAsync.pending, (state) => {
        state.status = "adding/pending";
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.status = "adding/fulfilled";
        console.log(action.payload); // object; note which was added {category, note, createdAt}
        state.notes.push(action.payload);
      })
      .addCase(addNoteAsync.rejected, (state, action) => {
        state.status = "adding/rejected";
        state.error = action.payload;
      });

    //viewNoteAsync
    builder
      .addCase(viewNoteAsync.pending, (state) => {
        state.status = "viewing/Pending";
      })
      .addCase(viewNoteAsync.fulfilled, (state, action) => {
        state.status = "viewing/fulfilled";
        // console.log(action.payload); //array of notes object [{category, note, createdAt}, {category, note, createdAt}, ......]
        state.notes = [...action.payload];
      })
      .addCase(viewNoteAsync.rejected, (state, action) => {
        state.status = "viewing/failed";
        state.error = action.payload;
      });
  },
});

export const { addNote } = notesSlice.actions;
export default notesSlice.reducer;
