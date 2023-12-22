import { createAsyncThunk } from "@reduxjs/toolkit";
import { add_Note, view_Note } from "./apis";

export const addNoteAsync = createAsyncThunk(
  "notesManager/addNoteAsync",
  async ({category, note, createdAt}, thunkAPI) => {
    try {
      const response = await add_Note({category, note, createdAt});
      // console.log(response.data);
      return response.data; // object; note which was added  {category, note, createdAt}
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
      return response.data.notes; // array of notes obj [{category, note, createdAt}, ....]
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
