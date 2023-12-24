// ViewNotes.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewNoteAsync } from "../redux/thunk";

const ViewNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    try {
      dispatch(viewNoteAsync()); //array of notes obj
    } catch (error) {
      console.log("Error viewing notes :" + error);
    }
  }, [dispatch]);
  return (
    <div>
      <h2>View Notes</h2>
      <ul>
        {notes.length > 0 ? (
          <>
            {notes.map((note, index) => (
              <li key={index}>
                <strong>Note:</strong> {note.note},{"  "}
                <strong>Category:</strong> {note.category},{"  "}
                <strong>Priority:</strong> {note.priority},{"  "}
                <strong>Start Date:</strong> {note.startDate},{"  "}
                <strong>End Date:</strong> {note.endDate},{"  "}
                <strong>Description:</strong> {note.description},{"  "}
              </li>
            ))}
          </>
        ) : (
          <>
            <h3>No notes available...</h3>
          </>
        )}
      </ul>
    </div>
  );
};

export default ViewNotes;
