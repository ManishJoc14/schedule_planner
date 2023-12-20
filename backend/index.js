const express = require("express");
const app = express();
const { spawn } = require("child_process");
const port = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Route to add a note
app.post("/addNote", (req, res) => {
  const { note : data } = req.body;
  const type = 'addNote';

  // Execute the C++ program with the note as a command-line argument
  const studyScheduler = spawn("./schedule_planner.exe", [type,data]);

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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
