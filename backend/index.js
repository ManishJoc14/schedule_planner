const express = require("express");
const app = express();
const { spawn } = require("child_process");
const port = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Route to add a note
app.post("/addNote", (req, res) => {
  try {
    const { note: data } = req.body;
    const type = "addNote";

    // Execute the C++ program with the note as a command-line argument
    const studyScheduler = spawn("./schedule_planner.exe", [type, data]);

    studyScheduler.stdout.on("data", (data) => {
      const output = data.toString("utf8");
      console.log(output);
    });

    studyScheduler.on("error", (error) => {
      console.error("Error:", error.message);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
      res.send({ message: "Note added successfully " });
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to view notes
app.get("/viewNote", (req, res) => {
  try {
    const type = "viewNote";

    const studyScheduler = spawn("./schedule_planner.exe", [type]);

    let notes = [];

    studyScheduler.stdout.on("data", (data) => {
      const unfilteredNotes = data.toString().split("\n");
      // Filter out empty lines
      notes = unfilteredNotes.filter((note) => note.trim() !== "");
      for (const note of notes) {
        console.log(note);
      }
    });

    studyScheduler.on("error", (error) => {
      console.error("Error:", error.message);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
      res.send({ notes });
    });
  } catch (error) {
    console.error("Error viewing notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
