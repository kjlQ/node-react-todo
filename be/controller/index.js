const TodoSchema = require("../models/Todo.js");

class TodoController {
  async createTodo(req, res) {
    try {
      if (!req.body.text) {
        res.status(400).json({
          message: "text shouldn't be empty",
        });
        return;
      }
      const doc = await TodoSchema({
        text: req.body.text,
        completed: false,
      });

      const todo = await doc.save();
      res.json(todo);
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }

  async getTodos(req, res) {
    try {
      const todos = await TodoSchema.find();

      res.json(todos);
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }

  async upateCompleteness(req, res) {
    try {
      const doc = await TodoSchema.findOneAndUpdate(
        {
          _id: req.body.id,
        },
        {
          completed: req.body.completed,
        },
        {
          new: true,
        }
      );

      res.json(doc);
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }

  async deleteTodo(req, res) {
    try {
      const doc = await TodoSchema.findOneAndDelete({
        _id: req.body.id,
      });
      res.json(doc);
    } catch (error) {
      res.json({
        message: error,
      });
    }
  }
}

module.exports = new TodoController();
