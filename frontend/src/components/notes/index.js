import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { deleteNoteAsync } from "../../redux/thunk";
import "./NoteBox.css";

const Notes = () => {
  const [noteToBeRendered, setNotesToBeRendered] = useState([]);
  const { pathname } = useLocation();
  const currentDate = new Date().toISOString().split("T")[0];
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      const filteredNotes =
        pathname === "/today" || pathname === "/" ? toadysNotes : notes;
      setNotesToBeRendered(filteredNotes);
    };

    fetchData();
  }, [pathname, currentDate, notes]);

  const toadysNotes = notes.filter((note) => {
    const startDate = note.startDate.split("T")[0];
    return currentDate === startDate;
  });

  const handleDelete = (e, id) => {
    console.log(id);
    try {
      dispatch(deleteNoteAsync({ id }));
    } catch (error) {
      console.log("Error deleting note" + error);
    }
  };
  return (
    <>
      {noteToBeRendered.length > 0 ? (
        <>
          {noteToBeRendered.map((note) => (
            <div
              className={` rounded bg-gray-50 dark:bg-gray-800 note-box ${note.category}`}
              key={note.id}
            >
              <span className="note-header">
                <span className={`category ${note.category}`}>
                  {note.category} | {note.priority}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flag"
                    height="16"
                    viewBox="0 -960 960 960"
                    width="16"
                  >
                    <path d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
                  </svg>
                </span>
                <Dropdown
                  label="Dropdown left start"
                  placement="left-start"
                  dismissOnClick={false}
                  className="note-edit"
                  renderTrigger={() => <span className="dots">...</span>}
                >
                  <Dropdown.Item>
                    <span className="material-symbols-outlined edit">edit</span>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => handleDelete(e, note.id)}>
                    <span className="material-symbols-outlined delete">
                      delete
                    </span>
                    Delete
                  </Dropdown.Item>
                </Dropdown>
              </span>
              <p className="note-title">{note.note}</p>
              <p className="note-description">{note.description}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>No notes available...</h3>
        </>
      )}
    </>
  );
};

export default Notes;
