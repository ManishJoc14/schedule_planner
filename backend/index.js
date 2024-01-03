const express = require("express");
const app = express();
const { spawn } = require("child_process");
const port = 3001;
const cors = require("cors");
const { constants } = require("crypto");

app.use(express.json());
app.use(cors());

// Route to add a note
app.post("/addNote", (req, res) => {
  try {
    const { id, note, category, startDate, endDate, description, priority, done } = req.body;
    const type = "addNote";

    // Execute the C++ program with the note as a command-line argument
    const studyScheduler = spawn("./schedule_planner.exe", [type, note, category, startDate, endDate, description, priority, id, done]);

    studyScheduler.stdout.on("data", (data) => {
      const addedNoteJosn = data.toString("utf8");
      const addedNoteObject = JSON.parse(addedNoteJosn);
      res.send(addedNoteObject);
    });

    studyScheduler.stderr.on("data", (data) => {
      const error = data.toString("utf8");
      console.log(error);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Error adding note: Internal Server Error" });
  }
});

// Route to view notes
app.get("/viewNote", (req, res) => {
  try {
    const type = "viewNote";

    const studyScheduler = spawn("./schedule_planner.exe", [type]);

    studyScheduler.stdout.on("data", (data) => {
      const arrayOfNotesJosn = data.toString("utf8");
      const arrayOfNotesObject = JSON.parse(arrayOfNotesJosn);
      res.send(arrayOfNotesObject);
    });

    studyScheduler.stderr.on("data", (data) => {
      const error = data.toString("utf8");
      console.log(error);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error viewing notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete notes
app.post("/deleteNote", (req, res) => {
  try {
    const type = "deleteNote";
    const { id } = req.body;
    const studyScheduler = spawn("./schedule_planner.exe", [type, id]);
    res.send({ id });
    studyScheduler.stdout.on("data", (data) => {
      const output = data.toString("utf8");
      console.log(output);
    });

    studyScheduler.stderr.on("data", (data) => {
      const error = data.toString("utf8");
      console.log(error);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to checkNote
app.post("/checkNote", (req, res) => {
  try {
    const type = "checkNote";
    const { id, done } = req.body;
    const studyScheduler = spawn("./schedule_planner.exe", [type, id, !done ]);
    res.send({ id });
    studyScheduler.stdout.on("data", (data) => {
      const output = data.toString("utf8");
      console.log(output);
    });

    studyScheduler.stderr.on("data", (data) => {
      const error = data.toString("utf8");
      console.log(error);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
