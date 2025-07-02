import express from "express";
import cors from "cors";

const app = express(); // app.use(express.urlencoded({

app.use(cors());
// extended: true }));

app.use(express.json());
let tasks = [
  { id: 1, task: "reading", hour: "22", type: "good" },
  { id: 2, task: "writing", hour: "2", type: "bad" },
  { id: 3, task: "poetry", hour: "44", type: "good" },
  { id: 4, task: "novel", hour: "56", type: "bad" },
  { id: 5, task: "task5", hour: "100", type: "good" },
];
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "HELLO WORLD",
  });
});

// GET all task
app.get("/api/v1/tasks", (req, res) => {
  //   return res.json({
  //     status: false,
  //     message: "Users not found",
  //   });
  res.json({
    status: true,
    message: "Users Found",
    tasks: tasks,
  });
});

// Get specific user
app.get("/api/v1/tasks/:taskid", (req, res) => {
  let id = req.params.taskid;
  console.log("taskid: ", id);
  let task = tasks.find((u) => u.id == id);
  if (task) {
    res.json({
      status: true,
      message: "task found",
      task,
    });
  } else {
    res.json({
      status: false,
      message: "task not found",
    });
  }
});

// Create user
app.post("/api/v1/tasks", (req, res) => {
  // req.body;
  let task = req.body;
  tasks.push(task);
  console.log(task);
  res.json({
    status: true,
    message: "task Created",
    tasks,
  });
});

// update task
app.patch("/api/v1/tasks/:taskid", (req, res) => {
  let id = req.params.taskid;
  let updatedData = req.body;
  // { name: 'ghanshyam' }
  //
  let task = tasks.find((u) => u.id == id);
  task.name = updatedData.name;
  res.json({
    status: true,
    message: "task updated",
    task,
  });
});

// delete user
app.delete("/api/v1/tasks/:taskid", (req, res) => {
  let id = req.params.taskid; //   filter user with id
  tasks = tasks.filter((u) => u.id != id);
  res.json({
    status: true,
    message: "task Deleted",
  });
});
app.listen(4000);
