// AddNoteForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNoteAsync } from "../redux/thunk";
import { getCurrentTime } from "./../utils/getcurrentTime";
const AddNoteForm = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const createdAt = getCurrentTime();
      dispatch(addNoteAsync({ category, note, createdAt }));
    } catch (error) {
      // Handle the error, you can log it or show a user-friendly message
      console.error("Error adding note:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <br />
      <label>
        note:
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
