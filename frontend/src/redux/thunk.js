import { createAsyncThunk } from "@reduxjs/toolkit";
import { add_Note, delete_Note, view_Note } from "./apis";

export const addNoteAsync = createAsyncThunk(
  "notesManager/addNoteAsync",
  async ({ id, note, category, startDate, endDate, description, priority}, thunkAPI) => {
    try {
      const response = await add_Note({id, note, category, startDate, endDate, description, priority});
      // console.log(response.data);
      return response.data; // object; note which was added  {id, note, category, startDate, endDate, description, priority}
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
      return response.data.notes; // array of notes obj [{id, note, category, startDate, endDate, description, priority}, ....]
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteNoteAsync = createAsyncThunk(
  "notesManager/deleteNoteAsync",
  async ({id},thunkAPI) => {
    try {
      const response = await delete_Note({id});
      return response.data.id; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
