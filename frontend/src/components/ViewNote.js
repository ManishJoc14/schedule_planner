import React, { useState, useEffect } from "react";
import { view_Note } from "../redux/apis";
import axios from "axios";

const ViewNote = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the server when the component mounts
    const viewAllNotes = async () => {
      try {
        const res = await view_Note();
        const data = res?.data?.notes;
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    viewAllNotes();
  }, []);

  return (
    <div>
      <h2>View Notes</h2>
      {notes?.length > 0 ? (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default ViewNote;
