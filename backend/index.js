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
    const { category, note, createdAt } = req.body;
    const type = "addNote";

    // Execute the C++ program with the note as a command-line argument
    const studyScheduler = spawn("./schedule_planner.exe", [
      type,
      category,
      note,
      createdAt,
    ]);

    studyScheduler.stdout.on("data", (data) => {
      const output = data.toString("utf8");
      console.log(output);
    });

    studyScheduler.on("error", (error) => {
      console.error("Error:", error.message);
    });

    studyScheduler.on("close", (code) => {
      console.log(`C++ process exited with code ${code}`);
      res.send({ category, note, createdAt });
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
    let notes = [];
    studyScheduler.stdout.on("data", (data) => {
      const createNoteFromOutPutOfCPP = (data) => {
        const unfilteredNotes = data.toString("utf8").split("\n");
        // Filter out empty lines
        const unseparetedNotes = unfilteredNotes.filter(
          (note) => note.trim() !== ""
        );
        //["a~a~2023-12-22T14:43:20.868Z", "a~a~2023-12-22T14:43:20.868Z",...]
        return unseparetedNotes.map((unseparetedNote) => {
          const [category, note, createdAt] = unseparetedNote.split("~~~");
          return { category, note, createdAt };
        });
      };
      notes = createNoteFromOutPutOfCPP(data);
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
