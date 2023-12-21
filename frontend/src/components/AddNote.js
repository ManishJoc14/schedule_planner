import React, { useState } from "react";
import { add_Note } from "../redux/apis";

const AddNote = ()=> {
  const [note, setNote] = useState("");

  const addNote = async () => {
    try {
      const res = await add_Note({note});
      console.log(res.data.message);
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  return (
    <div>
      <h1>ADD NOTES</h1>
      <input
        type="text"
        placeholder="Enter your note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

export default AddNote;
