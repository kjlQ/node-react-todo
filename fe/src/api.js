import axios from "axios";

export const getTodos = async () => {
  const result = await axios.get("/todo/getTodos");
  return result;
};

export const createTodo = async (text) => {
  const result = await axios.post("/todo/createTodo", { text });
  return result;
};

export const updateCompleteness = async (id, completed) => {
  const result = await axios.patch("/todo/upateCompleteness", { id, completed });
  return result;
};

export const deleteTodo = async (id) => {
  const result = await axios.delete("/todo/deleteTodo", {
    data: {
      id,
    },
  });
  return result;
};
