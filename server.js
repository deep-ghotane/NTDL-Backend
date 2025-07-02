import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

const PORT = 4000;

// allow cors
app.use(cors());

// populate request body
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// let tasks = [
//   { id: 1, task: "task1", hour: 10, type: "good" },
//   { id: 2, task: "task2", hour: 20, type: "bad" },
//   { id: 3, task: "task3", hour: 30, type: "good" },
// ];

app.get("/", (req, res) => {
  return res.json({
    status: true,
    message: "API FOR NTDL",
  });
});

// GET all tasks
app.get("/api/v1/tasks", (req, res) => {
  // read tasks.json
  let data = fs.readFileSync("./tasks.json");
  let tasks = JSON.parse(data);

  let queryType = req.query.type;
  //   let test = req.query.test;
  let filteredTask = [];
  if (queryType) {
    filteredTask = tasks.filter((t) => t.type == queryType);
  } else {
    filteredTask = tasks;
  }

  return res.json({
    status: true,
    message: "Tasks Found",
    tasks: filteredTask,
  });
});

// Get specific user
app.get("/api/v1/tasks/:taskid", (req, res) => {
  // read tasks.json
  let data = fs.readFileSync("./tasks.json");
  let tasks = JSON.parse(data);

  let id = req.params.taskid;

  let task = tasks.find((t) => t.id == id);

  if (task) {
    return res.json({
      status: true,
      message: "Task found",
      task,
    });
  } else {
    return res.status(404).json({
      status: false,
      message: "Task not found",
    });
  }
});

// Create task
app.post("/api/v1/tasks", (req, res) => {
  let data = fs.readFileSync("./tasks.json");
  let tasks = JSON.parse(data);

  let task = req.body;

  tasks.push(task);

  // write to file
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));

  res.status(201).json({
    status: true,
    message: "Task Created",
    task,
  });
});

// update task
app.patch("/api/v1/tasks/:taskid", (req, res) => {
  try {
    let data = fs.readFileSync("./tasks.json");
    let tasks = JSON.parse(data);

    let id = req.params.taskid;
    let updatedData = req.body;

    let task = tasks.find((t) => t.id == id);
    task.type = updatedData.type;

    fs.writeFileSync("./tasks.json", JSON.stringify(tasks));

    return res.json({
      status: true,
      message: "Task updated",
      task,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: false,
      message: "Task could not be updated",
      err: err.message,
    });
  }
});

// delete task
app.delete("/api/v1/tasks/:taskid", (req, res) => {
  let data = fs.readFileSync("./tasks.json");
  let tasks = JSON.parse(data);

  let id = req.params.taskid;

  //   filter task with id
  tasks = tasks.filter((u) => u.id != id);

  // update file
  fs.writeFileSync("./tasks.json", JSON.stringify(tasks));

  res.json({
    status: true,
    message: "Task Deleted",
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server could not be started", err);
  } else {
    console.log("Server Started at PORT: ", PORT);
  }
});
