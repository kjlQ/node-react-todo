const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoController = require("./controller/index.js");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOOSE_KEY)
  .then(() => {
    console.log("DB ok");
  })
  .catch((error) => console.log("DB error", error));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo/createTodo", TodoController.createTodo);
app.get("/todo/getTodos", TodoController.getTodos);
app.patch("/todo/upateCompleteness", TodoController.upateCompleteness);
app.delete("/todo/deleteTodo", TodoController.deleteTodo);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  } else {
    return console.log("serv ok");
  }
});
