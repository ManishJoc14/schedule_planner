import AddNote from "./components/rightSideBar";
import Nav from "./components/navbar";
import Aside from "./components/leftSidebar";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewNoteAsync } from "./redux/thunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(viewNoteAsync());
      } catch (error) {
        console.log("Error viewing notes: " + error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      <Nav />
      <Aside />
      <AddNote />
    </>
  );
}

export default App;
