import { createAsyncThunk } from "@reduxjs/toolkit";
import { add_Note, view_Note } from "./apis";

export const addNoteAsync = createAsyncThunk(
  "notesManager/addNoteAsync",
  async ({ note, category, startDate, endDate, description, priority}, thunkAPI) => {
    try {
      const response = await add_Note({ note, category, startDate, endDate, description, priority});
      // console.log(response.data);
      return response.data; // object; note which was added  {note, category, startDate, endDate, description, priority}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const viewNoteAsync = createAsyncThunk(
  "notesManager/viewNoteAsync",
  async (thunkAPI) => {
    try {
      const response = await view_Note();
      return response.data.notes; // array of notes obj [{note, category, startDate, endDate, description, priority}, ....]
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
